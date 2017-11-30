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

function loadVmTableHeader() {
	var vmTableHeader = "";

	vmTableHeader += "<tr class=\"vm-table-header\">";
	vmTableHeader += "<th><input type=\"checkbox\" style='width: 20px; height: 20px'></th>";
	vmTableHeader += "<th>虚拟机名</th>";
	vmTableHeader += "<th>UUID</th>";
	vmTableHeader += "<th>IP地址</th>";
	vmTableHeader += "<th>状态</th>";
	vmTableHeader += "<th>模板</th>";
	vmTableHeader += "<th>操作系统</th>";
	vmTableHeader += "<th>属性</th>";
	vmTableHeader += "<th>管理</th></tr>";

	return vmTableHeader;
}

function raiseVNCCallback(resultObj, vm) {

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

	if (dataObj.hasOwnProperty("token") === false) {
		raiseErrorAlarm("#modalPrompt", "novnc软件包未安装，请安装后再试！");
		return;
	}

	var url = "http://" + window.location.hostname + ":2443" + "/static/noVNC/vnc_auto.html?host=" + window.location.hostname;
	url += "&port=" + dataObj.proxyPort;
	url += "&title=" + vm.name;
	url += "&token=" + dataObj.token;

	// to hide the alarm dialog
	$("#modalPrompt").modal("hide");

	window.open(url, "VNC-VM_" + vm.name);
}

function raiseWsVNC(vm) {

	if (vm.status !== VM_STATE_RUNNING) {
		raiseErrorAlarm(null, ERROR_MSG_VM_NOT_RUNNING + "：" + vm.name);
		return;
	}

	raisePromptDialog(null, "请稍候，正在连接 VNC 服务器！");

	paras = createVmVncConsoleParas(vm.id);
	ajaxPost(API_URL, JSON.stringify(paras), raiseVNCCallback, vm);
}

function displayVmDetail(vm) {

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

function vmDetailCallback(resultObj, vm) {

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

	displayVmDetail(dataObj);
}

function raiseDetail(vm) {
	ajaxPost(API_URL, JSON.stringify(createGetVmParas(vm.id)), vmDetailCallback, vm);
}

function vmSetCdromIso(cdrom, selectedIso) {

	var url = "";

	if (selectedIso === cdrom.imageId) {
		console.log("selected the same iso file " + selectedIso);
		$("#modalIsoManage").modal("hide");
		return;
	}

	if (selectedIso === "无") {
		console.log("no need to set, cdrom and isofile both null");
		$("#modalIsoManage").modal("hide");
		return;
	}

	paras = createCdromSetIsoParas(selectedIso, cdrom.id);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm(null, errorMsg);
		}

		$("#modalIsoManage").modal("hide");
	});
}

function vmIsoSelectorCallback(resultObj, cdrom) {

	var apiResponse = doResponseCheck(resultObj);
	if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
		var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
		return raiseErrorAlarm(null, errorMsg);
	}

	var dataObj = apiResponse.getDataObj();
	if (dataObj === null) {
		return raiseErrorAlarm(null, ERROR_MSG_NO_DATABODY);
	}

	isoList = dataObj;

	var bodyStr = "";

	bodyStr += "<select style='font-size: 120%; height: 42px' class=\"form-control\" id=\"vmIsoSelectorItem\">";

	// add default value
	bodyStr += "<option ";
	if (cdrom.hasOwnProperty("imageId") === false || cdrom.imageId === "无") {
		bodyStr += " selected ";
	}
	bodyStr += "value=\"无\">无</option>";

	for (var i = 0; i < isoList.length; i++) {
		var isoFile = isoList[i];
		bodyStr += "<option ";
		if (isIsoSelected(isoFile.id, cdrom.imageId)) {
			bodyStr += " class='lastSelected' selected ";
		}
		bodyStr += "value='" + isoFile.id + "'>" + isoFile.name + "（大小：" + isoFile.diskSize + " M）</option>";
	}
	bodyStr += "</select>";

	$("#isoManageBody").html(bodyStr);

	var footStr = "";
	footStr += "<button id=\"btnVmIsoSelector\" type=\"button\" class=\"btn btn-default\">确定</button>";
	$("#modalVmIsoSelectorFooter").html(footStr);

	// set iso setting action
	$("#btnVmIsoSelector").click(function () {
		var selectedIso = $("#isoManageBody option:selected").val();
		console.log("select iso file " + selectedIso);
		vmSetCdromIso(cdrom, selectedIso);
	});

	$("#modalIsoManage").modal("show");
}

