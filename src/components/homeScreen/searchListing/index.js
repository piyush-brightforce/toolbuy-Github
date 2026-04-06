import { FlatList, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import { external } from '../../../style/external.css';
import styles from './style.css';
import { useValues } from '../../../../App';
import appColors from '../../../themes/appColors';
import { useNavigation } from '@react-navigation/native';
import IMAGE_CONFIG from '../../../config/imageConfig';

const SearchingListingContainer = ({ data }) => {
  const { linearColorStyle, textColorStyle, isDark } =
    useValues();
  const navigation = useNavigation();
  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32', '#ffff',]
    : [appColors.screenBg, appColors.screenBg];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.newitem} onPress={() => navigation.navigate('ProductDetail', { product: { code: item?.SearchCode } })}>
      <Text
        style={[
          styles.price,
          { color: textColorStyle, alignSelf: 'flex-start' },
          external.Pb_5,
          external.pt_5,

        ]}
        numberOfLines={1}
        ellipsizeMode="tail"

      >{item?.SearchFilter ? item.SearchFilter : ''}
      </Text>
      <View
        style={{
          height: 1,
          backgroundColor: '#ccc',
          width: '100%',
          marginTop: 4,
        }}
      />
    </TouchableOpacity>
  );

  const renderItem1 = ({ item }) => (
    <TouchableOpacity style={styles.newitem} onPress={() => item && navigation.navigate("ProductListing", {
      item: {
        title: item?.CategoryCode,
        url: '',
        parentCat: item?.ParentCategoryCode,
        filterKey: '',
        categoryName: item.CategoryName,
        filterTitle:''
      }
    })}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={[styles.newimageWrapper]}>
          <Image

            source={item?.ImagePath && item.ImagePath !== 'noimage.jpg'
              ? { uri: `${IMAGE_CONFIG.BASE_URL}${item.ImagePath}` }
              : require('../../../assets/images/homeScreenOne/placeholder.jpeg')}
            style={styles.newimage}
            resizeMode={item?.ImagePath && item.ImagePath !== 'noimage.jpg' ? "contain" : 'cover'}
            onError={(e) => console.error('Image error:', item.logo)}
            onLoad={() => console.log('Loaded:', item.logo)}
          />
        </View>
      </View>
      <Text style={[
        styles.price,
        { color: textColorStyle, alignSelf: "center", width: 100 },
        external.Pb_5,
        external.pt_5
      ]} >
        {item?.CategoryName ? item.CategoryName : ''}
      </Text>

      <Text style={[styles.price, { color: 'lightgraygray', alignSelf: "center" }, [external.Pb_5, external.pt_5]]}>

        {item?.ProductCount ? item.ProductCount : ''}  Product
      </Text>
    </TouchableOpacity>
  );

  return (
    data && <View style={{ backgroundColor: appColors.textColorWhite }}>

      <ScrollView
        contentContainerStyle={[external.Pb_80]}
        scrollEnabled={true}
        alwaysBounceVertical={true} 
        showsVerticalScrollIndicator={false}>
        <View style={[external.mt_10, external.mb_10, external.mh_10,]}>
          <H3HeadingCategory
            value={"Relevant Categories"}
          />

        </View>
        <View style={[external.mh_10, external.mb_60]}>
          <FlatList
            data={data.CategoryMasterList}
            renderItem={renderItem1}
            horizontal={true}
            contentContainerStyle={[external.mt_10]}
            showsVerticalScrollIndicator={false}
          />
          <FlatList
            data={data.KeywordList}
            renderItem={renderItem}
            alwaysBounceVertical={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

    </View>

  );
};

export default SearchingListingContainer;
