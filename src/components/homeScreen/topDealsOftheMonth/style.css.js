import { StyleSheet } from 'react-native';
import { external } from '../../../style/external.css';
import { commonStyles } from '../../../style/commonStyle.css';
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../themes/appConstant';
import appFonts from '../../../themes/appFonts';

import appColors from '../../../themes/appColors';

const styles = StyleSheet.create({

  container: {
    ...external.fd_row,
    backgroundColor: appColors.screenBg,
    ...external.p_10,
    borderBottomColor: appColors.borderLight
  },
  imageContainer: {
    width: windowWidth(120),
    height: windowWidth(120),
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
  seeAllText: {
    color: appColors.primary,
    fontSize: fontSizes.FONT14,
    fontFamily: appFonts.semiBold,
  },
  contentContainer: {
    ...external.fx_1,
  },
  headerRow: {
    ...external.fd_row,
    ...external.js_space,
    ...external.as_start,
    marginBottom: windowHeight(5),
  },
  titleContainer: {
    ...external.fx_1,
    marginRight: windowHeight(8),
  },
  productTitle: {
    fontSize: fontSizes.FONT18,
    fontFamily: appFonts.medium,
    fontWeight: '500',
    color: appColors.titleText,
    lineHeight: windowHeight(20),
  },
  priceRow: {
    ...external.fd_row,
    ...external.ai_center,
    marginBottom: windowHeight(4),
  },
  currentPrice: {
    fontSize: fontSizes.FONT19,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
    color: appColors.titleText,
    marginRight: windowHeight(8),
  },

  title: {
    fontSize: fontSizes.FONT19,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
    color: appColors.titleText,
    marginRight: windowHeight(8),
  },
  originalPrice: {
    fontSize: fontSizes.FONT15,
    fontFamily: appFonts.regular,
    color: appColors.subtitle,
    textDecorationLine: 'line-through',
  },
});

export default styles;