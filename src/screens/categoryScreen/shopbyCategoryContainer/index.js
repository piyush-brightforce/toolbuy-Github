import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import { external } from '../../../style/external.css';
import styles from './style.css';
import { useValues } from '../../../../App';
import appColors from '../../../themes/appColors';
import { useNavigation } from '@react-navigation/native';
import IMAGE_CONFIG from '../../../config/imageConfig';
import { commonStyles } from '../../../style/commonStyle.css';
import { SCREEN_WIDTH } from '../../../themes/appConstant';
import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage';

const ShopByCategoryContainer = (data) => {
  const { linearColorStyle, textColorStyle, isDark, t, currSymbol, currPrice } =
    useValues();
  const navigation = useNavigation();
  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32', '#ffff',]
    : [appColors.screenBg, appColors.screenBg];
 
  const formatData = (data, numColumns) => {
    const fullRows = Math.floor(data.length / numColumns);
    let itemsLastRow = data.length - fullRows * numColumns;

    while (itemsLastRow !== numColumns && itemsLastRow !== 0) {
      data.push({ key: `blank-${itemsLastRow}`, empty: true });
      itemsLastRow++;
    }

    return data;
  };

  const CategoryItem = ({ item, navigation, textColorStyle }) => {
  const [imgError, setImgError] = useState(false);

  if (item.empty) {
    return <View style={{ flex: 1, margin: 5 }} />;
  }

  return (
    <View>
      <TouchableOpacity
        style={[
          commonStyles.commonContainer,
          external.m_5, 
          external.mt_10,
        ]}
        onPress={() =>
          item.categoryCode &&
          navigation.navigate("ProductListing", {
            item: {
              title: item.categoryCode,
              url: "",
              parentCat: item.categoryCode,
              filterKey: "",
              categoryName: item.categoryName,
              filterTitle: ''
            },
          })
        }
      >
        {item.imagePath ? (
          <View style={styles.iconContainer}>
            {item.imagePath?.endsWith(".svg") ? (
              <FixedSvgFromUrl
                width={SCREEN_WIDTH * 0.27}
                height={SCREEN_WIDTH * 0.27}
                uri={`${IMAGE_CONFIG.BASE_URL}/${item.imagePath}`}
              />
            ) : (
              <Image
                source={
                  imgError ||
                  !item.imagePath ||
                  item.imagePath === "noimage.jpg"
                    ? require("../../../assets/images/homeScreenOne/placeholder.jpeg")
                    : { uri: `${IMAGE_CONFIG.BASE_URL}/${item.imagePath}` }
                }
                style={styles.sidebarImage}
                onError={() => setImgError(true)}
              />
            )}

            <View style={styles.iconLayer}></View>
          </View>
        ) : (
          <View style={styles.iconContainer}></View>
        )}

        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.title,
            { color: textColorStyle, alignSelf: "center", textAlign: "center" },
            [external.Pb_5, external.pt_5],
          ]}
        >
          {item.categoryName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

  return (

    <View>
      {data && <View style={[external.mh_20]}>
        <H3HeadingCategory
          value={"Shop By Category"}
          show={false}
        />

      </View>}
      {data && <View style={[external.mh_10]}>

        <FlatList
       
          data={formatData(data.data, 3)}
          renderItem={({ item }) => (
    <CategoryItem
      item={item}
      navigation={navigation}
      textColorStyle={textColorStyle}
    />
  )}
          numColumns={3}
          columnWrapperStyle={styles.newrow}
          showsVerticalScrollIndicator={false}
        />
      </View>}
    </View>
  );
};

export default ShopByCategoryContainer;
