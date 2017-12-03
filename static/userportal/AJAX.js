var g_userInfo;
var g_power_action = "start";
var g_vmSelected = [];
var g_vmSelectedName = [];

function ErrorObjClass(errorObj) {

	var errorCode = errorObj.errorNo;
	var errorMsg = errorObj.errorMsg;
	var errorMsgCN = errorObj.errorMsg;

	ErrorObjClass.prototype.getErrorCode = function () {
		return errorCode;
	};

	ErrorObjClass.prototype.getErrorMsg = function () {
		return errorMsg;
	};

	ErrorObjClass.prototype.getErrorMsgCN = function () {
		return errorMsgCN;
	};
}

function APIResponseClass(jsonObj) {

	this.errorClass = new ErrorObjClass(jsonObj.errorObj);
	this.dataObj = jsonObj.data;

	APIResponseClass.prototype.getErrorObj = function () {
		return this.errorClass;
	};

	APIResponseClass.prototype.getDataObj = function () {
		return this.dataObj;
	};

	APIResponseClass.prototype.getErrorCode = function () {
		return this.errorClass.getErrorCode();
	};

	APIResponseClass.prototype.getErrorMsg = function () {
		return this.errorClass.getErrorMsgCN();
	}
}

function string2Json($textString) {

	var $jsonObj;

	if ($textString === null) {
		return null;
	}

	try {
		$jsonObj = JSON.parse($textString);
	} catch (e) {
		alert("got bad json string");
		return null;
	}

	return $jsonObj;
}

function ajaxGet($url, $paras, $callback) {
	var xmlHttp;

	try {
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("您的浏览器不支持AJAX！");
				return false;
			}
		}
	}

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			$callback(string2Json(xmlHttp.responseText), $paras);
		} else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
			$callback(null, $paras);
		}
	};

	xmlHttp.open("GET", $url, true);
	xmlHttp.send(null);
}

function ajaxPut($url, $data, $callback, $callbackParas) {

	var xmlHttp;

	try {
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("您的浏览器不支持AJAX！");
				return false;
			}
		}
	}

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			$callback(string2Json(xmlHttp.responseText), $callbackParas);
		} else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
			$callback(null, $callbackParas);
		}
	};

	xmlHttp.open("PUT", $url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	if ($data === null) {
		$data = ""
	}

	xmlHttp.send($data);
}

function ajaxDelete($url, $paras, $callback) {
	var xmlHttp;

	try {
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("您的浏览器不支持AJAX！");
				return false;
			}
		}
	}

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			$callback(string2Json(xmlHttp.responseText), $paras);
		} else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
			$callback(null, $paras);
		}
	};

	xmlHttp.open("DELETE", $url, true);
	xmlHttp.send(null);
}

function ajaxPost($url, $data, $callback, $callbackParas) {

	var xmlHttp;

	try {
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("您的浏览器不支持AJAX！");
				return false;
			}
		}
	}

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			$callback(string2Json(xmlHttp.responseText), $callbackParas);
		} else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
			$callback(null, $callbackParas);
		}
	};

	xmlHttp.open("POST", $url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send($data);
}

function loadPricingTableHeader() {
	var header = "";

	header += "<tr class=\"vm-table-header\">";
	header += "<th><input type=\"checkbox\" style='width: 20px; height: 20px'></th>";
	header += "<th>名称</th>";
	header += "<th>点位数</th>";
	header += "<th>报价</th>";
	header += "<th>报价小结</th>";
	header += "<th>报价生成时间</th>";
	header += "<th>管理</th></tr>";

	return header;
}

function parsePricingSummary(summary) {
	return summary;
}

function raisePricingDetail(item) {

	$detailBody = $("#vmDetailBody");

	var bodyStr = "";

	bodyStr += "<table class=\"table table-striped table-hover\">";
	bodyStr += "<tr><th>属性</th><th>内容</th></tr>";
	bodyStr += "<tr><td>名称</td><td>" + item.name + "</td></tr>";
	bodyStr += "<tr><td>UUID</td><td style='font-family: Consolas'>" + item.id + "</td></tr>";
	bodyStr += "<tr><td>类型</td><td>" + item.typeCN + "</td></tr>";
	bodyStr += "<tr><td>点位数</td><td>" + item.points + "</td></tr>";
	bodyStr += "<tr><td>总价</td><td style='color: red'>" + item.price + "</td></tr>";
	bodyStr += "<tr><td>报价小结</td><td>" + parsePricingSummary(item.summary) + "</td></tr>";
	bodyStr += "<tr><td>创建时间</td><td>" + item.createTime + "</td></tr>";
	bodyStr += "<tr><td>描述</td><td>" + item.desc + "</td></tr>";

	$detailBody.html(bodyStr);

	// to modify lable
	$lable = $("#modalVmDetailLabel");
	if ($lable !== null) {
		$lable.html("报价详细-" + item.name);
	}

	$("#modalVmDetail").modal("show");
}

