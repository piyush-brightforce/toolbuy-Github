import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, Platform, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState, } from 'react';
import { commonStyles } from '../../../../style/commonStyle.css';
import { external } from '../../../../style/external.css';
import appColors from '../../../../themes/appColors';
import SolidLine from '../../../../commonComponents/solidLine';
import styles from './style.css';
import { fontSizes, SCREEN_WIDTH, windowHeight, } from '../../../../themes/appConstant';
import { useValues } from '../../../../../App';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import API_URL from '../../../../config/apiConfig';
import LoaderScreen from '../../../loaderScreen';
import IMAGE_CONFIG from '../../../../config/imageConfig';
import appFonts from '../../../../themes/appFonts';

import FixedSvgFromUrl from '../../../../commonComponents/customSvgImage/customSvgImage';
import { formatCurrency } from '../../../../style/rtlStyle';
import { OrderResponse } from '../../../../models/orderhistory/orderhistorymodel';
import Toast from 'react-native-toast-message';
import ConfirmOrderSummaryListItemContainer from '../../../profileScreen/confirmOrder/ConfirmOrderSummaryItem';
import ProductHeaderContainer from '../../../productScreen/productHeaderContainer';
import { DownloadIcon } from '../../../../assets/googleIcons/Download';
import { PdfIconG } from '../../../../assets/googleIcons/PdfIcon';

import RNFS from 'react-native-fs';
import { InvoiceResponse } from '../../../../models/InvoiceModel/invoicelistmodel';
import { getValue, PREFERENCE_KEY } from '../../../../utils/helper/localStorage';

