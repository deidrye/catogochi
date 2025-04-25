const AchievementService = require('../services/AchievementService');

class AchievementController {
  // Ачивки
  static async getAllAchievements(req, res) {
    try {
      const achievements = await AchievementService.getAllAchievements();
      res.status(200).json(achievements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения ачивок' });
    }
  }

  static async getAchievementById(req, res) {
    try {
      const { id } = req.params;
      const achievement = await AchievementService.getAchievementById(id);
      res.status(200).json(achievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения ачивки' });
    }
  }

  static async createAchievement(req, res) {
    try {
      const achievement = req.body;
      const newAchievement = await AchievementService.createAchievement(achievement);
      res.status(201).json(newAchievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка создания ачивки' });
    }
  }

  static async updateAchievement(req, res) {
    try {
      const { id } = req.params;
      const newValues = req.body;
      const updated = await AchievementService.updateAchievement(id, newValues);
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка обновления ачивки' });
    }
  }

  static async deleteAchievement(req, res) {
    try {
      const { id } = req.params;
      await AchievementService.deleteAchievement(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка удаления ачивки' });
    }
  }

  // Ачивки пользователя
  static async getUserAchievements(req, res) {
    try {
      const { userId } = req.params;
      const achievements = await AchievementService.getUserAchievements(userId);
      res.status(200).json(achievements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения ачивок пользователя' });
    }
  }

  static async assignAchievementToUser(req, res) {
    try {
      const { userId, achievementId } = req.body;
      const result = await AchievementService.assignAchievementToUser(
        userId,
        achievementId,
      );
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка назначения ачивки пользователю' });
    }
  }

  static async removeAchievementFromUser(req, res) {
    try {
      const { userId, achievementId } = req.body;
      await AchievementService.removeAchievementFromUser(userId, achievementId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка удаления ачивки у пользователя' });
    }
  }
}

module.exports = AchievementController;
