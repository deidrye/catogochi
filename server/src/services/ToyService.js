const supabase = require('../../supabase/supabaseClient');

class ToyService {
  // Получение всех игрушек из магазина
  static async getAll(catId) {
    try {
      // Получаем все игрушки из магазина
      const { data: toys, error: toysError } = await supabase.from('toys').select('*');
      if (toysError) throw toysError;

      // Получаем купленные игрушки для данного кота
      const { data: boughtToys, error: boughtToysError } = await supabase
        .from('events')
        .select('toyId')
        .eq('catId', catId);

      if (boughtToysError) throw boughtToysError;

      // Добавляем флаг "isBought" для каждой игрушки
      const toysWithStatus = toys.map((toy) => {
        const isBought = boughtToys.some((event) => event.toyId === toy.id);
        return { ...toy, isBought };
      });

      return toysWithStatus;
    } catch (error) {
      console.error('Ошибка при получении игрушек:', error);
      throw error;
    }
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
        description = `Ваш котик с радостью ловит мячик и не отпускает его!`;
        break;
      case 'Елка':
        title = `Котик играет с новогодней елкой!`;
        description = `Елка — теперь новый центр внимания для вашего пушистика!`;
        break;
      case 'Клубок':
        title = `Котик не может оторваться от клубка!`;
        description = `Котик катит клубок по всей комнате, как чемпион!`;
        break;
      case 'Перо':
        title = `Перо — идеальное развлечение для кота!`;
        description = `С пером  ваш котик будет в постоянном движении!`;
        break;
      case 'Удочка':
        title = `Удочка — кот стал профессиональным рыболовом!`;
        description = `Котик ловит игрушки с удочкой — настоящий рыболов!`;
        break;
      case 'Рыбка':
        title = `Котик теперь с рыбкой !`;
        description = `Рыбка сделала котика невероятно счастливым!`;
        break;
      case 'Лазер':
        title = `Лазер  — котик охотится за светом!`;
        description = `Лазер заставляет кота прыгать как настоящий спортсмен!`;
        break;
      case 'Мышка':
        title = `Мышка — ловушка для кота!`;
        description = `Мышка стала лучшей добычей для вашего котика!`;
        break;
      case 'Газета':
        title = `Газета — котик готов к прокачке!`;
        description = `Газета  привела котика в ярость — он не может остановиться!`;
        break;
      case 'Осьминог':
        title = `Осьминог — котик с ловкими лапками!`;
        description = `Осьминог  помогает котику развить ловкость!`;
        break;
      case 'Динозавр':
        title = `Динозавр  — котик снова охотится за приключениями!`;
        description = `Динозавр стал настоящим другом котика!`;
        break;
      case 'Когтеточка':
        title = `Котик точит коготки на когтеточке !`;
        description = `Котик обожает точить когти на когтеточке.`;
        break;
      default:
        title = `Игрушка "${toy.name}" — подарок для котика!`;
        description = `Ваш котик теперь наслаждается игрушкой.`;
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

    // // Возвращаем информацию о событии и игрушке
    // return { event, toy }; // Добавляем toy к возвращаемому объекту

    // Возвращаем информацию о событии и игрушке
    // return {
    //   event,
    //   toy: {
    //     id: toy.id,
    //     name: toy.name,
    //     price: toy.price,
    //     effect: toy.effect,
    //     img: toy.img,
    //   },
    // };

    return {
      ...event,
      toys: {
        id: toy.id,
        img: toy.img,
        name: toy.name,
        price: toy.price,
        effect: toy.effect,
      },
    };
  }

  static async getOwnedToys(catId) {
    try {
      // Используем SQL-запрос для объединения данных из events и toys
      const { data, error } = await supabase
        .from('events')
        .select(
          `
          id,
          catId,
          toyId,
          created_at,
          title,
          description,
          effect,
          toys (
            id,
            name,
            price,
            effect,
            img
          )
        `,
        )
        .eq('catId', catId); // Фильтруем по catId

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Ошибка при получении событий с игрушками:', error);
      throw error;
    }
  }

  // Функция для получения всех игрушек с их статусом купленности
  // static async getToysWithPurchaseStatus(catId) {
  //   // Получаем все игрушки из базы данных
  //   const { data: toys, error: toysError } = await supabase.from('toys').select('*');

  //   if (toysError) {
  //     throw new Error('Не удалось получить игрушки');
  //   }

  //   // Получаем все события для данного кота, чтобы узнать, какие игрушки были куплены
  //   const { data: events, error: eventsError } = await supabase
  //     .from('events')
  //     .select('toyId')
  //     .eq('catId', catId);

  //   if (eventsError) {
  //     throw new Error('Не удалось получить события кота');
  //   }

  //   // Получаем список купленных игрушек (по toyId из событий)
  //   const purchasedToyIds = events.map((event) => event.toyId);

  //   // Добавляем в игрушки статус купленности
  //   const updatedToys = toys.map((toy) => ({
  //     ...toy,
  //     isPurchased: purchasedToyIds.includes(toy.id),
  //   }));

  //   return updatedToys;
  // }
}

module.exports = ToyService;
