import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GameScreen } from '@/pages/Game/GameScreen';
import { ShopScreen } from '@/pages/Shop/ShopScreen';
import AchievementsScreen from '@/pages/Achievments/AchievmentScreen';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store';
import { logout } from '@/features/auth/model/thunks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1. Определяем типы для навигации
type RootStackParamList = {
  Login: undefined;
  Game: undefined;
  CreateCat: undefined;
  // Добавьте другие экраны по необходимости
};

// 2. Создаем тип для useNavigation
type MainTabsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
  const dispatch = useAppDispatch();
  // 3. Указываем правильный тип для навигации
  const navigation = useNavigation<MainTabsNavigationProp>();

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.navigate('Login'); // Теперь TypeScript не будет ругаться
  };

  return (
    <View style={styles.container}>
      {/* Табы */}
      <Tab.Navigator
      initialRouteName='Game'
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen name='Game' component={GameScreen} options={{ tabBarLabel: 'Кот' }} />
        <Tab.Screen name='Shop' component={ShopScreen} options={{ tabBarLabel: 'Магазин' }} />
        <Tab.Screen
          name='Achievements'
          component={AchievementsScreen}
          options={{ tabBarLabel: 'Достижения' }}
        />
      </Tab.Navigator>

      {/* Кнопка выхода */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... стили остаются такими же

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  logoutButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 100,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
