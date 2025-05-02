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
        effect: { energy: -10, angry: -5, boldness: 10, affection: 5 },
        img: 'ball.svg',
      },
      {
        name: 'Елка',
        price: 15,
        effect: { energy: -15, angry: 5, affection: 10 },
        img: 'christmas-tree.svg',
      },
      {
        name: 'Клубок',
        price: 35,
        effect: { energy: -5, angry: -5, affection: 5, boldness: 5 },
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
        effect: { energy: -15, boldness: 10, affection: 5 },
        img: 'fish-rod.svg',
      },
      {
        name: 'Рыбка',
        price: 20,
        effect: { energy: -5, affection: 15, hp: 10, angry: -5 },
        img: 'fish.svg',
      },
      {
        name: 'Лазер',
        price: 25,
        effect: { energy: -20, boldness: 15, angry: 20 },
        img: 'laser-pen.svg',
      },
      {
        name: 'Мышка',
        price: 10,
        effect: { hp: 5, affection: 10, energy: -5 },
        img: 'mouse.svg',
      },
      {
        name: 'Газета',
        price: 15,
        effect: { energy: -5, angry: 15, affection: -10 },
        img: 'newspaper.svg',
      },
      {
        name: 'Осьминог',
        price: 20,
        effect: { energy: -10, affection: 10, boldness: 10 },
        img: 'octopus.svg',
      },
      {
        name: 'Динозавр',
        price: 25,
        effect: { energy: -10, boldness: 20, angry: 5, hp: -10 },
        img: 'rex.svg',
      },
      {
        name: 'Когтеточка',
        price: 30,
        effect: { energy: -10, angry: -20, hp: +5, boldness: 5 },
        img: 'scratching-post.svg',
      },
    ]);
    await CatAction.bulkCreate([
      {
        name: 'Еда',
        description: 'Вы накормили кота! Он теперь сыт и доволен',
        effect: { hp: +10, energy: +20, affection: +5, angry: -5 },
      },
      {
        name: 'Игра',
        description: 'Вы поиграли с котом! Он стал немного счастливее',
        effect: { energy: -15, boldness: +10, affection: +5, angry: -5 },
      },
      {
        name: 'Гладить',
        description: 'Вы приласкали кота! Он замурлыкал от удовольствия',
        effect: { affection: +20, angry: -10, boldness: -5 },
      },
      {
        name: 'Спать',
        description: 'Кот уютно устроился и заснул...',
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
        // imgSleep:
        //   'https://cdnl.iconscout.com/lottie/premium/thumb/cat-sleeping-on-pillow-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--pretty-logo-rest-sleep-activity-pack-animal-icons-7865287.mp4',
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
          'https://cdnl.iconscout.com/lottie/premium/thumb/graduate-cat-animated-sticker-download-in-lottie-json-gif-static-svg-file-formats--cute-kitten-degree-pet-mortarboard-pack-animal-stickers-7342914.mp4',
        imgMain:
          'https://cdnl.iconscout.com/lottie/premium/thumb/cat-reading-news-animated-sticker-download-in-lottie-json-gif-static-svg-file-formats--newspaper-kitten-pack-animal-stickers-7342906.mp4',
        imgSleep:
          'https://cdnl.iconscout.com/lottie/premium/thumb/cat-sleeping-animated-sticker-download-in-lottie-json-gif-static-svg-file-formats--napping-kitten-pet-pack-animal-stickers-7342902.mp4',
        imgPlay:
          'https://cdnl.iconscout.com/lottie/premium/thumb/cat-on-basketball-animated-sticker-download-in-lottie-json-gif-static-svg-file-formats--ball-toy-playing-pack-animal-stickers-7342901.mp4',
        imgEat:
          'https://cdnl.iconscout.com/lottie/premium/thumb/chef-cat-animated-sticker-download-in-lottie-json-gif-static-svg-file-formats--animal-cute-kitten-pet-knife-toque-pack-stickers-7342917.mp4',
        imgWeasel:
          'https://cdnl.iconscout.com/lottie/premium/thumb/cat-with-flower-animated-sticker-download-in-lottie-json-gif-static-svg-file-formats--valentine-cute-kitten-pet-pack-animal-stickers-7342923.mp4',
      },
    ]);

    await Cat.bulkCreate([
      {
        name: 'Мурзик',
        userId: 1,
        angry: 3,
        hp: 75,
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
        hp: 85,
        energy: 65,
        affection: 55,
        boldness: 40,
        level: 1,
        catPresetId: 2,
      },
    ]);

    await Event.bulkCreate([
      {
        title: 'Упал в лужу',
        description: 'Кот упал в лужу и в него стреляли',
        effect: { hp: -5 },
        catId: null,
        toyId: null,
      },
      {
        title: 'Включился пылесос',
        description: 'Кот слишком активно убегал',
        effect: { energy: -15 },
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
      {
        name: 'Заботливый хозяин',
        description: 'Покормил кота 5 раз',
        reward: 15,
        type: 'Feed',
        countCondition: 5,
      },
      {
        name: 'Шеф-повар для кота',
        description: 'Покормил кота 20 раз',
        reward: 30,
        type: 'Feed',
        countCondition: 20,
      },
      {
        name: 'Лучший друг кота',
        description: 'Поиграл с котом 5 раз',
        reward: 15,
        type: 'CatPlay',
        countCondition: 5,
      },
      {
        name: 'Профессиональный игрок',
        description: 'Поиграл с котом 25 раз',
        reward: 35,
        type: 'CatPlay',
        countCondition: 25,
      },
      {
        name: 'Лапочка',
        description: 'Приласкал кота 10 раз',
        reward: 20,
        type: 'Meow',
        countCondition: 10,
      },
      {
        name: 'Гуру ласк',
        description: 'Приласкал кота 50 раз',
        reward: 50,
        type: 'Meow',
        countCondition: 50,
      },
      {
        name: 'Сонный мастер',
        description: 'Уложил кота спать 10 раз',
        reward: 20,
        type: 'Sleep',
        countCondition: 10,
      },
      {
        name: 'Сомнамбула',
        description: 'Уложил кота спать 30 раз',
        reward: 40,
        type: 'Sleep',
        countCondition: 30,
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