function getFirstOptionList(vm) {
	var firstStr = "";
	var firstOption = getFirstBootOption(vm.bootloaderArgs);

	for (var i = 1; i < 4; i++) {
		if (bootOption_d2s(i) === firstOption) {
			firstStr += "<option class='lastSelected' selected>" + bootOption_d2s(i) + "</option>";
		} else {
			firstStr += "<option>" + bootOption_d2s(i) + "</option>";
		}
	}

	return firstStr;
}

function getSecondOptionList(vm) {
	var secondStr = "";
	var secondOption = getSecondBootOption(vm.bootloaderArgs);

	for (var i = 0; i < 4; i++) {
		// to skip selected ones above
		if (bootOption_d2s(i) === getFirstSelectedOption()) {
			continue;
		}

		if (bootOption_d2s(i) === secondOption) {
			secondStr += "<option class='lastSelected' selected>" + bootOption_d2s(i) + "</option>";
		} else {
			secondStr += "<option>" + bootOption_d2s(i) + "</option>";
		}
	}

	return secondStr;
}

function getThirdOptionList(vm) {

	var thirdStr = "";
	var thirdOption = getThirdBootOption(vm.bootloaderArgs);

	for (var i = 0; i < 4; i++) {
		// to skip selected ones above
		if (bootOption_d2s(i) !== "无" && (bootOption_d2s(i) === getFirstSelectedOption()
			|| bootOption_d2s(i) === getSecondSelectedOption())) {
			continue;
		}

		if (bootOption_d2s(i) === thirdOption) {
			thirdStr += "<option class='lastSelected' selected>" + bootOption_d2s(i) + "</option>";
		} else {
			thirdStr += "<option>" + bootOption_d2s(i) + "</option>";
		}
	}

	return thirdStr;
}

function refreshSecondBootList(vm) {
	$("#vmBootLoaderSecond").html(getSecondOptionList(vm));
}

function refreshThirdBootList(vm) {
	$("#vmBootLoaderThird").html(getThirdOptionList(vm));
}


function initOptionList(vm) {

	$("#vmBootLoaderFirst").html(getFirstOptionList(vm));
	$("#vmBootLoaderFirst").change(function () {
		refreshSecondBootList(vm);
		refreshThirdBootList(vm);
	});

	$("#vmBootLoaderSecond").html(getSecondOptionList(vm));
	$("#vmBootLoaderSecond").change(function () {
		refreshThirdBootList(vm);
	});

	$("#vmBootLoaderThird").html(getThirdOptionList(vm));
	$("#vmBootLoaderThird").change(function () {
		console.log(getThirdSelectedOption());
	});
}

function setBootOption(vm, bootArgs) {

	if (bootArgs === vm.bootloaderArgs) {
		console.log("bootArgs not changed " + bootArgs);
		$("#modalVmBootLoader").modal("hide");
		return;
	}

	paras = createVmAdvancedOptionParas(vm.id, vm.diskPersistent,
		vm.allocatorStrategy,
		vm.startWithHost,
		bootArgs);

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj, vm) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm("#modalVmBootLoader", errorMsg);
		}
		$("#modalVmBootLoader").modal("hide");

		if (vm.status !== VM_STATE_CLOSED) {
			return raiseErrorAlarm(null, ERROR_MSG_REBOOT_NEED);
		}
	}, vm);
}

