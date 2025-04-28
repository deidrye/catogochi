const ToyService = require('../services/ToyService');

class ToyController {
  static async getAll(req, res) {
    try {
      const { catId } = req.params; // Получаем ID кота из параметров запроса
      const toys = await ToyService.getAll(catId);
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

      // Проверка на типы данных
      const parsedCatId = parseInt(catId, 10);
      const parsedToyId = parseInt(toyId, 10);
      if (Number.isNaN(parsedCatId) || Number.isNaN(parsedToyId)) {
        return res.status(400).json({ message: 'catId и toyId должны быть числами.' });
      }

      const result = await ToyService.buyToy(parsedCatId, parsedToyId);

      return res.status(201).json(result);
    } catch (error) {
      console.error('Error in buyToy controller:', error);
      return res.status(500).json({ message: error.message || 'Ошибка сервера.' });
    }
  }

  static async getOwnedToys(req, res) {
    const catId = Number(req.params.catId);

    if (Number.isNaN(catId)) {
      return res.status(400).json({ message: 'Некорректный идентификатор кошки' });
    }

    try {
      // Получаем события с информацией о игрушках
      const events = await ToyService.getOwnedToys(catId);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка получения событий', error: error.message });
    }
  }

  // // Контроллер для получения игрушек с их статусом купленности
  // static async getToys(req, res) {
  //   const { catId } = req.params;

  //   try {
  //     // Преобразуем catId в число
  //     const catIdNumber = Number(catId);

  //     // Вызываем сервис для получения игрушек с их статусом
  //     const toys = await ToyService.getToysWithPurchaseStatus(catIdNumber);

  //     // Отправляем результат клиенту
  //     res.json(toys);
  //   } catch (error) {
  //     console.error('Ошибка при получении игрушек:', error);
  //     res.status(500).json({ error: 'Не удалось получить игрушки' });
  //   }
  // }
}

module.exports = ToyController;