const OrderHistoryDetailsScreen = ({ route }) => {

  const { orderId, orderNumber, intOrderID } = route?.params || {};
  const navigation = useNavigation();
  const [pageLoading, setPageLoading] = useState(true);

  const [selectedOrderSummaryExpanded, setSelectedOrderSummaryExpanded] = useState(false);

  const [cartList, setCartList] = useState([]);
  const [orderHistoryDetails, setOrderHistoryDetails] = useState();
  const [invoiceList, setInvoiceList] = useState([]);


  const {
    textColorStyle,
    linearColorStyle,
    bgFullStyle,
    textRTLStyle,
    viewRTLStyle,
    isDark,
    linearColorStyleTwo,
    currency,
    t,
    curreLocale
  } = useValues();


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



  const encodeOrderId = (orderId) => {
    return Buffer.from(orderId.toString()).toString('base64');
  };


  useEffect(() => {
    const initialize = async () => { 
      if (orderId) {
        const encodedOrderid = encodeOrderId(orderId); 
        await fetchOrdeDetails(encodedOrderid);
      }
    };

    initialize();
  }, [orderId]);


  const downloadInvoice = async (orderId) => {
    const url = `https://api.toolbuy.com/order/printinvoice/${orderId}`;

    let path =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/Invoice_${orderId}.pdf`
        : `${RNFS.DocumentDirectoryPath}/Invoice_${orderId}.pdf`;

    try {
      // 🔐 Android permission (for API < 33)
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
      }

      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: path,
        headers: {
          Accept: '*/*',
          // Authorization: `Bearer ${token}`, // if needed
        },
      }).promise;

      if (result.statusCode === 200) { 
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: "Downloaded successfully."
        });


      } else {
        console.error('❌ Failed:', result);
      }
    } catch (error) {
      console.error('❌ Error:', error);
    }
  };

  const fetchOrdeDetails = async (orderID) => {
    try {
 
      const response = await axios.post(API_URL.GETORDERDETAILS, {
        OrderID: orderID,
        Flag: ''
      }); 
      const orderModelData = new OrderResponse(response.data);
      const result = orderModelData?.result;

      setOrderHistoryDetails(result?.orderMaster);
      setCartList(result?.orderDetails);
      await fetchInvoiceList();
      setPageLoading(false);

    } catch (error) {
      setPageLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchInvoiceList = async () => {
    try {


      const token = await getValue(PREFERENCE_KEY.USERTOKEN);
      const response = await axios.post(API_URL.GETINVOICELIST, {
        Token: token,
        ByDate: " ",
        Status: " ",
        OrderNumber: 0,
        Email: " "
      }); 
      const invoiceModelData = new InvoiceResponse(response.data);
      if (invoiceModelData.success) {
        const result = invoiceModelData?.result;

        const filteredList = result.filter(
          item => item?.OrderId === intOrderID
        ); 
        setInvoiceList(filteredList);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };


  const renderRow = (label, value, isGreen = false, isbold) => (
    <View style={styles.row} key={label}>
      <Text style={[commonStyles.subtitleText, { color: textColorStyle, fontFamily: isbold ? appFonts.bold : appFonts.regular }]}>{label}</Text>
      <Text style={[commonStyles.subtitleText, { color: isGreen ? 'green' : textColorStyle, fontFamily: isbold ? appFonts.bold : appFonts.regular }]}>
        {value}
      </Text>
    </View>
  );

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
        {`${orderHistoryDetails?.BFirstName || orderHistoryDetails?.SFirstName} | ${orderHistoryDetails?.BMobile || orderHistoryDetails?.SMobile}`}
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
        {orderHistoryDetails?.BStreet1 || orderHistoryDetails?.SStreet1}{orderHistoryDetails?.BStreet2 || orderHistoryDetails?.SStreet2}, {orderHistoryDetails?.BCity || orderHistoryDetails?.SCity}, {orderHistoryDetails?.BState || orderHistoryDetails?.SState}, {orderHistoryDetails?.BZipCode || orderHistoryDetails?.SZipCode},{orderHistoryDetails?.BCountryName || orderHistoryDetails?.SCountryName}
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
      <TouchableOpacity style={[commonStyles.commonContainer, external.m_5, { backgroundColor: 'white' }, external.mt_10]}  >
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
              : require('../../../../assets/images/homeScreenOne/placeholder.jpeg')}
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
      {pageLoading && (
        <Modal transparent visible={pageLoading}>
          <LoaderScreen />
        </Modal>
      )}
      <ProductHeaderContainer title={"Order Details"} type={'title'} righticon={false} onPress={() => navigation.goBack()} />


      <View
        style={[
          commonStyles.commonContainer,
          { backgroundColor: appColors.bgLayout },
        ]}>
        <ScrollView

          style={[{ backgroundColor: appColors.bgLayout }]}
          showsVerticalScrollIndicator={false}>
          {orderNumber && <View style={[
            external.ml_10,
            external.mt_10
          ]}>
            <Text style={[commonStyles.subtitleText, { color: textColorStyle, fontFamily: appFonts.bold }]}>{`Order # ${orderNumber}`} </Text>

          </View>}
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.container}>
            <View style={[external.fd_row, external.ai_center, external.mv_10, , external.js_space, { paddingHorizontal: windowHeight(5) }, external.ai_flex_start]}>

              <View style={[external.fd_coloumn, external.ai_flex_start, external.fx_1, external.ml_5]}>
                <Text style={[styles.price, { color: textColorStyle }]}>
                  Order Number
                </Text><View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.mediumTitle, { color: appColors.primary },
                  external.mt_3]}>
                    {orderNumber}
                  </Text>
                </View>

              </View>
              <View style={[external.fd_coloumn, external.ai_flex_start, external, external.fx_1, external.ml_5]}>
                <Text style={[styles.price, { color: textColorStyle }]}>
                  Payment Status
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>

                  <Text style={[styles.mediumTitle, { color: textColorStyle },
                  external.mt_3,]}>
                    {orderHistoryDetails?.PaymentMethodName}
                  </Text>
                </View>
                {orderHistoryDetails?.PaymentStatus === 1 ?
                  <View
                    style={[
                      external.fd_row,
                      external.ai_center,
                      external.mt_5,
                      external.pv_5,
                      external.ph_8,
                      { backgroundColor: appColors.paidButtonBackgroundColor, borderRadius: 15, borderWidth: 0.2, borderColor: appColors.green }
                    ]}>

                    <Text style={[styles.mediumTitle, { color: appColors.green }]}>
                      {"Paid"}
                    </Text>
                  </View> : <View
                    style={[
                      { borderWidth: 0.2, borderColor: appColors.red, backgroundColor: appColors.unPaidButtonBackgroundColor, borderRadius: 18, },
                      external.fd_row,
                      external.ai_center,
                      external.mt_5,
                      external.pv_5,
                      external.ph_8,
                    ]}>

                    <Text style={[styles.mediumTitle, { color: appColors.red }]}>
                      {"Unpaid"}
                    </Text>
                  </View>
                }


              </View>

              <View style={[external.fd_coloumn, external.ai_flex_start, external.fx_1, external.ml_5]}>
                <Text style={[styles.price, { color: textColorStyle }]}>
                  Order Status
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.mediumTitle, { color: orderHistoryDetails?.Status === "Delivered" ? appColors.green : appColors.red },
                  external.mt_3]}>
                    ● {orderHistoryDetails?.Status}
                  </Text>
                </View>

              </View>
            </View>

          </LinearGradient>

         {(invoiceList && invoiceList?.length > 0) &&  <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.container}>
            <View style={[external.fd_row, external.ai_center, external.mv_10, , external.js_space, { paddingHorizontal: windowHeight(5) }, external.ai_flex_start]}>

              <View style={[external.fd_coloumn, external.ai_flex_start, external.fx_1, external.ml_5]}>
                <Text style={[styles.price, { color: textColorStyle }]}>
                  Invoices
                </Text>

                {invoiceList.map((item, index) => {

                  return (
                    <TouchableOpacity key={item.OrderId} onPress={async () => await downloadInvoice(item.OrderId)}>
                      <View
                        style={[
                          external.mt_5,
                          external.fd_row,
                          external.ai_center
                        ]}>
                        <View style={[external.fd_row, external.p_5, external.ph_5, { borderRadius: windowHeight(15), borderWidth: 1, borderColor: appColors.primary }]}>
                          <View style={[external.pl_5, external.pr_5]}>
                            <PdfIconG color={appColors.primary} />
                          </View>
                          <Text style={[styles.mediumTitle, { color: appColors.primary },
                          external.mt_3]}>
                            {item.OrderNumber}
                          </Text>
                          <View style={[external.pl_20, external.pr_5]}>
                            <DownloadIcon color={appColors.primary} />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}


              </View>



            </View>

          </LinearGradient>}

          {/* <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.container}>
            <View style={[external.fd_row, external.ai_center, external.mv_10, , external.js_space, { paddingHorizontal: windowHeight(5) }, external.ai_flex_start]}>

              <View style={[external.fd_coloumn, external.ai_flex_start, external.fx_1, external.ml_5]}>
                <Text style={[styles.price, { color: textColorStyle }]}>
                  Ship Carrier
                </Text><View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>
                  <Text style={[styles.mediumTitle,
                  external.mt_3]}>
                    DTDC
                  </Text>
                </View>

              </View>
              <View style={[external.fd_coloumn, external.ai_flex_start, external, external.fx_1, external.ml_5]}>
                <Text style={[styles.price, { color: textColorStyle }]}>
                  AWB No
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center
                  ]}>

                  <Text style={[styles.mediumTitle, { color: textColorStyle },
                  external.mt_3,]}>
                    7D1218191688
                  </Text>
                </View>



              </View>
              <View style={[external.fd_coloumn, external.ai_end, external.fx_1]}>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    external.pr_10
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle, fontSize: windowHeight(20) }]}>
                    {">"}
                  </Text>
                </View>

              </View>


            </View>

          </LinearGradient> */}


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
              {renderRow(t("transData.SHIPPING"),orderHistoryDetails?.TotalShippment ? `${formatCurrency((orderHistoryDetails?.TotalShippment) ?? "0", currency, curreLocale)}` : "FREE",!orderHistoryDetails?.TotalShippment && true) }
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
                      <Text style={{ color: 'white', fontSize: 12 }}>3</Text>
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

            {(cartList && cartList?.length < 4) && <ConfirmOrderSummaryListItemContainer data={cartList} />}

          </LinearGradient>

        </ScrollView>

      </View>


    </View>
  );
};

export default OrderHistoryDetailsScreen;
