'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAchievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Achievement }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Achievement, { foreignKey: 'achievementId' });
    }
  }
  UserAchievement.init(
    {
      userId: DataTypes.INTEGER,
      achievementId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserAchievement',
    },
  );
  return UserAchievement;
};
