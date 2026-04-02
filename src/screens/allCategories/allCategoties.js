import { View } from 'react-native';
import React, { useEffect } from 'react';

import ProductContainer from '../../components/categoryContainer/productContainer';
import { commonStyles } from '../../style/commonStyle.css';
import { useValues } from '../../../App';
import ProductHeaderContainer from '../productScreen/productHeaderContainer';
import { useNavigation } from '@react-navigation/native';

const AllCategoryScreen = ({ route }) => {

  const { isFrom } = route?.params || {};
  const navigation = useNavigation();

	const { bgFullStyle } = useValues();

	return (
		<View style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>
			{!isFrom ? <ProductHeaderContainer title={"All Categories"} type='title' />:<ProductHeaderContainer title={"All Categories"} type='title' onPress={() => navigation.goBack()} /> }

			<ProductContainer/>
		</View>
	);
};


export default AllCategoryScreen;