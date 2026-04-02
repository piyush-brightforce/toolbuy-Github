import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth, fontSizes } from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
import appFonts from '../../../themes/appFonts';
import { external } from '../../../style/external.css';

const styles = StyleSheet.create({
	container: {
		...external.fd_row,
		backgroundColor: appColors.screenBg,
		...external.p_10,
		borderBottomWidth: 1,
		borderBottomColor: appColors.borderLight
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
		fontFamily: appFonts.regular,
		fontWeight: '500',
		color: appColors.titleText,
		lineHeight: windowHeight(20),
	},
	heartIcon: {
		position: 'absolute',
		top: windowHeight(0),
		right: windowHeight(0),
		padding: windowHeight(2),
		zIndex: 1,
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
	originalPrice: {
		fontSize: fontSizes.FONT15,
		fontFamily: appFonts.regular,
		color: appColors.subtitle,
		textDecorationLine: 'line-through',
	},
	discountText: {
		fontSize: fontSizes.FONT13,
		fontFamily: appFonts.medium,
		fontWeight: '500',
		color: appColors.red,
		marginBottom: windowHeight(8),
	},
	actionContainer: {
		marginTop: windowHeight(4),
	}, 
	addToCartButton: {
		...external.as_start,
		borderRadius: windowHeight(30),
		overflow: 'hidden',
		backgroundColor: appColors.primary,
	},
	addToCartGradient: {
		...external.fd_row,
		...external.ai_center,
		...external.ph_20,
		borderRadius: windowHeight(10),
	},
	addToCartText: {
		fontSize: fontSizes.FONT18,
		fontFamily: appFonts.bold,
		color: appColors.textColorWhite,
		marginLeft: windowHeight(6),
		lineHeight: 45,
		top: -1
	}, 
	outOfStockButton: {
		...external.as_start,
		borderWidth: 1,
		borderColor: appColors.red,
		borderRadius: windowHeight(30),
		...external.ph_20,
	},
	outOfStockText: {
		fontSize: fontSizes.FONT18,
		fontFamily: appFonts.bold,
		color: appColors.textColorWhite,
		marginLeft: windowHeight(6),
		lineHeight: 42,
		color: appColors.red,
		top: -1
	},
	// Quantity Selector
	quantityContainer: {
		...external.fd_row,
		...external.ai_center,
		...external.as_start,
		borderRadius: windowHeight(30),
		overflow: 'hidden',
		backgroundColor: appColors.primary,
		...external.p_5,
	},
	quantityButton: {
		...external.ai_center,
		...external.js_center,
		backgroundColor: appColors.primaryDark,
		borderRadius: windowHeight(30),
		...external.p_5,
	},
	quantityValueContainer: {
		minWidth: windowWidth(85),
		...external.ai_center,
		...external.js_center,
		...appColors.textColorWhite,
		// paddingHorizontal: windowHeight(12),
		// paddingVertical: windowHeight(10),
	},
	quantityValue: {
		fontSize: fontSizes.FONT18,
		fontFamily: appFonts.medium,
		fontWeight: '600',
		color: appColors.textColorWhite,
	}, 
	viewSeriesButton: {
		...external.as_start,
		borderWidth: 1,
		borderColor: appColors.titleText,
		borderRadius: windowHeight(30),
		...external.ph_20,
		...external.mt_5
	},
	viewSeriesText: {
		fontSize: fontSizes.FONT18,
		fontFamily: appFonts.bold,
		color: appColors.titleText,
		lineHeight: 42,
		top: -1
	},
});

export default styles;

