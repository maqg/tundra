/**
 * Created by henry on 2015/5/12.
 */

var VMLIST_REFRESH_TIMEOUT = 5000; // 5 seconds
var CDROM_ADD_REFRESH_TIMEOUT = 3000;
var TASK_UPDATE_REFRESH_TIMEOUT = 1000;

var ERROR_MSG_CONN_SERVER = "连接服务器错误";
var ERROR_MSG_NO_DATABODY = "未返回数据部分";
var ERROR_MSG_PASS_NOT_SPECIFIED = "密码不能为空";
var ERROR_MSG_VM_NOT_RUNNING = "虚拟机未运行";
var ERROR_MSG_HARDVIRTUAL_NEED = "只有关机状态下的全虚拟化虚拟机，才能设置CDROM。";
var ERROR_MSG_REBOOT_NEED = "因系统处于运行状态，配置下次关闭，再启动后生效。";
var ERROR_MSG_MUST_WITH_IE = "远程桌面插件只能使用IE浏览器。";
var ERROR_MSG_USER_NAME_NOT_NULL = "用户名不能为空。";

var SERVICE_STATE_REVOKED = "Revoked";
var SERVICE_STATE_STOPPED = "Closed";
var SERVICE_STATE_RUNNING = "Running";
var SERVICE_STATE_REGISTERING = "Registering";
var SERVICE_STATE_REJECTED = "Rejected";
var SERVICE_STATE_ABANDONED = "Abandoned";

var SERVICE_MANAGE_DELETE = "delete";
var SERVICE_MANAGE_RESUME = "resume";
var SERVICE_MANAGE_CANCEL = "cancel";
var SERVICE_MANAGE_ABANDON = "abandon";

var serviceActionList = {
	"delete":  "删除",
	"resume": "恢复",
	"cancel": "撤销",
	"abandon": "放弃"
};

var serviceApiList = {
	"delete":  API_DELETE_SERVICE,
	"resume": API_RESUME_SERVICE,
	"cancel": API_CANCEL_SERVICE,
	"abandon": API_ABANDON_SERVICE
};

function getServiceApi(action) {
	return serviceApiList[action];
}

function getServiceActionStr(action) {
	return serviceActionList[action];
}

var serviceStateListStr = ["Registering", "Closed", "Abandoned", "Running", "Suspended", "Rejected", "Revoked"];
var serviceStateListColorStr = ["black", "red", "gray", "green", "#f0f040", "#f04040", "grey"];

function getServicetateColor(state) {
	index = serviceStateListStr.indexOf(state);
	return serviceStateListColorStr[index];
}

var stateListStr = ["已失效", "正常"];

function userState_d2s(state) {
	if (state >= stateListStr.length) {
		return stateListStr[0];
	} else {
		return stateListStr[state];
	}
}

Array.prototype.indexOf = function (e) {
	for (var i = 0, j; j = this[i]; i++) {
		if (j === e) {
			return i;
		}
	}
	return 0;
};

Array.prototype.lastIndexOf = function (e) {
	for (var i = this.length - 1, j; j = this[i]; i--) {
		if (j === e) {
			return i;
		}
	}
	return -1;
};

function userState_s2d(state) {
	return stateListStr.indexOf(state);
}

var vmStateListStrCN = ["关闭", "暂停", "运行", "挂起", "崩溃", "未知"];
var vmStateListStr = ["Stopped", "Paused", "Running", "Suspended", "Crashed", "Unknown"];
var vmStateListColorStr = ["red", "greenyellow", "green", "#f0f040", "#f04040", "grey"];

var VM_STATE_RUNNING = "Running";
var VM_STATE_CLOSED = "Stopped";

function getVmStateColor(state) {
	index = vmStateListStr.indexOf(state);
	return vmStateListColorStr[index];
}

function getStatusColor(status) {
	if (status === "Enabled") {
		return "green";
	} else {
		return "red";
	}
}

var dcListStr = ["任意", "Default", "北京", "上海"];

function dc_s2d(dc) {
	return dcListStr.indexOf(dc);
}

function dc_d2s(dc) {
	if (dc >= dcListStr.length) {
		return dcListStr[0];
	} else {
		return dcListStr[dc];
	}
}

var SERVICE_POWER_ON = "start";
var SERVICE_POWER_OFF = "shutdown";

var servicePowerOperaionsStr = {
	"shutdown": "关闭",
	"start": "启动"
};

function servicePowerOperation_d2s(operation) {
	return servicePowerOperaionsStr[operation];
}


