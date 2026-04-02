import {StyleSheet} from 'react-native';
import {windowHeight} from '../../themes/appConstant';
import appColors from '../../themes/appColors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.screenBg,
  },
  imgStyle: {
    width: windowHeight(80),
    height: windowHeight(80),
    borderRadius: windowHeight(80),
  },
  imgStyleDark: {
    width: windowHeight(80),
    height: windowHeight(80),
    borderRadius: windowHeight(80),
  },
});

export default styles;
