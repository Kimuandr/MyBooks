const express = require("express");
const config = require("./config_data/config");
const sequelize = require("./db/db");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const userBookList = require("./routes/userBookList.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const serverErrorHandler = require("./errors/serverErrors");
const fileUpload = require("express-fileupload");
const path = require("path");

const User = require("./db/user");
const Book = require("./db/book");
const UserBookList = require("./db/userBookList");
const Token = require("./db/token");
const Review = require("./db/review");
const BookShelf = require("./db/book_shelf");

const PORT = 8080 || config.port;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));

User.hasOne(Token, { foreignKey: "UserId" });
User.hasOne(Token, { foreignKey: "userId" });
User.hasMany(Book, { foreignKey: "userId", as: "book" });
User.hasMany(UserBookList, { foreignKey: "userId" });
User.hasMany(Review, { foreignKey: "userId" });

UserBookList.belongsTo(User, { foreignKey: "userId" });
UserBookList.belongsToMany(Book, {
	through: BookShelf,
	otherKey: "bookId",
	foreignKey: "userBookListId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

Book.belongsTo(User, { foreignKey: "userId", as: "user" });
Book.belongsToMany(UserBookList, {
	through: BookShelf,
	otherKey: "userBookListId",
	foreignKey: "bookId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});
Book.hasMany(Review, { foreignKey: "bookId", as: " reviews" });

Review.belongsTo(User, { foreignKey: "userId", as: "userReview" });
Review.belongsTo(Book, { foreignKey: "bookId", as: "bookReview" });

const tablesCreate = async (force = true) => {
	try {
		sequelize.sync({
			force
		});
		sequelize.authenticate();
		console.log("Connection has been established successfully");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
// tablesCreate();
app.use(express.urlencoded({
	extended: true
})); // instead of 'body-parser'
app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", userBookList);

app.use(serverErrorHandler);

app.listen(PORT, () => console.log(`Port ${PORT}`));
