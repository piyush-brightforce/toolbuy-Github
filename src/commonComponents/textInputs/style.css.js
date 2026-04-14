import {StyleSheet} from 'react-native';
import appColors from '../../themes/appColors';
import {fontSizes, windowHeight} from '../../themes/appConstant';
import {external} from '../../style/external.css';
import {commonStyles} from '../../style/commonStyle.css';
const styles = StyleSheet.create({
  headingContainer: {
    ...commonStyles.titleText19,
  },
   label: {
    position: "absolute",
    top: -1,
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: windowHeight(5),
    fontSize: fontSizes.FONT12,
    color: "#555",
    zIndex: 1,
  },
  textInputView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: windowHeight(4),
    borderRadius: windowHeight(5),
    ...external.fd_row,
    ...external.ai_center,
    ...external.js_space,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderWidth: 0.5,
  },
  textInput: {
    paddingHorizontal: windowHeight(10),
    color: appColors.titleText,
  },
  withoutShow: {
    height: windowHeight(40),
    marginTop: windowHeight(6),
    borderRadius: windowHeight(5),
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    overflow: 'hidden',
  },
  menuItemContent: {
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;


