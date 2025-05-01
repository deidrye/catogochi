import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { register } from '../model/thunks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/types/navigation';
import { registerSchema, userSchema } from '../../../shared/lib/zod/schemas';
import { AchieveT } from '@/entities/achievements/model/types';
import { pushUserAchieve } from '@/entities/achievements/model/slice';
import { setPoints } from '@/entities/user/model/userSlice';
import { setLogsAndGetAchieves } from '@/features/logs-feature/model/checkLog';
import { fetchUserPoints } from '@/entities/user/model/userThunks';

type RegisterFormNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterFormProps {
  navigation: RegisterFormNavigationProp;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const points = useAppSelector((store) => store.user.points);
  const pointsRef = useRef(points);
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleSubmit = async () => {
    try {
      const data = registerSchema.parse({ email, password, name });
      const regRes = await dispatch(register(data)).unwrap();
      const user = userSchema.parse(regRes);
      await dispatch(fetchUserPoints(user.user.id)).unwrap();

      const setAchieveCallback = (achieve: AchieveT) => void dispatch(pushUserAchieve(achieve));
      const setPointsCallback = (actualPoints: number) => void dispatch(setPoints(actualPoints));
      const actualPoints = pointsRef.current;

      await setLogsAndGetAchieves(
        {
          userId: user.user.id,
          type: 'Basic',
          achievementId: 1,
          nowPoints: actualPoints,
        },
        setAchieveCallback,
        setPointsCallback,
      );
      navigation.navigate('CreateCat');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Имя'
        value={name}
        onChangeText={setName}
        autoCapitalize='words'
      />
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
      {error ? <Text style={styles.error}>Ошибка регистрации</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Уже есть аккаунт? Войти</Text>
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
