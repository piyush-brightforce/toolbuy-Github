import {
	FlatList, View, TouchableOpacity, ScrollView,
	Text,
	Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { commonStyles } from '../../../style/commonStyle.css';
import { useValues } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import styles from './style.css';
import axios from 'axios';
import API_URL from '../../../config/apiConfig';
import { external } from '../../../style/external.css';
import IMAGE_CONFIG from '../../../config/imageConfig';

import { getValue, PREFERENCE_KEY } from '../../../utils/helper/localStorage';
import { PurchaseListResponse } from '../../../models/purchaselist/purchaselistmodel';
import CommonImage from '../../productScreen/ProductListing/commonImage';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import appFonts from '../../../themes/appFonts';
import { fontSizes } from '../../../themes/appConstant';
import appColors from '../../../themes/appColors';
import { VisibilityIconG } from '../../../assets/googleIcons/VisibilityIcongG';
import { DeleteIconG } from '../../../assets/googleIcons/DeleteIcon';

const PurchaseListContainer = ({purchaseList,purchaseListProduct,oncallReturnDeletTag = () => {} }) => {

	const navigation = useNavigation();
	const { bgFullStyle, textColorStyle, settotalCartItem } = useValues();
 
	//  React to changes
	useEffect(() => {
		const initialize = async () => {
			await fetchPurchaseListingData();
		};

		initialize();
	}, []);


  const handleSendDeleteData = (pid, plId) => { 
     const payload = {
      productId: pid, 
      productListId: plId,
    };

    oncallReturnDeletTag(payload);
  };
 
	const renderItem = ({ item }) => (
		<View>
			
			<TouchableOpacity style={[
				commonStyles.commonContainer,
				external.m_5,

			]}>
				

				<View style={[{
					padding: 3,
				}]}>
					<View style={[styles.iconContainer]}>

						<CommonImage
							uri={`${IMAGE_CONFIG.BASE_URL}${item.imagePath}`}
							style={[styles.sidebarImage, {
							}]}
						/>

						<View style={styles.iconLayer}></View>
					</View>
				</View>
			</TouchableOpacity>
			
		</View>
	);


	return (
		<View style={[{ flex: 1, }, external.fd_coloumn]}>
			<View style={[external.mh_20, external.Pb_10]}>
				<H3HeadingCategory
					value={"Purchase List"}
				/>
			</View>

			{purchaseList?.map((item) => {
				const filteredProducts = purchaseListProduct.filter(
					product => product?.purchaseListMasterID === item?.purchaseListMasterID
				);


				return <View key={`${item.productId}-${item.purchaseListMasterID}`} style={[commonStyles.commonContainer, external.fd_coloumn, { backgroundColor: bgFullStyle },external.mb_10]}>
					<View style={[external.pt_10, external.fd_row, external.ph_10, external.js_space, external.ai_center]}>
						<Text style={{ fontFamily: appFonts.regular, color: textColorStyle, fontSize: fontSizes.FONT18 }}>
							{`${item?.listName} (${filteredProducts?.length})`}

						</Text >
						<TouchableOpacity style={[external.fx_1,external.ai_end]} onPress={() => navigation.navigate('PurchaseDetailsListContainer',{item: item})}>
						<Text style={{ fontFamily: appFonts.regular, color: textColorStyle, fontSize: fontSizes.FONT30 }}>
							{">"}
						</Text>
						</TouchableOpacity>
						
					</View>
					<View style={[external.ph_5, { flex: 1 }]}>
						<FlatList
							data={filteredProducts}
							renderItem={renderItem}
							horizontal={true}
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							scrollEnabled={false}
						/>
					</View>
					<View
						style={[{
							width: [external.width_100],
							height: 1,
							backgroundColor: appColors.bgLayout,
						}, external.mt_10]}
					/>
					<View style={[external.fd_row, external.js_space, external.ai_center]}>

						<TouchableOpacity style={external.fx_1} onPress={() => navigation.navigate('PurchaseDetailsListContainer',{item: item})}>
							<View
								style={[
									external.fx_1,
									external.ai_center,
									external.fd_row,
									external.pl_15,
									{ borderRightWidth: 1, borderRightColor: appColors.bgLayout, }
								]}>

								<VisibilityIconG />

								<Text style={[{ color: textColorStyle, fontSize: fontSizes.FONT16, fontFamily: appFonts.regular },
								external.mv_10, external.mh_5]}>
									{"View Full List"}

								</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={external.fx_1} onPress={() => handleSendDeleteData(0,item?.purchaseListMasterID)} >
							<View
								style={[
									external.fx_1,
									external.ai_center,
									external.fd_row,
									external.pl_15,
								]}>

								<DeleteIconG />

								<Text style={[{ color: textColorStyle, fontSize: fontSizes.FONT16, fontFamily: appFonts.regular },
								external.mv_10, external.mh_5]}>

									{"Delete"}
								</Text>
							</View>
						</TouchableOpacity>


					</View>
				</View>;
			})}

		</View>

	);


};

export default PurchaseListContainer;
