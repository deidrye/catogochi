// AnimatedCat.tsx
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const CatSvg = () => {
  return (
    <Svg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
      {/* Голова */}
      <Circle cx='100' cy='50' r='40' fill='gray' />
      {/* Глаза */}
      <Circle cx='85' cy='45' r='7' fill='white' />
      <Circle cx='115' cy='45' r='7' fill='white' />
      {/* Зрачки */}
      <Circle cx='85' cy='45' r='3' fill='black' />
      <Circle cx='115' cy='45' r='3' fill='black' />
      {/* Уши */}
      <Path d='M60,30 L40,10 L80,20 Z' fill='gray' />
      <Path d='M140,30 L160,10 L120,20 Z' fill='gray' />
      {/* Рот */}
      <Path d='M80,65 Q100,85 120,65' stroke='black' strokeWidth='2' fill='transparent' />
    </Svg>
  );
};

const AnimatedCat = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <CatSvg />
    </Animated.View>
  );
};

export default AnimatedCat;
