const supabase = require('../../supabase/supabaseClient');

class ToyService {
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
}

module.exports = ToyService;
