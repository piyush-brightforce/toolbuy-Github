import { StyleSheet } from 'react-native';
import appColors from '../../../themes/appColors';
import {
  windowHeight, windowWidth,
  fontSizes
} from '../../../themes/appConstant';
import { external } from '../../../style/external.css';
import { commonStyles } from '../../../style/commonStyle.css';
import appFonts from '../../../themes/appFonts';
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: windowHeight(20),
    overflow: 'hidden',
    elevation: 3,
  },

  banner: {
    height: windowHeight(80),
  },
  
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Android
  },


  logoWrapper: {
    width: windowWidth(100),
    height: windowWidth(100),
    borderRadius: windowWidth(100),
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: -45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  logo: {
    width: 80,
    height: 80,
  },

  content: {
    ...external.ph_10,
    ...external.pt_4,
    ...external.Pb_10,
    alignItems: 'center',
  },


  title: {
    ...commonStyles.titleText19,
    fontSize: fontSizes.FONT17,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
  },

  previewRow: {
    flexDirection: 'row',
    ...external.mt_10
  },

  previewCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  previewImage: {
    width: 22,
    height: 22,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },

  button: {
    ...external.pv_5,
    alignItems: 'center',
  },

  buttonText: {
    ...commonStyles.titleText19,
    fontSize: fontSizes.FONT17,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
    color: appColors.primary,

  },
  img: {
    resizeMode: 'contain',
    height: windowHeight(80),
    width: windowWidth(80),
  },
});


export default styles;
