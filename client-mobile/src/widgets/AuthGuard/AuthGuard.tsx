import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { NavigationProp } from '@react-navigation/native';

interface AuthGuardProps {
  children: React.ReactNode;
  navigation: NavigationProp<any>;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, navigation }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.accessToken) {
      Alert.alert('Ошибка', 'Требуется авторизация');
      navigation.navigate('Login');
    }
  }, [user?.accessToken, navigation]);

  if (!user?.accessToken) {
    return null;
  }

  return <>{children}</>;
};
