import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
 import { useValues } from '../../../../../App';
import appColors from '../../../../themes/appColors';
import styles from './style.css';
import IMAGE_CONFIG from '../../../../config/imageConfig'; 
import { formatCurrency } from '../../../../style/rtlStyle';
import NavigationButton from '../../../../commonComponents/navigationButton';
import { DeleteIconG } from '../../../../assets/googleIcons/DeleteIcon';
import { external } from '../../../../style/external.css';

const PurchaseListCard = ({
	item, 
	onDeleteProduct = () => { }, 
}) => {
	
	const {
		textColorStyle,
		bgFullStyle,
		currSymbol,
		currPrice,
		currency,
		curreLocale,
		linearColorStyleTwo,
		t
	} = useValues();
 
	const sendDeleteData = (pid) => {
		const payload = {
			productId: pid, 
		};
 

		onDeleteProduct(payload);
	};


	return (
		<View style={[external.fx_1,external.mb_10]}>
			<TouchableOpacity
			activeOpacity={0.9} 
			style={[styles.container, { backgroundColor: bgFullStyle } ]}
		>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: `${IMAGE_CONFIG.BASE_URL}${item?.imagePath}` }}
					style={styles.productImage}
					resizeMode="contain"
				/>
				<TouchableOpacity
					onPress={() => sendDeleteData(item.productId)}
					style={styles.heartIcon}
					activeOpacity={0.7}
				>
					<DeleteIconG/>
 				</TouchableOpacity>
			</View>

			<View style={[styles.contentContainer, ]}>
				<View style={[ external.fd_row]}>
					<Text
							style={[styles.productTitle, { color: textColorStyle}]}
							numberOfLines={2}
						>
							{item?.productTitle}
						</Text>
				</View>
				<View style={[ external.fd_row]}>
					<Text
							style={[styles.productTitle ]}
							numberOfLines={2}
						>
							{item?.brandName}
						</Text>
				</View>

				<View style={styles.priceRow}>
					<Text style={[styles.currentPrice, { color: textColorStyle }]}>
					 
						{`${formatCurrency(item?.sellingPrice ?? "0", currency, curreLocale)}`} 
					</Text>
					{item?.listPrice && (
						<Text style={styles.originalPrice}> 
							{`${formatCurrency(item?.listPrice ?? "0", currency, curreLocale)}`}
						</Text>
					)}
				</View>

				{item?.discountPercent > 0 && (
					<Text style={styles.discountText}>
						{t('transData.SAVE').toUpperCase()} {item?.discountPercent}%
					</Text>
				)}
 
			</View>
		</TouchableOpacity>
		</View>
	);
};

export default PurchaseListCard;

