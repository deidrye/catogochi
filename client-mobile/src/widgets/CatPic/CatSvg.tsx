import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface CatSvgProps {
  color: string;
}

const CatSvg: React.FC<CatSvgProps> = ({ color }) => {
  return (
    <Svg width={150} height={150} viewBox='0 0 64 64' fill='none'>
      {/* Голова */}
      <Circle cx='32' cy='32' r='20' fill={color} />

      {/* Глаза */}
      <Circle cx='24' cy='28' r='3' fill='#000' />
      <Circle cx='40' cy='28' r='3' fill='#000' />

      {/* Уши */}
      <Path d='M18 14 L26 24 L20 26 Z' fill={color} />
      <Path d='M46 14 L38 24 L44 26 Z' fill={color} />
    </Svg>
  );
};

export default CatSvg;
