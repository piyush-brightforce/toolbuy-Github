import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react'; 
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import { external } from '../../../style/external.css'; 
import styles from './style.css';
import { fontSizes, SCREEN_WIDTH, windowHeight, windowWidth } from '../../../themes/appConstant';
import { useValues } from '../../../../App'; 
import { useNavigation } from '@react-navigation/native';
import IMAGE_CONFIG from '../../../config/imageConfig'; 
import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage'; 
import Brand from '../../../models/brandmodel';
import axios from 'axios';
import API_URL from '../../../config/apiConfig'; 
import appFonts from '../../../themes/appFonts';
import appColors from '../../../themes/appColors';
const BestBrandUnderRoof = ( ) => {
  const {
    isDark,
    t,
  } = useValues();

  const stripHtml = (html) => {
    if (!html || typeof html !== 'string') {
      return '';
    }

    return html
      .replace(/<[^>]+>/g, '')     // remove HTML tags
      .replace(/&nbsp;/g, ' ')     // remove &nbsp;
      .trim();
  };

  const [brandData, setBrands] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {

    const fetchBrandData = async () => {
      try {

        const response = await axios.post(`${API_URL.BESTBRANDS}`, {
          limit: 10
        });
        const data = response.data;
        const apiData = data.Result.map(item => new Brand(item));
        setBrands(apiData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBrandData();
  }, []);
  const renderItem = ({ item }) => (
    <View style={[styles.shadowWrapper, external.ml_15, external.mb_20, external.mt_10]}>
      <View style={[styles.card, { width: SCREEN_WIDTH / 2.0 }]}>
      {/* Banner */}
      <Image
        source={{
          uri: `https://beta.toolbuy.com/images/brand-cover.jpg`,
        }}
        style={styles.banner}
      />

      {/* Circular Logo */}
      <View style={styles.logoWrapper}>
        {item.logo?.endsWith('.svg') ? (
          <FixedSvgFromUrl
            width={windowWidth(80)}
            height={windowWidth(80)}
            uri={`${IMAGE_CONFIG.BASE_URL}/${item.logo}`}
          />

        ) : (
          <Image
            source={
              item.logo && item.logo !== 'noimage.jpg'
                ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item.logo}` }
                : require('../../../assets/images/homeScreenOne/placeholder.jpeg')
            }


            style={styles.img}
            onError={(e) => console.error('Image error:', item.logo)}
            onLoad={() => console.log('Loaded:', item.logo)}
          />
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.title]}>About {item.name}</Text>

        <Text
          numberOfLines={4}
          ellipsizeMode="tail"
          style={{
            textAlign: 'center',
            color: item.description ? appColors.textColorBlack : "white",
            fontSize: fontSizes.FONT14,
            fontFamily: appFonts.medium
          }}
        >
          {stripHtml(item.description ? item.description : "abcsrfkwejfndsjkbfjkbsdkjbfjkbsdkjbfabcsrfkwejfndsjkbfjkbsdkjbfjkbsdkjbfabcsrfkwejfndsjkbfjkbsdkjbfjkbsdkjbf")}
        </Text>
        {/* Small Images */}
        <View style={styles.previewRow}>
          {item.categories.slice(0, 3).map((_, index) => (
            <View key={index} style={styles.previewCircle}>
              <Image

                source={
                  item.categories[index].image
                    ? { uri: `${IMAGE_CONFIG.BASE_URL}/${item.categories[index].image}` }
                    : require('../../../assets/images/homeScreenOne/placeholder.jpeg')
                }
                style={styles.previewImage}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* CTA */}
      <TouchableOpacity style={styles.button} onPress={() => item.code && navigation.navigate("ProductListing",{item:{
        title: item.code,
        url:"",
        parentCat: item.code,
        filterKey: "",
        categoryName: item.name,
        filterTitle:'' 

      } }) } >
        <Text style={[styles.buttonText,[external.ph_5]]}
          numberOfLines={1}>{t("transData.VISIT")} {item.name} {t("transData.STORE")}</Text>
      </TouchableOpacity>
    </View>
    </View>
    
  );
  return (
    <View>
      {brandData && (
        <View style={[external.mh_20, external.mt_10]}>
          <H3HeadingCategory
            value={t('transData.bestBrandUnderRoof')}
            seeall={t('transData.seeAll')}
            onpressViewall={()=> navigation.navigate('ViewAllBestBrand')}
          />
        </View>
      )}
      {brandData && <View >
        <FlatList
          data={brandData}
          numColumns={1}
          horizontal={true}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[external.mt_10,external.mb_50]}
          showsHorizontalScrollIndicator={false}
        />
      </View>}
    </View>
  );

};

export default BestBrandUnderRoof;
