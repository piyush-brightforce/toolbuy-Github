import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, TouchableWithoutFeedback, Animated, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  addnewAddress,
  editAddress,
} from '../../../constant';
import { commonStyles } from '../../../style/commonStyle.css';
import { external } from '../../../style/external.css';
import appColors from '../../../themes/appColors';
import { Cross } from '../../../utils/icon';
import SolidLine from '../../../commonComponents/solidLine';
import styles from './style.css';
import { fontSizes, SCREEN_HEIGHT, SCREEN_WIDTH, windowHeight } from '../../../themes/appConstant';
import CheckBox from '../../../commonComponents/checkBox';
import CommonModal from '../../../commonComponents/commonModel';
import NavigationButton from '../../../commonComponents/navigationButton';
import { useValues } from '../../../../App';
import LinearGradient from 'react-native-linear-gradient';
import TextInputs from '../../../commonComponents/textInputs';
import { useNavigation } from '@react-navigation/native';
import { getValue, PREFERENCE_KEY } from '../../../utils/helper/localStorage';
import axios from 'axios';
import API_URL from '../../../config/apiConfig';
import { AddressResponse } from '../../../models/addressmodel/addressmodel';
import LoginResponseModel from '../../../models/login/loginresponsemodel';

import IMAGE_CONFIG from '../../../config/imageConfig';
import AddressHeaderContainer from '../addressheaderContainer/addressheaderContainer';
import RadioButton from '../../../commonComponents/radioButton';
import appFonts from '../../../themes/appFonts';
import { indianStatesData } from '../../../data/addressData';
import DropdownSectionState from '../dropdownState/dropdownState';
import { Keyboard } from 'react-native';

import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';
import BottomContainer from '../../../commonComponents/bottomContainer';
import { ArrowDown } from '../../../assets/googleIcons/arrowDown';
import { ArrowUp } from '../../../assets/googleIcons/ArrowUp';
import { formatCurrency } from '../../../style/rtlStyle';
import OrderSummaryListItemContainer from './OrderSummaryItem';
import { PincodeApiResponse, PincodeResponse } from '../../../models/countryCodemodel/countryCodeResponse';
import api_service from '../../../utils/api_service/api_service';


