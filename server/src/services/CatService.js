const supabase = require('../../supabase/supabaseClient');

class CatService {
  static async getAll() {
    const { data, error } = await supabase.from('cats').select('*');
    if (error) throw error;
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase.from('cats').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  static async create(cat) {
    const { data, error } = await supabase.from('cats').insert([cat]).select().single();
    if (error) throw error;
    return data;
  }

  static async update(id, fields) {
    const { data, error } = await supabase
      .from('cats')
      .update(fields)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase.from('cats').delete().eq('id', id);
    if (error) throw error;
  }
}

module.exports = CatService;
