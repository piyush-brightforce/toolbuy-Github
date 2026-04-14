import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight, windowWidth } from '../../../themes/appConstant';
import { external } from '../../../style/external.css';
import appColors from '../../../themes/appColors';
import { commonStyles } from '../../../style/commonStyle.css';
import appFonts from '../../../themes/appFonts';

const styles = StyleSheet.create({
    container: {
        ...external.fd_row,
        ...external.ai_center,
        ...external.js_space,
        ...external.ph_5
    },
    Header: {
        backgroundColor: appColors.primary,
        ...external.pv_15,
    },
    title: {
        ...commonStyles.H1Banner,
        color: appColors.textColorWhite
    },
    img: {
        width: windowWidth(140),
        height: windowHeight(30),
        resizeMode: 'contain',
    },
    searchContent: {
        borderRadius: windowHeight(40),
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: appColors.screenBg,
        height: windowHeight(38),
        paddingHorizontal: windowWidth(8),
    },
    searchContainer: {
        ...external.fd_row,
        ...external.ai_center,
        ...external.fx_1,
        ...external.ph_10
    },
    searchText: {
        ...external.fx_1,
        fontFamily: appFonts.regular,
        fontSize: fontSizes.FONT19,
    },
    searchIconStyle: {
        backgroundColor: appColors.primaryYellow,
        borderRadius: windowHeight(40),
        height: windowHeight(30),
        width: windowHeight(30),
        ...external.ai_center,
        ...external.js_center,
    },
     iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default styles;
