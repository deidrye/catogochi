import { CLIENT_IP } from '@env';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getApiUrl = () => {
  const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : `http://${CLIENT_IP}:3000`;
  return `${baseUrl}/api`;
};

const API_URL = getApiUrl();

interface Cat {
  name: string;
  image: string;
}

export class CatService {
  static async createCat(cat: Cat): Promise<Cat> {
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${API_URL}/cats`, {
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

    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }
  }
}
