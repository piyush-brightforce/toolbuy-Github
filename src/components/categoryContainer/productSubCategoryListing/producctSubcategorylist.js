import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles.css'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import IMAGE_CONFIG from '../../../config/imageConfig';
import API_URL from '../../../config/apiConfig'; 
import BestBrandUnderRoof from '../../homeScreen/bestBrandsContainer';
import { external } from '../../../style/external.css';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import appColors from '../../../themes/appColors';
import { useValues } from '../../../../App';

const ProductSubCategoryListScreen = () => {
  const { linearColorStyle, textColorStyle, isDark, t, currSymbol, currPrice } =
    useValues();
  const navigation = useNavigation();
  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32', '#ffff',]
    : [appColors.screenBg, appColors.screenBg];

  const [categories, setCategories] = useState([]); 


  useEffect(() => {
 
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${API_URL.TOPDEPARTMENT}`);
        const data = response.data;
        const apiData = data.Result.map(category => ({
          ImagePath: category.ImagePath,
          title: category.CategoryName,
          id: category.CategoryID
        }));
        setCategories(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; 
    fetchCategoryData();
  }, []);


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.newitem}>
      <View style={styles.newimageWrapper}>
        <Image
              source={item.ImagePath && item.ImagePath !== 'noimage.jpg'
              ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item.ImagePath}` }
              : require('../../../assets/images/homeScreenOne/placeholder.jpeg')}
          style={styles.newimage}
          
             resizeMode={item.ImagePath && item.ImagePath !== 'noimage.jpg' ?'contain': 'cover'}
            onError={(e) => console.error('Image error:', item.ImagePath)}
            onLoad={() => console.log('Loaded:', item.ImagePath)}

        />
      </View>
      <Text style={[styles.title, { color: textColorStyle, alignSelf: "center" }, [external.Pb_5, external.pt_5]]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
   
    <View style={{ color: 'white' }}>
      { categories && <View style={[external.mt_10, external.mh_20]}>
        <H3HeadingCategory
          value={t('transData.topDepartments')}
          seeall={t('transData.seeAll')}
        />

      </View>}
      { categories && <View style={[external.mh_10]}>

        <FlatList
          data={categories.slice(0, 6)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.newrow}
          showsVerticalScrollIndicator={false}
        />
      </View>}
      <BestBrandUnderRoof
        show={true} 
        showPlus={false}
      />
    </View>
  );
};

export default TopDepartmentContainer;
