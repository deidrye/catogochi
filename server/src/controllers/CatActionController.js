const CatActionService = require('../services/CatActionService');
const CatService = require('../services/CatService');

class CatActionController {
  static async getAll(req, res) {
    try {
      const actions = await CatActionService.getAll();
      res.status(200).json(actions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения действий' });
    }
  }

  static async applyAction(req, res) {
    try {
      const userId = res.locals.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Пользователь не авторизован' });
      }

      const { actionName } = req.body;
      if (!actionName) {
        return res.status(400).json({ message: 'Необходимо указать действие' });
      }

      // Получаем текущего кота
      const cat = await CatService.getById(userId);
      if (!cat) {
        return res.status(404).json({ message: 'Кот не найден' });
      }

      // Применяем действие
      const updatedCat = await CatActionService.applyAction(cat, actionName);

      // Обновляем кота в базе
      const result = await CatService.update(userId, updatedCat);

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message || 'Ошибка применения действия' });
    }
  }
}

module.exports = CatActionController;
