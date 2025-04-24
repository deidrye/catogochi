const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');

class UserController {
  static async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      console.log('[DB] /api/users/getAll');
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка получения пользователей' });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getById(id);
      if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
      console.log('[DB] /api/users/getById');
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка получения пользователя' });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await UserService.createUser(name, email, hashedPass);
      console.log('[DB] /api/users/createUser');
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка создания пользователя' });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const newValues = req.body;
      const user = await UserService.updateUser(id, newValues);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка обновления пользователя' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка удаления пользователя' });
    }
  }

  static async makeUserAdmin(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.makeUserAdmin(id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка назначения администратора' });
    }
  }

  static async takeUserPassword(req, res) {
    try {
      const { id } = req.params;
      const password = await UserService.takeUserPassword(id);
      res.status(200).json(password);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения пароля пользователя' });
    }
  }
}

module.exports = UserController;
