import { StyleSheet } from 'react-native';
import { external } from '../../../style/external.css';
import { commonStyles } from '../../../style/commonStyle.css';
import appFonts from '../../../themes/appFonts';
import appColors from '../../../themes/appColors';
import { fontSizes } from '../../../themes/appConstant';

const styles = StyleSheet.create({
	container: {
		// ...external.mv_8,
	},
	contentRow: {
		position: 'relative',
		...external.fd_row,
		...external.p_5
	},
	iconContainer: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 100,
		width: 30,
		height: 30
	},
	icon: {
		position: 'relative',
		width: 30,
		height: 30,
		resizeMode: 'contain'
	},
	iconLayer: {
		backgroundColor: appColors.bgBlack,
		position: 'absolute',
		height: 30,
		width: 30,
		opacity: 0.06,
		zIndex: 1,
		top: 0,
		left: 0,
	},
	title: {
		color: appColors.titleText,
		fontFamily: appFonts.medium,
		fontSize: fontSizes.FONT18,
		fontWeight: '500',
		...external.ph_8,
		...external.mr_20,
		...external.fw_wrap,
		...external.fs_1
	},
	activeIcon: {
		transform: [{ rotate: '90deg' }],
	},
	activeBar: {
		backgroundColor: '#00439914',
		borderWidth: 1,
		borderRadius: 8,
		borderColor: appColors.primary,
	},
	activeBorder: {
	}
});

export default styles;