const EventService = require('../services/EventService');

class EventController {
  static async getAll(req, res) {
    try {
      const events = await EventService.getAll();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения событий' });
    }
  }

  static async getById(req, res) {
    try {
      const event = await EventService.getById(Number(req.params.id));
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Событие не найдено' });
    }
  }

  static async create(req, res) {
    try {
      const event = await EventService.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Ошибка создания события' });
    }
  }

  static async update(req, res) {
    try {
      const event = await EventService.update(Number(req.params.id), req.body);
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Ошибка обновления события' });
    }
  }

  static async delete(req, res) {
    try {
      await EventService.delete(Number(req.params.id));
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Ошибка удаления события' });
    }
  }
}

module.exports = EventController;
