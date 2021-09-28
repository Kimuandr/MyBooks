const UserService = require("../services/user.services");
const { validationResult } = require("express-validator");
const config = require("../config_data/config");

class UserController {
	async registration(req, res) {
		try {
			const mistakes = validationResult(req);
			if (!mistakes.isEmpty()) {
				res.status(403).send({ message: "Invalid data" });
			}

			const newPerson = await UserService.createUser(req.body);
			res.cookie("refreshJwt", newPerson.refreshJwt, {
				maxAge: 30 * 24 * 60 * 1000,
				httpOnly: true
			});
			res.json(newPerson);
		} catch (err) {
			res.status(500).send({ status: 500, message: "Something went wrong..." });
		}
	}

	async login(req, res) {
		try {
			const {
				name, email, password, isAdmin
			} = req.body;
			const response = await UserService.userLogin(name, email, password, isAdmin);
			res.cookie("refreshJwt", response.refreshJwt, {
				maxAge: 30 * 24 * 60 * 1000,
				httpOnly: true
			});
			res.json(response);
		} catch {
			res.status(500).send({ status: 500, message: "Something went wrong..." });
		}
	}

	async logout(req, res) {
		try {
			const { refreshJwt } = req.cookies;
			const byeJwt = await UserService.exit(refreshJwt);
			res.clearCookie("refreshJwt");
			res.json(byeJwt);
		} catch {
			res.status(500).send({ status: 500, message: "Something went wrong..." });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await UserService.getAllUsers();
			res.json(users);
		} catch (err) {
			res.status(500).send({ status: 500, message: "Something went wrong..." });
		}
	}

	async isAuth(req, res) {
		const userAuth = await UserService.isAuth(req.newUser.id, req.newUser.email, req.newUser.role);
		res.json({ userAuth });
	}

	async activate(req, res) {
		try {
			const activationLink = req.params.link;
			await UserService.activate(activationLink);
			return res.redirect(config.clientUrl);
		} catch (err) {
			res.status(500).send({ status: 500, message: "Something went wrong..." });
		}
	}
}

module.exports = new UserController();
