'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cats', {
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      catPresetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CatPresets',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      angry: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      energy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      affection: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      boldness: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
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
    await queryInterface.dropTable('Cats');
  },
};
