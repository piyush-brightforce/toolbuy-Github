import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import React, { useEffect, useState, } from 'react';
import { commonStyles } from '../../../style/commonStyle.css';
import { external } from '../../../style/external.css';
import appColors from '../../../themes/appColors';
import SolidLine from '../../../commonComponents/solidLine';
import styles from './style.css';
import { fontSizes, SCREEN_WIDTH, windowHeight, } from '../../../themes/appConstant';
import { useValues } from '../../../../App';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import API_URL from '../../../config/apiConfig'; 
import IMAGE_CONFIG from '../../../config/imageConfig';
import AddressHeaderContainer from '../addressheaderContainer/addressheaderContainer';
import appFonts from '../../../themes/appFonts';

import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage';
import { formatCurrency } from '../../../style/rtlStyle';
import { OrderResponse } from '../../../models/orderhistory/orderhistorymodel';
import ConfirmOrderSummaryListItemContainer from './ConfirmOrderSummaryItem';
import NavigationButton from '../../../commonComponents/navigationButton';

const ConfirmOrderScreen = ({ route }) => {

  const { orderId } = route.params || {};
  const navigation = useNavigation(); 

  const [selectedOrderSummaryExpanded, setSelectedOrderSummaryExpanded] = useState(false);

  const [cartList, setCartList] = useState([]);
  const [orderHistoryDetails, setOrderHistoryDetails] = useState();



  const {
    textColorStyle,
    linearColorStyle,
    bgFullStyle,
    textRTLStyle,
    viewRTLStyle,
    isDark,
    linearColorStyleTwo,
    currency,
    curreLocale,
    t,
    isLoaderLoading,
    setIsLoaderLoading,
  } = useValues();


  const encodeOrderId = (orderId) => {
    return Buffer.from(orderId.toString()).toString('base64');
  };


  useEffect(() => {
    setIsLoaderLoading(true);
    const initialize = async () => {
      if (orderId) {
        // Call API directly
        const encodedID = encodeOrderId(orderId);
        await fetchOrdeDetails(encodedID);

      }else{
          setIsLoaderLoading(false);
      }
    };

    initialize();
  }, [orderId]);


  function getDayName(input) {
    const date = new Date(input);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  }

  function getMonthName(input) {
    const date = new Date(input);
    return date.toLocaleDateString(curreLocale, { month: "long" });
  }

  function formatDateWithOrdinal(input) {
    const date = new Date(input);

    const getOrdinal = (d) => {
      if (d > 3 && d < 21) return "th";
      return ["th", "st", "nd", "rd"][Math.min(d % 10, 4)] || "th";
    };

    const formatted = `${getDayName(input)}, ${getMonthName(input)} ${date.getDate()}${getOrdinal(date.getDate())} ${date.getFullYear()}`;

    return `${formatted}`;
  }

  const handleSetSelectedSummaryExpanded = () => {
    setSelectedOrderSummaryExpanded(true);
  };


  const renderRow = (label, value, isGreen = false, isbold) => (
    <View style={styles.row} key={label}>
      <Text style={[commonStyles.subtitleText, { color: textColorStyle, fontFamily: isbold ? appFonts.bold : appFonts.regular }]}>{label}</Text>
      <Text style={[commonStyles.subtitleText, { color: isGreen ? 'green' : textColorStyle, fontFamily: isbold ? appFonts.bold : appFonts.regular }]}>
        {value}
      </Text>
    </View>
  );


  const fetchOrdeDetails = async (orderID) => {
    try {
 

      const response = await axios.post(API_URL.GETORDERDETAILS, {
        OrderID: orderID,
        Flag: ''
      }); 
      const orderModelData = new OrderResponse(response.data);
      const result = orderModelData?.result;

      setOrderHistoryDetails(result?.orderMaster);
      setCartList(result?.orderDetails)
      setIsLoaderLoading(false);

    } catch (error) {
      setIsLoaderLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoaderLoading(false);
    }
  };


  const DeliveryAdressItem = () => (
    <View
      colors={linearColorStyle}>
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {`${orderHistoryDetails?.SFirstName} | ${orderHistoryDetails?.SMobile}`}
      </Text>
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {`Toolbuy Ecom PVT Ltd`}
      </Text>
      {orderHistoryDetails?.gstin && <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {`GST Number: `}
        <Text
          style={[
            styles.addressItem,
            { color: textColorStyle },
            { textAlign: textRTLStyle, fontFamily: appFonts.bold },
          ]}>
          {orderHistoryDetails?.gstin}
        </Text>
      </Text>}
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {orderHistoryDetails?.SStreet1}{orderHistoryDetails?.SStreet2}, {orderHistoryDetails?.SCity}, {orderHistoryDetails?.SState}, {orderHistoryDetails?.SZipCode},{orderHistoryDetails?.CountryName}
      </Text>
      <Text
        style={[
          commonStyles.subtitleText,
          { color: appColors.green, fontSize: fontSizes.FONT14, fontFamily: appFonts.bold },
          { textAlign: textRTLStyle },
          external.mt_8
        ]}>
        {`● Estimated Arrival Date: `}
        <Text
          style={[
            commonStyles.subtitleText,
            { color: appColors.green, fontSize: fontSizes.FONT14 },
            { textAlign: textRTLStyle },
          ]}>
          {` ${formatDateWithOrdinal(orderHistoryDetails?.ExpectShipDate)} `}
        </Text>
      </Text>

    </View>

  );

  const BillingAdressItem = () => (
    <View
      colors={linearColorStyle}>
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {`${orderHistoryDetails?.BFirstName} | ${orderHistoryDetails?.BMobile}`}
      </Text>
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {`Toolbuy Ecom PVT Ltd`}
      </Text>
      {orderHistoryDetails?.gstin && <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {`GST Number: `}
        <Text
          style={[
            styles.addressItem,
            { color: textColorStyle },
            { textAlign: textRTLStyle, fontFamily: appFonts.bold },
          ]}>
          {orderHistoryDetails?.gstin}
        </Text>
      </Text>}
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {orderHistoryDetails?.BStreet1}{orderHistoryDetails?.BStreet2}, {orderHistoryDetails?.BCity}, {orderHistoryDetails?.BState}, {orderHistoryDetails?.BZipCode},{orderHistoryDetails?.BCountryName}
      </Text>
      <Text
        style={[
          commonStyles.subtitleText,
          { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT14 },
          { textAlign: textRTLStyle },
          external.mt_8
        ]}>
        ● Payment Method:
        <Text
          style={[
            commonStyles.subtitleText,
            { color: textColorStyle, fontSize: fontSizes.FONT14 },
            { textAlign: textRTLStyle },
          ]}>
          {` ${orderHistoryDetails?.PaymentMethodName} `}
        </Text>
      </Text>

    </View>
  );


  const orderSummaryItem = ({ item }) => (
    <View>
      <TouchableOpacity style={[commonStyles.commonContainer, external.m_5, { backgroundColor: appColors.textColorWhite }, external.mt_10]}  >
        <View style={styles.summaryOrderContainer}>
          {item.ProductImagePath?.endsWith('.svg') ? (
            <FixedSvgFromUrl
              width={SCREEN_WIDTH / 5}
              height={SCREEN_WIDTH * 5}
              resizeMode={'contain'}
              uri={`${IMAGE_CONFIG.BASE_URL}/${item.ProductImagePath}`}
            />

          ) : <Image
            source={item.ProductImagePath && item.ProductImagePath !== 'noimage.jpg'
              ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item.ProductImagePath}` }
              : require('../../../assets/images/homeScreenOne/placeholder.jpeg')}
            style={styles.summarysidebarImage}
          />}
          <View style={styles.summaryiconLayer}></View>
        </View>

      </TouchableOpacity>
    </View>
  );


  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: appColors.bgLayout }]}>
       
      <AddressHeaderContainer title='' type='title' righticon={false} />
      <View
        style={[
          commonStyles.commonContainer,
          { backgroundColor: appColors.bgLayout },
        ]}>
        <ScrollView

          style={[{ backgroundColor: appColors.bgLayout }]}
          showsVerticalScrollIndicator={false}>

          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.container}>
            <View style={[styles.viewContainer]}>
              <View style={[external.fg_1, external.ai_center]}>
                <View style={external.pr_5}>
                  <Image
                    source={require('../../../assets/images/address/checkmark-green.png')}
                    style={{ height: 20, width: 20 }}
                    resizeMode='contain'
                  />
                </View>
                <Text
                  style={[
                    commonStyles.titleText19,
                    { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT22 },
                    { textAlign: 'center' },
                    external.pt_10
                  ]}>
                  Thank you for your order!
                </Text>
                <Text
                  style={[
                    commonStyles.titleText19,
                    { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT19 },
                    { textAlign: 'center' },
                    external.pt_10
                  ]}>
                  {`Order Confirmation # ${orderNumber}`}
                </Text>



                <Text
                  style={[
                    commonStyles.subtitleText,
                    { color: textColorStyle, fontSize: fontSizes.FONT14 },
                    { textAlign: 'center' },
                    external.pt_10
                  ]}>
                  {`A confirmation email has been sent to `}
                  <Text
                    style={[
                      commonStyles.subtitleText,
                      { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT14 },
                    ]}>
                    {`${orderHistoryDetails?.SEmail}.`}
                    <Text
                      style={[
                        commonStyles.subtitleText,
                        { color: textColorStyle, fontSize: fontSizes.FONT14 },
                      ]}>
                      {` We will send you another email with Order tracking information when your order has left our warehouse.`}
                    </Text>
                  </Text>
                </Text>


              </View>

              <View style={[external.mt_10, external.mh_40]}>
                <NavigationButton title={"Go to Home"} backgroundColor={appColors.primary} color={appColors.textColorWhite} onPress={() => navigation.replace('DrawerScreen')} />
              </View>


            </View>

          </LinearGradient>


          { /* delivery and billing adrress list */}
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.container}>
            <View style={[styles.viewContainer, { flexDirection: viewRTLStyle }]}>
              <View style={[external.fg_1]}>

                <Text
                  style={[
                    commonStyles.titleText19,
                    { color: textColorStyle },
                    { textAlign: textRTLStyle }, external.mv_5
                  ]}>
                  Delivery Address
                </Text>
                <DeliveryAdressItem />
              </View>


            </View>
            <SolidLine />

            <View style={[styles.viewContainer, { flexDirection: viewRTLStyle }]}>
              <View style={[external.fg_1]}>


                <Text
                  style={[
                    commonStyles.titleText19,
                    { color: textColorStyle },
                    { textAlign: textRTLStyle }, external.mv_5
                  ]}>
                  Billing Address
                </Text>
                <BillingAdressItem />
              </View>


            </View>

            <SolidLine />
            <View style={{ padding: 20 }}>
              <View style={styles.header}>
                <Text style={[styles.textContainer, { fontSize: fontSizes.FONT17, fontFamily: appFonts.bold }]}>Billing Details</Text>
              </View>

              {/* Rows */}
              {renderRow("Total Amount", `${formatCurrency((orderHistoryDetails?.TotalAmount) ?? "0", currency, curreLocale)}`)}
              {renderRow(t("transData.GST"), `${formatCurrency((orderHistoryDetails?.TotalGSTAmount) ?? "0", currency, curreLocale)}`)}
              {renderRow(t("transData.SHIPPING"), orderHistoryDetails?.TotalShippment ? `${formatCurrency((orderHistoryDetails?.TotalShippment) ?? "0", currency, curreLocale)}` :"FREE",!orderHistoryDetails?.TotalShippment && true)}
              {renderRow(t("transData.ROUND_OFF"), `${formatCurrency((Math.abs(orderHistoryDetails?.RoundOff)) ?? "0", currency, curreLocale)}`)}
              {renderRow("Amount Payable", `${formatCurrency((orderHistoryDetails?.TotalOrder) ?? "0", currency, curreLocale)}`, false, true)}

            </View>
          </LinearGradient>



          {/* order summury */}
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.container}>
            <View style={[styles.viewContainer, { flexDirection: viewRTLStyle }]}>
              <View style={[external.fg_1]}>
                <View style={[external.fd_row, external.ai_center, external.Pb_5]}>
                  <View style={external.pr_5}>
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: appColors.primary,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Text style={{ color: appColors.textColorWhite, fontSize: 12 }}>3</Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      commonStyles.titleText19,
                      { color: textColorStyle },
                      { textAlign: textRTLStyle },
                    ]}>
                    Order Summary
                  </Text>
                </View>

                <SolidLine />

                <View style={[external.fd_row, external.fx_1, external.ai_center]}>
                  <View style={external.fx_1}>
                    <FlatList
                      data={cartList}
                      renderItem={orderSummaryItem}
                      horizontal
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      scrollEnabled={false}
                    />
                  </View>
                  {(cartList && cartList?.length > 3) && <TouchableOpacity
                    onPress={handleSetSelectedSummaryExpanded}
                  >
                    <View style={[styles.summaryOrderContainer, { backgroundColor: appColors.primary }, external.ai_center, external.js_center]}>
                      <Text style={[commonStyles.titleText18, { color: appColors.textColorWhite }]}>
                        {`+ ${cartList?.length - 3}`}
                      </Text>

                    </View>

                  </TouchableOpacity>
                  }

                </View>


              </View>
            </View>
            {(cartList && cartList?.length > 3 && selectedOrderSummaryExpanded) && <ConfirmOrderSummaryListItemContainer data={cartList} />}

          </LinearGradient>

        </ScrollView>

      </View>


    </View>
  );
};

export default ConfirmOrderScreen;
