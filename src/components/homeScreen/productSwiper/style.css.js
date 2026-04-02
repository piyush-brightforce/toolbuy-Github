import {StyleSheet} from 'react-native';
import appColors from '../../../themes/appColors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectedMenuItemText: {
    color: appColors.screenBg,
  },
column: {
    flex: 1,
    flexDirection: 'column', // 👈 makes children stack vertically
    justifyContent: 'center', // vertical alignment (main axis in column)
    alignItems: 'center',     // horizontal alignment
  },
  selectedMenuItem: {
    backgroundColor: appColors.primary,
    borderRadius: 6,
  },
});

export default styles;
