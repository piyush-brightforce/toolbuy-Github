 
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import appColors from '../../themes/appColors';

export function ArrowInsert(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            fill={props.color || "#1f1f1f"}
            viewBox="0 -960 960 960"
            {...props}
        >
            <Path fill={props.color || appColors.textColorDark} d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z" />
        </Svg>
    )
}