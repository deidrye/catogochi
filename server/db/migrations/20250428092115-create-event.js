'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      effect: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      catId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Cats', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      toyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Toys', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      catActionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'CatActions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Events');
  },
};