function raiseVmBootLoader(vm) {

	// set modal label.
	$("#modalVmBootLoaderLabel").html("虚拟机启动顺序-" + vm.name);

	$("#vmBootLoaderFirst").html("");
	$("#vmBootLoaderSecond").html("");
	$("#vmBootLoaderThird").html("");

	initOptionList(vm);

	var footStr = "";
	footStr += "<button id=\"btnVmBootLoader\" type=\"button\" class=\"btn btn-default\">确定</button>";
	$("#modalVmBootLoaderFooter").html(footStr);

	// set iso setting action
	$("#btnVmBootLoader").click(function () {

		var first = $("#vmBootLoaderFirst option:selected").val();
		var second = $("#vmBootLoaderSecond option:selected").val();
		var third = $("#vmBootLoaderThird option:selected").val();

		var bootArgs = "";

		bootArgs += bootOption_s2d(first);
		bootArgs += bootOption_s2d(second);
		bootArgs += bootOption_s2d(third);

		console.log("bootArgs is: " + bootArgs);

		setBootOption(vm, bootArgs);
	});

	$("#modalVmAttr").modal("hide");
	$("#modalVmBootLoader").modal("show");
}

function raiseBindUSB(vm) {
	$bindUSBBody = $("#bindUSBBody");

	if ($bindUSBBody === null) {
		raiseErrorAlarm(null, "打开绑定USB页面失败！");
	} else {
		$lable = $("#modalBindUSBLable");
		if ($lable !== null) {
			$lable.html("绑定USB-" + vm.name);
		}

		var bodyStr = "";
		bodyStr += '<div>';
		bodyStr += '<label>已绑定的USB</label>';
		bodyStr += '<table id="yetBind-USB-table" class="table">';
		bodyStr += '<tr>';
		bodyStr += '<td>USBID</td>';
		bodyStr += '<td>USB名称</td>';
		bodyStr += '<td>操作</td>';
		bodyStr += '</tr>';
		bodyStr += '</table>';
		bodyStr += '</div>';

		bodyStr += '<div>';
		bodyStr += '<label>可绑定的USB</label>';
		bodyStr += '<table id="canBind-USB-table" class="table">';
		bodyStr += '<tr>';
		bodyStr += '<td>USBID</td>';
		bodyStr += '<td>USB名称</td>';
		bodyStr += '<td>状态</td>';
		bodyStr += '<td>操作</td>';
		bodyStr += '</tr>';
		bodyStr += '</table>';
		bodyStr += '</div>';

		$bindUSBBody.html(bodyStr);
		$bindUSBBody.data('bindUSB', vm);
		vmId = vm.id;
		var yetBindUSBTable = $('#yetBind-USB-table');
		if (vm['usbDevices'] !== null) {
			var yetBindUSB = vm['usbDevices'];
			for (var i = 0; i < yetBindUSB.length; i++) {
				printYetBindUSBLine(yetBindUSB[i], yetBindUSBTable, vmId);
			}
		}

		getCanBindUSB(vmId);

		$("#modalBindUSB").modal("show");
	}
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

function raiseRDP(vm) {

	isIe = !!window.ActiveXObject || "ActiveXObject" in window;
	if (isIe === false) {
		raiseErrorAlarm(null, ERROR_MSG_MUST_WITH_IE);
		return;
	}

	if (vm.status !== VM_STATE_RUNNING) {
		raiseErrorAlarm(null, ERROR_MSG_VM_NOT_RUNNING + "：" + vm.name);
		return;
	}

	console.log(vm);

	RDPConnect(vm);
}

function raiseSPICE(vm) {
	var host = window.location.hostname;
	raiseErrorAlarm(null, "SPICE 协议暂不支持：" + vm.name);
	console.log(host);
	console.log(vm);
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

function printYetBindUSBLine(usb, usbTable, vmId) {
	var usbItem = "";
	usbItem += '<tr>';
	usbItem += '<td>' + usb.vender + ':' + usb.product + '</td>';
	usbItem += '<td>' + usb.name + '</td>';
	usbItem += '<td><button type="button" class="btn btn-primary" onclick="removeUSB(\'' + vmId + '\',\'' + usb.id + '\')">解除绑定</button></td>';
	usbItem += '</tr>';

	var $tr = $(usbItem);
	usbTable.append($tr);
}
function printCanBindUSBLine(usb, usbTable, vmId) {
	var usbItem = "";
	usbItem += '<tr>';
	usbItem += '<td>' + usb.vender + ':' + usb.product + '</td>';
	usbItem += '<td>' + usb.name + '</td>';
	if (usb.state === 1) {
		usbItem += '<td>已占用</td>';
	} else {
		usbItem += '<td>未占用</td>';
	}
	usbItem += '<td><button type="button" class="btn btn-primary" onclick="bindUSB(\'' + vmId + '\',\'' + usb.id + '\');">绑定</button></td>';
	usbItem += '</tr>';

	var $tr = $(usbItem);
	usbTable.append($tr);
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

function parseNicDnsInfo(nic) {
	var dns = "";

	if (nic.dns1 !== "") {
		dns += nic.dns1;
	}

	if (nic.dns2 !== "") {
		dns += "，" + nic.dns2;
	}

	if (nic.dns3 !== "") {
		dns += "，" + nic.dns3;
	}

	return dns;
}

function update_vm_nic_info(vm) {

	$detailTable = $("#vm-detail-table");

	nics = vm["nics"];

	var bodyStr = "";

	bodyStr += "<tr><th>名称</th>";
	bodyStr += "<th>MAC</th>";
	bodyStr += "<th>IP地址</th>";
	bodyStr += "<th>掩码</th>";
	bodyStr += "<th>网关</th>";
	bodyStr += "<th>DNS服务器</th>";
	bodyStr += "<th>三层网络</th></tr>";

	for (i = 0; i < nics.length; i++) {
		nic = nics[i];
		bodyStr += "<tr><td>" + nic.name + "</td>";
		bodyStr += "<td>" + nic.mac + "</td>";
		bodyStr += "<td>" + nic.ip + "</td>";
		bodyStr += "<td>" + nic.netmask + "</td>";
		bodyStr += "<td>" + nic.gateway + "</td>";
		bodyStr += "<td>" + parseNicDnsInfo(nic) + "</td>";
		bodyStr += "<td>" + nic.l3name + "</td></tr>";
	}

	$detailTable.html(bodyStr);
}

function update_vm_disk_info(vm) {

	$detailTable = $("#vm-detail-table");

	volumes = vm["volumes"];

	var bodyStr = "";

	bodyStr += "<tr><th>ID</th>";
	bodyStr += "<th>名称</th>";
	bodyStr += "<th>类型</th>";
	bodyStr += "<th>状态</th>";
	bodyStr += "<th>UUID</th>";
	bodyStr += "<th>驱动类型</th>";
	bodyStr += "<th>容量</th></tr>";

	for (i = 0; i < volumes.length; i++) {
		volume = volumes[i];
		bodyStr += "<tr><td>" + volume.devId + "</td>";
		bodyStr += "<td>" + volume.name + "</td>";
		bodyStr += "<td>" + volume.type + "</td>";
		bodyStr += "<td>" + volume.status + "</td>";
		bodyStr += "<td style='font-family: Consolas'>" + volume.id + "</td>";
		bodyStr += "<td>" + volume.driver + "</td>";
		bodyStr += "<td>" + parseSize(volume.virtualSize) + "</td></tr>";
	}

	$detailTable.html(bodyStr);
}

function switchVmDetail_nic() {
	closeOtherVmDetailButtons("#vmdetail-button-nic");

	paras = createVmNicInfoParas(g_current_detail_vm_id);

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

		update_vm_nic_info(dataObj);
	})
}

function switchVmDetail_disk() {

	closeOtherVmDetailButtons("#vmdetail-button-disk");

	paras = createVmDiskInfoParas(g_current_detail_vm_id);

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

		update_vm_disk_info(dataObj);
	})
}

