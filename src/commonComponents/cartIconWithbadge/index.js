
import {  Text, View } from 'react-native';
import React from 'react';  
import { CartIconG } from '../../utils/icon';
import { useNavigation } from '@react-navigation/native';
import styles from './style.css'; 
import { useValues } from '../../../App';
import IconBackground from '../iconBackGround';
import appColors from '../../themes/appColors';

const CartIconWithBadge = () => {
	const navigation = useNavigation();
	const {totalCartItem} = useValues();
	

	return (
		<IconBackground
					onPress={() => navigation.navigate('AddtocartOne', {
						isFrom: "Home",
					})}
					value={<View style={styles.iconContainer}>
						<CartIconG height={26} width={26} color={appColors.textColorWhite} />

						{/* Badge */}
						<View style={styles.badge}>
							<Text style={styles.badgeText}>{totalCartItem}</Text>
						</View>
					</View>}
				/>
	);
};

export default CartIconWithBadge;
