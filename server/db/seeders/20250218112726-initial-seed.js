const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Добавляем пользователей
    const users = [
      {
        name: 'Denis',
        email: 'Denis@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Lisa',
        email: 'Lisa@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Nikita',
        email: 'Nikita@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Nastya',
        email: 'Nastya@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
