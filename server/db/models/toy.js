'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, UserLog}) {
      this.hasMany(Event, { foreignKey: 'toyId' });
      this.hasMany(UserLog, { foreignKey: 'toyId' });
    }
  }
  Toy.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      effect: DataTypes.JSONB,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Toy',
    },
  );
  return Toy;
};
