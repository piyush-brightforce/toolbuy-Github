import {StyleSheet} from 'react-native';
import {windowHeight} from '../../themes/appConstant';
import appColors from '../../themes/appColors';

const styles = StyleSheet.create({
  verticalLine: {
    height: '100%',
    width: 5,
    backgroundColor: appColors.primary,
    marginHorizontal: windowHeight(5),
    borderRadius: 10,
  },
});
export {styles};
