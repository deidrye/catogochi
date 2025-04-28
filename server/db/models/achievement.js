'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserAchievement }) {
      this.hasMany(UserAchievement, { foreignKey: 'achievementId' });
    }
  }
  Achievement.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      reward: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Achievement',
    },
  );
  return Achievement;
};
