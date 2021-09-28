const db = require("./db");
const { DataTypes } = require("sequelize");

const Book = db.define(
	"Book", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		country: {
			type: DataTypes.STRING
		},
		imageLink: {
			type: DataTypes.STRING
		},
		language: {
			type: DataTypes.STRING
		},
		link: {
			type: DataTypes.STRING
		},
		pages: {
			type: DataTypes.INTEGER
		},
		year: {
			type: DataTypes.INTEGER
		},
		image: {
			type: DataTypes.STRING
		},
		userId: {
			type: DataTypes.INTEGER
		}
	}, {
		timestamps: false
	}
);

// Book.associate = (models) => {
// 	Book.belongsTo(models.User, { foreignKey: "userId", as: "user" });
// 	Book.belongsToMany(models.UserBookList, {
// 		through: "BookShelf",
// 		otherKey: "userBookListId",
// 		foreignKey: "bookId",
// 		onDelete: "CASCADE",
// 		onUpdate: "CASCADE"
// 	});
// 	Book.hasMany(models.Review, { foreignKey: "bookId", as: " reviews" });
// };

module.exports = Book;
