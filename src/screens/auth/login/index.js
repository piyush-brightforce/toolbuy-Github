import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AuthContainer from '../../../commonComponents/authContainer';
import { apple, facebook, title } from '../../../constant';
import TextInputs from '../../../commonComponents/textInputs';
import NavigationButton from '../../../commonComponents/navigationButton';
import { commonStyles } from '../../../style/commonStyle.css';
import { external } from '../../../style/external.css';
import styles from './style.css';
import appColors from '../../../themes/appColors';
import { Email } from '../../../assets/icons/email';
import { Apple, FaceBook, Google, Key } from '../../../utils/icon';
import { useValues } from '../../../../App';
import { fontSizes, SCREEN_WIDTH } from '../../../themes/appConstant';
import axios from 'axios';
import API_URL from '../../../config/apiConfig';
import { getValue, PREFERENCE_KEY, setValue } from '../../../utils/helper/localStorage';
import { useNavigation } from '@react-navigation/native';
import AuthHeaderContainer from '../authHeaderContainer'; 
import Toast from 'react-native-toast-message';
import { VisibilityIconG } from '../../../assets/googleIcons/VisibilityIcongG';
import { VisibilityOffIconG } from '../../../assets/googleIcons/VisibilityOff';
const SignIn = ({ }) => {

  const { setCustomerUseID } = useValues();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEmailTyping, setEmailTyping] = useState(false);
  const [isPwdTyping, setPwdTyping] = useState(false);
  const [checkedData, setCheckedData] = useState(false);
  const [isSignInDisabled, setSignInDisabled] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();
 
  const [secure, setSecure] = useState(true);
 

  const loginApiCall = async () => {
    try {
      setLoading(true); 
      const cartId = await getValue(PREFERENCE_KEY.CARTSESSIONID);
      const response = await axios.post(`${API_URL.LOGIN}`, {
        CartSessionID: cartId || "",
        Email: email,
        Password: password
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
          text2: "Logged in successfully",
        });
         
      } else {

        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.Message,
        });
        console.error("error in login:", data.Message);
      }

    } catch (error) {
 
      Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error,
        });
      setLoading(false);
      console.error('Login failed:', error);
    }
  };

  const clearInput = () => {
    setEmail('');
    setPassword('');
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

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const onHandleChange = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      await loginApiCall();
      setSignInDisabled(false);
    } else {
      setSignInDisabled(true);
    }
  };

  const { bgFullStyle, textColorStyle, t, iconColorStyle } = useValues();
  const valData = () => {
    setCheckedData(!checkedData);
  };
  const { linearColorStyleTwo, linearColorStyle } = useValues();
  return (
    <View style={external.fx_1}>
      <View style={commonStyles.Header}>
        <AuthHeaderContainer />
      </View>
      <View style={[styles.container, { backgroundColor: bgFullStyle }]}>
        <AuthContainer
          title={"Sign In to ToolBuy"}
          value={
            <View>
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
        {secure ? <VisibilityIconG />: <VisibilityOffIconG /> }
      </TouchableOpacity> }
              />
              {passwordError !== '' && (
                <Text style={styles.errorStyle}>{passwordError}</Text>
              )}
              <View style={[external.fd_row, external.ai_center, external.mt_3]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text
                    style={[
                      commonStyles.subtitleText,
                      { color: appColors.primary, fontSize: fontSizes.FONT16 },
                    ]}>
                    {t('transData.forgetPassword')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />

        <NavigationButton
          isLoading={isLoading}
          title={t('transData.signIn')}
          color={appColors.screenBg}
          onPress={onHandleChange}
          disabled={isSignInDisabled}
          backgroundColor={appColors.primary}
        />
 
        <View style={[styles.singUpView, external.mb_40]}>
          <Text style={[commonStyles.subtitleText,{ fontSize: fontSizes.FONT15 }]}>
            {t('transData.dontHaveAccount')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={[
                commonStyles.titleText19,
                external.ph_5,
                { color: appColors.primary,fontSize:fontSizes.FONT16 },
              ]}>
              {t('transData.signUp')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.tandcView, external.mb_10,external.ai_center,external.js_center]}>
          <Text style={[commonStyles.subtitleText, external.ti_center,{fontSize: fontSizes.FONT13,width: SCREEN_WIDTH/1.4} ]}>
            {"By signing in to Toolbuy.com, You're agreeing to our "}
            <Text
              style={[

                commonStyles.titleText19,
                { color: appColors.primary, fontSize: fontSizes.FONT14 },
              ]}
              onPress={() => navigation.navigate("WebViewContainer", {
                url: "https://www.toolbuy.com/policy/terms-conditions",
              title: "Terms and Conditions" })}
            >
              {"Terms and Conditions "}
              <Text
                style={[commonStyles.subtitleText,{fontSize: fontSizes.FONT13}
                ]}>
                {"and "}
                <Text
                  style={[
                    commonStyles.titleText19,
                    { color: appColors.primary, fontSize: fontSizes.FONT14 },
                  ]}
                  onPress={() => navigation.navigate("WebViewContainer", { url: "https://www.toolbuy.com/policy/privacy",title: "Privacy Policy" })}
                >
                  {"Privacy Policy"}
                </Text>
              </Text>
            </Text>
          </Text>
        </View>
        {/* <LinearBoderText /> */}
        {/* <View style={[external.fd_row, external.ai_center, external.mb_40]}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyleTwo}
          style={[styles.headingContainer]}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={[styles.menuItemContent]}>
            <Google />
            <Text
              style={[
                commonStyles.titleText19,
                external.mt_2,
                { color: textColorStyle },
              ]}>
              {t('transData.google')}
            </Text>
          </LinearGradient>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyleTwo}
          style={[styles.headingContainer]}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={[styles.menuItemContent]}>
            <FaceBook />
            <Text
              style={[
                commonStyles.titleText19,
                external.mt_3,
                { color: textColorStyle },
              ]}>
              {facebook}
            </Text>
          </LinearGradient>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyleTwo}
          style={[styles.headingContainer]}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={[styles.menuItemContent]}>
            <Apple />
            <Text
              style={[
                commonStyles.titleText19,
                external.mt_2,
                { color: textColorStyle },
              ]}>
              {apple}
            </Text>
          </LinearGradient>
        </LinearGradient>
      </View> */}
      </View>
    </View>
  );
};

export default SignIn;
