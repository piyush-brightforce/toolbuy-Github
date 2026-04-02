import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../../themes/appConstant';
import { external } from '../../../style/external.css';

const styles = StyleSheet.create({
	container: {
		...external.fd_row,
		...external.ai_center,
		...external.js_space,
		marginHorizontal: windowHeight(8),
		padding: 1
	},
	img: {
		width: windowWidth(140),
		height: windowHeight(30),
		resizeMode: 'contain',
	},
});

export default styles;
