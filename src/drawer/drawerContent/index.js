import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useValues } from '../../../App';
import { fontSizes, windowHeight, windowWidth } from '../../themes/appConstant';
import { external } from '../../style/external.css';
import { useNavigation } from '@react-navigation/native';
import appColors from '../../themes/appColors';
import axios from 'axios';
import API_URL from '../../config/apiConfig';
import IMAGE_CONFIG from '../../config/imageConfig';
import DrawerMenuContent from './DrawerMenu';
import DrawerCategoryContent from './DrawerCategory';
import DrawerItemContent from './DrawerItem';
import OverlaySlide from './OverlaySlideAnimation';
import appFonts from '../../themes/appFonts';
import { AccountCircle } from '../../utils/icon';
import { getValue, PREFERENCE_KEY } from '../../utils/helper/localStorage';
import LoginResponseModel from '../../models/login/loginresponsemodel';

const DrawerContent = (props) => {
	const { isDark, menuContent, setMenuContent } = useValues();
	const navigation = useNavigation();
	
	const [categoryContent, setCategoryContent] = useState({ item: {}, data: [] });
	const [categoryItems, setCategoryItems] = useState({ item: {}, data: [] });

	const [userResponse, setUserResponse] = useState(null);
	const [loading, setLoading] = useState(true);

	const [selectionArrayList, setSelectionArrayList] = useState([]);

	const [showCategory, setShowCategory] = useState(false);
	const [showItems, setShowItems] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL.MENU}`);
				const data = response.data;
				const apiData = data.Result.map(section => ({
					icon: (
						<Image
							source={{ uri: `${IMAGE_CONFIG.BASE_URL}${section.ImagePath}` }}
						/>
					),
					title: section.CategoryName,
					content: section,
					data: []
				}));

				setMenuContent(apiData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
		getUserResponse();
	}, []);


	const getUserResponse = async () => {
		try {
			const jsonValue = await getValue(PREFERENCE_KEY.USERRESPONSE);
			if (jsonValue != null) {
				const parsedData = JSON.parse(jsonValue);
				const setresponse = new LoginResponseModel(parsedData);

				setUserResponse(setresponse);

			}
			setLoading(false);
		} catch (e) {
			console.error("Fetch error:", e);
		} finally {
			setLoading(false);
		}
	};

	const handleMenuPress = content => {
		const _content = content.subcategory.map(item => ({
			title: item.CategoryName,
			content: item,
			data: []
		})); 
		setCategoryContent({ item: content, data: _content });
		setShowCategory(true);

		const newObj = { title: content.CategoryCode, url: "", parentCat: content.CategoryCode, filterKey: "category",categoryName: content.CategoryName,filterTitle:'' };

		setSelectionArrayList([newObj]);

	};

	const handleCategoryPress = content => {
		const item = content.ProductTypeLists.map(item => ({
			title: item.FilterValue,
			content: item,
			data: []
		})); 
		setCategoryItems({ item: content, data: item });
		setShowItems(true);

		const lastCategory = selectionArrayList?.length > 0 ? selectionArrayList[selectionArrayList?.length - 1] : '';
	 
		const newObj = { title: content.CategoryCode, url: "", parentCat: lastCategory?.title, filterKey: "category",categoryName: content.CategoryName,filterTitle:''  };
		setSelectionArrayList(prev => [...prev, newObj]);

	}

	const handleCategoryItem = content => { 

		const lastCategory = selectionArrayList?.length > 0 ? selectionArrayList[selectionArrayList?.length - 1] : {};
		if (lastCategory.filterKey === "producttype") {
			  
			const updatedArray = updateLastValueOfNewArrayItem(content);
			const lastObj = updatedArray?.length > 0 ? updatedArray[updatedArray?.length - 1] : {};

			lastObj && navigation.navigate("ProductListing", {
				item: lastObj
			});
		} else {
			 
			const newObj = { title: lastCategory?.title, url: content.FilterCodeSlug, parentCat: lastCategory?.parentCat, filterKey: "producttype",categoryName: lastCategory?.categoryName,filterTitle: content.FilterValue };
			setSelectionArrayList(prev => [...prev, newObj]);
			newObj && navigation.navigate("ProductListing", {
				item: newObj
			});
		}

	}

	const updateLastValueOfNewArrayItem = (item) => {
	let updatedArray = [];

	setSelectionArrayList(prev => {
		updatedArray = [...prev];

		updatedArray[updatedArray.length - 1] = {
			title: updatedArray[0].title,
			parentCat: updatedArray[0].parentCat,
			url: item.FilterCodeSlug,
			filterKey: "producttype",
			categoryName: updatedArray[0].categoryName,
			filterTitle:item.FilterValue 
		};

		return updatedArray;
	});

	return updatedArray;
};

	const onShopAllSubCat = content => { 
		const updatedArray = selectionArrayList.length > 1
			? selectionArrayList.slice(0, -1)
			: selectionArrayList;
		setSelectionArrayList(updatedArray);

		const lastObject = updatedArray?.length > 0 ? updatedArray[updatedArray?.length - 1] : {};
	 
		navigation.navigate("CategoryDetail",{categoryCode:lastObject.title,categoryname:lastObject.categoryName});
	}


	const onShopAll = content => {
		 

		const updatedArray = selectionArrayList.length > 2
			? selectionArrayList.slice(0, -1)
			: selectionArrayList;
		setSelectionArrayList(updatedArray);

		const lastObject = updatedArray?.length > 0 ? updatedArray[updatedArray?.length - 1] : {};
		lastObject && navigation.navigate("ProductListing", {
			item: lastObject
		});
	}

	if (loading) {
		return null; // or Loader component
	}

	return (
		<View style={[external.fx_1]}>
			<View style={styles.containerStyle}>
				{userResponse && <View style={[external.fd_row, external.ai_start, external.ph_10]} alignItems='center'>
					<AccountCircle height={26} width={26} color={appColors.textColorWhite} />
					<Text style={styles.signInStyle}>{userResponse.FullName}</Text>
				</View>}
				{!userResponse && <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Login')}>
					<View style={[external.fd_row, external.ai_start, external.ph_10]} alignItems='center'>
						<AccountCircle height={26} width={26} color={appColors.textColorWhite} />
						<Text style={styles.signInStyle}>Sign In or Create Account</Text>
					</View>
				</TouchableOpacity>}
			</View>
			<ScrollView showsVerticalScrollIndicator={true}>
				{menuContent.length > 0 && <DrawerMenuContent content={menuContent} onItemPress={handleMenuPress} />}
			</ScrollView>

			{/* CATAGORY CONTENT */}
			<OverlaySlide visible={showCategory} item={categoryContent.item} onClose={() => {
				setShowCategory(false);
				setSelectionArrayList(prev => prev.slice(0, -1)); 
			}} onPress={onShopAllSubCat}>
				<DrawerCategoryContent
					content={categoryContent.data}
					onItemPress={handleCategoryPress}
				/>
			</OverlaySlide>

			{/* SUB CATAGORY CONTENT */}
			<OverlaySlide visible={showItems} item={categoryItems.item} onClose={() => {
				setShowItems(false);
				setSelectionArrayList(prev => prev.slice(0, -1)); 
			}} onPress={onShopAll}>
				<DrawerItemContent content={categoryItems.data} onItemPress={handleCategoryItem} />
			</OverlaySlide>
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		marginVertical: 8,
		...external.ph_20,
	},
	containerStyle: {
		backgroundColor: appColors.primary,
		width: windowWidth(380),
		height: windowHeight(45),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'start'
	},
	signInStyle: {
		color: appColors.textColorWhite,
		fontSize: fontSizes.FONT20,
		fontFamily: appFonts.regular,
		...external.ml_5
	}
});
export default DrawerContent;
