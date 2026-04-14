import React, {  useState } from 'react';
import { View, Text } from 'react-native';
import AuthContainer from '../../../commonComponents/authContainer'; 
import TextInputs from '../../../commonComponents/textInputs';
import NavigationButton from '../../../commonComponents/navigationButton';
import appColors from '../../../themes/appColors';
import { Email } from '../../../assets/icons/email';
import styles from './style.css';
import { useValues } from '../../../../App';
import axios from 'axios';
import API_URL from '../../../config/apiConfig'; 
import { useNavigation } from '@react-navigation/native';
import AuthHeaderContainer from '../authHeaderContainer';
import { external } from '../../../style/external.css';
import { commonStyles } from '../../../style/commonStyle.css';
import Toast from 'react-native-toast-message';

const ForgetPassword = ({ }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailTyping, setEmailTyping] = useState(false);

  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

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

  const onHandleChange = () => {

    const isemailValid = validateEmail();
    if (isemailValid) {
      forgotPasswordApiCall();
    }
  };

  const forgotPasswordApiCall = async () => {
    try {
      setLoading(true);
 
      const response = await axios.post(`${API_URL.FORGOTPASSWORD}`, {
        Email: email,
      });

      const data = response.data; 
      if (data.Success === true) { 
        setLoading(false);
        clearInput(); 
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: "Mail has been sent to your email for reset password.",
        });

      } else {
        console.error("error in forgotpassword:", data.Message);
        setLoading(false);
        
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data?.Message,
        });
      }


    } catch (error) {

      setLoading(false);
      
       Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error,
        });
      console.error('forgotpassword failed:', error);
    }
  };

  const clearInput = () => {
    setEmail('');
  };

  const { t, bgFullStyle, iconColorStyle } = useValues();
  return (
    <View style={external.fx_1}>
      <View style={commonStyles.Header}>
				<AuthHeaderContainer/>
			</View>
       <View style={[styles.headingContainer, { backgroundColor: bgFullStyle }]}>
      <AuthContainer
        title={"Reset Your Password"}
        subtitle={"Pop your email in the box below & we'll send you a link to reset your password."}
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
              errorMessage={emailError !== '' && true}
            />

            {emailError !== '' && (
              <Text style={styles.errorStyle}>{emailError}</Text>
            )}
          </View>
        }
      />
      <NavigationButton
        isLoading={isLoading}
        title={t('transData.submit')}
        onPress={() => onHandleChange()}
        backgroundColor={appColors.primary}
        color={'white'}
      />
    </View>
    </View>
   
  );
};

export default ForgetPassword;
