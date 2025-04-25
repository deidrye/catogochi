import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
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
  const goToShop = () => {
    navigation.navigate('Shop');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goToShop}>
        <Text style={styles.buttonText}>Перейти в магазин</Text>
      </TouchableOpacity>
      <CatStatsWidget />
      <CatActionsWidget />
      <CatToysPanel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
