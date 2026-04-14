import { Image, Text,   TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import HeaderContainer from '../../commonComponents/headingContainer';
import { commonStyles } from '../../style/commonStyle.css';
import { external } from '../../style/external.css';
import TextInputs from '../../commonComponents/textInputs';
import { Cross, Key } from '../../utils/icon';
import NavigationButton from '../../commonComponents/navigationButton';
import { useValues } from '../../../App';
import CommonModal from '../../commonComponents/commonModel';
import images from '../../utils/images';
import { fontSizes } from '../../themes/appConstant';
import appColors from '../../themes/appColors';
import { styles } from './styles.css';
import axios from 'axios';
import API_URL from '../../config/apiConfig';
import { getValue, PREFERENCE_KEY } from '../../utils/helper/localStorage'; 
import Toast from 'react-native-toast-message';

const ChangePasswordScreen = () => {

  const { bgFullStyle, t, textColorStyle } = useValues();
  const [modalVisible, setModalVisible] = useState(false);


  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPwdTyping, setPwdTyping] = useState(false);


  const [newpassword, setnewPassword] = useState('');
  const [newpasswordError, setnewPasswordError] = useState('');
  const [isnewPwdTyping, setnewPwdTyping] = useState(false);


  const [confirmpassword, setconfirmPassword] = useState('');
  const [confirmpasswordError, setconfirmPasswordError] = useState('');
  const [isconfirmPwdTyping, setconfirmPwdTyping] = useState(false);

  const [successfullyVisible, setSuccessfullyVisible] = useState(false);


  const [isLoading, setLoading] = useState(false);


  const changePasswordApiCall = async () => {
    try {
      setLoading(true);

      const token = await getValue(PREFERENCE_KEY.USERTOKEN) ?? ''; 
      const response = await axios.post(`${API_URL.CHANGEPASSWORD}`, {
        password: password,
        newpassword: confirmpassword,
        Token: token
      });

      const data = response.data; 
      if (data.Success === true) { 
        setLoading(false);
        setSuccessfullyVisible(true);
        clearInput();
      } else {
        console.error("error in login:", data.Message);
        setLoading(false); 
         Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: data.Message,
                });
      }


    } catch (error) {

      setLoading(false);
     Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: error,
                });
      console.error('Changepassword failed:', error);
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


  const validateNewPassword = () => {
    if (newpassword.length < 6) {
      setnewPasswordError('Please enter a valid password.');
      return false;
    } else {
      setnewPasswordError('');
      return true;
    }
  };


  const validateConfirmPassword = () => {
    if (confirmpassword !== newpassword) {
      setconfirmPasswordError('New Password and Confirm Password not matched');
      return false;
    } else {
      setconfirmPasswordError('');
      return true;
    }
  };



  const validateOldAndNewPassword = () => {
    if (password === newpassword) { 
      setModalVisible(true);
      return false;
    } else {
      return true;
    }
  };


  const handlceChangePassword = async () => {

    const ispasswordValid = validatePassword();
    const isnewPasswordValid = validateNewPassword();
    const isconfirmPasswordValid = validateConfirmPassword();
    const isOldAndNewPasswordValid = validateOldAndNewPassword();

    if (ispasswordValid && isnewPasswordValid && isconfirmPasswordValid && isOldAndNewPasswordValid) {
      await changePasswordApiCall();
    }
  };

  const clearInput = () => {
    setPassword('');
    setnewPassword('');
    setconfirmPassword('');
  };
  const closeModal = () => {
    setModalVisible(false);
    setSuccessfullyVisible(false);
  };

  return (
    <View
      style={[
        commonStyles.commonContainer,
        external.ph_20,
        { backgroundColor: bgFullStyle },
      ]}>
      <HeaderContainer value={t('transData.changePassword')} />
      <TextInputs
        value={password}
        title={"Current Password"}
        placeHolder={t('transData.enterYourOldPassword')}
        icon={<Key />}
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
         errorMessage={passwordError !== '' && true}
      />
      {passwordError !== '' && (
        <Text style={styles.errorStyle}>{passwordError}</Text>
      )}
      <TextInputs

        value={newpassword}
        title={"New Password"}
        placeHolder={t('transData.enterYourNewPassword')}
        icon={<Key />}
        onChangeText={text => {
          setnewPassword(text);
          setnewPwdTyping(true);
          if (text.length < 6) {
            setnewPasswordError('Please enter a valid password.');
          } else {
            setnewPasswordError('');
          }
        }}
        onBlur={() => {
          validateNewPassword();
          setnewPwdTyping(false);
        }}
         errorMessage={newpasswordError !== '' && true}
      />
      {newpasswordError !== '' && (
        <Text style={styles.errorStyle}>{newpasswordError}</Text>
      )}
      <TextInputs

        value={confirmpassword}
        title={"Confirm Password"}
        placeHolder={t('transData.reEnterPassword')}
        icon={<Key />}
        onChangeText={text => {
          setconfirmPassword(text);
          setconfirmPwdTyping(true);
          if (newpassword !== text) {
            setconfirmPasswordError('New Password and Confirm Password not matched');
          } else {
            setconfirmPasswordError('');
          }
        }}
        onBlur={() => {
          validateConfirmPassword();
          setconfirmPwdTyping(false);
        }}
         errorMessage={confirmpasswordError !== '' && true}
      />
      {confirmpasswordError !== '' && (
        <Text style={styles.errorStyle}>{confirmpasswordError}</Text>
      )}
      <View
        style={[
          external.fx_1,
          external.js_end,
          external.ai_center,
          external.Pb_30,
        ]}>
        <View style={{ width: '100%' }}>
          <NavigationButton
            title={t('transData.changePassword')}
            backgroundColor={appColors.primary}
            onPress={() => handlceChangePassword()}
            color={appColors.textColorWhite}
            isLoading={isLoading}

          />
        </View>
        <CommonModal
          isVisible={modalVisible}
          value={
            <View>
              <TouchableOpacity style={[external.as_end]} onPress={closeModal}>
                <Cross />
              </TouchableOpacity>
              <Image style={styles.deleteText} source={images.delete} />
              <Text
                style={[
                  commonStyles.hederH2,
                  external.ti_center,
                  external.Pb_5,
                  { color: textColorStyle },
                ]}>
                {'You Can’t Use Old Password'}
              </Text>
              <Text
                style={[
                  commonStyles.subtitleText,
                  external.ti_center,
                  { fontSize: fontSizes.FONT19 },
                ]}>
                {
                  'You can not use one of your old password as a new password. Please Change it.'
                }
              </Text>
              <View style={[external.mt_20]}>
                <NavigationButton
                  backgroundColor={appColors.primary}
                  title={t('transData.tryAgain')}
                  onPress={() => setSuccessfullyVisible(true)}
                  color={appColors.screenBg}
                />
              </View>
            </View>
          }
        />
        <CommonModal
          isVisible={successfullyVisible}
          value={
            <View>
              <TouchableOpacity style={[external.as_end]} onPress={closeModal}>
                <Cross />
              </TouchableOpacity>
              <Image style={styles.deleteText} source={images.delete} />
              <Text
                style={[
                  commonStyles.hederH2,
                  external.ti_center,
                  external.Pb_5,
                  { color: textColorStyle },
                ]}>
                {'Congratulations !!'}
              </Text>
              <Text
                style={[
                  commonStyles.subtitleText,
                  external.ti_center,
                  { fontSize: fontSizes.FONT19 },
                ]}>
                {'Yeah !! Your password has been successully changed.'}
              </Text>
              <View style={[external.mt_20]}>
                <NavigationButton
                  backgroundColor={appColors.primary}
                  title={'Okay'}
                  onPress={closeModal}
                  color={appColors.screenBg}
                />
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
