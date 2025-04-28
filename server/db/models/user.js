'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cat, UserAchievement, UserLog }) {
      this.hasOne(Cat, { foreignKey: 'userId' });
      this.hasMany(UserAchievement, { foreignKey: 'userId' });
      this.hasMany(UserLog, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      points: DataTypes.INTEGER,
      lastSession: DataTypes.DATE,
      hashedPass: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
