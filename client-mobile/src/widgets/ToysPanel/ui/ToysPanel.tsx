import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchOwnedToys } from '@/entities/toy/model/toyThunks';
import { fetchCat, updateCat } from '@/entities/cat/model/thunks';

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
import { OwnedToyType } from '@/entities/toy/model/toyType';
import { CatT } from '@/entities/cat/model/types';
import { toySchema } from '@/entities/toy/model/toyScheme';
import { AchieveT } from '@/entities/achievements/model/types';
import { pushUserAchieve } from '@/entities/achievements/model/slice';
import { setLogsAndGetAchieves } from '@/features/logs-feature/model/checkLog';

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

// Кастомный анимированный тост
const AnimatedToast = ({ text }: { text: string }) => {
  return (
    <Animated.View entering={FadeInUp.duration(500)} style={styles.toastContainer}>
      <Text style={styles.toastText}>{text}</Text>
    </Animated.View>
  );
};

interface ToysPanelProps {
  cat: CatT | null;
  onPlay: () => void;
}

const ToysPanelWidget: React.FC<ToysPanelProps> = ({ cat, onPlay }) => {
  const dispatch = useAppDispatch();
  const ownedToys = useAppSelector((state) => state.toy.ownedToys);
  const isLoading = useAppSelector((state) => state.toy.isLoading);
  const catId = cat?.id;
  const user = useAppSelector((store) => store.auth.user);

  useEffect(() => {
    if (catId) {
      dispatch(fetchOwnedToys(catId));
    }
  }, [dispatch, catId]);

  const handleToyPress = async (event: OwnedToyType) => {
    if (!cat || !catId) {
      return;
    }

    const effect = event.Toy.effect as Record<keyof typeof cat, number>;
    const updatedStats = Object.entries(effect).reduce((acc, [key, value]) => {
      if (typeof cat[key as keyof typeof cat] === 'number') {
        return {
          ...acc,
          [key]: Math.max(0, Math.min(100, (cat[key as keyof typeof cat] as number) + value)),
        };
      }
      return acc;
    }, {});

    const updatedCat = {
      ...cat,
      ...updatedStats,
    };

    dispatch(updateCat(updatedCat));
    onPlay(); // Вызываем колбэк для анимации

    Toast.show({
      type: 'success',
      text1: event.description || 'Описание отсутствует',
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
    });

    const setAchieveCallback = (achieve: AchieveT) => void dispatch(pushUserAchieve(achieve));
    await setLogsAndGetAchieves(
      { userId: user!.user.id, type: 'ToyGame', toyId: event.Toy.id },
      setAchieveCallback,
    );
  };

  const renderToy = ({ item }: { item: (typeof ownedToys)[number] }) => {
    const IconComponent = iconMap[item.Toy.img];
    return (
      <View style={styles.toyItem}>
        <TouchableOpacity
          style={styles.toyContent}
          onPress={() => handleToyPress(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {IconComponent ? (
            <IconComponent width={50} height={50} />
          ) : (
            <View style={styles.placeholderIcon} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.toysContainer}>
        <Text style={styles.sectionTitle}>Мои игрушки</Text>
        <ActivityIndicator size='large' color='#FF8C00' />
      </View>
    );
  }

  return (
    <View style={styles.toysContainer}>
      <Text style={styles.sectionTitle}>Мои игрушки</Text>
      {ownedToys.length > 0 ? (
        <FlatList
          data={ownedToys}
          renderItem={renderToy}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          nestedScrollEnabled
        />
      ) : (
        <Text style={styles.emptyText}>У вас нет игрушек</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toysContainer: {
    marginTop: 20,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    maxHeight: 380,
    width: 100,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  flatList: {
    flexGrow: 0,
  },
  toyItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  placeholderIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
  toastContainer: {
    backgroundColor: '#FF8C00',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
  },
  toastText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default ToysPanelWidget;
