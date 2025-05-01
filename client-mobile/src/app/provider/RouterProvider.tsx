import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@/pages/Login/LoginScreen';
import { RegisterScreen } from '@/pages/Register/RegisterScreen';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { checkAuth } from '@/features/auth/model/thunks';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Layout from '@/app/Layout/Layout';
import CreateCatScreen from '@/pages/Create/CreateCatScreen';
import Toast from 'react-native-toast-message';
import { fetchCat } from '@/entities/cat/model/thunks';
import { setCat } from '@/entities/cat/model/slice';
import BuyFishScreen from '@/pages/BuyFish/BuyFishScreen';

const Stack = createNativeStackNavigator();

export default function RouterProvider() {
  const dispatch = useAppDispatch();
  const { user, isInitialized } = useAppSelector((state) => state.auth);
  const cat = useAppSelector((store) => store.cat.cat);
  const userAchieves = useAppSelector((store) => store.achievements.userAchieves);
  const showAchieveToggle = useAppSelector((store) => store.achievements.showAchieveToggle);
  const prevAchievesLength = useRef(userAchieves.length);
  const catRef = useRef(cat);

  useEffect(() => {
    async function main() {
      await dispatch(checkAuth());
      await dispatch(fetchCat());
    }
    main();
  }, [dispatch]);

  useEffect(() => {
    catRef.current = cat;
  }, [cat]);

  useEffect(() => {
    if (userAchieves.length > 0 && userAchieves.length > prevAchievesLength.current) {
      const lastAchievement = userAchieves[userAchieves.length - 1];

      Toast.show({
        type: 'success',
        text1: 'Новое достижение!',
        text2: `Вы получили: ${lastAchievement.name}`,
        position: 'bottom',
      });
    }
    prevAchievesLength.current = userAchieves.length;
  }, [showAchieveToggle]);

  if (!isInitialized) {
    console.log('RouterProvider - user:', user, 'cat:', cat);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!user ? (
            <>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
            </>
          ) : !cat ? (
            <>
              <Stack.Screen name='CreateCat' component={CreateCatScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name='Main' component={Layout} />
              <Stack.Screen name='BuyFish' component={BuyFishScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
