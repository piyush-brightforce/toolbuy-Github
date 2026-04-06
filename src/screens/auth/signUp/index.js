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
      setEmailError('Invalid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validateFullname = () => {
    if (!fullname || fullname.trim() === "") {
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


  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Invalid phone number');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  const clearInput = () => {
    setFullname('');
    setEmail('');
    setPassword('');
    setBussinessname('');
    // setConfirmPassword('');
  };

  const onHandleChange = () => {
    const isEmailValid = validateEmail();
    const isFullnameValid = validateFullname();
    const isPasswordValid = validatePassword();
    // const isConfirmPasswordValid = validateConfirmPassword();

    const isDisabled =
      !isEmailValid ||
      !isFullnameValid ||
      !isPasswordValid;
    // || !isConfirmPasswordValid;

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
                value={fullname}
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
                value={email}
                title={t('transData.emailId')}
                placeHolder={t('transData.enterEmail')}
                onChangeText={text => {
                  setEmail(text);
                  setEmailTyping(true);
                  if (text.trim() === '') {
                    setEmailError('Email is required');
                  } else {
                    setEmailError('');
                  }
                }}
                onBlur={() => {
                  validateEmail();
                  setEmailTyping(false);
                }}
              />
              {emailError !== '' && (
                <Text style={styles.errorStyle}>{emailError}</Text>
              )}

              {/* 

            <TextInputs
              title={t('transData.phoneNumber')}
              placeHolder={t('transData.enterNumber')}
              onChangeText={text => {
                setPhone(text);
                setCallTyping(true);
                if (text.trim() === '') {
                  setPhoneError('Phone number is required');
                } else {
                  setPhoneError('');
                }
              }}
              onBlur={() => {
                validatePhone();
                setCallTyping(false);
              }}
              icon={
                <Call color={isCallTyping ? '#051E47' : appColors.subtitle} />
              }
            />

            {phoneError !== '' && (
              <Text style={styles.errorStyle}>{phoneError}</Text>
            )} */}

              <TextInputs
                value={password}
                title={t('transData.passwords')}
                placeHolder={t('transData.enterYouPassword')}
                onChangeText={text => {
                  setPassword(text);
                  setPwdTyping(true);
                  if (text.length < 6) {
                    setPasswordError('Password must be at least 6 characters');
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
                  style={styles.icon}
                  onPress={() => setSecure(!secure)}
                >
                  {secure ? <VisibilityIconG /> : <VisibilityOffIconG />}
                </TouchableOpacity>}
              />

              {passwordError !== '' && (
                <Text style={styles.errorStyle}>{passwordError}</Text>
              )}

              {/* <TextInputs
            value={confirmPassword}
              title={t('transData.confirmPasswords')}
              placeHolder={t('transData.reEnterPassword')}
              onChangeText={text => {
                setConfirmPassword(text);
                setConfPwdTyping(true);
                if (text !== password) {
                  setConfirmPasswordError('Passwords do not match');
                } else {
                  setConfirmPasswordError('');
                }
              }}
              onBlur={() => {
                validateConfirmPassword();
                setConfPwdTyping(false);
              }}
              icon={
                <Key color={isConfTyping ? '#051E47' : appColors.subtitle} />
              }
            />

            {confirmPasswordError !== '' && (
              <Text style={styles.errorStyle}>{confirmPasswordError}</Text>
            )} */}
            </View>
          }
        />

        {/* signup button */}
        <NavigationButton
          title={t('transData.signUp')}
          color={appColors.screenBg}
          onPress={onHandleChange}
          disabled={isGetOtpDisabled}
          backgroundColor={appColors.primary}
          isLoading={isLoading}
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

              style={[commonStyles.subtitleText, { paddingLeft: 5, fontSize: fontSizes.FONT13 }]}
            >
              {"Send me emails about new arrivals, hot items, daily savings and more."}
            </Text>
          </View>
        </TouchableOpacity>

        {/* signin if registered */}
        <View style={styles.singUpView}>
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
        <View style={[styles.tandcView, external.mb_10, external.ai_center, external.js_center]}>
          <Text style={[commonStyles.subtitleText, external.ti_center, { fontSize: fontSizes.FONT13, width: SCREEN_WIDTH / 1.4 }]}>
            {"By signing in to Toolbuy.com, You're agreeing to our "}
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
                style={[commonStyles.subtitleText, { fontSize: fontSizes.FONT13 }
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
          </Text>
        </View>
      </View>

    </View>

  );
};

export default SignUp;
