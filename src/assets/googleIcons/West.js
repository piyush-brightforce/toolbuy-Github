import Svg, { Path } from 'react-native-svg';
import React from 'react';
import appColors from '../../themes/appColors';

export function WestIconG(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width || 24}
			height={props.height || 24}
			fill={props.color || "#1f1f1f"}
			viewBox="0 -960 960 960"
			{...props}
		>
			<Path fill={props.color || appColors.textColorDark} d="M360-200 80-480l280-280 56 56-183 184h647v80H233l184 184-57 56Z" />
		</Svg>
	);
}