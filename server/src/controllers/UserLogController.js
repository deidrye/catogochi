const AchievementService = require('../services/AchievementService');
const UserLogService = require('../services/UserLogService');

class UserLogController {
  static async getAllLogs(req, res) {
    try {
      const logs = await UserLogService.getAllLogs();
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения логов' });
    }
  }

  static async getLogById(req, res) {
    try {
      const { id } = req.params;
      const log = await UserLogService.getLogById(id);
      if (!log) return res.status(404).json({ message: 'Лог не найден' });
      res.status(200).json(log);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения лога' });
    }
  }

  static async createLog(req, res) {
    try {
      const { userId, type, eventId, toyId, achievementId } = req.body;
      await UserLogService.createLog({
        userId,
        type,
        eventId,
        toyId,
      });
      const thisTypeLogs = await UserLogService.getUserLogsByType({
        userId,
        type,
      });
      const unassignedAchievements =
        await AchievementService.getUnassignedAchievementsByType(userId, type);
      const parsedAchieves = JSON.parse(JSON.stringify(unassignedAchievements));
      const reachedAchievements = [];
      if (type === 'Basic' && achievementId) {
        const [achieve, created] = await AchievementService.assignAchievementToUser(
          userId,
          achievementId,
        );
        if (created) {
          reachedAchievements.push(achieve);
        } else {
          return res.status(400).json({ message: 'Достижение уже получено' });
        }
      } else {
        for (const achieve of parsedAchieves) {
          if (achieve.countCondition <= thisTypeLogs.length) {
            // eslint-disable-next-line no-await-in-loop
            await AchievementService.assignAchievementToUser(userId, achieve.id);
            reachedAchievements.push(achieve);
          } else break;
        }
      }

      return res.status(201).json(reachedAchievements);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка создания лога' });
    }
  }

  static async updateLog(req, res) {
    try {
      const { id } = req.params;
      const newValues = req.body;
      const updated = await UserLogService.updateLog(id, newValues);
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка обновления лога' });
    }
  }

  static async deleteLog(req, res) {
    try {
      const { id } = req.params;
      await UserLogService.deleteLog(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка удаления лога' });
    }
  }

  static async getUserLogs(req, res) {
    try {
      const { userId } = req.params;

      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: 'Не указан userId' });
      }
      if (Number.isNaN(Number(userId))) {
        return res.status(400).json({ message: 'userId должен быть числом' });
      }

      const logs = await UserLogService.getUserLogs(Number(userId));

      return res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка получения логов пользователя' });
    }
  }

  static async getUserLogsByType(req, res) {
    try {
      const { userId } = req.params;
      const logsByType = await UserLogService.getUserLogsByType({
        type: req.query.type,
        userId,
      });
      return res.status(200).json(logsByType);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Ошибка получения логов пользователя по типу' });
    }
  }
}

module.exports = UserLogController;
