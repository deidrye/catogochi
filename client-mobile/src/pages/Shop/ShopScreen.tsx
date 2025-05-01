import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { buyToy, fetchOwnedToys, fetchShopToys } from '@/entities/toy/model/toyThunks';
import { useAuth } from '@/hooks/useAuth';
import { Audio } from 'expo-av';
// import buySoundFile from '@/assets/sounds/buying.mp3';

// SVG иконки
import BallIcon from '@/assets/toys/ball.svg';
import TreeIcon from '@/assets/toys/christmas-tree.svg';
import ClewIcon from '@/assets/toys/clew.svg';
import FeatherIcon from '@/assets/toys/feather.svg';
import RodIcon from '@/assets/toys/fish-rod.svg';
import FishIcon from '@/assets/toys/fish.svg';
import LaserIcon from '@/assets/toys/laser-pen.svg';
import MouseIcon from '@/assets/toys/mouse.svg';
import NewspaperIcon from '@/assets/toys/newspaper.svg';
import OctopusIcon from '@/assets/toys/octopus.svg';
import RexIcon from '@/assets/toys/rex.svg';
import PostIcon from '@/assets/toys/scratching-post.svg';
import { fetchUserPoints } from '@/entities/user/model/userThunks';
import { setLogsAndGetAchieves } from '@/features/logs-feature/model/checkLog';
import { AchieveT } from '@/entities/achievements/model/types';
import { pushUserAchieve } from '@/entities/achievements/model/slice';
import { setPoints } from '@/entities/user/model/userSlice';
import { ToyType } from '@/entities/toy/model/toyType';
import { NotEnoughPointsModal } from '@/widgets/NotEnoughPointsModal/NotEnoughPointsModal';

const iconMap: Record<string, React.FC<any>> = {
  'ball.svg': BallIcon,
  'christmas-tree.svg': TreeIcon,
  'clew.svg': ClewIcon,
  'feather.svg': FeatherIcon,
  'fish-rod.svg': RodIcon,
  'fish.svg': FishIcon,
  'laser-pen.svg': LaserIcon,
  'mouse.svg': MouseIcon,
  'newspaper.svg': NewspaperIcon,
  'octopus.svg': OctopusIcon,
  'rex.svg': RexIcon,
  'scratching-post.svg': PostIcon,
};

type ShopScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Shop'>;

interface ShopScreenProps {
  navigation: ShopScreenNavigationProp;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const ownedToys = useAppSelector((state) => state.toy.ownedToys);
  const shopToys = useAppSelector((state) => state.toy.shopToys);

  const catId = useAppSelector((store) => store.cat.cat?.id);
  const [initialLoading, setInitialLoading] = useState(true);

  // Анимации
  const balanceOpacity = useState(new Animated.Value(0))[0];
  const balanceTranslateY = useState(new Animated.Value(10))[0];
  const balanceScale = useState(new Animated.Value(1))[0];

  const [loadingButtons, setLoadingButtons] = useState<Record<number, boolean>>({});
  const user = useAppSelector((store) => store.auth.user);
  const points = useAppSelector((store) => store.user.points);
  const pointsRef = useRef(points);

  const [showModal, setShowModal] = useState(false);
  const [selectedToy, setSelectedToy] = useState<ToyType | null>(null);

  // Звук при покупке
  const buySound = useRef<Audio.Sound | null>(null);

  // useEffect(() => {
  //   const loadSound = async () => {
  //     const { sound } = await Audio.Sound.createAsync(buySoundFile);
  //     buySound.current = sound;
  //   };
  //   loadSound();

  //   return () => {
  //     buySound.current?.unloadAsync();
  //   };
  // }, []);

