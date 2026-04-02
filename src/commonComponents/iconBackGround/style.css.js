import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../themes/appConstant';
import appColors from '../../themes/appColors';

const styles = StyleSheet.create({
	container: {
		width: windowWidth(50),
		height: windowHeight(30),
		alignItems: 'center',
		justifyContent: 'center',
		padding: 1,
		overflow: 'hidden',
		margin: 1
	},
	menuItemContent: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});

export default styles;
