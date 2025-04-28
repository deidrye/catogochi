const supabase = require('../../supabase/supabaseClient');

class CatService {
  static async getAll() {
    const { data, error } = await supabase.from('cats').select(`
        *,
        preset:catPresets(*)
      `);
    if (error) throw error;
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('cats')
      .select(
        `
        *,
        preset:catPresets(*)
      `,
      )
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async getPresetById(presetId) {
    const { data, error } = await supabase
      .from('catPresets')
      .select('*')
      .eq('id', presetId)
      .single();
    if (error) throw error;
    return data;
  }

  static async getAllPresets() {
    const { data, error } = await supabase.from('catPresets').select('*');
    if (error) throw error;
    return data;
  }

  static async create(cat) {
    const { data: preset, error: presetError } = await supabase
      .from('catPresets')
      .select('*')
      .eq('id', cat.catPresetId)
      .single();

    if (presetError || !preset) {
      throw new Error('Пресет не найден');
    }

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