var VM_POWER_FORCEOFF = "forceshutdown";
var VM_POWER_OFF = "shutdown";
var VM_POWER_SUSPEND = "suspend";
var VM_POWER_FORCEREBOOT = "forcerestart";
var VM_POWER_REBOOT = "restart";
var VM_POWER_UNSUSPEND = "unsuspend";
var VM_POWER_ON = "start";
var VM_POWER_PAUSE = "pause";
var VM_POWER_UNPAUSE = "unpause";

var vmPowerOperaionsStr = {
	"forceshutdown": "强制关闭",
	"shutdown": "关闭",
	"suspend": "挂起",
	"forcerestart": "强制重启",
	"restart": "重启",
	"unsuspend": "恢复",
	"start": "启动",
	"pause": "暂停",
	"unpause": "解除暂停"
};

function vmPowerOperation_s2d(operation) {
	return vmPowerOperaionsStr.indexOf(operation);
}

function vmPowerOperation_d2s(operation) {
	return vmPowerOperaionsStr[operation];
}

var vmPowerPromptMsg = [];
function getVmPowerPromptMsg(opertaion) {
	if (opertaion >= vmPowerPromptMsg.length) {
		return vmPowerPromptMsg[0];
	} else {
		return vmPowerPromptMsg[opertaion];
	}
}

var virtualTypeStr = ["半虚拟化", "全虚拟化", "未知"];

function virtualType_s2d(type) {
	return vmStateListStr.indexOf(type);
}

function virtualType_d2s(type) {
	if (type >= virtualTypeStr.length) {
		return virtualTypeStr[0];
	} else {
		return virtualTypeStr[type];
	}
}

function isIsoSelected(incommingId, oldId) {
	return incommingId === oldId;
}

/******
 c disk
 d cdrom
 n network
 **/
function getBootLoaderStr(bootArgs) {
	var bootArgsStr = "";

	for (var i = 0; i < bootArgs.length; i++) {

		if (bootArgs[i] === "c") {
			bootArgsStr += "硬盘";
		} else if (bootArgs[i] === "d") {
			bootArgsStr += "光驱";
		} else if (bootArgs[i] === "n") {
			bootArgsStr += "网络";
		}

		if (i !== bootArgs.length - 1) {
			bootArgsStr += "，";
		}
	}

	return bootArgsStr;
}

var bootOptionStrList = ["无", "硬盘", "光驱", "网络"];
function bootOption_d2s(index) {
	if (index >= bootOptionStrList.length) {
		return bootOptionStrList[0];
	} else {
		return bootOptionStrList[index];
	}
}

function bootOption_s2d(option) {
	var index = bootOptionStrList.indexOf(option);
	if (index === 0 || index === -1) {
		return "";
	}
	var bootArgs = "cdn";

	return bootArgs[index - 1];
}

function bootOption_c2s(option) {
	if (option === "c") {
		return "硬盘";
	} else if (option === "d") {
		return "光驱";
	} else if (option === "n") {
		return "网络";
	} else {
		return "无";
	}
}

function getBoodOption(bootArgs, index) {
	if (bootArgs.length - 1 < index) {
		return "无";
	}
	return bootOption_c2s(bootArgs[index]);
}

function getFirstBootOption(bootArgs) {
	return getBoodOption(bootArgs, 0);
}

function getSecondBootOption(bootArgs) {
	return getBoodOption(bootArgs, 1);
}

function getThirdBootOption(bootArgs) {
	return getBoodOption(bootArgs, 2);
}

function getSelectedOption(id) {
	return $(id + " option:selected").val();
}

function getFirstSelectedOption() {
	return getSelectedOption("#vmBootLoaderFirst");
}

function getSecondSelectedOption() {
	return getSelectedOption("#vmBootLoaderSecond");
}

function getThirdSelectedOption() {
	return getSelectedOption("#vmBootLoaderThird");
}

var TASK_STATE_CREATED = 0;
var TASK_STATE_RUNNING = 1;
var TASK_STATE_FINISHED = 2;
var TASK_STATE_ERROR = 3;

var taskStateStrList = ["新建", "运行中", "完成", "运行出错"];
function taskState_s2d(state) {
	return taskStateStrList.indexOf(state);
}

function taskState_d2s(state) {
	if (state >= taskStateStrList.length) {
		return taskStateStrList[0];
	} else {
		return taskStateStrList[state];
	}
}

function RDPConnect(vm) {
	url = "/userportal/vdu/?vdid=" + vm.id;
	window.open(url, "RDP_" + vm.name, "top=0, left=0, resizable=no, toolbar=no, alwaysRaised=yes, depended=no, menubar=no, scrollbars=no, location=no, status=no");
}

function parseSize(size) {

	Ms = parseInt(size / 1024 / 1024);
	if (Ms < 1024) {
		return Ms + " M";
	}

	return parseInt(Ms / 1024) + " G";
}