function loadCdromTableHeader() {
	var bodyStr = "";
	bodyStr += "<tr><th>ID</th>";
	bodyStr += "<th>名称</th>";
	bodyStr += "<th>格式</th>";
	bodyStr += "<th>状态</th>";
	bodyStr += "<th>UUID</th>";
	bodyStr += "<th>添加时间</th>";
	bodyStr += "<th>ISO</th>";
	bodyStr += "<th>大小</th>";
	bodyStr += "<th>操作</th></tr>";
	return bodyStr;
}

function printCdromLine(obj, table) {

	var itemStr = "";
	itemStr += "<tr><td style='line-height: 32px'>" + obj.devId + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.name + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.format + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.status + "</td>";
	itemStr += "<td style='line-height: 32px; font-family: Consolas'>" + obj.id + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.createTime + "</td>";
	itemStr += "<td style='line-height: 32px'>" + obj.imageName + "</td>";
	itemStr += "<td style='line-height: 32px'>" + parseSize(obj.size) + "</td>";
	itemStr += "<td class='manager'><span class='addisobutton operationButton'>挂载ISO</span><span class='delcdrombutton operationButton'>删除</span></td></tr>";

	var $tr = $(itemStr);
	$tr.data("cdromObj", obj);

	$tr.dblclick(function () {
		raiseCdromDetail(obj);
	});

	table.append($tr);
}

