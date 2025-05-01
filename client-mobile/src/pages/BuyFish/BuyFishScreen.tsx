import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types/navigation';

type BuyFishScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BuyFishScreen() {
  const navigation = useNavigation<BuyFishScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Купить рыбов</Text>
      <Text style={styles.text}>
        Для покупки рыбов, вы можете перевести деньги на номер телефона:
      </Text>
      <Text style={styles.phone}>+7 (916) 543-33-17(Сбербанк)</Text>
      <Text style={styles.info}>
        После перевода свяжитесь с администратором для начисления рыбов на ваш счёт
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Вернуться назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF8E1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF8C00',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  phone: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
    margin: 20,
  },
  info: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
