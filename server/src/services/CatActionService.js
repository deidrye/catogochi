const { CatAction } = require('../../db/models');

class CatActionService {
  static async getAll() {
    const actions = await CatAction.findAll();
    return actions;
  }

  static async getByName(name) {
    const action = await CatAction.findOne({ where: { name } });
    if (!action) throw new Error('Action not found');
    return action;
  }

  static async applyAction(cat, actionName) {
    const action = await this.getByName(actionName);
    const updatedCat = { ...cat };

    // Применяем эффекты действия
    Object.entries(action.effect).forEach(([key, value]) => {
      if (key in updatedCat) {
        updatedCat[key] = Math.max(0, Math.min(100, updatedCat[key] + value));
      }
    });

    return updatedCat;
  }
}

module.exports = CatActionService;
