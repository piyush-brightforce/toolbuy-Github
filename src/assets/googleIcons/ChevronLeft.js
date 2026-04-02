import Svg, { Path } from 'react-native-svg';
import React from 'react';
import appColors from '../../themes/appColors';

export function ChevronLeft(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width || 24}
			height={props.height || 24}
			fill={props.color || "#1f1f1f"}
			viewBox="0 -960 960 960"
			{...props}
		>
			<Path fill={props.color || appColors.textColorDark} d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
		</Svg>
	);
}