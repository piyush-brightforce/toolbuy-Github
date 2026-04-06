import { FlatList, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { external } from '../../../style/external.css';
import styles from './style.css';
import { useNavigation } from '@react-navigation/native';
import { useValues } from '../../../../App';
import appColors from '../../../themes/appColors';
import IMAGE_CONFIG from '../../../config/imageConfig';
import ExpandedContainer from '../Expanded';
import { ChevronForward } from './../../../assets/googleIcons/ChevronForward';

const ProductContainer1 = () => {
	const { isDark, textColorStyle, linearColorStyle, t, menuContent } = useValues();
	const colors = isDark
		? ['#3D3F45', '#45474B', '#2A2C32']
		: [appColors.screenBg, appColors.screenBg];

	const navigation = useNavigation('');
	const [activeIndex, setActiveIndex] = useState(0);
	const [caregotyTitle, setCaregotyTitle] = useState(menuContent?.[0]?.content?.CategoryName || "");
	const [caregotyCode, setcaregotyCode] = useState(menuContent?.[0]?.content?.CategoryCode || "");

	const [selectionArrayList, setSelectionArrayList] = useState([]);


	useEffect(() => {
		const newObj = { title:  caregotyCode, url: "", parentCat:  caregotyCode, filterKey: "category",categoryName:  caregotyTitle,filterTitle:'' };
		setSelectionArrayList([newObj]);
	}, []);



	const menuOnPress = (index, title, categoryCode) => {
		setActiveIndex(index);
		setCaregotyTitle(title);
		setcaregotyCode(categoryCode); 
		const newObj = { title: categoryCode ?? caregotyCode, url: "", parentCat: categoryCode ?? caregotyCode, filterKey: "category",categoryName: title ?? caregotyTitle,filterTitle:'' };
		 
		setSelectionArrayList([newObj]);

	}

	const onPressHandleShop = () => {
		const lastObject = selectionArrayList?.length > 0 ? selectionArrayList[0] : {};
		 
		lastObject && navigation.navigate("ProductListing", {
			item: lastObject
		});
	}

	const [expanded, setExpanded] = useState(null);

	const handleToggle = (index, content) => { 
		setExpanded(prevIndex => prevIndex === index ? null : index);
	};


	const updateLastValueOfNewArrayItem = (item, subItem) => {
		let updatedArray = [];

		setSelectionArrayList(prev => {
			updatedArray = [...prev];

			updatedArray[updatedArray.length - 1] = {
				title: subItem.CategoryCode,
				parentCat: selectionArrayList[0].parentCat,
				url: item.FilterCodeSlug,
				filterKey: "producttype",
				categoryName: subItem.CategoryName,
				filterTitle:item.FilterValue
			};

			return updatedArray;
		});

		return updatedArray;
	};


	const handleCategoryItem = (content, subitem) => { 

		const lastCategory = selectionArrayList?.length > 0 ? selectionArrayList[selectionArrayList?.length - 1] : {};
		if (lastCategory.filterKey === "producttype") {

			const updatedArray = updateLastValueOfNewArrayItem(content, subitem);
			const lastObj = updatedArray?.length > 0 ? updatedArray[updatedArray?.length - 1] : {};
			 
			lastObj && navigation.navigate("ProductListing", {
				item: lastObj
			});
		} else { 
			const newObj = { title: subitem?.CategoryCode, url: content.FilterCodeSlug, parentCat: selectionArrayList[0]?.parentCat, filterKey: "producttype",categoryName: subitem?.CategoryName,filterTitle:content.FilterValue };
		 
			setSelectionArrayList(prev => [...prev, newObj]);
			newObj && navigation.navigate("ProductListing", {
				item: newObj
			});
		}

	}


	const SidebarContent = ({ content, isActive, onPress }) => {
		return (
			<TouchableOpacity style={[styles.sidebarItem, isActive && styles.activeSidebarItem]} onPress={onPress}>
				<View style={styles.iconContainer}>
					<Image
						source={{ uri: `${IMAGE_CONFIG.BASE_URL}${content.ImagePath}` }}
						style={styles.sidebarImage}
					/>
					<View style={styles.iconLayer}></View>
				</View>
				<Text style={styles.sidebarText}>{content.CategoryName}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.categoryContent}>
			<View style={styles.leftContent}>
				<ScrollView showsVerticalScrollIndicator={true}>
					<View style={styles.sidebar}>
						{menuContent.map((item, index) => (
							<SidebarContent
								content={item.content}
								key={index}
								isActive={activeIndex === index}
								onPress={() =>
									menuOnPress(index, item?.content?.CategoryName, item?.content?.CategoryCode)
								}
							/>
						))}
					</View>
				</ScrollView>
			</View>
			<View style={styles.rightContent}>
				<View style={styles.categoryHeader}>
					<Text style={styles.categoryName}>{caregotyTitle}</Text>
					<TouchableOpacity onPress={onPressHandleShop} style={[external.fd_row, external.ai_center]}>
						<Text style={styles.shopNow}>Shop All</Text>
						<ChevronForward color={appColors.primary} height={20} width={20} />
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.categories}>
					{
						menuContent[activeIndex].content.subcategory.map((subItem, subIndex) => (
							<ExpandedContainer
								key={subIndex}
								item={subItem}
								isExpanded={expanded === subIndex}
								onPress={() => handleToggle(subIndex, subItem)}
								onhandlePressItem={(cateItem) => handleCategoryItem(cateItem, subItem)}
							/>
						))
					}
				</ScrollView>
			</View>
		</View>
	);
};

export default ProductContainer1;