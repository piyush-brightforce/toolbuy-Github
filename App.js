import React, { createContext, useContext, useEffect, useState } from 'react';
import { SafeAreaView, LogBox, Modal } from 'react-native';
import MyStack from './src/navigation';
import { external } from './src/style/external.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	textRTLStyle,
	viewRTLStyle,
	imageRTLStyle,
	viewSelfRTLStyle,
} from './src/style/rtlStyle';
import {
	bgFullStyle,
	textColorStyle,
	iconColorStyle,
	linearColorStyle,
	subtitleColorStyle,
	imageContainer,
	linearColorStyleTwo,
} from './src/style/darkStyle';
import { useTranslation } from 'react-i18next'; 
import i18n from './src/assets/language';  
import Toast from 'react-native-toast-message';
import { Buffer } from 'buffer';
import CustomLoader from './src/commonComponents/customLoader/customloader';

global.Buffer = Buffer;

LogBox.ignoreLogs(['Your specific warning here']);
export const CommonContext = createContext();

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const [isRTL, setIsRTL] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currSymbol, setCurrSymbol] = useState('₹');
  const [currency, setCurrency] = useState('INR');
  const [curreLocale, setCurreLocale] = useState('en-IN');
  const [currPrice, setCurrPrice] = useState(1);
  const [totalCartItem, settotalCartItem] = useState(0);
  const [menuContent, setMenuContent] = useState([]);
  const [customerUserID, setCustomerUseID] = useState([]);
  const [allBrandsData, setAllBrandsData] = useState([]);
  const [isLoaderLoading, setIsLoaderLoading] = useState(false);
 
  const { t } = useTranslation();

  const contextValues = {
    isRTL,
    setIsRTL,
    isDark,
    setIsDark,
    linearColorStyleTwo: linearColorStyleTwo(isDark),
    imageContainer: imageContainer(isDark),
    subtitleColorStyle: subtitleColorStyle(isDark),
    linearColorStyle: linearColorStyle(isDark),
    textColorStyle: textColorStyle(isDark),
    iconColorStyle: iconColorStyle(isDark),
    bgFullStyle: bgFullStyle(isDark),
    textRTLStyle: textRTLStyle(isRTL),
    viewRTLStyle: viewRTLStyle(isRTL),
    imageRTLStyle: imageRTLStyle(isRTL),
    viewSelfRTLStyle: viewSelfRTLStyle(isRTL),
    t,
    currSymbol,
    setCurrSymbol,
    currPrice,
    currency,
    curreLocale,
    totalCartItem,
    setCurrency,
    setCurreLocale,
    settotalCartItem,
    setCurrPrice,
    menuContent,
    customerUserID,
    setMenuContent,
    setCustomerUseID,
    allBrandsData,
    setAllBrandsData,
    isLoaderLoading,
    setIsLoaderLoading,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CommonContext.Provider value={contextValues}>
        
        <SafeAreaView style={[external.fx_1]}>
          <MyStack />
        </SafeAreaView>

        {/* ✅ ADD THIS HERE */}
        <Toast bottomOffset={10} position={'bottom'} autoHide={true} visibilityTime={1000} />
        {/** ✅ ADD THIS HERE */}
        <CustomLoader visible={isLoaderLoading} />
      </CommonContext.Provider>
    </GestureHandlerRootView>
  );
};
export const useValues = () => useContext(CommonContext);

export default App;
