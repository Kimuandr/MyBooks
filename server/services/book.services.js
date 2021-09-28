const Book = require("../db/book");
const path = require("path");
class BookService {
	async createOneBook(author, title, country, imageLink, language, link, pages, year, image) {
		let fileName = title + ".jpg";
		//перемещение в заданную нами папку
		image.mv(path.resolve(__dirname, "..", "static", fileName));
		return Book.create({
			author, title, country, imageLink, language, link, pages, year, image: fileName
		});
	}

	async getAllBooks(UserId) {
		return Book.findAll();
	}

	async getOneBook(id) {
		return Book.findAll({ where: { id } });
	}

	async deleteBook(id) {
		const book = await Book.findAll({ where: { id } });
		return book;
	}
}

module.exports = new BookService();
