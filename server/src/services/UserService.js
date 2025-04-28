const supabase = require('../../supabase/supabaseClient');

class UserService {
  static async getAll() {
    const { data, error } = await supabase.from('users').select('id, name, email, points');
    if (error) throw error;
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async createUser(name, email, hashedPass) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, hashedPass }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updateUser(id, newValues) {
    const { data, error } = await supabase
      .from('users')
      .update(newValues)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteUser(id) {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
  }

  static async makeUserAdmin(id) {
    const { data, error } = await supabase
      .from('users')
      .update({ isAdmin: true })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async takeUserPassword(id) {
    const { data, error } = await supabase
      .from('users')
      .select('hashedPass')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = UserService;
