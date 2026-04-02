import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../../themes/appConstant';
import { external } from '../../../style/external.css';
import appColors from '../../../themes/appColors';

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
	 iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: appColors.primaryYellow,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default styles;
