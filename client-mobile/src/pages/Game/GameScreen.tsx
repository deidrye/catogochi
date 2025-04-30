import Animated, { FadeInUp, FadeIn, FadeOut } from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Text } from 'react-native';
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToysPanelWidget from '@/widgets/ToysPanel/ui/ToysPanel';
import { CustomToast } from '@/widgets/CustomToast/ui/CustomToast';
import CatActionsWidget from '@/widgets/CatAction/ui/CatAction';
import CatStatsWidget from '@/widgets/CatStats/ui/CatStats';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchCat, updateCat, fetchActions } from '@/entities/cat/model/thunks';
import { Video, ResizeMode } from 'expo-av';
import { setOffline, setOnline } from '@/entities/cat/model/slice';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

type CatAction = 'Покормить' | 'Поиграть' | 'Приласкать' | 'Уложить спать' | null;

export const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const cat = useAppSelector((state) => state.cat.cat);
  const actions = useAppSelector((state) => state.cat.actions);
  const [currentAction, setCurrentAction] = useState<CatAction>(null);
  const [toastText, setToastText] = useState<string | null>(null);
  const [isActionDisabled, setIsActionDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchCat());
    dispatch(setOnline());
    dispatch(fetchActions());
  }, [dispatch]);

  useEffect(() => {
    if (toastText) {
      const timer = setTimeout(() => setToastText(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [toastText]);

  const handlePlay = () => {
    if (isActionDisabled) return;
    setIsActionDisabled(true);
    setCurrentAction('Поиграть');
    setTimeout(() => {
      setCurrentAction(null);
      setIsActionDisabled(false);
    }, 3000);
  };

  const handleCatAction = async (actionType: CatAction) => {
    if (isActionDisabled) return; // блокируем повторное нажатие
    setIsActionDisabled(true); // отключаем кнопки на 3 секунды

    if (!actionType || !cat || !actions) return;

    const action = actions.find((a) => a.name === actionType);
    if (!action) return;

    try {
      setCurrentAction(actionType);

      const updatedStats = Object.entries(action.effect).reduce((acc, [key, value]) => {
        if (typeof cat[key as keyof typeof cat] === 'number') {
          return {
            ...acc,
            [key]: Math.max(
              0,
              Math.min(100, (cat[key as keyof typeof cat] as number) + (value || 0)),
            ),
          };
        }
        return acc;
      }, {});
      const updatedCat = { ...cat, ...updatedStats };
      await dispatch(updateCat(updatedCat)).unwrap();

      const actionDescriptions = {
        Покормить: 'Вы накормили кота! Он теперь сыт и доволен 🍗',
        Поиграть: 'Вы поиграли с котом! Он стал немного счастливее 😸',
        Приласкать: 'Вы приласкали кота! Он замурлыкал от удовольствия 🐾',
        'Уложить спать': 'Кот уютно устроился и заснул... 😴',
      };

      setToastText(actionDescriptions[actionType]);
    } catch (error) {
      setToastText('Произошла ошибка при выполнении действия');
    } finally {
      setTimeout(() => {
        setCurrentAction(null);
        setIsActionDisabled(false); // возвращаем доступ к кнопкам
      }, 3000);
    }
  };

  const getActionImage = () => {
    if (!cat?.CatPreset) {
      return '';
    }

    const actionMap: Record<Exclude<CatAction, null>, keyof typeof cat.CatPreset> = {
      Покормить: 'imgEat',
      Поиграть: 'imgPlay',
      Приласкать: 'imgWeasel',
      'Уложить спать': 'imgSleep',
    };

    const imageKey = currentAction ? actionMap[currentAction] : 'imgMain';
    const image = cat.CatPreset[imageKey];

    return image;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {toastText && (
        <View style={styles.toastWrapper}>
          <CustomToast text1={toastText} />
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.mainContent}>
          {/* Игрушки */}
          <Animated.View entering={FadeInUp.duration(500)} style={styles.toysContainer}>
            <ToysPanelWidget
              cat={cat}
              onPlay={handlePlay}
              showToast={setToastText}
              disabled={isActionDisabled}
            />
          </Animated.View>

          {/* Котик */}
          <Animated.View entering={FadeInUp.duration(600).delay(100)} style={styles.catContainer}>
            <View style={styles.cat}>
              {cat?.CatPreset ? (
                <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
                  <Video
                    source={{ uri: getActionImage() as string }}
                    style={styles.catImage}
                    videoStyle={styles.catImage}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay
                    isLooping
                    isMuted
                    useNativeControls={false}
                  />
                </Animated.View>
              ) : (
                <Text style={styles.catText}>🐱</Text>
              )}
            </View>
            <Text style={styles.catName}>{cat?.name}</Text>
          </Animated.View>

          {/* Статы */}
          <Animated.View entering={FadeInUp.duration(700).delay(200)} style={styles.statsContainer}>
            <CatStatsWidget cat={cat} />
          </Animated.View>
        </View>

        {/* Действия */}
        <Animated.View entering={FadeInUp.duration(800).delay(300)} style={styles.actionsContainer}>
          <CatActionsWidget cat={cat} onAction={handleCatAction} disabled={isActionDisabled} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
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
    marginLeft: 10,
    maxWidth: 120,
    alignItems: 'center',
    zIndex: 1,
  },
  catContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flex: 1.5,
    alignItems: 'flex-end', // прижимает содержимое к правому краю
    justifyContent: 'center',
    zIndex: 1,
  },
  cat: {
    marginTop: 80,
    marginLeft: 20,
    width: width * 0.4,
    height: height * 0.45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    elevation: 5,
  },
  catText: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  catImage: {
    width: 200,
    height: 400,
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
  toastWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
});
