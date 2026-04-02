import * as React from "react"
import Svg, { Path } from "react-native-svg"
import appColors from '../../themes/appColors';

export function RemoveG(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width || 24}
			height={props.height || 24}
			fill={props.color || "#1f1f1f"}
			viewBox="0 -960 960 960"
			{...props}
		>
			<Path fill={props.color || appColors.textColorDark} d="M200-440v-80h560v80H200Z" />
		</Svg>
	)
}