import { StyleSheet } from 'react-native'; 
import { fontSizes, windowHeight, windowWidth } from '../../../themes/appConstant'; 
import appFonts from '../../../themes/appFonts';
import { external } from '../../../style/external.css';
import appColors from '../../../themes/appColors';

const styles = StyleSheet.create({
	container: {
		...external.fd_row,
		...external.ai_center,
		marginTop: windowHeight(10),
		borderRadius: windowHeight(40), 
		marginRight: windowHeight(16),
		padding: 1,
		overflow: 'hidden',
	},
	menuItemContent: {
		borderRadius: windowHeight(40),
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: appColors.screenBg,
		height: windowHeight(38),
		paddingHorizontal: windowWidth(8),
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		...external.fx_1,
		...external.ph_10
	},
	searchText: {
		...external.fx_1,
		fontFamily: appFonts.regular,
		fontSize: fontSizes.FONT19
	},
	searchIconStyle: {
		backgroundColor: appColors.primaryYellow,
		borderRadius: windowHeight(40),
		height: windowHeight(30),
		width: windowHeight(30),
		alignItems: 'center',
		justifyContent: 'center'
	},
	containerView: {
	},
    
});

export default styles;
