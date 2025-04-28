// GameScreen.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToysPanelWidget from '@/widgets/ToysPanel/ui/ToysPanel';
import Toast from 'react-native-toast-message';
import { CustomToast } from '@/widgets/CustomToast/ui/CustomToast';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

export const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const goToShop = () => {
    navigation.navigate('Shop');
  };

  return (
    <>
      {/* <ScrollView contentContainerStyle={styles.container}> */}
        <View style={styles.cat}>
          <Text>Здесь будет котик</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={goToShop}>
          <Text style={styles.buttonText}>Перейти в магазин</Text>
        </TouchableOpacity>
        <ToysPanelWidget />
      {/* </ScrollView> */}
      <Toast
        config={{
          success: (props) => <CustomToast {...props} />,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  cat: {
    width: 200,
    height: 300,
    backgroundColor: 'black',
    color: 'white',
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
