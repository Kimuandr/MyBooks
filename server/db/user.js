const db = require("./db");
const { DataTypes } = require("sequelize");

const User = db.define(
	"User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				notNull: true
			}
		},
		isActivated: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		activationLink: {
			type: DataTypes.STRING
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		timestamps: false
	}
);

// User.associate = (models) => {
// 	User.hasOne(models.Token, { foreignKey: "userId" });
// 	User.hasMany(models.Book, { foreignKey: "userId", as: "book" });
// 	User.hasMany(models.UserBookList, { foreignKey: "userId" });
// 	User.hasMany(models.Review, { foreignKey: "userId" });
// };

module.exports = User;
