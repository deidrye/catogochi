const { Achievement, UserAchievement } = require('../../db/models');

class AchievementService {
  static async getAllAchievements() {
    return Achievement.findAll();
  }

  static async getAchievementById(id) {
    return Achievement.findByPk(id);
  }

  static async createAchievement(achievement) {
    return Achievement.create(achievement);
  }

  static async updateAchievement(id, newValues) {
    const achievement = await Achievement.findByPk(id);
    if (!achievement) throw new Error('Achievement not found');
    const updated = await achievement.update(newValues);
    return updated;
  }

  static async deleteAchievement(id) {
    const achievement = await Achievement.findByPk(id);
    if (!achievement) throw new Error('Achievement not found');
    await achievement.destroy();
  }

  static async getUserAchievements(userId) {
    const userAchievements = await UserAchievement.findAll({
      where: { userId },
      include: Achievement,
    }).then((achievements) => achievements.map((ua) => ua.Achievement));
    return userAchievements;
  }

  static async assignAchievementToUser(userId, achievementId) {
    const created = UserAchievement.create({ userId, achievementId });
    return created;
  }

  static async removeAchievementFromUser(userId, achievementId) {
    const userAchievement = await UserAchievement.findOne({
      where: { userId, achievementId },
    });
    if (!userAchievement) throw new Error('User achievement not found');
    await userAchievement.destroy();
  }
}

module.exports = AchievementService;
