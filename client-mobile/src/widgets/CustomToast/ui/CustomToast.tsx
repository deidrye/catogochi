import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface CustomToastProps {
  text1?: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({ text1 }) => {
  const { width } = Dimensions.get('window');

  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      style={[
        styles.toastContainer,
        { width: width * 0.7 },
      ]}
    >
      {/* Яркая полоска слева */}
      <View style={styles.greenStrip} />
      
      {/* Основной текст */}
      <View style={styles.textContainer}>
        <Text style={styles.toastText} numberOfLines={0}>
          {text1 ?? ''}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,               // Чуть более округлый стиль
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#90EE90',         // Лёгкий контур в цвет полоски
  },
  greenStrip: {
    width: 8,
    backgroundColor: '#32CD32',     // Ярко-зелёная полоска (LimeGreen)
  },
  textContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  toastText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 22,
  },
});
