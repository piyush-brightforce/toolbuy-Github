import { StyleSheet } from 'react-native';
import { fontSizes, SCREEN_WIDTH, windowHeight, windowWidth } from '../../../../themes/appConstant'; 
import appColors from '../../../../themes/appColors';
import { commonStyles } from '../../../../style/commonStyle.css';
import appFonts from '../../../../themes/appFonts';

const styles = StyleSheet.create({

  title: {
    ...commonStyles.titleText19,
    fontSize: fontSizes.FONT17,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
    width: SCREEN_WIDTH * 0.25,

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
    width: 100,
    height: 100,
  },

  sidebarImage: {
    width: 100,
    height: 100,
  },

  iconLayer: {
    backgroundColor: appColors.bgBlack,
    position: 'absolute',
    width: 100,
    height: 100,
    opacity: 0.06,
    zIndex: 1,
    top: 0,
    left: 0,
  },


  shopiconLayer: {
    backgroundColor: appColors.primary,
    position: 'absolute',
    width: 100,
    height: 100,
    opacity: 0.06,
    zIndex: 1,
    top: 0,
    left: 0,
  },

  // bottomsheet

  bottomsheetoverlay: { 
    flex:1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  
  bottomView: {
    // backgroundColor: "#fff",
    // padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer: {
		width: windowWidth(120),
		height: windowHeight(100),
		borderRadius: windowHeight(6),
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: windowHeight(12),
		position: 'relative',
	},
	productImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
priceContainer: {
    fontSize: fontSizes.FONT19,
        fontFamily: appFonts.semiBold,
        fontWeight: '600',
        color: appColors.titleText,
        marginRight: windowHeight(8),
  },
  productTitle: {
      fontSize: fontSizes.FONT18,
      fontFamily: appFonts.regular,
      fontWeight: '500',
      color: appColors.titleText,
      lineHeight: windowHeight(20),
    },
  bottomsheetContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  bottomSheetAnimatedView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "85%",
    backgroundColor: appColors.textColorWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden", 
  },

   sortbottomSheetAnimatedView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    backgroundColor: appColors.textColorWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden", 
  },
 
  bottomsheetBackground: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomsheetheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomsheettitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  bottomsheetclose: {
    fontSize: 22,
  },
  bottomsheetoptionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomsheetradioOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  bottomsheetradioSelectedOuter: {
    borderColor: "#1E5BB8",
  },
  bottomsheetradioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#1E5BB8",
  },
  bottomsheetoptionText: {
    fontSize: 16,
  },
  bottomsheetbutton: {
    backgroundColor: "#1E5BB8",
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  bottomsheetbuttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  }, 
});

export default styles;
