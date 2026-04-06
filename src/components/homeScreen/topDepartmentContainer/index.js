import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import { external } from '../../../style/external.css';
import styles from './style.css';
import { useValues } from '../../../../App';
import appColors from '../../../themes/appColors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import IMAGE_CONFIG from '../../../config/imageConfig';
import API_URL from '../../../config/apiConfig';
import BestBrandUnderRoof from '../../../components/homeScreen/bestBrandsContainer';
import { commonStyles } from '../../../style/commonStyle.css';

const TopDepartmentContainer = () => {

  const { linearColorStyle, textColorStyle, isDark, t } =
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
          id: category.CategoryID,
          categoryCode: category.CategoryCode
        }));
        setCategories(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCategoryData();
  }, []);


  const renderItem = ({ item }) => (
    <View  >
      <TouchableOpacity style={[commonStyles.commonContainer, external.m_5,{backgroundColor:'white'},external.mt_10]} onPress= {() => navigation.navigate("CategoryDetail",{categoryCode:item.categoryCode,categoryname:item.title})} >

        <View style={styles.iconContainer}>
          <Image
            source={item.ImagePath && item.ImagePath !== 'noimage.jpg'
              ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item.ImagePath}` }
              : require('../../../assets/images/homeScreenOne/placeholder.jpeg')}
            style={styles.sidebarImage}
          />
          <View style={styles.iconLayer}></View>
        </View>
        <Text numberOfLines={2}
          ellipsizeMode="tail" style={[styles.title, { color: textColorStyle, alignSelf: "center",textAlign:'center'}, [external.Pb_5, external.pt_5]]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (

    <View>
      {categories && <View style={[external.mh_20]}>
        <H3HeadingCategory
          value={t('transData.topDepartments')}
          seeall={t('transData.seeAll')}
          onpressViewall={()=> navigation.navigate('AllCategoryScreen',{
						isFrom: "Home",
					})}
        />

      </View>}
      {categories && <View style={[external.mh_10]}>

        <FlatList
          data={categories.slice(0, 6)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.newrow}
          showsVerticalScrollIndicator={false}
        />
      </View>}
     
    </View>
  );
};

export default TopDepartmentContainer;
