import { Modal, ScrollView, View } from 'react-native';
import React,{ useEffect, useState,useCallback }  from 'react';
import { external } from '../../../style/external.css';
import { commonStyles } from '../../../style/commonStyle.css';
import { windowWidth } from '../../../themes/appConstant';
import { useValues } from '../../../../App';
import CategoryCarouselContainer from '../categorycarouselContainer';
import ShopByCategoryContainer from '../shopbyCategoryContainer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CategoryProductResponse } from '../../../models/categoryProduct/CategoryProductResponse';
import axios from 'axios';

import API_URL from '../../../config/apiConfig';
import LoaderScreen from '../../loaderScreen'; 
import WeLoveBrandsContainer from '../welovebrands';
import ProductHeaderContainer from '../../productScreen/productHeaderContainer';
import { getValue, PREFERENCE_KEY } from '../../../utils/helper/localStorage';

const CategoryDetail = ({ route }) => {

  const { categoryCode,categoryname } = route?.params || {};

  const navigation = useNavigation();
  const { linearColorStyle, isDark, bgFullStyle } = useValues();
  const [isLoading, setLoadingValue] = useState(true);
  const [productList, setproductList] = useState();
  const [cartSessionId, setcartSessionId] = useState('');


  //  React to changes
  useEffect(() => {
    if (categoryCode) {
      fetchProductListingData();
    }
  }, []);

    useFocusEffect(
      useCallback(() => {
        const initialize = async () => {
          if (categoryCode) {
            
            // Call API directly
            await fetchProductListingData();
          }
        };
  
        initialize();
      }, [categoryCode])
    );

  const fetchProductListingData = async () => {

    try {
      setLoadingValue(true);
     
      const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);
      const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
      const customerUserID = Number(id);
 
      const response = await axios.post(`${API_URL.PRODUCTSLISTING}`,
        {
          cat: categoryCode,
          parentcat: categoryCode,
          offer: "",
          flag: "category",
          PageNo: 1,
          pageSize: 32,
          orderBy: '',
          filterKey: 'category',
          filterValue: '',
          priceRange: "",
          filterUrl: "",
          url: "",
          CustomerID: customerUserID,
          CartSessionID: (!customerUserID || customerUserID === 0)?cartid || '':'',
          isBlUrl: false
        });
 
      const data = response.data; 

      const model = new CategoryProductResponse(data);
 
      setproductList(model.result.listProductType);
 
      setLoadingValue(false);
 
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoadingValue(false);
    }
  };
 

if (isLoading)
    return (
      <Modal transparent visible={isLoading}>
        <LoaderScreen />
      </Modal>
    );
  if (!isLoading && productList)
    return (
    <View style={{ flex: 1 }}>
      
      <View
        style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>
        <ProductHeaderContainer  title = {categoryname} type='title' onPress={() => navigation.goBack()}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[external.Pb_30]}>
          <CategoryCarouselContainer data={productList} />
          <ShopByCategoryContainer data={productList} />
          <WeLoveBrandsContainer/>
        </ScrollView>
      </View>
    </View>
  );

  
};

export default CategoryDetail;
