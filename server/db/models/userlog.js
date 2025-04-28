'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Event, Toy }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Event, { foreignKey: 'eventId' });
      this.belongsTo(Toy, { foreignKey: 'toyId' });
    }
  }
  UserLog.init(
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
      toyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserLog',
    },
  );
  return UserLog;
};
