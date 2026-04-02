import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight} from '../../themes/appConstant';
import {commonStyles} from '../../style/commonStyle.css';
import appColors from '../../themes/appColors';
const styles = StyleSheet.create({
  container: {
    height: windowHeight(45),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  applyNow: {
    ...commonStyles.subtitleText,
    fontSize: fontSizes.FONT18,
    color: appColors.primary,
    paddingHorizontal: windowHeight(13),
  },
});

export default styles;
