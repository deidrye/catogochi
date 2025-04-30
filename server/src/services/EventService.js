const { Op } = require('sequelize');
const { Event } = require('../../db/models');

class EventService {
  static async getAll() {
    const events = await Event.findAll();
    return events;
  }

  static async getAllByCatId(catId) {
    const events = await Event.findAll({
      where: {
        [Op.or]: [{ catId: null }, { catId }],
      },
    });
    return events;
  }

  static async getById(id) {
    const event = await Event.findByPk(id);
    return event;
  }

  static async create(event) {
    const newEvent = await Event.create(event);
    return newEvent;
  }

  static async update(id, fields) {
    const event = await Event.findByPk(id);
    if (!event) throw new Error('Event not found');
    const updatedEvent = await event.update(fields);
    return updatedEvent;
  }

  static async delete(id) {
    const event = await Event.findByPk(id);
    if (!event) throw new Error('Event not found');
    await event.destroy();
  }
}

module.exports = EventService;
