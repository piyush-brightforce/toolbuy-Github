import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AuthContainer from '../../../commonComponents/authContainer';

import TextInputs from '../../../commonComponents/textInputs';
import NavigationButton from '../../../commonComponents/navigationButton';
import { commonStyles } from '../../../style/commonStyle.css';
import { external } from '../../../style/external.css';
import styles from './style.css';
import appColors from '../../../themes/appColors';
import { Email } from '../../../assets/icons/email';
import { Call, Key, RadioBox } from '../../../utils/icon';
import { useValues } from '../../../../App';
import axios from 'axios';
import API_URL from '../../../config/apiConfig';
import { getValue, PREFERENCE_KEY, setValue } from '../../../utils/helper/localStorage';
import { useNavigation } from '@react-navigation/native';
import AuthHeaderContainer from '../authHeaderContainer';
import { fontSizes, SCREEN_WIDTH } from '../../../themes/appConstant';
import RadioButton from '../../../commonComponents/radioButton';
import CheckBox from '../../../commonComponents/checkBox';
import Toast from 'react-native-toast-message';
import { VisibilityIconG } from '../../../assets/googleIcons/VisibilityIcongG';
import { VisibilityOffIconG } from '../../../assets/googleIcons/VisibilityOff';
import TermsAndConditionContainer from '../../../commonComponents/TermsAndConditionContainer';

