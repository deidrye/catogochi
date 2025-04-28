// AnimatedCat.tsx
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';

const CatSvg = () => {
  const breathAnimation = useRef(new Animated.Value(1)).current;
  const blinkAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breathe = () => {
      Animated.sequence([
        Animated.timing(breathAnimation, {
          toValue: 1.03,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(breathAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => breathe());
    };

    const blink = () => {
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(blink, Math.random() * 5000 + 3000); // моргать раз в 3-8 секунд
      });
    };

    breathe();
    blink();
  }, [breathAnimation, blinkAnimation]);

  return (
    <Animated.View style={{ transform: [{ scale: breathAnimation }] }}>
      <Svg viewBox='0 0 200 200' width='200' height='200'>
        {/* Тело */}
        <Ellipse cx='100' cy='150' rx='50' ry='30' fill='#c28f70' />

        {/* Голова */}
        <Path
          d='M70 80 Q100 50 130 80 Q125 110 75 110 Q70 80 70 80'
          fill='#c28f70'
          stroke='#000'
          strokeWidth='2'
        />

        {/* Уши */}
        <Path d='M70 80 Q60 60 75 70' fill='#c28f70' stroke='#000' strokeWidth='2' />
        <Path d='M130 80 Q140 60 125 70' fill='#c28f70' stroke='#000' strokeWidth='2' />

        {/* Глаза */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 70,
            top: 80,
            transform: [{ scaleY: blinkAnimation }],
          }}
        >
          <Circle cx='30' cy='0' r='5' fill='#000' />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            left: 110,
            top: 80,
            transform: [{ scaleY: blinkAnimation }],
          }}
        >
          <Circle cx='30' cy='0' r='5' fill='#000' />
        </Animated.View>

        {/* Нос */}
        <Path
          d='M95 100 Q100 105 105 100 Q100 110 95 100'
          fill='#e08080'
          stroke='#000'
          strokeWidth='1'
        />

        {/* Рот */}
        <Path d='M100 110 Q95 115 90 112' stroke='#000' strokeWidth='1' fill='none' />
        <Path d='M100 110 Q105 115 110 112' stroke='#000' strokeWidth='1' fill='none' />

        {/* Хвост */}
        <Path
          d='M140 150 Q170 140 160 170'
          stroke='#c28f70'
          strokeWidth='10'
          fill='none'
          strokeLinecap='round'
        />
      </Svg>
    </Animated.View>
  );
};

export default CatSvg;
