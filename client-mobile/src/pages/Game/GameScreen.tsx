import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToysPanelWidget from '@/widgets/ToysPanel/ui/ToysPanel';
import Toast from 'react-native-toast-message';
import { CustomToast } from '@/widgets/CustomToast/ui/CustomToast';
import CatActionsWidget from '@/widgets/CatAction/ui/CatAction';
import CatStatsWidget from '@/widgets/CatStats/ui/CatStats';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

export const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const goToShop = () => {
    navigation.navigate('Shop');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Статистика кота (вверху) */}
        <Animated.View entering={FadeInUp.duration(500)} style={styles.statsContainer}>
          <CatStatsWidget />
        </Animated.View>

        {/* Кнопка магазина (правый верхний угол) */}
        <TouchableOpacity style={styles.shopButton} onPress={goToShop}>
          <Icon name="shopping-cart" size={20} color="#fff" />
          <Text style={styles.shopButtonText}>Магазин</Text>
        </TouchableOpacity>

        {/* Котик и игрушки (центр) */}
        <View style={styles.mainContent}>
          {/* Котик */}
          <Animated.View entering={FadeInUp.duration(600).delay(100)} style={styles.catContainer}>
            <View style={styles.cat}>
              <Text style={styles.catText}>Здесь будет котик</Text>
            </View>
          </Animated.View>

          {/* Панель игрушек (справа) */}
          <Animated.View entering={FadeInUp.duration(700).delay(200)} style={styles.toysContainer}>
            <ToysPanelWidget />
          </Animated.View>
        </View>

        {/* Действия с котом (внизу) */}
        <Animated.View entering={FadeInUp.duration(800).delay(300)} style={styles.actionsContainer}>
          <CatActionsWidget />
        </Animated.View>
      </View>
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
    backgroundColor: '#FFF5E1', // Тёплый кремовый фон
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative',
  },
  statsContainer: {
    alignSelf: 'center',
    width: width * 0.75, // Адаптивная ширина
    marginBottom: 15,
  },
  shopButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF8C00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cat: {
    width: width * 0.6, // Адаптивный размер
    height: height * 0.45,
    maxWidth: 260,
    maxHeight: 360,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  catText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toysContainer: {
    width: 130, // Увеличено для видимости
    alignSelf: 'center',
  },
  actionsContainer: {
    alignSelf: 'center',
    width: width * 0.75,
    marginBottom: 15,
  },
});