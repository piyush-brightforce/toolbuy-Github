import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';

import { RemoveG, AddG } from '../../../../utils/icon';
import styles from './styles.css';
import LinearGradient from 'react-native-linear-gradient';
import { external } from '../../../../style/external.css';
import appFonts from '../../../../themes/appFonts';
import { fontSizes, windowHeight } from '../../../../themes/appConstant';
import { useValues } from '../../../../../App';
import appColors from '../../../../themes/appColors';
import IMAGE_CONFIG from '../../../../config/imageConfig';
import { ActivityIndicator } from 'react-native-paper';
import { formatCurrency } from '../../../../style/rtlStyle';
import SolidLine from '../../../../commonComponents/solidLine';



const AccountItemContainer = ({ userData, addressData, oncallDefaultAddress = () => { } }) => {


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

  const addressShipping = addressData?.find(item => item.isShipping === true);


  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32']
    : [appColors.screenBg, appColors.screenBg];


  return (<TouchableOpacity
    activeOpacity={0.9}>
    <View>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={colors}
        style={[
          styles.container,
          { shadowColor: appColors.shadowColor },
          { flexDirection: viewRTLStyle },
        ]}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyle}
          style={[
            styles.menuItemContent,
            { shadowColor: appColors.shadowColor },
          ]}>
          <View style={[external.fd_coloumn, { flex: 1, },]}>

            <View style={[styles.priceContainer, { paddingHorizontal: windowHeight(8) }]}>

              <View style={[external.fd_row, external.js_space, external.pv_5]}>
                <Text style={[styles.price, { color: textColorStyle },
                external.fx_1]}>
                  Full Name
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_flex_start,
                    external.fx_1
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle },
                  external.mt_3]}>
                    {userData?.FullName}

                  </Text>
                </View>

              </View>
              <SolidLine />
              <View style={[external.fd_row, external.js_space, external.pv_5]}>
                <Text style={[styles.price, { color: textColorStyle },
                external.fx_1]}>
                  Email Address
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    external.fx_1
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle },
                  external.mt_3]}>
                    {userData?.email}
                  </Text>
                </View>

              </View>
              <SolidLine />
              <View style={[external.fd_row, external.js_space, external.pv_5]}>
                <Text style={[styles.price, { color: textColorStyle },
                external.fx_1]}>
                  Bussiness Name
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    external.fx_1
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle },
                  external.mt_3]}>
                    {userData?.BussinessName}
                  </Text>
                </View>

              </View>

            </View>


          </View>


        </LinearGradient>
      </LinearGradient>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={colors}
        style={[
          styles.container,
          { shadowColor: appColors.shadowColor },
          { flexDirection: viewRTLStyle },
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


            <View style={[styles.priceContainer, external.js_space, { paddingHorizontal: windowHeight(8) }, external.ai_flex_start]}>

              <View style={[external.fd_row, external.js_space, external.ai_center]}>
                <Text style={[styles.price, { color: textColorStyle }, external.fx_1]}>
                  Password
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center, external.fx_1,
                    external.js_space
                  ]}>

                  <Text style={[styles.mediumTitle, { color: textColorStyle, fontSize: fontSizes.FONT7 },
                  external.mt_3,]}>
                    ★ ★ ★ ★ ★ ★ ★
                  </Text>

                </View>


              </View>

            </View>

          </View>


        </LinearGradient>
      </LinearGradient>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={colors}
        style={[
          styles.container,
          { shadowColor: appColors.shadowColor },
          { flexDirection: viewRTLStyle },
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

            <View style={[styles.priceContainer, external.js_space, { paddingHorizontal: windowHeight(8) }, external.ai_flex_start]}>


              <View style={[external.fd_row, external.js_space, external.ai_center]}>
                <Text style={[styles.price, { color: textColorStyle }, external.fx_1]}>
                  Default Shipping Address
                </Text>
                <TouchableOpacity style={external.fx_1} onPress={() => oncallDefaultAddress("tapDefaultAddress")}>
                  <View
                    style={[
                      external.fd_row,
                      external.ai_center, external.fx_1, external.js_space
                    ]}>

                    {addressShipping && <Text style={[styles.mediumTitle, { color: textColorStyle },
                    external.mt_3, external.fx_1]}>
                      {addressShipping?.address1}{addressShipping?.address2}, {addressShipping?.city}, {addressShipping?.state}, {addressShipping?.zipcode}

                    </Text>}
                    <Text style={[styles.mediumTitle, { color: textColorStyle, fontSize: windowHeight(20) }, external.ml_10]}>
                      {">"}
                    </Text>
                  </View>


                </TouchableOpacity>
              </View>



            </View>
          </View>


        </LinearGradient>
      </LinearGradient>
    </View>
  </TouchableOpacity>);


};

export default AccountItemContainer;
