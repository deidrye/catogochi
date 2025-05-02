import React, { useEffect, useRef, useState } from 'react';
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
import BuyFishScreen from '@/pages/BuyFish/BuyFishScreen';
import { LoadingScreen } from '@/widgets/LoadingScreen/LoadingScreen';
import { setLoader } from '@/entities/loader/model/loaderSlice';
import { setOnline } from '@/entities/cat/model/slice';
import { fetchUserPoints } from '@/entities/user/model/userThunks';

const Stack = createNativeStackNavigator();

export default function RouterProvider() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((store) => store.loader.isLoading);
  const { user, isInitialized } = useAppSelector((state) => state.auth);
  const { cat } = useAppSelector((store) => store.cat);
  const userAchieves = useAppSelector((store) => store.achievements.userAchieves);
  const prevAchievesLength = useRef(userAchieves.length);
  const catRef = useRef(cat);

  useEffect(() => {
    const main = async () => {
      await dispatch(checkAuth());
      const catResponse = await dispatch(fetchCat());
      if (catResponse.payload) dispatch(setOnline());
    };

    main();
  }, [dispatch]);

  useEffect(() => {
    catRef.current = cat;
    if (cat) dispatch(setLoader(true));
  }, [cat]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPoints(user.user.id));
    }
  }, [user]);

  useEffect(() => {
    if (prevAchievesLength.current > 0 && userAchieves.length > prevAchievesLength.current) {
      const lastAchievement = userAchieves[userAchieves.length - 1];

      Toast.show({
        type: 'success',
        text1: 'Новое достижение!',
        text2: `Вы получили: ${lastAchievement.name}`,
        position: 'bottom',
        topOffset: 200, // поднимет тост на 50 пикселей выше стандартной позиции
      });
    }
    prevAchievesLength.current = userAchieves.length;
  }, [userAchieves.length]);

  if (!isInitialized) {
    console.log('RouterProvider - user:', user, 'cat:', cat);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  // if (isLoading) return <LoadingScreen />;
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!user && (
            <>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
            </>
          )}
          {user && cat && (
            <>
              <Stack.Screen name='Main' component={Layout} />
              <Stack.Screen name='BuyFish' component={BuyFishScreen} />
            </>
          )}
          {user && !cat && !isLoading && (
            <Stack.Screen name='CreateCat' component={CreateCatScreen} />
          )}
          {user && !cat && isLoading && <Stack.Screen name='Loading' component={LoadingScreen} />}
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Toast /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
