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
    try {
      if (updatedCat.hp !== undefined && updatedCat.hp < 20) {
        await sendNotificationToCat(updatedCat.id, '⚠️ Кот страдает! Срочно лечите его!');
      }
      if (updatedCat.energy !== undefined && updatedCat.energy < 15) {
        await sendNotificationToCat(updatedCat.id, '😴 Кот устал! Дайте ему поспать!');
      }
      if (updatedCat.angry !== undefined && updatedCat.angry > 70) {
        await sendNotificationToCat(
          updatedCat.id,
          '😾 Кот очень злой! Будьте осторожны.',
        );
      }
      if (updatedCat.affection !== undefined && updatedCat.affection > 80) {
        await sendNotificationToCat(updatedCat.id, '😻 Кот вас очень любит!');
      }
      if (updatedCat.boldness !== undefined && updatedCat.boldness > 80) {
        await sendNotificationToCat(updatedCat.id, '😼 Кот готов к приключениям!');
      }
    } catch (notifyErr) {
      console.error('Push notify error:', notifyErr);
    }
    return updatedCat;
  }

  static async delete(id) {
    const cat = await Cat.findByPk(id);
    if (!cat) throw new Error('Cat not found');
    await cat.destroy();
  }
}

module.exports = CatService;
