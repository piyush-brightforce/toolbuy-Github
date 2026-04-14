


import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import { external } from '../../../style/external.css';
import styles from './style.css';
import { windowWidth } from '../../../themes/appConstant';
import { useValues } from '../../../../App';
import appColors from '../../../themes/appColors';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import IMAGE_CONFIG from '../../../config/imageConfig';
import API_URL from '../../../config/apiConfig';
import TopDealResponse from '../../../models/products/topdealmodel';
import { getValue, PREFERENCE_KEY } from '../../../utils/helper/localStorage';
import { formatCurrency } from '../../../style/rtlStyle';
 
const TopDealOfTheMonthContainer = () => {
  const { linearColorStyle, textColorStyle, isDark, t,  currency,curreLocale } =
    useValues();

  const colors = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32', '#ffff', 'gray']
    : [appColors.screenBg, appColors.screenBg];
    const navigation = useNavigation();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  useEffect(() => {

    const fetchProductData = async () => { 
      try {

      const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
      const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);

      const customerUserID = Number(id);
        const response = await axios.post(`${API_URL.TOPDEALOFTHEMONTH}`, {
          ProductCode: "string",
          CustomerID: customerUserID,
          CartSessionID: (!customerUserID || customerUserID === 0)?cartid || '' :"",
        }); 
        const data = response.data; 
        const productModel = new TopDealResponse(data); // convert JSON → model

        setProduct(productModel.product);
        setImages(productModel.images);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProductData();
  }, []);

 
	const handleOnProductDetails = (item) => { 
    navigation.navigate('ProductDetail',{product: {code: item?.code}})
		// Navigate or open overlay here
	};
 

  const RenderItem = () => {
  return (
    	<TouchableOpacity
			activeOpacity={0.9}
			style={[styles.container, { backgroundColor: appColors.textColorWhite }]}
      onPress={() => handleOnProductDetails(product) }
		>
			<View style={styles.imageContainer}>
				
        {images[0]?.fullImageUrl && (
                <Image 
                  source={images[0].fullImageUrl && images[0].fullImageUrl !== 'noimage.jpg'
              ? { uri: `${IMAGE_CONFIG.BASE_URL}/${images[0].fullImageUrl}` }
              : require('../../../assets/images/homeScreenOne/placeholder.jpeg')}
              style={styles.productImage} 
					      resizeMode="cover"
               />
              )}
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.headerRow}>
					<View style={styles.titleContainer}>
						<Text
							style={[styles.productTitle, { color: textColorStyle }]}
							numberOfLines={2}
						>
							{product?.slug}
						</Text>
					</View>
				</View>

				<View style={styles.priceRow}>
					<Text style={[styles.currentPrice, { color: textColorStyle }]}>
						{`${formatCurrency(product?.sellingPrice ?? "0", currency, curreLocale)}`}{" "}
					</Text>
					<Text style={styles.originalPrice}> 
              {`${formatCurrency(product?.listPrice ?? "0", currency, curreLocale)}`}
						</Text>
				</View>


			</View>
		</TouchableOpacity>
  );
};

  return (
    (product) && 
    <View>

      <View
        style={[
          external.fd_row,
          external.js_space,
          external.ai_center,
          { width: '100%' },
          external.ph_20,
        ]}
      >
        <Text style={[styles.title, { color: 'red' }, external.Pb_5]}>
          {t("transData.TOP_DEALS")}{" "}
          <Text style={[styles.title, { color: textColorStyle }]}>
            Of the Month
          </Text>
        </Text>
        <TouchableOpacity onPress={() => handleOnProductDetails(product)}>
          <Text style={styles.seeAllText}>{"View"}</Text>
        </TouchableOpacity>
      </View>
      <RenderItem key={product?.code}/>
    </View>

  );
};

export default TopDealOfTheMonthContainer;
