'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CatPresets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imgMain: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imgSleep: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imgPlay: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imgEat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imgWeasel: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imgCreate: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CatPresets');
  },
};
