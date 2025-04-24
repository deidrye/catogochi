const CatService = require('../services/CatService');

class CatController {
  static async getAll(req, res) {
    try {
      const cats = await CatService.getAll();
      res.status(200).json(cats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения котов' });
    }
  }

  static async getById(req, res) {
    try {
      const cat = await CatService.getById(Number(req.params.id));
      res.status(200).json(cat);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Кот не найден' });
    }
  }

  static async create(req, res) {
    try {
      const cat = await CatService.create(req.body);
      res.status(201).json(cat);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Ошибка при создании кота' });
    }
  }

  static async update(req, res) {
    try {
      const cat = await CatService.update(Number(req.params.id), req.body);
      res.status(200).json(cat);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Ошибка обновления кота' });
    }
  }

  static async delete(req, res) {
    try {
      await CatService.delete(Number(req.params.id));
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Ошибка удаления кота' });
    }
  }
}

module.exports = CatController;
