import { StyleSheet } from 'react-native';
import { external } from '../../../style/external.css';
import appColors from '../../../themes/appColors';
import { commonStyles } from '../../../style/commonStyle.css';
import { fontSizes } from '../../../themes/appConstant';

const styles = StyleSheet.create({
	container: {
		...external.pv_10,
		borderBottomWidth: 1,
		borderBottomColor: appColors.borderLight,
		backgroundColor: appColors.screenBg,
		elevation: 2,

		shadowColor: appColors.bgBlack,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.10,
		shadowRadius: 2,

	},
	scrollContainer: {
		...external.ph_10,
	},
	filterButton: {
		...external.fd_row,
		...external.ai_center,
		...external.pv_10,
		...external.ph_13,
		borderRadius: 40,
		borderWidth: 1,
		borderColor: appColors.borderLight,
		...external.mr_10
	},
	filterText: {
		...fontSizes.FONT16,
		color: appColors.textColorBlack,
	},
});

export default styles;