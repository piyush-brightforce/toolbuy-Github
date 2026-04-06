import { Image, Pressable, Text, View, Modal } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { external } from '../../style/external.css';
import { commonStyles } from '../../style/commonStyle.css';
import images from '../../utils/images';
import { profileData } from '../../data/profileData';
import { RightArrow } from '../../assets/icons/rightArrow';
import styles from './style.css';
import { useNavigation } from '@react-navigation/native';
import { useValues } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import appColors from '../../themes/appColors';
import { deleteValue, getValue, PREFERENCE_KEY } from '../../utils/helper/localStorage';
import LoginResponseModel from '../../models/login/loginresponsemodel';
import HeaderContainer from '../../commonComponents/headingContainer';
import SignIn from '../auth/login';

const ProfileScreen = ({ route }) => {

  const { isFrom } = route?.params || {};

  const { setCustomerUseID } = useValues();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await deleteValue(PREFERENCE_KEY.USERRESPONSE);
      await deleteValue(PREFERENCE_KEY.USERTOKEN);
      await deleteValue(PREFERENCE_KEY.USERCUSTOMERID);
      setCustomerUseID('');

      navigation.replace('DrawerScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  const [userResponse, setUserResponse] = useState(null);
  //  React to changes
  useEffect(() => {
    setIsLoaderLoading(true);
    const initialize = async () => {
      getUserResponse();
    };

    initialize();
  }, []);


  const getUserResponse = async () => {
    try {
      const jsonValue = await getValue(PREFERENCE_KEY.USERRESPONSE);
      if (jsonValue != null) {
        const parsedData = JSON.parse(jsonValue);
        const setresponse = new LoginResponseModel(parsedData);

        setIsLoaderLoading(false);
        setUserResponse(setresponse);

      }
      setIsLoaderLoading(false);
    } catch (e) {
      setIsLoaderLoading(false);
      console.error("Fetch error:", e);
    } finally {
      setIsLoaderLoading(false);
    }
  };

  const {
    textColorStyle,
    linearColorStyle,
    bgFullStyle,
    isDark,
    viewRTLStyle,
    textRTLStyle,
    imageRTLStyle,
    t, isLoaderLoading,
    setIsLoaderLoading,
  } = useValues();

  const colors = isDark
    ? ['#43454A', '#24262C']
    : [appColors.screenBg, appColors.screenBg];


  if (!isLoaderLoading && userResponse)
    return (
      <View style={[styles.viewContainer, { backgroundColor: bgFullStyle }]}>
        {!isFrom ? <Text
          style={[
            external.ti_center,
            commonStyles.hederH2,
            { color: textColorStyle },
          ]}>
          {t('transData.myProfile')}
        </Text> : <HeaderContainer value={t('transData.myAccount')} />}
        <View style={[external.as_center]}>
          <View
            style={[
              styles.grayBorder,
              { borderColor: isDark ? '#202439' : '#EBEEFD' },
            ]}>
            <View style={[styles.primaryBorder]}>
              <Image style={styles.imgStyle} source={images.user} />
            </View>
          </View>
          <Text style={[styles.nameText, { color: textColorStyle }]}>
            {userResponse.FullName}
          </Text>
          <Text style={[commonStyles.subtitleText, external.ti_center]}>
            {userResponse.email}
          </Text>
        </View>
        <View style={[external.mt_10]}>
          {profileData.map((item, index) => (
            <Pressable
              key={index}
              activeOpacity={0.9}
              onPress={() => {
                if (item.id === 6) {
                  handleLogout();
                } else {
                  navigation.navigate(item.screenName);
                }
              }}>
              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                colors={colors}
                style={styles.container}>
                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 0.0, y: 1.0 }}
                  colors={linearColorStyle}
                  style={styles.menuItemContent}>
                  <View
                    style={[
                      external.fd_row,
                      external.ai_center,
                      { flexDirection: viewRTLStyle },
                    ]}>
                    {item.icon}
                    <View style={{ width: '86%' }}>
                      <Text
                        style={[
                          styles.titleText,
                          { color: textColorStyle },
                          { textAlign: textRTLStyle },
                        ]}>
                        {t(item.title)}
                      </Text>
                    </View>
                    <View style={{ transform: [{ scale: imageRTLStyle }] }}>
                      <RightArrow />
                    </View>
                  </View>
                </LinearGradient>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>
    );

  if (!isLoaderLoading && !userResponse)
    return (<SignIn />);
};


export default ProfileScreen;
