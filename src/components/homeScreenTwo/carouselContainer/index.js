import { Dimensions, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SCREEN_WIDTH, windowWidth } from '../../../themes/appConstant';
import styles from './styles';
import { useValues } from '../../../../App';
import axios from 'axios';
import IMAGE_CONFIG from '../../../config/imageConfig';
import API_URL from '../../../config/apiConfig';
import BannerModel from '../../../models/banner/banner';
import { useNavigation } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');


const CarouselContainer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useValues();
  const [bannerData, setBanner] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {

    const fetchBannerData = async () => {
      try {
        const response = await axios.post(`${API_URL.BANNERLIST}`, {
          BannerType: "HPMB"
        });
        const data = response.data;
        const apiData = data.Result.map(item => new BannerModel(item));
        setBanner(apiData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBannerData();

  });

	const getLastSegment = (url) => {
		if (!url) return "";
		return url.replace(/\/+$/, "").split('/').pop();
	};



	const onTapItem =  async (value) => { 
      const lastSegment = await getLastSegment(value.url); 
      value && navigation.navigate("ProductListing", { item: { title: value.title.trim().split(" ")[0], url: lastSegment, parentCat: value.title.trim().split(" ")[0],filterKey: "", categoryName: value.title.trim().split(" ")[0],filterTitle:'' } , isfrom: 'brand'});
    };


  const renderItem = ({ item }) => {
     return (
    <View style={styles.slide}>
      <View style={styles.imageWrapper}>
        <Pressable style={{ flex: 1 }} onPress={() => onTapItem(item)}>
          <Image
            style={styles.imageBackground}
            source={{ uri: `${IMAGE_CONFIG.BASE_URL}${item.imagepath}` }}
          />
        </Pressable>
      </View>
    </View>
  );
  };

  return (
    <>
      <Carousel
        data={bannerData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        autoplay={true}
        autoplayInterval={3000}
        loop
        enableMomentum={true}

        lockScrollWhileSnapping
        onSnapToItem={(index) => setActiveIndex(index)}
      />

    </>

  );
};

export default CarouselContainer;
