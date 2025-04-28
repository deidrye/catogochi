import axiosInstance from "@/shared/api/axiosInstance";
import { AxiosInstance } from "axios";
import { userPointsSchema } from "../model/userSchema";

class UserService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getUserPoints(id: number) {
    try {
      const response = await this.client.get(`/users/${id}/points`);
      return userPointsSchema.parse(response.data);
    } catch (error) {
      console.error('Error fetching user points:', error);
      throw error;
    }
  }
}   

export default new UserService(axiosInstance);
