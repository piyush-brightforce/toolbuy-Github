import Svg, { Circle, Path } from 'react-native-svg';
import React from 'react';
import { useValues } from '../../../App';

export function MinusIcon({ color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 26 26"
      fill="none">
      <Circle cx="13" cy="13" r="13" />
      <Path d="M16 12V13.5H10V12H16Z" stroke={color || 'white'} />
    </Svg>
  );
}
