const db = require("./db");
const { DataTypes } = require("sequelize");

const UserBookList = db.define(
	"UserBookList", {
		title: {
			type: DataTypes.STRING
		},
		userId: {
			type: DataTypes.UUID
		}
	}, {
		timestamps: false
	}, {}
);

// UserBookList.associate = (models) => {
// 	UserBookList.belongsTo(models.User, { foreignKey: "userId" });
// 	UserBookList.belongsToMany(models.Book, {
// 		through: "BookShelf",
// 		otherKey: "bookId",
// 		foreignKey: "userBookListId",
// 		onDelete: "CASCADE",
// 		onUpdate: "CASCADE"
// 	});
// };

module.exports = UserBookList;
