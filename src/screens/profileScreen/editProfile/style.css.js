import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
import appFonts from '../../../themes/appFonts';
import { commonStyles } from '../../../style/commonStyle.css';

const styles = StyleSheet.create({
  imgStyle: {
    width: windowWidth(90),
    height: windowHeight(54),
    marginTop: windowHeight(24),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  editIconStyle: {
    backgroundColor: '#F3F5FB',
    width: windowHeight(24),
    height: windowHeight(24),
    borderRadius: windowHeight(24),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    top: '55%',
  },
   fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  errorStyle: {
      color: appColors.red,
      marginBottom: windowHeight(4),
      fontFamily: appFonts.bold,
    },
  tab: {
    paddingVertical: windowHeight(10),
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
