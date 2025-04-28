const { Toy, Event } = require('../../db/models');
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

    let title;
    let description;
    switch (toy.name) {
      case 'Мячик':
        title = 'Мячик для котика: игра началась!';
        description = 'Ваш котик с радостью ловит мячик и не отпускает его!';
        break;
      // Остальные case аналогично
      default:
        title = `Игрушка "${toy.name}" — подарок для котика!`;
        description = 'Ваш котик теперь наслаждается игрушкой.';
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
