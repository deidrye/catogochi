import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Text, Image } from 'react-native';
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToysPanelWidget from '@/widgets/ToysPanel/ui/ToysPanel';
import Toast from 'react-native-toast-message';
import { CustomToast } from '@/widgets/CustomToast/ui/CustomToast';
import CatActionsWidget from '@/widgets/CatAction/ui/CatAction';
import CatStatsWidget from '@/widgets/CatStats/ui/CatStats';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchCat } from '@/entities/cat/model/thunks';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

type CatAction = 'eat' | 'play' | 'weasel' | 'sleep' | null;

export const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const cat = useAppSelector((state) => state.cat.cat);
  const [currentAction, setCurrentAction] = useState<CatAction>(null);

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const handlePlay = () => {
    setCurrentAction('play');
    setTimeout(() => {
      setCurrentAction(null);
    }, 3000);
  };

  const handleCatAction = (actionType: CatAction) => {
    if (!actionType) return;

    setCurrentAction(actionType);
    setTimeout(() => {
      setCurrentAction(null);
    }, 3000);
  };

  const getActionImage = () => {
    if (!cat?.CatPreset) return cat?.CatPreset?.imgMain || '';

    switch (currentAction) {
      case 'eat':
        return cat.CatPreset.imgEat;
      case 'play':
        return cat.CatPreset.imgPlay;
      case 'weasel':
        return cat.CatPreset.imgWeasel;
      case 'sleep':
        return cat.CatPreset.imgSleep;
      default:
        return cat.CatPreset.imgMain;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Центральная часть */}
        <View style={styles.mainContent}>
          {/* Игрушки */}
          <Animated.View entering={FadeInUp.duration(500)} style={styles.toysContainer}>
            <ToysPanelWidget cat={cat} onPlay={handlePlay} />
          </Animated.View>

          {/* Котик */}
          <Animated.View entering={FadeInUp.duration(600).delay(100)} style={styles.catContainer}>
            <View style={styles.cat}>
              {cat?.CatPreset ? (
                <Image
                  source={{ uri: getActionImage() }}
                  style={styles.catImage}
                  resizeMode='contain'
                />
              ) : (
                <Text style={styles.catText}>🐱</Text>
              )}
              <Text style={styles.catName}>{cat?.name}</Text>
            </View>
          </Animated.View>

          {/* Статы */}
          <Animated.View entering={FadeInUp.duration(700).delay(200)} style={styles.statsContainer}>
            <CatStatsWidget cat={cat} />
          </Animated.View>
        </View>

        {/* Действия */}
        <Animated.View entering={FadeInUp.duration(800).delay(300)} style={styles.actionsContainer}>
          <CatActionsWidget cat={cat} onAction={handleCatAction} />
        </Animated.View>
      </View>

      {/* Тост */}
      <Toast
        config={{
          success: (props) => <CustomToast {...props} />,
        }}
        topOffset={60}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8EF', // Тёплый бежевый фон
  },
  container: {
    flex: 1,
    padding: 10,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  toysContainer: {
    flex: 1,
    maxWidth: 120,
    alignItems: 'center',
  },
  catContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flex: 1.5,
    alignItems: 'center',
  },
  cat: {
    width: width * 0.4,
    height: height * 0.45,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  catText: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  catImage: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  catName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  actionsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
