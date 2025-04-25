import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

// Тип для пропсов кнопки игрушки
type ToyButtonProps = {
  title: string;
  imageSource: any; // Тип для require()
  color: string;
  onPress: () => void;
};

// Компонент кнопки игрушки
const ToyButton: React.FC<ToyButtonProps> = ({ title, imageSource, color, onPress }) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      { backgroundColor: color },
      pressed ? styles.buttonPressed : {},
    ]}
    onPress={onPress}
    accessibilityLabel={`Игрушка ${title}`}
  >
    <View style={styles.buttonContent}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </Pressable>
);

// Основной компонент панели
const CatToysPanel: React.FC = () => {
  // Заглушки для обработчиков событий
  const handleBall = () => console.log('Мячик');
  const handleMouse = () => console.log('Мышка');
  const handleFeather = () => console.log('Перо');
  const handleLaser = () => console.log('Лазер');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Игрушки кота</Text>
      <View style={styles.buttonContainer}>
        <ToyButton
          title="Мячик"
          imageSource={'https://catalog.detmir.st/media/YNyUvI1Udud2xLJeZneP13DdLUoUXXL1CJ_NExV7JKk=?preset=site_product_gallery_r1500'}
          color="white"
          onPress={handleBall}
        />
        <ToyButton
          title="Мышка"
          imageSource={'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRyoWktTL7tysGu88vF_Uife4PXOMsHt7Ma6EtdDUGZnoNOlwkYroUpHLJqFttxZ7kdiRMe_ghMSvgPkETbNiewdyIPiZq9dlwCbvQat_3LMb9RRoyngSZE'}
          color="#white"
          onPress={handleMouse}
        />
        {/* <ToyButton
          title="Перо"
          imageSource={}
          color="#dc3545"
          onPress={handleFeather}
        />
        <ToyButton
          title="Лазер"
          imageSource={}
          color="#6f42c1"
          onPress={handleLaser}
        />  */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  buttonContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CatToysPanel;