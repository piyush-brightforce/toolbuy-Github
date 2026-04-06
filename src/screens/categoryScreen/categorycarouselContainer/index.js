import { Dimensions, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import IMAGE_CONFIG from '../../../config/imageConfig';
import { useNavigation } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');
import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage';
import { external } from '../../../style/external.css';


const CategoryCarouselContainer = (data) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
 
  const CarouselItem = ({ item, navigation }) => {
  const [imgError, setImgError] = useState(false);

	const getLastSegment = (url) => {
		if (!url) return "";
		return url.replace(/\/+$/, "").split('/').pop();
	};


  return (
    <View style={[styles.slide]}>
      <Pressable
        onPress={async () =>
        {
           const lastSegment = await getLastSegment(item.bannerURL); 
          item.bannerURL &&
          navigation.navigate("ProductListing", {
            item: {
              title: lastSegment,
              url: "",
              parentCat: lastSegment,
              filterKey: "",
              categoryName: item.shortDescr,
              filterTitle: '' 
            },
          });
        }
        }
      >
        {item.imagePath?.endsWith(".svg") ? (
          <FixedSvgFromUrl
            width={"100%"}
            height={"100%"}
            uri={`${IMAGE_CONFIG.BASE_URL}/${item.imagePath}`}
          />
        ) : (
          <Image
            resizeMode="center"
            style={styles.imageBackground}
            source={
              imgError ||
              !item.imagePath ||
              item.imagePath === "noimage.jpg"
                ? require("../../../assets/images/homeScreenOne/placeholder.jpeg")
                : { uri: `${IMAGE_CONFIG.BASE_URL}/${item.imagePath}` }
            }
            onError={() => setImgError(true)}
          />
        )}
      </Pressable>
    </View>
  );
};
const renderItem = ({ item }) => {
  return <CarouselItem item={item} navigation={navigation} />;
};

  return (
    <View style={[(data.data.length === 0 || !data.data) && external.mb_10,{ flex: 1}]}>
      <Carousel 
       
        data={data.data}
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
      

    </View>

  );
};

export default CategoryCarouselContainer;