function initCdromOperation(table) {

	var trList = table.children("tbody").children('tr');

	trList.each(function () {
		var $tr = $(this);

		// to skip header
		if ($tr.index() !== 0) {

			var $addiso = $tr.children(".manager").children(".addisobutton");
			if ($addiso !== null) {
				$addiso.click(function () {
					raiseCdromChangeIso($tr.data("cdromObj"));
				});
			}

			var $removeCdrom = $tr.children(".manager").children(".delcdrombutton");
			if ($removeCdrom !== null) {
				$removeCdrom.click(function () {
					raiseRemoveCdrom($tr.data("cdromObj"));
				});
			}
		}
	});
}

function update_vm_cdrom_info(vmId, cdroms) {

	$detailTable = $("#vm-detail-table");
	$detailTable.html(loadCdromTableHeader());

	for (i = 0; i < cdroms.length; i++) {
		printCdromLine(cdroms[i], $detailTable);
	}

	initCdromOperation($detailTable);

	$span = $("<div class='addcdrombutton operationButton'>添加</div>");
	$span.click(function () {
		raiseAddCdrom(vmId);
	});

	$detailTable.append($span);
}

function raiseCdromChangeIso(cdrom) {
	paras = createGetVmIsoListParas(cdrom.vmId);
	ajaxPost(API_URL, JSON.stringify(paras), vmIsoSelectorCallback, cdrom);
}

// before this, should check vm's status
function raiseRemoveCdrom(cdrom) {

	if (g_current_vmdetail.status !== VM_STATE_CLOSED) {
		return raiseErrorAlarm(null, ERROR_MSG_HARDVIRTUAL_NEED);
	}

	var prompt = "你确定要<span style='color: red; font-size: 120%'>删除</span>如下光驱吗？</br>";
	prompt += cdrom.name;
	$("#cdRomPrompt").html(prompt);
	$("#modalDelCdrom").data("cdromObj", cdrom);
	$("#modalDelCdrom").modal("show");
}

function setVmIso(vmId, selectedIso) {
	paras = createAddCdromParas(vmId, selectedIso);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm("#modalIsoManage", errorMsg);
		}
		$("#modalIsoManage").modal("hide");

		switchVmDetail_cdrom();
	})
}

function removeCdrom() {

	cdrom = $("#modalDelCdrom").data("cdromObj");

	paras = createDelCdromParas(cdrom.id);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm("#modalDelCdrom", errorMsg);
		}
		$("#modalDelCdrom").modal("hide");

		switchVmDetail_cdrom();
	});
}

// before this, should check vm's status
function raiseAddCdrom(vmId) {

	if (g_current_vmdetail.status !== VM_STATE_CLOSED) {
		return raiseErrorAlarm(null, ERROR_MSG_HARDVIRTUAL_NEED);
	}

	paras = createGetVmIsoListParas(vmId);
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

		isoList = dataObj;

		var bodyStr = "";

		bodyStr += "<select style='font-size: 120%; height: 42px' class=\"form-control\" id=\"vmIsoSelectorItem\">";
		for (var i = 0; i < isoList.length; i++) {
			var isoFile = isoList[i];
			bodyStr += "<option ";
			bodyStr += "value='" + isoFile.id + "'>" + isoFile.name + "（大小：" + isoFile.diskSize + " M）</option>";
		}
		bodyStr += "</select>";

		$("#isoManageBody").html(bodyStr);

		var footStr = "";
		footStr += "<button id=\"btnVmIsoSelector\" type=\"button\" class=\"btn btn-default\">确定</button>";
		$("#modalVmIsoSelectorFooter").html(footStr);

		// set iso setting action
		$("#btnVmIsoSelector").click(function () {
			var selectedIso = $("#vmIsoSelectorItem option:selected").val();
			setVmIso(vmId, selectedIso);
		});

		$("#modalIsoManage").modal("show");
	});
}

