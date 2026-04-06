import {
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Image,
	Modal,
	FlatList,
	Pressable,
	TouchableWithoutFeedback,
} from 'react-native';
import FixedSvgFromUrl from '../../../commonComponents/customSvgImage/customSvgImage';
import { useNavigation } from '@react-navigation/native';
import BottomContainer from '../../../commonComponents/bottomContainer';
import { commonStyles } from '../../../style/commonStyle.css';
import { windowWidth, fontSizes, SCREEN_WIDTH, windowHeight, SCREEN_HEIGHT } from '../../../themes/appConstant';
import { external } from '../../../style/external.css';
import { Heart, KeyboardDoubleArrowRight, RemoveG, AddG, Cross, Favorite } from '../../../utils/icon';
import styles from './style.css';
import { Cart } from '../../../assets/icons/cart';
import { useValues } from '../../../../App';
import axios from 'axios';
import appColors from '../../../themes/appColors';
import ProductHeaderContainer from '../productHeaderContainer';
import IMAGE_CONFIG from '../../../config/imageConfig';
import API_URL from '../../../config/apiConfig';
import { ProductDetailResponseModel } from '../../../models/productDetails/productDetailsResponse';
import RenderHtml from 'react-native-render-html';
import appFonts from '../../../themes/appFonts';
import { getValue, PREFERENCE_KEY, setValue } from '../../../utils/helper/localStorage';
import React, { useState, useEffect, useCallback } from 'react';
import CartResponse from '../../../models/cart/cartresponse';
import CommonModal from '../../../commonComponents/commonModel';
import YoutubePlayer from "react-native-youtube-iframe";
import Toast from 'react-native-toast-message';
import { ShoppingCartResponse } from '../../../models/cart/cartmodel';
import { formatCurrency } from '../../../style/rtlStyle';
import SolidLine from '../../../commonComponents/solidLine';
import { ShareIcon } from '../../../assets/googleIcons/Share';
import { DownloadIcon } from '../../../assets/googleIcons/Download';
import { ReceiptIcon } from '../../../assets/googleIcons/Receipt';
import { LockIcon } from '../../../assets/googleIcons/LockIcon';
import { HomePinIcon } from '../../../assets/googleIcons/HomePin';
import { HeadPhoneIcon } from '../../../assets/googleIcons/Headphones';
import { PolicyIcon } from '../../../assets/googleIcons/PolicyIcon';
import { PaymentsIcon } from '../../../assets/googleIcons/PaymentsIcon';
import NavigationButton from '../../../commonComponents/navigationButton';
import { PurchaseListResponse } from '../../../models/purchaselist/purchaselistmodel';
import TextInputs from '../../../commonComponents/textInputs';
import DynamicDropdown1 from '../../../commonComponents/dynamicDropdown/dynamicDropdown1';
import { FavoriteFillG } from '../../../assets/googleIcons/FavouriteFill';

