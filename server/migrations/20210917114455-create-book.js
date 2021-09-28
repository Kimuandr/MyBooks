'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      imageLink: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      }
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};