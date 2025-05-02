import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

type Props = {
  text1?: string;
  text2?: string;
  type?: 'success' | 'error' | 'info';
  [key: string]: any; // <- это уберёт жалобы TypeScript
};

const borderColors: Record<ToastType, string> = {
  success: '#10b981', // зелёный
  error: '#ef4444',   // красный
  info: '#3b82f6',    // синий
};

const textColors: Record<ToastType, string> = {
  success: '#065f46',
  error: '#991b1b',
  info: '#1e3a8a',
};

const CustomToast2 = ({ text1, text2, type = 'info' }: ToastConfigParams<any>) => {
  const toastType = (type || 'info') as 'success' | 'error' | 'info';
  const borderColor = borderColors[toastType];
  const textColor = textColors[toastType];

  return (
    <View style={[styles.container, { borderColor: borderColor }]}>
      {text1 && <Text style={[styles.title, { color: textColor }]}>{text1}</Text>}
      {text2 && <Text style={[styles.message, { color: textColor }]}>{text2}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 18,
    backgroundColor: 'white', // белый фон
    borderRadius: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 2, // добавляем обводку
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // для теней на Android
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  message: {
    fontSize: 18,
  },
});

export default CustomToast2;