'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, CatPreset, Event }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(CatPreset, { foreignKey: 'catPresetId' });
      this.hasMany(Event, { foreignKey: 'catId' });
    }
  }
  Cat.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      angry: DataTypes.INTEGER,
      hp: DataTypes.INTEGER,
      energy: DataTypes.INTEGER,
      affection: DataTypes.INTEGER,
      boldness: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
      catPresetId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cat',
    },
  );
  return Cat;
};
