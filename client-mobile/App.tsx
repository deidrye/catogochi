import 'react-native-reanimated';
import * as ScreenCapture from 'expo-screen-capture';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import RouterProvider from '@/app/provider/RouterProvider';
import { EventProvider } from '@/features/event-connection/model/EventContext';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <EventProvider>
        <RouterProvider />
      </EventProvider>
      <Toast />
    </Provider>
  );
}
