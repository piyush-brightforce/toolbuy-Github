import { View, Text, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Image, Animated } from 'react-native';
import { external } from '../../style/external.css';
import { commonStyles } from '../../style/commonStyle.css';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CheckOutIcon } from '../../utils/icon';
import styles from './style.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import InmyBegContainer from '../../components/InmyBegContainer';
import SubtotalContainer from '../../commonComponents/subTotal';
import BottomContainer from '../../commonComponents/bottomContainer';
import { fontSizes, windowHeight } from '../../themes/appConstant';
import VoucherCard from '../../components/voucherCord';
import { useValues } from '../../../App';
import axios from 'axios';
import API_URL from '../../config/apiConfig';
import { getValue, PREFERENCE_KEY, setValue } from '../../utils/helper/localStorage';
import { ShoppingCartResponse } from '../../models/cart/cartmodel';
import ProductHeaderContainer from '../productScreen/productHeaderContainer';
import LoaderScreen from '../loaderScreen';
import CartListItemContainer from './cartItem';
import appFonts from '../../themes/appFonts';
import LoginResponseModel from '../../models/login/loginresponsemodel';
import appColors from '../../themes/appColors';
import { CartIconG } from '../../utils/icon';
import NavigationButton from '../../commonComponents/navigationButton';
import CartResponse from '../../models/cart/cartresponse';
import { ArrowDown } from '../../assets/googleIcons/arrowDown';
import { ArrowUp } from '../../assets/googleIcons/ArrowUp';
import { formatCurrency } from '../../style/rtlStyle';

