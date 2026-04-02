import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../themes/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingBottom: windowHeight(14),
    paddingTop: windowHeight(24),
  },
  column: {
    flex: 1,
    flexDirection: 'column', // 👈 makes children stack vertically   // horizontal alignment
  },
});

export default styles;
