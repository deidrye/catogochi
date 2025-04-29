'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CatPreset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cat }) {
      this.hasMany(Cat, { foreignKey: 'catPresetId' });
    }
  }
  CatPreset.init(
    {
      name: DataTypes.STRING,
      imgMain: DataTypes.TEXT,
      imgSleep: DataTypes.TEXT,
      imgPlay: DataTypes.TEXT,
      imgEat: DataTypes.TEXT,
      imgWeasel: DataTypes.TEXT,
      imgCreate: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'CatPreset',
    },
  );
  return CatPreset;
};
