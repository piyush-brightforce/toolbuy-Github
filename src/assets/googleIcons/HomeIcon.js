import Svg, { Path } from 'react-native-svg';
import React from 'react';
import appColors from '../../themes/appColors';

export function HomeIconG(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width || 24}
			height={props.height || 24}
			fill={props.color || "#1f1f1f"}
			viewBox="0 -960 960 960"
			{...props}
		>
			<Path fill={props.color || appColors.textColorDark} d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
		</Svg>
	);
}