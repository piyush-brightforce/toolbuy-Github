import Svg, { Path } from 'react-native-svg';
import React from 'react';
import appColors from '../../themes/appColors';

export function SwapVert(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			fill="#1f1f1f"
			viewBox="0 -960 960 960"
			{...props}
		>
            <Path fill={props.color || appColors.textColorDark} d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z" />
		</Svg>
	);
}