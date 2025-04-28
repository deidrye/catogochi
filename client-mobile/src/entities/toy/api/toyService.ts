import type { AxiosInstance } from 'axios';
import {
  OwnedToySchema,
  ToyEventCreateSchema,
  ToyEventSchema,
  ToyEventWithToySchema,
  toySchema,
} from '../model/toyScheme';
import { OwnedToyType, ToyCreateType, ToyEventWithToy, ToyType } from '../model/toyType';
import axiosInstance from '@/shared/api/axiosInstance';

class ToyService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  //------------Все операции связанные с игрушками из магазина------------

  // Получение всех игрушек из магазина
  async getAll(catId: number): Promise<ToyType[]> {
    try {
      const response = await this.client.get(`/toys/${catId}`); // Передаем catId
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

  async buyToy(toyId: number, catId: number): Promise<OwnedToyType> {
    try {
      const response = await this.client.post('/toys/buy', {
        toyId,
        catId,
      });
  
      console.log('Response from /toys/buy:', response.data);

      // Валидируем объект с двумя полями event и toy
      return OwnedToySchema.parse(response.data);
    } catch (error: any) {
      console.error('Error buying toy:', error);
      throw error;
    }
  }

  async getOwnedToys(catId: number) {
    try {
      const response = await this.client.get(`/toys/owned/${catId}`);
      console.log(response.data);
      
      return OwnedToySchema.array().parse(response.data); // Возвращаем данные
    } catch (error) {
      console.error('Ошибка при получении купленных игрушек:', error);
      throw error;
    }
  }

  // async getToys(catId: number): Promise<ToyType[]> {
  //   try {
  //     const response = await this.client.get(`/toys/${catId}`);
  //     return toySchema.array().parse(response.data);
  //   } catch (error) {
  //     console.error('Error fetching toys:', error);
  //     throw error;
  //   }
  // }
  
}

export default new ToyService(axiosInstance); // Экспортируем сервис с экземпляром axios



// async buyToy(toyId: number, catId: number): Promise<ToyEventWithToy> {
//   try {
//     const response = await this.client.post('/toys/buy', {
//       toyId,
//       catId,
//     });

//     console.log('Response from /toys/buy:', response.data);

//     // Убедимся, что данные в ответе содержат нужную структуру
//     const { event, toy } = response.data;

//     // Логируем полученные данные
//     console.log('Received event:', event);
//     console.log('Received toy:', toy);

//     // Проверяем, что оба объекта существуют
//     if (!event || !toy) {
//       throw new Error('Missing event or toy in response');
//     }

//     // Валидируем объект с двумя полями event и toy
//     return ToyEventWithToySchema.parse({
//       event,
//       toy,
//     });
//   } catch (error: any) {
//     console.error('Error buying toy:', error);
//     throw error;
//   }
// }