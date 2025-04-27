const supabase = require('../../supabase/supabaseClient');

class ToyService {
  // Получение всех игрушек из магазина
  static async getAll() {
    const { data, error } = await supabase.from('toys').select('*');
    if (error) throw error;
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase.from('toys').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  static async create(toy) {
    const { data, error } = await supabase.from('toys').insert([toy]).select().single();
    if (error) throw error;
    return data;
  }

  static async update(id, fields) {
    const { data, error } = await supabase
      .from('toys')
      .update(fields)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase.from('toys').delete().eq('id', id);
    if (error) throw error;
  }

  // ----------Вся логика связанная с событиями игрушек------------

  static async buyToy(catId, toyId) {
    // Получаем игрушку
    const { data: toy, error: toyError } = await supabase
      .from('toys')
      .select('*')
      .eq('id', toyId)
      .single();

    if (toyError || !toy) {
      throw new Error('Игрушка не найдена.');
    }

    // Определение title и description на основе имени игрушки
    let title;
    let description;

    switch (toy.name) {
      case 'Мячик':
        title = `Мячик для котика: игра началась!`;
        description = `Ваш котик с радостью ловит мячик "${toy.name}" и не отпускает его!`;
        break;
      case 'Елка':
        title = `Котик играет с новогодней елкой!`;
        description = `Елка "${toy.name}" — теперь новый центр внимания для вашего пушистика!`;
        break;
      case 'Клубок':
        title = `Котик не может оторваться от клубка!`;
        description = `Котик катит клубок "${toy.name}" по всей комнате, как чемпион!`;
        break;
      case 'Перо':
        title = `Перо "${toy.name}" — идеальное развлечение для кота!`;
        description = `С пером "${toy.name}" ваш котик будет в постоянном движении!`;
        break;
      case 'Удочка':
        title = `Удочка "${toy.name}" — кот стал профессиональным рыболовом!`;
        description = `Котик ловит игрушки с удочкой "${toy.name}" — настоящий рыболов!`;
        break;
      case 'Рыбка':
        title = `Котик теперь с рыбкой "${toy.name}"!`;
        description = `Рыбка "${toy.name}" сделала котика невероятно счастливым!`;
        break;
      case 'Лазер':
        title = `Лазер "${toy.name}" — котик охотится за светом!`;
        description = `Лазер "${toy.name}" заставляет кота прыгать как настоящий спортсмен!`;
        break;
      case 'Мышка':
        title = `Мышка "${toy.name}" — ловушка для кота!`;
        description = `Мышка "${toy.name}" стала лучшей добычей для вашего котика!`;
        break;
      case 'Газета':
        title = `Газета "${toy.name}" — котик готов к прокачке!`;
        description = `Газета "${toy.name}" привела котика в ярость — он не может остановиться!`;
        break;
      case 'Осьминог':
        title = `Осьминог "${toy.name}" — котик с ловкими лапками!`;
        description = `Осьминог "${toy.name}" помогает котику развить ловкость!`;
        break;
      case 'Динозавр':
        title = `Динозавр "${toy.name}" — котик снова охотится за приключениями!`;
        description = `Динозавр "${toy.name}" стал настоящим другом котика!`;
        break;
      case 'Когтеточка':
        title = `Котик точит коготки на когтеточке "${toy.name}"!`;
        description = `Котик обожает точить когти на когтеточке "${toy.name}".`;
        break;
      default:
        title = `Игрушка "${toy.name}" — подарок для котика!`;
        description = `Ваш котик теперь наслаждается игрушкой "${toy.name}".`;
    }

    // Создаем новое событие
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert([
        {
          title, // Используем title
          description, // Используем description
          effect: toy.effect,
          catId,
          toyId,
        },
      ])
      .select()
      .single();

    if (eventError) {
      console.error('Ошибка при создании события:', eventError);
      throw new Error('Не удалось создать событие.');
    }

    return event;
  }
}

module.exports = ToyService;
