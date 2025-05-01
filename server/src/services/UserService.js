const { User } = require('../../db/models');

class UserService {
  static async getAll() {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
    });
    return users;
  }

  static async getById(id) {
    const user = await User.findByPk(id);
    return user;
  }

  static async createUser(name, email, hashedPass) {
    const newUser = await User.create({ name, email, hashedPass });
    return newUser;
  }

  static async updateUser(id, newValues) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    const updatedUser = await user.update(newValues);
    return updatedUser;
  }

  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.destroy();
  }

  static async makeUserAdmin(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    const updatedUser = await user.update({ isAdmin: true });
    return updatedUser;
  }

  static async takeUserPassword(id) {
    const user = await User.findByPk(id, {
      attributes: ['hashedPass'],
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  static async getPointsById(id) {
    const user = await User.findByPk(id, { attributes: ['points'] });
    if (!user) throw new Error('User not found');
    return user.get('points'); // Извлекаем только значение 'points'
  }

  static async setLastSession(userId) {
    const now = new Date();
    await UserService.updateUser(userId, { lastSession: now });
  }
}

module.exports = UserService;
