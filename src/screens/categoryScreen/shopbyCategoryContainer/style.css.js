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
import appColors from '../../../themes/appColors';

const styles = StyleSheet.create({
  priceContainer: {
    ...external.mt_5,
  },
  title: {
    ...commonStyles.titleText19,
    fontSize: fontSizes.FONT17,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
    width: SCREEN_WIDTH * 0.25, 
  
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
    justifyContent: 'space-around'
  },

  newitem: {
    width: '30%',
    alignItems: 'center',
    paddingVertical:10,
    paddingHorizontal:10,
  },

  newimageWrapper: {
    width: SCREEN_WIDTH/3.5,
    height: SCREEN_WIDTH/3.5,
    borderRadius: SCREEN_WIDTH/3.5,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden',
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
 
  activeSidebarItem: {
      position: 'relative',
      borderRightWidth: 3,
      borderRightColor: appColors.primary,
      borderRadius: 6,
      backgroundColor: '#00439914',
    },

    iconContainer: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 100,
        width: SCREEN_WIDTH * 0.27, 
        height: SCREEN_WIDTH * 0.27, 
        ...external.mb_5,
      },

      sidebarImage: {
        width: SCREEN_WIDTH * 0.27, 
        height: SCREEN_WIDTH * 0.27, 
	},

  iconLayer: {
      backgroundColor: appColors.bgBlack,
      position: 'absolute',
        width: SCREEN_WIDTH * 0.27, 
        height: SCREEN_WIDTH * 0.27, 
      opacity: 0.06,
      zIndex: 1,
      top: 0,
      left: 0,
    },
});

export default styles;
