import { StyleSheet } from 'react-native';
import appFonts from '../../../themes/appFonts';
import { external } from '../../../style/external.css';
import { commonStyles } from '../../../style/commonStyle.css';
import appColors from '../../../themes/appColors';
import { fontSizes, SCREEN_WIDTH, windowHeight, windowWidth } from '../../../themes/appConstant';

const styles = StyleSheet.create({
	brandSection: {
		marginTop: windowHeight(10),
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
	brandText: {
		...commonStyles.titleText19,
		fontSize: fontSizes.FONT18,
		fontFamily: appFonts.semiBold,
		marginRight: windowWidth(5),
	},
	brandLogoContent: {
		height: 50,
		width: 100,
		backgroundColor: appColors.bgLight,
		borderRadius: 5,
		...external.p_5
	},
	brandLogo: {
		height: windowWidth(50),
		width: windowWidth(100),
	},
	visitStoreText: {
		fontSize: fontSizes.FONT21,
		lineHeight: windowHeight(22),
		fontWeight: '600',
		fontFamily: appFonts.bold,
		color: appColors.primary,
		paddingLeft:windowWidth(15)
	},
	imageContainer: {
		marginTop: windowHeight(15),
		paddingHorizontal: windowWidth(20),
	},
	mainImageContainer: {
		width: '100%',
		height: windowHeight(200),
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		backgroundColor: '#F3F5FB',
		borderRadius: windowHeight(10),
	},
	mainImage: {
		// width: SCREEN_WIDTH,
		height: SCREEN_WIDTH,
		resizeMode: 'contain',
		alignItems: 'center',
		justifyContent: 'center',
	},

	imageActions: {
		right: windowWidth(15),
		left: windowWidth(15),
		top: windowHeight(15),
		flexDirection: 'column',
	},
	actionIcon: {
		width: windowWidth(35),
		height: windowWidth(35),
		borderRadius: windowWidth(17.5),
		backgroundColor: appColors.screenBg,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: windowHeight(10),
		marginLeft: 20,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
	},
	actionIcon1: {
		width: windowWidth(35),
		height: windowWidth(35),
		borderRadius: windowWidth(17.5),
		backgroundColor: appColors.screenBg,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: windowHeight(10), 
		marginRight:windowHeight(5),
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
	},
	actionIconText: {
		fontSize: fontSizes.FONT16,
	},
	thumbnailContainer: {
		marginTop: windowHeight(15),
		flexDirection: 'row',
	},
	thumbnail: {
		width: windowWidth(60),
		height: windowWidth(60),
		borderRadius: windowHeight(8),
		marginRight: windowWidth(10),
		borderWidth: 2,
		borderColor: 'transparent',
		overflow: 'hidden',
	},
	thumbnailSelected: {
		borderColor: appColors.primary,
	},
	thumbnailImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	gradeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: windowHeight(10),
		paddingHorizontal: windowWidth(15),
		backgroundColor: appColors.screenBg,
		borderRadius: windowHeight(8),
		borderWidth: 1,
		borderColor: appColors.cardBorder,
	},
	gradeText: {
		...commonStyles.subtitleText,
		fontSize: fontSizes.FONT15,
	},
	priceText: {
		...commonStyles.titleText19,
		fontSize: fontSizes.FONT20,
		fontFamily: appFonts.semiBold,
	},
	mrpText: {
		...commonStyles.subtitleText,
		fontSize: fontSizes.FONT15,
		textDecorationLine: 'line-through',
		marginRight: windowWidth(10),
	},
	saveBadge: {
		backgroundColor: '#FDDBDB',
		borderRadius: windowHeight(4),
		paddingHorizontal: windowWidth(8),
		paddingVertical: windowHeight(3),
	},
	saveText: {
		...commonStyles.titleText19,
		fontSize: fontSizes.FONT15,
		color: appColors.red,
		fontFamily: appFonts.medium,
	},
	documentItem: {
		alignItems: 'center', 
		flex: 1,
	},
	documentIcon: {
		fontSize: fontSizes.FONT24,
		marginBottom: windowHeight(5),
		paddingRight: windowWidth(5)
	},
	benefitItem: {
		
    	flexWrap: 'wrap',

		marginBottom: windowHeight(5),
	},
	benefitIcon: {
		fontSize: fontSizes.FONT24,
		paddingRight: windowWidth(5)
	},
	tab: {
		paddingVertical: windowHeight(10),
		paddingHorizontal: windowWidth(20),
		borderBottomWidth: 2,
		borderBottomColor: 'transparent',
		marginRight: windowWidth(20),
	},
	tabActive: {
		borderBottomColor: appColors.primary,
	},
	tabText: {
		...commonStyles.titleText19,
		fontSize: fontSizes.FONT16,
		fontFamily: appFonts.regular,
	},
	tabTextActive: {
		fontFamily: appFonts.semiBold,
		color: appColors.primary,
	},
	tabContent: {
		marginTop: windowHeight(15),
		paddingBottom: windowHeight(10),
	},
	buyNowText: {
		...commonStyles.titleText19,
		color: appColors.screenBg,
		fontSize: fontSizes.FONT21,
		paddingHorizontal: windowHeight(3),
	},
	addToBeg: {
		...commonStyles.H1Banner,
		fontSize: fontSizes.FONT21,
		color: appColors.titleText,
	},
	bottomContainerView: {
		flex: 1,
		justifyContent: 'flex-end',
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
	newrow: {
		justifyContent: 'space-between',
	},

	container: {
		marginVertical: 5,
		overflow: 'hidden',
		borderColor: '#ddd',
	},
	row: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 10,
	},

	headerText: {
		fontFamily: appFonts.bold

	},
	cell: {
		flex: 1,
		fontSize: fontSizes.FONT14,
		fontFamily: appFonts.medium
	},
	evenRow: {
		backgroundColor: appColors.bgLayout,
	},
	oddRow: {
		backgroundColor: '#ffffff',
	},


	//   Quantity
	quantityContainer: {
		...external.fd_row,
		...external.ai_center,
		...external.as_start,
		borderRadius: windowHeight(30),
		overflow: 'hidden',
		
	  borderWidth:1,
		...external.p_5,
		...external.ml_10
	},
	quantityButton: {
		...external.ai_center,
		...external.js_center, 
		borderRadius: windowHeight(30),
		backgroundColor: appColors.textColorBlack,
		...external.p_5,
	}, quantityValueContainer: {
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
 
	outOfStockButton: {
		
		...external.ai_center,
		...external.js_center,
		borderWidth: 1,
		borderColor: appColors.red,
		borderRadius: windowHeight(30),
		...external.mh_20,
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
		quantityContainer1: {
			...external.fd_row,
			...external.ai_center,
			...external.as_start,
			borderRadius: windowHeight(30),
			overflow: 'hidden',
			backgroundColor: appColors.primary,
			...external.p_5,
		},
		quantityButton1: {
			...external.ai_center,
			...external.js_center,
			backgroundColor: appColors.primaryDark,
			borderRadius: windowHeight(30),
			...external.p_5,
		},
		quantityValueContainer1: {
			minWidth: windowWidth(85),
			...external.ai_center,
			...external.js_center,
			...appColors.textColorWhite,
			// paddingHorizontal: windowHeight(12),
			// paddingVertical: windowHeight(10),
		},
		quantityValue1: {
			fontSize: fontSizes.FONT18,
			fontFamily: appFonts.medium,
			fontWeight: '600',
			color: appColors.textColorWhite,
		},
});

export default styles;
