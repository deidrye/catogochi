const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');

class AuthService {
  static async signUp(email, name, password) {
    if (!email || !name || !password) {
      throw new Error('Missing required fields');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      hashedPass: hashedPassword,
    });

    const userWithoutPassword = newUser.get({ plain: true });
    delete userWithoutPassword.hashedPass;

    const tokens = generateTokens({ user: userWithoutPassword });
    return { user: userWithoutPassword, ...tokens };
  }

  static async logIn(email, password) {
    if (!email || !password) {
      throw new Error('Missing required fields');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.hashedPass);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.hashedPass;

    const tokens = generateTokens({ user: userWithoutPassword });
    return { user: userWithoutPassword, ...tokens };
  }

  static async logOut() {
    return true;
  }

  static async refresh(user) {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const currentUser = await User.findByPk(user.id, {
      attributes: ['id', 'name', 'email'],
    });
    if (!currentUser) {
      throw new Error('User not found');
    }

    const tokens = generateTokens({ user: currentUser });
    return { user: currentUser, ...tokens };
  }
}

module.exports = AuthService;
