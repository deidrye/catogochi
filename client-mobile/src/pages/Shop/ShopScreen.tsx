import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// SVG импорты
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
import { useAppDispatch, useAppSelector } from '@/app/store';
import { buyToy, fetchShopToys } from '@/entities/toy/model/toyThunks';

type ShopScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Shop'>;

interface ShopScreenProps {
  navigation: ShopScreenNavigationProp;
}

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

export const ShopScreen: React.FC<ShopScreenProps> = () => {
  const dispatch = useAppDispatch();
  const ownedToys = useAppSelector((state) => state.toy.ownedToys);

  useEffect(() => {
    dispatch(fetchShopToys());
  }, [dispatch]);

  const shopToys = useAppSelector((state) => state.toy.shopToys);

  const handleBuyToy = async (toyId: number) => {
    try {
      const catId = 1; // Пример, замените на актуальное значение
      if (isNaN(toyId) || isNaN(catId)) {
        throw new Error('Некорректный toyId или catId при покупке игрушки');
      }
      console.log('Покупка игрушки:', { catId, toyId });
      
      const toyEvent = await dispatch(buyToy({ catId, toyId })).unwrap();
      console.log('Ответ после покупки игрушки:', toyEvent); // Логирование ответа
      alert('Игрушка успешно куплена!');
    } catch (error) {
      console.error('Ошибка при покупке игрушки:', error);
      alert('Ошибка при покупке игрушки');
    }
  };

  useEffect(() => {
    console.log('Состояние ownedToys после покупки:', ownedToys);
  }, [ownedToys]); // Срабатывает, когда состояние ownedToys обновляется

  const renderToy = ({ item }: { item: (typeof shopToys)[number] }) => {
    const IconComponent = iconMap[item.img];
    return (
      <View style={styles.card}>
        <IconComponent width={100} height={100} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} монет</Text>
        <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyToy(item.id)}>
          <Text style={styles.buyText}>Купить</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    elevation: 2,
    objectFit: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  buyButton: {
    marginTop: 10,
    backgroundColor: '#FF8C00',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
