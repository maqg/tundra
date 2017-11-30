/**
 * Created by henry on 2015/5/12.
 */

var ERROR_MSG_CONN_SERVER = "连接服务器错误";
var ERROR_MSG_NO_DATABODY = "未返回数据部分";
var ERROR_MSG_PASS_NOT_SPECIFIED = "密码不能为空";
var ERROR_MSG_VM_NOT_RUNNING = "虚拟机未运行";
var ERROR_MSG_HARDVIRTUAL_NEED = "只有关机状态下的全虚拟化虚拟机，才能设置CDROM。";
var ERROR_MSG_REBOOT_NEED = "因系统处于运行状态，配置下次关闭，再启动后生效。";
var ERROR_MSG_MUST_WITH_IE = "远程桌面插件只能使用IE浏览器。";
var ERROR_MSG_USER_NAME_NOT_NULL = "用户名不能为空。";

function getServiceApi(action) {
	return serviceApiList[action];
}

function getServiceActionStr(action) {
	return serviceActionList[action];
}

var productStateListStr = ["Disabled", "Closed", "Enabled", "Ready"];
var productStateListColorStr = ["red", "red", "green", "green"];

function getProductStateColor(state) {
	index = productStateListStr.indexOf(state);
	return productStateListColorStr[index];
}

var stateListStr = ["已失效", "正常"];

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

function getStatusColor(status) {
	if (status === "Enabled") {
		return "green";
	} else {
		return "red";
	}
}

function parseSize(size) {

	Ms = parseInt(size / 1024 / 1024);
	if (Ms < 1024) {
		return Ms + " M";
	}

	return parseInt(Ms / 1024) + " G";
}