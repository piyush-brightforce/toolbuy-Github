import { FlatList, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { external } from '../../../style/external.css'; 
import styles from './style.css';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useValues } from '../../../../App'; 
import appColors from '../../../themes/appColors';
import IMAGE_CONFIG from '../../../config/imageConfig'; 
import { ChevronForward } from './../../../assets/googleIcons/ChevronForward';

const ProductContainer = ({ item }) => {
	const { isDark, textColorStyle, linearColorStyle, t, menuContent } = useValues();
	const colors = isDark
		? ['#3D3F45', '#45474B', '#2A2C32']
		: [appColors.screenBg, appColors.screenBg];

	const navigation = useNavigation();
	const [activeIndex, setActiveIndex] = useState(0);
	const [caregotyTitle, setCaregotyTitle] = useState(menuContent[0].content.CategoryName);

	const [categoryValue, setCategoryValue] = useState('');
	const [parentcategoryValue, setParentcategoryValue] = useState('');
	const getCategoryIndexByName = (list, catId) => {
		return list.findIndex(
			item => item.content.CategoryID === catId
		);
	};

	useFocusEffect(
		useCallback(() => {
			if (item) {
				const index = getCategoryIndexByName(menuContent, item.id);
				setActiveIndex(index);
			}
		}, [item])
	);

	const menuOnPress = (index, title, item) => {
		setActiveIndex(index);
		setCaregotyTitle(title); 

		setCategoryValue(item.content.CategoryCode);
		setParentcategoryValue(item.content.CategoryCode); 
	  navigation.navigate("CategoryDetail",{categoryCode:item.content.CategoryCode,categoryname:item.content.CategoryCode});
    };

 
	const SidebarContent = ({ content, isActive, onPress }) => {
		return (
			<TouchableOpacity style={[styles.sidebarItem, isActive && styles.activeSidebarItem]} onPress={onPress}>


				<View style={[external.fd_row, external.js_space,external.as_start,external.ai_center]}>
					<View style={[{flex:1},external.fd_row,external.ai_center,external.as_center ]}>
						<View style={styles.iconContainer}>
							<Image
								source={{ uri: `${IMAGE_CONFIG.BASE_URL}${content.ImagePath}` }}
								style={styles.sidebarImage}
							/>
							<View style={styles.iconLayer}></View>
						</View>
						<Text style={[styles.sidebarText,{color:isActive?appColors.primary:textColorStyle}]}>{content.CategoryName}</Text>
					</View>
					<ChevronForward color={isActive?appColors.primary:textColorStyle} height={40} width={40} />

				</View>
			</TouchableOpacity>
		);
	}

	return (
		<ScrollView showsVerticalScrollIndicator={true}>
			<View style={styles.sidebar}>
				{menuContent.map((item, index) => (

					<SidebarContent
						content={item.content}
						key={index}
						isActive={activeIndex === index}
						onPress={() => menuOnPress(index, item.content.CategoryName, item)}
					/>
				))}
			</View>
		</ScrollView>
	);

	// return (
	// 	<View style={styles.categoryContent}>
	// 		<View style={styles.leftContent}>
	// 			<ScrollView showsVerticalScrollIndicator={true}>
	// 				<View style={styles.sidebar}>
	// 					{menuContent.map((item, index) => (
	// 						<SidebarContent
	// 							content={item.content}
	// 							key={index}
	// 							isActive={activeIndex === index}
	// 							onPress={() => menuOnPress(index, item.content.CategoryName, item)}
	// 						/>
	// 					))}
	// 				</View>
	// 			</ScrollView>
	// 		</View>
	// 		<View style={styles.rightContent}>
	// 			<View style={styles.categoryHeader}>
	// 				<Text style={styles.categoryName}>{caregotyTitle}</Text>
	// 				<TouchableOpacity onPress={onPressHandleShop} style={[external.fd_row, external.ai_center]}>
	// 					<Text style={styles.shopNow}>Shop All</Text>
	// 					<ChevronForward color={appColors.primary} height={20} width={20} />
	// 				</TouchableOpacity>
	// 			</View>

	// 			<ScrollView style={styles.categories}>
	// 				{
	// 					menuContent[activeIndex].content.subcategory.map((subItem, subIndex) => (
	// 						<ExpandedContainer
	// 							key={subIndex}
	// 							item={subItem}
	// 							isExpanded={expanded === subIndex}
	// 							onPress={() => handleToggle(subIndex,subItem)}
	// 							onhandlePressItem={handleSubItem}
	// 						/>
	// 					))
	// 				}
	// 			</ScrollView>
	// 		</View>
	// 	</View>
	// );
};

export default ProductContainer;
