const { Achievement, UserAchievement } = require('../../db/models');

class AchievementService {
  static async getAllAchievements() {
    return Achievement.findAll();
  }

  static async getAchievementsByType(type) {
    return Achievement.findAll({ where: { type } });
  }

  static async getAchievementById(id) {
    return Achievement.findByPk(id);
  }

  static async createAchievement(achievement) {
    return Achievement.findOrCreate(achievement);
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
    const [, created] = await UserAchievement.findOrCreate({
      where: { userId, achievementId },
    });
    const achieve = await Achievement.findByPk(achievementId);
    console.log('HEHE', achieve);

    return [achieve, created];
  }

  static async removeAchievementFromUser(userId, achievementId) {
    const userAchievement = await UserAchievement.findOne({
      where: { userId, achievementId },
    });
    if (!userAchievement) throw new Error('User achievement not found');
    await userAchievement.destroy();
  }

  static async getUnassignedAchievementsByType(userId, type) {
    const unassignedAchievements = await Achievement.findAll({
      include: [
        {
          model: UserAchievement,
          where: { userId },
          required: false,
        },
      ],
      where: {
        type,
        '$UserAchievements.id$': null,
      },
      order: [['countCondition', 'ASC']],
    });

    return unassignedAchievements;
  }
}

module.exports = AchievementService;
