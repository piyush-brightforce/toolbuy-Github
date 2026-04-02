import * as React from "react"
import Svg, { Path } from "react-native-svg"
import appColors from '../../themes/appColors';

export function AddG(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width || 24}
			height={props.height || 24}
			fill={props.color || "#1f1f1f"}
			viewBox="0 -960 960 960"
			{...props}
		>
			<Path fill={props.color || appColors.textColorDark} d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
		</Svg>
	)
}