 
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import appColors from '../../themes/appColors';

export function AddShoppingCartG(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            fill={props.color || "#1f1f1f"}
            viewBox="0 -960 960 960"
            {...props}
        >
            <Path fill={props.color || appColors.textColorDark} d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
        </Svg>
    )
}