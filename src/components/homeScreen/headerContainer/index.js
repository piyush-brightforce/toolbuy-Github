import { Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { external } from '../../../style/external.css';
import IconBackground from '../../../commonComponents/iconBackGround';
import { Drawer, Notification, AccountCircle } from '../../../utils/icon';
import { useNavigation } from '@react-navigation/native';
import images from '../../../utils/images';
import styles from './style.css';
import appColors from '../../../themes/appColors';
import API_URL from '../../../config/apiConfig';
import { getValue, PREFERENCE_KEY } from '../../../utils/helper/localStorage';
import { ShoppingCartResponse } from '../../../models/cart/cartmodel';
import axios from 'axios';
import { useValues } from '../../../../App';
import CartIconWithBadge from '../../../commonComponents/cartIconWithbadge';

const HeaderContainer = ({ onPress }) => {
	const navigation = useNavigation();
	const {totalCartItem} = useValues();
	

	return (
		<View style={[styles.container]}>
			<View style={[external.fd_row, external.ai_center, external.fx_1]}>
				<IconBackground value={<Drawer height={28} width={28} color={appColors.textColorWhite} />} onPress={onPress} />
				<View style={[external.ml_5]}>
					<Image style={styles.img} source={images.logo} />
				</View>
			</View>

			<View style={[external.fd_row, external.ai_center]}>
				<IconBackground
					onPress={() => navigation.navigate('MyAccountScreen', {
						isFrom: "Home",
					})}
					value={<AccountCircle color={appColors.textColorWhite} />}
				/>
				<CartIconWithBadge/>
			</View>
		</View>
	);
};

export default HeaderContainer;
