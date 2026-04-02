import { ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderContainer from '../../components/homeScreen/headerContainer';
import SearchContainer from '../../components/homeScreen/searchContainer';
import styles from './style.css';
import { external } from '../../style/external.css';
import { useValues } from '../../../App';
import ProductSwiper from '../../components/homeScreen/productSwiper';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../../style/commonStyle.css';
import TopDepartmentContainer from '../../components/homeScreen/topDepartmentContainer';
import TopDealOfTheMonthContainer from '../../components/homeScreen/topDealsOftheMonth';
import CarouselContainer from '../../components/homeScreenTwo/carouselContainer'; 
import appColors from '../../themes/appColors';
import { getValue, PREFERENCE_KEY } from '../../utils/helper/localStorage';
import API_URL from '../../config/apiConfig';
import { ShoppingCartResponse } from '../../models/cart/cartmodel';
import axios from 'axios';
 

const HomeScreen = () => {
	const navigation = useNavigation();

	const [search, setSearch] = useState('');
	const {settotalCartItem} = useValues();
	
	useEffect(() => {


		const fetchCartData = async () => {
			try {

				// ✅ wait for async value
				const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
				const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);

				const customerUserID = Number(id); 

				const response = await axios.post(API_URL.GETSHOPPINGCART, {
					CustomerID: customerUserID,
					CartSessionID: (!customerUserID || customerUserID === 0) ? cartid ?? "" : "",
				}); 
				const cartListModelData = new ShoppingCartResponse(response.data);
				if (cartListModelData.success) {
					settotalCartItem(cartListModelData.shoppingCartMaster.totalItems ?? 0);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchCartData();

	});

	return (
		<View style={{backgroundColor: appColors.textColorWhite}}>

			<View style={commonStyles.Header}>
				<HeaderContainer onPress={() => navigation.openDrawer()} />
				<SearchContainer show={true} onSendData={(value) => {
					setSearch(value); 
				}} />
			</View>
			{search === "" && <ScrollView
				contentContainerStyle={[external.Pb_80]}
				style={[{ backgroundColor: appColors.textColorWhite }]}
				showsVerticalScrollIndicator={false}>

				<CarouselContainer />
				<TopDealOfTheMonthContainer />
				{/* <ProductSwiper onSendData={(value) => setSelectedItem(value)} /> */}
				{/* <ConditionalItems /> */}
				<TopDepartmentContainer />
			</ScrollView>}

		</View>

	);
};
export default HomeScreen;
