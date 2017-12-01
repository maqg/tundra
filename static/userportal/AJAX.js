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
	header += "<th>类型</th>";
	header += "<th>点位数</th>";
	header += "<th>报价</th>";
	header += "<th>报价生成时间</th>";
	header += "<th>管理</th></tr>";

	return header;
}

function displayPricingDetail(vm) {

	$detailBody = $("#vmDetailBody");

	var bodyStr = "";

	bodyStr += "<table class=\"table table-striped table-hover\">";
	bodyStr += "<tr><th>属性</th><th>内容</th></tr>";
	bodyStr += "<tr><td>名称</td><td>" + vm.name + "</td></tr>";
	bodyStr += "<tr><td>状态</td><td style='color: " + getVmStateColor(vm.status) + "'>" + vm.status + "</td></tr>";
	bodyStr += "<tr><td>远程应用状态</td><td style='color: " + getStatusColor(vm.remoteAppStatus) + "'>" + vm.remoteAppStatus + "</td></tr>";
	bodyStr += "<tr><td>UUID</td><td style='font-family: Consolas'>" + vm.id + "</td></tr>";
	bodyStr += "<tr><td>CPU</td><td>" + vm.cpuNum + " 核心</td></tr>";
	bodyStr += "<tr><td>内存</td><td>" + vm.memory + " M</td></tr>";
	bodyStr += "<tr><td>持久磁盘</td><td>" + boolValue_d2s(vm.diskPersistent) + "</td></tr>";
	bodyStr += "<tr><td>开机启动</td><td>" + boolValue_d2s(vm.startWithHost) + "</td></tr>";
	bodyStr += "<tr><td>虚拟化类型</td><td>" + vm.hypervisorType + "</td></tr>";
	bodyStr += "<tr><td>系统模板</td><td>" + vm.imageName + "</td></tr>";
	bodyStr += "<tr><td>创建时间</td><td>" + vm.createTime + "</td></tr>";

	$detailBody.html(bodyStr);

	// to modify lable
	$lable = $("#modalVmDetailLabel");
	if ($lable !== null) {
		$lable.html("虚拟机详细-" + vm.name);
	}

	$("#modalVmDetail").modal("show");
}

function pricingDetailCallback(resultObj, vm) {

	var apiResponse = doResponseCheck(resultObj);
	if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
		var errMsg = apiResponse ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
		raiseErrorAlarm("#modalPrompt", errMsg);
		return;
	}

	var dataObj = apiResponse.getDataObj();
	if (dataObj === null) {
		raiseErrorAlarm("#modalPrompt", ERROR_MSG_NO_DATABODY);
		return;
	}

	displayPricingDetail(dataObj);
}

function raiseDetail(vm) {
	ajaxPost(API_URL, JSON.stringify(createGetVmParas(vm.id)), pricingDetailCallback, vm);
}

function raiseVmPassword(vm) {

	$vmPasswordBody = $("#vmPasswordBody");

	if ($vmPasswordBody === null) {
		raiseErrorAlarm(null, "打开修改密码页面失败！");
	} else {
		$lable = $("#modalVmPasswordLable");
		if ($lable !== null) {
			$lable.html("修改密码-" + vm.name);
		}

		var bodyStr = "";
		bodyStr += '<form class="form-horizontal" role="form">';
		bodyStr += '<div class="form-group">';
		bodyStr += '<label for="userEditOldPass" class="col-sm-2 control-label">用户名</label>';
		bodyStr += '<div class="col-sm-10">';
		if (vm.hasOwnProperty("account") && vm.account !== "" ) {
			bodyStr += '<input type="text" class="form-control" id="userName" value="' + vm.account + '" placeholder="账号" required/>';
		} else {
			bodyStr += '<input type="text" class="form-control" id="userName" value="" placeholder="账号" required/>';
		}
		bodyStr += '</div> </div>';
		bodyStr += '<div class="form-group">';
		bodyStr += '<label for="userNewPass" class="col-sm-2 control-label">新密码</label>';
		bodyStr += '<div class="col-sm-10">';
		bodyStr += '<input type="password" class="form-control" id="userNewPass" placeholder="新密码" required/>';
		bodyStr += '</div> </div>';
		bodyStr += '<div class="form-group">';
		bodyStr += '<label for="userNewPassConfirm" class="col-sm-2 control-label">确认密码</label>';
		bodyStr += '<div class="col-sm-10">';
		bodyStr += '<input type="password" class="form-control" id="userNewPassConfirm" placeholder="确认密码" required autofocus>';
		bodyStr += '</div> </div>';
		bodyStr += '<div class="modal-footer">';
		bodyStr += '<button type="button" class="btn btn-primary" onclick="updateVmPassword(\'' + vm.id + '\');">确定</button>';
		bodyStr += '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>';
		bodyStr += '</div> </form>';

		$vmPasswordBody.html(bodyStr);
		$vmPasswordBody.data('vmObj', vm);

		$("#modalVmPassword").modal("show");
	}
}

