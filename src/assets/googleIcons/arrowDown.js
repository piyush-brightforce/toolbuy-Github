{/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d=/></svg>
 */}


import * as React from "react"
import Svg, { Path } from "react-native-svg"
import appColors from '../../themes/appColors';

export function ArrowDown(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            fill={props.color || "#1f1f1f"}
            viewBox="0 -960 960 960"
            {...props}
        >
            <Path fill={props.color || appColors.textColorDark} d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </Svg>
    )
}