import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types/navigation';
import { useAuth } from '@/hooks/useAuth';
import { fetchPresets, createCat } from '@/entities/cat/model/thunks';
import { RootState, AppDispatch, useAppSelector } from '@/app/store';
import { CreateCatT, CatPresetT } from '@/entities/cat/model/types';
import { CatPresetList } from '@/widgets/CatPresetList/CatPresetList';
import { CreateCatButton } from '@/widgets/CreateCatButton/CreateCatButton';
import { LoadingScreen } from '@/widgets/LoadingScreen/LoadingScreen';
import { NoPresetsScreen } from '@/widgets/NoPresetsScreen/NoPresetsScreen';
import { AuthGuard } from '@/widgets/AuthGuard/AuthGuard';
import { AchieveT } from '@/entities/achievements/model/types';
import { pushUserAchieve } from '@/entities/achievements/model/slice';
import { setPoints } from '@/entities/user/model/userSlice';
import { setLogsAndGetAchieves } from '@/features/logs-feature/model/checkLog';
import { setCat, setOnline } from '@/entities/cat/model/slice';

type CreateCatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCat'>;

interface CreateCatScreenProps {
  navigation: CreateCatScreenNavigationProp;
}

export default function CreateCatScreen({ navigation }: CreateCatScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { presets, isLoading } = useSelector((state: RootState) => state.cat);
  const { user } = useAuth();
  const [selectedPreset, setSelectedPreset] = useState<CatPresetT | null>(null);
  const points = useAppSelector((store) => store.user.points);
  const pointsRef = useRef(points);
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  useEffect(() => {
    async function main() {
      await dispatch(fetchPresets());
    }
    main()
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
      const cat = await dispatch(createCat(catData)).unwrap();
      dispatch(setCat(cat));

      const setAchieveCallback = (achieve: AchieveT) => void dispatch(pushUserAchieve(achieve));
      const setPointsCallback = (actualPoints: number) => void dispatch(setPoints(actualPoints));
      const actualPoints = pointsRef.current;
      await setLogsAndGetAchieves(
        {
          userId: user!.user.id,
          type: 'Basic',
          nowPoints: actualPoints,
        },
        setAchieveCallback,
        setPointsCallback,
      );

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
      <View style={styles.container}>
        <Text style={styles.title}>Выбери кота</Text>
        <CatPresetList
          presets={presets}
          selectedPreset={selectedPreset}
          onPresetSelect={setSelectedPreset}
        />
        <CreateCatButton isLoading={isLoading} onPress={handleCreateCat} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
});
