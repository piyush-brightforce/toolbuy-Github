import {  Pressable, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { SearchIconG } from '../../../utils/icon';
import styles from './style.css';
import appColors from '../../../themes/appColors';
import { useValues } from '../../../../App'; 
import { useNavigation } from '@react-navigation/native';


const SearchContainer = ({ show, onSendData }) => {
	const sendDataBack = (id) => {
		onSendData(id ?? ""); // 👈 send to parent
	};

	const navigation = useNavigation(); 

	const [loading, setLoading] = useState(false);
	const { linearColorStyle, linearColorStyleTwo, textRTLStyle, viewRTLStyle, t } =
		useValues();

 

	return (

		<Pressable onPress={ () => navigation.navigate('SearchScreen',{
						isFrom: "Home",
					})}>
			<View style={[styles.container]}>
					<View style={[styles.menuItemContent]}>
						<View style={[styles.searchContainer]}>
							<TextInput
								placeholder={t("transData.SEARCH_PLACEHOLDER")}
								placeholderTextColor={appColors.subtitle}
								editable={false}
								style={[
									styles.searchText,
									{ textAlign: textRTLStyle },
								]}
							/>
						</View>
						<View style={styles.searchIconStyle}>
								<SearchIconG />
							</View>
					</View>
				</View>
		</Pressable>

	);
};

export default SearchContainer;
