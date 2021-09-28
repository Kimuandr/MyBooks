const BookService = require("../services/book.services");
const ServerErrors = require("../errors/serverErrors");
class BookController {
	async createBook(req, res, next) {
		try {
			const {
				author, title, country, imageLink, language, link, pages, year
			} = req.body;
			const { image } = req.files;
			const newBook = await BookService.createOneBook(
				author, title, country, imageLink, language, link, pages, year, image
			);
			res.send(newBook);
		} catch (err) {
			next(ServerErrors.BAD_REQUEST(err.message));
		}
	}

	async getBooks(req, res, next) {
		try {
			const books = await BookService.getAllBooks();
			res.send(books);
		} catch (err) {
			next(ServerErrors.BAD_REQUEST(err.message));
		}
	}

	async getBook(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				next(ServerErrors.BAD_REQUEST("Can't find id"));
			}
			const book = await BookService.getOneBook(id);
			res.json(book);
		} catch (err) {
			next(ServerErrors.INTERNAL_SERVER(err.message));
		}
	}

	async deleteBook(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				next(ServerErrors.BAD_REQUEST("Can't find id"));
			}
			const book = await BookService.deleteBook(id);
			await book.destroy();
			res.json({ message: "Deleted" });
		} catch (err) {
			next(ServerErrors.INTERNAL_SERVER(err.message));
		}
	}
}

module.exports = new BookController();
