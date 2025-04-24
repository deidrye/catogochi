const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_API;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
