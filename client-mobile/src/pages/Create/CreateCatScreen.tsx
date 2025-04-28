import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types/navigation';
import { useAuth } from '@/hooks/useAuth';
import { fetchPresets, createCat } from '@/entities/cat/model/thunks';
import { RootState, AppDispatch } from '@/app/store';
import { CreateCatT, CatPresetT } from '@/entities/cat/model/types';
import { CatPresetList } from '@/widgets/CatPresetList/CatPresetList';
import { CreateCatButton } from '@/widgets/CreateCatButton/CreateCatButton';
import { LoadingScreen } from '@/widgets/LoadingScreen/LoadingScreen';
import { NoPresetsScreen } from '@/widgets/NoPresetsScreen/NoPresetsScreen';
import { AuthGuard } from '@/widgets/AuthGuard/AuthGuard';

type CreateCatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCat'>;

interface CreateCatScreenProps {
  navigation: CreateCatScreenNavigationProp;
}

export default function CreateCatScreen({ navigation }: CreateCatScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { presets, isLoading } = useSelector((state: RootState) => state.cat);
  const { user } = useAuth();

  const [selectedPreset, setSelectedPreset] = useState<CatPresetT | null>(null);

  useEffect(() => {
    dispatch(fetchPresets());
  }, [dispatch]);

  const handleCreateCat = async () => {
    if (!selectedPreset) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите котика');
      return;
    }

    try {
      const catData: CreateCatT = {
        name: selectedPreset.name,
        catPresetId: selectedPreset.id,
        userId: user!.user.id,
      };
      await dispatch(createCat(catData)).unwrap();
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать кота');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!presets.length) {
    return <NoPresetsScreen />;
  }

  return (
    <AuthGuard navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Выбери кота</Text>
        <CatPresetList
          presets={presets}
          selectedPreset={selectedPreset}
          onPresetSelect={setSelectedPreset}
        />
        <CreateCatButton isLoading={isLoading} onPress={handleCreateCat} />
      </View>
    </AuthGuard>
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
});
