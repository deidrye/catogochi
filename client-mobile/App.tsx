import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { RootStackParamList } from './src/app/types/navigation';
import { LoginScreen } from '@/pages/Login/LoginScreen';
import { RegisterScreen } from '@/pages/Register/RegisterScreen';
import { MainScreen } from '@/pages/Main/MainScreen';
import { useAppDispatch, useAppSelector } from './src/app/store';
import { checkAuth } from './src/features/auth/model/thunks';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  const dispatch = useAppDispatch();
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Main' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name='Main' component={MainScreen} />
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
