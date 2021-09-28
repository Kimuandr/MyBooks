'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn("books", "author", {
        type: DataTypes.STRING,
        Sequelize: false
      }, {transaction}),
      await queryInterface.addColumn("books", "title", {
        type: DataTypes.STRING,
        Sequelize: false
      }, {transaction}),
      await queryInterface.addColumn("books", "country", {
        type: DataTypes.STRING,
      }, {transaction}),
      await queryInterface.addColumn("books", "imageLink", {
        type: DataTypes.STRING,
      }, {transaction}),
      await queryInterface.addColumn("books", "language", {
        type: DataTypes.STRING,
      }, {transaction}),
      await queryInterface.addColumn("books", "link", {
        type: DataTypes.STRING,
      }, {transaction}),
      await queryInterface.addColumn("books", "pages", {
        type: DataTypes.INTEGER,
      }, {transaction}),
      await queryInterface.addColumn("books", "year", {
        type: DataTypes.INTEGER,
      }, {transaction}),
      await queryInterface.addColumn("books", "image", {
        type: DataTypes.STRING,
      }, {transaction})
    } catch (err) {
      transaction.rollback();
    }
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("books", "author", { transaction });
      await queryInterface.removeColumn("books", "title", { transaction });
      await queryInterface.removeColumn("books", "country", { transaction });
      await queryInterface.removeColumn("books", "imageLink", { transaction });
      await queryInterface.removeColumn("books", "language", { transaction });
      await queryInterface.removeColumn("books", "link", { transaction });
      await queryInterface.removeColumn("books", "pages", { transaction });
      await queryInterface.removeColumn("books", "year", { transaction });
      await queryInterface.removeColumn("books", "image", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
