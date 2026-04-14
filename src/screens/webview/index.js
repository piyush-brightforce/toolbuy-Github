import React from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { external } from "../../style/external.css";
import styles from './style.css';
import { ChevronLeft } from '../../utils/icon';
import IconBackground from "../../commonComponents/iconBackGround";
import appColors from "../../themes/appColors";
import { useNavigation } from "@react-navigation/native";


const WebViewContainer = ({ route }) => {
  const { url, title } = route.params; 
  return (
    <View style={[external.fx_1,{backgroundColor:appColors.primary}]}>
      
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: url }} />
      </View>
    </View>
  );
};

export default WebViewContainer;