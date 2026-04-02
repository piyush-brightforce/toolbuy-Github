import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './style.css';
import { windowHeight } from '../../themes/appConstant';

const IconBackground = ({ onPress, value, height }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onPress}
			style={[{ height: height || windowHeight(30) }]}>
			<View
				style={[styles.container]}>
				<View
					style={styles.menuItemContent}>
					{value}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default IconBackground;
