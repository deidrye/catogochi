const { Cat, CatPreset } = require('../../db/models');

class CatService {
  static async getAll() {
    const cats = await Cat.findAll({
      include: {
        model: CatPreset,
        attributes: ['id', 'name', 'img'],
      },
    });
    return cats;
  }

  static async getById(id) {
    const cat = await Cat.findOne({
      where: { userId: id },
      include: {
        model: CatPreset,
        attributes: [
          'id',
          'name',
          'imgMain',
          'imgSleep',
          'imgPlay',
          'imgEat',
          'imgWeasel',
          'imgCreate',
        ],
      },
    });
    if (!cat) throw new Error('Cat not found');
    return cat;
  }

  static async getPresetById(presetId) {
    const preset = await CatPreset.findByPk(presetId);
    return preset;
  }

  static async getAllPresets() {
    const presets = await CatPreset.findAll();
    return presets;
  }

  static async create(cat) {
    const preset = await CatPreset.findByPk(cat.catPresetId);
    if (!preset) {
      throw new Error('Preset not found');
    }
    const newCat = await Cat.create(cat);
    return newCat;
  }

  static async update(id, fields) {
    const cat = await Cat.findOne({ where: { userId: id } });
    if (!cat) throw new Error('Cat not found');
    await cat.update(fields);
    const updatedCat = await Cat.findOne({
      where: { userId: id },
      include: {
        model: CatPreset,
        attributes: [
          'id',
          'name',
          'imgMain',
          'imgSleep',
          'imgPlay',
          'imgEat',
          'imgWeasel',
          'imgCreate',
        ],
      },
    });
    return updatedCat;
  }

  static async delete(id) {
    const cat = await Cat.findByPk(id);
    if (!cat) throw new Error('Cat not found');
    await cat.destroy();
  }
}

module.exports = CatService;
