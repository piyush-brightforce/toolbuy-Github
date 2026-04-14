import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight } from '../themes/appConstant';
import appColors from '../themes/appColors';
import appFonts from '../themes/appFonts';
import { external } from './external.css';

const commonStyles = StyleSheet.create({
	container: {
		fontWeight: '500',
		fontSize: fontSizes.FONT27,
		lineHeight: windowHeight(23),
		color: appColors.titleText,
		fontFamily: appFonts.LargeButtonMedium,
	},
	subtitleText: {
		fontWeight: '400',
		fontSize: fontSizes.FONT18,
		lineHeight: windowHeight(18),
		color: '#9BA6B8',
		fontFamily: appFonts.regular,
	},
	titleText19: {
		fontFamily: appFonts.medium,
		fontSize: fontSizes.FONT19,
		fontWeight: '500',
		lineHeight: windowHeight(21),
		color: appColors.titleText
	},
	titleText18: {
		fontWeight: '500',
		fontSize: fontSizes.FONT18,
		lineHeight: windowHeight(21),
		color: appColors.titleText,
		fontFamily: appFonts.medium,
	},
	H1Banner: {
		fontWeight: '600',
		fontSize: fontSizes.FONT21,
		lineHeight: windowHeight(21),
		color: appColors.screenBg,
		fontFamily: appFonts.medium,
	},
	hederH2: {
		fontWeight: '500',
		fontSize: fontSizes.FONT21,
		lineHeight: windowHeight(21),
		color: appColors.titleText,
		fontFamily: appFonts.medium,
	},
	commonContainer: {
		...external.fx_1,
		backgroundColor: '#FDFDFD',
	},

	// DRAWER MENU ROWS ITEMS
	DcontentRow: {
		borderBottomColor: appColors.bgLight,
		borderBottomWidth: 1,
		position: 'relative',
		...external.fd_row,
		...external.pv_13,
		...external.ph_10
	},
	DIconContainer: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 100,
		width: 35,
		height: 35
	},
	DIcon: {
		position: 'relative',
		width: 35,
		height: 35,
		resizeMode: 'contain'
	},
	DIconLayer: {
		backgroundColor: appColors.bgBlack,
		position: 'absolute',
		height: 50,
		width: 50,
		opacity: 0.06,
		zIndex: 1,
		top: 0,
		left: 0,
	},
	DTitle: {
		color: appColors.titleText,
		fontFamily: appFonts.medium,
		fontSize: fontSizes.FONT19,
		fontWeight: '500',
		...external.ph_8,
		...external.mr_20,
		...external.fw_wrap,
		...external.fs_1
	},
	Header: {
		backgroundColor: appColors.primary,
		...external.pv_15,
	},
});
export { commonStyles };