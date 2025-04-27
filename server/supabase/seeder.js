const supabase = require('./supabaseClient');
const bcrypt = require('bcrypt');

async function clearAll() {
  await supabase.from('events').delete().neq('id', 0);
  await supabase.from('catPresets').delete().neq('id', 0);
  await supabase.from('cats').delete().neq('id', 0);
  await supabase.from('toys').delete().neq('id', 0);
  await supabase.from('users').delete().neq('id', 0);
  await supabase.from('achievments').delete().neq('id', 0);
  await supabase.from('user_achievments').delete().neq('id', 0);
}

async function seed() {
  const { data: users, error: userError } = await supabase
    .from('users')
    .insert([
      { name: 'Иван Иванов', email: '1@1', hashedPass: await bcrypt.hash('123', 10) },
      { name: 'Петр Петров', email: '2@2', hashedPass: await bcrypt.hash('123', 10) },
    ])
    .select();

  if (userError) {
    console.error('Ошибка при вставке пользователей:', userError);
    return;
  }

  const { data: toys, error: toyError } = await supabase
    .from('toys')
    .insert([
      {
        id: 1,
        name: 'Мячик',
        price: 35,
        effect: { energy: -15, angry: -5, boldness: 5 },
        img: 'ball.svg',
      },
      {
        id: 2,
        name: 'Елка',
        price: 15,
        effect: { affection: 5, energy: +5, angry: 5 },
        img: 'christmas-tree.svg',
      },
      {
        id: 3,
        name: 'Клубок',
        price: 35,
        effect: { energy: -10, hp: -5, angry: -5 },
        img: 'clew.svg',
      },
      {
        id: 4,
        name: 'Перо',
        price: 30,
        effect: { energy: -10, affection: 5, boldness: 5 },
        img: 'feather.svg',
      },
      {
        id: 5,
        name: 'Удочка',
        price: 15,
        effect: { energy: -10, boldness: 10 },
        img: 'fish-rod.svg',
      },
      {
        id: 6,
        name: 'Рыбка',
        price: 20,
        effect: { affection: 15, hp: 5, angry: -10 },
        img: 'fish.svg',
      },
      {
        id: 7,
        name: 'Лазер',
        price: 25,
        effect: { energy: -20, boldness: 15, angry: 10 },
        img: 'laser-pen.svg',
      },
      {
        id: 8,
        name: 'Мышка',
        price: 10,
        effect: { hp: 5, affection: 5, energy: -5 },
        img: 'mouse.svg',
      },
      {
        id: 9,
        name: 'Газета',
        price: 15,
        effect: { angry: 15, affection: -10 },
        img: 'newspaper.svg',
      },
      {
        id: 10,
        name: 'Осьминог',
        price: 20,
        effect: { affection: 10, boldness: 5 },
        img: 'octopus.svg',
      },
      {
        id: 11,
        name: 'Динозавр',
        price: 25,
        effect: { boldness: 20, angry: 5, hp: -10 },
        img: 'rex.svg',
      },
      {
        id: 12,
        name: 'Когтеточка',
        price: 30,
        effect: { energy: -10, angry: -10, hp: +5 },
        img: 'scratching-post.svg',
      },
    ])
    .select();
  if (toyError) {
    console.error('Ошибка при вставке игрушек:', toyError);
    return;
  }

  const { data: catPresets, error: presetError } = await supabase
    .from('catPresets')
    .insert([
      {
        name: 'Мурзик',
        img: 'murzik.jpg',
      },
      {
        name: 'Барсик',
        img: 'barsik.jpg',
      },
    ])
    .select();
  if (presetError) {
    console.error('Ошибка при вставке шаблонов котов:', presetError);
    return;
  }

  const { data: cats, error: catError } = await supabase
    .from('cats')
    .insert([
      {
        name: 'Мурзик',
        userId: users[0].id,
        angry: 3,
        hp: 100,
        energy: 80,
        affection: 70,
        boldness: 50,
        level: 2,
        catPresetId: catPresets[0].id,
      },
      {
        name: 'Барсик',
        userId: users[1].id,
        angry: 2,
        hp: 90,
        energy: 60,
        affection: 85,
        boldness: 40,
        level: 1,
        catPresetId: catPresets[1].id,
      },
    ])
    .select();
  if (catError) {
    console.error('Ошибка при вставке котов:', catError);
    return;
  }

  const { error: eventError } = await supabase
    .from('events')
    .insert([
      {
        title: 'Играл с хвостом',
        description: 'Кот поиграл со своим хвостом и стал счастливее',
        effect: { hp: 5 },
        catId: cats[0].id,
        toyId: toys[0].id,
      },
      {
        title: 'Порвал удочку',
        description: 'Кот играл слишком активно',
        effect: { energy: -5 },
        catId: cats[1].id,
        toyId: toys[1].id,
      },
    ])
    .select();
  if (eventError) {
    console.error('Ошибка при вставке событий:', eventError);
    return;
  }

  const { data: achievements, error: achievementsError } = await supabase
    .from('achievements')
    .insert([
      {
        name: 'Новичок',
        description: 'Зарегистрировался в приложении',
        reward: 10,
      },
      {
        name: 'Любитель котиков',
        description: 'Добавил первого кота',
        reward: 20,
      },
      {
        name: 'Игроман',
        description: 'Поиграл с котом 10 раз',
        reward: 30,
      },
      {
        name: 'Эксперт',
        description: 'Достиг 5 уровня с котом',
        reward: 50,
      },
    ])
    .select();
  if (achievementsError) {
    console.error('Ошибка при вставке достижений:', achievementsError);
    return;
  }

  const { error: userAchievementsError } = await supabase
    .from('userAchievements')
    .insert([
      {
        userId: users[0].id,
        achievementId: achievements[0].id,
      },
    ])
    .select();
  if (userAchievementsError) {
    console.error(
      'Ошибка при вставке пользовательских достижений:',
      userAchievementsError,
    );
  }
}

async function main() {
  const action = process.argv[2];
  if (action === 'seed') {
    await seed();
    console.log('DB seeded!');
  } else if (action === 'clear') {
    await clearAll();
    console.log('DB cleared!');
  } else {
    console.log('Use: node seed.js seed | clear');
  }
}

main();