const ProductDetail = ({ route }) => {

	const gstInvoiceList = [
		{ title: "Create your free ToolBuy Business account with us." },
		{ title: "Add the products in your cart and proceed to checkout." },
		{ title: "During Checkout, add 'GSTIN' at billing textbox." },
		{ title: "Add your shipping and billing details in the address section." },
		{ title: "Complete the order and you shall receive business (GST) invoice along with your delivered orders." },
		{ title: "Your billing details will be saved with us for quicker checkout for your next purchase." },
		{ title: "You can edit the billing details any time later for your next purchase." },
		{ title: "Please note that currently, GST is mandatory for getting business Invoices." },
		{ title: "Kindly provide the correct billing details during checkout." },
		{ title: "ToolBuy is not responsible if the customer has entered incorrect billing details resulting in the customer not receiving the input tax credit while filing returns." }
	];

	const buyintallmentList = [
		{ title: "Enter the Phone Number and click Continue." },
		{ title: "Select EMI, No Cost EMI or Low Cost EMI as the payment method." },
		{ title: "Select a preferred EMI type, Credit, Debit or Cardless." },
		{ title: "Choose a bank from the list and select the EMI tenure. This flow is for Credit Card EMI. Click Continue." },
		{ title: "Enter the required details and choose if they want to Save this card as per RBI guidelines or pay without saving the card." },
		{ title: "Click Continue." }];


	const documents = [
		{ title: 'Product Leaflet', icon: '📄' },
		{ title: 'Brand Certificate', icon: '📜' },
		{ title: 'Download Catalogue', icon: '📚' },
	];

	const toolbuyBenefits = [
		{ title: 'GST Invoice', icon: <ReceiptIcon /> },
		{ title: 'Customer Service', icon: <HeadPhoneIcon /> },
		{ title: 'Secure Payments', icon: <LockIcon /> },
		{ title: 'Returns & Warranty', icon: <PolicyIcon /> },
		{ title: 'Order Tracking', icon: <HomePinIcon /> },
		{ title: 'Buy in Installments', icon: <PaymentsIcon /> },
	];

	const returnWarrantylist = [
		{
			reason: 'Missing product',
			period: '24 hours from delivery',
			policy: 'Full refund or replacement',
		},
		{
			reason: 'Wrong product',
			period: '24 hours from delivery',
			policy: 'Full refund or replacement',
		},
		{
			reason: 'Damaged product',
			period: '24 hours from delivery',
			policy: 'Full refund or replacement',
		},
	];

	const navigation = useNavigation();
	const { product } = route.params || {};
	const {
		bgFullStyle,
		textColorStyle,
		textRTLStyle,
		iconColorStyle,
		viewRTLStyle,
		currSymbol,
		t,
		settotalCartItem,
		currency,
		curreLocale,
		setIsLoaderLoading
	} = useValues();

	const [activeTab, setActiveTab] = useState('Highlights');
	const [activeImageTab, setActiveImageTab] = useState('Images');
	const [isGSTDialogVisible, setGSTDialogVisible] = useState(false);

	const [isReturnWarrantyDialogVisible, setReturnWarrantyDialogVisible] = useState(false);
	const [isCustomerServiceVisible, setCustomerServiceVisible] = useState(false);
	const [isBuyinstallmentVisible, setBuyinstallmentVisible] = useState(false);
	const [isOpenImageView, setIsOpenImageView] = useState(false);

	const [isOpenFavouriteView, setIsOpenFavouriteView] = useState(false);

	const [productsDetails, setProductDetails] = useState({});
	const [productImages, setProductImages] = useState([]);
	const [productSpecifications, setproductSpecifications] = useState([]);
	const [selectedImage, setSelectedImage] = useState(0);
	const [isCartLoading, setisCartLoading] = useState(false);

	const [quantity, setQuantity] = useState(1);
	const [insertFlag, setInsertFlag] = useState('insert');
	const [purchaseList, setPurchaseList] = useState();
	const [txtPlacelistname, setTxtPlacelistname] = useState();
	const [txtErrorPlacelistname, setTxtErrorPlacelistname] = useState();
	const [addpurchaseLoading, setAddpurchaseLoading] = useState();
	const [toggleaddpurchase, setToggleaddpurchase] = useState(false);

	const [purchaselistmasterid, setPurchaselistmasterid] = useState();

	//  React to changes
	useEffect(() => {
		setIsLoaderLoading(true);
		const initialize = async () => {
			if (product) {
				await fetchCategoryData();
				await fetchPurchaseListingData({ loading: false });
			} else {
				setIsLoaderLoading(false);
			}
		};

		initialize();
	}, [product]);

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


	const addPurchaseList = async (params) => {

		try {
			console.log("calling add purchase 1", params);
			setAddpurchaseLoading(true);

			console.log("calling add purchase 2");
			const response = await axios.post(`${API_URL.ADDPURCHASELIST}`, params);

			console.log("calling add purchase 3");
			const data = response.data;

			console.log("calling add purchase 4", data);
			if (data.Success) {

				console.log("calling add purchase 5", data);
				setTxtPlacelistname('');
				setIsOpenFavouriteView(false);
				await fetchPurchaseListingData({ loading: true });
			} else {
				console.log("calling add purchase 6", data);
				setAddpurchaseLoading(false);
			}

		} catch (error) {
			console.log("calling add purchase 7", error);
			setAddpurchaseLoading(false);
			console.error('Error fetching datax:', error);
		}
	};


	const fetchPurchaseListingData = async ({ loading = false }) => {

		try {

			const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
			const customerUserID = Number(id);
			const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);


			const response = await axios.post(`${API_URL.GETPURCHASELIST}`,
				{
					CustomerID: customerUserID,
					CartSessionID: (!customerUserID || customerUserID === 0) ? cartid || '' : '',

				});

			const data = response.data;

			const model = new PurchaseListResponse(data);
			setPurchaseList(model?.result?.purchaseList ?? []);
			if (model?.result?.purchaseList?.length > 0) {
				setAddpurchaseLoading(false);
				setIsLoaderLoading(loading);
				await fetchCategoryData();
			} else {
				setToggleaddpurchase(true);
			}

		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const fetchCategoryData = async () => {
		const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);

		const customerUserID = Number(id);


		const cartid = await getValue(PREFERENCE_KEY.CARTSESSIONID);
		const response = await axios.post(API_URL.PRODUCTDETAIL, {
			CartSessionID: (!customerUserID || customerUserID === 0 ? cartid || '' : ''),
			ProductCode: product?.code,
			CustomerID: customerUserID
		});

		const productDetail = new ProductDetailResponseModel(response?.data);

		if (productDetail.success) {
			setproductSpecifications(
				productDetail?.result?.productSpecificationList
			);

			setProductImages(
				productDetail?.result?.productImageList
			);

			if (productDetail?.result?.filterMasterList) {
				setProductDetails(productDetail?.result ?? {});
			}

			setToggleaddpurchase(false);
			setIsLoaderLoading(false);
		} else {
			setIsLoaderLoading(false);
		}

	};

	const updateQuantity = async (productId, newQuantity) => {
		try {
			setisCartLoading(true);
			// ✅ wait for async value
			const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);

			const customerUserID = Number(id);
			const cartId = await getValue(PREFERENCE_KEY.CARTSESSIONID);

			if (!customerUserID || customerUserID === 0) {

				const response = await axios.post(API_URL.UPDATESHOPPINGCART, {
					ProductID: productId,
					CustomerID: 0,
					CartSessionID: cartId || "",
					Qty: newQuantity,
					Couponcode: '',
					ShippingCharge: 0,
					Zipcode: '',
					Flag: insertFlag,
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


					Toast.show({
						type: 'success',
						text1: 'Success',
						text2: "Cart Added Successfully",
					});
					fetchCartData();
					setisCartLoading(false);
				} else {
					setisCartLoading(true);
				}
			} else {
				const response = await axios.post(API_URL.UPDATESHOPPINGCART, {
					ProductID: productId,
					CustomerID: customerUserID,
					CartSessionID: "",
					Qty: newQuantity,
					Couponcode: '',
					ShippingCharge: 0,
					Zipcode: '',
					Flag: insertFlag,
					VariationID: 0
				});
				const result = response?.data;
				if (result?.Success) {
					Toast.show({
						type: 'success',
						text1: 'Success',
						text2: "Cart Added Successfully",
					});
					fetchCartData();
					setisCartLoading(false);

				} else {
					setisCartLoading(true);
				}
			}

		} catch (error) {
			setisCartLoading(true);
			console.error("Error fetching data1:", error);
		}
	};
	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
		} else {
			setQuantity(0);
		}
		setInsertFlag('');
	};

	const handleIncreaseQuantity = () => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity);
		setInsertFlag('insert');
	};


	const openGstAlert = () => {
		setGSTDialogVisible(true);
	};

	const openReturnWarrantyAlert = () => {
		setReturnWarrantyDialogVisible(true);
	};

	const openCustomerServiceAlert = () => {
		setCustomerServiceVisible(true);
	};

	const openBuyinstallmentAlert = () => {
		setBuyinstallmentVisible(true);
	};

	const openImageviewAlert = () => {
		setIsOpenImageView(true);
	};

	const getYoutubeId = (url) => {
		const regExp =
			/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#\&\?]*).*/;
		const match = url.match(regExp);
		return match && match[7].length === 11 ? match[7] : null;
	};


	const selectedImageHandle = async (item) => {
		setSelectedImage(item);
	};

	const renderImageItem = ({ item, index }) => (
		<TouchableOpacity
			style={[
				{
					marginTop: 10,
					marginBottom: 10,
					borderWidth: 1,
					borderColor: "#ccc",   // default border
					borderRadius: 10,
					height: 60, width: 60,
					justifyContent: "center",   // vertical center
					alignItems: "center",
					marginRight: 10
				},
				selectedImage === index && {
					borderColor: appColors.primary, // change only border color
				}
			]}
			onPress={() => selectedImageHandle(index)}
		>
			<View>
				{item?.imagePath && item?.imagePath !== 'noimage.jpg' && item?.imagePath?.endsWith('.svg') ? (
					<FixedSvgFromUrl
						height={40}
						width={40}
						resizeMode={'contain'}
						uri={`${IMAGE_CONFIG.BASE_URL}/${item?.imagePath}`}
					/>

				) : <Image
					style={{
						resizeMode: 'contain',
						alignItems: 'center',
						justifyContent: 'center',
						height: 40,
						width: 40
					}}
					source={
						item?.imagePath && item?.imagePath !== 'noimage.jpg'
							? { uri: `${IMAGE_CONFIG.BASE_URL}/${item?.imagePath}` }
							: require('../../../assets/images/homeScreenOne/placeholder.jpeg')
					}
				/>}
			</View>
		</TouchableOpacity>
	);



	if (isGSTDialogVisible)
		return (<Modal
			transparent
			visible={isGSTDialogVisible}
			animationType="fade"
		>

			<TouchableWithoutFeedback onPress={() => setGSTDialogVisible(false)}>
				<View collapsable={false}
					style={{
						flex: 1,
						backgroundColor: 'rgba(0,0,0,0.5)',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<View
						style={{
							width: '90%',
							backgroundColor: appColors.textColorWhite,
							borderRadius: 12,
							padding: 20,
							maxHeight: '80%',
						}}
					>
						{/* Close Button */}
						<TouchableOpacity
							onPress={() => setGSTDialogVisible(false)}
							style={{ position: 'absolute', right: 15, top: 15 }}
						>
							<Text style={{ fontSize: 25 }}>{"✕"}</Text>
						</TouchableOpacity>

						<Text style={[commonStyles.titleText19, { fontWeight: 'bold', marginBottom: 15 }]}>
							{"GST Invoice"}
						</Text>
						<View style={{
							borderBottomWidth: 1,
							borderBottomColor: '#e0e0e0',
							marginBottom: 15
						}} />

						<ScrollView>
							<Text style={[commonStyles.subtitleText, { marginBottom: 15, color: textColorStyle }]}>
								{"Get GST invoice and save up to 18% on business purchases."}
							</Text>
							<Text style={[commonStyles.subtitleText, { marginBottom: 15, color: textColorStyle }]}>
								{"You will receive business (GST) invoice with your company name and GST number."}
							</Text>

							{gstInvoiceList && gstInvoiceList?.map((doc, index) => (
								<Text key={doc?.title} style={[commonStyles.subtitleText, { marginBottom: 5, color: textColorStyle }]}>
									{`• ${doc.title}`}
								</Text>
							))}
						</ScrollView>


					</View>
				</View>
			</TouchableWithoutFeedback>

		</Modal>
		);


	if (isCustomerServiceVisible)
		return (<Modal
			transparent
			visible={isCustomerServiceVisible}
			animationType="fade"
		>
			<TouchableWithoutFeedback onPress={() => setCustomerServiceVisible(false)}>
				<View
					style={{
						flex: 1,
						backgroundColor: 'rgba(0,0,0,0.5)',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<View
						style={{
							width: '90%',
							backgroundColor: appColors.textColorWhite,
							borderRadius: 12,
							padding: 20,
							maxHeight: '80%',
						}}
					>
						{/* Close Button */}
						<TouchableOpacity
							onPress={() => setCustomerServiceVisible(false)}
							style={{ position: 'absolute', right: 15, top: 15 }}
						>
							<Text style={{ fontSize: 25 }}>{"✕"}</Text>
						</TouchableOpacity>

						<Text style={[commonStyles.titleText19, { fontWeight: 'bold', marginBottom: 15 }]}>
							{"Customer Service"}
						</Text>
						<View style={{
							borderBottomWidth: 1,
							borderBottomColor: '#e0e0e0',
							marginBottom: 15
						}} />
						<ScrollView>
							<Text style={[commonStyles.subtitleText, { marginBottom: 15, color: textColorStyle, fontWeight: 'bold' }]}>
								{"ToolBuy Ecom Private Limited"}
							</Text>

							<Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>
								{"Phone : (826) TOOL-BUY / (826) 8665-289"}

							</Text>
							<Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>

								{"Whatsapp : +91-826-8665-289"}
							</Text>
							<Text style={[commonStyles.subtitleText, { marginBottom: 5, color: textColorStyle }]}>

								{"Email : care@toolbuy.com"}
							</Text>


							<Text style={[commonStyles.subtitleText, { marginBottom: 15, marginTop: 15, color: textColorStyle, fontWeight: 'bold' }]}>
								{"Corporate Mailing Address"}
							</Text>
							<Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>
								{"Unit 118, 1st Floor, Infinity Square,"}
							</Text>
							<Text style={[commonStyles.subtitleText, { color: textColorStyle }]}>

								{"Waliv Road, Vasai (East),"}

							</Text>
							<Text style={[commonStyles.subtitleText, { marginBottom: 5, color: textColorStyle }]}>
								{"Dist : Palghar 401 208, Maharashtra"}
							</Text>

							<Text style={[commonStyles.subtitleText, { marginBottom: 5, marginTop: 10, color: textColorStyle }]}>

								{"*Customer Service is closed on some holidays. Customer Service response times may be impacted. Thanks for your patience."}
							</Text>
						</ScrollView>


					</View>
				</View>
			</TouchableWithoutFeedback>

		</Modal>
		);


	if (isReturnWarrantyDialogVisible)
		return (<Modal
			transparent
			visible={isReturnWarrantyDialogVisible}
			animationType="fade"
		>
			<TouchableWithoutFeedback onPress={() => setReturnWarrantyDialogVisible(false)}>
				<View
					style={{
						flex: 1,
						backgroundColor: 'rgba(0,0,0,0.5)',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<View
						style={{
							width: '90%',
							backgroundColor: appColors.textColorWhite,
							borderRadius: 12,
							padding: 20,
							maxHeight: '80%',
						}}
					>
						{/* Close Button */}
						<TouchableOpacity
							onPress={() => setReturnWarrantyDialogVisible(false)}
							style={{ position: 'absolute', right: 15, top: 15 }}
						>
							<Text style={{ fontSize: 25 }}>{"✕"}</Text>
						</TouchableOpacity>

						<Text style={[commonStyles.titleText19, { fontWeight: 'bold', marginBottom: 15 }]}>
							{"Returns & Warranty"}
						</Text>
						<View style={{
							borderBottomWidth: 1,
							borderBottomColor: '#e0e0e0',
							marginBottom: 15
						}} />
						<ScrollView>

							<Text style={[commonStyles.subtitleText, { marginBottom: 5, color: textColorStyle }]}>
								{"• The warranty is at the discretion of brand. On-site and off-site warranty shall be confirmed by brand only."}
							</Text>
							<Text style={[commonStyles.subtitleText, { marginBottom: 5, color: textColorStyle }]}>
								{"• In case the product is received in Defective/Missing condition, the customer needs to connect the brand."}
							</Text>
							<Text style={[commonStyles.subtitleText, { marginBottom: 15, color: textColorStyle }]}>
								{"• Customer must share video with Customer care team while opening the package in case of any issues."}
							</Text>


							<View style={styles.container}>

								{/* Header Row */}
								<View style={[styles.row, styles.headerRow]}>
									<Text style={[styles.cell, styles.headerText, { color: textColorStyle }]}>{"Reasons"}</Text>
									<Text style={[styles.cell, styles.headerText, { color: textColorStyle }]}>{"Periods"}</Text>
									<Text style={[styles.cell, styles.headerText, { color: textColorStyle }]}>{"Policy"}</Text>
								</View>

								{/* Data Rows */}
								{returnWarrantylist.map((item, index) => (
									<View
										key={index}
										style={[
											styles.row,
											index % 2 === 0 ? styles.evenRow : styles.oddRow
										]}
									>
										{item.reason && <Text style={[styles.cell, { color: textColorStyle }]}>{`${item.reason}`}</Text>}
										{item.period && <Text style={[styles.cell, { color: textColorStyle }]}>{`${item.period}`}</Text>}
										{item.policy && <Text style={[styles.cell, { color: textColorStyle }]}>{`${item.policy}`}</Text>}
									</View>
								))}

							</View>




						</ScrollView>


					</View>
				</View>
			</TouchableWithoutFeedback>

		</Modal>
		);

	if (isBuyinstallmentVisible)
		return (<Modal
			transparent
			visible={isBuyinstallmentVisible}
			animationType="fade"
		>
			<TouchableWithoutFeedback onPress={() => setBuyinstallmentVisible(false)}>
				<View
					style={{
						flex: 1,
						backgroundColor: 'rgba(0,0,0,0.5)',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<View
						style={{
							width: '90%',
							backgroundColor: appColors.textColorWhite,
							borderRadius: 12,
							padding: 20,
							maxHeight: '80%',
						}}
					>
						{/* Close Button */}
						<TouchableOpacity
							onPress={() => setBuyinstallmentVisible(false)}
							style={{ position: 'absolute', right: 15, top: 15 }}
						>
							<Text style={{ fontSize: 25 }}>{"✕"}</Text>
						</TouchableOpacity>

						<Text style={[commonStyles.titleText19, { fontWeight: 'bold', marginBottom: 15 }]}>
							{"Buy In Installments"}
						</Text>
						<View style={{
							borderBottomWidth: 1,
							borderBottomColor: '#e0e0e0',
							marginBottom: 15
						}} />
						<ScrollView>
							<Text style={[commonStyles.subtitleText, { marginBottom: 15, color: textColorStyle }]}>
								{"ToolBuy Allow customers to avail various EMI plans at Razorpay Standard Checkout. It is available on Debit Cards, Credit Cards, No Cost EMI, Low Cost EMI and Cardless EMI."}
							</Text>
							<Text style={[commonStyles.subtitleText, { marginBottom: 15, color: textColorStyle }]}>
								{"EMI provides an option to you for making total payment in easy equal monthly installments at the applicable interest rates from the list of banks and partners. This payment option encourages your customer to make big value purchases without worrying about paying the full amount upfront. You pay principal amount and interest in monthly equal installments."}
							</Text>

							<Text style={[commonStyles.titleText19, { fontWeight: 'bold', marginBottom: 15 }]}>
								{"On the Checkout page :"}
							</Text>
							{buyintallmentList && buyintallmentList?.map((doc, index) => (
								<Text key={doc?.title} style={[commonStyles.subtitleText, { marginBottom: 5, color: textColorStyle }]}>
									{`• ${doc.title}`}
								</Text>
							))}
							<Text style={[commonStyles.subtitleText, { marginBottom: 15, marginTop: 10, color: textColorStyle }]}>
								{"After the successful payment, Razorpay redirects customers to ToolBuy application. Customers monthly statements will reflect the EMI amount with interest charged by the bank."}
							</Text>
						</ScrollView>


					</View>
				</View>
			</TouchableWithoutFeedback>

		</Modal>
		);

	return (<View style={{ flex: 1 }}>
		{isOpenImageView && <CommonModal
			isVisible={isOpenImageView}
			value={
				<View>
					<View
						style={[
							external.fd_row,
							external.ai_center,
							external.js_space,
						]}>
						<Text
							style={[commonStyles.titleText19, { color: textColorStyle }]}>
							{''}
						</Text>
						<TouchableOpacity onPress={() => setIsOpenImageView(false)}>
							<Cross />
						</TouchableOpacity>
					</View>
					<View style={[external.fd_row, { flexDirection: viewRTLStyle }]}>
						<TouchableOpacity
							style={[
								styles.tab,
								activeImageTab === 'Images' && styles.tabActive,
							]}
							onPress={() => setActiveImageTab('Images')}>
							<Text
								style={[
									styles.tabText,
									activeImageTab === 'Images' && styles.tabTextActive,
									{ color: textColorStyle },
								]}>
								{`Images (${(productImages && productImages.length > 0) ? productImages.length : 0})`}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.tab,
								activeImageTab === 'Video' && styles.tabActive,
							]}
							onPress={() => setActiveImageTab('Video')}>
							<Text
								style={[
									styles.tabText,
									activeImageTab === 'Video' && styles.tabTextActive,
									{ color: textColorStyle },
								]}>
								{"Video (1)"}
							</Text>
						</TouchableOpacity>
					</View>
					<ScrollView>
						{activeImageTab === "Images" && <View style={[external.mv_10]}>
							{(productImages && productImages.length > 0) &&
								productImages[selectedImage]?.imagePath &&
								productImages[selectedImage]?.imagePath !== 'noimage.jpg' &&
								productImages[selectedImage]?.imagePath?.endsWith('.svg') ? <FixedSvgFromUrl
								height={SCREEN_WIDTH * 0.7}
								width={SCREEN_WIDTH}
								resizeMode={'contain'}
								uri={`${IMAGE_CONFIG.BASE_URL}/${productImages[selectedImage]?.imagePath}`}
							/> : <Image
								style={styles.mainImage}
								resizeMode="contain"
								source={
									productImages[selectedImage]?.imagePath
										? { uri: `${IMAGE_CONFIG.BASE_URL}/${productImages[selectedImage]?.imagePath}` }
										: require('../../../assets/images/homeScreenOne/placeholder.jpeg')
								}
							/>}
						</View>}
						{activeImageTab === "Images" && (productImages && productImages.length > 0) && <FlatList
							data={productImages}
							renderItem={renderImageItem}
							keyExtractor={(item, index) => index.toString()}
							horizontal
							contentContainerStyle={[external.mh_10,]}
							showsHorizontalScrollIndicator={false}
						/>}
						{activeImageTab === "Video" && <View style={{ height: windowHeight(320), width: '100%' }}>
							<Text
								style={[
									commonStyles.titleText19,
									{ color: textColorStyle, fontSize: fontSizes.FONT18, fontFamily: appFonts.bold },
									{ textAlign: textRTLStyle }, external.mt_10
								]}>
								{productsDetails?.productMaster?.productTitle}
							</Text>

							<Text
								style={[
									commonStyles.titleText19,
									{ color: textColorStyle, fontSize: fontSizes.FONT18, fontFamily: appFonts.bold },
									{ textAlign: textRTLStyle }, external.mv_10
								]}>
								Product Video
							</Text>
							{productsDetails?.productMaster?.youtubeVideo && <YoutubePlayer
								height={220}
								play={true}
								videoId={getYoutubeId(productsDetails?.productMaster?.youtubeVideo)}
							/>}</View>}
						{productsDetails?.productMaster?.qty === 0 ? <View style={styles.outOfStockButton}>
							<Text style={styles.outOfStockText}>
								{t('transData.OUT_OF_STOCK')}
							</Text>
						</View> : <View style={[external.fd_row, { flex: 1 }, external.js_space]}>
							<View style={[styles.quantityContainer, external.pv_10]}>
								<TouchableOpacity

									onPress={handleDecreaseQuantity}
									activeOpacity={0.7}
									style={[styles.quantityButton]}
								>
									<RemoveG color={appColors.textColorWhite} height={15} width={15} />
								</TouchableOpacity>
								<View style={[styles.quantityValueContainer]}>
									<Text style={[styles.quantityValue, { color: textColorStyle }]}>
										{quantity}
									</Text>
								</View>
								<TouchableOpacity

									onPress={handleIncreaseQuantity}
									activeOpacity={0.7}
									style={styles.quantityButton}
								>
									<AddG color={appColors.textColorWhite} height={15} width={15} />
								</TouchableOpacity>
							</View>
							{isCartLoading ? <NavigationButton isLoading={isCartLoading} color={appColors.screenBg}
								backgroundColor={appColors.primary} /> : <TouchableOpacity onPress={() => updateQuantity(productsDetails?.productMaster?.productID, quantity)}
									style={[external.fd_row, external.ai_center, external.pt_4, { backgroundColor: appColors.primary, borderRadius: 30 }, external.ph_20]}>
								<Cart />
								<Text style={[styles.buyNowText, { paddingRight: 10 }]}>{t('transData.ADD_TO_CART')}</Text>
							</TouchableOpacity>}
						</View>
						}
					</ScrollView>

				</View>
			}
		/>}
		{isOpenFavouriteView && <CommonModal
			isVisible={isOpenFavouriteView}
			value={
				<View>
					<View
						style={[
							external.fd_row,
							external.ai_center,
							external.js_space,
						]}>

						<View style={[external.fd_row,
						external.ai_center]}>
							<Favorite />
							<Text
								style={[commonStyles.titleText19, { color: textColorStyle }, external.ml_10]}>
								{!toggleaddpurchase ? "Add to existing Purchase List" : 'Create New Purchase List'}
							</Text>
						</View>
						<TouchableOpacity onPress={() => setIsOpenFavouriteView(false)}>
							<Cross />
						</TouchableOpacity>
					</View>
					<View style={{ height: SCREEN_HEIGHT * 0.5 }}>

						<ScrollView>
							{!toggleaddpurchase ? <View style={[external.mv_15]}>
								<DynamicDropdown1 data={purchaseList}
									labelKey="listName"
									valueKey="purchaseListMasterID"
									placeholder="Select List"
									onSelect={(item) => {
										setPurchaselistmasterid(item?.purchaseListMasterID);
									}} />
							</View> :
								<View style={[external.fd_coloumn]}>
									<TextInputs
										title={'Listname'}
										placeHolder={"Enter List Name"}
										value={txtPlacelistname}
										onChangeText={text => {
											setTxtPlacelistname(text);

											if (text.trim() === '') {
												setTxtErrorPlacelistname('Please enter a list name.');
											} else {
												setTxtErrorPlacelistname('');
											}
										}} />
									{txtErrorPlacelistname !== '' && (
										<Text style={[styles.errorStyle, external.mb_10]}>{txtErrorPlacelistname}</Text>
									)}</View>}

						</ScrollView>
					</View>
					<NavigationButton onPress={async () => {
						const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);

						const customerUserID = Number(id);
						if (!toggleaddpurchase) {
							console.log("purchaselistmasterid", purchaselistmasterid, productsDetails?.productMaster?.productID, customerUserID);
							purchaselistmasterid && await addPurchaseList({ PurchaseListMasterID: purchaselistmasterid, ProductID: productsDetails?.productMaster?.productID, CustomerID: customerUserID, ListName: "", CartSessionID: "" });
						} else {
							console.log("purchaselistmasterid", txtPlacelistname, productsDetails?.productMaster?.productID, customerUserID);
							txtPlacelistname && await addPurchaseList({ ListName: txtPlacelistname, CustomerID: customerUserID, CartSessionID: "", ProductID: productsDetails?.productMaster?.productID });
						}

					}}
						title="Save to your Purchase List" color={appColors.screenBg} backgroundColor={appColors.primary} isLoading={addpurchaseLoading} />

					<View style={[external.fd_row, external.mt_10, external.ai_center]}>
						<View style={external.fx_1}>
							<SolidLine />
						</View>
						<Text style={[commonStyles.subtitleText, external.mh_10, { color: textColorStyle }]}>or</Text>
						<View style={external.fx_1}>
							<SolidLine />
						</View>
					</View>
					{!toggleaddpurchase ? <Text style={{ textAlign: 'center' }}>
						Want to Create New Purchase List?
						<Text onPress={() => setToggleaddpurchase(!toggleaddpurchase)} style={{ color: appColors.primary }}>
							{" Click Here"}
						</Text>
					</Text> :
						<Text style={{ textAlign: 'center' }}>
							Already have Purchase List?
							<Text onPress={() => setToggleaddpurchase(!toggleaddpurchase)} style={{ color: appColors.primary }}>
								{" Click Here"}
							</Text>
						</Text>}

				</View>
			}
		/>}
		<View
			style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[external.Pb_80]}
				style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}>

				<ProductHeaderContainer type="search" onPress={() => navigation.goBack()} />

				<View style={[styles.brandSection, external.mh_20]}>
					<View style={[external.fd_row, external.ai_center]}>
						<View style={[external.fx_1, external.fd_row, external.ai_center]}>
							<View style={styles.brandLogoContent}>
								{productsDetails?.productMaster?.brandLogoPath?.endsWith('.svg') ? <FixedSvgFromUrl
									width={windowWidth(100)}
									height={windowWidth(50)}
									uri={`${IMAGE_CONFIG.BASE_URL}/${productsDetails?.productMaster?.brandLogoPath}`}
								/> : <Image
									source={
										productsDetails?.productMaster?.brandLogoPath && productsDetails?.productMaster?.brandLogoPath !== 'noimage.jpg'
											? { uri: `${IMAGE_CONFIG.BASE_URL}/${productsDetails?.productMaster?.brandLogoPath}` }
											: require('../../../assets/images/homeScreenOne/placeholder.jpeg')
									}

									style={[styles.brandLogo, { resizeMode: "contain" }]}
								/>}
							</View>
							<Text style={styles.visitStoreText}>{`${t("transData.VISIT")} ${productsDetails?.productMaster?.brandName} ${t("transData.STORE")}`}</Text>
						</View>
						<TouchableOpacity onPress={() => productsDetails?.productMaster?.brandCode && navigation.navigate("ProductListing", {
							item: {
								title: productsDetails?.productMaster?.brandCode,
								url: "",
								parentCat: productsDetails?.productMaster?.brandCode,
								filterKey: "",
								categoryName: productsDetails?.productMaster?.brandName,
								filterTitle: ''

							}
						})}>
							<KeyboardDoubleArrowRight color={appColors.primary} height={20} width={20} />
						</TouchableOpacity>
					</View>
				</View>

				<View style={[external.mh_20, external.mt_10]}>
					<Text
						style={[
							commonStyles.titleText19,
							{ color: textColorStyle, fontSize: fontSizes.FONT18 },
							{ textAlign: textRTLStyle },
						]}>
						{productsDetails?.productMaster?.productTitle}
					</Text>
					<Text
						style={[
							commonStyles.subtitleText,
							external.mt_5,
							{ color: textColorStyle, fontSize: fontSizes.FONT14 },
							{ textAlign: textRTLStyle },
						]}>
						{`Shop all: `}
						<Text
							style={[
								commonStyles.subtitleText,
								external.mt_5,
								{ color: appColors.primary, fontSize: fontSizes.FONT14, },
								{ textAlign: textRTLStyle },
							]}>
							{`${productsDetails?.productMaster?.brandName}`}
							<Text
								style={[
									commonStyles.subtitleText,
									external.mt_5,
									{ color: textColorStyle, fontSize: fontSizes.FONT14 },
									{ textAlign: textRTLStyle },
								]}>
								{`  |  SKU: ${productsDetails?.productMaster?.sku}  |  Model: ${productsDetails?.productMaster?.modelNo}`}
							</Text>
						</Text>

					</Text>
				</View>


				<View style={[external.mv_10, { backgroundColor: appColors.bgLayout }]}>
					<View style={{ position: 'relative' }}>
						<TouchableOpacity onPress={() => openImageviewAlert()}>
							{(productImages && productImages.length > 0) &&
								productImages[selectedImage]?.imagePath &&
								productImages[selectedImage]?.imagePath !== 'noimage.jpg' &&
								productImages[selectedImage]?.imagePath?.endsWith('.svg') ? <FixedSvgFromUrl
								height={SCREEN_WIDTH * 0.7}
								width={SCREEN_WIDTH}
								resizeMode={'contain'}
								uri={`${IMAGE_CONFIG.BASE_URL}/${productImages[selectedImage]?.imagePath}`}
							/> : <Image
								style={styles.mainImage}
								resizeMode="contain"
								source={
									productImages[selectedImage]?.imagePath
										? { uri: `${IMAGE_CONFIG.BASE_URL}/${productImages[selectedImage]?.imagePath}` }
										: require('../../../assets/images/homeScreenOne/placeholder.jpeg')
								}
							/>}
						</TouchableOpacity>
						<View style={[{
							position: 'absolute',
							top: windowHeight(10), right: windowHeight(30)
						}]}>
							<View style={styles.imageActions}>
								<TouchableOpacity style={styles.actionIcon}>
									<ShareIcon />
								</TouchableOpacity>
								<TouchableOpacity style={[styles.actionIcon, { backgroundColor: (productsDetails?.productMaster?.purchaseListID === 0 || !productsDetails?.productMaster?.purchaseListID) ? appColors.screenBg : appColors.textColorBlack }]} onPress={async () => {
									const id = await getValue(PREFERENCE_KEY.USERCUSTOMERID);
									const customerUserID = Number(id);
									if (!customerUserID || customerUserID === 0) {
										navigation.navigate("Login");
									} else {
										if (productsDetails?.productMaster?.purchaseListID === 0 || !productsDetails?.productMaster?.purchaseListID) {
											setIsOpenFavouriteView(true);
										}
									}

								}}>
									{(productsDetails?.productMaster?.purchaseListID === 0 || !productsDetails?.productMaster?.purchaseListID) ? <Favorite /> : <FavoriteFillG />}

								</TouchableOpacity>
								<TouchableOpacity style={styles.actionIcon}>
									<DownloadIcon />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				{(productImages && productImages.length > 0) && <FlatList
					data={productImages}
					renderItem={renderImageItem}
					keyExtractor={(item, index) => index.toString()}
					horizontal
					contentContainerStyle={[external.mh_10,]}
					showsHorizontalScrollIndicator={false}
				/>}


				<View style={[external.mh_20, external.mt_15]}>
					<Text
						style={[
							commonStyles.subtitleText,
							{ color: textColorStyle, fontSize: fontSizes.FONT14 },
						]}
					>
						{`${formatCurrency(productsDetails?.productMaster?.mainPrice ?? "0", currency, curreLocale)} (Incl. of all taxes)`}
					</Text>
					<View style={[external.fd_row, external.ai_baseline, external.mt_5]}>
						<Text
							style={[
								styles.priceText,
								{ color: textColorStyle },
								{ flexDirection: viewRTLStyle },
							]}>
							{`${formatCurrency(productsDetails?.productMaster?.sellingPrice ?? "0", currency, curreLocale)}`}
							<Text
								style={[
									commonStyles.subtitleText,
									{ color: textColorStyle, fontSize: fontSizes.FONT14 },
								]}
							>
								{`  + ${formatCurrency(productsDetails?.productMaster?.gstPrice ?? "0", currency, curreLocale)}`}
								<Text
									style={[
										commonStyles.subtitleText,
										{ color: textColorStyle, fontSize: fontSizes.FONT14 },
									]}
								>
									{`  ${t("transData.GST")} (${productsDetails?.productMaster?.gstRate ?? "0"}%)`}
								</Text>
							</Text>

						</Text>
					</View>
					<View
						style={[
							external.fd_row,
							external.ai_center,
							external.mt_5,
							{ flexDirection: viewRTLStyle },
						]}>
						<Text
							style={[
								commonStyles.subtitleText,
								{ color: textColorStyle, fontSize: fontSizes.FONT14 },
							]}
						>
							{`MRP: `}
							<Text
								style={[
									styles.mrpText,
									{ color: textColorStyle },
									{ textAlign: textRTLStyle },
								]}>
								{`${formatCurrency(productsDetails?.productMaster?.listPrice ?? "0", currency, curreLocale)}`}
							</Text>
						</Text>

						<Text style={[styles.saveText, { paddingLeft: windowHeight(10) }]}> {`${t('transData.SAVE').toUpperCase()} ${productsDetails?.productMaster?.discountPercent}%`}</Text>
					</View>
				</View>
				<SolidLine />

				<View style={[external.mh_20, external.fd_row, external.js_space, external.ai_center]}>
					<View>
						<Text
							style={[
								commonStyles.subtitleText,
								{ color: textColorStyle, fontSize: fontSizes.FONT14, fontFamily: appFonts.semiBold },
								{ textAlign: textRTLStyle },
							]}>
							{`Dispatch: `}
						</Text>
						<Text
							style={[
								commonStyles.subtitleText,
								{ color: textColorStyle, fontSize: fontSizes.FONT14, },
								{ textAlign: textRTLStyle },
							]}>
							{`${productsDetails?.productMaster?.days} Bussiness Days`}
						</Text>
					</View>
					<View>
						<Text
							style={[
								commonStyles.subtitleText,
								external.mt_3,
								{ color: textColorStyle, fontSize: fontSizes.FONT14, fontFamily: appFonts.semiBold },
								{ textAlign: textRTLStyle },
							]}>
							{`Items in Pack: `}
						</Text>
						<Text
							style={[
								commonStyles.subtitleText,
								external.mt_3,
								{ color: textColorStyle, fontSize: fontSizes.FONT14, },
								{ textAlign: textRTLStyle },
							]}>
							{`${productsDetails?.productMaster?.packUnit}`}
						</Text>
					</View>
					<View>
						<Text
							style={[
								commonStyles.subtitleText,
								external.mt_3,
								{ color: textColorStyle, fontSize: fontSizes.FONT14, fontFamily: appFonts.semiBold },
								{ textAlign: textRTLStyle },
							]}>
							{`HSN Code: `}
						</Text><Text
							style={[
								commonStyles.subtitleText,
								external.mt_3,
								{ color: textColorStyle, fontSize: fontSizes.FONT14 },
								{ textAlign: textRTLStyle },
							]}>
							{`${productsDetails?.productMaster?.hsnCode}`}
						</Text>
					</View>
				</View>
				<SolidLine />

				<View style={[external.mh_20, external.mt_10, external.mb_20]}>
					<Text
						style={[
							commonStyles.titleText19,
							{ fontSize: fontSizes.FONT17, color: textColorStyle },
							{ textAlign: textRTLStyle },
						]}>
						{t('transData.KEY_FEATURES')}
					</Text>
					{productsDetails?.productMaster?.weight ? <View

						style={[
							external.fd_row,
							external.mt_10,
							{ flexDirection: viewRTLStyle },
						]}>
						<Text
							style={[
								commonStyles.subtitleText,
								{ color: textColorStyle, fontSize: fontSizes.FONT13 },
								{ width: '35%', textAlign: textRTLStyle, flex: 1 },
							]}>
							{"Weight: "}{productsDetails?.productMaster?.weight} {productsDetails?.productMaster?.weightUnit}
						</Text>
					</View> : <View></View>}

					{productSpecifications
						?.filter(f => f?.isKeyFeature)
						.map((feature, index) => (
							<View
								key={feature?.attributeType}
								style={[
									external.fd_row,
									external.mt_10,
									{ flexDirection: viewRTLStyle },
								]}
							>
								{feature?.attributeType && <Text
									style={[
										commonStyles.subtitleText,
										{ color: textColorStyle, fontSize: fontSizes.FONT13 },
										{ width: '35%', textAlign: textRTLStyle, flex: 1 },
									]}
								>
									{`${feature?.attributeType}: ${feature?.attributeValue}`}
								</Text>}

							</View>
						))}
				</View>
				<SolidLine />

				<View style={[external.mh_20, external.fd_row, external.js_space, external.ai_center]}>
					{documents?.map((doc, index) => (
						<View key={doc?.title} style={[external.fd_row, external.fx_1, external.mr_8, external.ai_center]}>
							<TouchableOpacity style={[styles.actionIcon1]}>
								<DownloadIcon />
							</TouchableOpacity>
							<Text
								numberOfLines={2}
								style={[
									commonStyles.subtitleText,
									{ color: textColorStyle, fontSize: fontSizes.FONT14, },
									{ textAlign: textRTLStyle },
									external.fx_1

								]}>

								{`${doc.title}`}
							</Text>
						</View>
					))}
				</View>
				<SolidLine />
				<View style={[external.mh_20, external.mt_10]}>
					<Text
						style={[
							commonStyles.titleText19,
							{ fontSize: fontSizes.FONT17, color: textColorStyle },
							{ textAlign: textRTLStyle },
							external.mb_10
						]}>
						{"ToolBuy Benefits"}
					</Text>

					<View style={[{
						flexWrap: 'wrap',
					}, external.fd_row]}>
						{toolbuyBenefits.map((item, index) => (
							<View key={item?.title} style={[{
								width: '50%', // 🔥 2 columns 
							}, external.pv_10, external.ph_10, external.fd_row, external.ai_center]}>
								{item.icon && <TouchableOpacity onPress={() => {
									if (item.title == "GST Invoice") {
										openGstAlert();
									} else if (item.title == "Customer Service") {
										openCustomerServiceAlert();
									} else if (item.title == "Returns & Warranty") {
										openReturnWarrantyAlert();
									} else if (item.title == "Buy in Installments") {
										openBuyinstallmentAlert();
									}
								}

								}><View style={{ height: 20, width: 20 }}>{item.icon}</View></TouchableOpacity>}
								<TouchableOpacity onPress={() => {
									if (item.title == "GST Invoice") {
										openGstAlert();
									} else if (item.title == "Customer Service") {
										openCustomerServiceAlert();
									} else if (item.title == "Returns & Warranty") {
										openReturnWarrantyAlert();
									} else if (item.title == "Buy in Installments") {
										openBuyinstallmentAlert();
									}
								}

								}><Text
									style={[
										commonStyles.subtitleText,
										external.ml_10,
										{ color: appColors.primary, fontSize: fontSizes.FONT15 },
									]}
								>{item.title}</Text></TouchableOpacity>
							</View>

						))}
					</View>
				</View>


				<View style={[external.mh_20, external.mb_10]}>
					<View style={[external.fd_row, { flexDirection: viewRTLStyle }]}>
						<TouchableOpacity
							style={[
								styles.tab,
								activeTab === 'Highlights' && styles.tabActive,
							]}
							onPress={() => setActiveTab('Highlights')}>
							<Text
								style={[
									styles.tabText,
									activeTab === 'Highlights' && styles.tabTextActive,
									{ color: textColorStyle },
								]}>
								{"Highlights"}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.tab,
								activeTab === 'Specifications' && styles.tabActive,
							]}
							onPress={() => setActiveTab('Specifications')}>
							<Text
								style={[
									styles.tabText,
									activeTab === 'Specifications' && styles.tabTextActive,
									{ color: textColorStyle },
								]}>
								{"Specifications"}
							</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.tabContent}>
						{activeTab === 'Highlights' ? <View

							style={[
								external.mt_10,
							]}>

							{productsDetails?.productMaster?.longDescr && (<RenderHtml contentWidth={SCREEN_WIDTH} source={{ html: productsDetails?.productMaster?.longDescr }} baseStyle={{ color: textColorStyle, fontFamily: appFonts.medium }} />)}


						</View> : <View>
							{productSpecifications?.map((item, index) => (

								<View
									key={`${item.attributeType}-${index}`}
									style={[
										external.fd_row,
										external.mt_10,
										{ flexDirection: viewRTLStyle },
									]}>
									{item?.attributeType && <Text
										style={[
											commonStyles.subtitleText,
											{ color: textColorStyle, fontSize: fontSizes.FONT15 },
											{ width: '35%', textAlign: textRTLStyle, flex: 1 },
										]}>
										{`${item?.attributeType}:`}
									</Text>}
									{item?.attributeValue && <Text
										style={[
											commonStyles.subtitleText,
											{ color: textColorStyle, fontSize: fontSizes.FONT15 },
											{ flex: 1, textAlign: textRTLStyle },
										]}>
										{item?.attributeValue}
									</Text>}
								</View>
							))}
						</View>}
					</View>
				</View>
			</ScrollView>


			{productsDetails?.productMaster?.qty === 0 ? <View style={styles.outOfStockButton}>
				<Text style={styles.outOfStockText}>
					{t('transData.OUT_OF_STOCK')}
				</Text>
			</View> : <View style={styles.bottomContainerView}>
				<BottomContainer
					leftValue={
						<View style={styles.quantityContainer}>
							<TouchableOpacity

								onPress={handleDecreaseQuantity}
								activeOpacity={0.7}
								style={[styles.quantityButton]}
							>
								<RemoveG color={appColors.textColorWhite} height={15} width={15} />
							</TouchableOpacity>
							<View style={styles.quantityValueContainer}>
								<Text style={[styles.quantityValue, { color: textColorStyle }]}>
									{quantity}
								</Text>
							</View>
							<TouchableOpacity

								onPress={handleIncreaseQuantity}
								activeOpacity={0.7}
								style={styles.quantityButton}
							>
								<AddG color={appColors.textColorWhite} height={15} width={15} />
							</TouchableOpacity>

						</View>
					}
					value={



						(isCartLoading ? <NavigationButton isLoading={isCartLoading} color={appColors.screenBg}
							backgroundColor={appColors.primary} /> : <TouchableOpacity onPress={() => updateQuantity(productsDetails?.productMaster?.productID, quantity)}
								style={[external.fd_row, external.ai_center, external.pt_4]}>
							<Cart />
							<Text style={styles.buyNowText}>{t('transData.ADD_TO_CART')}</Text>
						</TouchableOpacity>)
					}
				/>
			</View>
			}


		</View>
	</View>);


};


export default ProductDetail;
