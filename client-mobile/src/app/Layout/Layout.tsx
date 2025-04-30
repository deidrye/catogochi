import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GameScreen } from '@/pages/Game/GameScreen';
import { ShopScreen } from '@/pages/Shop/ShopScreen';
import AchievementsScreen from '@/pages/Achievments/AchievmentScreen';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store';
import { logout } from '@/features/auth/model/thunks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { setOffline } from '@/entities/cat/model/slice';

type MainTabsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainTabsNavigationProp>();

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.navigate('Login');
    dispatch(setOffline());
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        initialRouteName='Game'
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          lazy: true, // Ленивая загрузка
          swipeEnabled: true, // Разрешить свайп
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 1, // Важно для iOS
    height: 50, // Явно задайте высоту
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