function selectAllPricings(checked) {
	var vmListItems = document.getElementsByName("vmListItems");
	if (vmListItems.length === 0) {
		console.log("No Vms exist, just skip select all operation");
		return;
	}

	for (var i = 0; i < vmListItems.length; i++) {
		var vm = vmListItems[i];
		vm.checked = checked;
	}
}

function initPricingOperation(vmTable) {
	var trList = vmTable.children("tbody").children('tr');
	trList.each(function () {

		var $tr = $(this);

		// to skip header
		if ($tr.index() !== 0) {

			var $remove = $tr.children(".manager").children(".deletepricingbutton");
			if ($remove !== null) {
				$remove.click(function () {
					alert("delete pricing");
				});
			}

			var $cancel = $tr.children(".manager").children(".detailpricingbutton");
			if ($cancel !== null) {
				$cancel.click(function () {
					alert("pricing detail");
				});
			}

			var $resume = $tr.children(".manager").children(".exportpricingbutton");
			if ($resume !== null) {
				$resume.click(function () {
					alert("export price");
				});
			}

		} else {
			// handle checkbox here
			var $selectAll = $tr.children("th").children("input");
			$selectAll.click(function () {
				selectAllPricings(this.checked);
			});
		}
	});
}

function closeOtherVmDetailButtons(mybutton) {

	buttons = [
		"#vmdetail-button-main",
		"#vmdetail-button-nic",
		"#vmdetail-button-disk",
		"#vmdetail-button-cdrom",
		"#vmdetail-button-app",
		"#vmdetail-button-attrs"
	];

	for (i = 0; i < buttons.length; i++) {
		if (buttons[i] !== mybutton)
			$(buttons[i]).removeClass("active");
	}

	$(mybutton).addClass("active");

}

function syncVmAppStatus() {

	if (g_current_vmdetail.status !== VM_STATE_RUNNING) {
		return raiseErrorAlarm(null, "虚拟未运行，无法查询远程应用状态！");
	}

	paras = createSyncVmAppStatusParas(g_current_detail_vm_id);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			raiseErrorAlarm(null, errorMsg);
		}
		switchVmDetail_main();
	});
}

function setVmAppStatus(status) {

	if (g_current_vmdetail.status !== VM_STATE_RUNNING) {
		return raiseErrorAlarm(null, "虚拟未运行，无法修改远程应用状态！");
	}

	paras = createSetVmAppStatusParas(g_current_detail_vm_id, status);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm(null, errorMsg);
		}
		switchVmDetail_main();
	});
}

function update_vm_detail_table(vm) {
	console.log(vm);

	$detailTable = $("#vm-detail-table");

	var bodyStr = "";

	bodyStr += "<tr><th>属性</th><th>内容</th></tr>";
	bodyStr += "<tr><td>名称</td><td>" + vm.name + "</td></tr>";
	bodyStr += "<tr><td>状态</td><td style='color: " + getVmStateColor(vm.status) + "'>" + vm.status + "</td></tr>";
	bodyStr += "<tr><td>远程应用状态</td>";
	bodyStr += "<td style='color: " + getStatusColor(vm.remoteAppStatus) + "'>" + vm.remoteAppStatus + "  ";
	bodyStr += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"syncVmAppStatus();\">同步</button>";
	if (vm.remoteAppStatus === "Enabled") {
		bodyStr += "<button style='margin-left: 5px;' type=\"button\" class=\"btn btn-primary\" onclick=\"setVmAppStatus(false);\">关闭</button>";
	} else {
		bodyStr += "<button style='margin-left: 5px;' type=\"button\" class=\"btn btn-primary\" onclick=\"setVmAppStatus(true);\">开启</button>";
	}
	bodyStr += "</td></tr>";
	bodyStr += "<tr><td>UUID</td><td>" + vm.id + "</td></tr>";
	bodyStr += "<tr><td>CPU</td><td>" + vm.cpuNum + " 核心</td></tr>";
	bodyStr += "<tr><td>内存</td><td>" + vm.memory + " M</td></tr>";
	bodyStr += "<tr><td>持久磁盘</td><td>" + boolValue_d2s(vm.diskPersistent) + "</td></tr>";
	bodyStr += "<tr><td>开机启动</td><td>" + boolValue_d2s(vm.startWithHost) + "</td></tr>";
	bodyStr += "<tr><td>虚拟化类型</td><td>" + vm.hypervisorType + "</td></tr>";
	bodyStr += "<tr><td>创建时间</td><td>" + vm.createTime + "</td></tr>";

	$detailTable.html(bodyStr);
}

