 import React from 'react';
import appColors from '../../themes/appColors'; 
import JsSpaceContainer from '../jsSpaceContainer'; 
import {styles} from './style.css';
import {useValues} from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import { formatCurrency } from '../../style/rtlStyle';

const SubtotalContainer = ({data}) => {
  const {linearColorStyle, isDark, t, currSymbol, currPrice,currency,curreLocale} = useValues();
  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32']
    : [appColors.screenBg, appColors.screenBg];
  return (
    <>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.0, y: 1.0}}
        colors={colors}
        style={[
          styles.container,
          {shadowColor: appColors.shadowColor, borderradius: 6},
        ]}>
        <LinearGradient
          start={{x: 0.0, y: 0.0}}
          end={{x: 0.0, y: 1.0}}
          colors={linearColorStyle}
          style={[
            styles.menuItemContent,
            {shadowColor: appColors.shadowColor},
          ]}>
          <JsSpaceContainer
            title={t('transData.totalAmount')}
            price={`${formatCurrency(data?.totalPrice, currency, curreLocale)}`}
          />

          <JsSpaceContainer
            title={t("transData.GST")}
            price={`${formatCurrency(data?.gstPrice, currency, curreLocale)}`}
          />
          <JsSpaceContainer
            title={t("transData.SHIPPING")}
            price={data?.isShippingFree ? 'FREE': `${formatCurrency(data?.shippingCharge, currency, curreLocale)}`}
            color={data?.isShippingFree && appColors.green}
          />
          <JsSpaceContainer
            title={t("transData.ROUND_OFF")}
            price={`${formatCurrency((Math.abs(data?.roundOff)) ?? "0", currency, curreLocale)}`}
            
          />
         
        </LinearGradient>
      </LinearGradient>
    </>
  );
};

export default SubtotalContainer;
