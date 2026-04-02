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



const ConfirmOrderSummaryListItemContainer = ({ data, value, show, showPlus, marginTop, onSendData = () => { }, onRemoveCart = () => { }, loadingProductId }) => {


  const {
    linearColorStyle,
    textColorStyle,
    isDark,
    textRTLStyle,
    viewRTLStyle,
    t, 
    curreLocale,
    currency
  } = useValues();


  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32']
    : [appColors.screenBg, appColors.screenBg];


  const renderItem = ({ item }) => {
    const isLoading = loadingProductId === item.fkProductID;
    return <TouchableOpacity
      key={item.fkProductID}
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

                {item?.ProductImagePath?.endsWith('.svg') ? (
                  <FixedSvgFromUrl
                    width={windowWidth(76)}
                    height={windowWidth(45)}
                    uri={`${IMAGE_CONFIG.BASE_URL}/${item?.ProductImagePath}`}
                  />

                ) : (
                  <Image
                    source={
                      item?.ProductImagePath && item?.ProductImagePath !== 'noimage.jpg'
                        ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item?.ProductImagePath}` }
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
                  {item?.ProductTitle}
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
                    {item?.SKU}
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
                    {item?.PackUnit}
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
                  {`${item.Qty}`}
                </Text>

              </View>
              <View style={[external.fd_coloumn, external.ai_end]}>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.price, { color: textColorStyle }]}>
                    {`${formatCurrency(item?.SellingPrice ?? "0", currency, curreLocale)}`}
                  </Text>
                  <Text style={[styles.underlinePrice]}>
                    {`${formatCurrency(item?.OurPrice ?? "0", currency, curreLocale)}`}
                  </Text>
                </View>
                <Text style={[styles.discountPercentage]}>
                  {`${t('transData.SAVE').toUpperCase()}: ${item?.DiscountPercent}%`}
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
                  {`${formatCurrency(item?.SellingPrice ?? "0", currency, curreLocale)}`}
                </Text>
              </View>
              <View style={[external.fd_coloumn, external.ai_center]}>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle }]}>
                    {`${t("transData.GST")} (${item?.GSTRate}%)`}
                  </Text>
                </View>
                <Text style={[styles.price, { color: textColorStyle }]}>
                  {`${formatCurrency(item?.IGSTAmount ?? "0", currency, curreLocale)}`}
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
                  {`${formatCurrency((item?.SellingPrice + item?.IGSTAmount) ?? "0", currency, curreLocale)}`}
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

export default ConfirmOrderSummaryListItemContainer;
