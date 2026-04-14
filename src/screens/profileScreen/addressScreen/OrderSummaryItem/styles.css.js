import {StyleSheet} from 'react-native';
import appColors from '../../../../themes/appColors';
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../themes/appConstant';
import {external} from '../../../../style/external.css';
import appFonts from '../../../../themes/appFonts';
import {commonStyles} from '../../../../style/commonStyle.css';
const styles = StyleSheet.create({
  container: {
    marginBottom: windowHeight(13),
    flexDirection: 'row',
    padding: windowHeight(1),
    borderRadius: windowHeight(10),
    overflow: 'hidden',
    elevation: 1.5,
    margin: 1,
  },
  imageContainer: {
    height: windowHeight(100),
    width: windowWidth(100), 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth(100),
    height: windowHeight(100),
    resizeMode: 'contain',
  },
  textContainer: {
    ...external.mh_8,  
    ...external.fd_coloumn,
    flex:1
  },
  title: {
    color: appColors.titleText,
    fontSize: fontSizes.FONT17,
    fontFamily: appFonts.regular
  },
  headerTitle: { 
    color: appColors.titleText,
    fontSize: fontSizes.FONT16,
    fontFamily: appFonts.bold
  },
  mediumTitle: { 
    color: appColors.titleText,
    fontSize: fontSizes.FONT16,
    fontFamily: appFonts.regular
  },
  ratingContainer: {
    ...external.fd_row, 
    ...external.ai_center
  },
  ratingText: {
    ...commonStyles.subtitleText,
    ...external.mh_2,
    ...external.mt_3,
    color: '#FB9927',
    fontFamily: appFonts.bold,
  },
  subtitle: {
    ...commonStyles.subtitleText,
  },
  priceContainer: {
    ...external.fd_row,
    ...external.ai_center,
    ...external.mt_5,
  },
  price: {
    ...commonStyles.titleText19,
    fontSize: fontSizes.FONT19,
    fontFamily: appFonts.bold,
    fontWeight: '600',
  },
  discountPercentage: {
    ...commonStyles.titleText19,
    fontSize: fontSizes.FONT17,
    fontFamily: appFonts.regular, 
    color: appColors.red
  },
  percentageContainer: {
    ...external.js_space,
    ...external.fd_row,
    ...external.ai_center,
    ...external.pv_15,
    flex:1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: appColors.borderLight,
    marginVertical:windowHeight(10),
    paddingVertical: windowHeight(10),
    paddingHorizontal:windowHeight(5)
  },
  underlinePrice: {
    ...commonStyles.subtitleText,
    fontSize: fontSizes.FONT17,
    ...external.mh_2,
    textDecorationLine: 'line-through',
  },
  newArrivalContainer: {
    ...external.ph_20,
  },
  linearBorderStyle: {
    width: windowHeight(25),
    height: windowHeight(25),
    borderRadius: windowHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  showLinear: {
    width: 40,
    backgroundColor: appColors.bgLayer,
    position: 'absolute',
    right: 0,
    bottom: -20,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuItemContent: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: windowHeight(10),
    borderRadius: windowHeight(10),
  },
  // Quantity Selector
    quantityContainer: {
      ...external.fd_row,
      ...external.ai_center,
      borderRadius: windowHeight(30),
      overflow: 'hidden', 
      borderWidth:1,
      ...external.p_5,
    },
    quantityButton: {
        ...external.ai_center,
        ...external.js_center, 
        borderRadius: windowHeight(30),
        ...external.p_5,
      },
      quantityValueContainer: {
          minWidth: windowWidth(40),
          ...external.ai_center,
          ...external.js_center,
          ...appColors.textColorWhite,
          // paddingHorizontal: windowHeight(12),
          // paddingVertical: windowHeight(10),
        },
        quantityValue: {
            fontSize: fontSizes.FONT14,
            fontFamily: appFonts.medium,
            fontWeight: '600',
            color: appColors.textColorWhite,
            paddingLeft:4
          },
});

export default styles;
