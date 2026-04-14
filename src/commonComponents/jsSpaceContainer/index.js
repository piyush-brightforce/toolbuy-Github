import {Text, View} from 'react-native';
import React from 'react';
import {external} from '../../style/external.css';
import {commonStyles} from '../../style/commonStyle.css';
import {useValues} from '../../../App';
import { fontSizes } from '../../themes/appConstant';
import appFonts from '../../themes/appFonts';

const JsSpaceContainer = ({title, price, color,fontFamily=appFonts.regular,fontsize=fontSizes.FONT17}) => {
  const {textColorStyle, viewRTLStyle,linearColorStyle} = useValues();

  return (
    <View
      style={[
        external.fd_row,
        external.ai_center,
        external.js_space,
        external.ph_10,
        external.pv_5,
        {flexDirection: viewRTLStyle},
      ]}>
      <View>
        <Text style={[commonStyles.subtitleText,{color:textColorStyle,fontFamily: fontFamily, fontSize: fontsize}]}>{title}</Text>
      </View>
      <View>
        <Text
          style={[commonStyles.subtitleText, {color: color || textColorStyle,fontFamily: fontFamily, fontSize: fontsize}]}>
          {price}
        </Text>
      </View>
    </View>
  );
};

export default JsSpaceContainer;
