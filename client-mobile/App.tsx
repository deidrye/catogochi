import 'react-native-reanimated';
import * as ScreenCapture from 'expo-screen-capture';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import RouterProvider from '@/app/provider/RouterProvider';
import { EventProvider } from '@/features/event-connection/model/EventContext';
import Toast from 'react-native-toast-message';
import CustomToast2 from '@/widgets/CustomToast2/CustomToast2';

export default function App() {
  return (
    <Provider store={store}>
      <EventProvider>
        <RouterProvider />
      </EventProvider>
      <Toast
        config={{
          info: (props) => <CustomToast2 {...props} />,
          success: (props) => <CustomToast2 {...props} />,
          error: (props) => <CustomToast2 {...props} />,
        }}
      />
    </Provider>
  );
}