function switchVmDetail_main() {
	closeOtherVmDetailButtons("#vmdetail-button-main");

	paras = createGetVmParas(g_current_detail_vm_id);

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {

		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm(null, errorMsg);
		}

		var dataObj = apiResponse.getDataObj();
		if (dataObj === null) {
			return raiseErrorAlarm(null, ERROR_MSG_NO_DATABODY);
		}

		g_current_vmdetail = dataObj;

		update_vm_detail_table(dataObj);
	})
}

function raiseRemoveApp(app) {

	var prompt = "你确定要<span style='color: red; font-size: 120%'>删除</span>如下应用吗？</br>";
	prompt += app.name;
	$("#appPrompt").html(prompt);
	$("#modalDelApp").data("appObj", app);
	$("#modalDelApp").modal("show");
}

function serviceManage() {

	service = $("#modalServiceManage").data("serviceObj");

	paras = createServiceManageParas(service.id, getServiceApi(service.action));
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm("#modalServiceManage", errorMsg);
		}
		$("#modalServiceManage").modal("hide");
		switchToProductPage();
	});
}

function raiseServiceManage(action, service) {

	actionStr = getServiceActionStr(action);

	var prompt = "你确定要<span style='color: red; font-size: 120%'>" + actionStr + "</span>如下服务吗？</br>";
	prompt += service.name;

	service["action"] = action;

	$("#modalServiceManagePrompt").html(prompt);
	$("#modalServiceManage").data("serviceObj", service);
	$("#modalServiceManage").modal("show");
}

function updateApp() {

	var name = document.getElementById("appNewName").value;
	var path = document.getElementById("appNewPath").value;
	var paras = document.getElementById("appNewParas").value;

	paras = createUpdateVmAppParas(g_vm_app.id, name, path, paras);

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalEditApp", errorMsg);
		}
		$("#modalEditApp").modal("hide");

		switchVmDetail_app();
	});
}

function raiseUpdateApp(app) {
	document.getElementById("appNewName").value = app.name;
	document.getElementById("appNewPath").value = app.path;
	document.getElementById("appNewParas").value = app.paras;

	g_vm_app = app;

	$("#modalEditApp").modal("show");
}

function syncApp(app) {

	paras = createSyncAppParas(app.id);

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {

		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm(null, errorMsg);
		}

		switchVmDetail_app();
	});
}

function removeApp() {

	app = $("#modalDelApp").data("appObj");

	paras = createDelAppParas(app.id);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm("#modalDelApp", errorMsg);
		}
		$("#modalDelApp").modal("hide");

		switchVmDetail_app();
	});
}

function addApp() {

	var name = document.getElementById("appName").value;
	var path = document.getElementById("appPath").value;
	var paras = document.getElementById("appParas").value;

	paras = createAddVmAppParas(g_current_detail_vm_id, name, path, paras);

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalAddApp", errorMsg);
		}
		$("#modalAddApp").modal("hide");

		switchVmDetail_app();
	});
}

function raiseAddApp(vmId) {
	$("#modalAddApp").modal("show");
}

function parseProductParas(infoObj, type) {

	$str = "编号：" + infoObj.id;
	$str += "<br>名称：" + infoObj.name;

	if (infoObj.hasOwnProperty("frenquency")) {
		$str += "<br>频率：" + infoObj.frequency;
	}
	if (infoObj.hasOwnProperty("cores")) {
		$str += "<br>核心数：" + infoObj.cores;
	}
	if (infoObj.hasOwnProperty("threads")) {
		$str += "<br>线程线：" + infoObj.threads;
	}
	if (infoObj.hasOwnProperty("capacity")) {
		$str += "<br>线程线：" + infoObj.capacity + "G";
	}
	if (infoObj.hasOwnProperty("size")) {
		$str += "<br>线程线：" + infoObj.size + "寸";
	}
	if (infoObj.hasOwnProperty("model")) {
		$str += "<br>型号：" + infoObj.model;
	}
	if (infoObj.hasOwnProperty("provider")) {
		$str += "<br>厂商：" + infoObj.provider;
	}

	return $str;
}

