import { StyleSheet } from 'react-native';
import {
  fontSizes,
  SCREEN_WIDTH,
  windowHeight,
  windowWidth,
} from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
import { commonStyles } from '../../../style/commonStyle.css';
import { external } from '../../../style/external.css';
import appFonts from '../../../themes/appFonts';
const styles = StyleSheet.create({
  container: {
    marginTop: windowHeight(14),
    shadowColor: appColors.shadowColor,
    elevation: 1,
    marginHorizontal: 1,
    marginBottom: 1,
  },
  viewContainer: {
    flexDirection: 'row',
    marginHorizontal: windowHeight(14),
    marginTop: windowHeight(12),
    marginBottom: windowHeight(12),
  },
  addressItem: {
    ...commonStyles.subtitleText,
    ...external.pt_5,
    color: appColors.titleText,
  },
  errorStyle: {
    color: appColors.red,
    marginBottom: windowHeight(4),
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT17,
  },
  monoText: {
    ...external.fd_row,
    ...external.ai_center,
    ...external.mt_5,  
  },
  shadowWrapper:{
  borderColor: '#000',
  margin:10,
  borderWidth:1
},
  
  defaulText: {
    ...external.fd_row,
    ...external.mt_10,
    ...external.mb_5,
  },
  removeText: {
    ...commonStyles.titleText19,
    color: appColors.primary,
    fontSize: fontSizes.FONT17,
  },
  deleteText: {
    width: windowWidth(215),
    height: windowHeight(140),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  defaulTextView: {
    ...commonStyles.subtitleText,
    ...external.mh_5,
    color: appColors.titleText,
    flexGrow: 1,
  },

  summaryOrderContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 100,
    width: SCREEN_WIDTH /5,
    height: SCREEN_WIDTH /5,
    ...external.mb_5,
  },


  summarysidebarImage: {
    width: SCREEN_WIDTH /5 ,
    height: SCREEN_WIDTH /5,
  },

  summaryiconLayer: {
    backgroundColor: appColors.bgBlack,
    position: 'absolute',
    width: SCREEN_WIDTH /5,
    height: SCREEN_WIDTH /5,
    opacity: 0.06,
    zIndex: 1,
    top: 0,
    left: 0,
  },
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
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10
  },
  textContainer1: {
    ...commonStyles.H1Banner,
    fontSize: fontSizes.FONT20,
    color: appColors.titleText,
    fontFamily: appFonts.regular
  },
  textContainer: {
    ...commonStyles.H1Banner,
    fontSize: fontSizes.FONT20,
    color: appColors.titleText,
    fontFamily: appFonts.bold
  },

  checkoutBtn: {
    backgroundColor: appColors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    ...external.fd_row,
    ...external.ai_center,
  },
  checkOut: {
    ...commonStyles.titleText19,
    color: appColors.screenBg,
    fontSize: fontSizes.FONT19,
    paddingHorizontal: 5,
  },
   arrow: {
    fontSize: 14,
    textAlign:'center'
  },

});

export default styles;
