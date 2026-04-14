import {StyleSheet} from 'react-native';
import {windowHeight} from '../../themes/appConstant';
import appColors from '../../themes/appColors';
import { external } from '../../style/external.css';

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.screenBg,

    ...external.mh_10,
    marginVertical: 10,
    borderRadius: windowHeight(6),
    padding: 1,
    elevation: 1,
    overflow: 'hidden',
  },
  menuItemContent: {
    borderRadius: windowHeight(6),
    width: '100%',
    flex: 1,
    paddingVertical: windowHeight(10),
  },
});
export {styles};
