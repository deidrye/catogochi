import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types/navigation';
import { useAuth } from '@/hooks/useAuth';
import { CatService } from '@/entities/cat/api/catService';
import { catPresets } from '@/entities/cat/api/mockPresets';

type CreateCatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCat'>;

interface CreateCatScreenProps {
  navigation: CreateCatScreenNavigationProp;
}

export default function CreateCatScreen({ navigation }: CreateCatScreenProps) {
  const { user } = useAuth();
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentPreset = catPresets[selectedPreset];

  const handleCreateCat = async () => {
    try {
      if (!user?.user?.id) {
        throw new Error('Пользователь не авторизован');
      }

      setIsLoading(true);

      const catData = {
        name: currentPreset.name,
        image: currentPreset.image,
        presetId: selectedPreset + 1,
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

  const handleNextPreset = () => {
    setSelectedPreset((prev) => (prev + 1) % catPresets.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выбери своего кота</Text>

      <Text style={styles.catImage}>{currentPreset.image}</Text>
      <Text style={styles.catName}>{currentPreset.name}</Text>

      <View style={styles.buttonContainer}>
        <Button title='Другой котик' onPress={handleNextPreset} />
      </View>

      <Button
        title={isLoading ? 'Создание...' : 'Создать кота'}
        onPress={handleCreateCat}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  catImage: {
    fontSize: 120,
    marginBottom: 10,
  },
  catName: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
