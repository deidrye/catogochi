import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types/navigation';
import { useAuth } from '@/hooks/useAuth';
import { CatService } from '@/entities/cat/api/catService';

type CreateCatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCat'>;

interface CreateCatScreenProps {
  navigation: CreateCatScreenNavigationProp;
}

type CatBreed =
  | 'Сиамская'
  | 'Персидская'
  | 'Мейн-кун'
  | 'Британская'
  | 'Сфинкс'
  | 'Шотландская вислоухая'
  | 'Другая'; // Исправлено с 'Другая' на 'Другая'

interface CatState {
  name: string;
  color: string;
  breed: CatBreed;
}

export default function CreateCatScreen({ navigation }: CreateCatScreenProps) {
  const { user } = useAuth();
  const [cat, setCat] = useState<CatState>({
    name: '',
    color: '',
    breed: 'Сиамская',
  });

  const [isLoading, setIsLoading] = useState(false);

  const catBreeds: CatBreed[] = [
    'Сиамская',
    'Персидская',
    'Мейн-кун',
    'Британская',
    'Сфинкс',
    'Шотландская вислоухая',
    'Другая', // Исправлено с 'Другая' на 'Другая'
  ];

  const breedImages: Record<CatBreed, string> = {
    Сиамская: '🐱',
    Персидская: '🐈',
    'Мейн-кун': '🐯',
    Британская: '😼',
    Сфинкс: '👽',
    'Шотландская вислоухая': '😾',
    Другая: '😻', // Исправлено с 'Другая' на 'Другая'
  };

  const handleInputChange = (name: keyof CatState, value: string) => {
    setCat((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      navigation.navigate('Main');
      setIsLoading(true);

      if (!user?.user?.id) {
        // Проверка наличия пользователя
        throw new Error('Пользователь не авторизован');
      }

      const catData = {
        name: cat.name,
        color: cat.color,
        breed: cat.breed,
        userId: user.user.id,
        angry: 100,
        hp: 100,
        energy: 100,
        affection: 100,
        boldness: 100,
        level: 1,
      };

      const createdCat = await CatService.createCat(catData);

      if (!createdCat) {
        throw new Error('Не удалось создать кота');
      }

      Alert.alert('Успех', 'Кот успешно создан!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Main'),
        },
      ]);
    } catch (error) {
      console.error('Error creating cat:', error);
      Alert.alert(
        'Ошибка',
        error instanceof Error ? error.message : 'Не удалось создать кота. Попробуйте еще раз.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getCatStyle = () => ({
    fontSize: 100,
    textAlign: 'center' as const,
    marginVertical: 20,
    transform: cat.breed === 'Мейн-кун' ? [{ scale: 1.5 }] : [{ scale: 1 }],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создание нового кота</Text>

      <Text style={getCatStyle()}>{breedImages[cat.breed]}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Имя кота:</Text>
        <TextInput
          style={styles.input}
          value={cat.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder='Введите имя кота'
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Цвет кота:</Text>
        <TextInput
          style={styles.input}
          value={cat.color}
          onChangeText={(text) => handleInputChange('color', text)}
          placeholder='Введите цвет кота'
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Порода кота:</Text>
        <Picker
          selectedValue={cat.breed} // Исправлено с cat.breed на cat.breed
          style={styles.picker}
          onValueChange={(itemValue: CatBreed) => handleInputChange('breed', itemValue)}
        >
          {catBreeds.map((breed, index) => (
            <Picker.Item key={index} label={breed} value={breed} /> // Исправлено с breed на breed
          ))}
        </Picker>
      </View>

      <Button
        title={isLoading ? 'Создание...' : 'Создать кота'}
        onPress={handleSubmit}
        disabled={isLoading || !cat.name || !cat.color || !cat.breed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});
