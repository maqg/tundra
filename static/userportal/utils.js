/**
 * Created by henry on 2015/5/12.
 */

var ERROR_MSG_CONN_SERVER = "连接服务器错误";
var ERROR_MSG_NO_DATABODY = "未返回数据部分";
var ERROR_MSG_PASS_NOT_SPECIFIED = "密码不能为空";
var ERROR_MSG_USER_NAME_NOT_NULL = "用户名不能为空。";

function getServiceApi(action) {
	return serviceApiList[action];
}

function getServiceActionStr(action) {
	return serviceActionList[action];
}

function getSelectedOption(id) {
    return $(id + " option:selected").val();
}

var productStateListStr = ["Disabled", "Closed", "Enabled", "Ready"];
var productStateListColorStr = ["red", "red", "green", "green"];

function getProductStateColor(state) {
	index = productStateListStr.indexOf(state);
	return productStateListColorStr[index];
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