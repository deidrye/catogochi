import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types/navigation';
import { useAuth } from '@/hooks/useAuth';
import { fetchPresets, createCat } from '@/entities/cat/model/thunks';
import { RootState, AppDispatch } from '@/app/store';
import { CreateCatT, CatPresetT } from '@/entities/cat/model/types';
import Video from 'react-native-video';
type CreateCatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCat'>;
interface CreateCatScreenProps {
  navigation: CreateCatScreenNavigationProp;
}
export default function CreateCatScreen({ navigation }: CreateCatScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { presets, isLoading, error, cat } = useSelector((state: RootState) => state.cat);
  const { user } = useAuth();

  const [selectedPreset, setSelectedPreset] = useState<CatPresetT | null>(null);

  useEffect(() => {
    if (user?.accessToken) {
      dispatch(fetchPresets());
    } else {
      Alert.alert('Ошибка', 'Требуется авторизация');
      navigation.navigate('Login');
    }
  }, [dispatch, user?.accessToken]);

  const handleCreateCat = async () => {
    if (!user?.accessToken) {
      Alert.alert('Ошибка', 'Требуется авторизация');
      navigation.navigate('Login');
      return;
    }

    if (!selectedPreset) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите котика');
      return;
    }

    try {
      const catData: CreateCatT = {
        name: 'Test Cat',
        catPresetId: selectedPreset.id,
        userId: user.user.id,
      };
      await dispatch(createCat(catData)).unwrap();
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать кота');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6C63FF' />
        <Text style={styles.loadingText}>Загружаем котиков...</Text>
      </View>
    );
  }

  if (!presets.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPresetsText}>Нет доступных пресетов 😿</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выбери кота</Text>
      <View style={styles.presetList}>
        {presets.map((preset) => (
          <TouchableOpacity
            key={preset.id}
            style={[styles.catCard, selectedPreset?.id === preset.id && styles.selectedCard]}
            onPress={() => setSelectedPreset(preset)}
          >
            <Video
              source={{
                uri: 'https://cdnl.iconscout.com/lottie/premium/thumb/cat-animation-download-in-lottie-json-gif-static-svg-file-formats--pretty-logo-cute-animal-funny-kitten-activity-pack-animations-6614177.mp4',
              }}
              style={{ width: 180, height: 180 }}
              muted
              repeat
              resizeMode='cover'
            />
            {/* <Image
              source={{
                uri: 'https://img.icons8.com/?size=100&id=8VdeCQ3puqEp&format=png&color=000000', // Заменит на актуальные изображения
              }}
              style={{ width: 150, height: 150, marginBottom: 10 }}
            /> */}
            {/* <CatSvg /> */}
            <Text style={styles.catName}>{preset.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.createButton, isLoading && styles.buttonDisabled]}
        onPress={handleCreateCat}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.createButtonText}>Создать кота</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  presetList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  catCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    margin: 10,
  },
  selectedCard: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  catName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  createButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 30,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  noPresetsText: {
    fontSize: 20,
    color: '#999',
  },
});
