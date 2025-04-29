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
  CatAction,
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
        name: 'Мячик',
        price: 35,
        effect: { energy: -15, angry: -5, boldness: 5 },
        img: 'ball.svg',
      },
      {
        name: 'Елка',
        price: 15,
        effect: { affection: 5, energy: +5, angry: 5 },
        img: 'christmas-tree.svg',
      },
      {
        name: 'Клубок',
        price: 35,
        effect: { energy: -10, hp: -5, angry: -5 },
        img: 'clew.svg',
      },
      {
        name: 'Перо',
        price: 30,
        effect: { energy: -10, affection: 5, boldness: 5 },
        img: 'feather.svg',
      },
      {
        name: 'Удочка',
        price: 15,
        effect: { energy: -10, boldness: 10 },
        img: 'fish-rod.svg',
      },
      {
        name: 'Рыбка',
        price: 20,
        effect: { affection: 15, hp: 5, angry: -10 },
        img: 'fish.svg',
      },
      {
        name: 'Лазер',
        price: 25,
        effect: { energy: -20, boldness: 15, angry: 10 },
        img: 'laser-pen.svg',
      },
      {
        name: 'Мышка',
        price: 10,
        effect: { hp: 5, affection: 5, energy: -5 },
        img: 'mouse.svg',
      },
      {
        name: 'Газета',
        price: 15,
        effect: { angry: 15, affection: -10 },
        img: 'newspaper.svg',
      },
      {
        name: 'Осьминог',
        price: 20,
        effect: { affection: 10, boldness: 5 },
        img: 'octopus.svg',
      },
      {
        name: 'Динозавр',
        price: 25,
        effect: { boldness: 20, angry: 5, hp: -10 },
        img: 'rex.svg',
      },
      {
        name: 'Когтеточка',
        price: 30,
        effect: { energy: -10, angry: -10, hp: +5 },
        img: 'scratching-post.svg',
      },
    ]);
    await CatAction.bulkCreate([
      {
        name: 'Покормить',
        effect: { hp: +10, energy: +20, affection: +5, angry: -5 },
      },
      {
        name: 'Поиграть',
        effect: { energy: -15, boldness: +10, affection: +5, angry: -5 },
      },
      {
        name: 'Приласкать',
        effect: { affection: +20, angry: -10, boldness: -5 },
      },
      {
        name: 'Уложить спать',
        effect: { energy: +30, angry: -10 },
      },
    ]);

    await CatPreset.bulkCreate([
      {
        name: 'Мурзик',
        imgCreate:
          'https://cdnl.iconscout.com/lottie/premium/thumb/lovely-cat-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--animal-kitten-pet-cute-pack-icons-5473697.mp4',
        imgMain:
          'https://cdnl.iconscout.com/lottie/premium/thumb/cute-cat-sitting-on-pillow-animation-download-in-lottie-json-gif-static-svg-file-formats--activity-pack-animal-animations-5605481.mp4',
        imgSleep:
          'https://cdnl.iconscout.com/lottie/premium/thumb/cat-sleeping-animation-download-in-lottie-json-gif-static-svg-file-formats--sleep-rest-pack-animal-animations-7795851.mp4',
        imgPlay:
          'https://cdnl.iconscout.com/lottie/premium/thumb/cat-playing-with-ball-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--play-kitten-kitty-pack-animal-icons-5473699.mp4',
        imgEat:
          'https://cdnl.iconscout.com/lottie/premium/thumb/cat-drinking-milk-animation-download-in-lottie-json-gif-static-svg-file-formats--pretty-logo-pet-cute-activity-pack-animal-animations-6614175.mp4',
        imgWeasel:
          'https://cdnl.iconscout.com/lottie/premium/thumb/lovely-cat-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--lover-animal-kitten-pet-pack-icons-5473698.mp4',
      },

      {
        name: 'Барсик',
        imgCreate:
          'https://img.freepik.com/premium-vector/black-cat-anime-manga-style-drawing-funny-feline-cartoon-clipart-vector_691560-11531.jpg?w=740',
        imgMain:
          'https://img.freepik.com/premium-vector/black-cat-anime-manga-style-drawing-funny-feline-cartoon-clipart-vector_691560-11531.jpg?w=740',
        imgSleep:
          'https://yac-wh-sb-prod-s3-media-07001.storage.yandexcloud.net/media/images/image_25.max-2880x1820.format-png_joUIUcI.png',
        imgPlay:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgKn_4N7PLQHZkRnMhI5bVgWZtYpunp2xK7Q&s',
        imgEat: 'https://zoo-perm.ru/wp-content/uploads/2022/01/kot-est-myaso.jpg',
        imgWeasel: 'https://news.itmo.ru/images/news/big/p8680.jpg',
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
        type: 'Basic',
      },
      {
        name: 'Любитель котиков',
        description: 'Добавил первого кота',
        reward: 20,
        type: 'Basic',
      },
      {
        name: 'Игроман',
        description: 'Поиграл с котом 5 раз',
        reward: 8,
        type: 'ToyGame',
        countCondition: 5,
      },
      {
        name: 'Задрот',
        description: 'Поиграл с котом 10 раз',
        reward: 14,
        type: 'ToyGame',
        countCondition: 10,
      },
      {
        name: 'Киберспортсмен',
        description: 'Поиграл с котом 20 раз',
        reward: 25,
        type: 'ToyGame',
        countCondition: 20,
      },
      {
        name: 'Эксперт',
        description: 'Достиг 5 уровня с котом',
        reward: 50,
        type: 'Level',
        countCondition: 5,
      },
      {
        name: 'Покупашка',
        description: 'Купить 3 игрушки',
        reward: 10,
        type: 'BuyToy',
        countCondition: 3,
      },
      {
        name: 'Шопоголик',
        description: 'Купить 5 игрушек',
        reward: 15,
        type: 'BuyToy',
        countCondition: 5,
      },
      {
        name: 'Транжира',
        description: 'Купить 10 игрушек',
        reward: 25,
        type: 'BuyToy',
        countCondition: 10,
      },
    ]);

    await UserAchievement.bulkCreate([
      {
        userId: 1,
        achievementId: 1,
      },
      {
        userId: 1,
        achievementId: 2,
      },
      {
        userId: 2,
        achievementId: 1,
      },
      {
        userId: 2,
        achievementId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Toys', null, {});
    await queryInterface.bulkDelete('CatPresets', null, {});
    await queryInterface.bulkDelete('Cats', null, {});
    await queryInterface.bulkDelete('Events', null, {});
    await queryInterface.bulkDelete('Achievements', null, {});
    await queryInterface.bulkDelete('UserAchievements', null, {});
    await queryInterface.bulkDelete('CatActions', null, {});
  },
};
