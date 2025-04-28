const { Toy, Event, Cat, User } = require('../../db/models');
class ToyService {
  static async getAll(catId) {
    const toys = await Toy.findAll();
    const boughtToys = await Event.findAll({
      where: { catId },
      attributes: ['toyId'],
    });

    const toysWithStatus = toys.map((toy) => ({
      ...toy.get({ plain: true }),
      isBought: boughtToys.some((event) => event.toyId === toy.id),
    }));
    return toysWithStatus;
  }

  static async getById(id) {
    const toy = await Toy.findByPk(id);
    return toy;
  }

  static async create(toy) {
    const newToy = await Toy.create(toy);
    return newToy;
  }

  static async update(id, fields) {
    const toy = await Toy.findByPk(id);
    if (!toy) throw new Error('Toy not found');
    const updatedToy = await toy.update(fields);
    return updatedToy;
  }

  static async delete(id) {
    const toy = await Toy.findByPk(id);
    if (!toy) throw new Error('Toy not found');
    await toy.destroy();
  }

  static async buyToy(catId, toyId) {
    const toy = await Toy.findByPk(toyId);
    if (!toy) throw new Error('Toy not found');

    // Сначала находим кота по catId
    const cat = await Cat.findByPk(catId);
    if (!cat) throw new Error('Cat not found');

    // Затем через cat.userId находим пользователя
    const user = await User.findByPk(cat.userId);
    if (!user) throw new Error('User not found');

    // Проверяем баланс
    if (user.points < toy.price) {
      throw new Error('Недостаточно рыбок для покупки игрушки');
    }

    // Списываем цену игрушки
    user.points -= toy.price;
    await user.save();

    let title;
    let description;
    switch (toy.name) {
      case 'Мячик':
        title = `Мячик для котика: игра началась!`;
        description = `Ваш котик с радостью ловит мячик и не отпускает его!`;
        break;
      case 'Елка':
        title = `Котик играет с новогодней елкой!`;
        description = `Елка — теперь новый центр внимания для вашего пушистика!`;
        break;
      case 'Клубок':
        title = `Котик не может оторваться от клубка!`;
        description = `Котик катит клубок по всей комнате, как чемпион!`;
        break;
      case 'Перо':
        title = `Перо — идеальное развлечение для кота!`;
        description = `С пером  ваш котик будет в постоянном движении!`;
        break;
      case 'Удочка':
        title = `Удочка — кот стал профессиональным рыболовом!`;
        description = `Котик ловит игрушки с удочкой — настоящий рыболов!`;
        break;
      case 'Рыбка':
        title = `Котик теперь с рыбкой !`;
        description = `Рыбка сделала котика невероятно счастливым!`;
        break;
      case 'Лазер':
        title = `Лазер  — котик охотится за светом!`;
        description = `Лазер заставляет кота прыгать как настоящий спортсмен!`;
        break;
      case 'Мышка':
        title = `Мышка — ловушка для кота!`;
        description = `Мышка стала лучшей добычей для вашего котика!`;
        break;
      case 'Газета':
        title = `Газета — котик готов к прокачке!`;
        description = `Газета  привела котика в ярость — он не может остановиться!`;
        break;
      case 'Осьминог':
        title = `Осьминог — котик с ловкими лапками!`;
        description = `Осьминог  помогает котику развить ловкость!`;
        break;
      case 'Динозавр':
        title = `Динозавр  — котик снова охотится за приключениями!`;
        description = `Динозавр стал настоящим другом котика!`;
        break;
      case 'Когтеточка':
        title = `Котик точит коготки на когтеточке !`;
        description = `Котик обожает точить когти на когтеточке.`;
        break;
      default:
        title = `Игрушка "${toy.name}" — подарок для котика!`;
        description = `Ваш котик теперь наслаждается игрушкой.`;
    }

    const event = await Event.create({
      title,
      description,
      effect: toy.effect,
      catId,
      toyId,
    });

    return {
      ...event.get({ plain: true }),
      Toy: {
        id: toy.id,
        img: toy.img,
        name: toy.name,
        price: toy.price,
        effect: toy.effect,
      },
    };
  }

  static async getOwnedToys(catId) {
    const eventsWithToys = await Event.findAll({
      where: { catId },
      include: {
        model: Toy,
        attributes: ['id', 'name', 'price', 'effect', 'img'],
      },
    });
    return eventsWithToys;
  }
}

module.exports = ToyService;
