import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React  from 'react';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import { external } from '../../../style/external.css';
import styles from './style.css'; 
import { useNavigation } from '@react-navigation/native';
import IMAGE_CONFIG from '../../../config/imageConfig';
import { commonStyles } from '../../../style/commonStyle.css';
import { SCREEN_WIDTH } from '../../../themes/appConstant';
import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage';

const WeLoveBrandsContainer = (brandData) => {

  const navigation = useNavigation(); 
 
  const formatData = (data, numColumns) => {
    const fullRows = Math.floor(data?.length / numColumns);
    let itemsLastRow = data?.length - fullRows * numColumns;

    while (itemsLastRow !== numColumns && itemsLastRow !== 0) {
      data?.push({ key: `blank-${itemsLastRow}`, empty: true });
      itemsLastRow++;
    }

    return data;
  };


  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={[commonStyles.commonContainer, external.m_5, external.mt_10]} onPress={() => { 
        item.brandCode && navigation.navigate("ProductListing", {
        item: {
          title: item.brandCode,
          url: "",
          parentCat: item.brandCode,
          filterKey: "",
          categoryName: item.brandName,
          filterTitle: ''
        }
      });
      }} >
        {item.brandCode ? <View style={styles.iconContainer}>
          {item.logoImagePath?.endsWith('.svg') ? (
            <FixedSvgFromUrl
              width={SCREEN_WIDTH * 0.19}
              height={SCREEN_WIDTH * 0.19}
              resizeMode={'contain'}
              uri={`${IMAGE_CONFIG.BASE_URL}/${item.logoImagePath}`}
            />

          ) : <Image
            source={item.logoImagePath && item.logoImagePath !== 'noimage.jpg'
              ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item.logoImagePath}` }
              : require('../../../assets/images/homeScreenOne/placeholder.jpeg')}
            style={styles.sidebarImage}
          />}
          <View style={styles.iconLayer}></View>
        </View>:<View style={[styles.sidebarImage]}></View>}

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
          data={formatData(brandData.brandData.flat(), 4)}
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
