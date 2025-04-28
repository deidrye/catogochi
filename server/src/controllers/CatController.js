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
      if (!req.body.name || !req.body.catPresetId) {
        return res.status(400).json({
          message: 'Необходимо указать имя и ID пресета кота',
        });
      }

      const defaultCat = {
        angry: 100,
        hp: 100,
        energy: 100,
        affection: 100,
        boldness: 100,
        level: 1,
      };

      const catData = {
        ...req.body,
        ...defaultCat,
        userId: res.locals.user?.id,
      };

      const cat = await CatService.create(catData);

      res.status(201).json(cat);
    } catch (error) {
      console.error('Create cat error:', error);
      res.status(500).json({
        message: 'Ошибка сервера при создании кота',
        error: error.message,
      });
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