const AddressScreen = ({ route }) => {
  const navigation = useNavigation();
  const [userResponse, setUserResponse] = useState(null);
  const [addressListResponse, setaddressListResponse] = useState([]);
  const [selectedDeliveryAsB, setselectedDeliveryAsB] = useState(true);
  const [selectedBuyingCompany, setSelectedBuyingCompany] = useState(false);


  const [selectedDeliveryAsB1, setselectedDeliveryAsB1] = useState(true);
  const [selectedBuyingCompany1, setSelectedBuyingCompany1] = useState(false);


  const [selectedOrderSummaryExpanded, setSelectedOrderSummaryExpanded] = useState(false);

  // add or edit address 

  const [editModal, setEditModal] = useState(false);
  const [editItemValue, setEditItemValue] = useState({});

  const [addAddressModal, setaddAddressModal] = useState(false);


  // Shipping Address Params
  const [txtfullname, setTxtfullname] = useState('');
  const [txtPhoneNumber, setTxtPhoneNumber] = useState('');
  const [txtGstNumber, setTxtGstNumber] = useState('');
  const [txtAddressLine1, setTxtAddressLine1] = useState('');
  const [txtAddressLine2, setTxtAddressLine2] = useState('');
  const [txtLandmark, setTxtLandmark] = useState('');
  const [txtPincode, setTxtPincode] = useState('');
  const [txtCity, setTxtCity] = useState('');
  const [txtCompanyName, setTxtCompanyName] = useState('');


  const [txtfullnameError, setTxtfullnameError] = useState('');
  const [txtPhoneNumberError, setTxtPhoneNumberError] = useState('');
  const [txtAddressLine1Error, setTxtAddressLine1Error] = useState('');
  const [txtPincodeError, setTxtPincodeError] = useState('');
  const [txtCityError, setTxtCityError] = useState('');
  const [txtCompanyNameError, setTxtCompanyNameError] = useState('');
  const [dropdownStateValue, setdropdownStateValue] = useState(null);


  // Delivery Address Params
  const [txtDeliveryfullname, setTxtDeliveryfullname] = useState('');
  const [txtDeliveryPhoneNumber, setTxtDeliveryPhoneNumber] = useState('');
  const [txtDeliveryGstNumber, setTxtDeliveryGstNumber] = useState('');
  const [txtDeliveryAddressLine1, setTxtDeliveryAddressLine1] = useState('');
  const [txtDeliveryAddressLine2, setTxtDeliveryAddressLine2] = useState('');
  const [txtDeliveryLandmark, setTxtDeliveryLandmark] = useState('');
  const [txtDeliveryPincode, setTxtDeliveryPincode] = useState('');
  const [txtDeliveryCity, setTxtDeliveryCity] = useState('');
  const [txtDeliveryCompanyName, setTxtDeliveryCompanyName] = useState('');


  const [txtDeliveryfullnameError, setTxtDeliveryfullnameError] = useState('');
  const [txtDeliveryPhoneNumberError, setTxtDeliveryPhoneNumberError] = useState('');
  const [txtDeliveryAddressLine1Error, setTxtDeliveryAddressLine1Error] = useState('');
  const [txtDeliveryPincodeError, setTxtDeliveryPincodeError] = useState('');
  const [txtDeliveryCityError, setTxtDeliveryCityError] = useState('');
  const [txtDeliveryCompanyNameError, setTxtDeliveryCompanyNameError] = useState('');
  const [deliverydropdownStateValue, setDeliverydropdownStateValue] = useState(null);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [paymentMethodSelectionValue, setPaymentMethodSelectionValue] = useState(null);


  // choose address

  const [chooseAddress, setchooseAddress] = useState(false);
  const [selectedAddressTitle, setselectedAddressTitle] = useState(false);
  const [chooseAddressItem, setchooseAddressItem] = useState({});
  const slideAnim = useRef(new Animated.Value(300)).current;


  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);

  const [continueAddressResponseTag, setContinueAddressResponseTag] = useState(true);
  const [continueOrderSummaryResponseTag, setContinueOrderSummaryResponseTag] = useState(false);
  const [continuePaymentMethodResponseTag, setContinuePaymentMethodResponseTag] = useState(false);

  const { cartList, cartResponse } = route.params || {};

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
    textContainer,
    t, isLoaderLoading,
    setIsLoaderLoading,
  } = useValues();
  const lastPincodeRef = useRef('');
  const lastDelPincodeRef = useRef('');
  const paymentMethodIcons = [

    { title: 'UPI', icon: `${IMAGE_CONFIG.IMAGEURL}/images/account_balance_wallet.svg`, righticon: `${IMAGE_CONFIG.IMAGEURL}/images/upi_list_image.svg`, method: 9 },
    { title: 'Cards', icon: `${IMAGE_CONFIG.IMAGEURL}/images/qr_code.svg`, righticon: `${IMAGE_CONFIG.IMAGEURL}/images/credit_list_image.svg`, method: 6 },
    { title: 'NetBanking', icon: `${IMAGE_CONFIG.IMAGEURL}/images/creditcard.svg`, righticon: `${IMAGE_CONFIG.IMAGEURL}/images/netbanking_list_image.svg`, method: 7 },
    { title: 'Wallet', icon: `${IMAGE_CONFIG.IMAGEURL}/images/netbanking.svg`, righticon: `${IMAGE_CONFIG.IMAGEURL}/images/wallet_list_image.svg`, method: 8 },
    { title: 'NEFT / RTGS / IMPS', icon: `${IMAGE_CONFIG.IMAGEURL}/images/neft_img.svg`, righticon: `${IMAGE_CONFIG.IMAGEURL}/images/neft_list_image.svg`, method: 11 },
  ];


  const [visible, setVisible] = useState(false);

  const setSelectedDelAsBil = () => {
    setselectedDeliveryAsB(!selectedDeliveryAsB);
  };

  const handleSetSelectedBuyingCompany = () => {
    setSelectedBuyingCompany(!selectedBuyingCompany);
  };



  const setSelectedDelAsBil1 = () => {
    setselectedDeliveryAsB1(!selectedDeliveryAsB1);
  };

  const handleSetSelectedBuyingCompany1 = () => {
    setSelectedBuyingCompany1(!selectedBuyingCompany1);
  };


  const handleSetSelectedSummaryExpanded = () => {
    setSelectedOrderSummaryExpanded(true);
  };

  //  React to changes
  useEffect(() => {
    setIsLoaderLoading(true);
    const initialize = async () => {
      await getUserResponse();
      await fetchAddressList();
    };
    initialize();
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (
        txtPincode.length === 6
      ) {
        await fetchCityandStateList(txtPincode);
      }
    };
    initialize();

  }, [txtPincode]);

  useEffect(() => {
    const initialize = async () => {
      if (
        txtDeliveryPincode.length === 6  
      ) { 
        await fetchCityandStateList(txtDeliveryPincode);
      }
    };
    initialize();


  }, [txtDeliveryPincode]);



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


  const renderRow = (label, value, isGreen = false) => (
    <View style={styles.row} key={label}>
      <Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>{label}</Text>
      <Text style={[commonStyles.subtitleText, { color: isGreen ? 'green' : textColorStyle }]}>
        {value}
      </Text>
    </View>
  );


  const fetchCityandStateList = async (pincode, del = false) => {
    try {
      const response = await api_service.fetchCityandStateList(pincode);

      if (del) {
        console.log("calling response screen1:", response?.state);
        console.log("calling response screen2:", response?.district);
        if (response?.district && response?.state) {

          const index = indianStatesData.indexOf(response?.state); 
          setTxtDeliveryCity(prev => prev !== response?.district ? response?.district : prev);
          setDeliverydropdownStateValue(index);
        }

      } else {
        console.log("calling response screen3:", response?.state);
        console.log("calling response screen4:", response?.district);
        if (response?.district && response?.state) {
          const index = indianStatesData.indexOf(response?.state); 
          setTxtCity(prev => prev !== response?.district ? response?.district : prev);
          setdropdownStateValue(index);
        }

      }
    } catch (error) {
      return {}
    }
  };

  const fetchAddressList = async () => {
    try {

      // ✅ wait for async value
      const token = await getValue(PREFERENCE_KEY.USERTOKEN);


      if (!token) {
        setIsLoaderLoading(false);
        return;
      }
      const response = await axios.post(API_URL.GETADDRESSLIST, {
        Token: token
      });
      const cartListModelData = new AddressResponse(response.data);
      const result = cartListModelData.result ?? [];

      setaddressListResponse(result);
      setIsLoaderLoading(false);

    } catch (error) {
      setIsLoaderLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoaderLoading(false);
    }
  };


  const getUserResponse = async () => {
    try {
      const jsonValue = await getValue(PREFERENCE_KEY.USERRESPONSE);
      if (jsonValue != null) {
        const parsedData = JSON.parse(jsonValue);
        const setresponse = new LoginResponseModel(parsedData);
        setUserResponse(setresponse);
      } else {
      }
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
    }
  };



  const deliveryAdressItem = ({ item, index }) => (
    (item.isPrimary && item.isShipping) && <View
      colors={linearColorStyle}>
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {`${item.firstName} | Toolbuy`} {item.gstin && `| GST Number: ${item.gstin}`}
      </Text>
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {item.address1}{item.address2}, {item.city}, {item.state}, {item.zipcode},
      </Text>
      <View style={[styles.monoText, { flexDirection: viewRTLStyle }]}>
        <Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>
          Mobile
        </Text>
        <Text> : </Text>
        <Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>
          {item.mobile}
        </Text>
      </View>
      <View style={[styles.defaulText, { flexDirection: viewRTLStyle }]}>
        <TouchableOpacity onPress={() => handleAddressSelectionChange("Choose Delivery Address")}>
          <Text style={[styles.removeText, { fontSize: fontSizes.FONT17, fontFamily: appFonts.bold }]}>Choose Another Address</Text>
        </TouchableOpacity>
      </View>
    </View>

  );

  const billingAdressItem = ({ item, index }) => (
    item.isPrimary && <View
      colors={linearColorStyle}>
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {`${item.firstName} | Toolbuy`} {item.gstin && `| GST Number: ${item.gstin}`}
      </Text>
      <Text
        style={[
          styles.addressItem,
          { color: textColorStyle },
          { textAlign: textRTLStyle },
        ]}>
        {item.address1}{item.address2}, {item.city}, {item.state}, {item.zipcode},
      </Text>
      <View style={[styles.monoText, { flexDirection: viewRTLStyle }]}>
        <Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>
          Mobile
        </Text>
        <Text> : </Text>
        <Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>
          {item.mobile}
        </Text>
      </View>
      <View style={[styles.defaulText, { flexDirection: viewRTLStyle }]}>
        <TouchableOpacity onPress={() => handleAddressSelectionChange("Choose Billing Address")}>
          <Text style={[styles.removeText, { fontSize: fontSizes.FONT17, fontFamily: appFonts.semiBold }]}>Choose Another Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  const paymentMethodItem = ({ item, index }) => (
    <View style={[external.fd_coloumn, external.fx_1]}>
      <View style={[external.fd_row, external.fx_1, external.js_space, external.ai_center, { height: 40 }]}
        colors={linearColorStyle}>
        <TouchableOpacity onPress={() => {
          const addressId = addressListResponse.find(item => item.isPrimary).addressID;

          setPaymentMethodSelectionValue(index);
          if (item.method !== 11) {
            if (!addressId) {
              Toast.show({
                type: 'info',
                text1: 'Warning',
                text2: "Please choose address."
              });

            } else if (!(cartResponse?.totalOrder)) {
              Toast.show({
                type: 'info',
                text1: 'Warning',
                text2: "Total amount is blank"
              });

            } else {
              handleMakePaymentRazorPay({ addressid: addressId, amount: cartResponse?.totalOrder, method: item?.method });

            }
          }

        }}>
          <View style={[styles.monoText, { flexDirection: viewRTLStyle, }]}>
            <View style={{ marginRight: 5 }}>
              <RadioButton checked={paymentMethodSelectionValue === index} onPress={() => {
                const addressId = addressListResponse.find(item => item.isPrimary).addressID;

                setPaymentMethodSelectionValue(index);
                if (item.method !== 11) {
                  if (!addressId) {
                    Toast.show({
                      type: 'info',
                      text1: 'Warning',
                      text2: "Please choose address."
                    });

                  } else if (!(cartResponse?.totalOrder)) {
                    Toast.show({
                      type: 'info',
                      text1: 'Warning',
                      text2: "Total amount is blank"
                    });

                  } else {
                    handleMakePaymentRazorPay({ addressid: addressId, amount: cartResponse?.totalOrder, method: item?.method });

                  }
                }

              }} />
            </View>
            <Text style={[commonStyles.subtitleText, { color: textColorStyle, paddingLeft: 5, fontFamily: appFonts.bold }]}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.monoText, { alignContent: 'flex-end' }]}>
          <FixedSvgFromUrl

            height={index === 4 ? 20 : 40}
            width={index === 4 ? 20 : SCREEN_WIDTH / 3.5}
            resizeMode={'contain'}
            uri={item.righticon}
          />
        </View>


      </View>
      {index !== 5 && <SolidLine />}
    </View>
  );



  const handleSelectAddressItem = (item) => {
    setchooseAddressItem(item);
  };


  const handleAddressSelectionChange = text => {
    setselectedAddressTitle(text);
    setchooseAddress(true);
  };

  const handleUseAddressApiCall = (item, type) => {
    setchooseAddress(false);
    chooseAddressApiCall(item.addressID, type);
  };

  const chooseAddressApiCall = async (adressid, type) => {
    try {

      setIsLoaderLoading(true);
      // ✅ wait for async value
      const token = await getValue(PREFERENCE_KEY.USERTOKEN);


      if (!token) {
        setIsLoaderLoading(false);
        return;
      }
      const response = await axios.post(type === "Choose Billing Address" ? API_URL.SETPRIMARYADDRESS : API_URL.SETDELIVERYADDRESS, {
        Token: token,
        AddressID: adressid
      });
      if (response.data.Success) {
        handleSelectAddressItem({});
        await fetchAddressList();
      } else {
        handleSelectAddressItem({});
        setIsLoaderLoading(false);
      }

    } catch (error) {
      setIsLoaderLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoaderLoading(false);
    }
  };


  const chooseAdrressItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectAddressItem(item)} >
      <View style={[external.fd_row, external.fx_1, external.ai_center, external.mb_15]}>
        <View style={[external.mh_10]}>
          <RadioButton onPress={() => handleSelectAddressItem(item)} checked={chooseAddressItem === item} />
        </View>
        <View style={[external.fd_coloumn, external.fx_1]}>
          <View
            colors={linearColorStyle}>
            <Text
              style={[
                styles.addressItem,
                { color: textColorStyle },
                { textAlign: textRTLStyle },
              ]}>
              {`${item.firstName} | Toolbuy`} {item.gstin && `| GST Number: ${item.gstin}`}
            </Text>
            <Text
              style={[
                styles.addressItem,
                { color: textColorStyle },
                { textAlign: textRTLStyle },
              ]}>
              {item.address1}{item.address2}, {item.city}, {item.state}, {item.zipcode},
            </Text>
            <View style={[styles.monoText, { flexDirection: viewRTLStyle }]}>
              <Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>
                Mobile
              </Text>
              <Text> : </Text>
              <Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>
                {item.mobile}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            borderColor: appColors.primary,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginLeft: 10,
            borderRadius: 12,
            borderWidth: 1,
          }}
          onPress={() => handleEditOldAddress(item)}
        >
          <Text style={{ color: appColors.primary }}>Edit</Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );

  const orderSummaryItem = ({ item }) => (
    <View>
      <TouchableOpacity style={[commonStyles.commonContainer, external.m_5, { backgroundColor: appColors.textColorWhite }, external.mt_10]}  >
        <View style={styles.summaryOrderContainer}>
          {item.productImagePath?.endsWith('.svg') ? (
            <FixedSvgFromUrl
              width={SCREEN_WIDTH / 5}
              height={SCREEN_WIDTH * 5}
              resizeMode={'contain'}
              uri={`${IMAGE_CONFIG.BASE_URL}/${item.productImagePath}`}
            />

          ) : <Image
            source={item.productImagePath && item.productImagePath !== 'noimage.jpg'
              ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item.productImagePath}` }
              : require('../../../assets/images/homeScreenOne/placeholder.jpeg')}
            style={styles.summarysidebarImage}
          />}
          <View style={styles.summaryiconLayer}></View>
        </View>

      </TouchableOpacity>
    </View>
  );

  const validatePhoneNumber = () => {
    if (txtPhoneNumber.length !== 10) {
      setTxtPhoneNumberError('Valid 10-digit Mobile Number is required');
      return false;
    } else {
      setTxtPhoneNumberError('');
      return true;
    }
  };

  const validatePincondeNumber = () => {
    if (txtPincode.length < 6) {
      setTxtPincodeError('Valid 6-digit Pincode is required');
      return false;
    } else {
      setTxtPincodeError('');
      return true;
    }
  };


  const validateDeliveryPhoneNumber = () => {
    if (txtDeliveryPhoneNumber.length !== 10) {
      setTxtDeliveryPhoneNumberError('Valid 10-digit Mobile Number is required');
      return false;
    } else {
      setTxtDeliveryPhoneNumberError('');
      return true;
    }
  };

  const validateDeliveryPincondeNumber = () => {
    if (txtDeliveryPincode.length < 6) {
      setTxtDeliveryPincodeError('Valid 6-digit Pincode is required');
      return false;
    } else {
      setTxtDeliveryPincodeError('');
      return true;
    }
  };



  const handleAddNewAddress = async () => {
    const isValidPhone = validatePhoneNumber();
    const isValidPin = validatePincondeNumber();
    const isValidDeliveryPhone = validateDeliveryPhoneNumber();
    const isValidaDeliveryPincode = validateDeliveryPincondeNumber();
    if (selectedDeliveryAsB) {
      if (txtfullname !== "" && txtAddressLine1 !== "" && txtCity !== "" && txtPincode !== "" && txtPhoneNumber !== "" && isValidPhone && isValidPin) {
        if (!dropdownStateValue) {
          Toast.show({
            type: 'info',
            text1: 'Warning',
            text2: "Please select Shipping state",
          });
        } else {

          setaddAddressModal(false);
          await addNewAddressApiCall();
          setContinueAddressResponseTag(false);
          setContinueOrderSummaryResponseTag(true);

          clearAllTextField();
        }
      }

    } else {
      if (txtDeliveryfullname !== "" && txtDeliveryAddressLine1 !== "" && txtDeliveryCity !== "" && txtDeliveryPincode !== "" && txtDeliveryPhoneNumber !== "" && isValidDeliveryPhone && isValidaDeliveryPincode && txtfullname !== "" && txtAddressLine1 !== "" && txtCity !== "" && txtPincode !== "" && txtPhoneNumber !== "" && isValidPhone && isValidPin) {
        if (!deliverydropdownStateValue) {
          Toast.show({
            type: 'info',
            text1: 'Warning',
            text2: "Please select Shipping state",
          });
        } else if (!dropdownStateValue) {
          Toast.show({
            type: 'info',
            text1: 'Warning',
            text2: "Please select Delivery state",
          });
        } else {

          setaddAddressModal(false);
          await addNewAddressApiCall();
          setContinueAddressResponseTag(false);
          setContinueOrderSummaryResponseTag(true);
          clearAllTextField();
        }
      }

    }
  };

  const clearAllTextField = () => {
    setTxtfullname('');
    setTxtPhoneNumber('');
    setTxtAddressLine1('');
    setTxtAddressLine2('');
    setTxtCity('');
    setdropdownStateValue(null);
    setTxtPincode('');
    setTxtGstNumber('');
    setTxtLandmark('');


    setTxtDeliveryfullname('');
    setTxtDeliveryPhoneNumber('');
    setTxtDeliveryAddressLine1('');
    setTxtDeliveryAddressLine2('');
    setTxtDeliveryCity('');
    setDeliverydropdownStateValue(null);
    setTxtDeliveryPincode('');
    setTxtDeliveryGstNumber('');
    setTxtDeliveryLandmark('');
  }

  const addNewAddressApiCall = async () => {

    try {

      setIsLoaderLoading(true);
      // ✅ wait for async value
      const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
      const customerId = Number(id);


      const shippingAddressParams = {
        ShippingAddress:
        {
          AddressID: 0,
          fkCustomerID: customerId,
          BusinessName: txtCompanyName ? txtCompanyName : "",
          FirstName: txtfullname,
          Address1: txtAddressLine1,
          Address2: txtAddressLine2 ? txtAddressLine2 : "",
          City: txtCity,
          fkState: dropdownStateValue + 1,
          fkCountry: 100,
          zipcode: txtPincode,
          Mobile: txtPhoneNumber,
          IsPrimary: true,
          GSTIN: txtGstNumber ? txtGstNumber : "",
          IsShipping: true,
          IsBuyingCompany: false,
          IsDelivery: selectedDeliveryAsB1 ? selectedDeliveryAsB === false ? false : true : false,
          Landmark: txtLandmark ? txtLandmark : ""
        },
        BillingAddress:
        {
          AddressID: 0,
          fkCustomerID: selectedDeliveryAsB === false ? customerId : 0,
          BusinessName: selectedDeliveryAsB === false ? txtDeliveryCompanyName ? txtDeliveryCompanyName : '' : "",
          FirstName: selectedDeliveryAsB === false ? txtDeliveryfullname : "",
          Address1: selectedDeliveryAsB === false ? txtDeliveryAddressLine1 : "",
          Address2: selectedDeliveryAsB === false ? txtDeliveryAddressLine2 ? txtDeliveryAddressLine2 : '' : "",
          City: selectedDeliveryAsB === false ? txtDeliveryCity : "",
          fkState: selectedDeliveryAsB === false ? deliverydropdownStateValue + 1 : 0,
          fkCountry: 100,
          zipcode: selectedDeliveryAsB === false ? txtDeliveryPincode : '',
          Mobile: selectedDeliveryAsB === false ? txtDeliveryPhoneNumber : '',
          IsPrimary: false,
          GSTIN: selectedDeliveryAsB === false ? txtDeliveryGstNumber ? txtDeliveryGstNumber : "" : '',
          IsShipping: false,
          IsBuyingCompany: false,
          IsDelivery: selectedDeliveryAsB === false ? true : false,
          Landmark: selectedDeliveryAsB === false ? txtDeliveryLandmark ? txtDeliveryLandmark : "" : '',
        }
      };

      const response = await axios.post(API_URL.ADDNEWADDRESS, shippingAddressParams);

      if (response.data.Success) {
        await fetchAddressList();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.data?.Message,
        });
      } else {
        setIsLoaderLoading(false);
      }

    } catch (error) {
      setIsLoaderLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoaderLoading(false);
    }
  };



  const handleEditOldAddress = async (item) => {

    setEditModal(true);
    setEditItemValue(item);

    setTxtfullname(item?.firstName);
    setTxtAddressLine1(item?.address1);
    setTxtAddressLine2(item?.address2);
    setTxtCity(item?.city);
    setTxtPincode(item?.zipcode);
    setTxtPhoneNumber(item?.mobile);
    setTxtGstNumber(item?.gstin);
    setTxtLandmark(item?.landmark);
    setTxtCompanyName(item?.businessName);
    const index = indianStatesData.indexOf(item?.state);
    setdropdownStateValue(index);

  };

  const checkAllValidationForUpdate = async (item) => {

    const isValidPhone = validatePhoneNumber();
    const isValidPin = validatePincondeNumber();
    if (txtfullname !== "" && txtAddressLine1 !== "" && txtCity !== "" && txtPincode !== "" && txtPhoneNumber !== "" && isValidPhone && isValidPin) {
      if (!dropdownStateValue) {
        Toast.show({
          type: 'info',
          text1: 'Warning',
          text2: "Please select state"
        });

      } else {


        setEditModal(false);
        setchooseAddress(false);

        setaddAddressModal(false);
        await editAddressApiCall(item);
        clearAllTextField();
      }
    }
  }


  const editAddressApiCall = async (item) => {
    try {

      setIsLoaderLoading(true);
      // ✅ wait for async value 


      const response = await axios.post(API_URL.EDITOLDADDRESS,
        {
          AddressID: item?.addressID,
          fkCustomerID: item?.customerID,
          BusinessName: item?.businessName ?? "",
          FirstName: txtfullname,
          Address1: txtAddressLine1,
          Address2: txtAddressLine2 ?? "",
          City: txtCity,
          fkState: dropdownStateValue + 1,
          fkCountry: 100,
          zipcode: txtPincode,
          Mobile: txtPhoneNumber,
          IsPrimary: item.isPrimary,
          GSTIN: txtGstNumber ?? "",
          IsShipping: item.isShipping,
          IsBuyingCompany: item.isBuyingCompany,
          IsDelivery: item.isDelivery,
          Landmark: txtLandmark ?? ""
        }
      );
      if (response.data.Success) {
        await fetchAddressList();
        setEditItemValue({});
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.data?.Message
        });
      } else {
        setIsLoaderLoading(false);
      }

    } catch (error) {
      setIsLoaderLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoaderLoading(false);
    }
  };


  const handleMakePaymentRazorPay = async ({ addressid, amount, method }) => {
    try {


      setPlaceOrderLoading(true);
      const token = await getValue(PREFERENCE_KEY.USERTOKEN);
      console.log("amount of razorpay", amount);


      const response = await axios.post(API_URL.MAKEPAYMENTRAZORPAY,
        {
          Token: token,
          AddressID: addressid,
          Amount: amount,
          Method: method,
          CODCharge: 0,
        }
      );
      if (response.data.Success) {

        if (method === 11) {
          const currentDate = new Date().toISOString();
          saveOrderMaster({
            orderId: response.data.Result.OrderId,
            razorPayOrderID: response.data.Result.encOrderID,
            razorPayPayID: response.data.Result.razorPayOrderID,
            method: method,
            orderdate: currentDate,
            shippingAddressid: addressid,
            billingAddressid: addressid
          });
        } else {
          openRazorpay({
            razorPayOrderID: response.data.Result.razorPayOrderID,
            addressId: addressid,
            billingAddressid: addressid,
            amount: amount,
            method: method,
            orderId: response.data.Result.OrderId,
            razorPayPayID: response.data.Result.razorPayOrderID,
            paymentid: '',
            shippingAddressid: addressid
          });
        }
      } else {
        setPlaceOrderLoading(false);
        setIsLoaderLoading(false);
      }

    } catch (error) {
      setPlaceOrderLoading(false);
      setIsLoaderLoading(false);
      console.error("Error makepaymentrazorpay fetching data:", error);
    } finally {
      setPlaceOrderLoading(false);
      setIsLoaderLoading(false);
    }
  };


  const saveOrderMaster = async ({ orderId, razorPayOrderID, razorPayPayID, method, orderdate, shippingAddressid, billingAddressid }) => {
    try {


      const token = await getValue(PREFERENCE_KEY.USERTOKEN);


      const url = `${API_URL.SAVEORDERMASTER}?OrderID=${orderId}&RazorPayOrderID=${razorPayOrderID}&RazorPayPayID=${razorPayPayID}&orderdate=${orderdate}&token=${token}&mobile=false&paymode=${method}&ShippingAddressid=${shippingAddressid}&BillingAddressid=${billingAddressid}`;

      const response = await axios.post(API_URL.SAVEORDERMASTER,
        {},
        {
          params: {
            OrderID: orderId,
            RazorPayOrderID: razorPayOrderID,
            RazorPayPayID: razorPayPayID ?? '',
            orderdate: orderdate,
            token: token,
            mobile: false,
            paymode: method,
            ShippingAddressid: shippingAddressid,
            BillingAddressid: billingAddressid,
          },
        }
      );
      if (response.data.Success) {
        setPlaceOrderLoading(false);
        navigation.navigate("ConfirmOrderScreen", { orderId: response.data.Result });

      } else {
        setPlaceOrderLoading(false);
        setIsLoaderLoading(false);
      }

    } catch (error) {
      setPlaceOrderLoading(false);
      setIsLoaderLoading(false);
      console.error("Error makepaymentrazorpay fetching data:", error);
    } finally {
      setPlaceOrderLoading(false);
      setIsLoaderLoading(false);
    }
  };


  const openRazorpay = async ({ orderId, amount, method, razorPayOrderID, razorPayPayID, shippingAddressid, billingAddressid }) => {

    const primaryAddress = addressListResponse.find(item => item.isPrimary);

    const options = {
      description: 'Order Payment',
      currency: currency,
      image: 'https://cdn.razorpay.com/logos/KxatSNw3dGjnN8_medium.png',
      key: 'rzp_live_jw6LKKI6FAlmEl',
      // key_secret: "PFFSIlQLriuYTRHPriu8vTqN",
      amount: amount * 100,
      name: 'ToolBuy',
      order_id: razorPayOrderID,
      prefill: {
        email: userResponse?.email,
        contact: primaryAddress?.mobile || '',
        name: primaryAddress?.firstName || '',
      },
      theme: { color: '#F37254' }
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        const currentDate = new Date().toISOString();
        saveOrderMaster({
          orderId: orderId,
          razorPayOrderID: razorPayOrderID,
          razorPayPayID: razorPayPayID,
          method: method,
          orderdate: currentDate,
          shippingAddressid: shippingAddressid,
          billingAddressid: billingAddressid
        });

      })
      .catch((error) => {
        setPlaceOrderLoading(false);
        setIsLoaderLoading(false);
        console.error('Error:', error);
      });
  };


  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: appColors.bgLayout }]}>

      <AddressHeaderContainer title='Checkout' type='title' righticon={true} onPress={() => navigation.goBack()} />
      <View
        style={[
          commonStyles.commonContainer,
          { backgroundColor: appColors.bgLayout },
        ]}>

        {/* <HeaderContainer value={t('transData.manageDeliveryAddress')} /> */}

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={!isDropdownOpen}
          style={[{ backgroundColor: appColors.bgLayout }]}
          showsVerticalScrollIndicator={false}>


          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.container}>
            <View style={[styles.viewContainer, { flexDirection: viewRTLStyle }]}>
              <View style={[external.fg_1]}>
                <View style={[external.fd_row, external.ai_center, external.js_space, external.Pb_5]}>
                  <View style={[external.fd_row, external.ai_center]}>
                    <View style={external.pr_5}>
                      <Image
                        source={require('../../../assets/images/address/checkmark-green.png')}
                        style={{ height: 20, width: 20 }}
                        resizeMode='contain'
                      />
                    </View>
                    <Text
                      style={[
                        commonStyles.subtitleText,
                        { color: textColorStyle, fontSize: fontSizes.FONT17, fontFamily: appFonts.semiBold },
                        { textAlign: textRTLStyle },
                      ]}>
                      Customer Information
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('OrderDashBoardScreen', { selectedTab: 'Profile' });
                    <Text
                      style={[
                        commonStyles.subtitleText,
                        { color: appColors.primary, fontSize: fontSizes.FONT17, fontFamily: appFonts.regular },
                        { textAlign: textRTLStyle },
                      ]}>
                      Edit
                    </Text>
                  }}>

                  </TouchableOpacity>


                </View>
                <Text
                  style={[
                    commonStyles.subtitleText,
                    { color: textColorStyle, fontFamily: appFonts.regular },
                    { textAlign: textRTLStyle },
                  ]}>
                  Welcome {userResponse?.FullName ?? ""} {userResponse?.BusinessName && userResponse?.BusinessName}
                </Text>

              </View>
            </View>
          </LinearGradient>


          {!addressListResponse || addressListResponse.length === 0 &&
            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
              colors={linearColorStyle}
              style={styles.container}>
              <View style={[styles.viewContainer, { flexDirection: viewRTLStyle }]}>
                <View style={[external.fg_1]}>
                  <View style={[external.fd_row, external.ai_center, external.js_space, external.Pb_5]}>
                    <View style={[external.fd_row, external.ai_center]}>
                      <View style={external.pr_5}>
                        <View style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          backgroundColor: appColors.primary,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <Text style={{ color: appColors.textColorWhite, fontSize: 12 }}>2</Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          commonStyles.subtitleText,
                          { color: textColorStyle, fontSize: fontSizes.FONT17, fontFamily: appFonts.semiBold },
                          { textAlign: textRTLStyle },
                        ]}>
                        Delivery & Billing Address
                      </Text>
                    </View>

                  </View>
                  <View>
                    <View style={[styles.defaulText, { flexDirection: viewRTLStyle }, external.ai_center]}>

                      <RadioButton checked={true} />
                      <Text style={[styles.removeText, { color: textColorStyle }, external.ml_5]}>Add a new Delivery Address</Text>

                    </View>
                    <TextInputs
                      value={txtfullname}
                      title={"Fullname"}
                      placeHolder={"Fullname"}
                      onChangeText={text => {
                        setTxtfullname(text);
                        if (text.trim() === '') {
                          setTxtfullnameError('Fullname is required');
                        } else {
                          setTxtfullnameError('');
                        }
                      }}
                      isrequired={true}
                      errorMessage={txtfullnameError !== '' && true}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    {txtfullnameError !== '' && <Text style={styles.errorStyle}>{txtfullnameError}</Text>}
                    <TextInputs
                      value={txtPhoneNumber}
                      title={"10 Digit Mobile Number"}
                      placeHolder={"10 Digit Mobile Number"}
                      keyboardType={"number-pad"}
                      maxLength={10}
                      isrequired={true}
                      onChangeText={text => {
                        setTxtPhoneNumber(text);
                        if (text.trim() === '') {
                          setTxtPhoneNumberError('Phonenumber is required');
                        } else {
                          setTxtPhoneNumberError('');
                        }
                      }}
                      onBlur={() => {
                        validatePhoneNumber();
                      }}
                      errorMessage={txtPhoneNumberError !== '' && true}
                      onSubmitEditing={() => validatePhoneNumber()}
                    />
                    {txtPhoneNumberError !== '' && <Text style={styles.errorStyle}>{txtPhoneNumberError}</Text>}

                    <TextInputs
                      value={txtAddressLine1}
                      title={"Address Line 1"}
                      placeHolder={"Address Line 1"}
                      onChangeText={text => {
                        setTxtAddressLine1(text);
                        if (text.trim() === '') {
                          setTxtAddressLine1Error('Addressline1 is required');
                        } else {
                          setTxtAddressLine1Error('');
                        }
                      }}
                      isrequired={true}
                      errorMessage={txtAddressLine1Error !== '' && true}
                    />
                    {txtAddressLine1Error !== '' && <Text style={styles.errorStyle}>{txtAddressLine1Error}</Text>}


                    <TextInputs
                      value={txtAddressLine2}
                      title={"Address Line 2 (Optional)"}
                      placeHolder={"Address Line 2 (Optional)"}
                      onChangeText={text => {
                        setTxtAddressLine2(text);
                      }}
                    />
                    <TextInputs
                      value={txtLandmark}
                      title={"Landmark (Optional)"}
                      placeHolder={"Landmark (Optional)"}
                      onChangeText={text => {
                        setTxtLandmark(text);
                      }}
                    />
                    <TextInputs
                      value={txtPincode?.toString() || ''}
                      title={"Pincode"}
                      placeHolder={"Pincode"}
                      onChangeText={text => {
                        setTxtPincode(text);
                        if (text.trim() === '') {
                          setTxtPincodeError('Pincode is required');
                        } else {
                          setTxtPincodeError('');
                        }
                      }}
                      isrequired={true}
                      errorMessage={txtPincodeError !== '' && true}
                      keyboardType={'number-pad'}
                      onBlur={() => {
                        validatePincondeNumber();
                      }}
                      onSubmitEditing={() => validatePincondeNumber()}
                    />
                    {txtPincodeError !== '' && <Text style={styles.errorStyle}>{txtPincodeError}</Text>}


                    <View style={[
                      external.fd_row,
                      external.ai_center,
                      external.js_center,]}>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>
                        <TextInputs
                          value={txtCity?.toString() || ''}
                          title={"CityTown"}
                          placeHolder={"CityTown"}
                          onChangeText={text => {
                            setTxtCity(text);
                            if (text.trim() === '') {
                              setTxtCityError('City is required');
                            } else {
                              setTxtCityError('');
                            }
                          }}
                          isrequired={true}
                          errorMessage={txtCityError !== '' && true}
                          onSubmitEditing={() => Keyboard.dismiss()}
                        />
                      </View>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>
                        <DropdownSectionState
                          title={
                            dropdownStateValue !== null && dropdownStateValue !== undefined
                              ? indianStatesData[dropdownStateValue]
                              : "Select State"
                          }
                          options={indianStatesData}
                          selected={dropdownStateValue}
                          onToggle={(val) => setIsDropdownOpen(val)}
                          onSelect={setdropdownStateValue} />
                      </View>
                    </View>

                    {txtCityError !== '' && <Text style={styles.errorStyle}>{txtCityError}</Text>}
                    <View style={[styles.defaulText, { flexDirection: viewRTLStyle }]}>
                      <CheckBox
                        onPress={setSelectedDelAsBil}
                        checked={selectedDeliveryAsB}
                      />
                      <Text
                        style={[
                          styles.defaulTextView,
                          { color: textColorStyle },
                          { textAlign: textRTLStyle },
                        ]}>
                        Use my Billing Address as my Delivery Address
                      </Text>
                    </View>

                    <View style={[styles.defaulText, { flexDirection: viewRTLStyle }]}>
                      <CheckBox
                        onPress={handleSetSelectedBuyingCompany}
                        checked={selectedBuyingCompany}
                      />
                      <Text
                        style={[
                          styles.defaulTextView,
                          { color: textColorStyle },
                          { textAlign: textRTLStyle },
                        ]}>
                        I am buying for a company
                      </Text>
                    </View>

                    {selectedBuyingCompany && <View style={[
                      external.fd_row,
                      external.ai_center,
                      external.js_center,]}>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>

                        <TextInputs
                          value={txtCompanyName}
                          title={"Company or Business Name"}
                          placeHolder={"Company or Business Name"}
                          onChangeText={text => {
                            setTxtCompanyName(text);
                            if (text.trim() === '') {
                              setTxtCompanyNameError('Business Name is required');
                            } else {
                              setTxtCompanyNameError('');
                            }
                          }}
                          isrequired={true}
                          errorMessage={txtCompanyNameError !== '' && true}
                        />

                      </View>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>

                        <TextInputs
                          value={txtGstNumber}
                          title={"GST Number (Optional)"}
                          placeHolder={"GST Number (Optional)"}
                          onChangeText={text => {
                            setTxtGstNumber(text);
                          }}
                        />
                      </View>
                    </View>}
                    {txtCompanyNameError !== '' && <Text style={styles.errorStyle}>{txtCompanyNameError}</Text>}
                  </View>


                  {/* {selectedDeliveryAsB ? <View /> : <AddDeliveryAddressListWidget />} */}

                  {!selectedDeliveryAsB && <View>
                    <View style={[styles.defaulText, { flexDirection: viewRTLStyle }, external.ai_center]}>
                      <RadioButton checked={true} />
                      <Text style={[styles.removeText, { color: textColorStyle }, external.ml_5]}>Add a new Delivery Address</Text>
                    </View>

                    <TextInputs
                      value={txtDeliveryfullname}
                      title={"Fullname"}
                      placeHolder={"Fullname"}
                      onChangeText={text => {
                        setTxtDeliveryfullname(text);
                        if (text.trim() === '') {
                          setTxtDeliveryfullnameError('Fullname is required');
                        } else {
                          setTxtDeliveryfullnameError('');
                        }
                      }}
                      isrequired={true}
                      errorMessage={txtDeliveryfullnameError !== '' && true}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    {txtDeliveryfullnameError !== '' && <Text style={styles.errorStyle}>{txtDeliveryfullnameError}</Text>}
                    <TextInputs
                      value={txtDeliveryPhoneNumber}
                      title={"10 Digit Mobile Number"}
                      placeHolder={"10 Digit Mobile Number"}
                      keyboardType={"number-pad"}
                      maxLength={10}
                      isrequired={true}
                      onChangeText={text => {
                        setTxtDeliveryPhoneNumber(text);
                        if (text.trim() === '') {
                          setTxtDeliveryPhoneNumberError('Phonenumber is required');
                        } else {
                          setTxtDeliveryPhoneNumberError('');
                        }
                      }}
                      onBlur={() => {
                        validateDeliveryPhoneNumber();
                      }}
                      onSubmitEditing={() => validateDeliveryPhoneNumber()}

                      errorMessage={txtDeliveryPhoneNumberError !== '' && true}
                    />
                    {txtDeliveryPhoneNumberError !== '' && <Text style={styles.errorStyle}>{txtDeliveryPhoneNumberError}</Text>}

                    <TextInputs
                      value={txtDeliveryAddressLine1}
                      title={"Address Line 1"}
                      placeHolder={"Address Line 1"}
                      onChangeText={text => {
                        setTxtDeliveryAddressLine1(text);
                        if (text.trim() === '') {
                          setTxtDeliveryAddressLine1Error('Addressline1 is required');
                        } else {
                          setTxtDeliveryAddressLine1Error('');
                        }
                      }}
                      isrequired={true}
                      errorMessage={txtDeliveryAddressLine1Error !== '' && true}
                    />
                    {txtDeliveryAddressLine1Error !== '' && <Text style={styles.errorStyle}>{txtDeliveryAddressLine1Error}</Text>}


                    <TextInputs
                      value={txtDeliveryAddressLine2}
                      title={"Address Line 2 (Optional)"}
                      placeHolder={"Address Line 2 (Optional)"}
                      onChangeText={text => {
                        setTxtDeliveryAddressLine2(text);
                      }}
                    />
                    <TextInputs
                      value={txtDeliveryLandmark}
                      title={"Landmark (Optional)"}
                      placeHolder={"Landmark (Optional)"}
                      onChangeText={text => {
                        setTxtDeliveryLandmark(text);
                      }}
                    />
                    <TextInputs
                      value={txtDeliveryPincode?.toString() || ''}
                      title={"Pincode"}
                      placeHolder={"Pincode"}
                      onChangeText={text => {
                        setTxtDeliveryPincode(text);
                        if (text.trim() === '') {
                          setTxtDeliveryPincodeError('Pincode is required');
                        } else {
                          setTxtDeliveryPincodeError('');
                        }
                      }}
                      isrequired={true}
                      errorMessage={txtDeliveryPincodeError !== '' && true}

                      keyboardType={'number-pad'}
                      onBlur={() => {
                        validateDeliveryPincondeNumber();
                      }}
                      onSubmitEditing={() => validateDeliveryPincondeNumber()}
                    />
                    {txtDeliveryPincodeError !== '' && <Text style={styles.errorStyle}>{txtDeliveryPincodeError}</Text>}


                    <View style={[
                      external.fd_row,
                      external.ai_center,
                      external.js_center,]}>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>
                        <TextInputs
                          value={txtDeliveryCity?.toString() || ''}
                          title={"CityTown"}
                          placeHolder={"CityTown"}
                          onChangeText={text => {
                            setTxtDeliveryCity(text);
                            if (text.trim() === '') {
                              setTxtDeliveryCityError('City is required');
                            } else {
                              setTxtDeliveryCityError('');
                            }
                          }}
                          isrequired={true}
                          errorMessage={txtDeliveryCityError !== '' && true}
                          onSubmitEditing={() => Keyboard.dismiss()}
                        />
                      </View>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>
                        <DropdownSectionState
                          title={
                            deliverydropdownStateValue !== null && deliverydropdownStateValue !== undefined
                              ? indianStatesData[deliverydropdownStateValue]
                              : "Select State"
                          } options={indianStatesData}
                          selected={deliverydropdownStateValue}
                          onSelect={setDeliverydropdownStateValue} />
                      </View>
                    </View>

                    {txtDeliveryCityError !== '' && <Text style={styles.errorStyle}>{txtDeliveryCityError}</Text>}


                    <View style={[
                      external.fd_row,
                      external.ai_center,
                      external.js_center,]}>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>

                        <TextInputs
                          value={txtDeliveryCompanyName}
                          title={"Company or Business Name"}
                          placeHolder={"Company or Business Name"}
                          onChangeText={text => {
                            setTxtDeliveryCompanyName(text);
                            if (text.trim() === '') {
                              setTxtDeliveryCompanyNameError('Business Name is required');
                            } else {
                              setTxtDeliveryCompanyNameError('');
                            }
                          }}
                          isrequired={true}
                          errorMessage={txtDeliveryCompanyNameError !== '' && true}
                        />

                      </View>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>

                        <TextInputs
                          value={txtDeliveryGstNumber}
                          title={"GST Number (Optional)"}
                          placeHolder={"GST Number (Optional)"}
                          onChangeText={text => {
                            setTxtDeliveryGstNumber(text);
                          }}
                        />
                      </View>
                    </View>
                    {txtDeliveryCompanyNameError !== '' && <Text style={styles.errorStyle}>{txtDeliveryCompanyNameError}</Text>}
                  </View>}






                </View>
              </View>
            </LinearGradient>
          }



          { /* delivery and billing adrress list */}
          {addressListResponse && addressListResponse.length > 0 && <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.container}>
            <View style={[styles.viewContainer, { flexDirection: viewRTLStyle }]}>
              <View style={[external.fg_1]}>
                <View style={[external.fd_row, external.ai_center, external.js_space, external.Pb_5]}>
                  <View style={[external.fd_row, external.ai_center]}>
                    <View style={external.pr_5}>
                      <Image
                        source={require('../../../assets/images/address/checkmark-green.png')}
                        style={{ height: 20, width: 20 }}
                        resizeMode='contain'
                      />
                    </View>
                    <Text
                      style={[
                        commonStyles.subtitleText,
                        { color: textColorStyle, fontSize: fontSizes.FONT17, fontFamily: appFonts.semiBold },
                        { textAlign: textRTLStyle },
                      ]}>
                      Delivery & Billing Address
                    </Text>
                  </View>

                </View>
                <Text
                  style={[
                    commonStyles.subtitleText,
                    { color: textColorStyle, fontFamily: appFonts.bold },
                    { textAlign: textRTLStyle }, external.mv_5
                  ]}>
                  Delivery Address
                </Text>
                <FlatList data={addressListResponse} renderItem={deliveryAdressItem} />
                <SolidLine />

                <Text
                  style={[
                    commonStyles.subtitleText,
                    { color: textColorStyle, fontFamily: appFonts.bold },
                    { textAlign: textRTLStyle }, external.mv_5
                  ]}>
                  Billing Address
                </Text>
                <FlatList data={addressListResponse} renderItem={billingAdressItem} />

              </View>
            </View>
          </LinearGradient>}

          {continueAddressResponseTag && <View style={[external.pt_10, external.mh_15]}>
            <NavigationButton
              backgroundColor={appColors.primary}
              title={'Continue'}
              color={appColors.screenBg}
              onPress={() => {
                if (!addressListResponse || addressListResponse.length === 0) {
                  handleAddNewAddress();
                } else if (addressListResponse && addressListResponse.length > 0) {
                  setContinueAddressResponseTag(false);
                  setContinueOrderSummaryResponseTag(true);
                }
              }}
            />
          </View>}

          {/* order summury */}
          {continueOrderSummaryResponseTag && !continueAddressResponseTag ? <LinearGradient
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
                      commonStyles.subtitleText,
                      { color: textColorStyle, fontSize: fontSizes.FONT17, fontFamily: appFonts.semiBold },
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
                  {(cartList && cartList.length > 3) ? <TouchableOpacity
                    onPress={handleSetSelectedSummaryExpanded}
                  >
                    <View style={[styles.summaryOrderContainer, { backgroundColor: appColors.primary }, external.ai_center, external.js_center]}>
                      <Text style={[commonStyles.titleText18, { color: appColors.textColorWhite }]}>
                        {`+ ${cartList.length - 3}`}
                      </Text>

                    </View>

                  </TouchableOpacity> : <TouchableOpacity
                    onPress={() => {
                      setSelectedOrderSummaryExpanded(!selectedOrderSummaryExpanded);
                    }}
                  >
                    {selectedOrderSummaryExpanded ? <ArrowUp /> : <ArrowDown />}

                  </TouchableOpacity>
                  }

                </View>


              </View>
            </View>
            {(selectedOrderSummaryExpanded) && <OrderSummaryListItemContainer data={cartList} />}

          </LinearGradient> :
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
                        backgroundColor: appColors.textColorGray,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text style={{ color: appColors.textColorWhite, fontSize: 12 }}>3</Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        commonStyles.subtitleText,
                        { color: appColors.textColorGray, fontSize: fontSizes.FONT17, fontFamily: appFonts.semiBold },
                        { textAlign: textRTLStyle },
                      ]}>
                      Order Summary
                    </Text>
                  </View>

                </View>
              </View>
              {(selectedOrderSummaryExpanded) && <OrderSummaryListItemContainer data={cartList} />}

            </LinearGradient>}

          {continueOrderSummaryResponseTag && !continuePaymentMethodResponseTag && <View style={[external.pt_10, external.mh_15]}>
            <NavigationButton
              backgroundColor={appColors.primary}
              title={'Continue'}
              color={appColors.screenBg}
              onPress={() => {
                setContinuePaymentMethodResponseTag(true);
              }}
            />
          </View>}
          {/* Payment Methods */}
          {continuePaymentMethodResponseTag ? <LinearGradient
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
                      <Text style={{ color: appColors.textColorWhite, fontSize: 12 }}>4</Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      commonStyles.subtitleText,
                      { color: textColorStyle, fontSize: fontSizes.FONT17, fontFamily: appFonts.semiBold },
                      { textAlign: textRTLStyle },
                    ]}>
                    Payment Methods
                  </Text>
                </View>
                <FlatList data={paymentMethodIcons} renderItem={paymentMethodItem} />

                {/* NEFL/RTGS View */}
                {paymentMethodSelectionValue === 4 && <View style={[styles.shadowWrapper, external.p_15]}>

                  <View style={[styles.monoText, external.pv_5, { flexDirection: viewRTLStyle }]}>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontSize: fontSizes.FONT15 }]}>
                      Bank Name:
                    </Text>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT15 }]}>
                      HDFC BANK LTD
                    </Text>
                  </View>
                  <View style={[styles.monoText, external.pv_5, { flexDirection: viewRTLStyle }]}>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontSize: fontSizes.FONT15 }]}>
                      Account Number :
                    </Text>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT15 }]}>
                      50200075013139
                    </Text>
                  </View>
                  <View style={[styles.monoText, external.pv_5, { flexDirection: viewRTLStyle }]}>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontSize: fontSizes.FONT15 }]}>
                      Account Type :
                    </Text>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT15 }]}>
                      Current Account
                    </Text>
                  </View>
                  <View style={[styles.monoText, external.pv_5, { flexDirection: viewRTLStyle }]}>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontSize: fontSizes.FONT15 }]}>
                      IFSC Code :
                    </Text>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT15 }]}>
                      HDFC0000038
                    </Text>
                  </View>
                  <View style={[styles.monoText, external.pv_5, { flexDirection: viewRTLStyle }]}>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontSize: fontSizes.FONT15 }]}>
                      Beneficiary Name :
                    </Text>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT15 }]}>
                      TOOLBUY ECOM PRIVATE LIMITED
                    </Text>
                  </View>
                  <View style={[styles.monoText, external.pv_5, { flexDirection: viewRTLStyle }]}>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontSize: fontSizes.FONT15 }]}>
                      BranchName :
                    </Text>
                    <Text style={[commonStyles.subtitleText, external.fx_1, { color: textColorStyle, fontFamily: appFonts.bold, fontSize: fontSizes.FONT15 }]}>
                      Evershine City, Vasai (East)
                    </Text>
                  </View>
                </View>}



              </View>
            </View>
          </LinearGradient> :
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
                        backgroundColor: appColors.textColorGray,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text style={{ color: appColors.textColorWhite, fontSize: 12 }}>4</Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        commonStyles.subtitleText,
                        { color: appColors.textColorGray, fontSize: fontSizes.FONT17, fontFamily: appFonts.semiBold },
                        { textAlign: textRTLStyle },
                      ]}>
                      Payment Methods
                    </Text>
                  </View>



                </View>
              </View>
            </LinearGradient>}

        </ScrollView>
        {continuePaymentMethodResponseTag && <View style={[external.fd_coloumn, external.ai_center, external.js_center, external.mv_10,]}>
          <Text style={[commonStyles.subtitleText, external.ti_center, { fontSize: fontSizes.FONT13, width: SCREEN_WIDTH / 1.4, color: textColorStyle }]}>
            {"By continuing you agree to our"}

          </Text>
          <Text
            style={[

              commonStyles.titleText19,
              { color: appColors.primary, fontSize: fontSizes.FONT14 },
            ]}
            onPress={() => navigation.navigate("WebViewContainer", {
              url: "https://www.toolbuy.com/policy/terms-conditions",
              title: "Terms and Conditions"
            })}
          >
            {"Terms and Conditions "}
            <Text
              style={[commonStyles.subtitleText, { fontSize: fontSizes.FONT13, color: textColorStyle }
              ]}>
              {"and "}
              <Text
                style={[
                  commonStyles.titleText19,
                  { color: appColors.primary, fontSize: fontSizes.FONT14 },
                ]}
                onPress={() => navigation.navigate("WebViewContainer", { url: "https://www.toolbuy.com/policy/privacy", title: "Privacy Policy" })}
              >
                {"Privacy Policy"}
              </Text>
            </Text>
          </Text>


        </View>}
        {continuePaymentMethodResponseTag && <BottomContainer
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
                {`${formatCurrency(cartResponse?.totalOrder ?? "0", currency, curreLocale)}`}

              </Text>
            </View>
          }
          value={
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => {
              if (placeOrderLoading === false) {
                const addressId = addressListResponse.find(item => item.isPrimary).addressID;
                if (paymentMethodIcons[paymentMethodSelectionValue]?.method === 11) {
                  if (!paymentMethodSelectionValue) {
                    Toast.show({
                      type: 'info',
                      text1: 'Warning',
                      text2: "Please select payment method."
                    });

                  } else if (!addressId) {
                    Toast.show({
                      type: 'info',
                      text1: 'Warning',
                      text2: "Please choose address."
                    });

                  } else if (!(cartResponse?.totalOrder)) {
                    Toast.show({
                      type: 'info',
                      text1: 'Warning',
                      text2: "Total amount is blank"
                    });

                  } else {
                    handleMakePaymentRazorPay({ addressid: addressId, amount: cartResponse?.totalOrder, method: paymentMethodIcons[paymentMethodSelectionValue].method });

                  }
                }
              }

            }}>
              {placeOrderLoading ? <ActivityIndicator color={appColors.textColorWhite} /> : <Text style={[styles.checkOut]}>Place Order</Text>}
            </TouchableOpacity>
          }
        />}



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
              {renderRow("Total Amount", `${formatCurrency((cartResponse?.totalPrice) ?? "0", currency, curreLocale)}`)}
              {renderRow(t("transData.GST"), `${formatCurrency((cartResponse?.gstPrice) ?? "0", currency, curreLocale)}`)}
              {renderRow(t("transData.SHIPPING"), cartResponse?.isShippingFree ? "FREE" : `${formatCurrency((cartResponse?.shippingCharge) ?? "0", currency, curreLocale)}`, cartResponse?.isShippingFree && true)}
              {renderRow(t("transData.ROUND_OFF"), `${formatCurrency((Math.abs(cartResponse?.roundOff)) ?? "0", currency, curreLocale)}`)}

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
                    {`${formatCurrency(((cartResponse?.totalOrder ?? 0)) ?? "0", currency, curreLocale)}`}

                  </Text>
                </View>
              }
              value={
                <TouchableOpacity style={styles.checkoutBtn} onPress={() => {
                  if (placeOrderLoading === false) {
                    const addressId = addressListResponse.find(item => item.isPrimary).addressID;
                    if (paymentMethodIcons[paymentMethodSelectionValue]?.method === 11) {
                      if (!paymentMethodSelectionValue) {
                        Toast.show({
                          type: 'info',
                          text1: 'Warning',
                          text2: "Please select payment method."
                        });

                      } else if (!addressId) {
                        Toast.show({
                          type: 'info',
                          text1: 'Warning',
                          text2: "Please choose address."
                        });

                      } else if (!(cartResponse?.totalOrder)) {
                        Toast.show({
                          type: 'info',
                          text1: 'Warning',
                          text2: "Total amount is blank"
                        });

                      } else {
                        handleMakePaymentRazorPay({ addressid: addressId, amount: cartResponse?.totalOrder, method: paymentMethodIcons[paymentMethodSelectionValue].method });

                      }
                    }
                  }
                }}>
                  {placeOrderLoading ? <ActivityIndicator color={appColors.textColorWhite} /> : <Text style={[styles.checkOut]}>Place Order</Text>}
                </TouchableOpacity>
              }
            />
          </Animated.View>
        </Modal>}

        {editModal && <CommonModal
          isVisible={editModal}

          value={
            <View
              style={[{ backgroundColor: bgFullStyle }]}>
              <View
                style={[
                  external.fd_row,
                  external.ai_center,
                  external.js_space,
                ]}>
                <View style={external.fx_1}>
                  <Text
                    style={[commonStyles.titleText19, { color: textColorStyle, textAlign: 'center' }]}>
                    {editAddress}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => setEditModal(false)}>
                  <Cross />
                </TouchableOpacity>
              </View>
              <SolidLine />
              <View style={{ height: SCREEN_HEIGHT * 0.7 }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  alwaysBounceVertical={true}
                >

                  <TextInputs
                    value={txtfullname}
                    title={"Fullname"}
                    placeHolder={"Fullname"}
                    onChangeText={text => {
                      setTxtfullname(text);
                      if (text.trim() === '') {
                        setTxtfullnameError('Fullname is required');
                      } else {
                        setTxtfullnameError('');
                      }
                    }}
                    isrequired={true}
                    errorMessage={txtfullnameError !== '' && true}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                  {txtfullnameError !== '' && <Text style={styles.errorStyle}>{txtfullnameError}</Text>}
                  <TextInputs
                    value={txtPhoneNumber}
                    title={"10 Digit Mobile Number"}
                    placeHolder={"10 Digit Mobile Number"}
                    keyboardType={"number-pad"}
                    maxLength={10}
                    isrequired={true}
                    onChangeText={text => {
                      setTxtPhoneNumber(text);
                      if (text.trim() === '') {
                        setTxtPhoneNumberError('Phonenumber is required');
                      } else {
                        setTxtPhoneNumberError('');
                      }
                    }}
                    onBlur={() => {
                      validatePhoneNumber();
                    }}
                    onSubmitEditing={() => validatePhoneNumber()}

                    errorMessage={txtPhoneNumberError !== '' && true}
                  />
                  {txtPhoneNumberError !== '' && <Text style={styles.errorStyle}>{txtPhoneNumberError}</Text>}
                  {userResponse?.BusinessName && <TextInputs
                    title={"Bussiness Name"}
                    placeHolder={"Bussiness Name"}
                    value={userResponse?.BusinessName}
                    isEditable={false}
                  />}

                  <TextInputs
                    value={txtAddressLine1}
                    title={"Address Line 1"}
                    placeHolder={"Address Line 1"}
                    onChangeText={text => {
                      setTxtAddressLine1(text);
                      if (text.trim() === '') {
                        setTxtAddressLine1Error('Addressline1 is required');
                      } else {
                        setTxtAddressLine1Error('');
                      }
                    }}
                    isrequired={true}
                    errorMessage={txtAddressLine1Error !== '' && true}
                  />
                  {txtAddressLine1Error !== '' && <Text style={styles.errorStyle}>{txtAddressLine1Error}</Text>}


                  <TextInputs
                    value={txtAddressLine2}
                    title={"Address Line 2 (Optional)"}
                    placeHolder={"Address Line 2 (Optional)"}
                    onChangeText={text => {
                      setTxtAddressLine2(text);
                    }}
                  />
                  <TextInputs
                    value={txtLandmark}
                    title={"Landmark (Optional)"}
                    placeHolder={"Landmark (Optional)"}
                    onChangeText={text => {
                      setTxtLandmark(text);
                    }}
                  />
                  <TextInputs
                    value={txtPincode?.toString() || ''}
                    title={"Pincode"}
                    placeHolder={"Pincode"}
                    onChangeText={text => {
                      setTxtPincode(text);
                      if (text.trim() === '') {
                        setTxtPincodeError('Pincode is required');
                      } else {
                        setTxtPincodeError('');
                      }
                    }}
                    isrequired={true}
                    errorMessage={txtPincodeError !== '' && true}
                    keyboardType={'number-pad'}
                    onBlur={() => {
                      validatePincondeNumber();
                    }}
                    onSubmitEditing={() => validatePincondeNumber()}
                  />
                  {txtPincodeError !== '' && <Text style={styles.errorStyle}>{txtPincodeError}</Text>}


                  <View style={[
                    external.fd_row,
                    external.ai_center,
                    external.js_center,]}>
                    <View style={{ width: '47%', marginHorizontal: 10 }}>
                      <TextInputs
                        value={txtCity?.toString() || ''}
                        title={"CityTown"}
                        placeHolder={"CityTown"}
                        onChangeText={text => {
                          setTxtCity(text);
                          if (text.trim() === '') {
                            setTxtCityError('City is required');
                          } else {
                            setTxtCityError('');
                          }
                        }}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        isrequired={true}
                        errorMessage={txtCityError !== '' && true}
                      />
                    </View>
                    <View style={{ width: '47%', marginHorizontal: 10 }}>
                      <DropdownSectionState
                        title={
                          dropdownStateValue !== null && dropdownStateValue !== undefined
                            ? indianStatesData[dropdownStateValue]
                            : "Select State"
                        } options={indianStatesData}
                        selected={dropdownStateValue}
                        onSelect={setdropdownStateValue} />
                    </View>
                  </View>

                  {txtCityError !== '' && <Text style={styles.errorStyle}>{txtCityError}</Text>}
                  <View style={[
                    external.fd_row,
                    external.ai_center,
                    external.js_center,]}>
                    <View style={{ width: '47%', marginHorizontal: 10 }}>

                      <TextInputs
                        value={txtCompanyName}
                        title={"Company or Business Name"}
                        placeHolder={"Company or Business Name"}
                        onChangeText={text => {
                          setTxtCompanyName(text);
                          if (text.trim() === '') {
                            setTxtCompanyNameError('Business Name is required');
                          } else {
                            setTxtCompanyNameError('');
                          }
                        }}
                        isrequired={true}
                        errorMessage={txtCompanyNameError !== '' && true}
                      />

                    </View>
                    <View style={{ width: '47%', marginHorizontal: 10 }}>

                      <TextInputs
                        value={txtGstNumber}
                        title={"GST Number (Optional)"}
                        placeHolder={"GST Number (Optional)"}
                        onChangeText={text => {
                          setTxtGstNumber(text);
                        }}
                      />
                    </View>
                  </View>

                  {txtCompanyNameError !== '' && <Text style={styles.errorStyle}>{txtCompanyNameError}</Text>}


                </ScrollView>
              </View>
              <View
                style={[
                  external.fd_row,
                  external.ai_center,
                  external.js_center,
                  external.mt_10,
                ]}>

                <View style={{ width: SCREEN_WIDTH - windowHeight(40) }}>
                  <NavigationButton
                    backgroundColor={appColors.primary}
                    title={'Edit Address'}
                    color={appColors.screenBg}
                    onPress={() => checkAllValidationForUpdate(editItemValue)}
                  />
                </View>
              </View>


            </View>
          }
        />}


        <CommonModal
          isVisible={addAddressModal}
          value={
            <View
              style={[{ backgroundColor: bgFullStyle }]}>
              <View
                style={[
                  external.fd_row,
                  external.ai_center,
                  external.js_space,
                ]}>
                <View style={external.fx_1}>
                  <Text
                    style={[commonStyles.titleText19, { color: textColorStyle, textAlign: 'center' }]}>
                    {addnewAddress}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setaddAddressModal(false)}>
                  <Cross />
                </TouchableOpacity>
              </View>
              <View style={{ height: SCREEN_HEIGHT * 0.7 }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                >
                  <SolidLine />
                  <TextInputs
                    value={txtfullname}
                    title={"Fullname"}
                    placeHolder={"Fullname"}
                    onChangeText={text => {
                      setTxtfullname(text);
                      if (text.trim() === '') {
                        setTxtfullnameError('Fullname is required');
                      } else {
                        setTxtfullnameError('');
                      }
                    }}
                    isrequired={true}
                    errorMessage={txtfullnameError !== '' && true}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                  {txtfullnameError !== '' && <Text style={styles.errorStyle}>{txtfullnameError}</Text>}
                  <TextInputs
                    value={txtPhoneNumber}
                    title={"10 Digit Mobile Number"}
                    placeHolder={"10 Digit Mobile Number"}
                    keyboardType={"number-pad"}
                    maxLength={10}
                    isrequired={true}
                    onChangeText={text => {
                      setTxtPhoneNumber(text);
                      if (text.trim() === '') {
                        setTxtPhoneNumberError('Phonenumber is required');
                      } else {
                        setTxtPhoneNumberError('');
                      }
                    }}
                    onBlur={() => {
                      validatePhoneNumber();
                    }}

                    errorMessage={txtPhoneNumberError !== '' && true}
                    onSubmitEditing={() => validatePhoneNumber()}
                  />
                  {txtPhoneNumberError !== '' && <Text style={styles.errorStyle}>{txtPhoneNumberError}</Text>}

                  <TextInputs
                    value={txtAddressLine1}
                    title={"Address Line 1"}
                    placeHolder={"Address Line 1"}
                    onChangeText={text => {
                      setTxtAddressLine1(text);
                      if (text.trim() === '') {
                        setTxtAddressLine1Error('Addressline1 is required');
                      } else {
                        setTxtAddressLine1Error('');
                      }
                    }}
                    isrequired={true}

                    errorMessage={txtAddressLine1Error !== '' && true}
                  />
                  {txtAddressLine1Error !== '' && <Text style={styles.errorStyle}>{txtAddressLine1Error}</Text>}


                  <TextInputs
                    value={txtAddressLine2}
                    title={"Address Line 2 (Optional)"}
                    placeHolder={"Address Line 2 (Optional)"}
                    onChangeText={text => {
                      setTxtAddressLine2(text);
                    }}
                  />
                  <TextInputs
                    value={txtLandmark}
                    title={"Landmark (Optional)"}
                    placeHolder={"Landmark (Optional)"}
                    onChangeText={text => {
                      setTxtLandmark(text);
                    }}
                  />
                  <TextInputs
                    value={txtPincode?.toString() || ''}
                    title={"Pincode"}
                    placeHolder={"Pincode"}
                    onChangeText={text => {
                      setTxtPincode(text);
                      if (text.trim() === '') {
                        setTxtPincodeError('Pincode is required');
                      } else {
                        setTxtPincodeError('');
                      }
                    }}
                    isrequired={true}
                    errorMessage={txtPincodeError !== '' && true}
                    keyboardType={'number-pad'}
                    onBlur={() => {
                      validatePincondeNumber();
                    }}
                    onSubmitEditing={() => validatePincondeNumber()}
                  />
                  {txtPincodeError !== '' && <Text style={styles.errorStyle}>{txtPincodeError}</Text>}


                  <View style={[
                    external.fd_row,
                    external.ai_center,
                    external.js_center,]}>
                    <View style={{ width: '47%', marginHorizontal: 10 }}>
                      <TextInputs
                        value={txtCity?.toString() || ''}
                        title={"CityTown"}
                        placeHolder={"CityTown"}
                        onChangeText={text => {
                          setTxtCity(text);
                          if (text.trim() === '') {
                            setTxtCityError('City is required');
                          } else {
                            setTxtCityError('');
                          }
                        }}

                        isrequired={true}
                        errorMessage={txtCityError !== '' && true}
                        onSubmitEditing={() => Keyboard.dismiss()}
                      />
                    </View>
                    <View style={{ width: '47%', marginHorizontal: 10 }}>
                      <DropdownSectionState
                        title={
                          dropdownStateValue !== null && dropdownStateValue !== undefined
                            ? indianStatesData[dropdownStateValue]
                            : "Select State"
                        } options={indianStatesData}
                        selected={dropdownStateValue}
                        onSelect={setdropdownStateValue} />
                    </View>
                  </View>

                  {txtCityError !== '' && <Text style={styles.errorStyle}>{txtCityError}</Text>}



                  <View style={[styles.defaulText, { flexDirection: viewRTLStyle }]}>
                    <CheckBox
                      onPress={setSelectedDelAsBil1}
                      checked={selectedDeliveryAsB1}
                    />
                    <Text
                      style={[
                        styles.defaulTextView,
                        { color: textColorStyle },
                        { textAlign: textRTLStyle },
                      ]}>
                      Use my Billing Address as my Delivery Address
                    </Text>
                  </View>

                  <View style={[styles.defaulText, { flexDirection: viewRTLStyle }]}>
                    <CheckBox
                      onPress={handleSetSelectedBuyingCompany1}
                      checked={selectedBuyingCompany1}
                    />
                    <Text
                      style={[
                        styles.defaulTextView,
                        { color: textColorStyle },
                        { textAlign: textRTLStyle },
                      ]}>
                      I am buying for a company
                    </Text>
                  </View>
                  {selectedBuyingCompany1 && <View style={[
                    external.fd_row,
                    external.ai_center,
                    external.js_center,]}>
                    <View style={{ width: '47%', marginHorizontal: 10 }}>

                      <TextInputs
                        value={txtCompanyName}
                        title={"Company or Business Name"}
                        placeHolder={"Company or Business Name"}
                        onChangeText={text => {
                          setTxtCompanyName(text);
                          if (text.trim() === '') {
                            setTxtCompanyNameError('Business Name is required');
                          } else {
                            setTxtCompanyNameError('');
                          }
                        }}
                        isrequired={true}
                        errorMessage={txtCompanyNameError !== '' && true}
                      />

                    </View>
                    <View style={{ width: '47%', marginHorizontal: 10 }}>

                      <TextInputs
                        value={txtGstNumber}
                        title={"GST Number (Optional)"}
                        placeHolder={"GST Number (Optional)"}
                        onChangeText={text => {
                          setTxtGstNumber(text);
                        }}
                      />
                    </View>
                  </View>}
                  {txtCompanyNameError !== '' && <Text style={styles.errorStyle}>{txtCompanyNameError}</Text>}

                </ScrollView>
              </View>
              <View
                style={[
                  external.fd_row,
                  external.ai_center,
                  external.js_center,
                  external.mt_10,
                ]}>
                <View style={{ width: SCREEN_WIDTH - windowHeight(40) }}>
                  <NavigationButton
                    backgroundColor={appColors.primary}
                    title={'Use This Address'}
                    color={appColors.screenBg}
                    onPress={() => handleAddNewAddress()}
                  />
                </View>
              </View>

            </View>
          }
        />



        <CommonModal
          isVisible={chooseAddress}
          value={
            <View>
              <View
                style={[
                  external.fd_row,
                  external.ai_center,
                  external.js_space,
                ]}>
                <View style={external.fx_1}>
                  <Text
                    style={[commonStyles.titleText19, { color: textColorStyle, textAlign: 'center' }]}>
                    {selectedAddressTitle}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setchooseAddress(false)}>
                  <Cross />
                </TouchableOpacity>
              </View>
              <SolidLine />

              <FlatList data={addressListResponse} renderItem={chooseAdrressItem} />
              <View
                style={[
                  external.fd_row,
                  external.ai_center,
                  external.js_space,
                ]}>
                <TouchableOpacity onPress={() => {
                  clearAllTextField();
                  setchooseAddress(false);
                  setaddAddressModal(true);
                }}>
                  <Text
                    style={[commonStyles.titleText19, { color: appColors.primary }]}>
                    {"+ Add new address"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  external.fd_row,
                  external.ai_center,
                  external.js_center,
                  external.mt_10,
                ]}>

                <View style={{ width: SCREEN_WIDTH - windowHeight(40) }}>
                  <NavigationButton
                    backgroundColor={appColors.primary}
                    title={'Use This Address'}
                    color={appColors.screenBg}
                    onPress={() => handleUseAddressApiCall(chooseAddressItem, selectedAddressTitle)}
                  />
                </View>
              </View>
            </View>
          }
        />
      </View>


    </View>
  );
};

export default AddressScreen;