function parseProductPrice(infoObj) {
	$str = "";
	start = false;

	if (infoObj.hasOwnProperty("price")) {
		$str += infoObj.price;
	}

	if (infoObj.hasOwnProperty("basePrice") && infoObj.basePrice > 0) {
		if (start === false) {
			start = true;
		}
		$str += "软件平台价格：" + infoObj.basePrice;
	}

	if (infoObj.hasOwnProperty("hostPrice") && infoObj.hostPrice > 0) {
		if (start === false) {
			start = true;
		} else {
			$str += "<br>";
		}
		$str += "每物理主机授权价格：" + infoObj.hostPrice;
	}

	if (infoObj.hasOwnProperty("pointPrice") && infoObj.pointPrice > 0) {
		if (start === false) {
			start = true;
		} else {
			$str += "<br>";
		}
		$str += "每点位授权价格：" + infoObj.pointPrice;
	}

	if (infoObj.hasOwnProperty("cpuPrice") && infoObj.cpuPrice > 0) {
		if (start === false) {
			start = true;
		} else {
			$str += "<br>";
		}
		$str += "每CPU授权价格：" + infoObj.cpuPrice;
	}

	return $str;
}

function raiseProductDetail(item) {

	$detailTable = $("#appDetailBody");

	var bodyStr = "";

	bodyStr += "<tr><th style='width: 20%;'>属性</th>";
	bodyStr += "<th>内容</th></tr>";

	bodyStr += "<tr><td>名称</td><td>" + item.name + "</td></tr>";
	bodyStr += "<tr><td>单价</td><td style='color: red'>" + parseProductPrice(item.infoObj) + "</td></tr>";
	bodyStr += "<tr><td>产品类型</td><td>" + item.typeName + "</td></tr>";
	bodyStr += "<tr><td>状态</td><td style='color: " + getStatusColor(item.state) + "'>" + item.state + "</td></tr>";
	bodyStr += "<tr><td>ID</td><td style='font-family: Consolas'>" + item.id + "</td></tr>";
	bodyStr += "<tr><td>参数</td><td>" + parseProductParas(item.infoObj, item.type) + "</td></tr>";
	bodyStr += "<tr><td>修改时间</td><td>" + item.lastSync + "</td></tr>";
	bodyStr += "<tr><td>创建时间</td><td>" + item.createTime + "</td></tr>";
	bodyStr += "<tr><td>描述</td><td>" + item.desc + "</td></tr>";


	$detailTable.html(bodyStr);

	$("#modalProductDetail").modal("show");
}

function loadVmAppTableHeader() {

	var bodyStr = "";

	bodyStr += "<tr><th>名称</th>";
	bodyStr += "<th>状态</th>";
	bodyStr += "<th>图标</th>";
	bodyStr += "<th>路径</th>";
	bodyStr += "<th>添加时间</th>";
	bodyStr += "<th>操作</th></tr>";

	return bodyStr;
}

function initAppOperation(table) {
	var trList = table.children("tbody").children('tr');
	trList.each(function () {
		var $tr = $(this);
		// to skip header
		if ($tr.index() !== 0) {

			var $remove = $tr.children(".manager").children(".delappbutton");
			if ($remove !== null) {
				$remove.click(function () {
					raiseRemoveApp($tr.data("appObj"));
				});
			}

			var $edit = $tr.children(".manager").children(".editappbutton");
			if ($edit !== null) {
				$edit.click(function () {
					raiseUpdateApp($tr.data("appObj"));
				});
			}

			var $sync = $tr.children(".manager").children(".syncappbutton");
			if ($sync !== null) {
				$sync.click(function () {
					syncApp($tr.data("appObj"));
				});
			}
		}
	});
}

