'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Event, Toy, CatAction }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Event, { foreignKey: 'eventId' });
      this.belongsTo(Toy, { foreignKey: 'toyId' });
      this.belongsTo(CatAction, { foreignKey: 'catActionId' });
    }
  }
  UserLog.init(
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
      toyId: DataTypes.INTEGER,
      catActionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserLog',
    },
  );
  return UserLog;
};
