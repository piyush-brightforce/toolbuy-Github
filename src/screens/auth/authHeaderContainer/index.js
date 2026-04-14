import { Image, View } from 'react-native';
import React from 'react';
import { external } from '../../../style/external.css';
import IconBackground from '../../../commonComponents/iconBackGround';
import {   Cross } from '../../../utils/icon';
import { useNavigation } from '@react-navigation/native';
import images from '../../../utils/images';
import styles from './style.css';
import appColors from '../../../themes/appColors';

const AuthHeaderContainer = () => {
	const navigation = useNavigation();

	return (
		<View style={[styles.container]}>
			<View style={[external.fd_row, external.ai_center,external.js_center, external.fx_1]}>
				
				<View style={[external.ml_5]}>
					<Image style={styles.img} source={images.logo} />
				</View>
			</View>

			<View style={[external.fd_row, external.ai_center]}>
			
				<IconBackground
					onPress={() => navigation.goBack()}
					value={<Cross height={26} width={26} color={appColors.textColorWhite} />}
				/>
			</View>
		</View>
	);
};

export default AuthHeaderContainer; 