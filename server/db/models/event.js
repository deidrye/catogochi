'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cat, Toy, UserLog, CatAction }) {
      this.belongsTo(Cat, { foreignKey: 'catId' });
      this.belongsTo(Toy, { foreignKey: 'toyId' });
      this.hasMany(UserLog, { foreignKey: 'toyId' });
      this.belongsTo(CatAction, { foreignKey: 'catActionId' });
    }
  }
  Event.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      effect: DataTypes.JSONB,
      catId: DataTypes.INTEGER,
      toyId: DataTypes.INTEGER,
      catActionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Event',
    },
  );
  return Event;
};
