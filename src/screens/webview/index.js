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
  const navigation = useNavigation();
  return (
    <View style={[external.fx_1,{backgroundColor:appColors.primary}]}>
      <View style={[external.fd_row,external.ai_center]}>
        <IconBackground
          value={<ChevronLeft height={28} width={28} color={appColors.textColorWhite} />}
          onPress={() => navigation.goBack()}
        />
         <View style={[external.ml_5]}>
                            <Text style={[styles.title]}>{title}</Text>
                        </View>
      </View>
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: url }} />
      </View>
    </View>
  );
};

export default WebViewContainer;