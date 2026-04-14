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
    fontFamily: appFonts.bold,
    fontWeight: '600',
    color: appColors.titleText,
    marginRight: windowHeight(8),
  },


  seeAllText: {
    color: appColors.primary,
    fontSize: fontSizes.FONT19,
    fontFamily: appFonts.regular,
  },
});

export default styles;