function update_vm_app(vmId, apps) {

	$detailTable = $("#vm-detail-table");

	$detailTable.html(loadVmAppTableHeader());

	for (i = 0; i < apps.length; i++) {
		printAppLine(apps[i], $detailTable);
	}

	initAppOperation($detailTable);

	$span = $("<div class='addbutton operationButton'>添加</div>");
	$span.click(function () {
		raiseAddApp(vmId);
	});

	$detailTable.append($span);
}

function switchVmDetail_app() {

	closeOtherVmDetailButtons("#vmdetail-button-app");

	paras = createGetVmAppParas(g_current_detail_vm_id);

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {

		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm(null, errorMsg);
		}

		var dataObj = apiResponse.getDataObj();
		if (dataObj === null) {
			return raiseErrorAlarm(null, ERROR_MSG_NO_DATABODY);
		}

		update_vm_app(g_current_detail_vm_id, dataObj["apps"]);
	})
}

function update_vm_attrs(vm) {

	$detailTable = $("#vm-detail-table");

	hardwareConfig = vm["hardwareConfig"];

	var bodyStr = "";

	bodyStr += "<tr><th>属性</th>";
	bodyStr += "<th>内容</th></tr>";

	bodyStr += "<tr><td>启动项</td><td>" + getBootLoaderStr(vm.bootloaderArgs) + "</td></tr>";
	bodyStr += "<tr><td>声卡驱动</td><td>" + hardwareConfig["sound"].model + "</td></tr>";
	bodyStr += "<tr><td>网卡驱动</td><td>" + hardwareConfig["netcard"].model + "</td></tr>";
	bodyStr += "<tr><td>磁盘驱动</td><td>" + hardwareConfig["disk"].bus + "</td></tr>";
	bodyStr += "<tr><td>显卡设置</td><td>" + parseVideoConfig(hardwareConfig["video"]) + "</td></tr>";
	bodyStr += "<tr><td>连接设置</td><td>" + parseDisplayConfig(hardwareConfig["display"]) + "</td></tr>";
	bodyStr += "<tr><td>CPU模式</td><td>" + hardwareConfig["cpu"].mode + "</td></tr>";

	$detailTable.html(bodyStr);
}

function switchVmDetail_attrs() {

	closeOtherVmDetailButtons("#vmdetail-button-attrs");

	vm = g_current_vmdetail;
	if (vm !== null) {
		update_vm_attrs(vm);
	}
}

var g_current_detail_vm_id = "";
var g_current_vmdetail = null;
var g_vm_app = null;

function switchVmDetail(vmId) {

	g_current_detail_vm_id = vmId;

	closeOtherPages("#vmdetail-manage");

	switchVmDetail_main();

	openPage("#vmdetail-manage");
}

function printPricingLine(item, vmTable) {

	var vmItem = "";

	vmItem += "<tr>";
	vmItem += "<td> <input type=\"checkbox\" name=\"vmListItems\" style='width: 20px; height: 20px'> </td>";
	vmItem += "<td>" + item.name +"</a></td>";
	vmItem += "<td style='color: blue'>" + item.points + "</td>";
	vmItem += "<td style='color: red'>" + item.price + "</td>";
	vmItem += "<td>" + item.summary + "</td>";
	vmItem += "<td>" + item.createTime + "</td>";

	vmItem += "<td class='manager'>";
	vmItem += "<span class='detailpricingbutton commonbutton operationButton'>详情</span>";
	vmItem += "<span class='exportpricingbutton commonbutton operationButton'>导出</span>";
	vmItem += "<span class='deletepricingbutton commonbutton operationButton'>删除</span>";
	vmItem += "</td></tr>";

	var $tr = $(vmItem);
	$tr.data("vmObj", item);

	// set double click function
	$tr.dblclick(function () {
		raisePricingDetail(item);
	});

	vmTable.append($tr);
}


function getQueryResultsCallback(resultObj, paras) {

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

	count = dataObj.total;
	items = dataObj.items;

	var vmTable = $("#vm-list-tab");
	vmTable.html(loadPricingTableHeader());

	if (count === 0) {
		vmTable.html("");
	} else {
		for (i = 0; i < count; i++) {
			printPricingLine(items[i], vmTable);
		}
	}

	initPricingOperation(vmTable);
}

function loadProductTableHeader() {

	var header = "";

	header += "<tr class=\"vm-table-header\">";
	header += "<th><input type=\"checkbox\" style='width: 20px; height: 20px'></th>";
	header += "<th>产品名称</th>";
	header += "<th>编号</th>";
	//header += "<th>类型</th>";
	header += "<th>单价</th>";
	header += "<th>状态</th>";
	header += "<th>修改时间</th>";
	header += "<th>管理</th></tr>";

	return header;
}

