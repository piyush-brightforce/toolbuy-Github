import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform, 
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from './styles.css';
import LinearGradient from 'react-native-linear-gradient';
import { external } from '../../../../style/external.css';
import { windowHeight } from '../../../../themes/appConstant';
import { useValues } from '../../../../../App';
import appColors from '../../../../themes/appColors';
import { formatCurrency } from '../../../../style/rtlStyle';
import { useNavigation } from '@react-navigation/native';
import { InvoiceResponse } from '../../../../models/InvoiceModel/invoicelistmodel';
import { getValue, PREFERENCE_KEY } from '../../../../utils/helper/localStorage';
import API_URL from '../../../../config/apiConfig';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import { PdfIconG } from '../../../../assets/googleIcons/PdfIcon';



const OrderHistoryItemContainer = ({ data }) => {

  const {
    linearColorStyle,
    textColorStyle,
    isDark,
    textRTLStyle,
    viewRTLStyle,
    t,
    linearColorStyleTwo,
    currSymbol, curreLocale,
    currPrice,
    currency
  } = useValues();
  const navigation = useNavigation();


  const [invoiceList, setInvoiceList] = useState([]);

  useEffect(() => {
    const initialize = async () => { 
      if (data) {
        await fetchInvoiceList(data?.item?.OrderId);
      }
    };

    initialize();
  }, [data]);

  const fetchInvoiceList = async (orderId) => {
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
          item => item?.OrderId === orderId
        );

         setInvoiceList(filteredList);
      }

     } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

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

    const formatted = ` ${getMonthName(input)} ${date.getDate()}${getOrdinal(date.getDate())}, ${date.getFullYear()}`;

    return `${formatted}`;
  }
  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32']
    : [appColors.screenBg, appColors.screenBg];


  return (<TouchableOpacity
    onPress={() => navigation.navigate('OrderHistoryDetailsScreen', {
      orderId: data?.item?.OrderId,
      orderNumber: data?.item?.OrderNumber,
      intOrderID: data?.item?.OrderId
    })}
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
        <View style={[external.fd_coloumn, { flex: 1, }, external.ai_flex_start, external.mh_2]}>

          <View style={[styles.priceContainer, external.js_space, { paddingHorizontal: windowHeight(5) }, external.ai_flex_start]}>

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
                  {data?.item?.OrderNumber}
                </Text>
              </View>

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
                <Text style={[styles.mediumTitle, { color: appColors.red },
                external.mt_3]}>
                  ● {data?.item?.Status}
                </Text>
              </View>

            </View>
            <View style={[external.fd_coloumn, external.ai_flex_start, external.fx_1, external.ml_5]}>
              <Text style={[styles.price, { color: textColorStyle }]}>
                Order Date
              </Text>
              <View
                style={[
                  external.fd_row,
                  external.ai_center
                ]}>
                <Text style={[styles.mediumTitle, { color: textColorStyle },
                external.mt_3]}>
                  {`${formatDateWithOrdinal(data?.item?.OrderDate)}`}
                </Text>
              </View>

            </View>
            <View style={[external.fd_coloumn, external.ai_flex_start, external.fx_1,external.ml_5]}>
              <Text style={[styles.price, { color: textColorStyle }]}>
                Order Total
              </Text>
              <View
                style={[
                  external.fd_row,
                  external.ai_center
                ]}>
                <Text style={[styles.mediumTitle, { color: textColorStyle },
                external.mt_3]}>
                  {formatCurrency(data?.item?.NetPrice ?? "0", currency, curreLocale)}
                </Text>
              </View>

            </View>
          </View>

          <View style={[styles.priceContainer, external.js_space, { paddingHorizontal: windowHeight(5) }, external.ai_flex_start]}>

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
                  {data?.item?.PaymentMethodName}
                </Text>
              </View>
              {data?.item?.PaymentStatus === 1 ?
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
              <Text style={[styles.price, { color: textColorStyle },]}>
                Invoices
              </Text>
              <View
                style={[
                  external.fd_coloumn,
                  external.ai_center
                ]}>
                {invoiceList.map((item, index) => {

                  return (
                    <TouchableOpacity key={item?.OrderId} onPress={async () => await downloadInvoice(item.OrderId)}>
                      <View
                        style={[
                          external.mt_5,
                          external.fd_row,
                          external.ai_center
                        ]}>
                        <View style={[external.fd_row,external.ai_center,external.js_center]}>
                          <View style={[external.pr_5]}>
                            <PdfIconG color={appColors.primary} height={20} width={20} />
                          </View>
                          <Text style={[styles.mediumTitle, { color: appColors.primary }]}>
                            {data?.item?.OrderNumber}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

            </View>
            <View style={[external.fd_coloumn, external.ai_flex_start, external.fx_1, external.ml_5]}>

              <Text style={[styles.price, { color: textColorStyle }]}>
                Ship To
              </Text>
              <View
                style={[
                  external.fd_row,
                  external.ai_center
                ]}>
                <Text style={[styles.mediumTitle, { color: textColorStyle },
                external.mt_3,]}>
                  {data?.item?.SCity}
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
        </View>


      </LinearGradient>
    </LinearGradient>
  </TouchableOpacity>);


};

export default OrderHistoryItemContainer;
