import {StyleSheet} from 'react-native';
import {commonStyles} from '../../../style/commonStyle.css';
import {fontSizes} from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
const styles = StyleSheet.create({
  container: {
    ...commonStyles.titleText19,
    color: appColors.primary,
    fontSize: fontSizes.FONT17,
  },
});

export default styles;
