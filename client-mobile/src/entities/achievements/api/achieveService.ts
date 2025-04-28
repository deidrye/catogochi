import { API_URL } from '@/shared/api/authApi';
import axios from 'axios';
import { AchieveT } from '../model/types';
import { achieveSchema } from '../model/schema';

class AchieveService {
  constructor(private readonly apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getAll() {
    try {
      const response = await axios.get(this.apiUrl + '/achievements');
      return achieveSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('getAll Achievements error');
    }
  }

  async getAllUser(id: number) {
    try {
      const response = await axios.get(this.apiUrl + `/achievements/user/${id}`);
      return achieveSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('getAllUser Achievements error');
    }
  }
}

export default new AchieveService(API_URL);
