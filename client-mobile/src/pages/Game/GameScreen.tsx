import React from 'react';
import { StyleSheet } from 'react-native';
import CatStatsWidget from '@/widgets/CatStats/ui/CatStats';
import CatActionsWidget from '@/widgets/CatAction/ui/CatAction';
import CatToysPanel from '@/widgets/ToysPanel/ui/ToysPanel';
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

export const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  return (
    <>
      <CatStatsWidget />
      <CatActionsWidget />
      <CatToysPanel />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
