const ToyService = require('../services/ToyService');

class ToyController {
  static async getAll(req, res) {
    try {
      const toys = await ToyService.getAll();
      res.status(200).json(toys);
    } catch (e) {
      res.status(500).json({ message: 'Ошибка получения игрушек', error: e.message });
    }
  }

  static async getById(req, res) {
    try {
      const toy = await ToyService.getById(Number(req.params.id));
      res.status(200).json(toy);
    } catch (e) {
      res.status(404).json({ message: 'Игрушка не найдена', error: e.message });
    }
  }

  static async create(req, res) {
    try {
      const toy = await ToyService.create(req.body);
      res.status(201).json(toy);
    } catch (e) {
      res.status(400).json({ message: 'Ошибка при создании игрушки', error: e.message });
    }
  }

  static async update(req, res) {
    try {
      const toy = await ToyService.update(Number(req.params.id), req.body);
      res.status(200).json(toy);
    } catch (e) {
      res.status(400).json({ message: 'Ошибка обновления', error: e.message });
    }
  }

  static async delete(req, res) {
    try {
      await ToyService.delete(Number(req.params.id));
      res.status(204).end();
    } catch (e) {
      res.status(400).json({ message: 'Ошибка удаления', error: e.message });
    }
  }

  // ----------Вся логика связанная с событиями игрушек------------

  static async buyToy(req, res) {
    try {
      const { catId, toyId } = req.body;

      if (!catId || !toyId) {
        return res.status(400).json({ message: 'catId и toyId обязательны.' });
      }

      const event = await ToyService.buyToy(catId, toyId);

      return res.status(201).json({ message: 'Игрушка успешно куплена!', event });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: error.message || 'Ошибка сервера.' });
    }
  }
}

module.exports = ToyController;
