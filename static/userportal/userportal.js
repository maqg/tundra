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

function switchToPricingPage() {
	closeOtherPages("vm-manage");
	closeOtherButtons("#vm-menu-button");
	getAllQueryResults();
	openPage("#vm-manage");
}

function switchToProductPage() {

	closeOtherPages("#service-manage");
	closeOtherButtons("#service-menu-button");

	getProductList();

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

function updatePowerModal() {

	var prompt = "";

	getSelectedVm();

	if (g_vmSelected.length === 0) {
		prompt = "至少选中一台虚拟机！";
		return raiseErrorAlarm(null, prompt);
	} else {
		prompt = "你确定要<span style='color: red; font-size: 120%'> " + vmPowerOperation_d2s(g_power_action) + " </span>如下虚拟机吗？";
		for (var i = 0; i < g_vmSelectedName.length; i++) {
			prompt += "<br>" + g_vmSelectedName[i];
		}
		$("#vmPowerPrompt").html(prompt);
	}

	$("#modalPower").modal("show");
}

function vmPowerManage(action) {
	g_power_action = action;
	updatePowerModal();
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