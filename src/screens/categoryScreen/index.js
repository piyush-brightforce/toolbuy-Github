import { View } from 'react-native';
import React, { useEffect } from 'react';

import ProductContainer from '../../components/categoryContainer/productContainer';
import { commonStyles } from '../../style/commonStyle.css';
import { useValues } from '../../../App';
import ProductHeaderContainer from '../productScreen/productHeaderContainer';
import { useNavigation } from '@react-navigation/native';
import ProductContainer1 from '../../components/categoryContainer/productContainer1';

const CategoryScreen = ({ route }) => {

	const {isfrom} = route?.params || {};
	const navigation = useNavigation();

	const { bgFullStyle } = useValues();

	return (
		<View style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>
			{isfrom ? <ProductHeaderContainer title={"Categories"} type='title' onPress={()=> navigation.goBack()}/>:<ProductHeaderContainer title={"Categories"} type='title' />}

			<ProductContainer1/>
		</View>
	);
};


export default CategoryScreen;