/**
 * Created by henry on 2015/5/4.
 */

var $accountMenuButton = $("#account-menu-button");
var $vmMenuButton = $("#vm-menu-button");

function closeOtherButtons(keepId) {
	ids = [
		"#account-menu-button",
		"#vm-menu-button",
		"#service-menu-button"
	];

	for (i = 0; i < ids.length; i++) {
		if (keepId !== ids[i]) {
			$button = $(ids[i]);
			$button.removeClass("active");
		}
	}

	$(keepId).addClass("active");
}

function closeOtherPages(keepId) {
	ids = [
		"#account-manage",
		"#vm-manage",
		"#service-manage",
		"#vmdetail-manage"
	];

	for (i = 0; i < ids.length; i++) {
		if (keepId !== ids[i]) {
			$page = $(ids[i]);
			$page.removeClass("show");
			$page.removeClass("active");
		}
	}
}

function openPage(pageId) {
	$(pageId).addClass("show");
	$(pageId).addClass("active");
}

function getSelectedPricingType() {
	return getSelectedOption("#pricingtype");
}

function updatePricingList() {
	selected = getSelectedPricingType();
	getAllQueryResults(selected);
}

function switchToPricingPage() {
	closeOtherPages("vm-manage");
	closeOtherButtons("#vm-menu-button");

	getAllQueryResults(getSelectedPricingType());

	openPage("#vm-manage");
}

function getProductTypesCallback(resultObj, paras) {

	var apiResponse = doResponseCheck(resultObj);
	if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
		console.log(apiResponse ? apiResponse.getErrorMsg() : "Connect to API server Error");
		return;
	}

	var dataObj = apiResponse.getDataObj();
	if (dataObj === null) {
		alert("no user data returned\n");
		return;
	}

	var $productTypeList = $("#producttype");
	var bodyStr = "";

	for (var i = 0; i < dataObj.length; i++) {
		node = dataObj[i];
		if (node["type"] === "INFRASTRUCTURE") {
			bodyStr += "<option value='" + node["type"] + "' selected>" + node["name"] + "</option>"
		} else {
			bodyStr += "<option value='" + node["type"] + "'>" + node["name"] + "</option>"
		}
	}

	$productTypeList.html(bodyStr);

	getProductList(getSelectedProductType());
}

function updateProductAddForm() {
	selectedProductType = getSelectedAddProductType();

	if (selectedProductType === PRODUCT_TYPE_CPU) {
		document.getElementById("productAddCapacityDiv").style.display = "none";
		document.getElementById("productAddCoresDiv").style.display = "block";
		document.getElementById("productAddThreadsDiv").style.display = "block";
		document.getElementById("productAddFrequencyDiv").style.display = "block";
	} else {
		document.getElementById("productAddCapacityDiv").style.display = "block";
		document.getElementById("productAddCoresDiv").style.display = "none";
		document.getElementById("productAddThreadsDiv").style.display = "none";
		document.getElementById("productAddFrequencyDiv").style.display = "none";
	}
}

function getAddProductTypesCallback(resultObj, paras) {

	var apiResponse = doResponseCheck(resultObj);
	if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
		console.log(apiResponse ? apiResponse.getErrorMsg() : "Connect to API server Error");
		return;
	}

	var dataObj = apiResponse.getDataObj();
	if (dataObj === null) {
		alert("no user data returned\n");
		return;
	}

	var $productTypeList = $("#productAddType");
	var bodyStr = "";

	selectedProductType = getSelectedProductType();

	for (var i = 0; i < dataObj.length; i++) {
		node = dataObj[i];
		if (node["type"] === selectedProductType) {
			if (node["type"] !== PRODUCT_TYPE_SOFTWARE) {
				bodyStr += "<option value='" + node["type"] + "' selected>" + node["name"] + "</option>"
			}
		} else if (node["type"] !== PRODUCT_TYPE_SOFTWARE) {
			bodyStr += "<option value='" + node["type"] + "'>" + node["name"] + "</option>"
		}
	}

	$productTypeList.html(bodyStr);

	updateProductAddForm();

	$("#modalAddProduct").modal("show");
}

function updateProductTypes() {
	ajaxPost(API_URL, JSON.stringify(createGetProductTypesParas()), getProductTypesCallback);
}

function updateAddProductTypes() {
	ajaxPost(API_URL, JSON.stringify(createGetProductTypesParas()), getAddProductTypesCallback);
}

function updateProductList() {
	getProductList(getSelectedProductType());
}

function getSelectedProductType() {
	return getSelectedOption("#producttype");
}

function getSelectedAddProductType() {
	return getSelectedOption("#productAddType");
}

function refreshProductPage() {

	closeOtherPages("#service-manage");
	closeOtherButtons("#service-menu-button");

	getProductList(getSelectedProductType());

	openPage("#service-manage");
}

function switchToProductPage() {

	closeOtherPages("#service-manage");
	closeOtherButtons("#service-menu-button");

	updateProductTypes();

	openPage("#service-manage");
}

function switchToAccountPage() {

	closeOtherPages("#account-manage");
	closeOtherButtons("#account-menu-button");

	getUser(g_current_user_id);

	openPage("#account-manage");
}

function logout() {
	console.log("to logout Now");
	window.location = URL_LOGIN;
}

function editUserForm() {

	document.getElementById("userEditName").value = g_userInfo.name;
	document.getElementById("userEditEmail").value = g_userInfo.email;
	document.getElementById("userEditPhoneNumber").value = g_userInfo.phone;
	document.getElementById("userEditDesc").value = g_userInfo.desc;

	$("#modalUserEditor").modal("show");
}

function updateUserPass() {
	$("#modalChangePass").modal("show");
}

function getSelectedVm() {

	g_vmSelected = [];
	g_vmSelectedName = [];

	var vmListItems = document.getElementsByName("vmListItems");
	if (vmListItems.length === 0) {
		console.log("没有虚拟机存在哦！");
		return null;
	}

	for (var i = 0; i < vmListItems.length; i++) {
		var vm = vmListItems[i];
		if (vm.checked === true) {
			var vmObj = $(vm).parent().parent().data("vmObj");
			console.log("selected vm: " + vmObj);
			g_vmSelected.push(vmObj.id);
			g_vmSelectedName.push(vmObj.name);
		}
	}

	if (g_vmSelected.length === 0) {
		console.log("no vm selected");
		return null;
	}

	console.log("SELECTED VMS: " + g_vmSelected);

	return true;
}

boolValues = [
	"否",
	"是"
];

function boolValue_d2s(state) {
	if (state >= boolValues.length)
		return "未知";
	return boolValues[state];
}