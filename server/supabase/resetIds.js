const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.DB_URL, process.env.DB_SERVICE_API);

module.exports = supabase;

async function resetSequence(table) {
  const { error } = await supabase.rpc('reset_sequence', { table_name: table });

  if (error) {
    console.error(`Ошибка при сбросе sequence для ${table}:`, error.message);
  } else {
    console.log(`Sequence для ${table} сброшен.`);
  }
}

async function main() {
  await resetSequence('events');
  await resetSequence('catPresets');
  await resetSequence('cats');
  await resetSequence('users');
  await resetSequence('toys');
  await resetSequence('achievments');
  await resetSequence('userAchievements');
}

main();
