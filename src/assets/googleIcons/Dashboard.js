 

import * as React from "react"
import Svg, { Path } from "react-native-svg"
import appColors from '../../themes/appColors';

export function DashboardIconG(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            fill={props.color || "#1f1f1f"}
            viewBox="0 -960 960 960"
            {...props}
        >
            <Path fill={props.color || appColors.textColorDark} d="M510-570v-270h330v270H510ZM120-450v-390h330v390H120Zm390 330v-390h330v390H510Zm-390 0v-270h330v270H120Z" />
        </Svg>
    )
}
 