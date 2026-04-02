import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '../../themes/appConstant';
import appFonts from '../../themes/appFonts';
import appColors from '../../themes/appColors';

const styles = StyleSheet.create({
  deleteText: {
    width: windowWidth(215),
    height: windowHeight(140),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  errorStyle: {
      color: appColors.red,
      marginBottom: windowHeight(4),
      fontFamily: appFonts.bold,
      fontSize: fontSizes.FONT17,
    },
});
export {styles};
