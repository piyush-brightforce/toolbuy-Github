import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AuthContainer from '../../../commonComponents/authContainer'; 
import TextInputs from '../../../commonComponents/textInputs';
import NavigationButton from '../../../commonComponents/navigationButton';
import { commonStyles } from '../../../style/commonStyle.css';
import { external } from '../../../style/external.css';
import styles from './style.css';
import appColors from '../../../themes/appColors';
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
import TermsAndConditionContainer from '../../../commonComponents/TermsAndConditionContainer';

const SignIn = ({ }) => {

  const { setCustomerUseID } = useValues();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
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
      setEmailError('Please enter a valid email address.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const onHandleChange = async () => {
    const isEmailValid = validateEmail(); 
    if (!isEmailValid) {
      setSignInDisabled(true);
    } else if(password.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password is required',
      });
      setSignInDisabled(true);
    } else {
      await loginApiCall();
      setSignInDisabled(false);
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
                  if (text.trim() === '') {
                    setEmailError('Please enter a valid email address.');
                  } else {
                    setEmailError('');
                  }
                }}
                onBlur={() => {
                  validateEmail(); 
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
                }}
                onBlur={() => { 
                }}
                show={true}
                secureEntryValue={secure}
                rightIcon={<TouchableOpacity
                  onPress={() => setSecure(!secure)}
                >
                  {secure ? <VisibilityIconG /> : <VisibilityOffIconG />}
                </TouchableOpacity>}
                closeIcon={false}
 
              /> 
              <View style={[external.fd_row, external.ai_center, external.mt_3]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text
                    style={[
                      commonStyles.subtitleText,
                      { color: appColors.primary, fontSize: fontSizes.FONT16 },
                    ]}>
                    {'Forgot your Password?'}
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
          <Text style={[commonStyles.subtitleText, { fontSize: fontSizes.FONT15 }]}>
            {t('transData.dontHaveAccount')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={[
                commonStyles.titleText19,
                external.ph_5,
                { color: appColors.primary, fontSize: fontSizes.FONT16 },
              ]}>
              {t('transData.signUp')}
            </Text>
          </TouchableOpacity>
        </View>

        <TermsAndConditionContainer />
      </View>
    </View>
  );
};

export default SignIn;
