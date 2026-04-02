import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import SolidLine from '../../../commonComponents/solidLine';
import { commonStyles } from '../../../style/commonStyle.css';
import { homeProductData } from '../../../data/homeProductData';
import { external } from '../../../style/external.css';
import styles from './style.css';
import axios from 'axios';
import { useValues } from '../../../../App';
import API_URL from '../../../config/apiConfig';  

const ProductSwiper = ({onSendData}) => {
   const sendDataBack = (id) => { 
    onSendData(id); // 👈 send to parent
  };

  const [selectedItem, setSelectedItem] = useState(0);
  const [categories, setCategories] = useState([]);
  const { isRTL, t } = useValues();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL.MENU}`); 
        const data = response.data; 
        const apiData = data.Result.map(category => ({
          title: category.CategoryName,
          id: category.CategoryID,
          code: category.CategoryCode
        })); 
        setCategories(apiData); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.container,
        item.id === selectedItem ? styles.selectedMenuItem : null,
      ]}
      onPress={() => {
        setSelectedItem(item.id);
        sendDataBack(item.code);
      }}>
      <Text
        style={[
          commonStyles.subtitleText,
          item.id === selectedItem ? styles.selectedMenuItemText : null,
        ]}>
        {t(item.title)}
      </Text>
    </TouchableOpacity>
  );
  // 
  return (
   <View style={styles.column}>
     <View style={[external.mh_20, external.mt_5]}>
      <SolidLine />
      <FlatList
        renderItem={renderItem}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        // inverted={isRTL ? true : false}
      />
     
      <SolidLine />
    </View>
   
   </View>
    
  );
};

export default ProductSwiper;