const AddtocartOne = ({ route }) => {

  const { isFrom } = route?.params || {};
  const navigation = useNavigation();

  const { bgFullStyle, t, currSymbol, currPrice, textColorStyle, customerUserID, settotalCartItem,currency,curreLocale } = useValues();

  const [cartListResponse, setcartListResponse] = useState([]);
  const [cartMasterResponse, setcartMasterResponse] = useState();
  const [pageLoading, setPageLoading] = useState(true); 
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const [userResponse, setUserResponse] = useState(null);

  const openSheet = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  useEffect(() => { 
    getUserResponse();
    fetchCartList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUserResponse();
      fetchCartList();// reload API or state
    }, [])
  );


  const fetchCartList = async () => {

    try {

      // ✅ wait for async value
      const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
      const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);

      const customerUserID = Number(id);
 

      const response = await axios.post(API_URL.GETSHOPPINGCART, {
        CustomerID: customerUserID,
        CartSessionID: (!customerUserID || customerUserID === 0) ? cartid ?? "" : "",
      }); 
      const cartListModelData = new ShoppingCartResponse(response.data);
      if (cartListModelData.success) {
        const result = response.data.Result.ShoppingCartList.length ?? 0;
        settotalCartItem(cartListModelData.shoppingCartMaster.totalItems ?? 0);
      
        setcartListResponse(cartListModelData?.shoppingCartList);
        setcartMasterResponse(cartListModelData?.shoppingCartMaster);
        setPageLoading(false);
        setLoadingProductId(null);
      } else {
        setPageLoading(false);
        setLoadingProductId(null);
      }

    } catch (error) {
      setPageLoading(false);
      setLoadingProductId(null);
      console.error("Error fetching data:", error);
    } finally {
      setPageLoading(false);
      setLoadingProductId(null);
    }
  };

  const getUserResponse = async () => {
    try {
      const jsonValue = await getValue(PREFERENCE_KEY.USERRESPONSE);
      if (jsonValue != null) {
        const parsedData = JSON.parse(jsonValue);
        const setresponse = new LoginResponseModel(parsedData);

        setUserResponse(setresponse);

      }
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };


  const updateQuantity = async (productId, flag) => {

    
    try { 
      setLoadingProductId(productId);
      // ✅ wait for async value
      const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);

      const customerUserID = Number(id);
      const cartId = await getValue(PREFERENCE_KEY.CARTSESSIONID);
 
      if (!customerUserID || customerUserID === 0) {
        const response = await axios.post(API_URL.UPDATESHOPPINGCART, {
          ProductID: productId,
          CustomerID: 0,
          CartSessionID: cartId || "",
          Qty: 1,
          Couponcode: '',
          ShippingCharge: 0,
          Zipcode: '',
          Flag: flag,
          VariationID: 0
        }); 

        const result = new CartResponse(response.data);


        if (result.success) {
          
          if (!cartId || cartId == "") {
            await setValue(
              PREFERENCE_KEY.CARTSESSIONID,
              result?.result.shoppingCartSummary[0].cartSessionID
            );
          }

          await fetchCartList();
        } else {
          setPageLoading(false);
        setLoadingProductId(null);
        }
      } else {
        const response = await axios.post(API_URL.UPDATESHOPPINGCART, {
          ProductID: productId,
          CustomerID: customerUserID,
          CartSessionID: "",
          Qty: 1,
          Couponcode: '',
          ShippingCharge: 0,
          Zipcode: '',
          Flag: flag,
          VariationID: 0
        }); 
        const result = response.data;
        if (result.Success) { 
          await fetchCartList();
        } else {
          setPageLoading(false);
         setLoadingProductId(null);
        }
      }

    } catch (error) {
      setPageLoading(false);
      setLoadingProductId(null);
      console.error("Error fetching data1:", error);
    }
  };

  const daleteCartItem = async (shoppingCartId) => {

    try {
 

      setPageLoading(true);
      // ✅ wait for async value
      const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);

      const customerUserID = Number(id);
 

      const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);
      const response = await axios.post(API_URL.DELETESHOPINGCART, {
        ShoppingCartID: shoppingCartId,
        CustomerID: customerUserID,
        CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '',
      }); 
      const result = response.data;
      if (result.Success) { 
        await fetchCartList();
      } else {
        setPageLoading(false);
        setLoadingProductId(null);
      }
    } catch (error) {
      setPageLoading(false);
      setLoadingProductId(null);
      console.error("Error fetching data1:", error);
    }
  };


  const handleQuantityChange = (data) => { 
    updateQuantity(data.productId, data.action);
  };


  const handleRemoveCart = (data) => { 
    daleteCartItem(data)
  };


  const renderRow = (label, value, isGreen = false) => (
    <View style={styles.row} key={label}>
      <Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>{label}</Text>
      <Text style={[commonStyles.subtitleText, { color: isGreen ? 'green' : textColorStyle }]}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>

      {pageLoading && <Modal transparent visible={true}>
        <LoaderScreen />
      </Modal>}
      {(!pageLoading && cartListResponse && cartListResponse.length > 0) && <View
        style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle, flex: 1 }]}>
        {!isFrom ? <ProductHeaderContainer righticon={false} type="search" title={t('transData.myBeg')} /> : <ProductHeaderContainer righticon={false} type="search" title={t('transData.myBeg')} onPress={() => navigation.goBack('')} />}


        <View style={[external.mt_10, { flex: 1 }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: windowHeight(70) }}>
            {/*            
        <LocationContainer
          borderColor={appColors.bgLayer}
          backgroundColor={appColors.bgLayout}
          locationBg={'rgba(77, 102, 255, 0.10)'}
          borderRadius={windowHeight(6)}
          value={<Text style={styles.changeText}>{change}</Text>}
          navigation={navigation}
        /> */}
            {cartListResponse.length > 0 && <InmyBegContainer productlength={cartListResponse.length} />}
            <CartListItemContainer loadingProductId={loadingProductId} data={cartListResponse} onSendData={handleQuantityChange} onRemoveCart={handleRemoveCart} />

            {/* <VoucherCard /> */}
            <SubtotalContainer data={cartMasterResponse} />
          </ScrollView>
        </View>
        <View style={styles.bottomContainerView}>
          <BottomContainer
            leftValue={
              <View>
                <TouchableOpacity onPress={() => openSheet()}>
                  <View style={[external.fd_row, external.js_center, external.ai_center]}>
                    <Text style={[styles.textContainer1, { paddingLeft: 10 }]}>Amount Payable</Text>
                    <View style={[external.pt_5]}>
                      <ArrowDown />
                    </View>
                  </View>
                </TouchableOpacity>

                <Text style={[styles.textContainer, { color: textColorStyle, paddingLeft: 10 }]}> 
                  {`${formatCurrency(cartMasterResponse?.totalOrder  ?? "0", currency, curreLocale)}`}

                </Text>
              </View>
            }
            value={
              <TouchableOpacity style={styles.checkoutBtn} onPress={() => {
                setVisible(false);
                userResponse ? navigation.navigate('AddressScreen', { cartList: cartListResponse, cartResponse: cartMasterResponse }) : navigation.navigate('Login');
              }}> 
                <Text style={[styles.checkOut]}>{t('transData.CHECKOUT')}</Text>
              </TouchableOpacity>
            }
          />

        </View>
      </View>}

      {(!pageLoading && cartListResponse.length === 0) && <View
        style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle, flex: 1 }]}>
        {!isFrom ? <ProductHeaderContainer righticon={false} type="search" title={t('transData.myBeg')} /> : <ProductHeaderContainer righticon={false} type="search" title={t('transData.myBeg')} onPress={() => navigation.goBack('')} />}

        <View style={[external.mt_10, { flex: 1 }, external.js_center, external.ai_center]}>
          <View><CartIconG color={appColors.primary} width={60} height={60} /></View>
          <Text style={[commonStyles.titleText19, external.Pb_10, external.pt_5]}>{t('transData.EMPTY_CART')}</Text>
          <Text style={[commonStyles.subtitleText, external.Pb_10, { color: appColors.textColorBlack }]}>You have not added any product to your cart yet.</Text>

          <View style={{ width: '60%' }}>
            <NavigationButton
              title={t('transData.CONTINUE_SHOPPING')}
              backgroundColor={appColors.primary}
              color={appColors.textColorWhite}
              onPress={() => navigation.replace('DrawerScreen')}
            />
          </View>
        </View>

      </View>}

      {visible && <Modal transparent visible={visible} animationType="none">
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={{ padding: 20 }}>
            <View style={styles.header}>
              <Text style={[styles.textContainer, { fontSize: fontSizes.FONT17, fontFamily: appFonts.bold }]}>Order Summary</Text>
              <TouchableOpacity onPress={closeSheet}>
                <Text style={[styles.textContainer, { fontSize: fontSizes.FONT20 }]}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Rows */}
            {renderRow("Total Amount", `${formatCurrency((cartMasterResponse?.totalPrice) ?? "0", currency, curreLocale)}`)}
            
            {renderRow(t("transData.GST"), `${formatCurrency((cartMasterResponse?.gstPrice) ?? "0", currency, curreLocale)}`)}
            {renderRow(t("transData.SHIPPING"), !cartMasterResponse?.isShippingFree ? `${formatCurrency((cartMasterResponse?.shippingCharge) ?? "0", currency, curreLocale)}` :"FREE", cartMasterResponse?.isShippingFree && true)}
            {renderRow(t("transData.ROUND_OFF"),`${formatCurrency((Math.abs(cartMasterResponse?.roundOff)) ?? "0", currency, curreLocale)}`)}

          </View>
          {/* Footer */}

          <BottomContainer
            leftValue={
              <View>
                <TouchableOpacity onPress={closeSheet}>
                  <View style={[external.fd_row, external.js_center, external.ai_center]}>
                    <Text style={[styles.textContainer1, { paddingLeft: 10 }]}>Amount Payable</Text>
                    <View style={[external.pt_5]}>
                      <ArrowUp />
                    </View>
                  </View>
                </TouchableOpacity>

                <Text style={[styles.textContainer, { color: textColorStyle, paddingLeft: 10 }]}> 
                   {`${formatCurrency(((cartMasterResponse?.totalOrder ?? 0)) ?? "0", currency, curreLocale)}`}

                </Text>
              </View>
            }
            value={
              <TouchableOpacity style={styles.checkoutBtn} onPress={() => {
                setVisible(false);
                userResponse ? navigation.navigate('AddressScreen', { cartList: cartListResponse, cartResponse: cartMasterResponse }) : navigation.navigate('Login');
              }}> 
                <Text style={[styles.checkOut]}>{t('transData.CHECKOUT')}</Text>
              </TouchableOpacity>
            }
          />
        </Animated.View>
      </Modal>}

    </View>
  );

};

export default AddtocartOne;
