import {StyleSheet} from 'react-native';
import {fontSizes, SCREEN_WIDTH, windowHeight} from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
import { external } from '../../../style/external.css';

const styles = StyleSheet.create({
  
  imageBackground: {
    width: '100%',
    height: '100%',
    borderRadius:10,
    overflow:'hidden',
    resizeMode: 'contain',
  }, 
  slide: {
    ...external.pv_15,
    ...external.ph_20,
    borderRadius:10,
    width: SCREEN_WIDTH,
    overflow:'hidden',
    height: windowHeight(220), // Adjust height as needed
  },
});

export default styles;
