import {StyleSheet} from 'react-native';
import {external} from '../../style/external.css';
import appColors from '../../themes/appColors';
import {windowHeight, windowWidth} from '../../themes/appConstant';

const styles = StyleSheet.create({
  container: {
    ...external.fd_row,
    ...external.js_space,
    ...external.ai_center,
    elevation: 10,
    backgroundColor: appColors.screenBg,
  },
  valueContainer: {
    backgroundColor: appColors.primary,
    height: windowHeight(48),
    borderRadius: windowHeight(37),
    ...external.ai_center,
    ...external.js_center,
    width: windowWidth(250),
    margin:windowHeight(10)
  },
  menuItemContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    ...external.js_space,
    // overflow: 'hidden',
  },
  shadowWrapper:{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 6,
}
});

export default styles;
