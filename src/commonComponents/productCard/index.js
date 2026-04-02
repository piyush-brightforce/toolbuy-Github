import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Favorite, RemoveG, AddG } from '../../utils/icon';
import { useValues } from '../../../App';
import appColors from '../../themes/appColors';
import styles from './style.css';
import IMAGE_CONFIG from '../../config/imageConfig';
import NavigationButton from '../navigationButton';
import { formatCurrency } from '../../style/rtlStyle';

const ProductCard = ({
	item,
	onPress,
	onWishlistPress,
	onAddToCart,
	onQuantityChange = () => { },
	isCartloading
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

	const buttonState = item?.qty > 0 && item?.cartProduct === 0 ? 'addToCart' : item?.qty === 0 ? 'outOfStock' : item?.cartProduct > 0 ? 'quantity' : '';


	const sendQuantityData = ({ pid, status }) => {
		const payload = {
			productId: pid,
			action: status,
		};
 
		onQuantityChange(payload);
	};


	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPress}
			style={[styles.container, { backgroundColor: bgFullStyle }]}
		>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: `${IMAGE_CONFIG.BASE_URL}${item?.imagePath}` }}
					style={styles.productImage}
					resizeMode="contain"
				/>
				<TouchableOpacity
					onPress={onWishlistPress}
					style={styles.heartIcon}
					activeOpacity={0.7}
				>
					<Favorite />
				</TouchableOpacity>
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.headerRow}>
					<View style={styles.titleContainer}>
						<Text
							style={[styles.productTitle, { color: textColorStyle }]}
							numberOfLines={2}
						>
							{item?.productTitle}
						</Text>
					</View>
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

				<View style={styles.actionContainer}>
					{(buttonState === 'addToCart' && item?.isSeries === false) &&
						(isCartloading ? <View style={{ paddingRight: 60 }}>
							<NavigationButton isLoading={isCartloading} color={appColors.screenBg}
								backgroundColor={appColors.primary} />
						</View> : <TouchableOpacity
							onPress={onAddToCart}
							activeOpacity={0.8}
							style={styles.addToCartButton}
						>
							<View
								colors={appColors.primary}
								style={[styles.addToCartGradient]}
							>
								<AddG color={appColors.textColorWhite} height={20} width={20} />
								<Text style={styles.addToCartText}>{t('transData.ADD_TO_CART')}</Text>
							</View>
						</TouchableOpacity>)
					}

					{(item?.isSeries === false && buttonState === 'outOfStock') && (
						<View style={styles.outOfStockButton}>
							<Text style={styles.outOfStockText}>
								{t('transData.OUT_OF_STOCK')}
							</Text>
						</View>
					)}

					{buttonState === 'quantity' &&
						(isCartloading ? <View style={{ paddingRight: 60 }}>
							<NavigationButton isLoading={isCartloading} color={appColors.screenBg}
								backgroundColor={appColors.primary} />
						</View> : <View style={styles.quantityContainer}>
							<TouchableOpacity
								onPress={() => {
									sendQuantityData({ pid: item?.productID, status: '' });
								}}
								activeOpacity={0.7}
								style={[styles.quantityButton]}
							>
								<RemoveG color={appColors.textColorWhite} height={20} width={20} />
							</TouchableOpacity>
							<View style={styles.quantityValueContainer}>
								<Text style={[styles.quantityValue]}>
									{item?.cartProduct}
								</Text>
							</View>
							<TouchableOpacity
								onPress={() => {
									sendQuantityData({ pid: item?.productID, status: 'insert' });
								}}
								activeOpacity={0.7}
								style={styles.quantityButton}
							>
								<AddG color={appColors.textColorWhite} height={20} width={20} />
							</TouchableOpacity>
						</View>)
					}

					{item?.isSeries === true && (
						<View
							activeOpacity={0.8}
							style={styles.viewSeriesButton}
						>
							<Text style={styles.viewSeriesText}>
								{t('transData.VIEW_SERIES')}
							</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ProductCard;

