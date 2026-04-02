import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from './styles.css';
import LinearGradient from 'react-native-linear-gradient';
import { external } from '../../../../style/external.css';
import { fontSizes, windowHeight } from '../../../../themes/appConstant';
import { useValues } from '../../../../../App';
import appColors from '../../../../themes/appColors';
import appFonts from '../../../../themes/appFonts';
import { LocalShippingG } from '../../../../assets/googleIcons/LocalShipping';
import { AccountBalanceG } from '../../../../assets/googleIcons/AccountBalance';
import ThreeDotDropDown from '../threeDotDropDown/dropdownState';



const AddressItemContainer = ({ addressData, onSendAddressTag = () => { }, onSendDefaultTag = () => { } }) => {


  const {
    linearColorStyle,
    textColorStyle,
    isDark,
    imageContainer,
    textRTLStyle,
    viewRTLStyle,
    t,
    linearColorStyleTwo,
    currSymbol, curreLocale,
    currPrice,
    currency
  } = useValues();
  const isShipping = addressData?.item?.isShipping;
  const isBilling = addressData?.item?.isPrimary;

  const handleOntapDrodpdown = (tag, item) => {
    const payload = {
      tag: tag,
      item: item,
    };
    setTapDropDownValue(tag);
    onSendAddressTag(payload);
  };


  const handleTapDefault = (tag, item) => {
    const payload = {
      tag: tag,
      item: item,
    };
    onSendDefaultTag(payload);
  };


  const [drodDownValue, setTapDropDownValue] = useState();

  const taglist = ["Edit", "Remove"];


  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32']
    : [appColors.screenBg, appColors.screenBg];


  return (<TouchableOpacity
    activeOpacity={0.9}>

    <LinearGradient
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      colors={colors}
      style={[
        styles.container,
        { shadowColor: appColors.shadowColor },
        { flexDirection: viewRTLStyle },
        external.mb_10
      ]}>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={linearColorStyle}
        style={[
          styles.menuItemContent,
          { shadowColor: appColors.shadowColor },
        ]}>
        <View style={[external.fd_coloumn, { flex: 1, }]}>


          <View style={[external.fd_row, { paddingHorizontal: windowHeight(10) }]}>

            <View style={[styles.priceContainer, external.ai_flex_start, external.fx_1]}>
              <Text style={[styles.mediumTitle, { color: textColorStyle, fontFamily: appFonts.bold },
              external.mt_3,]}>
                {addressData?.item?.firstName}
                <Text style={[styles.mediumTitle, { color: textColorStyle },
                external.mt_3,]}>
                  {` | ${addressData?.item?.mobile}`}

                </Text>
              </Text>

              <View
                style={[
                  external.fd_row,
                  external.ai_center, external.fx_1
                ]}>

                <Text style={[styles.mediumTitle, { color: textColorStyle },
                external.mt_3,]}>
                  {addressData?.item?.address1}{addressData?.item?.address2}, {addressData?.item?.city},

                </Text>
              </View>
              <View
                style={[
                  external.fd_row,
                  external.ai_center, external.fx_1
                ]}>

                <Text style={[styles.mediumTitle, { color: textColorStyle },
                external.mt_3,]}>
                  {addressData?.item?.state}, {addressData?.item?.zipcode}

                </Text>
              </View>

            </View>

            <ThreeDotDropDown
              options={taglist}
              selected={drodDownValue}
              onSelect={(val) => { 
                handleOntapDrodpdown(val, addressData);
              }} />
          </View>
          <View
            style={[{
              width: [external.width_100],
              height: 1,
              backgroundColor: appColors.bgLayout,
            }, external.mt_10]}
          />
          <View style={[external.fd_row, external.js_space, external.ai_center]}>

            <TouchableOpacity style={external.fx_1} onPress={() =>  isShipping === false && handleTapDefault("Shipping", addressData)}>
              <View
                style={[
                  external.fx_1,
                  external.ai_center,
                  external.fd_row,
                  external.js_center,
                  { borderRightWidth: 1, borderRightColor: appColors.bgLayout, }
                ]}>

                <LocalShippingG />

                <Text style={[styles.mediumTitle, { color: isShipping === false ? appColors.primary : textColorStyle },
                external.mv_10, external.mh_5]}>
                  {isShipping === true
                    ? "Default Delivery"
                    : "Set as Default Delivery"}

                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={external.fx_1} onPress={() => isBilling === false && handleTapDefault("Billing", addressData)}>
              <View
                style={[
                  external.fx_1,
                  external.ai_center,
                  external.fd_row,
                  external.js_center,
                ]}>

                <AccountBalanceG />

                <Text style={[styles.mediumTitle, { color: isBilling === false ? appColors.primary : textColorStyle },
                external.mv_10, external.mh_5]}>

                  {isBilling === true
                    ? "Default Billing"
                    : "Set as Default Billing"}
                </Text>
              </View>
            </TouchableOpacity>


          </View>
        </View>



      </LinearGradient>
    </LinearGradient>
  </TouchableOpacity>);


};

export default AddressItemContainer;
