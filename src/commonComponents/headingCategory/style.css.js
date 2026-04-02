import { StyleSheet } from 'react-native';
import { external } from '../../style/external.css';
import { fontSizes, windowHeight } from '../../themes/appConstant';
import appColors from '../../themes/appColors';
import appFonts from '../../themes/appFonts';
const styles = StyleSheet.create({
  container: {
    ...external.ai_center,
  },
  valueText: {
    fontSize: fontSizes.FONT19,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
    color: appColors.titleText,
    marginRight: windowHeight(8),
  },


  seeAllText: {
    color: appColors.primary,
    fontSize: fontSizes.FONT14,
    fontFamily: appFonts.semiBold,
  },
});

export default styles;
