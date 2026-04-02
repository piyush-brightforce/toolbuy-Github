import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Favorite, RemoveG, AddG } from '../../../utils/icon';
import { useValues } from '../../../../App';
import appColors from '../../../themes/appColors';
import styles from './style.css';
import IMAGE_CONFIG from '../../../config/imageConfig';
import CommonImage from '../ProductListing/commonImage';
import { commonStyles } from '../../../style/commonStyle.css';
import { fontSizes } from '../../../themes/appConstant';
import NavigationButton from '../../../commonComponents/navigationButton';
import { formatCurrency } from '../../../style/rtlStyle';

const SeriesProductCard = ({
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
		currency,
		curreLocale,
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

				<CommonImage uri={`${IMAGE_CONFIG.BASE_URL}${item.imagePath}`} style={styles.productImage} />
				<TouchableOpacity
					onPress={onWishlistPress}
					style={styles.heartIcon}
					activeOpacity={0.7}
				>
				</TouchableOpacity>
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.headerRow}>
					<View style={styles.titleContainer}>
						<Text
							style={[styles.productTitle, { color: textColorStyle }]}
							numberOfLines={2}
						>
							{item.sku}
						</Text>
					</View>
				</View>
				{item?.mainPrice && <Text
					style={[
						commonStyles.subtitleText,
						{ color: textColorStyle, fontSize: fontSizes.FONT14 },
					]}
				>
					{`${formatCurrency(item?.mainPrice ?? "0", currency, curreLocale)} (Incl. of all taxes)`}
				</Text>}

				<View style={styles.priceRow}>
					<Text style={[styles.currentPrice, { color: textColorStyle }]}>
						{currSymbol}{item.finalPrice}
					</Text>
					{item.listPrice && (
						<Text style={styles.originalPrice}> 
							{`${formatCurrency(item?.listPrice ?? "0", currency, curreLocale)}`}
						</Text>
					)}
				</View>

				{item.discountPercent > 0 && (
					<Text style={styles.discountText}>
						{t('transData.SAVE').toUpperCase()} {item.discountPercent}%
					</Text>
				)}

				<View style={styles.actionContainer}>


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
									{Number(item?.cartProduct)}
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



					{buttonState === 'addToCart'  &&
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


					{item.qty === 0 && (
						<View style={styles.outOfStockButton}>
							<Text style={styles.outOfStockText}>
								{t('transData.OUT_OF_STOCK')}
							</Text>
						</View>
					)}
					
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default SeriesProductCard;

