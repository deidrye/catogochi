import 'react-native-reanimated';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import RouterProvider from '@/app/provider/RouterProvider';

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider />
    </Provider>
  );
}
