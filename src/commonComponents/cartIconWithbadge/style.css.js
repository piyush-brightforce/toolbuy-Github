import { StyleSheet } from 'react-native';  
import appColors from '../../themes/appColors';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
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
