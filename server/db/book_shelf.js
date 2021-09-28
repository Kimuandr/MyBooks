const db = require("./db");
const { DataTypes } = require("sequelize");

const BookShelf = db.define(
  "BookShelf", {
      bookId: {
          type: DataTypes.UUID
        },
      userBookListId: {
          type: DataTypes.UUID
        }
  }, {
    timestamps: false
  }
);

// BookShelf.associate = (models) => {

// };

module.exports = BookShelf;