function raiseCdromDetail(cdrom) {

	$detailTable = $("#cdromDetailBody");

	var bodyStr = "";

	bodyStr += "<tr><th>属性</th>";
	bodyStr += "<th>内容</th></tr>";

	bodyStr += "<tr><td>光驱</td><td>" + cdrom.name + "</td></tr>";
	bodyStr += "<tr><td>设备ID</td><td>" + cdrom.devId + "</td></tr>";
	bodyStr += "<tr><td>状态</td><td>" + cdrom.status + "</td></tr>";
	bodyStr += "<tr><td>UUID</td><td style='font-family: Consolas'>" + cdrom.id + "</td></tr>";
	bodyStr += "<tr><td>镜像ID</td><td>" + cdrom.imageId + "</td></tr>";
	bodyStr += "<tr><td>镜像名称</td><td>" + cdrom.imageName + "</td></tr>";
	bodyStr += "<tr><td>镜像大小</td><td>" + parseSize(cdrom.size) + "</td></tr>";
	bodyStr += "<tr><td>镜像格式</td><td>" + cdrom.format + "</td></tr>";
	bodyStr += "<tr><td>InstallPath</td><td>" + cdrom.installPath + "</td></tr>";
	bodyStr += "<tr><td>创建时间</td><td>" + cdrom.createTime + "</td></tr>";

	$detailTable.html(bodyStr);

	$("#modalCdromDetail").modal("show");
}

