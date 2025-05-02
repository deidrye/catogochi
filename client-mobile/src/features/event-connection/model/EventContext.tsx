import React, { createContext, useContext, useRef, useEffect } from 'react';
import { z } from 'zod';
import { CLIENT_IP } from '@env';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setCat } from '@/entities/cat/model/slice';
import { updateCat } from '@/entities/cat/model/thunks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import connectedSound from '@/assets/sounds/cat-meow.mp3';
import { Audio } from 'expo-av';

export const wsActionSchema = z.object({
  type: z.string(),
  payload: z.object({
    title: z.string(),
    description: z.string(),
    effect: z.object({
      angry: z.number().optional(),
      hp: z.number().optional(),
      energy: z.number().optional(),
      affection: z.number().optional(),
      boldness: z.number().optional(),
    }),
  }),
});

export type WsResponseT = z.infer<typeof wsActionSchema>;

type EventContextT = {
  ws: WebSocket | null;
  connectToWS: () => void;
  isConnected: boolean;
};

const EventContext = createContext<EventContextT | null>(null);

type Props = {
  children: React.ReactNode;
};

export function EventProvider({ children }: Props) {
  const user = useAppSelector((store) => store.auth.user);
  const cat = useAppSelector((store) => store.cat.cat);
  const isCatOnline = useAppSelector((store) => store.cat.isCatOnline);
  const catRef = useRef(cat);
  const userRef = useRef(user?.user);
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    catRef.current = cat;
  }, [cat]);

  useEffect(() => {
    userRef.current = user?.user;
  }, [user]);

  const connectToWS = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    catRef.current = cat;

    if (catRef.current && userRef.current) {
      const connection = new WebSocket(`ws://${CLIENT_IP}:3000`);

      connection.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
        Toast.show({
          type: 'error',
          text1: 'Connection Error',
          text2: 'Failed to connect to server',
        });
      };

      connection.onopen = async () => {
        console.log('WebSocket connected');
        setIsConnected(true);

        // Отправляем userId сразу после подключения
        if (catRef.current?.id) {
          connection.send(
            JSON.stringify({
              type: 'init',
              payload: { catId: catRef.current?.id, userId: userRef.current?.id },
            }),
          );
        }

        // Звук подключения
        try {
          const { sound } = await Audio.Sound.createAsync(connectedSound);
          await sound.playAsync();
        } catch (error) {
          console.error('Ошибка воспроизведения звука:', error);
        }

        Toast.show({
          type: 'success',
          text1: `Добро пожаловать, ${user?.user.name}`,
          text2: 'Ваш кот уже соскучился',
        });
      };

      // Остальные обработчики остаются без изменений
      connection.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      };

      connection.onmessage = async (event) => {
        try {
          const parsedData = wsActionSchema.parse(JSON.parse(event.data));
          const wsEvent = parsedData.payload;

          const updatedStats: {
            angry: number;
            hp: number;
            energy: number;
            affection: number;
            boldness: number;
          } = { angry: 0, hp: 0, energy: 0, affection: 0, boldness: 0 };

          type CatStatKey = keyof typeof updatedStats;
          for (const key in updatedStats) {
            const statKey = key as CatStatKey;
            if (catRef.current) {
              const resultStat = catRef.current[statKey] + (wsEvent.effect[statKey] || 0);
              updatedStats[statKey] = Math.max(0, Math.min(100, resultStat));
            }
          }

          const oldCat = catRef.current;
          const newCat = { ...catRef.current!, ...updatedStats };
          dispatch(setCat(newCat));
          const res = await dispatch(updateCat(newCat));
          if (res.meta.requestStatus === 'rejected') void dispatch(setCat(oldCat));

          Toast.show({
            type: 'info',
            text1: wsEvent.title,
            text2: wsEvent.description,
            visibilityTime: 3000,
          });
          try {
            const { sound } = await Audio.Sound.createAsync(connectedSound);
            await sound.playAsync();
          } catch (error) {
            console.error('Ошибка воспроизведения звука:', error);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      wsRef.current = connection;
    }
  };

  useEffect(() => {
    console.log('sssssssssssssssss', isCatOnline, useRef);

    if (isCatOnline) {
      connectToWS();
    }
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isCatOnline]);

  const contextValue = {
    ws: wsRef.current,
    connectToWS,
    isConnected,
  };

  return <EventContext.Provider value={contextValue}>{children}</EventContext.Provider>;
}

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within EventProvider');
  }
  return context;
}
