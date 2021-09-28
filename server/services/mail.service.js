const nodemailer = require("nodemailer");
const config = require("../config_data/config");

class MailService {
	async sendMailActivation(to, link) {
		const transporter = nodemailer.createTransport({
			host: config.emailHost,
			port: config.emailPort,
			secure: false,
			auth: {
				user: config.emailUser,
				pass: config.emailPassword
			}
		});
		transporter.verify((error, success) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Ready for sending");
				console.log(success);
			}
		});
		const mailOptions = {
			from: config.emailUser,
			to,
			subject: "Acc activation " + config.apiUrl,
			text: "",
			html: `
					<div>
						<h1>Ссылка активации аккаунта</h1>
						<a href="${link}">${link}</a>
					</div>
					`
		};
		await transporter.sendMail(mailOptions).then((res) => res).catch(err => console.error(err));
	}
}

module.exports = new MailService();




// async activateUser(activationLink) {
//     const user = await User.findOne({ activationLink });

//     if (!user) {
//         return new ServerError(ERROR_STATUS.FORBIDDEN, "Try again!");
//     }

//     user.isActivated = true;
//     await user.save();
// }


	// await mailService.sendMailActivation(email,
		// 	`${ config.apiUrl }/api/activate/${ newUser.activationLink }`);

        // router.get("/activate/:link", userController.activate);

        // const mailService = require("./mail.service");


        // async activate(req, res) {
        //     try {
        //         const activationLink = req.params.link;
        //         await UserService.activate(activationLink);
        //         return res.redirect(config.clientUrl);
        //     } catch (err) {
        //         res.status(500).send();
        //     }
        // }


		// res.cookie("refreshToken", newPerson.tokens.refreshJwt, {
			// 	maxAge: 30 * 24 * 60 * 1000,
			// 	httpOnly: true
			// });


			// class MailService {
			// 	async sendMailActivation(to, link) {
			// 		const transporter = nodemailer.createTransport({
			// 			service: "gmail",
			// 			host: config.emailHost,
			// 			port: config.emailPort,
			// 			secure: false,
			// 			auth: {
			// 				user: config.emailUser,
			// 				password: config.emailPassword
			// 			}
			// 		});
			
			// 		transporter.verify((error, success) => {
			// 			if (error) {
			// 				console.log(error);
			// 			} else {
			// 				console.log("Ready for sending");
			// 				console.log(success);
			// 			}
			// 		});
			
			// 		const mailOptions = {
			// 			from: config.emailUser,
			// 			to,
			// 			subject: "Acc activation " + config.apiUrl,
			// 			text: "",
			// 			html: `
			// 					<div>
			// 						<h1>Ссылка активации аккаунта</h1>
			// 						<a href="${link}">${link}</a>
			// 					</div>
			// 					`
			// 		};
			
			// 		transporter.sendMail(mailOptions).then(data => data).catch(err => console.log(err));
			// 	}
			// }