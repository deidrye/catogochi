import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAppDispatch } from '../../../app/store';
import { login } from '../model/thunks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/types/navigation';
import { loginSchema } from '../../../shared/lib/zod/schemas';
import { fetchCat } from '@/entities/cat/model/thunks';
import { setLoading, setOnline } from '@/entities/cat/model/slice';
import { setLoader } from '@/entities/loader/model/loaderSlice';

type LoginFormNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginFormProps {
  navigation: LoginFormNavigationProp;
}

export const LoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // console.log('Начало процесса входа');
      const data = loginSchema.parse({ email, password });
      // console.log('Данные для входа валидны:', data);
      const result = await dispatch(login(data)).unwrap();
      console.log('Успешный вход, результат:', result);
      const response = await dispatch(fetchCat());
      console.log('AAAAAAAAAAAAAAA', response.payload);
      dispatch(setLoader(true));

      if (!response.payload) {
        navigation.navigate('CreateCat');
      } else {
        navigation.navigate('Main');
        dispatch(setOnline());
      }
      navigation.navigate('Main');
    } catch (err: any) {
      console.error('Ошибка при входе:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack,
        name: err.name,
        code: err.code,
      });

      if (err.message === 'Неверный формат данных от сервера') {
        setError('Ошибка сервера: неверный формат данных');
      } else if (err.message?.includes('Network Error')) {
        setError('Ошибка подключения к серверу. Проверьте, запущен ли сервер.');
      } else {
        setError(err.message || 'Ошибка входа');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Пароль'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Нет аккаунта? Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
  },
});
