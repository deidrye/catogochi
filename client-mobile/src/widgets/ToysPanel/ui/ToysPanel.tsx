// CatToysWidget.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from '@/app/store';

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

const ToysPanelWidget: React.FC = () => {
  // Получаем список игрушек из стора
  const ownedToys = useAppSelector((state) => state.toy.ownedToys);

  const renderToy = ({ item }: { item: any }) => {
    const IconComponent = iconMap[item.toy.img]; // Обновляем доступ к img через toy
    return (
      <View style={styles.toyItem}>
        <IconComponent width={80} height={80} />
        <Text style={styles.toyTitle}>{item.toy.name}</Text> {/* Обновляем name через toy */}
      </View>
    );
  };

  return (
    <View style={styles.toysContainer}>
      <Text style={styles.sectionTitle}>Мои игрушки</Text>
      {ownedToys.length > 0 ? (
        <FlatList
          data={ownedToys}
          renderItem={renderToy}
          keyExtractor={(item) => item.toy.id.toString()} // Используем toy.id как ключ
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>У вас нет игрушек</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toysContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  toyItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 20,
    width: 120, // Ширина карточки
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Для Android тень
    alignItems: 'center',
  },
  toyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
});

export default ToysPanelWidget;
