const supabase = require('../../supabase/supabaseClient');

class AchievementService {
  // Все ачивки
  static async getAllAchievements() {
    const { data, error } = await supabase.from('achievements').select('*');
    if (error) throw error;
    return data;
  }

  static async getAchievementById(id) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async createAchievement(achievement) {
    const { data, error } = await supabase
      .from('achievements')
      .insert([achievement])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updateAchievement(id, newValues) {
    const { data, error } = await supabase
      .from('achievements')
      .update(newValues)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteAchievement(id) {
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (error) throw error;
  }

  // Ачивки пользователя
  static async getUserAchievements(userId) {
    const { data, error } = await supabase
      .from('userAchievements')
      .select('*, achievements(*)')
      .eq('userId', userId);
    if (error) throw error;
    const mappedList = data.map((achievement) => achievement.achievements);
    return mappedList;
  }

  static async assignAchievementToUser(userId, achievementId) {
    const { data, error } = await supabase
      .from('userAchievements')
      .insert([{ user_id: userId, achievement_id: achievementId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async removeAchievementFromUser(userId, achievementId) {
    const { error } = await supabase
      .from('userAchievements')
      .delete()
      .match({ user_id: userId, achievement_id: achievementId });
    if (error) throw error;
  }
}

module.exports = AchievementService;
