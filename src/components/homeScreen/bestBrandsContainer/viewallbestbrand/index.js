import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { external } from '../../../../style/external.css';
import styles from './style.css';
import { fontSizes, SCREEN_HEIGHT, SCREEN_WIDTH, windowWidth } from '../../../../themes/appConstant';
import { useValues } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';
import IMAGE_CONFIG from '../../../../config/imageConfig';
import FixedSvgFromUrl from '../../../../commonComponents/customSvgImage/customSvgImage';
import Brand from '../../../../models/brandmodel';
import axios from 'axios';
import API_URL from '../../../../config/apiConfig';
import appFonts from '../../../../themes/appFonts';
import ProductHeaderContainer from '../../../../screens/productScreen/productHeaderContainer';
import appColors from '../../../../themes/appColors';
import LoaderScreen from '../../../../screens/loaderScreen';
const ViewAllBestBrandUnderRoof = ({
    data,
    width,
    value,
    horizontal,
    numColumns,
    valueTwo,
    show,
}) => {
    const {
        isDark,
        t,
    } = useValues();
    const [isloading, setisloading] = useState(true);

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
    const [filterbrandData, setfilterbrandData] = useState([]);
    const navigation = useNavigation();
    const alphabet = ["All", "0-9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const [selectedLetter, setSelectedLetter] = useState(null);

    useEffect(() => {
        fetchBrandData();
    }, []);

    const fetchBrandData = async () => {
        try {

            const response = await axios.get(`${API_URL.GETALLBRANDS}`);
            const data = response.data;
            const apiData = data.Result.BrandList.map(item => new Brand(item));
            setBrands(apiData);
            setisloading(false);

        } catch (error) {
            setisloading(false);
            console.error('Error fetching data:', error);
        }
    };

    const selectAlphabet = async (item) => { 
        setSelectedLetter(item);
        if (item === "All") {
            const result = brandData.filter(branditem =>
                branditem
            );
            setfilterbrandData(result);
        } else if (item === "0-9") {
            const result = brandData.filter(branditem => {
                const name = branditem?.name || "";
                return /^[0-9]/.test(name); // starts with any digit
            });

            setfilterbrandData(result);
        } else {
            const result = brandData.filter(branditem =>
                branditem.name.toLowerCase().startsWith(item.toLowerCase())
            ); 
            setfilterbrandData(result);
        }

    };

    const AlphabetList = () => {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={[
                    styles.itemAlphabet,
                    selectedLetter === item && styles.selectedItem
                ]}
                onPress={() => selectAlphabet(item)}
            >
                <Text style={{ color: "#000", textAlign: 'center' }}>
                    {item}
                </Text>
            </TouchableOpacity>
        );

        return (
            <FlatList
                data={alphabet}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                horizontal
                contentContainerStyle={[external.mh_10,]}
                showsHorizontalScrollIndicator={false}
            />
        );
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, { width: SCREEN_WIDTH / 2.2 }, external.mt_10]}>
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
                                : require('../../../../assets/images/homeScreenOne/placeholder.jpeg')
                        }

                        style={styles.img}
                        onError={(e) => console.log('Image error:', item.logo)}
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
                        color: item.description ? '#555' : "white",
                        fontSize: fontSizes.FONT13,
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
                                        : require('../../../../assets/images/homeScreenOne/placeholder.jpeg')
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
            <TouchableOpacity style={styles.button} onPress={() => item.code && navigation.navigate("ProductListing", {
                item: {
                    title: item.code,
                    url: "",
                    parentCat: item.code,
                    filterKey: "",
                    categoryName: item.name,
                    filterTitle: ''

                },
            })} >
                <Text style={[styles.buttonText, [external.ph_5]]}
                    numberOfLines={1}>{t("transData.VISIT")} {item.name} {t("transData.STORE")}</Text>
            </TouchableOpacity>
        </View>

    );
    return (
        <View style={{ flex: 1 }} >
            {brandData && (
                <View style={{ flex: 1 }}>
                    <ProductHeaderContainer
                        type="title"
                        title={t("transData.ALL_BRANDS")}
                        onPress={() => navigation.goBack()}
                    />

                    <AlphabetList />

                    <FlatList
                        data={
                            filterbrandData && filterbrandData.length > 0
                                ? filterbrandData
                                : brandData
                        }
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={[external.mb_50, external.mh_10]}
                        columnWrapperStyle={styles.newrow}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
            {isloading && <Modal transparent visible={true}>
                <LoaderScreen />
            </Modal>}
        </View>

    );

};

export default ViewAllBestBrandUnderRoof;