function switchVmDetail_cdrom() {

	closeOtherVmDetailButtons("#vmdetail-button-cdrom");

	paras = createVmCdromInfoParas(g_current_detail_vm_id);

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

		update_vm_cdrom_info(g_current_detail_vm_id, dataObj["cdroms"]);
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
	//bodyStr += "<th>ID</th>";
	bodyStr += "<th>路径</th>";
	//bodyStr += "<th>参数</th>";
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

function parseVideoConfig(video) {
	return "驱动：" + video.model + "，RAM：" + video.ram + "，VRAM：" +  video.vram;
}

function parseDisplayConfig(display) {
	return "连接方式：" + display.type + "，端口：" + display.running_port;
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

function printVmLine(vm, vmTable) {

	var vmItem = "";

	vmItem += "<tr>";
	vmItem += "<td> <input type=\"checkbox\" name=\"vmListItems\" style='width: 20px; height: 20px'> </td>";
	vmItem += "<td><a onclick=\"switchVmDetail('" + vm.id + "');\">" + vm.name +"</a></td>";
	vmItem += "<td style='font-family: Consolas'>" + vm.id + "</td>";
	vmItem += "<td>" + vm.ip + "</td>";
	vmItem += "<td class='classVmStata' style='color: " + getVmStateColor(vm.status) + "'>" + vm.status + "</td>";
	vmItem += "<td>" + vm.imageName + "</td>";
	vmItem += "<td>" + vm.osVersion + "</td>";

	vmItem += "<td class='vmAttr'>" + "<span class='attr operationButton'>启动顺序</span><span class='password operationButton'>修改密码</span></td>";
	vmItem += "<td class='manager'>" + "<span class='vnc operationButton'>VNC</span><span class='rdp operationButton'>RDP</span>" + "</td>";
	vmItem += "</tr>";

	var $tr = $(vmItem);
	$tr.data("vmObj", vm);

	// set double click function
	$tr.dblclick(function () {
		raiseDetail(vm);
	});

	vmTable.append($tr);
}


function getVmListCallback(resultObj, paras) {

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
	if (dataObj.hasOwnProperty("vms")) {
		vms = dataObj.vms;
	} else {
		vms = dataObj.vmList;
	}

	var vmTable = $("#vm-list-tab");
	vmTable.html(loadVmTableHeader());

	if (count === 0) {
		vmTable.html("");
	} else {
		for (i = 0; i < count; i++) {
			printVmLine(vms[i], vmTable);
		}
	}

	initOperation(vmTable);
}


function loadServiceTableHeader() {

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

function printServiceLine(obj, table) {

	var itemStr = "";

	itemStr += "<tr><td><input type=\"checkbox\" name=\"serviceListItems\" style='width: 20px; height: 20px'></td>";
	itemStr += "<td style='line-height: 32px'>" + obj.name + "</td>";

	itemStr += "<td style='line-height: 32px; color: " + getServicetateColor(obj.status) + "'>" + obj.status + "</td>";
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

function initServiceOperation(table) {
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
				selectAllServices(this.checked);
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
	table.html(loadServiceTableHeader());

	if (count !== 0) {
		for (i = 0; i < count; i++) {
			printServiceLine(services[i], table);
		}
	} else {
		table.html("");
	}

	initServiceOperation(table);
}

function getProductList() {
	ajaxPost(API_URL, JSON.stringify(createGetProductsParas()), getProductsCallback);
}

function getVmUSBCallback(resultObj, paras) {
	var apiResponse = doResponseCheck(resultObj);
	if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
		console.log(apiResponse ? apiResponse.getErrorMsg() : "Connect to API server Error");
		return;
	}

	var dataObj = apiResponse.getDataObj();
	if (dataObj === null) {
		alert("no vm Can Bind USB\n");
		return;
	}

	var canBundUSBTable = $("#canBind-USB-table");
	for (var i = 0; i < dataObj.length; i++) {
		printCanBindUSBLine(dataObj[i], canBundUSBTable, vmId);
	}
}

function getAllQueryResults() {
	paras = createGetQueryResultsParas(g_current_user_id);
	ajaxPost(API_URL, JSON.stringify(paras), getVmListCallback);
}

function refreshVmList() {

	if (g_refresh_service_id === "" || g_refresh_service_id === null) {
		paras = createGetBindVmsParas(g_current_user_id);
	} else {
		paras = createGetServiceVmListParas(g_refresh_service_id);
	}
	ajaxPost(API_URL, JSON.stringify(paras), refreshVmListCallback);
}

function getCanBindUSB(vmId) {
	var url = URL_GET_VMUSB.replace("__VMID__", vmId) + "?skey=" + API_SKEY;
	ajaxGet(url, null, getVmUSBCallback);
}
//
// This will return an API response Class on success.
//
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

		user = dataObj;

		var bodyStr = "";
		bodyStr += "<tr><th>属性</th><th>内容</th></tr>";
		bodyStr += "<tr><td>名称</td><td>" + user.name + "</td></tr>";
		bodyStr += "<tr><td>状态</td><td>" + user.stateCN + "</td></tr>";
		bodyStr += "<tr><td>ID</td><td>" + user.id + "</td></tr>";
		bodyStr += "<tr><td>Email</td><td>" + user.email + "</td></tr>";
		bodyStr += "<tr><td>UKey</td><td>" + user.ukey + "</td></tr>";
		bodyStr += "<tr><td>电话</td><td>" + user.phone + "</td></tr>";
		bodyStr += "<tr><td>创建时间</td><td>" + user.createTime + "</td></tr>";

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

function bindUSBCallback(resultObj, paras) {
	$("#modalBindUSB").modal("hide");
}

function removeUSB(vmId, usbId) {
	var url = URL_VM_REMOVEUSB.replace("__VMID__", vmId).replace("__USBID__", usbId) + "?skey=" + API_SKEY;
	ajaxPost(url, null, bindUSBCallback, null);
}

function bindUSB(vmId, usbId) {
	var url = URL_VM_BINDUSB.replace("__VMID__", vmId).replace("__USBID__", usbId) + "?skey=" + API_SKEY;
	ajaxPost(url, null, bindUSBCallback, null);
}

function updateVmPassword(vmUuid) {

	var passArray = [];
	var userName = document.getElementById("userName").value;
	passArray.push(document.getElementById("userNewPass").value);
	passArray.push(document.getElementById("userNewPassConfirm").value);

	if (userName === null || userName.length === 0) {
		alert(ERROR_MSG_USER_NAME_NOT_NULL);
		return;
	}
	for (var i = 0; i < passArray.length; i++) {
		if (passArray[i] === null || passArray[i].length === 0) {
			alert(ERROR_MSG_PASS_NOT_SPECIFIED);
			return;
		}
	}
	if (passArray[0] !== passArray[1]) {
		alert("新密码必须与确认密码一致，请重新输入");
		return;
	}

	paras = createSetVmPasswordParas(g_current_user_id, vmUuid, userName,
		new Base64().encode(passArray[0]));

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalVmPassword", errorMsg);
		}
		$("#modalVmPassword").modal("hide");
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

function refreshVmListCallback(resultObj, paras) {

	var apiResponse = doResponseCheck(resultObj);
	if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
		console.log(apiResponse ? apiResponse.getErrorMsg() : "Connect to API server Error to refresh vm list");
		return;
	}

	var dataObj = apiResponse.getDataObj();
	if (dataObj === null) {
		console.log("no user data returned to refresh vm list");
		return;
	}

	count = dataObj.total;

	if (dataObj.hasOwnProperty("vms")) {
		vmList = dataObj.vms;
	} else {
		vmList = dataObj.vmList;
	}

	var vmTable = $("#vm-list-tab");
	var trList = vmTable.children("tbody").children('tr');
	trList.each(function () {

		var $tr = $(this);

		// to skip header
		if ($tr.index() !== 0) {
			updateVmDataObj($tr, vmList);
			var vmObj = $tr.data("vmObj");

			var $vmState = $tr.children(".classVmStata");
			//$vmState[0].style.color = getVmStateColor(vmObj.state);
			$vmState.css({
				"color": getVmStateColor(vmObj.status)
			});
			$vmState.html(vmObj.status);
		}
	});
}

function getSelectedService() {

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

function selectAllServices(checked) {

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

function raiseServicePowerModal() {

	var prompt = "";

	getSelectedService();

	if (g_serviceSelected.length === 0) {
		prompt = "至少选中一个服务！";
		return raiseErrorAlarm(null, prompt);
	} else {
		prompt = "你确定要<span style='color: red; font-size: 120%'> " + servicePowerOperation_d2s(g_power_action) + " </span>如下服务吗？";
		for (var i = 0; i < g_serviceSelected.length; i++) {
			var obj = g_serviceSelected[i];
			prompt += "<br>" + obj.name;
		}
		$("#servicePowerPrompt").html(prompt);
	}

	$("#modalServicePower").modal("show");
}

function servicePowerManage(power) {
	g_power_action = power;
	raiseServicePowerModal();
}

function doServicePowerRequest(service) {
	paras = createServicePowerParas(service.id, g_power_action);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalServicePower", errorMsg);
		}
	});
}

function servicePower() {
	for (var i = 0; i < g_serviceSelected.length; i++) {
		var service = g_serviceSelected[i];
		if (g_power_action === SERVICE_POWER_OFF) {
			if (service.status !== SERVICE_STATE_RUNNING) {
				continue;
			}
		} else 	if (g_power_action === SERVICE_POWER_ON) {
			if (service.status !== SERVICE_STATE_STOPPED) {
				continue;
			}
		}
		doServicePowerRequest(g_serviceSelected[i]);
	}

	$("#modalServicePower").modal("hide");
}

function serviceApply() {
	paras = createGetOfferingParas();

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			errorMsg = apiResponse ? apiResponse.getErrorMsg() : "Connect to API server Error";
			return raiseErrorAlarm(null, errorMsg);
		}

		var dataObj = apiResponse.getDataObj();
		if (dataObj === null) {
			return raiseErrorAlarm(null, "获取规格列表错误！");
		}

		offerings = dataObj.list;

		var bodyStr = "";

		for (i = 0; i < offerings.length; i++) {
			var item = offerings[i];
			bodyStr += "<option value='" + item.id + "'>" + item.name + "</option>";
		}
		$("#serviceOffering").html(bodyStr);

		$("#modalAddService").modal("show");
	})
}

function addService() {

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