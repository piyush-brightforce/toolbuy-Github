
import { Text, View } from 'react-native';
import React from 'react';
import { CartIconG } from '../../utils/icon';
import { useNavigation } from '@react-navigation/native';
import styles from './style.css';
import { useValues } from '../../../App';
import IconBackground from '../iconBackGround';
import appColors from '../../themes/appColors';
import { commonStyles } from '../../style/commonStyle.css';
import { external } from '../../style/external.css';
import { fontSizes, SCREEN_WIDTH } from '../../themes/appConstant';

const TermsAndConditionContainer = () => {
    const navigation = useNavigation();
    return (
        <View style={[external.mb_10, external.ai_center, external.js_center, {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'Column',
            justifyContent: 'center',
            alignItems: 'center',
        }]}>
            <Text style={[commonStyles.subtitleText, external.ti_center, { fontSize: fontSizes.FONT13, width: SCREEN_WIDTH / 1.4 }]}>
                {"By continuing you agree to our"}

            </Text>
            <Text
                style={[

                    commonStyles.titleText19,
                    { color: appColors.primary, fontSize: fontSizes.FONT14 },
                ]}
                onPress={() => navigation.navigate("WebViewContainer", {
                    url: "https://www.toolbuy.com/policy/terms-conditions",
                    title: "Terms and Conditions"
                })}
            >
                {"Terms and Conditions "}
                <Text
                    style={[commonStyles.subtitleText, { fontSize: fontSizes.FONT13 }
                    ]}>
                    {"and "}
                    <Text
                        style={[
                            commonStyles.titleText19,
                            { color: appColors.primary, fontSize: fontSizes.FONT14 },
                        ]}
                        onPress={() => navigation.navigate("WebViewContainer", { url: "https://www.toolbuy.com/policy/privacy", title: "Privacy Policy" })}
                    >
                        {"Privacy Policy"}
                    </Text>
                </Text>
            </Text>
        </View>
    );
};

export default TermsAndConditionContainer;
