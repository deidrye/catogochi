import axiosInstance from '@/shared/api/axiosInstance';
import { AxiosInstance } from 'axios';
import { resLogSchema } from '../model/schema';

class LogService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAllByUser(userId: number) {
    try {
      const response = await this.client.get(`/logs/user/${userId}`);
      console.log(response.data);

      return resLogSchema.array().parse(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new LogService(axiosInstance);
