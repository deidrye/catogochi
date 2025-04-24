const bcrypt = require('bcrypt');
const supabase = require('../../supabase/supabaseClient');
const generateTokens = require('../utils/generateTokens');

class AuthService {
  static async signUp(email, name, password) {
    console.log(password);

    if (!email || !name || !password) {
      throw new Error('Отсутствуют обязательные поля');
    }

    // Проверяем, существует ли пользователь
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('Пользователь уже существует');
    }

    // Если пользователя нет, создаем нового
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          hashedPass: hashedPassword,
        },
      ])
      .select('id, name, email')
      .single();

    if (createError) throw createError;

    const tokens = generateTokens({ user: newUser });
    return { user: newUser, ...tokens };
  }

  static async logIn(email, password) {
    if (!email || !password) {
      throw new Error('Отсутствуют обязательные поля');
    }

    // Ищем пользователя
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (findError || !user) {
      throw new Error('Не верный логин или пароль');
    }

    // Проверяем пароль
    const isValidPassword = await bcrypt.compare(password, user.hashedPass);
    if (!isValidPassword) {
      throw new Error('Не верный логин или пароль');
    }

    // Удаляем хэш пароля перед возвратом
    const { hashedPass, ...userWithoutPassword } = user;

    const tokens = generateTokens({ user: userWithoutPassword });
    return { user: userWithoutPassword, ...tokens };
  }

  static async logOut() {
    return true;
  }
}

module.exports = AuthService;
