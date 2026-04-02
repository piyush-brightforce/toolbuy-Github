import { ImageBackground, Modal, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderContainer from '../../../commonComponents/headingContainer';
import { phoneMo, smithaWilliams, smithaWilliamsMail } from '../../../constant';
import { commonStyles } from '../../../style/commonStyle.css';
import { external } from '../../../style/external.css';
import styles from './style.css';
import images from '../../../utils/images';
import TextInputs from '../../../commonComponents/textInputs';
import appColors from '../../../themes/appColors';
import { Call, Edit, Profile } from '../../../utils/icon';
import { Email } from '../../../assets/icons/email';
import NavigationButton from '../../../commonComponents/navigationButton';
import { windowHeight } from '../../../themes/appConstant';
import { useValues } from '../../../../App';
import { getValue, PREFERENCE_KEY, setValue } from '../../../utils/helper/localStorage';
import LoginResponseModel from '../../../models/login/loginresponsemodel';
import axios from 'axios';
import API_URL from '../../../config/apiConfig';
import LoaderScreen from '../../loaderScreen';
import Toast from 'react-native-toast-message';
import RadioButton from '../../../commonComponents/radioButton';
import { useNavigation } from '@react-navigation/native';
import SolidLine from '../../../commonComponents/solidLine';

const EditProfile = () => {
  const [nameValue, setNameValue] = useState(smithaWilliams);

  const navigation = useNavigation();
  const [fullnameError, setFullnameError] = useState('');
  const [emailValue, setEmailValue] = useState(smithaWilliamsMail);
  const [phoneValue, setPhoneValue] = useState(phoneMo);
  const [buttonColor, setButtonColor] = useState('#d1d6de');
  const [bussinessname, setBussinessname] = useState('');
  const [bussinessnameError, setBussinessnameError] = useState('');
  const [isBussinessnameTyping, setBussinessnameTyping] = useState(false);


  const [userResponse, setUserResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal Account');
  const {
    textColorStyle,
    linearColorStyle,
    bgFullStyle,
    textRTLStyle,
    viewRTLStyle,
    t,
    isDark,
    linearColorStyleTwo,
    currSymbol
  } = useValues();


  useEffect(() => {
    getUserResponse();
  }, []);

  const getUserResponse = async () => { 

    try {
      setLoading(true); 
      const jsonValue = await getValue(PREFERENCE_KEY.USERRESPONSE);
       if (jsonValue != null) {
         const parsedData = JSON.parse(jsonValue);
         const setresponse = new LoginResponseModel(parsedData);
 
        setLoading(false);
         setUserResponse(setresponse);

         setNameValue(setresponse.FullName);
         setBussinessname(setresponse.BusinessName);
         setEmailValue(setresponse.email);
 
      }
      setLoading(false);
    } catch (e) {
       setLoading(false);
     } finally {
       setLoading(false);
    }
  };


  const validateFullname = () => {
    if (!nameValue || nameValue.trim() === "") {
      setFullnameError('Enter fullname');
      return false;
    } else {
      setFullnameError('');
      return true;
    }
  };

  const validateBussinessname = () => {
    if (!bussinessname || bussinessname.trim() === "") {
      setBussinessname('Enter bussinessname');
      return false;
    } else {
      setBussinessname('');
      return true;
    }
  };


  const updateAccountApiCall = async () => {
    try {
      setButtonLoading(true);

      const token = await getValue(PREFERENCE_KEY.USERTOKEN) ?? '';
       const response = await axios.post(`${API_URL.UPDATEACCOUNT}`, {
        FullName: nameValue,
        Email: emailValue,
        Account_Type: (!bussinessname || bussinessname === "") ? 0 : 1,
        BusinessName: (!bussinessname || bussinessname === "") ? "" : bussinessname,
        Token: token
      });

      const data = response.data; 
      if (data.Success === true) { 
        setButtonLoading(false);

        const jsonValue = JSON.stringify(data.Result); 
        await setValue(PREFERENCE_KEY.USERRESPONSE, jsonValue);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: "Account updated successfully",
        });

        await getUserResponse();
      } else { 
        setButtonLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.Message,
        });

      }


    } catch (error) {

      setButtonLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error,
      });
      console.error('Changepassword failed:', error);
    }
  };

  const handleNameChange = text => {
    setNameValue(text);
    updateButtonColor();
  };

  const handleEmailChange = text => {
    setEmailValue(text);
    updateButtonColor();
  };

  const handlePhoneChange = text => {
    setPhoneValue(text);
    updateButtonColor();
  };

  const updateButtonColor = () => {
    const isValid = validateInputs();
    const newButtonColor = isValid ? appColors.primary : '#d1d6de';
    setButtonColor(newButtonColor);
  };

  const validateInputs = () => {
    const isNameValid = nameValue.trim().length > 0;
    const isEmailValid = validateEmail(emailValue);
    // const isPhoneValid = validatePhoneNumber(phoneValue);

    return isNameValid && isEmailValid;
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // eslint-disable-next-line no-shadow
  const validatePhoneNumber = phoneNumber => {
    return phoneNumber.trim().length === 9 && !isNaN(phoneNumber);
  };

  const handleSaveChanges = () => {
    const isValid = validateInputs();
    if (isValid) {
      updateAccountApiCall();
    } else {
    }
  };

  if (loading)
    return (<Modal transparent visible={loading}>
      <LoaderScreen />
    </Modal>)
  if (!loading && userResponse)
    return (
      <View
        style={[
          commonStyles.commonContainer,
          external.ph_20,
          { backgroundColor: bgFullStyle },
        ]}>
        <HeaderContainer value={t('Edit Profile')} />
         <View style={external.pt_10}>
          <SolidLine/>
         </View>
         <Text
                style={[
                  styles.tabText,
                  styles.tabTextActive,
                  { color: textColorStyle, paddingLeft: 5 },
                ]}>
                {"Account Type"}
              </Text>
        <View style={[external.fd_row, { flexDirection: viewRTLStyle }]}>
          <TouchableOpacity
            style={[
              styles.tab,

            ]}
            onPress={() => setActiveTab('Personal Account')}>
            <View style={[external.ai_center, external.fd_row]}>
              <RadioButton checked={activeTab == 'Personal Account'} onPress={() => setActiveTab('Personal Account')} />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Personal Account' && styles.tabTextActive,
                  { color: textColorStyle, paddingLeft: 5 },
                ]}>
                {"Personal Account"}
              </Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
            ]}
            onPress={() => setActiveTab('Business Account')}>
            <View style={[external.ai_center, external.fd_row]}>
              <RadioButton checked={activeTab == 'Business Account'} onPress={() => setActiveTab('Business Account')} />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Business Account' && styles.tabTextActive,
                  { color: textColorStyle, paddingLeft: 5 },
                ]}>
                {"Business Account"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {activeTab === "Business Account" &&
          <TextInputs
            value={bussinessname}
            title={"Bussinessname"}
            placeHolder={'Enter bussinessname'}
            onChangeText={text => {
              setBussinessname(text);
              setBussinessnameTyping(true);
              if (text.trim() === '') {
                setBussinessnameError('Fullname is required');
              } else {
                setBussinessnameError('');
              }
            }}
            onBlur={() => {
              validateBussinessname();
              setBussinessnameTyping(false);
            }}
          />
        }
        {activeTab === "Business Account" && bussinessnameError !== '' && (
          <Text style={styles.errorStyle}>{bussinessnameError}</Text>
        )}
        <TextInputs
          value={nameValue}
          title={t('transData.fullname')}
          placeHolder={t('transData.enterFullname')}
          onChangeText={text => {
            setFullname(text);
            setFullnameTyping(true);
            if (text.trim() === '') {
              setEmailError('Fullname is required');
            } else {
              setEmailError('');
            }
          }}
          onBlur={() => {
            validateFullname();
            setFullnameTyping(false);
          }}
        />
        {fullnameError !== '' && (
          <Text style={styles.errorStyle}>{fullnameError}</Text>
        )}
        <TextInputs
          title={t('transData.emailId')}
          placeHolder={t('transData.enterEmail')}
          color={textColorStyle}
          value={emailValue}
          keyboardType={'email-address'}
          isEditable={false}
        />
        {/* <TextInputs
        title={t('transData.phoneNumber')}
        placeHolder={phoneMo}
        color={textColorStyle}
        icon={<Call color={iconColorStyle} />}
        value={phoneValue}
        onChangeText={handlePhoneChange}
        keyboardType={'decimal-pad'}
      /> */}
        <View style={[external.fx_1, external.js_end, external.Pb_30]}>
          <SolidLine/>
          <View
              style={[
                external.fd_row,
                external.ai_center,
                external.js_space,
                external.mt_10,
              ]}>
              <View style={{ width: 170 }}>
                <NavigationButton
                  backgroundColor={isDark ? linearColorStyle : 'white'}
                  title={'Cancel'}
                  color={isDark ? appColors.screenBg : appColors.titleText}
                  borderWidth={0.3}
                  onPress={() => navigation.goBack()}
                  borderColor={linearColorStyleTwo}
                />
              </View>
              <View style={{ width: 170 }}>
                <NavigationButton
                  isLoading={buttonLoading}
                  title={t('transData.SAVE')}
                  color={buttonColor ? appColors.screenBg : appColors.subtitle}
                  onPress={() => handleSaveChanges()}
                  backgroundColor={appColors.primary}
                />
              </View>
            </View>
        </View>
      </View>
    );
};

export default EditProfile;
