import {
    FlatList, View, ScrollView, Modal,
    Text,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { commonStyles } from '../../../../style/commonStyle.css';
import { useValues } from '../../../../../App';
import ProductHeaderContainer from '../../productHeaderContainer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from './style.css';
import axios from 'axios';
import API_URL from '../../../../config/apiConfig';
import IMAGE_CONFIG from '../../../../config/imageConfig';
import { external } from '../../../../style/external.css';
import { getValue, PREFERENCE_KEY, setValue } from '../../../../utils/helper/localStorage';
import { ProductSeriesResponse } from '../../../../models/series/seriesmodel';
import SeriesProductCard from '../../seriesProductCard';
import CommonImage from '../commonImage';
import { fontSizes } from '../../../../themes/appConstant';
import appFonts from '../../../../themes/appFonts';
import LoaderScreen from '../../../loaderScreen';
import CartResponse from '../../../../models/cart/cartresponse';
import { ShoppingCartResponse } from '../../../../models/cart/cartmodel';
import { formatCurrency } from '../../../../style/rtlStyle';
const ViewSeriesProducts = ({ route }) => {

    const navigation = useNavigation();
    const { productCode } = route.params ?? {};
    const { bgFullStyle, textColorStyle,  viewRTLStyle, settotalCartItem,currency,curreLocale } = useValues();
    const [productSeriesList, setproductSeriesList] = useState([]);
    const [productSeries, setproductSeries] = useState();
 
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [productSerialization, setproductSerialization] = useState([]);
    const [isLoading, setLoadingValue] = useState(true);

    //  React to changes
    useEffect(() => {
        fetchProductSeriesListingData();
    }, []);


    const fetchProductSeriesListingData = async () => {

        try { 
            const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID); 
            const customerUserID = Number(id); 
            const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);
             const response = await axios.post(`${API_URL.SERIESDETAIL}`, { CustomerID: customerUserID, CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '', ProductCode: productCode.code });
 
            const data = response.data; 

            const model = new ProductSeriesResponse(data); 
            updateProductSeriesValue(model.result.productSeries);
            updateProductSerializationValue(model.result.productSeriesSpecificationList)
            updateProductSeriesListValue(model.result.seriesProducts); 


            setLoadingValue(false);
            setLoadingProductId(null);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoadingValue(false);
           setLoadingProductId(null);
        }
    };

    const fetchCartData = async () => {
        try {

            // ✅ wait for async value
            const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
            const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);

            const customerUserID = Number(id);
 
            const response = await axios.post(API_URL.GETSHOPPINGCART, {
                CustomerID: customerUserID,
                CartSessionID: (!customerUserID || customerUserID === 0) ? cartid ?? "" : "",
            }); 
            const cartListModelData = new ShoppingCartResponse(response.data);
            if (cartListModelData.success) {
                settotalCartItem(cartListModelData.shoppingCartMaster.totalItems ?? 0);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const updateQuantity = async (productId, flag) => {
        try { 
            setLoadingProductId(productId);
            // ✅ wait for async value
            const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);

            const customerUserID = Number(id);
            const cartId = await getValue(PREFERENCE_KEY.CARTSESSIONID);

             if (!customerUserID || customerUserID === 0) {
                const response = await axios.post(API_URL.UPDATESHOPPINGCART, {
                    ProductID: productId,
                    CustomerID: 0,
                    CartSessionID: cartId || '',
                    Qty: 1,
                    Couponcode: '',
                    ShippingCharge: 0,
                    Zipcode: '',
                    Flag: flag,
                    VariationID: 0
                }); 
                const result = new CartResponse(response.data);
                if (result.success) {
                    
                    if (!cartId || cartId == "") {
                        await setValue(
                            PREFERENCE_KEY.CARTSESSIONID,
                            result?.result.shoppingCartSummary[0].cartSessionID
                        );
                    }
                    fetchCartData();
                    await fetchProductSeriesListingData();
                } else {
                    setPageLoading(false);
                    setLoadingProductId(null);
                }
            } else {
                const response = await axios.post(API_URL.UPDATESHOPPINGCART, {
                    ProductID: productId,
                    CustomerID: customerUserID,
                    CartSessionID: "",
                    Qty: 1,
                    Couponcode: '',
                    ShippingCharge: 0,
                    Zipcode: '',
                    Flag: flag,
                    VariationID: 0
                }); 
                const result = response?.data;
                if (result?.Success) {
                    await fetchProductSeriesListingData();
                } else {
                    setLoadingValue(false);
                    setLoadingProductId(null);
                }
            }


        } catch (error) {
            setLoadingValue(false);
            setLoadingProductId(null);
            console.error("Error fetching data1:", error);
        }
    };


    const handleProductPress = (item) => {
        navigation.navigate('ProductDetail', { product: { code: productSeries.productCode } });
    };

    const handleWishlistPress = (item) => { 
        // Handle wishlist logic here
    };

    const handleQuantityChange = async (data) => { 
        await updateQuantity(data.productId, data.action);
    };

    const updateProductSeriesListValue = (item) => {
        setproductSeriesList(prev => {
            const updated = item; // copy array
            return updated;
        });
    };

    const updateProductSeriesValue = (item) => {
        setproductSeries(prev => {
            const updated = item; // copy array
            return updated;
        });
    };

    const updateProductSerializationValue = (item) => {
        setproductSerialization(prev => {
            const updated = item; // copy array
            return updated;
        });
    };


    const renderSeriesProductListItem = ({ item }) => (
        <SeriesProductCard
            item={item}
            isCartloading={loadingProductId === item.productID}
            onPress={() => handleProductPress(item)}
            onWishlistPress={() => handleWishlistPress(item)}
            onAddToCart={() => updateQuantity(item.productID, 'insert')}
            onQuantityChange={handleQuantityChange}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>
                <ProductHeaderContainer type='title' title={productSeries?.filterValue} onPress={() => navigation.goBack('')} />


                <ScrollView
                    contentContainerStyle={[external.Pb_80]}
                    scrollEnabled={true}
                    alwaysBounceVertical={true}
                    // style={[styles.container, { backgroundColor: bgFullStyle }]}
                    showsVerticalScrollIndicator={false}>

                    <View style={[external.mh_10, external.mb_60, { flex: 1 }]}>
                        <View style={[external.fd_coloumn, external.ai_center, external.fx_1, { borderBottomWidth: 1, borderBottomColor: "#ccc" }, external.Pb_15]}>

                            {productSeries?.imagePath && <View style={styles.imageContainer}>

                                <CommonImage uri={`${IMAGE_CONFIG.BASE_URL}${productSeries?.imagePath}`} style={styles.productImage} />


                            </View>}
                            {productSeries?.productTitle && <Text
                                style={[styles.productTitle, { color: textColorStyle, textAlign: 'center' }]}
                                numberOfLines={2}
                            >
                                {productSeries?.productTitle}
                            </Text>}
                            <View style={[external.fd_row, external.as_center,]}>
 
                                {productSeries?.minPrice && <Text style={[styles.priceContainer, { color: textColorStyle }]}>
                                    Price Range:
                                </Text>}
                                {productSeries?.minPrice && <Text style={[styles.priceContainer, { color: textColorStyle }]}>
                                    {`${formatCurrency(productSeries?.minPrice ?? "0", currency, curreLocale)} -`}</Text>}
                                {productSeries?.maxPrice && <Text style={[styles.priceContainer, { color: textColorStyle }]}>{`${formatCurrency(productSeries?.maxPrice ?? "0", currency, curreLocale)}`}
                                </Text>}
                            </View>
 
                            
                        </View>
                        <View style={[external.fd_coloumn, external.fx_1, { borderBottomWidth: 1, borderBottomColor: "#ccc" }, external.Pb_15]}>
                            {productSerialization
                                ?.map((feature, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            external.fd_row,
                                            external.mt_10,
                                            { flexDirection: viewRTLStyle },
                                        ]}
                                    >
                                        {feature?.attributeType && <Text
                                            style={[
                                                commonStyles.subtitleText,
                                                { color: textColorStyle, fontSize: fontSizes.FONT15, fontFamily: appFonts.bold },
                                            ]}
                                        >
                                            {`${feature?.attributeType}: `}
                                        </Text>}
                                        {feature?.attributeValue && <Text
                                            style={[
                                                commonStyles.subtitleText,
                                                { color: textColorStyle, fontSize: fontSizes.FONT15 },
                                            ]}
                                        >
                                            {`${feature?.attributeValue}`}
                                        </Text>}
                                    </View>
                                ))}
                        </View>
                        <FlatList
                            data={productSeriesList}
                            // data={productData}
                            renderItem={renderSeriesProductListItem}
                            keyExtractor={(item) => item.productID.toString()}
                            contentContainerStyle={{ paddingVertical: 10 }}

                            alwaysBounceVertical={false}
                            scrollEnabled={false}
                        />
                    </View>
                </ScrollView>
            </View>
            {isLoading && <Modal transparent visible={isLoading}>
                <LoaderScreen />
            </Modal>}


        </View>

    );


};

export default ViewSeriesProducts;