  const playBuySound = async () => {
    try {
      await buySound.current?.replayAsync();
    } catch (err) {
      console.warn('Ошибка воспроизведения звука:', err);
    }
  };

  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        await Promise.all([
          dispatch(fetchOwnedToys(catId!)).unwrap(),
          dispatch(fetchShopToys(catId!)).unwrap(),
          dispatch(fetchUserPoints(user!.user.id)).unwrap(),
        ]);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setInitialLoading(false);
        // Появление баланса
        Animated.parallel([
          Animated.timing(balanceOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(balanceTranslateY, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();
      }
    };

    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (user?.user.points !== undefined) {
      balanceScale.setValue(1.2);
      Animated.spring(balanceScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  }, [points]);

  const handleBuyToy = async (toy: ToyType) => {
    const actualPoints = pointsRef.current;
    if (isNaN(toy.id) || isNaN(catId!)) {
      console.error('Некорректный toyId или catId:', { toyId: toy.id, catId });
      return;
    }

    if (actualPoints - toy.price >= 0) {
      setLoadingButtons((prev) => ({ ...prev, [toy.id]: true }));
      dispatch(setPoints(-toy.price));
      try {
        await dispatch(buyToy({ catId: catId!, toyId: toy.id })).unwrap();
        await playBuySound();
        await dispatch(fetchOwnedToys(catId!)).unwrap();
        const setAchieveCallback = (achieve: AchieveT) => void dispatch(pushUserAchieve(achieve));
        const setPointsCallback = (actualPoints: number) => void dispatch(setPoints(actualPoints));
        await setLogsAndGetAchieves(
          {
            userId: user!.user.id,
            type: 'BuyToy',
            toyId: toy.id,
            nowPoints: actualPoints - toy.price,
          },
          setAchieveCallback,
          setPointsCallback,
        );
      } catch (error) {
        console.error('Ошибка при покупке игрушки:', error);
        // Возвращаем баллы при ошибке
        dispatch(setPoints(toy.price));
      } finally {
        setLoadingButtons((prev) => ({ ...prev, [toy.id]: false }));
      }
    } else {
      setSelectedToy(toy);
      setShowModal(true);
    }
  };

  const isToyBought = (toyId: number) => ownedToys.some((item) => item.toyId === toyId);

  const renderToy = React.useCallback(
    ({ item }: { item: (typeof shopToys)[number] }) => {
      const IconComponent = iconMap[item.img];
      const bought = isToyBought(item.id);
      const isLoading = loadingButtons[item.id] || false;

      return (
        <View style={styles.card}>
          <IconComponent width={80} height={80} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price} рыбок </Text>
          <TouchableOpacity
            style={[styles.buyButton, (bought || isLoading) && styles.disabledButton]}
            onPress={() => !bought && !isLoading && handleBuyToy(item)}
            disabled={bought || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <Text style={styles.buyText}>{bought ? 'Куплено' : 'Купить'}</Text>
            )}
          </TouchableOpacity>
        </View>
      );
    },
    [ownedToys, loadingButtons],
  );

  if (initialLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#FF8C00' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>Магазин игрушек</Text>
      {/* Баланс */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigation.navigate('BuyFish')}
          activeOpacity={0.7}
        >
          <Text style={styles.buyText}>Купить рыбов</Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.pointsWrapper,
            {
              opacity: balanceOpacity,
              transform: [{ translateY: balanceTranslateY }, { scale: balanceScale }],
            },
          ]}
        >
          <Text style={styles.pointsAmount}>Ваш баланс: {points} рыбок</Text>
        </Animated.View>
      </View>

      {/* Список игрушек */}
      <FlatList
        data={shopToys}
        renderItem={renderToy}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        extraData={{ ownedToys, loadingButtons }} // Передаем только необходимые данные для ререндера
      />

      <NotEnoughPointsModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        toyName={selectedToy?.name || ''}
        toyPrice={selectedToy?.price || 0}
        currentPoints={points}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pointsWrapper: {
    backgroundColor: '#FFFAF0',
    alignSelf: 'flex-end',
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  pointsAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF8C00',
  },
  buyFishWrapper: {
    alignSelf: 'center',
    marginVertical: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});
