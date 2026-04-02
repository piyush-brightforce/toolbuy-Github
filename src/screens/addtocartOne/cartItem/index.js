import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Favorite, RemoveG, AddG } from '../../../utils/icon';
import styles from './styles.css';
import LinearGradient from 'react-native-linear-gradient';
import { MinusIcon, Plus, PlusRadial } from '../../../utils/icon';
import { external } from '../../../style/external.css';
import { commonStyles } from '../../../style/commonStyle.css';
import appFonts from '../../../themes/appFonts';
import { windowHeight } from '../../../themes/appConstant';
import { useValues } from '../../../../App';
import appColors from '../../../themes/appColors';
import { useNavigation } from '@react-navigation/native';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import IMAGE_CONFIG from '../../../config/imageConfig';
import NavigationButton from '../../../commonComponents/navigationButton';
import { ActivityIndicator } from 'react-native-paper';
import { formatCurrency } from '../../../style/rtlStyle';



const CartListItemContainer = ({ data, value, show, showPlus, marginTop, onSendData = () => { } ,onRemoveCart = () => { },loadingProductId}) => {


  const {
    linearColorStyle,
    textColorStyle,
    isDark,
    imageContainer,
    textRTLStyle,
    viewRTLStyle,
    t,
    linearColorStyleTwo,
    currSymbol,curreLocale,
    currPrice,
    currency
  } = useValues();


  const sendQuantityData = ({pid,status}) => {
    const payload = {
      productId: pid, 
      action: status,
    };
 

    onSendData(payload);
  };

  const sendRemoveCartData = (shoppingCartId) => { 
    onRemoveCart(shoppingCartId);
  };


  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32']
    : [appColors.screenBg, appColors.screenBg];
  

  const renderItem = ({ item }) => {
     const isLoading = loadingProductId === item.productID;
    return <TouchableOpacity
      key={item.id}
      // onPress={() => navigation.navigate('ProductDetailOne')}
      activeOpacity={0.9}>
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
            <View style={[external.fd_row, external.ai_center, { paddingHorizontal: windowHeight(10), }]}>

              <View
                style={[styles.imageContainer]}>

                {item?.productImagePath?.endsWith('.svg') ? (
                  <FixedSvgFromUrl
                    width={windowWidth(76)}
                    height={windowWidth(45)}
                    uri={`${IMAGE_CONFIG.BASE_URL}/${item?.productImagePath}`}
                  />

                ) : (
                  <Image
                    source={
                      item?.productImagePath && item?.productImagePath !== 'noimage.jpg'
                        ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item?.productImagePath}` }
                        : require('../../../assets/images/homeScreenOne/placeholder.jpeg')
                    }


                    style={styles.image}
                  />
                )}
              </View>
              <View style={styles.textContainer}>

                <Text
                  style={[
                    styles.title,

                    { color: textColorStyle },
                    { textAlign: textRTLStyle },

                  ]}>
                  {item?.productTitle}
                </Text>
                <View
                  style={[styles.ratingContainer, { flexDirection: viewRTLStyle }]}>
                  <Text
                    style={[
                      styles.headerTitle,
                      { color: textColorStyle },
                      { textAlign: textRTLStyle },
                    ]}>
                    {`SKU : `}
                  </Text>
                  <Text
                    style={[
                      styles.mediumTitle,
                      { color: textColorStyle },
                      { textAlign: textRTLStyle },
                    ]}>
                    {item?.sku}
                  </Text>

                </View>
                <View
                  style={[styles.ratingContainer, { flexDirection: viewRTLStyle }]}>
                  <Text
                    style={[
                      styles.headerTitle,
                      { color: textColorStyle },
                      { textAlign: textRTLStyle },
                    ]}>
                    {`Items in pack : `}
                  </Text>
                  <Text
                    style={[
                      styles.mediumTitle,
                      { color: textColorStyle },
                      { textAlign: textRTLStyle },
                    ]}>
                    {item?.packUnit}
                  </Text>

                </View>

              </View>
            </View>
            <View style={[styles.percentageContainer,]}>

             <View style={[external.fd_row,external.ai_center]}>
              

              {isLoading ? 
              <View style={styles.quantityContainer}>
                <TouchableOpacity
 
                  activeOpacity={0.7}
                  style={[styles.quantityButton]}
                > 
                <View style={{height:15,width:15}}></View>
                </TouchableOpacity>
                <View style={styles.quantityValueContainer}>
                  <ActivityIndicator color={appColors.textColorBlack}/>
                </View>
                <TouchableOpacity
 
                  activeOpacity={0.7}
                  style={styles.quantityButton}
                > 
                <View style={{height:15,width:15}}></View>
                </TouchableOpacity>
              </View>:  <View style={styles.quantityContainer}>
                <TouchableOpacity

                  onPress={() => {
                   sendQuantityData({pid:item?.productID, status:''});
                  }}
                  activeOpacity={0.7}
                  style={[styles.quantityButton]}
                >
                  <RemoveG color={textColorStyle} height={15} width={15} />
                </TouchableOpacity>
                <View style={styles.quantityValueContainer}>
                  <Text style={[styles.quantityValue,{color:textColorStyle}]}>
                    {item?.qty}
                  </Text>
                </View>
                <TouchableOpacity

                  onPress={() => {
                    sendQuantityData({pid:item?.productID, status:'insert'});
                  }}
                  activeOpacity={0.7}
                  style={styles.quantityButton}
                >
                  <AddG color={textColorStyle} height={15} width={15} />
                </TouchableOpacity>
              </View>}

                  

              <TouchableOpacity 
                  onPress={() => {
                    sendRemoveCartData(item?.shoppingCartID);
                  }}>
                <Text style={[styles.quantityValue,{color:textColorStyle,fontFamily:appFonts.regular}]}>
                    Remove
              </Text>
              </TouchableOpacity>
             </View>
              <View style={[external.fd_coloumn, external.ai_end]}>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.price, { color: textColorStyle }]}> 
                    {`${formatCurrency(item?.sellingPrice ?? "0", currency, curreLocale)}`}
                  </Text>
                  <Text style={[styles.underlinePrice]}>
                    {`${formatCurrency(item?.listPrice ?? "0", currency, curreLocale)}`} 
                  </Text>
                </View>
                <Text style={[styles.discountPercentage]}>
                  {`${t('transData.SAVE').toUpperCase()}: ${item?.discountPercent}%`}
                </Text>
              </View>
            </View>
            <View style={[styles.priceContainer, external.js_space, { paddingHorizontal: windowHeight(5) }]}>

              <View style={[external.fd_coloumn, external.ai_start]}>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle }]}>
                    {t('transData.PRICE')}
                  </Text>
                </View>
                <Text style={[styles.price, { color: textColorStyle }]}>
                  {`${formatCurrency(item?.sellingPrice ?? "0", currency, curreLocale)}`}
                </Text>
              </View>
              <View style={[external.fd_coloumn, external.ai_center]}>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle }]}>
                    {`${t("transData.GST")} (${item?.gstRate}%)`}
                  </Text>
                </View>
                <Text style={[styles.price, { color: textColorStyle }]}> 
                  {`${formatCurrency(item?.gstPrice ?? "0", currency, curreLocale)}`}
                </Text>
              </View>
              <View style={[external.fd_coloumn, external.ai_end]}>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle }]}>
                     {t('transData.TOTAL')}
                  </Text>
                </View>
                <Text style={[styles.price, { color: textColorStyle }]}> 
                  {`${formatCurrency((item?.sellingPrice + item?.gstPrice) ?? "0", currency, curreLocale)}`}
                </Text>
              </View>
            </View>
          </View>


        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>;
  };

  return (
    <View style={styles.newArrivalContainer}>
      <View style={{ marginTop: marginTop || windowHeight(14) }}>
        {show && (
          <H3HeadingCategory value={value} seeall={t('transData.seeAll')} />
        )}
      </View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default CartListItemContainer;
