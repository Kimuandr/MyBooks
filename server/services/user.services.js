const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config_data/config");
const ServerError = require("../errors/serverErrors");
const uuid = require("uuid");
const Token = require("../db/token");
const mailService = require("./mail.service");

class UserService {
	async getAllUsers() {
		return User.findAll();
	}

	hashedData(data) {
		return bcrypt.hash(data, 10);
	}

	async jwtAdd(id, email, role) {
		const accessJwt = jwt.sign({ id, email, role }, config.jwt, { expiresIn: config.jwtExpire });
		const refreshJwt = jwt.sign(
			{ id, email, role }, config.refJwt, { expiresIn: config.refJwtExpire }
		);
		return { accessJwt, refreshJwt };
	}

	async createJwtTable(id, refreshJwt) {
		const jwtData = await Token.findOne({ where: { id } });
		if (jwtData) {
			jwtData.refreshJwt = refreshJwt;
			return jwtData.save();
		}
		const newJwt = await Token.create({ userId: id, refreshJwt: refreshJwt });
		return newJwt;
	}

	async createUser({ name, email, password, role }) {
		const userAlreadyExists = await User.findOne({ where: { email } });

		if (userAlreadyExists) {
			return ServerError.FORBIDDEN("Something went wrong! Try again!");
		}

		const activationLink = uuid.v4();

		const newUser = await User.create({
			name,
			email,
			password: await this.hashedData(password),
			activationLink: activationLink
		});

		const tokens = await this.jwtAdd(newUser.id, email, newUser.role);

		await this.createJwtTable(newUser.id, tokens.refreshJwt);

		await mailService.sendMailActivation(email, `${config.apiUrl}/api/activate/${activationLink}`);

		return { ...tokens, newUser };
	}

	async userLogin(name, email, password, isAdmin) {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return ServerError.NOT_FOUND("Something went wrong");
		}

		if (!password || !email) {
			return ServerError.NOT_FOUND("Try to enter your data again");
		}

		const comparePasswordResult = await bcrypt.compare(password, user.password);
		if (comparePasswordResult) {
			const tokens = await this.jwtAdd(user.id, user.email, user.isAdmin);
			await this.createJwtTable(user.id, tokens.refreshJwt);
			return {
				name: user.name, email, isAdmin, ...tokens
			};
		}
		return ServerError.INTERNAL_SERVER("Start from the beginning");
	}

	async exit(refreshJwt) {
		const delJwt = await Token.findOne({ where: { refreshJwt } });
		await delJwt.destroy();
		return { deletedRefreshToken: delJwt.refreshJwt };
	}

	async isAuth(id, email, isAdmin) {
		return this.jwtAdd(id, email, isAdmin);
	}

	async activate(activationLink) {
		const user = await User.findOne({ activationLink });
		if (!user) {
			return ServerError.INTERNAL_SERVER("Invalid Link");
		}
		user.isActivated = true;
		await user.save();
	}
}

module.exports = new UserService();
