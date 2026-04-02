import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import { external } from '../../../style/external.css';
import styles from './style.css'; 
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import IMAGE_CONFIG from '../../../config/imageConfig';
import API_URL from '../../../config/apiConfig';
import { commonStyles } from '../../../style/commonStyle.css';
import axios from 'axios';
import Brand from '../../../models/brandmodel';
import { SCREEN_WIDTH } from '../../../themes/appConstant';
import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage';

const WeLoveBrandsContainer = () => {

  const navigation = useNavigation();
  const [brandData, setBrands] = useState([]);


  //  React to changes
  useEffect(() => {
    fetchBrandsData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        await fetchBrandsData();
      };

      initialize();
    }, [])
  );


  const fetchBrandsData = async () => {
    try {

      const response = await axios.post(`${API_URL.BESTBRANDS}`, {
        limit: 12
      });
      const data = response.data;
      const apiData = data.Result.map(item => new Brand(item));
      setBrands(apiData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatData = (data, numColumns) => {
    const fullRows = Math.floor(data.length / numColumns);
    let itemsLastRow = data.length - fullRows * numColumns;

    while (itemsLastRow !== numColumns && itemsLastRow !== 0) {
      data.push({ key: `blank-${itemsLastRow}`, empty: true });
      itemsLastRow++;
    }

    return data;
  };


  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={[commonStyles.commonContainer, external.m_5, { backgroundColor: 'white' }, external.mt_10]} onPress={() => item.code && navigation.navigate("ProductListing", {
        item: {
          title: item.code,
          url: "",
          parentCat: item.code,
          filterKey: "",
          categoruName: item.name,
          filterTitle: ''
        }
      })} >
        <View style={styles.iconContainer}>
          {item.logo?.endsWith('.svg') ? (
            <FixedSvgFromUrl
              width={SCREEN_WIDTH * 0.19}
              height={SCREEN_WIDTH * 0.19}
              resizeMode={'contain'}
              uri={`${IMAGE_CONFIG.BASE_URL}/${item.logo}`}
            />

          ) : <Image
            source={item.logo && item.logo !== 'noimage.jpg'
              ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item.logo}` }
              : require('../../../assets/images/homeScreenOne/placeholder.jpeg')}
            style={styles.sidebarImage}
          />}
          <View style={styles.iconLayer}></View>
        </View>

      </TouchableOpacity>
    </View>
  );

  return (

    <View>
      {brandData && <View style={[external.mh_20, external.mt_10]}>
        <H3HeadingCategory
          value={"Brands We Love"}
          show={false}
        />

      </View>}
      {brandData && <View style={[external.mh_10]}>

        <FlatList
          data={formatData(brandData, 4)}
          renderItem={renderItem}
          numColumns={4}
          columnWrapperStyle={styles.newrow}
          showsVerticalScrollIndicator={false}
        />
      </View>}
    </View>
  );
};

export default WeLoveBrandsContainer;
