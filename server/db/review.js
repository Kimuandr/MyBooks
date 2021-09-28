const db = require("./db");
const { DataTypes } = require("sequelize");

const Review = db.define("Review", {
      description: {
       type: DataTypes.TEXT
      },
      userId: {
        type: DataTypes.UUID
      },
      bookId: {
        type: DataTypes.UUID
    }
  }, {});

// Review.associate = (models) => {
//     Review.belongsTo(models.User, { foreignKey: "userId", as: "userReview" });
//     Review.belongsTo(models.Book, { foreignKey: "bookId", as: "bookReview" });
// };

module.exports = Review;
