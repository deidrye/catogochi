import { CLIENT_IP } from '@env';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CreateCatDto {
  name: string;
  catPresetId: number;
}

interface CatPreset {
  id: number;
  name: string;
  img: string;
}

export class CatService {
  static async getPresets(): Promise<CatPreset[]> {
    try {
      const url = `http://${CLIENT_IP}:3000/api/cats/presets`;
      console.log('Fetching presets from:', url);

      const token = await AsyncStorage.getItem('accessToken');
      console.log('Token found:', !!token);

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include' as const,
      };
      console.log('Request options:', options);

      const response = await fetch(url, options);
      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        console.error('Error response:', responseText);
        throw new Error(responseText || 'Ошибка получения пресетов');
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error('Error in getPresets:', error);
      throw error;
    }
  }

  static async createCat(cat: CreateCatDto) {
    try {
      const url = `http://${CLIENT_IP}:3000/api/cats`;
      console.log('Posting to:', url);

      const token = await AsyncStorage.getItem('accessToken');
      console.log('Token found:', !!token);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(cat),
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        console.error('Error response:', responseText);
        throw new Error(responseText || 'Ошибка создания кота');
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error('Error in createCat:', error);
      throw error;
    }
  }
}
