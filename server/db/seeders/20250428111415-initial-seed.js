'use strict';

const bcrypt = require('bcrypt');
const {
  User,
  Toy,
  CatPreset,
  Cat,
  Event,
  Achievement,
  UserAchievement,
} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await User.bulkCreate([
      { name: 'Иван Иванов', email: '1@1', hashedPass: await bcrypt.hash('123', 10) },
      { name: 'Петр Петров', email: '2@2', hashedPass: await bcrypt.hash('123', 10) },
    ]);

    await Toy.bulkCreate([
      {
        id: 1,
        name: 'Мячик',
        price: 35,
        effect: { energy: -15, angry: -5, boldness: 5 },
        img: 'ball.svg',
      },
      {
        id: 2,
        name: 'Елка',
        price: 15,
        effect: { affection: 5, energy: +5, angry: 5 },
        img: 'christmas-tree.svg',
      },
      {
        id: 3,
        name: 'Клубок',
        price: 35,
        effect: { energy: -10, hp: -5, angry: -5 },
        img: 'clew.svg',
      },
      {
        id: 4,
        name: 'Перо',
        price: 30,
        effect: { energy: -10, affection: 5, boldness: 5 },
        img: 'feather.svg',
      },
      {
        id: 5,
        name: 'Удочка',
        price: 15,
        effect: { energy: -10, boldness: 10 },
        img: 'fish-rod.svg',
      },
      {
        id: 6,
        name: 'Рыбка',
        price: 20,
        effect: { affection: 15, hp: 5, angry: -10 },
        img: 'fish.svg',
      },
      {
        id: 7,
        name: 'Лазер',
        price: 25,
        effect: { energy: -20, boldness: 15, angry: 10 },
        img: 'laser-pen.svg',
      },
      {
        id: 8,
        name: 'Мышка',
        price: 10,
        effect: { hp: 5, affection: 5, energy: -5 },
        img: 'mouse.svg',
      },
      {
        id: 9,
        name: 'Газета',
        price: 15,
        effect: { angry: 15, affection: -10 },
        img: 'newspaper.svg',
      },
      {
        id: 10,
        name: 'Осьминог',
        price: 20,
        effect: { affection: 10, boldness: 5 },
        img: 'octopus.svg',
      },
      {
        id: 11,
        name: 'Динозавр',
        price: 25,
        effect: { boldness: 20, angry: 5, hp: -10 },
        img: 'rex.svg',
      },
      {
        id: 12,
        name: 'Когтеточка',
        price: 30,
        effect: { energy: -10, angry: -10, hp: +5 },
        img: 'scratching-post.svg',
      },
    ]);

    await CatPreset.bulkCreate([
      {
        name: 'Мурзик',
        img: 'https://img.freepik.com/free-vector/sweet-eyed-kitten-cartoon-character_1308-135596.jpg?t=st=1745839355~exp=1745842955~hmac=e1299feacdbc6a328ac4af40a7ac0fa258e0841709678b7385c94d1ad65037d5&w=740',
      },
      {
        name: 'Барсик',
        img: 'https://img.freepik.com/premium-vector/black-cat-anime-manga-style-drawing-funny-feline-cartoon-clipart-vector_691560-11531.jpg?w=740',
      },
    ]);

    await Cat.bulkCreate([
      {
        name: 'Мурзик',
        userId: 1,
        angry: 3,
        hp: 100,
        energy: 80,
        affection: 70,
        boldness: 50,
        level: 2,
        catPresetId: 1,
      },
      {
        name: 'Барсик',
        userId: 2,
        angry: 2,
        hp: 90,
        energy: 60,
        affection: 85,
        boldness: 40,
        level: 1,
        catPresetId: 2,
      },
    ]);
    await Event.bulkCreate([
      {
        title: 'Играл с хвостом',
        description: 'Кот поиграл со своим хвостом и стал счастливее',
        effect: { hp: 5 },
        catId: null,
        toyId: null,
      },
      {
        title: 'Включился пылесос',
        description: 'Кот слишком активно убегал',
        effect: { energy: -5 },
        catId: null,
        toyId: null,
      },
    ]);

    await Achievement.bulkCreate([
      {
        name: 'Новичок',
        description: 'Зарегистрировался в приложении',
        reward: 10,
      },
      {
        name: 'Любитель котиков',
        description: 'Добавил первого кота',
        reward: 20,
      },
      {
        name: 'Игроман',
        description: 'Поиграл с котом 10 раз',
        reward: 30,
      },
      {
        name: 'Эксперт',
        description: 'Достиг 5 уровня с котом',
        reward: 50,
      },
    ]);

    await UserAchievement.bulkCreate([
      {
        userId: 1,
        achievementId: 1,
      },
      {
        userId: 2,
        achievementId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
