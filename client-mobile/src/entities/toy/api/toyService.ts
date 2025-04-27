import type { AxiosInstance } from 'axios';
import { ToyEventCreateSchema, toySchema } from '../model/toyScheme';
import { ToyCreateType, ToyEventCreateType, ToyType } from '../model/toyType';
import axiosInstance from '@/shared/api/axiosInstance';

class ToyService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  //------------Все операции связанные с игрушками из магазина------------

  // Получение всех игрушек из магазина
  async getAll(): Promise<ToyType[]> {
    try {
      const response = await this.client.get('/toys');
      // Валидация данных через Zod
      return toySchema.array().parse(response.data);
    } catch (error) {
      console.error('Error fetching toys:', error);
      throw error;
    }
  }

  // Получение одной игрушки по id из магазина
  async getOne(id: number): Promise<ToyType> {
    try {
      const response = await this.client.get(`/toys/${String(id)}`);
      return toySchema.parse(response.data); // Валидация данных для одной игрушки
    } catch (error) {
      console.error('Error fetching toy:', error);
      throw error;
    }
  }

  // Добавление новой игрушки в магазин
  async addToy(data: ToyCreateType): Promise<ToyType> {
    try {
      const response = await this.client.post('/toys', data);
      return toySchema.parse(response.data); // Валидация данных
    } catch (error) {
      console.error('Error adding toy:', error);
      throw error;
    }
  }

  // Удаление игрушки по id из магазина
  async deleteToy(id: number): Promise<void> {
    try {
      await this.client.delete(`/toys/${String(id)}`);
    } catch (error) {
      console.error('Error deleting toy:', error);
      throw error;
    }
  }

  // Обновление данных игрушки
  async updateToy(id: number, data: ToyCreateType): Promise<ToyType> {
    try {
      const response = await this.client.put(`/toys/${String(id)}`, data);
      return toySchema.parse(response.data); // Валидация данных
    } catch (error) {
      console.error('Error updating toy:', error);
      throw error;
    }
  }

  //------------------------------------------------------------------------------

  //------------Все операции связанные с игрушками в событиях------------

  async buyToy(toyId: number, catId: number) {
    try {
      console.log('Sending to buyToy:', { toyId, catId }); 
      const response = await this.client.post('/toys/buy', {
        toyId,
        catId,
      });
      return ToyEventCreateSchema.parse(response.data);
    } catch (error) {
      console.error('Error buying toy:', error);
      throw error;
    }
  }
}

export default new ToyService(axiosInstance); // Экспортируем сервис с экземпляром axios
