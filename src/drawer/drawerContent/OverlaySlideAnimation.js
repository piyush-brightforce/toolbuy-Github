import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import appColors from '../../themes/appColors';
import { external } from '../../style/external.css';
import { fontSizes, windowHeight } from '../../themes/appConstant';
import { ChevronLeft } from '../../utils/icon';
import { commonStyles } from '../../style/commonStyle.css';
import appFonts from '../../themes/appFonts';

const OverlaySlide = ({ children, visible, item, onClose, onPress }) => {
	const slideAnim = useRef(new Animated.Value(-300)).current; // start off-screen to the left

	useEffect(() => {
		if (visible) {
			Animated.timing(slideAnim, {
				toValue: 0, // move into view
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(slideAnim, {
				toValue: -305, // slide back left
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [visible]);

	return (
		<Animated.View
			style={[styles.overlayContainer,
			{ transform: [{ translateX: slideAnim }] }
			]}
		>
			<View style={[external.fx_1, styles.overlayContent]}>
				<View style={[external.fd_row, external.ai_center, styles.header]}>

					<View style={[external.fd_row, external.ai_center, external.fx_1]}>
						<TouchableOpacity onPress={onClose}>
							<ChevronLeft color={appColors.textColorWhite} />
						</TouchableOpacity>
						<Text style={styles.text} numberOfLines={1}>{item.CategoryName}</Text>
					</View>

					<TouchableOpacity style={styles.shopAllBtn} onPress={() => onPress(item)}>
						<Text style={styles.shopAllTxt}>Shop All</Text>
					</TouchableOpacity>
				</View>
				{children}
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	overlayContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		width: external.width_100,
		backgroundColor: 'rgba(0,0,0,0.4)', // semi-transparent background
		zIndex: 100,
	},
	overlayContent: {
		backgroundColor: '#fff',
		width: external.width_100,
		height: '100%'
	},
	header: {
		backgroundColor: appColors.primary,
		height: windowHeight(45),
		...external.fd_row,
		...external.ph_10,
		...external.pv_5,
		...external.ai_center
	},
	text: {
		fontSize: fontSizes.FONT22,
		fontWeight: '500',
		fontFamily: appFonts.medium,
		color: appColors.textColorWhite,
		...external.ph_10
	},
	shopAllBtn: {
		...external.ml_10
	},
	shopAllTxt: {
		fontSize: fontSizes.FONT18,
		fontWeight: '500',
		color: appColors.textColorWhite,
		fontFamily: appFonts.medium
	},
	contentRow: {
		borderBottomColor: appColors.bgLight,
		borderBottomWidth: 1,
		position: 'relative',
		...external.fd_row,
		...external.pv_10,
		...external.ph_10
	},
	iconContainer: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 100,
		width: 35,
		height: 35
	},
	icon: {
		position: 'relative',
		width: 35,
		height: 35,
		resizeMode: 'contain'
	},
	iconLayer: {
		backgroundColor: appColors.bgBlack,
		position: 'absolute',
		height: 50,
		width: 50,
		opacity: 0.06,
		zIndex: 1,
		top: 0,
		left: 0
	},
	title: {
		color: appColors.titleText,
		...commonStyles.titleText19,
		...external.ph_8,
		...external.mr_20,
		...external.fw_wrap,
		...external.fs_1
	}
});

export default OverlaySlide;