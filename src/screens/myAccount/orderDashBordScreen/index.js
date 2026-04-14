import { Image, Pressable, Text, View, Modal, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { external } from '../../../style/external.css';
import { profileData, orderDashBoardData } from '../../../data/profileData';
import styles from './style.css';
import { useNavigation } from '@react-navigation/native';
import { useValues } from '../../../../App';
import appColors from '../../../themes/appColors';
import { deleteValue, getValue, PREFERENCE_KEY } from '../../../utils/helper/localStorage';
import LoginResponseModel from '../../../models/login/loginresponsemodel';
import SignIn from '../../auth/login';
import ProductHeaderContainer from '../../productScreen/productHeaderContainer';
import appFonts from '../../../themes/appFonts';
import { commonStyles } from '../../../style/commonStyle.css';
import { fontSizes, SCREEN_HEIGHT, SCREEN_WIDTH, windowHeight } from '../../../themes/appConstant';
import DashboardContainer from '../dashboardContainer';
import API_URL from '../../../config/apiConfig';
import axios from 'axios';
import { OrderHistoryListResponse } from '../../../models/orderhistory/orderHistoryResponseModel';
import { AddressResponse } from '../../../models/addressmodel/addressmodel';
import { ScrollView } from 'react-native-gesture-handler';
import OrderHistoryContainer from '../orderhistorycontainer';
import DashboardAddressListContainer from '../addressescontainer';
import DashboardProfileContainer from '../profilecontainer';
import NavigationButton from '../../../commonComponents/navigationButton';
import CheckBox from '../../../commonComponents/checkBox';
import TextInputs from '../../../commonComponents/textInputs';
import { indianStatesData } from '../../../data/addressData';
import { addnewAddress, editAddress } from '../../../constant';
import DropdownSectionState from '../../profileScreen/dropdownState/dropdownState';
import CommonModal from '../../../commonComponents/commonModel';
import { Cross } from '../../../utils/icon';
import SolidLine from '../../../commonComponents/solidLine';
import PurchaseListContainer from '../purchaselistcontainer';
import { PurchaseListResponse } from '../../../models/purchaselist/purchaselistmodel';
import api_service from '../../../utils/api_service/api_service';

const OrderDashBoardScreen = ({ route }) => {

  const { selectedTab, isFrom } = route?.params || {};

  const navigation = useNavigation();


  const [userResponse, setUserResponse] = useState(null);
  const [orderhistoryData, setOrderhistoryData] = useState([]);

  const [addressListResponse, setaddressListResponse] = useState([]);
  const {
    textColorStyle,
    linearColorStyle,
    bgFullStyle,
    isDark,
    viewRTLStyle,
    textRTLStyle,
    imageRTLStyle,
    t,
    isLoaderLoading,
    setIsLoaderLoading,
  } = useValues();

  const [activeTab, setActiveTab] = useState(selectedTab ?? 'Dashboard');

  const [editModal, setEditModal] = useState(false);
  const [editItemValue, setEditItemValue] = useState({});

  const [addAddressModal, setaddAddressModal] = useState(false);

  const [selectedDeliveryAsB1, setselectedDeliveryAsB1] = useState(true);
  const [selectedBuyingCompany1, setSelectedBuyingCompany1] = useState(false);

  const [purchaseList, setPurchaseList] = useState();


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


  const setSelectedDelAsBil1 = () => {
    setselectedDeliveryAsB1(!selectedDeliveryAsB1);
  };

  const handleSetSelectedBuyingCompany1 = () => {
    setSelectedBuyingCompany1(!selectedBuyingCompany1);
  };

  useEffect(() => {
    setIsLoaderLoading(true);
    const initialize = async () => {
      getUserResponse();
      await fetchOrderHistoryListData();
      await fetchAddressList(); 
       setIsLoaderLoading(false);
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

  const fetchCityandStateList = async (pincode, del = false) => {
    try {
      const response = await api_service.fetchCityandStateList(pincode);

      console.log("calling response screen3:", response?.state);
      console.log("calling response screen4:", response?.district);
      if (response?.district && response?.state) {
        const index = indianStatesData.indexOf(response?.state);
        setTxtCity(prev => prev !== response?.district ? response?.district : prev);
        setdropdownStateValue(index);
      }
    } catch (error) {
      return {}
    }
  };


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

  const handleAddNewAddress = async () => {
    const isValidPhone = validatePhoneNumber();
    const isValidPin = validatePincondeNumber();
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

        clearAllTextField();
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
          IsDelivery: selectedDeliveryAsB1 ? true : false,
          Landmark: txtLandmark ? txtLandmark : ""
        },
        BillingAddress:
        {
          AddressID: 0,
          fkCustomerID: 0,
          BusinessName: "",
          FirstName: "",
          Address1: "",
          Address2: "",
          City: "",
          fkState: 0,
          fkCountry: 0,
          zipcode: '',
          Mobile: '',
          IsPrimary: false,
          GSTIN: '',
          IsShipping: false,
          IsBuyingCompany: false,
          IsDelivery: false,
          Landmark: '',
        }
      };

      const response = await axios.post(API_URL.ADDNEWADDRESS, shippingAddressParams);

      if (response.data.Success) {
        await fetchAddressList();
        setIsLoaderLoading(false);
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
    setEditItemValue(item?.item);

    setTxtfullname(item?.item?.firstName);
    setTxtAddressLine1(item?.item?.address1);
    setTxtAddressLine2(item?.item?.address2);
    setTxtCity(item?.item?.city);
    setTxtPincode(item?.item?.zipcode);
    setTxtPhoneNumber(item?.item?.mobile);
    setTxtGstNumber(item?.item?.gstin);
    setTxtLandmark(item?.item?.landmark);
    setTxtCompanyName(item?.item?.businessName);
    const index = indianStatesData.indexOf(item?.item?.state);
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
        setIsLoaderLoading(false);

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

  const fetchOrderHistoryListData = async () => {

    try {

      const token = await getValue(PREFERENCE_KEY.USERTOKEN) ?? '';
      // ✅ wait for async value 
      const response = await axios.post(API_URL.GETORHISTORY, {
        Token: token,
        ByDate: '',
        Status: '',
        OrderNumber: 0,
        Email: ''
      });

      const orderHistoryModelData = new OrderHistoryListResponse(response.data);
      if (orderHistoryModelData.success) {
        setOrderhistoryData(orderHistoryModelData?.result);
      } else {
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const removeSelectedAddressApiCall = async (addressId) => {

    try {
      setIsLoaderLoading(true);
      const token = await getValue(PREFERENCE_KEY.USERTOKEN) ?? '';
      // ✅ wait for async value 
      const response = await axios.post(API_URL.DELETEADDRESS, {
        Token: token,
        AddressID: addressId,
      });


      if (response.data.Success) {
        await fetchAddressList();
        setIsLoaderLoading(false);
      } else {
        setIsLoaderLoading(false);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoaderLoading(false);
    } finally {
      setIsLoaderLoading(false);
    }
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
      const response = await axios.post(type === "Billing" ? API_URL.SETPRIMARYADDRESS : API_URL.SETDELIVERYADDRESS, {
        Token: token,
        AddressID: adressid
      });
      if (response.data.Success) {
        await fetchAddressList();
        setIsLoaderLoading(false);
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


  const fetchAddressList = async () => {
    try {

      // ✅ wait for async value
      const token = await getValue(PREFERENCE_KEY.USERTOKEN);

      if (!token) {
        return;
      }
      const response = await axios.post(API_URL.GETADDRESSLIST, {
        Token: token
      });
      const cartListModelData = new AddressResponse(response.data);
      const result = cartListModelData.result ?? [];

      setaddressListResponse(result);

    } catch (error) {
      console.error("Error fetching data:", error);
    }  
  };


  const fetchPurchaseListingData = async () => {

    try {

      const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
      const customerUserID = Number(id);
      const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);


      const response = await axios.post(`${API_URL.GETPURCHASELIST}`,
        {
          CustomerID: customerUserID,
          CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '',

        });

      const data = response.data;

      const model = new PurchaseListResponse(data);
      setPurchaseList(model.result);
      setIsLoaderLoading(false);

    } catch (error) {
      setIsLoaderLoading(false);
      console.error('Error fetching data:', error);
    }
  };



  const deletePurchaseListingData = async (productId, purchasemasterid) => {

    try {
      setIsLoaderLoading(true);

      const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
      const customerUserID = Number(id);
      const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);

      const response = await axios.post(`${API_URL.DELETEPURCHASELIST}`,
        {
          CustomerID: customerUserID,
          CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '',
          ProductID: productId ?? 0,
          PurchaseListMasterID: purchasemasterid ?? 0
        });


      const data = response.data;
      if (data.Success) {
        await fetchPurchaseListingData();

      } else {
        setIsLoaderLoading(false);
      }

    } catch (error) {
      setIsLoaderLoading(false);
      console.error('Error fetching data:', error);
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


  if (!isLoaderLoading && userResponse)
    return (
     
        <View style={[external.fx_1, { backgroundColor: appColors.bgLayout }]}>
            {!isFrom ? <ProductHeaderContainer title={t('transData.myAccount')} type={'title'} righticon={false} /> : <ProductHeaderContainer title={t('transData.myAccount')} type={'title'} righticon={false} onPress={() => navigation.goBack()} />}

          <View style={[external.mv_15, { backgroundColor: bgFullStyle }]}>
            <View style={[external.as_center, external.pv_10]}>
              <Text style={[styles.nameText, { color: textColorStyle, fontFamily: appFonts.bold }]}>
                <Text style={[styles.nameText, { color: textColorStyle, fontFamily: appFonts.regular }]}>
                  Welcome Back,
                </Text>
                {` ${userResponse.FullName}`}
              </Text>
              <Text style={[commonStyles.subtitleText, external.ti_center, { color: textColorStyle, fontSize: fontSizes.FONT14 }]}>
                Thanks for a being Toolbuy customer
              </Text>
            </View>
            <View style={[external.fd_row, { backgroundColor: bgFullStyle }, external.ph_10]}>


              {orderDashBoardData.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.title;

                return (
                  <TouchableOpacity
                    key={item?.id.toString()}
                    style={[
                      styles.tab, {
                        borderBottomWidth: activeTab === item.title ? 3 : 0, borderBottomColor: appColors.primary,
                      }, external.fx_1
                    ]}
                    onPress={async () => {
                      setActiveTab(item.title);
                      if (item.title === "Dashboard") {
                        setIsLoaderLoading(true);
                        await fetchOrderHistoryListData();
                        await fetchAddressList();
                         setIsLoaderLoading(false);
                      } else if (item.title === "Order History") {
                         setIsLoaderLoading(true);
                        await fetchOrderHistoryListData(); 
                         setIsLoaderLoading(false);
                      } else if (item.title === "Addressess") {
                        setIsLoaderLoading(true);
                        await fetchAddressList();
                        setIsLoaderLoading(false);
                      } else if (item.title === "Purchase List") {
                        setIsLoaderLoading(true);
                        await fetchPurchaseListingData();
                      } else if (item.title === "Profile") {
                        setIsLoaderLoading(true);
                        await getUserResponse();
                         setIsLoaderLoading(false);
                      }
                    }}>
                    <View style={[external.ai_center, external.fd_coloumn]}>
                      <Icon color={isActive ? appColors.primary : textColorStyle} width={20} height={20} />
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === item.title && styles.tabTextActive,
                          { paddingLeft: 5 },
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>


          {activeTab === "Dashboard" && <ScrollView>
            <View style={[styles.viewContainer, external.fx_1]}>
              <DashboardContainer orderHistoryData={orderhistoryData} userData={userResponse} addressData={addressListResponse} onTapViewAllOrder={(val) => {

                setActiveTab('Order History');
              }} oncallDefaultAddress={(val) => {

                setActiveTab('Addressess');
              }} />
            </View>
          </ScrollView>}

          {activeTab === "Order History" && <ScrollView  >
            <View style={[styles.viewContainer, external.fx_1]}>
              <OrderHistoryContainer orderHistoryData={orderhistoryData} />
            </View>
          </ScrollView>}

          {activeTab === "Addressess" && <ScrollView  >
            <View style={[styles.viewContainer, external.fx_1]}>
              <DashboardAddressListContainer addressesData={addressListResponse} oncallReturnAddressTag={(val) => {

                if (val.tag === "Edit") {
                  handleEditOldAddress(val?.item);
                } else {
                  removeSelectedAddressApiCall(val?.item?.item?.addressID);
                }
              }}
                oncallReturnDefaultAddressTag={(val) => {
                  chooseAddressApiCall(val?.item?.item?.addressID, val?.tag);
                }} />
            </View>
          </ScrollView>}

          {activeTab === "Purchase List" && <ScrollView  >
            <View style={[styles.viewContainer, external.fx_1]}>
              <PurchaseListContainer purchaseList={purchaseList?.purchaseList} purchaseListProduct={purchaseList?.purchaseListProduct} oncallReturnDeletTag={(val) => {

                deletePurchaseListingData(val?.productId, val?.productListId);
              }} />
            </View>
          </ScrollView>}

          {activeTab === "Profile" && <ScrollView  >
            <View style={[styles.viewContainer, external.fx_1]}>
              <DashboardProfileContainer userData={userResponse} />
            </View>
          </ScrollView>}


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

                      errorMessage={txtPhoneNumberError !== '' && true}
                      onSubmitEditing={() => validatePhoneNumber()}
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
                      keyboardType={'number-pad'}
                      onBlur={() => {
                        validatePincondeNumber();
                      }}
                      errorMessage={txtPincodeError !== '' && true}
                      onSubmitEditing={() => validatePincondeNumber()}
                    />
                    {txtPincodeError !== '' && <Text style={styles.errorStyle}>{txtPincodeError}</Text>}


                    <View style={[
                      external.fd_row,
                      external.ai_center,
                      external.js_center,]}>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>
                        <TextInputs
                          value={txtCity}
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
                      keyboardType={'number-pad'}
                      onBlur={() => {
                        validatePincondeNumber();
                      }}

                      errorMessage={txtPincodeError !== '' && true}
                      onSubmitEditing={() => validatePincondeNumber()}
                    />
                    {txtPincodeError !== '' && <Text style={styles.errorStyle}>{txtPincodeError}</Text>}


                    <View style={[
                      external.fd_row,
                      external.ai_center,
                      external.js_center,]}>
                      <View style={{ width: '47%', marginHorizontal: 10 }}>
                        <TextInputs
                          value={txtCity}
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

          {activeTab === "Addressess" && <View style={[external.ph_13, external.pv_10]}>
            <NavigationButton backgroundColor={appColors.primary} title={"Add Address"} color={appColors.textColorWhite} onPress={() => setaddAddressModal(true)} />

          </View>}
        </View>

    );

  if (!isLoaderLoading && !userResponse)
    return (<SignIn />);
};


export default OrderDashBoardScreen;
