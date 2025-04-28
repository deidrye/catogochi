import { achieveSchema } from '../model/schema';
import axiosInstance from '@/shared/api/axiosInstance';

class AchieveService {
  async getAll() {
    try {
      const response = await axiosInstance.get('/achievements');
      return achieveSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('getAll Achievements error');
    }
  }

  async getAllUser(id: number) {
    try {
      const response = await axiosInstance.get(`/achievements/user/${id}`);
      return achieveSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('getAllUser Achievements error');
    }
  }
}

export default new AchieveService();
