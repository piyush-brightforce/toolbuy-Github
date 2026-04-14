import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
import {external} from '../../../style/external.css';
import {commonStyles} from '../../../style/commonStyle.css';
import appFonts from '../../../themes/appFonts';
const styles = StyleSheet.create({
  container: {
    marginVertical: windowHeight(7),

    flexDirection: 'row',
    borderColor: appColors.cardBorder,
    borderRadius: windowHeight(8),
    padding: 1,
    elevation: 1,
    shadowColor: appColors.shadowColor,
    margin: 1,
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
  imgStyle: {
    width: windowWidth(97),
    height: windowHeight(58),
    resizeMode: 'contain',
  },
  viewContainer: {
    ...external.fx_1, 
  },
  titleText: {
    ...commonStyles.subtitleText,
    ...external.ph_10,
    color: appColors.titleText,

    fontSize: fontSizes.FONT18,
  },
  nameText: {
    ...commonStyles.FONT19,
    ...external.ti_center,
    fontSizes: fontSizes.FONT17,
    paddingTop: windowHeight(3),
  },
  grayBorder: {
    borderWidth: windowHeight(7),
    width: windowHeight(70),
    height: windowHeight(70),
    alignSelf: 'center',
    borderRadius: windowHeight(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EBEEFD',
    marginTop: windowHeight(15),
  },
  primaryBorder: {
    borderWidth: 2,
    width: windowHeight(60),
    height: windowHeight(60),
    alignSelf: 'center',
    borderRadius: windowHeight(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:appColors.primary,
  },
  menuItemContent: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  button: {
    backgroundColor: appColors.primary, // Blue color
    marginTop:20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    width:"50%",
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSizes.FONT19,
    fontWeight: '600',
  },
  text: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  

   tab: {
      paddingVertical: windowHeight(10),
      marginRight: windowWidth(10),
      flex:1, 
    },
    tabActive: {
      borderBottomColor: appColors.primary,
    },
    tabText: {
      ...commonStyles.titleText19,
      fontSize: fontSizes.FONT10,
      fontFamily: appFonts.regular,
    },
    tabTextActive: {
      ...commonStyles.titleText19,
      fontFamily: appFonts.regular,
      fontSize: fontSizes.FONT10,
      color: appColors.primary,
    },
    tabContent: {
      marginTop: windowHeight(15),
      paddingBottom: windowHeight(10),
    },
      defaulTextView: {
        ...commonStyles.subtitleText,
        ...external.mh_5,
        color: appColors.titleText,
        flexGrow: 1,
      },

      errorStyle: {
        color: appColors.red,
        marginBottom: windowHeight(4),
        fontFamily: appFonts.medium,
        fontSize: fontSizes.FONT17,
      },  
});

export default styles;