function printProductLine(obj, table) {

	var itemStr = "";

	itemStr += "<tr><td><input type=\"checkbox\" name=\"serviceListItems\" style='width: 20px; height: 20px'></td>";
	itemStr += "<td style='line-height: 32px'>" + obj.name + "</td>";
	itemStr += "<td style='line-height: 32px; font-family: Consolas'>" + obj.infoObj["id"] + "</td>";
	//itemStr += "<td style='line-height: 32px'>" + obj.typeName + "</td>";
	itemStr += "<td style='line-height: 18px; color: red'>" + parseProductPrice(obj.infoObj) + "</td>";
	itemStr += "<td style='line-height: 32px; color: " + getProductStateColor(obj.state) + "'>" + obj.state + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.lastSync + "</td>";

	itemStr += "<td class='manager'>";
	itemStr += "<span class='productpricebutton commonbutton operationButton'>价格</span>";
	itemStr += "<span class='productupdatebutton commonbutton operationButton'>编辑</span>";
	itemStr += "<span class='productdeltebutton commonbutton operationButton'>删除</span>";
	itemStr += "</td></tr>";

	var $tr = $(itemStr);
	$tr.data("dataObj", obj);

	$tr.dblclick(function () {
		raiseProductDetail(obj);
	});

	table.append($tr);
}

function initProductOperation(table) {
	var trList = table.children("tbody").children('tr');
	trList.each(function () {
		var $tr = $(this);
		// to skip header
		if ($tr.index() !== 0) {

			var $remove = $tr.children(".manager").children(".productdeltebutton");
			if ($remove !== null) {
				$remove.click(function () {
					alert("delete product");
					//raiseServiceManage(SERVICE_MANAGE_DELETE, $tr.data("dataObj"));
				});
			}

			var $cancel = $tr.children(".manager").children(".productupdatebutton");
			if ($cancel !== null) {
				$cancel.click(function () {
					alert("update product");
				});
			}

			var $resume = $tr.children(".manager").children(".productpricebutton");
			if ($resume !== null) {
				$resume.click(function () {
					alert("product price");
				});
			}
		} else {
			// handle checkbox here
			var $selectAll = $tr.children("th").children("input");
			$selectAll.click(function () {
				selectAllProducts(this.checked);
			});
		}
	});
}

function getProductsCallback(resultObj, paras) {

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

	count = dataObj.total;
	services = dataObj.items;

	var table = $("#service-list-tab");
	table.html(loadProductTableHeader());

	if (count !== 0) {
		for (i = 0; i < count; i++) {
			printProductLine(services[i], table);
		}
	} else {
		table.html("");
	}

	initProductOperation(table);
}

function getProductList(type) {
	ajaxPost(API_URL, JSON.stringify(createGetProductsParas(type)), getProductsCallback);
}

function getAllQueryResults(type) {
	paras = createGetQueryResultsParas(type);
	ajaxPost(API_URL, JSON.stringify(paras), getQueryResultsCallback);
}

function doResponseCheck(resultObj) {

	if (resultObj === null) {
		console.log("got null result obj,nothing returned");
		return null;
	}

	if (resultObj.hasOwnProperty("errorObj") === false || resultObj.hasOwnProperty("data") === false) {
		console.log("return obj has no errorObj or data appending");
		return null;
	}

	return new APIResponseClass(resultObj);
}

function getUser(userId) {

	ajaxPost(API_URL, JSON.stringify(createGetUserParas(userId)), function (resultObj) {

		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm(null, errorMsg);
		}

		var dataObj = apiResponse.getDataObj();
		if (dataObj === null) {
			return raiseErrorAlarm(null, ERROR_MSG_NO_DATABODY);
		}
		g_userInfo = dataObj;

		var $userInfo = $("#user-detail-table");
		$userInfo.data("userObj", dataObj);

		obj = dataObj;

		var bodyStr = "";
		bodyStr += "<tr><th>属性</th><th>内容</th></tr>";
		bodyStr += "<tr><td>名称</td><td>" + obj.name + "</td></tr>";
		bodyStr += "<tr><td>状态</td><td>" + obj.stateCN + "</td></tr>";
		bodyStr += "<tr><td>ID</td><td>" + obj.id + "</td></tr>";
		bodyStr += "<tr><td>Email</td><td>" + obj.email + "</td></tr>";
		bodyStr += "<tr><td>UKey</td><td>" + obj.ukey + "</td></tr>";
		bodyStr += "<tr><td>电话</td><td>" + obj.phone + "</td></tr>";
		bodyStr += "<tr><td>创建时间</td><td>" + obj.createTime + "</td></tr>";
		bodyStr += "<tr><td>描述</td><td>" + obj.desc + "</td></tr>";

		$userInfo.html(bodyStr);
	});
}

