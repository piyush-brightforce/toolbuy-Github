import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
 
import styles from './styles.css';
import LinearGradient from 'react-native-linear-gradient'; 
import { external } from '../../../../style/external.css';  
import { fontSizes, windowHeight } from '../../../../themes/appConstant';
import { useValues } from '../../../../../App';
import appColors from '../../../../themes/appColors';   
import SolidLine from '../../../../commonComponents/solidLine';
import { useNavigation } from '@react-navigation/native';
import { deleteValue, PREFERENCE_KEY } from '../../../../utils/helper/localStorage';



const DashoboardProfileItem = ({ userData }) => {


  const {
    linearColorStyle,
    textColorStyle,
    isDark,
    imageContainer,
    textRTLStyle,
    viewRTLStyle,
    t,
    linearColorStyleTwo,
    currSymbol,curreLocale,
    currPrice,
    currency
  } = useValues();
 
 
 
  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32']
    : [appColors.screenBg, appColors.screenBg];

  const navigation = useNavigation();  
    const handleLogout = async () => {
    try {
      await deleteValue(PREFERENCE_KEY.USERRESPONSE);
      await deleteValue(PREFERENCE_KEY.USERTOKEN);
      await deleteValue(PREFERENCE_KEY.USERCUSTOMERID); 

      navigation.replace('DrawerScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


   return (<TouchableOpacity 
      activeOpacity={0.9}>
     <View>
       <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={colors}
        style={[
          styles.container,
          { shadowColor: appColors.shadowColor },
          { flexDirection: viewRTLStyle },
        ]}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyle}
          style={[
            styles.menuItemContent,
            { shadowColor: appColors.shadowColor },
          ]}>
          <View style={[external.fd_coloumn, { flex: 1, } ,]}>
           
            <View style={[styles.priceContainer,{ paddingHorizontal: windowHeight(8) }]}>

              <View style={[external.fd_row, external.js_space,external.pv_5 ]}>
                <Text style={[styles.price, { color: textColorStyle },
                    external.fx_1]}>
                  Full Name
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_flex_start,
                    external.fx_1
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle},
                    external.mt_3]}>
                      {userData?.FullName}
                     
                  </Text>
                </View>
                
              </View>
              <SolidLine/>
                    <View style={[external.fd_row, external.js_space,external.pv_5 ]}>
                <Text style={[styles.price, { color: textColorStyle },
                    external.fx_1]}>
                  Email Address
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    external.fx_1
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle },
                    external.mt_3]}>
                      {userData?.email}
                  </Text>
                </View>
                
              </View>
               <SolidLine/>
               <View style={[external.fd_row, external.js_space,external.pv_5 ]}>
                   <Text style={[styles.price, { color: textColorStyle },
                    external.fx_1]}> 
                   Account Type
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    external.fx_1
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle },
                    external.mt_3]}>
                     {userData?.BussinessName ? "Bussiness Account" :"Personal Account"}
                  </Text>
                </View>
               
              </View>
              <SolidLine/>
              <View style={[external.fd_row, external.js_space,external.pv_5 ]}>
                   <Text style={[styles.price, { color: textColorStyle },
                    external.fx_1]}> 
                   Bussiness Name
                </Text>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    external.fx_1
                  ]}>
                  <Text style={[styles.mediumTitle, { color: textColorStyle },
                    external.mt_3]}>
                     {userData?.BussinessName}
                  </Text>
                </View>
               
              </View>
               
            </View>
 
 
          </View>


        </LinearGradient>
      </LinearGradient>
       <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={colors}
        style={[
          styles.container,
          { shadowColor: appColors.shadowColor },
          { flexDirection: viewRTLStyle },
        ]}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyle}
          style={[
            styles.menuItemContent,
            { shadowColor: appColors.shadowColor },
          ]}>
          <View style={[external.fd_coloumn, { flex: 1, } ]}>
           
            
            <View style={[styles.priceContainer, external.js_space, { paddingHorizontal: windowHeight(8) },external.ai_flex_start]}>

              <View style={[external.fd_row, external.js_space,external.ai_center]}>
                <Text style={[styles.price, { color: textColorStyle },external.fx_1]}>
                  Password
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')} style={external.fx_1}>
                  <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    external.js_space
                  ]}>
                    
                  <Text style={[styles.mediumTitle, { color: textColorStyle,fontSize: fontSizes.FONT7 },
                    external.mt_3,]}>
                       ★ ★ ★ ★ ★ ★ ★
                  </Text>
                  <Text style={[styles.mediumTitle, { color: textColorStyle,fontSize:windowHeight(15) }]}>
                       {">"}
                  </Text>
                 
                </View>
                </TouchableOpacity>
               
                
              </View>
              
            </View>
 
          </View>


        </LinearGradient>
      </LinearGradient>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={colors}
        style={[
          styles.container,
          { shadowColor: appColors.shadowColor },
          { flexDirection: viewRTLStyle },
        ]}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyle}
          style={[
            styles.menuItemContent,
            { shadowColor: appColors.shadowColor },
          ]}>
          <View style={[external.fd_coloumn, { flex: 1, } ]}>
           
            
            <View style={[styles.priceContainer, external.js_space, { paddingHorizontal: windowHeight(8) },external.ai_flex_start]}>

              <View style={[external.fd_row, external.js_space,external.ai_center]}>
                
                <TouchableOpacity onPress={() => handleLogout()} style={external.fx_1}>
                  <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    external.js_space
                  ]}>
                    
                  <Text style={[styles.price, { color: textColorStyle,fontSize: fontSizes.FONT7 },
                    external.mt_3,]}>
                       Sign Out
                  </Text>
                
                </View>
                </TouchableOpacity>
               
                
              </View>
              
            </View>
 
          </View>


        </LinearGradient>
      </LinearGradient>
     </View>
    </TouchableOpacity>);

   
};

export default DashoboardProfileItem;
