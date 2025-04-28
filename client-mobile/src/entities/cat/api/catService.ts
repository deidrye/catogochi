import { catPresetSchema, catSchema } from '../model/schema';
import { CatT, CreateCatT } from '../model/types';
import axiosInstance from '@/shared/api/axiosInstance';

export class CatService {
  constructor(private readonly axiosInstance: string) {
    this.axiosInstance = axiosInstance;
  }
  static async getPresets() {
    try {
      const response = await axiosInstance.get('/cats/presets');
      return catPresetSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('getAll Achievements error');
    }
  }

  static async createCat(cat: CreateCatT) {
    try {
      const response = await axiosInstance.post<CatT>('/cats', cat);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('createCat error');
    }
  }

  static async getCat() {
    try {
      const response = await axiosInstance.get(`/cats`);
      return catSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('getCat error');
    }
  }
  static async updateCat(cat: CatT) {
    try {
      const response = await axiosInstance.put(`/cats`, cat);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('updateCat error');
    }
  }
}
