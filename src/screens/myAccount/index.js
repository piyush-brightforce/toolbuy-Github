import { Image, Pressable, Text, View, Modal } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { external } from '../../style/external.css';
import { commonStyles } from '../../style/commonStyle.css';
import images from '../../utils/images';
import { profileData } from '../../data/profileData';
import { RightArrow } from '../../assets/icons/rightArrow';
import styles from './style.css';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useValues } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import appColors from '../../themes/appColors';
import { deleteValue, getValue, PREFERENCE_KEY } from '../../utils/helper/localStorage';
import LoginResponseModel from '../../models/login/loginresponsemodel';
import HeaderContainer from '../../commonComponents/headingContainer';
import LoaderScreen from '../loaderScreen';
import SignIn from '../auth/login';
import appFonts from '../../themes/appFonts';
import ProductHeaderContainer from '../productScreen/productHeaderContainer';
import AddressHeaderContainer from '../profileScreen/addressheaderContainer/addressheaderContainer';

const MyAccountScreen = ({ route }) => {

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
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initialize = async () => {
      await getUserResponse();
    };

    initialize();
  }, []);


  const getUserResponse = async () => {
    try {
      const jsonValue = await getValue(PREFERENCE_KEY.USERRESPONSE);
      if (jsonValue != null) {
        const parsedData = JSON.parse(jsonValue);
        const setresponse = new LoginResponseModel(parsedData);

        setLoading(false);
        setUserResponse(setresponse);

      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
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
    t,
  } = useValues();

  const colors = isDark
    ? ['#43454A', '#24262C']
    : [appColors.screenBg, appColors.screenBg];


  if (loading)
    return (<Modal transparent visible={loading}>
      <LoaderScreen />
    </Modal>)
  if (!loading && userResponse)
    return (
      <View style={external.fx_1}>
        <ProductHeaderContainer title={t('transData.myAccount')} type={'title'} righticon={false} />
        <View style={[styles.viewContainer, { backgroundColor: bgFullStyle }]}>

          <View style={[external.as_center]}>
            <Text style={[styles.nameText, { color: textColorStyle, fontFamily: appFonts.bold }]}>
              <Text style={[styles.nameText, { color: textColorStyle, fontFamily: appFonts.regular }]}>
                Welcome Back,
              </Text>
              {userResponse.FullName}
            </Text>
            <Text style={[commonStyles.subtitleText, external.ti_center]}>
              Thanks for a being Toolbuy customer
            </Text>
          </View>
          <View style={[external.mt_10]}>
            {profileData.map((item, index) => (
              <Pressable
                key={index}
                activeOpacity={0.9}
                onPress={() => {
                  if (item.id === 5) {
                    handleLogout();
                  } else {
                    navigation.navigate('OrderDashBoardScreen', { selectedTab: item.title });
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
      </View>
    );

  if (!loading && !userResponse)
    return (<SignIn />);
};


export default MyAccountScreen;
