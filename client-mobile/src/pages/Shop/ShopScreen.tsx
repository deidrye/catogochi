import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { buyToy, fetchOwnedToys, fetchShopToys } from '@/entities/toy/model/toyThunks';

// SVG импорты (предполагается, что они такие же, как в ToysPanelWidget)
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

export const ShopScreen: React.FC<ShopScreenProps> = () => {
  const dispatch = useAppDispatch();
  const ownedToys = useAppSelector((state) => state.toy.ownedToys);
  const shopToys = useAppSelector((state) => state.toy.shopToys);
  const isLoading = useAppSelector((state) => state.toy.isLoading);
  const catId = 1; // Замените на актуальное значение
  const [initialLoading, setInitialLoading] = useState(true);
  const [optimisticToys, setOptimisticToys] = useState<number[]>([]); // Локальное состояние для оптимистичных toyId
  const [isBuying, setIsBuying] = useState<Record<number, boolean>>({}); // Состояние для блокировки кнопок

  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        await Promise.all([
          dispatch(fetchOwnedToys(catId)).unwrap(),
          dispatch(fetchShopToys(catId)).unwrap(),
        ]);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setInitialLoading(false);
      }
    };
    loadData();
  }, [dispatch, catId]);

  const handleBuyToy = async (toyId: number) => {
    if (isNaN(toyId) || isNaN(catId)) {
      console.error('Некорректный toyId или catId:', { toyId, catId });
      return;
    }

    // Оптимистично обновляем UI
    setOptimisticToys((prev) => [...prev, toyId]);
    setIsBuying((prev) => ({ ...prev, [toyId]: true }));

    try {
      // console.log('Покупка игрушки:', { catId, toyId });
      const toyEvent = await dispatch(buyToy({ catId, toyId })).unwrap();
      // console.log('Ответ после покупки игрушки:', toyEvent);

      // Обновляем ownedToys по ответу сервера
      await dispatch(fetchOwnedToys(catId)).unwrap();
    } catch (error) {
      console.error('Ошибка при покупке игрушки:', error);
      // Откатываем оптимистичное обновление при ошибке
      setOptimisticToys((prev) => prev.filter((id) => id !== toyId));
    } finally {
      // Снимаем блокировку кнопки
      setIsBuying((prev) => ({ ...prev, [toyId]: false }));
    }
  };

  const isToyBought = (toyId: number) => {
    // Проверяем как ownedToys, так и оптимистичные toyId
    return ownedToys.some((item) => item.toyId === toyId) || optimisticToys.includes(toyId);
  };

  const renderToy = ({ item }: { item: (typeof shopToys)[number] }) => {
    const IconComponent = iconMap[item.img];
    const bought = isToyBought(item.id);
    const buying = isBuying[item.id] || false;

    return (
      <View style={styles.card}>
        <IconComponent width={100} height={100} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} рыбок</Text>
        <TouchableOpacity
          style={[styles.buyButton, bought && styles.disabledButton]}
          onPress={() => !bought && !buying && handleBuyToy(item.id)}
          disabled={bought || buying}
        >
          <Text style={styles.buyText}>
            {buying ? 'Покупка...' : bought ? 'Уже куплено' : 'Купить'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (initialLoading || isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#FF8C00' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Магазин игрушек</Text>
      <FlatList
        data={shopToys}
        renderItem={renderToy}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
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
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 10,
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
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
