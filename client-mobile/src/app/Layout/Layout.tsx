import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GameScreen } from '@/pages/Game/GameScreen';
import { ShopScreen } from '@/pages/Shop/ShopScreen';
import AchievementsScreen from '@/pages/Achievments/AchievmentScreen';

const Tab = createMaterialTopTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Game' component={GameScreen} options={{ tabBarLabel: 'Кот' }} />
      <Tab.Screen name='Shop' component={ShopScreen} options={{ tabBarLabel: 'Магазин' }} />
      <Tab.Screen
        name='Achievments'
        component={AchievementsScreen}
        options={{ tabBarLabel: 'Достижения' }}
      />
    </Tab.Navigator>
  );
}
