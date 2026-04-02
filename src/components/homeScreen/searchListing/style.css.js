import {StyleSheet} from 'react-native';
import {external} from '../../../style/external.css';
import {commonStyles} from '../../../style/commonStyle.css';
import {
  fontSizes,
  SCREEN_WIDTH,
  windowHeight,
  windowWidth,
} from '../../../themes/appConstant';
import appFonts from '../../../themes/appFonts';

const styles = StyleSheet.create({
  priceContainer: {
    ...external.mt_5,
  },
  price: {
    ...commonStyles.titleText19,
    fontSize: fontSizes.FONT18,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
  
  },
  underlinePrice: {
    ...commonStyles.subtitleText,
    ...external.mh_2,
    textDecorationLine: 'line-through',
  },
  container: {
    width: windowWidth(190),
    marginTop: windowHeight(10),
    borderRadius: windowHeight(9),
    padding: 1,
    overflow: 'hidden',
    elevation: 1.5,
    margin: 1,
  },
  viewContainer: {
    borderRadius: windowHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowHeight(6),
    marginBottom: windowHeight(5),
  },
  imgContainerView: {
    width: windowWidth(100),
    height: windowHeight(100),
    resizeMode: 'contain'
  },
  menuItemContent: {
    borderRadius: windowHeight(9),
    width: '100%',
    flex: 1,

    paddingHorizontal: windowHeight(8),
    paddingBottom: windowHeight(5),
    paddingTop: windowHeight(8),
  },



  newcontainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  newheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  newheaderTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  newviewAll: {
    fontSize: 14,
    color: '#1A73E8',
  },

  newrow: {
    justifyContent: 'space-between',
  },

  newitem: { 
    alignItems: 'center', 
    color:'white'
  },

  newimageWrapper: {
    width: SCREEN_WIDTH/3.5,
    height: SCREEN_WIDTH/3.5,
    borderRadius: SCREEN_WIDTH/3.5,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden' ,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 6,
  },

  newimage: {
    width: SCREEN_WIDTH/3.5,
    height: SCREEN_WIDTH/3.5, 
    overflow:'hidden'
  },

  newtitle: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
});

export default styles;
