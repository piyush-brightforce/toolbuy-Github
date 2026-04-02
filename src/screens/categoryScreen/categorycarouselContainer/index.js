import { Dimensions, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import IMAGE_CONFIG from '../../../config/imageConfig';
import { useNavigation } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');
import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage';


const CategoryCarouselContainer = (data) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
 
  const CarouselItem = ({ item, navigation }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <View style={styles.slide}>
      <Pressable
        onPress={() =>
          item.filterCode &&
          navigation.navigate("ProductListing", {
            item: {
              title: item.filterCode,
              url: "",
              parentCat: item.filterCode,
              filterKey: "",
              categoryName: item.filterValue,
              filterTitle: '' 
            },
          })
        }
      >
        {item.filterImagePath?.endsWith(".svg") ? (
          <FixedSvgFromUrl
            width={"100%"}
            height={"100%"}
            uri={`${IMAGE_CONFIG.BASE_URL}/${item.filterImagePath}`}
          />
        ) : (
          <Image
            resizeMode="center"
            style={styles.imageBackground}
            source={
              imgError ||
              !item.filterImagePath ||
              item.filterImagePath === "noimage.jpg"
                ? require("../../../assets/images/homeScreenOne/placeholder.jpeg")
                : { uri: `${IMAGE_CONFIG.BASE_URL}/${item.filterImagePath}` }
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
    <>
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
      

    </>

  );
};

export default CategoryCarouselContainer;
