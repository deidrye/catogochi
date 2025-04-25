import { CLIENT_IP } from '@env';
import { Platform } from 'react-native';

const getApiUrl = () => {
  const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : `http://${CLIENT_IP}:3000`;
  return `${baseUrl}/api`;
};

const API_URL = getApiUrl();

interface Cat {
  name: string;
  color: string;
  breed: string;
  userId: number;
  angry?: number;
  hp?: number;
  energy?: number;
  affection?: number;
  boldness?: number;
  level?: number;
}

export class CatService {
  static async createCat(cat: Cat): Promise<Cat> {
    const response = await fetch(`${API_URL}/cats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(cat),
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText); // Логируем сырой ответ

    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }
  }
}
