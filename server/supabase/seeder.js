const supabase = require('./supabaseClient');
const bcrypt = require('bcrypt');

async function clearAll() {
  await supabase.from('events').delete().neq('id', 0);
  await supabase.from('cats').delete().neq('id', 0);
  await supabase.from('toys').delete().neq('id', 0);
  await supabase.from('users').delete().neq('id', 0);
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

  const { data: toys } = await supabase
    .from('toys')
    .insert([
      { name: 'Мячик', price: 10, effect: { hp: 5 }, img: 'ball.jpg' },
      { name: 'Удочка', price: 15, effect: { energy: 10 }, img: 'fishing.jpg' },
    ])
    .select();

  const { data: cats } = await supabase
    .from('cats')
    .insert([
      {
        name: 'Мурзик',
        userId: users[0].id,
        color: 'черный',
        breed: 'перс',
        angry: 3,
        hp: 100,
        energy: 80,
        affection: 70,
        boldness: 50,
        level: 2,
        img: 'murzik.jpg',
      },
      {
        name: 'Барсик',
        userId: users[1].id,
        color: 'белый',
        breed: 'сиам',
        angry: 2,
        hp: 90,
        energy: 60,
        affection: 85,
        boldness: 40,
        level: 1,
        img: 'barsik.jpg',
      },
    ])
    .select();

  await supabase.from('events').insert([
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
  ]);
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
