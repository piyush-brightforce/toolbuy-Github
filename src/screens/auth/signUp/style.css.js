import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight, windowWidth } from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
import appFonts from '../../../themes/appFonts';
import { commonStyles } from '../../../style/commonStyle.css';

const styles = StyleSheet.create({
  singUpView: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tandcView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'Column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorStyle: {
    color: appColors.red,
    marginBottom: windowHeight(4),
    fontFamily: appFonts.bold,
  },
  tab: {
    paddingBottom: windowHeight(15),
    marginRight: windowWidth(20),
  },
  tabActive: {
    borderBottomColor: appColors.primary,
  },
  tabText: {
    ...commonStyles.titleText19,
    fontSize: fontSizes.FONT16,
    fontFamily: appFonts.regular,
  },
  tabTextActive: {
    fontFamily: appFonts.semiBold,
    color: appColors.primary,
  },
  tabContent: {
    marginTop: windowHeight(15),
    paddingBottom: windowHeight(10),
  },
});

export default styles;
