const UserBookListService = require("../services/userBookList.services");

class UserBookListController {
	async create(req, res) {
		try {
			console.log(req);
			const { title } = req.body;
			const newBookList = await UserBookListService.createBookList(title);
			res.json(newBookList);
		} catch (err) {
			res.json(err.message);
		}
	}

	async getBookList(req, res) {
		try {
			const bookLists = await UserBookListService.getAllBookLists();
			res.json(bookLists);
		} catch (err) {
			res.json(err.message);
		}
	}

	async deleteBookList(req, res) {
		const { id } = req.params;
		try {
			await UserBookListService.dropBookList(id);
			res.json({ message: "It's no more here!" });
		} catch (err) {
			res.json(err.message);
		}
	}
}

module.exports = new UserBookListController();
