'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cat, Toy }) {
      this.belongsTo(Cat, { foreignKey: 'catId' });
      this.belongsTo(Toy, { foreignKey: 'toyId' });
    }
  }
  Event.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      effect: DataTypes.JSONB,
      catId: DataTypes.INTEGER,
      toyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Event',
    },
  );
  return Event;
};
