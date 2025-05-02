import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GameScreen } from '@/pages/Game/GameScreen';
import { ShopScreen } from '@/pages/Shop/ShopScreen';
import AchievementsScreen from '@/pages/Achievments/AchievmentScreen';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import { exitGame } from '@/entities/user/model/userThunks';
import { fetchActions, fetchCat } from '@/entities/cat/model/thunks';
import { setOnline } from '@/entities/cat/model/slice';
import { clearPoints } from '@/entities/user/model/userSlice';

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
  const dispatch = useAppDispatch();
  const isCatOnline = useAppSelector((store) => store.cat.isCatOnline);
  const user = useAppSelector((store) => store.auth.user!.user);

  useEffect(() => {
    return () => {
      dispatch(exitGame(user.id));
    };
  }, [isCatOnline]);

  useEffect(() => {
    async function main() {
      // if (!isCatOnline) await dispatch(fetchCat());
      await dispatch(fetchActions());
      void dispatch(setOnline());
    }
    main();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Tab.Navigator
        initialRouteName='Game'
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,

          swipeEnabled: true, // Разрешить свайп
        }}
      >
        <Tab.Screen name='Game' component={GameScreen} options={{ tabBarLabel: 'Кот' }} />
        <Tab.Screen name='Shop' component={ShopScreen} options={{ tabBarLabel: 'Магазин' }} />
        <Tab.Screen
          name='Achievements'
          component={AchievementsScreen}
          options={{ tabBarLabel: 'Профиль' }}
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
