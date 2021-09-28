const UserBookList = require("../db/userBookList");

class UserBookListService {
	async createBookList(title) {
		return UserBookList.create({ title });
	}

	async getAllBookLists() {
		return UserBookList.findAll();
	}

	async dropBookList(id) {
		const bookList = await UserBookList.findOne({ where: { id } });
		await bookList.destroy();
	}
}

module.exports = new UserBookListService();
