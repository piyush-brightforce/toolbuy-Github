const API_CONFIG = {
	API_BASE_URL: 'https://api.toolbuy.com/api'
};

const API_URL = {
	MENU: `${API_CONFIG.API_BASE_URL}/menu`,
	MAINMENU: `${API_CONFIG.API_BASE_URL}/category/mainmenu`,
	TOPDEPARTMENT: `${API_CONFIG.API_BASE_URL}/Home/topdepartments`,
	GETALLBRANDS:`${API_CONFIG.API_BASE_URL}/brand/getallbrands`, 
	BESTBRANDS:`${API_CONFIG.API_BASE_URL}/brand/bestbrand`, 
	TOPDEALOFTHEMONTH:`${API_CONFIG.API_BASE_URL}/products/topdealsofmonth`, 
	BANNERLIST:`${API_CONFIG.API_BASE_URL}/Home/getbannerlist`, 
	SEARCHAUTOCOMPLETE:`${API_CONFIG.API_BASE_URL}/searchsautocomplete`, 
	GETSHOPPINGCART:`${API_CONFIG.API_BASE_URL}/shoppingcart/get`,  
	UPDATESHOPPINGCART:`${API_CONFIG.API_BASE_URL}/shoppingcart/addupdate`, 
	DELETESHOPINGCART:`${API_CONFIG.API_BASE_URL}/shoppingcart/delete`, 
	BRANDSTORE:`${API_CONFIG.API_BASE_URL}/brand/brandstore`,   
	LOGIN:`${API_CONFIG.API_BASE_URL}/account/login`,    
	SIGNUP:`${API_CONFIG.API_BASE_URL}/account/signup`,   
	CHANGEPASSWORD:`${API_CONFIG.API_BASE_URL}/account/changepassword`,  
	RESETPASSWORD:`${API_CONFIG.API_BASE_URL}/account/resetpassword`,  
	FORGOTPASSWORD:`${API_CONFIG.API_BASE_URL}/account/forgotpassword`,  
	UPDATEACCOUNT:`${API_CONFIG.API_BASE_URL}/account/UpdateAccount`,  
	PRODUCTSLISTING: `${API_CONFIG.API_BASE_URL}/products/listing`,
	PRODUCTDETAIL: `${API_CONFIG.API_BASE_URL}/products/detail`,
	SERIESDETAIL: `${API_CONFIG.API_BASE_URL}/products/seriesdetail`, 
	GETADDRESSLIST:`${API_CONFIG.API_BASE_URL}/account/getaddresslist`,  
	SETPRIMARYADDRESS:`${API_CONFIG.API_BASE_URL}/account/setprimaryaddress`,  
	SETDELIVERYADDRESS:`${API_CONFIG.API_BASE_URL}/account/setdeliveryaddress`, 
	DELETEADDRESS:`${API_CONFIG.API_BASE_URL}/account/deleteaddress`,  
	ADDNEWADDRESS: `${API_CONFIG.API_BASE_URL}/account/saveupdate`,  
	EDITOLDADDRESS: `${API_CONFIG.API_BASE_URL}/account/updatecustomeraddress`,  
	MAKEPAYMENTRAZORPAY: `${API_CONFIG.API_BASE_URL}/ordermaster/makepaymentrazor`,  
	SAVEORDERMASTER: `${API_CONFIG.API_BASE_URL}/ordermaster/saveordermaster`, 
	GETORDERDETAILS:`${API_CONFIG.API_BASE_URL}/products/orderdetail`,   
	GETORHISTORY:`${API_CONFIG.API_BASE_URL}/orders/OrderHistory`,
	GETPURCHASELIST:`${API_CONFIG.API_BASE_URL}/purchaselist/purchaselistmaster`, 
	DELETEPURCHASELIST:`${API_CONFIG.API_BASE_URL}/purchaselist/productdelete`, 
	DOWNLOADINVOICE:`https://api.toolbuy.com/order/printinvoice/`,   
	GETINVOICELIST:`${API_CONFIG.API_BASE_URL}/orders/Invoice`,  
	
	

};

export default API_URL;