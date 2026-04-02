import { StyleSheet } from 'react-native';
import appColors from '../../../themes/appColors';
import {
    fontSizes,
    windowHeight,
    windowWidth,
} from '../../../themes/appConstant';
import { external } from '../../../style/external.css';
import appFonts from '../../../themes/appFonts';

const styles = StyleSheet.create({
    categoryContent: {
        ...external.fd_row,
        height: windowHeight(572),
        borderTopColor: appColors.borderLight,
        borderTopWidth: 1,
    },
    leftContent: {
        width: windowWidth(155),
    },
    sidebar: {
        position: 'relative',
    },
    sidebarItem: {
        position: 'relative',
        ...external.fd_coloumn,
        ...external.ai_center, 
        ...external.pv_13,
        borderRightWidth: 3,
        borderRightColor: 'transparent',
        ...external.ph_5
    },
    activeSidebarItem: {
        position: 'relative',
        borderRightWidth: 3,
        borderRightColor: appColors.primary,
        borderRadius: 6,
        backgroundColor: '#00439914',
    },
    iconContainer: {
        overflow: 'hidden',
        borderRadius: 100,
        width: 60,
        height: 60,
    },
    sidebarImage: {
        width: 60,
        height: 60,
    },
    iconLayer: {
        backgroundColor: appColors.bgBlack,
        position: 'absolute',
        height: 60,
        width: 60,
        opacity: 0.06,
        zIndex: 1,
        top: 0,
        left: 0,
    },
    sidebarText: {
        color: appColors.titleText,
        fontFamily: appFonts.medium,
        fontSize: fontSizes.FONT18,
        fontWeight: '500',
        ...external.ph_8,
        ...external.fw_wrap,
        ...external.fs_1,
        ...external.width_100, 
        textAlign:'center'
    },
    rightContent: {
        ...external.fx_1,
        borderLeftWidth: 1,
        borderLeftColor: appColors.borderLight,
        ...external.p_10,
    },
    categoryHeader: {
        ...external.fd_row,
        ...external.js_space,
        ...external.ai_center,
        ...external.width_100,
        ...external.Pb_10
    },
    categoryName: {
        fontSize: fontSizes.FONT20,
        fontWeight: '600',
        color: appColors.titleText,
        fontFamily: appFonts.bold,
    },
    shopNow: {
        fontSize: fontSizes.FONT17,
        fontWeight: '500',
        color: appColors.primary,
        fontFamily: appFonts.medium,
        marginBottom: 1,
    }
});

export default styles;
