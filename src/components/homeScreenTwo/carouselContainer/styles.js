import {StyleSheet} from 'react-native';
import {fontSizes, SCREEN_WIDTH, windowHeight} from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
import { external } from '../../../style/external.css';
const styles = StyleSheet.create({
  slide: {
    ...external.mv_10,
    ...external.ph_20,
    width: SCREEN_WIDTH,
    height: 200,
  },

  imageWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",   // critical for iOS clipping
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default styles;
