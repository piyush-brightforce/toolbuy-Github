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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import LoaderScreen from '../../loaderScreen';
import CartResponse from '../../../models/cart/cartresponse';
import { ShoppingCartResponse } from '../../../models/cart/cartmodel';
const ProductListing = ({ route }) => {

	const navigation = useNavigation();
	const { item, isfrom = "" } = route.params ?? {};
	const { bgFullStyle, textColorStyle, settotalCartItem,t } = useValues();
	const [categoryProductList, setcategoryProductList] = useState();
	const [filterCategoryProductList, setfilterCategoryProductList] = useState();
	const [responsePriceRange, setresponsePriceRange] = useState();
	const [filterBrandListResponse, setfilterBrandListResponse] = useState();
	const [priceFilter, setpriceFilter] = useState('pricelowtohigh');
	const [filterValue, setfilterValue] = useState('');
	const [selectedFilter, setSelectedFilter] = useState({});
	const [newArrayList, setNewArrayList] = useState([]);
	const [isLoading, setLoadingValue] = useState(true);
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
					// Call API directly
					await fetchProductListingData({
						best: isBestValueSelected, price: priceFilter, pageindex: pageNo,
						customArray: initialArray
					});

					setNewArrayList(initialArray);

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
			const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID); 
			const customerUserID = Number(id);
			const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);
			 
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
					CustomerID: customerUserID,
					CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '',
					isBlUrl: false
				});

			const data = response.data;

			const model = new CategoryProductResponse(data);

			if (pageindex === 1) {
				updateCategoryListValue(model.result.listProduct);
				updateFilterCategoryListValue(model.result.listProductType);
				updateFilterBrandListResponse(model.result.listFilter);
				updateResponsePriceValue(model.result.priceRange);

				// const lastItem = newArrayList?.length > 0 ? newArrayList[newArrayList.length - 1] : null;
				const sourceArray = customArray || newArrayList;

			const lastValue = sourceArray?.length > 0
				? sourceArray[sourceArray.length - 1]
				: null;

				const lastshopValue = lastValue
					? lastValue.categoryName + (lastValue.filterTitle ? ` / ${lastValue.filterTitle}` : '')
					: '';

				updateLastShopAllValue(lastshopValue);
				const filterValue = lastValue?.filterValue ? lastValue.filterValue : '';
				updateFilterValue(filterValue);

			} else {
				updateCategoryListValue(prev => [...prev, ...model.result.listProduct]);
				updateFilterCategoryListValue(prev => [...prev, ...model.result.listProductType]);
				updateFilterBrandListResponse(prev => [...prev, ...model.result.listFilter]);
				updateResponsePriceValue(prev => [...prev, ...model.result.priceRange]);

				// const lastItem = newArrayList?.length > 0 ? newArrayList[newArrayList.length - 1] : null;
				const sourceArray = customArray || newArrayList;

			const lastValue = sourceArray?.length > 0
				? sourceArray[sourceArray.length - 1]
				: null;


				const lastshopValue = lastValue
					? lastValue.categoryName + (lastValue.filterTitle ? ` / ${lastValue.filterTitle}` : '')
					: '';
				const filterValue = lastValue?.filterValue ? lastValue.filterValue : '';
				updateFilterValue(filterValue);
				updateLastShopAllValue(lastshopValue);
			}

			if (pageNo < 32) {
				setHasMore(false);
			}

			setLoadingValue(false);
			setlistloading(false);
			setLoadingProductId(null);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoadingValue(false);
			setlistloading(false);

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
			// setLoadingValue(true); 
			// ✅ wait for async value
			setLoadingProductId(productId);
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


	const handleFilterPress = (item) => {
		if (item.id === 1) { 
			openFilterBottomSheet();
		} else if (item.id === 2) {
			openSheet(); 
		}

		// Navigate or open overlay here
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
		// setNewArrayList(prev => {
		// 	const updated = [...prev]; // copy array
		// 	updated[updated.length - 1] = {
		// 		category: updated[0].category,
		// 		parentCategoery: updated[0].parentCategoery,
		// 		filterValue: item.filterCodeSlug,
		// 		filterKey: "producttype",
		// 		categoryName: updated[0].categoryName,
		// 		filterTitle: item.filterValue
		// 	};
		// 	return updated;
		// });

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

	const updatePricefilter = (item) => {
		setpriceFilter(prev => {
			const updated = item; // copy array
			return updated;
		});
	};


	const updateFilterValue = (item) => {
		setfilterValue(prev => {
			const updated = item; // copy array
			return updated;
		});
	};

	const updateLastShopAllValue = (item) => {
		setLastShopAllValue(prev => {
			const updated = item; // copy array
			return updated;
		});
	};

	const updateCategoryListValue = (item) => {
		setcategoryProductList(prev => {
			const updated = item; // copy array
			return updated;
		});
	};

	const updateFilterCategoryListValue = (item) => {
		setfilterCategoryProductList(prev => {
			const updated = item; // copy array
			return updated;
		});
	};


	const updateFilterBrandListResponse = (item) => {
		setfilterBrandListResponse(prev => {
			const updated = item; // copy array
			return updated;
		});
	};


	const updateResponsePriceValue = (item) => {
		setresponsePriceRange(prev => {
			const updated = item; // copy array
			return updated;
		});
	};


	const handleSelectProductItem = async (item) => {
		setLoadingValue(true);
		setSelectedFilter(item);
		updatefilterDepartment({});
		updatefilterPrice('');
		updatefilterCategory('');
		updatefilterBrand('');
		if (item?.filterType !== "producttype") {
			// newArrayList.push({
			// 	category: item?.filterCodeSlug,
			// 	parentCategoery: newArrayList[0]?.category,
			// 	filterValue: isfrom === "brand" ? item?.filterCodeSlug : "",
			// 	filterKey: "category",
			// 	categoryName: newArrayList[0]?.category,
			// 	filterTitle: isfrom === "brand" ? item?.filterValue : "",

			// });



			// setNewArrayList(newArrayList);


			// setNewArrayList(prev => [
			// 	...prev,
			// 	{
			// 		category: item?.filterCodeSlug,
			// 		parentCategoery: prev[0]?.category,
			// 		filterValue: isfrom === "brand" ? item?.filterCodeSlug : "",
			// 		filterKey: "category",
			// 		categoryName: prev[0]?.category,
			// 		filterTitle: isfrom === "brand" ? item?.filterValue : "",
			// 	}
			// ]);


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
			updateFilterValue(item?.filterCodeSlug);
			const lastshopValue = newArrayList?.length > 0 ? newArrayList[newArrayList?.length - 1]?.filterKey : '';
			if (lastshopValue === "producttype" && item?.filterType === "producttype") {
				updateLastValueOfNewArrayItem(item);
			
			} else {



				// newArrayList.push({
				// 	category: newArrayList[1]?.category,
				// 	parentCategoery: newArrayList[1]?.parentCategoery,
				// 	filterValue: item?.filterCodeSlug,
				// 	filterKey: "producttype",
				// 	categoryName: newArrayList[1].categoryName,
				// 	filterTitle: item.filterValue
				// });
				// setNewArrayList(newArrayList);


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


				// setNewArrayList(prev => [
				// 	...prev,
				// 	{
				// 		category: prev[1]?.category,
				// 		parentCategoery: prev[1]?.parentCategoery,
				// 		filterValue: item?.filterCodeSlug,
				// 		filterKey: "producttype",
				// 		categoryName: prev[1]?.categoryName,
				// 		filterTitle: item?.filterValue
				// 	}
				// ]);
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
		updatePricefilter(priceValue);

	};

	const handleShopAll = async () => {
		setLoadingValue(true);
		updateFilterValue('');
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
		setLoadingValue(true);
		closeSheet(); 
		await fetchProductListingData({
			best: isBestValueSelected,
			price: priceFilter,
			pageindex: pageNo
		});
	};

	const updatefilterDepartment = (item) => {
		setfilterDepartment(prev => {
			const updated = item; // copy array
			return updated;
		});
	};

	const updatefilterBrand = (item) => {
		setfilterBrand(prev => {
			const updated = item; // copy array
			return updated;
		});
	};

	const updatefilterPrice = (item) => {
		setfilterPrice(prev => {
			const updated = item; // copy array
			return updated;
		});
	};

	const updatefilterCategory = (item) => {
		setfilterCategory(prev => {
			const updated = item; // copy array
			return updated;
		});
	};

	const viewResultWithFilterCloseSheet = async () => {
		setLoadingValue(true);
		closeFilterBottomSheet();
		if (filterDepartment) {
			setSelectedFilter(filterDepartment);
			if (filterDepartment?.filterType !== "producttype") {
				// newArrayList.push({
				// 	category: filterDepartment?.filterCodeSlug,
				// 	parentCategoery: newArrayList[0]?.category,
				// 	filterValue: "",
				// 	filterKey: "category",
				// 	categoryName: newArrayList[0]?.category,
				// 	filterTitle: filterDepartment?.filterValue
				// });
				// setNewArrayList(newArrayList);

				// setNewArrayList(prev => [
				// 	...prev,
				// 	{
				// 		category: filterDepartment?.filterCodeSlug,
				// 		parentCategoery: prev[0]?.category,
				// 		filterValue: isfrom === "brand" ? filterDepartment?.filterCodeSlug : "",
				// 		filterKey: "category",
				// 		categoryName: prev[0]?.category,
				// 		filterTitle: isfrom === "brand" ? filterDepartment?.filterValue : "",
				// 	}
				// ]);


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
				updateFilterValue(filterDepartment?.filterCodeSlug);
				const lastshopValue = newArrayList?.length > 0 ? newArrayList[newArrayList?.length - 1]?.filterKey : '';
				if (lastshopValue === "producttype" && filterDepartment?.filterType === "producttype") {
					updateLastValueOfNewArrayItem(filterDepartment);
				} else {
					// newArrayList.push({
					// 	category: newArrayList[1]?.category,
					// 	parentCategoery: newArrayList[1]?.parentCategoery,
					// 	filterValue: filterDepartment?.filterCodeSlug,
					// 	filterKey: "producttype",
					// 	categoryName: newArrayList[1]?.categoryName,
					// 	filterTitle: filterDepartment?.filterValue
					// });
					// setNewArrayList(newArrayList);

					// setNewArrayList(prev => [
					// 	...prev,
					// 	{
					// 		category: prev[1]?.category,
					// 		parentCategoery: prev[1]?.parentCategoery,
					// 		filterValue: filterDepartment?.filterCodeSlug,
					// 		filterKey: "producttype",
					// 		categoryName: prev[1]?.categoryName,
					// 		filterTitle: filterDepartment?.filterValue
					// 	}
					// ]);
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


	return (
		<View style={{ flex: 1 }}>
			<View style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>
				<ProductHeaderContainer type='title' title={item?.categoryName} onPress={() => navigation.goBack('')} />
				<FilterBar onPress={handleFilterPress} />


				<ScrollView
					contentContainerStyle={[external.Pb_80]}
					scrollEnabled={true}
					alwaysBounceVertical={true}
					// style={[styles.container, { backgroundColor: bgFullStyle }]}
					showsVerticalScrollIndicator={false}>

					<View style={[external.mh_10, external.mb_60, { flex: 1 }]}>
						<ScrollView horizontal={true}                 // ✅ Horizontal scroll
							showsHorizontalScrollIndicator={false}>
							<View style={{ flexDirection: 'row', flex: 1 }}>
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
												style={[styles.title, { textAlign: 'center', color: 'white' }]}
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
								<View style={{ flex: 1 }}>
									<FlatList
										data={filterCategoryProductList}
										renderItem={renderItem}
										horizontal={true}
										contentContainerStyle={[external.mt_10]}
										showsVerticalScrollIndicator={false}
										showsHorizontalScrollIndicator={false}
										scrollEnabled={false}
									/>
								</View>
							</View>
						</ScrollView>

						{categoryProductList && <FlatList
							data={categoryProductList}
							// data={productData}
							renderItem={renderProductItem}
							keyExtractor={(item) => item.productID.toString()}
							contentContainerStyle={{ paddingVertical: 10 }}
							onEndReached={loadMore}

							alwaysBounceVertical={false}
							scrollEnabled={false}
						/>}
					</View>
				</ScrollView>
			</View>
			{isLoading && <Modal transparent visible={isLoading}>
				<LoaderScreen />
			</Modal>}
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
