import {
	FlatList, View, TouchableOpacity, ScrollView,
	Text,
	Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react'; 
import { useValues } from '../../../../../App';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import API_URL from '../../../../config/apiConfig';
import { external } from '../../../../style/external.css'; 

import { getValue, PREFERENCE_KEY } from '../../../../utils/helper/localStorage';
import { PurchaseListResponse } from '../../../../models/purchaselist/purchaselistmodel'; 
import ProductHeaderContainer from '../../../productScreen/productHeaderContainer';
import PurchaseListCard from '../purchaseListItem';

const PurchaseDetailsListContainer = ({ route }) => {

	const navigation = useNavigation();
	const { item } = route?.params ?? {};
	const [purchaseList, setPurchaseList] = useState();

	//  React to changes
	useEffect(() => { 
		const initialize = async () => {
			if(item){ 
				await fetchPurchaseListingData();
			}
		};

		initialize();
	}, [item]);


	const fetchPurchaseListingData = async () => {

		try {

			const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID); 
			const customerUserID = Number(id);
			const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);
		 

			const response = await axios.post(`${API_URL.GETPURCHASELIST}`,
				{
					CustomerID: customerUserID,
					CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '',
				 
				});

			const data = response.data;

			const model = new PurchaseListResponse(data);
				
			const filterlist = model?.result?.purchaseListProduct?.filter(
  product => product?.purchaseListMasterID === item?.purchaseListMasterID
)
			setPurchaseList(filterlist);


		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};


	const deletePurchaseListingData = async (productId, purchasemasterid) => {

		try {

			const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID); 
			const customerUserID = Number(id);
		 

			const response = await axios.post(`${API_URL.DELETEPURCHASELIST}`,
				{
					CustomerID: customerUserID,
					CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '',
					ProductID:productId ?? 0,
					PurchaseListMasterID:purchasemasterid ?? 0
				});


			const data = response.data;
				if(data.Success){
					await fetchPurchaseListingData();
				}

		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	const renderItem = ({ item }) => (
		<PurchaseListCard item={item} onDeleteProduct={(val)=> { 
			deletePurchaseListingData(val?.productId,0);

		}}	/>
	); 
	return (
		
		<View style={[{ flex: 1, }, external.fd_coloumn]}>
			<ProductHeaderContainer
					title={item?.listName} type={'title'} righticon={false} onPress={() => navigation.goBack()}
				/> 
			 <View style={[external.ph_5,external.mt_10, { flex: 1 }]}>
    <FlatList
      data={purchaseList} // ✅ only filtered data
     keyExtractor={(item) =>
  `${item.productId}-${item.purchaseListMasterID}`
}
      renderItem={renderItem} 
	  
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={true}
    />
  </View>
		</View>

	);


};

export default PurchaseDetailsListContainer;
