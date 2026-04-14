import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import styles from './styles.css';
import LinearGradient from 'react-native-linear-gradient';
import { external } from '../../../../style/external.css';
import { windowHeight } from '../../../../themes/appConstant';
import { useValues } from '../../../../../App';
import appColors from '../../../../themes/appColors';
import H3HeadingCategory from '../../../../commonComponents/headingCategory/H3HeadingCategory';
import IMAGE_CONFIG from '../../../../config/imageConfig';
import { formatCurrency } from '../../../../style/rtlStyle';



const OrderSummaryListItemContainer = ({ data, value, show, showPlus, marginTop, onSendData = () => { }, onRemoveCart = () => { }, loadingProductId }) => {


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
                    uri={`${IMAGE_CONFIG.BASE_URL}/${item?.productImagePath}`}
                  />

                ) : (
                  <Image
                    source={
                      item?.productImagePath && item?.productImagePath !== 'noimage.jpg'
                        ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item?.productImagePath}` }
                        : require('../../../../assets/images/homeScreenOne/placeholder.jpeg')
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

              <View style={[external.fd_coloumn, external.ai_center]}>
                <Text style={[styles.mediumTitle, { color: textColorStyle }]}>
                  Qty
                </Text>

                <Text style={[styles.mediumTitle, { color: textColorStyle }]}>
                  {`${item.qty}`}
                </Text>

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

export default OrderSummaryListItemContainer;