function raiseErrorAlarm(toHideModalId, errorMsg) {
	// update Label
	if (toHideModalId !== null) {
		$(toHideModalId).modal("hide");
	}

	$("#alarmBodyContent").html(errorMsg);
	$("#modalAlarm").modal("show");
}

function raisePromptDialog(toHideModalId, promptMsg) {
	if (toHideModalId !== null) {
		$(toHideModalId).modal("hide");
	}

	$("#promptBodyContent").html(promptMsg);
	$("#modalPrompt").modal("show");
}

function updateUser() {

	var email = document.getElementById("userEditEmail").value;
	var phoneNumber = document.getElementById("userEditPhoneNumber").value;
	var desc = document.getElementById("userEditDesc").value;

	paras = createUpdateUserParas(g_current_user_id, email, phoneNumber, desc);

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalUserEditor", errorMsg);
		}
		$("#modalUserEditor").modal("hide");
		getUser(g_current_user_id);
	});
}

function changeUserPass() {

	var passArray = [];

	passArray.push(document.getElementById("userEditOldPass").value);
	passArray.push(document.getElementById("userEditNewPass").value);
	passArray.push(document.getElementById("userEditNewPassConfirm").value);

	for (var i = 0; i < passArray.length; i++) {
		if (passArray[i] === null || passArray[i].length === 0) {
			alert(ERROR_MSG_PASS_NOT_SPECIFIED);
			return;
		}
	}

	if (passArray[1] !== passArray[2]) {
		alert("新密码必须与确认密码一致，请重新输入");
		return;
	}

	paras = createChangeUserPassParaqs(g_current_user_id, passArray[0], passArray[1]);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj, paras) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalChangePass", errorMsg);
		}
		$("#modalChangePass").modal("hide");
	}, null);
}

function vmPowerCallback(resultObj, paras) {

	var apiResponse = doResponseCheck(resultObj);
	if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
		var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
		return raiseErrorAlarm("#modalPower", errorMsg);
	}

	$("#modalPower").modal("hide");
}

function doPowerRequest(vm) {
	paras = createVmPowerParaqs(vm, g_power_action);
	ajaxPost(API_URL, JSON.stringify(paras), vmPowerCallback);
}

function vmPower() {
	for (var i = 0; i < g_vmSelected.length; i++) {
		doPowerRequest(g_vmSelected[i]);
	}
}

function updateVmDataObj(trNode, dataObjList) {
	var oldVmObj = trNode.data("vmObj");

	for (var i = 0; i < dataObjList.length; i++) {
		var vm = dataObjList[i];
		if (vm.id === oldVmObj.id) {
			trNode.data("vmObj", vm);
			return;
		}
	}

	console.log("vm of " + oldVmObj.id + " name: " + oldVmObj.name + " lost");
}

function getSelectedProduct() {

	g_serviceSelected = [];

	var items = document.getElementsByName("serviceListItems");
	if (items.length === 0) {
		console.log("没有服务存在哦！");
		return;
	}

	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (item.checked === true) {
			var obj = $(item).parent().parent().data("serviceObj");
			g_serviceSelected.push(obj);
		}
	}
}

function selectAllProducts(checked) {

	var items = document.getElementsByName("serviceListItems");
	if (items.length === 0) {
		console.log("No Services exist, just skip select all operation");
		return;
	}

	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		item.checked = checked;
	}
}

function addProduct() {

	var name = document.getElementById("serviceName").value;
	var offering = getSelectedOption("#serviceOffering");
	var desc = document.getElementById("serviceDesc").value;

	paras = createAddServiceParas(g_current_user_id, name, offering, desc);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalAddService", errorMsg);
		}
		$("#modalAddService").modal("hide");
		switchToProductPage();
	});
}