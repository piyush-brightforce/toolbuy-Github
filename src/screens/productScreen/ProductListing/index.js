import {
	FlatList, View, TouchableOpacity, ScrollView, Modal,
	Text,
	Animated,
	TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { commonStyles } from '../../../style/commonStyle.css';
import { useValues } from '../../../../App';
import ProductHeaderContainer from '../productHeaderContainer';
import FilterBar from '../ProductFilter';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../../commonComponents/productCard';
import styles from './style.css';
import axios from 'axios';
import API_URL from '../../../config/apiConfig';
import { CategoryProductResponse } from '../../../models/categoryProduct/CategoryProductResponse';
import { external } from '../../../style/external.css';
import IMAGE_CONFIG from '../../../config/imageConfig';
import CommonImage from './commonImage';
import appColors from '../../../themes/appColors';
import { SCREEN_HEIGHT } from '../../../themes/appConstant';
import DropdownSection from './dropDown/dropdown';
import PriceDropdown from './dropDown/priceRange';
import MultiSelectDropdown from './dropDown/multiselectiondropdown';
import { getValue, PREFERENCE_KEY, setValue } from '../../../utils/helper/localStorage';
import CartResponse from '../../../models/cart/cartresponse';
import { ShoppingCartResponse } from '../../../models/cart/cartmodel';

const toArray = (val) => {
	if (Array.isArray(val)) return val;
	if (val) return [val];
	return [];
};

const ProductListing = ({ route }) => {

	const navigation = useNavigation();
	const { item, isfrom = "" } = route.params ?? {};
	const { bgFullStyle, textColorStyle, settotalCartItem, t,
		isLoaderLoading,
		setIsLoaderLoading, } = useValues();
	const [categoryProductList, setcategoryProductList] = useState();
	const [filterCategoryProductList, setfilterCategoryProductList] = useState();
	const [responsePriceRange, setresponsePriceRange] = useState();
	const [filterBrandListResponse, setfilterBrandListResponse] = useState();
	const [priceFilter, setpriceFilter] = useState('pricelowtohigh');
	const [filterValue, setfilterValue] = useState('');
	const [selectedFilter, setSelectedFilter] = useState({});
	const [newArrayList, setNewArrayList] = useState([]);
	const [lastShopAllValue, setLastShopAllValue] = useState('');
	const [pageNo, setPageNo] = useState(1);
	const [listloading, setlistloading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	// bottomsheet selectionValues
	const [isSelectedSort, setIselectedSort] = useState(false);
	const [isBestValueSelected, setIsBestValueSelected] = useState();
	const [isSelectedSortValue, setIselectedSortValue] = useState('');
	const slideAnim = useRef(new Animated.Value(300)).current;
	const slideAnim1 = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

	//bottomSheet FilterValues
	const [isSelectedFilter, setIselectedFilter] = useState(false);
	const [filterDepartment, setfilterDepartment] = useState();
	const [filterBrand, setfilterBrand] = useState("");
	const [filterPrice, setfilterPrice] = useState("");
	const [filterCategory, setfilterCategory] = useState("");
	const [loadingProductId, setLoadingProductId] = useState(null);


	const SORT_OPTIONS = [
		"Best Seller",
		"Best Match",
		"Price Low to High",
		"Price High to Low",
	];

	const loadMore = async () => {
		if (!hasMore || listloading) return;

		const nextPage = pageNo + 1;
		setPageNo(nextPage);

		await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: nextPage });
	};

	//  React to changes
	useEffect(() => {
		setIsLoaderLoading(true);
		const initialize = async () => {
			if (item) {
				const initialArray = [
					{
						category: item.title,
						parentCategoery: item.parentCat,
						filterValue: item.url,
						filterKey: item.filterKey ? item.filterKey : 'category',
						categoryName: item.categoryName,
						filterTitle: item.filterTitle
					}
				]; 
				await fetchProductListingData({
					best: isBestValueSelected, price: priceFilter, pageindex: pageNo,
					customArray: initialArray
				});

				setNewArrayList(initialArray);

			} else {
				setIsLoaderLoading(false);
			}
		};

		initialize();
	}, [item]);



	const fetchProductListingData = async ({ best, price, pageindex, customArray }) => {

		try {

			setlistloading(true);
			const sourceArray = customArray || newArrayList;

			const lastValue = sourceArray?.length > 0
				? sourceArray[sourceArray.length - 1]
				: null;
			const [id, cartid] = await Promise.all([
				getValue(PREFERENCE_KEY.USERCUSTOMERID),
				getValue(PREFERENCE_KEY.CARTSESSIONID),
			]);

			const customerUserID = Number(id);

			const response = await axios.post(`${API_URL.PRODUCTSLISTING}`,
				{
					cat: lastValue.category,
					parentcat: lastValue.parentCategoery,
					offer: "",
					flag: "category",
					PageNo: pageindex ? pageindex : pageNo,
					pageSize: 32,
					orderBy: price,
					filterKey: lastValue.filterKey,
					filterValue: lastValue.filterValue + (best ? best : "") + (filterCategory ? filterCategory : "") + (filterBrand ? filterBrand : ""),
					priceRange: filterPrice ? filterPrice : "",
					filterUrl: "",
					url: "",
					CustomerID: (!customerUserID || customerUserID === 0) ? 0 : customerUserID,
					CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '',
					isBlUrl: false
				});

			const data = response.data;

			const model = new CategoryProductResponse(data);

			const catProdata = toArray(model?.result?.listProduct);

			setcategoryProductList(prev => {
				const safePrev = Array.isArray(prev) ? prev : [];

				return pageindex === 1
					? catProdata
					: [...safePrev, ...catProdata];
			});

			const catfilterProdata = toArray(model?.result?.listProductType);

			setfilterCategoryProductList(prev => {
				const safePrev = Array.isArray(prev) ? prev : [];

				return pageindex === 1
					? catfilterProdata
					: [...safePrev, ...catfilterProdata];
			});


			const catfilterBrandListdata = toArray(model?.result?.listFilter);

			setfilterBrandListResponse(prev => {
				const safePrev = Array.isArray(prev) ? prev : [];

				return pageindex === 1
					? catfilterBrandListdata
					: [...safePrev, ...catfilterBrandListdata];
			});


			const catfilterPriceRange = toArray(model?.result?.priceRange);

			setresponsePriceRange(prev => {
				const safePrev = Array.isArray(prev) ? prev : [];

				return pageindex === 1
					? catfilterPriceRange
					: [...safePrev, ...catfilterPriceRange];
			});


			const lastshopValue = lastValue
				? lastValue.categoryName + (lastValue.filterTitle ? ` / ${lastValue.filterTitle}` : '')
				: '';

			const filterValue = lastValue?.filterValue ? lastValue.filterValue : '';
			setfilterValue(filterValue);
			setLastShopAllValue(lastshopValue);

			setIsLoaderLoading(false);

			if (!model.result.listProduct || model.result.listProduct.length < 32) {
				setHasMore(false);
			}
			setlistloading(false);

		} catch (error) {
			console.error('Error fetchProductListingData :', error);
			setIsLoaderLoading(false);
			setlistloading(false);

			setLoadingProductId(null);
		}
	};

	const fetchCartData = async () => {
		try {

			// ✅ wait for async value
			const [id, cartid] = await Promise.all([
				getValue(PREFERENCE_KEY.USERCUSTOMERID),
				getValue(PREFERENCE_KEY.CARTSESSIONID),
			]);

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
			console.error('Error fetching fetchCartData:', error);
		}
	};


	const updateQuantity = async (productId, flag) => {
		try {
			setLoadingProductId(productId);
			const [id, cartId] = await Promise.all([
				getValue(PREFERENCE_KEY.USERCUSTOMERID),
				getValue(PREFERENCE_KEY.CARTSESSIONID),
			]);
			const customerUserID = Number(id);



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

					await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: pageNo });
				} else {
					setPageLoading(false);
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
					Flag: "insert",
					VariationID: 0
				});
				const result = response?.data;
				if (result?.Success) {
					await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: pageNo });
				} else {
					setIsLoaderLoading(false);
					setLoadingProductId(null);
				}
			}

		} catch (error) {
			setIsLoaderLoading(false);
			setLoadingProductId(null);
			console.error("Error fetching updateQuantity:", error);
		}
	};


	const handleFilterPress = (item) => {
		if (item.id === 1) {
			openFilterBottomSheet();
		} else if (item.id === 2) {
			openSheet();
		}
	};

	const handleProductPress = (item) => {
		if (!item.isSeries) {
			navigation.navigate('ProductDetail', { product: { code: item.productCode } });
		} else {
			const lastValue = newArrayList?.length > 0 ? newArrayList[newArrayList?.length - 1] : null;

			navigation.navigate('ViewSeriesProductList', { productCode: { code: item.productCode }, title: lastValue.parentCategoery.trim().split(" ")[0] ?? "" });
		}

	};

	const handleWishlistPress = (item) => {
		// Handle wishlist logic here
	};

	const handleQuantityChange = async (data) => {
		await updateQuantity(data.productId, data.action);
	};


	const updateLastValueOfNewArrayItem = async (item) => {

		const updatedArray = [...newArrayList];

		updatedArray[updatedArray.length - 1] = {
			category: updatedArray[0]?.category,
			parentCategoery: updatedArray[0]?.parentCategoery,
			filterValue: item?.filterCodeSlug,
			filterKey: "producttype",
			categoryName: updatedArray[0]?.categoryName,
			filterTitle: item?.filterValue
		};

		// ✅ Pass to API
		await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: pageNo, customArray: updatedArray });

		// ✅ Update state
		setNewArrayList(updatedArray);
	};


	const handleSelectProductItem = async (item) => {
		setIsLoaderLoading(true);
		setSelectedFilter(item);
		updatefilterDepartment({});
		updatefilterPrice('');
		updatefilterCategory('');
		updatefilterBrand('');
		if (item?.filterType !== "producttype") {

			const updatedArray = [
				...newArrayList,
				{
					category: item?.filterCodeSlug,
					parentCategoery: newArrayList[0]?.category,
					filterValue: isfrom === "brand" ? item?.filterCodeSlug : "",
					filterKey: "category",
					categoryName: newArrayList[0]?.category,
					filterTitle: isfrom === "brand" ? item?.filterValue : "",
				}
			];

			await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: pageNo, customArray: updatedArray });
			setNewArrayList(updatedArray);

		} else {
			setfilterValue(item?.filterCodeSlug);
			const lastshopValue = newArrayList?.length > 0 ? newArrayList[newArrayList?.length - 1]?.filterKey : '';
			if (lastshopValue === "producttype" && item?.filterType === "producttype") {
				updateLastValueOfNewArrayItem(item);

			} else {

				const updatedArray = [
					...newArrayList,
					{
						category: newArrayList[1]?.category,
						parentCategoery: newArrayList[1]?.parentCategoery,
						filterValue: item?.filterCodeSlug,
						filterKey: "producttype",
						categoryName: newArrayList[1]?.categoryName,
						filterTitle: item?.filterValue
					}
				];

				await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: pageNo, customArray: updatedArray });
				setNewArrayList(updatedArray);

			}

		}

	};


	const handleSelectBottomSheetValueItem = async (item) => {
		let bestValue = "";
		let priceValue = "";

		switch (item) {
			case "Best Seller":
				bestValue = "/bestseller";
				priceValue = "pricelowtohigh";
				break;

			case "Best Match":
				bestValue = "/bestmatch";
				priceValue = "pricelowtohigh";
				break;

			case "Price Low to High":
				bestValue = "";
				priceValue = "pricelowtohigh";
				break;

			case "Price High to Low":
				bestValue = "";
				priceValue = "pricehightolow";
				break;
		}
		// update UI state
		setIselectedSortValue(item);
		setIsBestValueSelected(bestValue);
		setpriceFilter(priceValue);

	};

	const handleShopAll = async () => {
		setIsLoaderLoading(true);
		setfilterValue('');
		updatefilterDepartment({});
		updatefilterPrice('');
		updatefilterCategory('');
		updatefilterBrand('');
		setNewArrayList(prev => prev.slice(0, -1));
		setSelectedFilter({});
		await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: pageNo });
	};

	const openSheet = () => {
		setIselectedSort(true);
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	const closeSheet = () => {
		Animated.timing(slideAnim, {
			toValue: 300,
			duration: 250,
			useNativeDriver: true,
		}).start(() => setIselectedSort(false));
	};

	const openFilterBottomSheet = () => {
		setIselectedFilter(true);
		Animated.timing(slideAnim1, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start();
	};

	const closeFilterBottomSheet = () => {
		Animated.timing(slideAnim1, {
			toValue: SCREEN_HEIGHT,
			duration: 100,
			useNativeDriver: true,
		}).start(() => setIselectedFilter(false));
	};


	const viewResultWithCloseSheet = async () => {
		setIsLoaderLoading(true);
		closeSheet();
		await fetchProductListingData({
			best: isBestValueSelected,
			price: priceFilter,
			pageindex: pageNo
		});
	};

	const updatefilterDepartment = (item) => setfilterDepartment(item);

	const updatefilterBrand = (item) => setfilterBrand(item);

	const updatefilterPrice = (item) => setfilterPrice(item);

	const updatefilterCategory = (item) => setfilterCategory(item);

	const viewResultWithFilterCloseSheet = async () => {
		setIsLoaderLoading(true);
		closeFilterBottomSheet();
		if (filterDepartment) {
			setSelectedFilter(filterDepartment);
			if (filterDepartment?.filterType !== "producttype") {
				const updatedArray = [
					...newArrayList,
					{
						category: filterDepartment?.filterCodeSlug,
						parentCategoery: newArrayList[0]?.category,
						filterValue: isfrom === "brand" ? filterDepartment?.filterCodeSlug : "",
						filterKey: "category",
						categoryName: newArrayList[0]?.category,
						filterTitle: isfrom === "brand" ? filterDepartment?.filterValue : "",
					}
				];

				await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: pageNo, customArray: updatedArray });
				setNewArrayList(updatedArray);
			} else {
				setfilterValue(filterDepartment?.filterCodeSlug);
				const lastshopValue = newArrayList?.length > 0 ? newArrayList[newArrayList?.length - 1]?.filterKey : '';
				if (lastshopValue === "producttype" && filterDepartment?.filterType === "producttype") {
					updateLastValueOfNewArrayItem(filterDepartment);
				} else {
					const updatedArray = [
						...newArrayList,
						{
							category: newArrayList[1]?.category,
							parentCategoery: newArrayList[1]?.parentCategoery,
							filterValue: filterDepartment?.filterCodeSlug,
							filterKey: "producttype",
							categoryName: newArrayList[1]?.categoryName,
							filterTitle: filterDepartment?.filterValue
						}
					];

					await fetchProductListingData({ best: isBestValueSelected, price: priceFilter, pageindex: pageNo, customArray: updatedArray });
					setNewArrayList(updatedArray);

				}

			}

		}
	};

	const renderProductItem = ({ item }) => (
		<ProductCard
			item={item}
			isCartloading={loadingProductId === item.productID}
			onPress={() => handleProductPress(item)}
			onWishlistPress={() => handleWishlistPress(item)}
			onAddToCart={() => updateQuantity(item.productID, 'insert')}
			onQuantityChange={handleQuantityChange}
		/>
	);

	const renderItem = ({ item }) => (
		<View>
			<TouchableOpacity style={[
				commonStyles.commonContainer,
				external.m_5,
				external.mt_10,

			]} onPress={() => handleSelectProductItem(item)}>

				<View style={[{
					borderWidth: (item.filterCodeSlug === filterValue && item.filterType === 'producttype') ? 2 : 0,
					borderColor: (item.filterCodeSlug === filterValue && item.filterType === 'producttype') ? appColors.primary : 'transparent',
					padding: 3,
					borderRadius: 100, // optional for better UI
				}]}>
					<View style={[styles.iconContainer]}>

						<CommonImage
							uri={`${IMAGE_CONFIG.BASE_URL}${item.filterImagePath}`}
							style={[styles.sidebarImage, {
							}]}
						/>

						<View style={styles.iconLayer}></View>
					</View>
				</View>
				<Text numberOfLines={2}
					ellipsizeMode="tail" style={[styles.title, { color: textColorStyle, alignSelf: "center", textAlign: 'center' }, [external.Pb_5, external.pt_5]]}>
					{item.filterValue}
				</Text>
			</TouchableOpacity>
		</View>
	);


	const renderHeader = ({ item }) => (
		<View>
			<ProductHeaderContainer
				type="title"
				title={item?.categoryName}
				onPress={() => navigation.goBack("")}
			/>

			<FilterBar onPress={handleFilterPress} />

			<View style={[external.mh_10]}>
				<ScrollView
					scrollEnabled={true}
					alwaysBounceVertical={true} 
					showsVerticalScrollIndicator={false}>

					<View style={[external.mh_10]}>
						<ScrollView horizontal={true}                 // ✅ Horizontal scroll
							showsHorizontalScrollIndicator={false}>
							<View style={{ flexDirection: 'row' }}>
								{filterCategoryProductList && <TouchableOpacity style={[
									commonStyles.commonContainer,
									external.m_5,
									external.mt_20,
									{ alignItems: 'center' }

								]} onPress={() => handleShopAll(lastShopAllValue)}>

									<View style={[{
										borderWidth: selectedFilter === item ? 2 : 0,
										borderColor: selectedFilter === item ? appColors.primary : 'transparent',
										padding: 3,
										borderRadius: 100, // optional for better UI
										alignItems: 'center',
										justifyContent: 'center',
									}]}>
										<View
											style={{
												width: 100,
												height: 100,
												borderRadius: 100,
												backgroundColor: appColors.primary,
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<Text
												style={[styles.title, { textAlign: 'center', color: appColors.textColorWhite, }]}
											>
												Shop All
											</Text>
										</View>
									</View>
									{lastShopAllValue && <Text numberOfLines={2}
										ellipsizeMode="tail" style={[styles.title, { color: textColorStyle, alignSelf: "center", textAlign: 'center' }, [external.Pb_5, external.pt_5]]}>
										{lastShopAllValue}
									</Text>}
								</TouchableOpacity>}
								<FlatList
									data={filterCategoryProductList}
									renderItem={renderItem}
									horizontal={true}
									showsVerticalScrollIndicator={false}
									showsHorizontalScrollIndicator={false}
									scrollEnabled={false}
								/>
							</View>
						</ScrollView>
					</View>
				</ScrollView>
			</View>
		</View>
	);


	return (
		<View style={{ flex: 1 }}>
			<View style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>
				
				<FlatList
					data={categoryProductList || []}
					renderItem={renderProductItem}
					keyExtractor={(item) => item.productID.toString()}

					ListHeaderComponent={renderHeader}

					contentContainerStyle={{ paddingBottom: 80 }}

					onEndReached={loadMore}
					onEndReachedThreshold={0.5}

					initialNumToRender={8}
					maxToRenderPerBatch={10}
					windowSize={5}
					removeClippedSubviews={true}
					showsVerticalScrollIndicator={false}
				/>
			</View>
			{isSelectedSort && <View style={styles.bottomsheetContainer}>
				<Modal transparent visible={isSelectedSort} animationType="none" >
					<TouchableWithoutFeedback onPress={closeSheet}>
						<View style={styles.bottomsheetoverlay} />
					</TouchableWithoutFeedback>

					<Animated.View

						style={[

							styles.sortbottomSheetAnimatedView,
							{ transform: [{ translateY: slideAnim }] }
						]}
					>
						{/* Header */}
						<View style={styles.bottomsheetheader}>
							<Text style={styles.bottomsheettitle}>Sort By</Text>
							<TouchableOpacity onPress={() => {

								closeSheet();
							}}>
								<Text style={styles.bottomsheetclose}>✕</Text>
							</TouchableOpacity>
						</View>

						{/* Options */}
						{SORT_OPTIONS.map((item, index) => (
							<TouchableOpacity
								key={index}
								style={styles.bottomsheetoptionRow}
								onPress={() => handleSelectBottomSheetValueItem(item)}
							>
								<View style={[
									styles.bottomsheetradioOuter,
									isSelectedSortValue === item && styles.bottomsheetradioSelectedOuter
								]}>
									{isSelectedSortValue === item && <View style={styles.bottomsheetradioInner} />}
								</View>

								<Text style={styles.bottomsheetoptionText}>{item}</Text>
							</TouchableOpacity>
						))}

						{/* Button */}
						<TouchableOpacity
							style={styles.bottomsheetbutton}
							onPress={() => {
								viewResultWithCloseSheet();
							}}
						>
							<Text style={styles.bottomsheetbuttonText}>View Results</Text>
						</TouchableOpacity>
					</Animated.View>
				</Modal>


			</View>}
			{isSelectedFilter && <View style={styles.bottomsheetContainer}>
				<Modal transparent statusBarTranslucent visible={isSelectedFilter} backgroundColor={"rgba(0,0,0,0.4)"} >
					<TouchableWithoutFeedback onPress={closeFilterBottomSheet}>
						<View style={styles.bottomsheetoverlay} />
					</TouchableWithoutFeedback>

					<Animated.View
						style={[
							styles.bottomSheetAnimatedView,
							{ transform: [{ translateY: slideAnim1 }] },
						]}
					>
						{/* Header */}
						<View style={styles.bottomsheetheader}>
							<Text style={styles.bottomsheettitle}>All Filters</Text>
							<TouchableOpacity onPress={() => {

								closeFilterBottomSheet();
							}}>
								<Text style={styles.bottomsheetclose}>✕</Text>
							</TouchableOpacity>
						</View>

						<ScrollView
							showsVerticalScrollIndicator={false}
							scrollEnabled={true}
							contentContainerStyle={{ paddingBottom: 20 }}
						>


							{/* Options */}
							{filterCategoryProductList && <DropdownSection
								title="Department"
								options={filterCategoryProductList}
								selected={filterDepartment}
								onSelect={setfilterDepartment}
							/>}


							{responsePriceRange && <PriceDropdown
								min={responsePriceRange.minPrice ?? 1}
								max={responsePriceRange.maxPrice ?? 10000}
								initialMin={responsePriceRange.minPrice ?? 1}
								initialMax={responsePriceRange.maxPrice ?? 10000}
								onSelect={(range) => {
									if (range.max) {
										updatefilterPrice(`|price=${range.min}-${range.max}`);
									}
								}} />}

							{filterCategoryProductList && newArrayList.length === 1 && <MultiSelectDropdown
								title={t("transData.CATEGORY")}
								data={filterCategoryProductList}
								onSelect={(values) => {
									const joinedCodes = values.map(item => item.filterCodeSlug).join(",");
									if (values) {
										updatefilterCategory(`|category=${joinedCodes}`);
									}
								}}
							/>}

							{filterBrandListResponse && <MultiSelectDropdown
								title="Brand"
								data={filterBrandListResponse}
								onSelect={(values) => {
									const joinedCodes = values.map(item => item.filterCode).join(",");
									if (values) {
										updatefilterBrand(`|brand=${joinedCodes}`);
									}

								}}
							/>}
						</ScrollView>

						{/* Button */}
						<TouchableOpacity
							style={styles.bottomsheetbutton}
							onPress={() => {
								viewResultWithFilterCloseSheet();
							}}
						>
							<Text style={styles.bottomsheetbuttonText}>View Results</Text>
						</TouchableOpacity>
					</Animated.View>
				</Modal>


			</View>}
		</View>

	);

};

export default ProductListing;
