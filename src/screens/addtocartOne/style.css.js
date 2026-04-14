import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '../../themes/appConstant';
import {commonStyles} from '../../style/commonStyle.css';
import appColors from '../../themes/appColors';
import appFonts from '../../themes/appFonts';
import { external } from '../../style/external.css';
const styles = StyleSheet.create({
  container: {
    height: windowHeight(55),
    backgroundColor: '#F3F5FB',
    marginVertical: windowHeight(14),
    borderRadius: windowHeight(6),
    padding: windowHeight(10),
    flexDirection: 'row',
    marginHorizontal: windowHeight(14),
  },
  viewContainer: {
    ...external.pt_15,
    ...external.ph_20,
    ...external.fx_1,
    backgroundColor: '#FDFDFD',
  },
  changeText: {
    ...commonStyles.subtitleText,
    color: appColors.primary,
    textDecorationLine: 'underline',
    paddingTop: windowHeight(10),
  },
  locationIcon: {
    width: windowWidth(63),
    height: windowHeight(35),
    backgroundColor: 'rgba(77, 102, 255, 0.10)',
    borderRadius: windowHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOut: {
    ...commonStyles.titleText19,
    color: appColors.screenBg,
    fontSize: fontSizes.FONT19,
    paddingHorizontal: 5,
  },
  bottomContainerView: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  textContainer: {
    ...commonStyles.H1Banner,
    fontSize: fontSizes.FONT20,
    color: appColors.titleText,
    fontFamily:appFonts.bold
  },

  textContainer1: {
    ...commonStyles.H1Banner,
    fontSize: fontSizes.FONT20,
    color: appColors.titleText, 
    fontFamily:appFonts.regular
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

  nameText: {
    ...commonStyles.H1Banner,
    ...external.ti_center,
    paddingTop: windowHeight(3),
    fontSize: fontSizes.FONT19,
    color: appColors.titleText,
  },



  // bottomSheet Styles
overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...external.Pb_10
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...external.pv_10,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  payable: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: appColors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    ...external.fd_row,
     ...external.ai_center,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
