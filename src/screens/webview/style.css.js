import { StyleSheet } from 'react-native'; 
import appColors from '../../themes/appColors';
import { commonStyles } from '../../style/commonStyle.css'; 

const styles = StyleSheet.create({
    
    title: {
        ...commonStyles.H1Banner,
        color: appColors.textColorWhite
    },
    
});

export default styles;
