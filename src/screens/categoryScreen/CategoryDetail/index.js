import { ScrollView, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { external } from '../../../style/external.css';
import { commonStyles } from '../../../style/commonStyle.css';
import { useValues } from '../../../../App';
import CategoryCarouselContainer from '../categorycarouselContainer';
import ShopByCategoryContainer from '../shopbyCategoryContainer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import API_URL from '../../../config/apiConfig';
import WeLoveBrandsContainer from '../welovebrands';
import ProductHeaderContainer from '../../productScreen/productHeaderContainer';
import { CategoryDetailsResponse } from '../../../models/categoryDetails/CategoryDetailsResponse';

const CategoryDetail = ({ route }) => {

  const { categoryCode, categoryname } = route?.params || {};

  const navigation = useNavigation();
  const { bgFullStyle,
    isLoaderLoading,
    setIsLoaderLoading } = useValues();
  const [productList, setproductList] = useState();



  useEffect(() => {
    setIsLoaderLoading(true);
    const initialize = async () => {
      if (categoryCode) {
        await fetchProductListingData();
      }else{
        setIsLoaderLoading(false);
      }
    };

    initialize();
  }, []);



  const fetchProductListingData = async () => {

    try {

      const response = await axios.post(`${API_URL.GETCATEGORYDETAILS}`,
        {
          CategoryCode: categoryCode,
          IsMobile: true
        });

      const data = response.data;

      const model = new CategoryDetailsResponse(data);

      setproductList(model?.result);

      setIsLoaderLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoaderLoading(false);
    }
  };


  if (!isLoaderLoading && productList)
    return (
      <View style={{ flex: 1 }}>

        <View
          style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>
          <ProductHeaderContainer title={categoryname} type='title' onPress={() => navigation.goBack()} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[external.Pb_30]}>
            <CategoryCarouselContainer data={productList?.bannerList} />
            <ShopByCategoryContainer data={productList?.subCategoryList} />
            <WeLoveBrandsContainer brandData={productList?.brandList} />
          </ScrollView>
        </View>
      </View>
    );


};

export default CategoryDetail;
