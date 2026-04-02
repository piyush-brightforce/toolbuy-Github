import Svg, { Path } from 'react-native-svg';
import React from 'react';
import appColors from '../../themes/appColors';

export function Drawer(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			fill="#1f1f1f"
			viewBox="0 -960 960 960"
			{...props}
		>
			<Path fill={props.color || appColors.textColorDark} d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" />
		</Svg>
	);
}