const SignUp = ({ }) => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [bussinessname, setBussinessname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [bussinessnameError, setBussinessnameError] = useState('');
  const [isGetOtpDisabled, setGetOtpDisabled] = useState(true);
  const [isEmailTyping, setEmailTyping] = useState(false);
  const [isFullnameTyping, setFullnameTyping] = useState(false);
  const [isCallTyping, setCallTyping] = useState(false);
  const [isPwdTyping, setPwdTyping] = useState(false);
  const [isConfTyping, setConfPwdTyping] = useState(false);
  const [isBussinessnameTyping, setBussinessnameTyping] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [checkedData, setCheckedData] = useState(false);

  const [secure, setSecure] = useState(true);
  const {
    textRTLStyle,
    iconColorStyle,
    viewRTLStyle,
    currSymbol,
    setCustomerUseID
  } = useValues();

  const [activeTab, setActiveTab] = useState('Personal Account');
  const signupApiCall = async () => {

    try {

      setLoading(true);
      const cartId = await getValue(PREFERENCE_KEY.CARTSESSIONID);
      const response = await axios.post(`${API_URL.SIGNUP}`, {
        Account_Type: (!bussinessname || bussinessname === "") ? 0 : 1,
        BusinessName: (!bussinessname || bussinessname === "") ? "" : bussinessname,
        FullName: fullname,
        Email: email,
        Password: password,
        CartSessionID: cartId || ''
      });

      const data = response.data;
      if (data.Success === true) {
        const jsonValue = JSON.stringify(data.Result);
        await setValue(PREFERENCE_KEY.USERRESPONSE, jsonValue);
        await setValue(PREFERENCE_KEY.USERTOKEN, data.Result.Token);
        await setValue(PREFERENCE_KEY.USERCUSTOMERID, data.Result.CustomerID.toString());
        setCustomerUseID(data.Result.CustomerID);
        setLoading(false);
        navigation.replace('DrawerScreen');
        clearInput();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: "New user registered successfully",
        });
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.Message,
        });
        console.error("error in Signup:", data.Message);
      }


    } catch (error) {
      setLoading(false);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error,
      });
      console.error('Signup failed:', error);
    }
  };
  const valData = () => {
    setCheckedData(!checkedData);
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validateFullname = () => {
    if (!fullname || fullname.trim() === "") {
      setFullnameError('Please enter a valid full name.');
      return false;
    } else {
      setFullnameError('');
      return true;
    }
  };


  const validateBussinessname = () => {
    if (!bussinessname || bussinessname.trim() === "") {
      setBussinessname('Please enter a valid business name.');
      return false;
    } else {
      setBussinessname('');
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Please enter a valid password.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const clearInput = () => {
    setFullname('');
    setEmail('');
    setPassword('');
    setBussinessname('');
  };

  const onHandleChange = () => {
    const isEmailValid = validateEmail();
    const isFullnameValid = validateFullname();
    const isPasswordValid = validatePassword();

    const isDisabled =
      !isEmailValid ||
      !isFullnameValid ||
      !isPasswordValid;

    setGetOtpDisabled(isDisabled);

    if (!isDisabled) {
      signupApiCall();
    }
  };
  const { bgFullStyle, textColorStyle, t } = useValues();

  return (
    <View style={external.fx_1}>
      <View style={commonStyles.Header}>
        <AuthHeaderContainer />
      </View>
      <View style={[styles.container, { backgroundColor: bgFullStyle }]}>
        <AuthContainer
          title={t('transData.signUp')}
          value={
            <View>
              <Text
                style={[
                  styles.tabText,
                  styles.tabTextActive,
                  { color: textColorStyle, paddingLeft: 5 },
                ]}>
                {"Account Type"}
              </Text>
              <View style={[external.fd_row,external.mt_5, { flexDirection: viewRTLStyle }]}>
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
                  title={"Bussiness Name"}
                  placeHolder={'Enter bussinessname'}
                  onChangeText={text => {
                    setBussinessname(text);
                    setBussinessnameTyping(true);
                    if (text.trim() === '') {
                      setBussinessnameError('Please enter a valid business name.');
                    } else {
                      setBussinessnameError('');
                    }
                  }}
                  errorMessage={bussinessnameError !== '' && true}
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
                value={fullname}
                title={t('transData.fullname')}
                placeHolder={t('transData.enterFullname')}
                onChangeText={text => {
                  setFullname(text);
                  setFullnameTyping(true);
                  if (text.trim() === '') {
                    setFullnameError('Please enter a valid full name.');
                  } else {
                    setFullnameError('');
                  }
                }}

                errorMessage={fullnameError !== '' && true}
                onBlur={() => {
                  validateFullname();
                  setFullnameTyping(false);
                }}
              />
              {fullnameError !== '' && (
                <Text style={styles.errorStyle}>{fullnameError}</Text>
              )}

              <TextInputs
                value={email}
                title={"Email Address"}
                placeHolder={t('transData.enterEmail')}
                onChangeText={text => {
                  setEmail(text);
                  setEmailTyping(true);
                  if (text.trim() === '') {
                    setEmailError('Please enter a valid email address.');
                  } else {
                    setEmailError('');
                  }
                }}
                onBlur={() => {
                  validateEmail();
                  setEmailTyping(false);
                }}
                errorMessage={emailError !== '' && true}
              />
              {emailError !== '' && (
                <Text style={styles.errorStyle}>{emailError}</Text>
              )}


              <TextInputs
                value={password}
                title={t('transData.passwords')}
                placeHolder={t('transData.enterYouPassword')}
                onChangeText={text => {
                  setPassword(text);
                  setPwdTyping(true);
                  if (text.length < 6) {
                    setPasswordError('Please enter a valid password.');
                  } else {
                    setPasswordError('');
                  }
                }}
                onBlur={() => {
                  validatePassword();
                  setPwdTyping(false);
                }}
                show={true}
                secureEntryValue={secure}
                rightIcon={<TouchableOpacity
                  style={[external.mr_5]}
                  onPress={() => setSecure(!secure)}
                >
                  {secure ? <VisibilityIconG /> : <VisibilityOffIconG />}
                </TouchableOpacity>}

                errorMessage={passwordError !== '' && true}
              />

              {passwordError !== '' && (
                <Text style={styles.errorStyle}>{passwordError}</Text>
              )}

            </View>
          }
        />

        {/* accept notification checkbox */}
        <TouchableOpacity
          style={[
            styles.tab,

          ]}
          onPress={valData}>
          <View style={[external.ai_center, external.fd_row]}>
            <CheckBox onPress={valData} checked={checkedData} />
            <Text

              style={[commonStyles.subtitleText, { paddingLeft: 5, fontSize: fontSizes.FONT14 }]}
            >
              {"Send me emails about new arrivals, hot items, daily savings and more."}
            </Text>
          </View>
        </TouchableOpacity>

        {/* signup button */}
        <NavigationButton
          title={t('transData.signUp')}
          color={appColors.screenBg}
          onPress={onHandleChange}
          disabled={isGetOtpDisabled}
          backgroundColor={appColors.primary}
          isLoading={isLoading}
        />


        {/* signin if registered */}
        <View style={[styles.singUpView, external.mt_10]}>
          <Text style={[styles.tabText, { fontSize: fontSizes.FONT15 }]}>
            {t('transData.alreadyHaveAccount')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                commonStyles.titleText19,
                external.ph_5,
                { color: appColors.primary, fontSize: fontSizes.FONT16 },
              ]}>
              {t('transData.signIn')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms conditions and privacy policy view */}
        <TermsAndConditionContainer />
      </View>

    </View>

  );
};

export default SignUp;