function raiseVmAttr(vm) {

	$vmAttrBody = $("#vmAttrBody");

	if ($vmAttrBody === null) {
		raiseErrorAlarm(null, "打开属性页面失败！");
	} else {
		$lable = $("#modalVmAttrLabel");
		if ($lable !== null) {
			$lable.html("设置启动项-" + vm.name);
		}

		var bodyStr = "";

		bodyStr += "<table class=\"table table-striped table-hover\">";
		bodyStr += "<tr style=\"height: 42px\">";
		bodyStr += "<td style=\"line-height: 42px; font-weight: bold\">启动顺序</td>";
		bodyStr += "<td style=\"line-height: 42px\">" + getBootLoaderStr(vm.bootloaderArgs) + "</td>";
		bodyStr += "<td><span style=\"line-height: 32px; font-size: 120%\" id=\"vmSetBootArgs\" class='attr operationButton''>修改</span></td></tr>";

		bodyStr += "</table></div>";

		$vmAttrBody.html(bodyStr);
		$vmAttrBody.data("vmObj", vm);

		$("#vmSetBootArgs").click(function () {
			raiseVmBootLoader(vm);
		});

		$("#modalVmAttr").modal("show");
	}
}

function selectAllVms(checked) {
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

function initOperation(vmTable) {
	var trList = vmTable.children("tbody").children('tr');
	trList.each(function () {

		var $tr = $(this);

		// to skip header
		if ($tr.index() !== 0) {

			var $vnc = $tr.children(".manager").children(".vnc");
			var $rdp = $tr.children(".manager").children(".rdp");
			var $spice = $tr.children(".manager").children(".spice");
			var $attr = $tr.children(".vmAttr").children(".attr");
			var $password = $tr.children(".vmAttr").children(".password");
			var $bindUSB = $tr.children(".vmAttr").children(".bindUSB");

			if ($vnc !== null) {
				$vnc.click(function () {
					raiseWsVNC($tr.data("vmObj"));
				});
			}

			if ($rdp !== null) {
				$rdp.click(function () {
					raiseRDP($tr.data("vmObj"));
				});
			}

			if ($spice !== null) {
				$spice.click(function () {
					raiseSPICE($tr.data("vmObj"));
				});
			}

			if ($attr !== null) {
				$attr.click(function () {
					raiseVmAttr($tr.data("vmObj"));
				});
			}

			if ($password !== null) {
				$password.click(function () {
					raiseVmPassword($tr.data("vmObj"));
				});
			}

			if ($bindUSB !== null) {
				$bindUSB.click(function () {
					raiseBindUSB($tr.data("vmObj"));
				});
			}
		} else {
			// handle checkbox here
			var $selectAll = $tr.children("th").children("input");
			$selectAll.click(function () {
				selectAllVms(this.checked);
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

function raiseAppDetail(app) {

	$detailTable = $("#appDetailBody");

	var bodyStr = "";

	bodyStr += "<tr><th>属性</th>";
	bodyStr += "<th>内容</th></tr>";

	bodyStr += "<tr><td>应用</td><td>" + app.name + "</td></tr>";
	bodyStr += "<tr><td>状态</td><td style='color: " + getStatusColor(app.status) + "'>" + app.status + "</td></tr>";
	if (app.icon === "") {
		bodyStr += "<tr><td>图标</td><td><img src='/static/imgs/unknown.png'/></td></tr>";
	} else {
		bodyStr += "<tr><td>图标</td><td><img src='data:image/png;base64," + app.icon + "'/></td></tr>";
	}
	bodyStr += "<tr><td>UUID</td><td style='font-family: Consolas'>" + app.id + "</td></tr>";
	bodyStr += "<tr><td>路径</td><td>" + app.path + "</td></tr>";
	bodyStr += "<tr><td>参数</td><td>" + app.paras + "</td></tr>";
	bodyStr += "<tr><td>修改时间</td><td>" + app.lastSync + "</td></tr>";
	bodyStr += "<tr><td>创建时间</td><td>" + app.createTime + "</td></tr>";

	$detailTable.html(bodyStr);

	$("#modalAppDetail").modal("show");
}

function printAppLine(obj, table) {

	var itemStr = "";

	itemStr += "<tr><td style='line-height: 32px'>" + obj.name + "</td>";
	itemStr += "<td style='line-height: 32px;color: " + getStatusColor(obj.status) + "'>" + obj.status + "</td>";
	if (obj.icon === "") {
		itemStr += "<td style='line-height: 32px'><img class='applogo' src='/static/imgs/unknown.png'></td>";
	} else {
		itemStr += "<td style='line-height: 32px'><img class='applogo' src='data:image/png;base64," + obj.icon + "'></td>";
	}
	itemStr += "<td style='line-height: 32px'>" + obj.path + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.createTime + "</td>";
	itemStr += "<td class='manager'><span class='editappbutton commonbutton operationButton'>编辑</span><span class='syncappbutton commonbutton operationButton'>同步</span><span class='delappbutton commonbutton operationButton'>删除</span></td></tr>";

	var $tr = $(itemStr);
	$tr.data("appObj", obj);

	$tr.dblclick(function () {
		raiseAppDetail(obj);
	});

	table.append($tr);
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
	vmItem += "<td>" + item.typeCN + "</td>";
	vmItem += "<td>" + item.points + "</td>";
	vmItem += "<td>" + item.price + "</td>";
	vmItem += "<td>" + item.createTime + "</td>";

	vmItem += "<td class='vmAttr'>" + "<span class='attr operationButton'>详情</span><span class='password operationButton'>导出</span></td>";
	vmItem += "</tr>";

	var $tr = $(vmItem);
	$tr.data("vmObj", item);

	// set double click function
	$tr.dblclick(function () {
		raiseDetail(item);
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

	initOperation(vmTable);
}

function loadProductTableHeader() {

	var header = "";

	header += "<tr class=\"vm-table-header\">";
	header += "<th><input type=\"checkbox\" style='width: 20px; height: 20px'></th>";
	header += "<th>产品名称</th>";
	header += "<th>状态</th>";
	header += "<th>类型</th>";
	header += "<th>编号</th>";
	header += "<th>创建时间</th>";
	header += "<th>修改时间</th>";
	header += "<th>管理</th></tr>";

	return header;
}

var g_refresh_service_id = "";

function printProductLine(obj, table) {

	var itemStr = "";

	itemStr += "<tr><td><input type=\"checkbox\" name=\"serviceListItems\" style='width: 20px; height: 20px'></td>";
	itemStr += "<td style='line-height: 32px'>" + obj.name + "</td>";

	itemStr += "<td style='line-height: 32px; color: " + getProductStateColor(obj.state) + "'>" + obj.state + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.typeName + "</td>";
	itemStr += "<td style='line-height: 32px; font-family: Consolas'>" + obj.info["id"] + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.createTime + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.lastSync + "</td>";

	itemStr += "<td class='manager'>";
	itemStr += "<span class='cancelservicebutton commonbutton operationButton'>编辑</span>";
	itemStr += "</td></tr>";

	var $tr = $(itemStr);
	$tr.data("serviceObj", obj);

	table.append($tr);
}

function initProductOperation(table) {
	var trList = table.children("tbody").children('tr');
	trList.each(function () {
		var $tr = $(this);
		// to skip header
		if ($tr.index() !== 0) {

			var $remove = $tr.children(".manager").children(".delservicebutton");
			if ($remove !== null) {
				$remove.click(function () {
					raiseServiceManage(SERVICE_MANAGE_DELETE, $tr.data("serviceObj"));
				});
			}

			var $cancel = $tr.children(".manager").children(".cancelservicebutton");
			if ($cancel !== null) {
				$cancel.click(function () {
					raiseServiceManage(SERVICE_MANAGE_CANCEL, $tr.data("serviceObj"));
				});
			}

			var $resume = $tr.children(".manager").children(".resumeservicebutton");
			if ($resume !== null) {
				$resume.click(function () {
					raiseServiceManage(SERVICE_MANAGE_RESUME, $tr.data("serviceObj"));
				});
			}

			var $abandon = $tr.children(".manager").children(".abandonservicebutton");
			if ($abandon !== null) {
				$abandon.click(function () {
					raiseServiceManage(SERVICE_MANAGE_ABANDON, $tr.data("serviceObj"));
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