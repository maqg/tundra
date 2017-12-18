var g_userInfo;

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

function raisePricingPriceDetail(item) {

	$detailBody = $("#pricingDetailBody");

	var bodyStr = "";

	bodyStr += "<table class=\"table table-striped table-hover\">";
	bodyStr += "<tr><th>类型</th><th>名称</th><th>数量</th><th>容量</th><th>单价</th><th>总价</th></tr>";

	for (var i = 0; i < item.info.items.length; i++) {
		product = item.info.items[i];
		bodyStr += "<tr><td>" + product.typeName + "</td>";
		bodyStr += "<td>" + product.name + "</td>";
		bodyStr += "<td>" + product.count + "</td>";
		if (product.hasOwnProperty("capacity") && product.capacity !== 0 && product.type !== PRODUCT_TYPE_MONITOR) {
			bodyStr += "<td>" + product.count * product.capacity + "</td>";
		} else {
			bodyStr += "<td>" + "N/A" + "</td>";
		}
		bodyStr += "<td>" + product.price + "</td>";
		bodyStr += "<td>" + product.totalPrice + "</td></tr>";
	}
	bodyStr += "<div style='position: absolute; color: red; bottom: 15px; right: 15px;'>总价：" + item.info.price + "</div>";

	$detailBody.html(bodyStr);

	// to modify lable
	$lable = $("#modalPricingDetailLabel");
	if ($lable !== null) {
		$lable.html("价格明细-" + item.name);
	}

	$("#modalPricingDetail").modal("show");
}

function parsePoints(item) {
	if (item.hasOwnProperty("points") && item.points !== 0) {
		return item.points;
	} else {
		return "N/A";
	}
}

function raisePricingDetail(item) {

	$detailBody = $("#pricingDetailBody");

	var bodyStr = "";

	bodyStr += "<table class=\"table table-striped table-hover\">";
	bodyStr += "<tr><th>属性</th><th>内容</th></tr>";
	bodyStr += "<tr><td>名称</td><td>" + item.name + "</td></tr>";
	bodyStr += "<tr><td>UUID</td><td style='font-family: Consolas'>" + item.id + "</td></tr>";
	bodyStr += "<tr><td>类型</td><td>" + item.typeCN + "</td></tr>";
	bodyStr += "<tr><td>点位数</td><td>" + parsePoints(item) + "</td></tr>";
	bodyStr += "<tr><td>总价</td><td style='color: red'>" + item.price + "</td></tr>";
	bodyStr += "<tr><td>报价小结</td><td>" + printPricingSummary(item.info) + "</td></tr>";
	bodyStr += "<tr><td>创建时间</td><td>" + item.createTime + "</td></tr>";
	bodyStr += "<tr><td>描述</td><td>" + item.desc + "</td></tr>";

	$detailBody.html(bodyStr);

	// to modify lable
	$lable = $("#modalPricingDetailLabel");
	if ($lable !== null) {
		$lable.html("报价详细-" + item.name);
	}

	$("#modalPricingDetail").modal("show");
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

function exportPricing(pricing, aLink) {

	var str = "名称:" + pricing.name + "\n";
	str += "总价:" + pricing.price + "\n";
	str += "点位数:" + pricing.points + "\n\n";


	str += "产品类型,名称,单价,容量,数量,总价\n";

	for (var i = 0; i < pricing.info.items.length; i++) {

		item = pricing.info.items[i];

		str += item.typeName + "," + item.name + "," + item.price + ",";

		if (item.hasOwnProperty("capacity") && item.capacity !== 0 && item.type !== PRODUCT_TYPE_MONITOR) {
			str += item.count * item.capacity + ",";
		} else {
			str += "N/A,"
		}
		str	+= item.count + "," + item.totalPrice + "\n";
	}

	str = encodeURIComponent(str);
	aLink.href = "data:text/csv;charset=utf-8,\ufeff" + str;
	aLink.download = pricing.name + "-pricing.csv";

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
					raisePricingDelete($tr.data("dataObj"));
				});
			}

			var $cancel = $tr.children(".manager").children(".detailpricingbutton");
			if ($cancel !== null) {
				$cancel.click(function () {
					raisePricingPriceDetail($tr.data("dataObj"));
				});
			}

			var $resume = $tr.children(".manager").children(".exportpricingbutton");
			if ($resume !== null) {
				$resume.click(function () {
					exportPricing($tr.data("dataObj"), this);
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

function pricingRemove() {

	item = $("#modalPricingManage").data("dataObj");

	paras = createPricingRemoveParas(item.id);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm("#modalPricingManage", errorMsg);
		}
		$("#modalPricingManage").modal("hide");
		switchToPricingPage();
	});
}

function productRemove() {

	item = $("#modalProductRemove").data("dataObj");

	paras = createProductRemoveParas(item.id);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse === null ? ERROR_MSG_CONN_SERVER : apiResponse.getErrorMsg();
			return raiseErrorAlarm("#modalProductRemove", errorMsg);
		}
		$("#modalProductRemove").modal("hide");
		refreshProductPage();
	});
}

function raisePricingDelete(item) {
	var prompt = "你确定要<span style='color: red; font-size: 120%'>删除</span>如下报价结果吗？</br>";
	prompt += item.name;
	$("#modalPricingManagePrompt").html(prompt);
	$("#modalPricingManage").data("dataObj", item);
	$("#modalPricingManage").modal("show");
}

function raiseProductDelete(item) {
	var prompt = "你确定要<span style='color: red; font-size: 120%'>删除</span>如下产品吗？</br>";
	prompt += item.name;
	$("#modalProductManagePrompt").html(prompt);
	$("#modalProductRemove").data("dataObj", item);
	$("#modalProductRemove").modal("show");
}

function updateProductPrice() {
	var paras;
	item = g_product;

	if (item.type !== PRODUCT_TYPE_SOFTWARE) {
		price = document.getElementById("productPricePrice").value;
		costPrice = document.getElementById("productPriceCostPrice").value;
		paras = createUpdateProductPriceParas(g_product.id, price, costPrice, 0, 0, 0, 0);
	} else {
		base = document.getElementById("productPriceBasePrice").value;
		host = document.getElementById("productPriceHostPrice").value;
		point = document.getElementById("productPricePointPrice").value;
		cpu = document.getElementById("productPriceCpuPrice").value;
		paras = createUpdateProductPriceParas(g_product.id, 0, 0, base, host, point, cpu);
	}

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalEditProductPrice", errorMsg);
		}
		$("#modalEditProductPrice").modal("hide");

		refreshProductPage();
	});
}

function createProductPriceForm(item) {

	$str = "<form class='form-horizontal' role='form'>";

	$str += "<div class='form-group'>";
	$str += "<label class='col-sm-2 control-label'>产品名称</label>";
	$str += "<div class='col-sm-10'>";
	$str += "<input type='text' class='form-control disabled' id='productPriceName' value='"
		+ item.name + "' placeholder='产品名称' disabled></div></div>";
	if (item.type !== PRODUCT_TYPE_SOFTWARE) {
		$str += "<div class='form-group'><label class='col-sm-2 control-label'>报价</label>";
		$str += "<div class='col-sm-10'>";
		$str += "<input type='text' class='form-control disabled' id='productPricePrice' value='"
			+  item.infoObj.price + "' placeholder='报价'></div></div>";

		$str += "<div class='form-group'><label class='col-sm-2 control-label'>成本价</label>";
		$str += "<div class='col-sm-10'>";
		$str += "<input type='text' class='form-control disabled' id='productPriceCostPrice' value='"
			+  item.infoObj.costPrice + "' placeholder='成本价'></div></div>";
	} else {
		$str += "<div class='form-group'><label class='col-sm-2 control-label'>基础平台</label>";
		$str += "<div class='col-sm-10'>";
		$str += "<input type='text' class='form-control disabled' id='productPriceBasePrice' value='"
			+ item.infoObj.basePrice + "' placeholder='0'></div></div>";

		$str += "<div class='form-group'><label class='col-sm-2 control-label'>物理主机</label>";
		$str += "<div class='col-sm-10'>";
		$str += "<input type='text' class='form-control disabled' id='productPriceHostPrice' value='"
			+ item.infoObj.hostPrice + "' placeholder='0'></div></div>";

		$str += "<div class='form-group'><label class='col-sm-2 control-label'>每点位</label>";
		$str += "<div class='col-sm-10'>";
		$str += "<input type='text' class='form-control disabled' id='productPricePointPrice' value='"
			+ item.infoObj.pointPrice + "' placeholder='0'></div></div>";

		$str += "<div class='form-group'><label class='col-sm-2 control-label'>每CPU</label>";
		$str += "<div class='col-sm-10'>";
		$str += "<input type='text' class='form-control disabled' id='productPriceCpuPrice' value='"
			+  item.infoObj.cpuPrice + "' placeholder='0'></div></div>";
	}

	// bootom
	$str += "<div class='modal-footer'>";
	$str += "<button type='button' class='btn btn-primary' onclick='updateProductPrice();'>确定</button>";
	$str += "<button type='button' class='btn btn-default' data-dismiss='modal'>取消</button>";
	$str += "</div></form>";

	return $str;
}

function raiseProductPriceUpdate(item) {
	$str = createProductPriceForm(item);
	$("#productPriceFormBody").html($str);
	g_product = item;
	$("#modalEditProductPrice").modal("show");
}

function raiseProductUpdate(item) {
	document.getElementById("productName").value = item.name;
	document.getElementById("productDesc").value = item.desc;
	document.getElementById("productState").value = item.state;
	g_product = item;
	if (item.type === PRODUCT_TYPE_CPU || item.type === PRODUCT_TYPE_MEMORY
		|| item.type === PRODUCT_TYPE_DISK || item.type === PRODUCT_TYPE_SWITCH
		|| item.type === PRODUCT_TYPE_WIFIROUTER) {
		document.getElementById("productCapacityDiv").style.display = "block";
		document.getElementById("productCapacity").value = item.infoObj.capacity;
	} else {
		document.getElementById("productCapacityDiv").style.display = "none";
	}
	$("#modalEditProduct").modal("show");
}

function updateProduct() {

	var name = document.getElementById("productName").value;
	var state = document.getElementById("productState").value;
	var capacity = document.getElementById("productCapacity").value;
	var desc = document.getElementById("productDesc").value;

	paras = createUpdateProductParas(g_product.id, name, state, capacity, desc);

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalEditProduct", errorMsg);
		}
		$("#modalEditProduct").modal("hide");

		refreshProductPage();
	});
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
		$str += "<br>容量/尺寸：" + infoObj.capacity + "G/寸";
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

	if (infoObj.hasOwnProperty("price") && infoObj.price !== 0) {
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

function parseProductCostPrice(infoObj) {
	if (infoObj.hasOwnProperty("costPrice") && infoObj.costPrice !== 0) {
		return infoObj.costPrice;
	} else {
		return "N/A";
	}
}

function raiseProductDetail(item) {

	$detailTable = $("#appDetailBody");

	var bodyStr = "";

	bodyStr += "<tr><th style='width: 20%;'>属性</th>";
	bodyStr += "<th>内容</th></tr>";

	bodyStr += "<tr><td>名称</td><td>" + item.name + "</td></tr>";
	bodyStr += "<tr><td>单价</td><td style='color: red'>" + parseProductPrice(item.infoObj) + "</td></tr>";
	bodyStr += "<tr><td>成本价</td><td style='color: green'>" + parseProductCostPrice(item.infoObj) + "</td></tr>";
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

var g_product = null;

function printPricingSummary(info) {
	$str = "";
	for (var i = 0; i < info.items.length; i++) {
		item = info.items[i];
		if (i !== 0) {
			$str += "<br>";
		}
		$str += item.typeName + "：" + item.name + "<br>价格：" + item.price + " * " + item.count + " = " + item.totalPrice;
		if (item.hasOwnProperty("capacity") && item.capacity !== 0 && item.type !== PRODUCT_TYPE_MONITOR) {
			$str += "，容量：" + item.capacity + " * " + item.count + " = " + (item.count * item.capacity);
		}
	}

	return $str;
}

function printPricingSummarySimle(info) {
	$str = "";
	for (var i = 0; i < info.items.length; i++) {
		item = info.items[i];
		if (i !== 0) {
			$str += "<br>";
		}
		$str += item.typeName + "：" + item.price + " * " + item.count + " = " + item.totalPrice;
	}

	return $str;
}

function printPricingLine(item, vmTable) {

	var vmItem = "";

	vmItem += "<tr>";
	vmItem += "<td> <input type=\"checkbox\" name=\"vmListItems\" style='width: 20px; height: 20px'> </td>";
	vmItem += "<td>" + item.name +"</a></td>";
	vmItem += "<td style='color: blue'>" + item.points + "</td>";
	vmItem += "<td style='color: red'>" + item.price + "</td>";
	vmItem += "<td>" + printPricingSummarySimle(item.info) + "</td>";
	vmItem += "<td>" + item.createTime + "</td>";

	vmItem += "<td class='manager'>";
	vmItem += "<span class='detailpricingbutton commonbutton operationButton'>报价明细</span>";
	vmItem += "<a download='pricing.csv' class='exportpricingbutton commonbutton operationButton'>导出</a>";
	vmItem += "<span class='deletepricingbutton commonbutton operationButton'>删除</span>";
	vmItem += "</td></tr>";

	var $tr = $(vmItem);
	$tr.data("dataObj", item);

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
					raiseProductDelete($tr.data("dataObj"));
				});
			}

			var $cancel = $tr.children(".manager").children(".productupdatebutton");
			if ($cancel !== null) {
				$cancel.click(function () {
					raiseProductUpdate($tr.data("dataObj"));
				});
			}

			var $resume = $tr.children(".manager").children(".productpricebutton");
			if ($resume !== null) {
				$resume.click(function () {
					raiseProductPriceUpdate($tr.data("dataObj"));
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
	ajaxPost(API_URL, JSON.stringify(createGetProductsParas(type, "")), getProductsCallback);
}

function getAllQueryResults(type, date, keyword) {
	paras = createGetQueryResultsParas(type, date, keyword);
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
	var name = document.getElementById("productAddName").value;
	var type = document.getElementById("productAddType").value;
	var desc = document.getElementById("productAddDesc").value;

	var code = document.getElementById("productAddCode").value;
	var model = document.getElementById("productAddModel").value;
	var price = document.getElementById("productAddPrice").value;
	var costPrice = document.getElementById("productAddCostPrice").value;

	var capacity = document.getElementById("productAddCapacity").value;
	var provider = document.getElementById("productAddProvider").value;

	var frequency = document.getElementById("productAddFrequency").value;
	var cores = document.getElementById("productAddCores").value;
	var threads = document.getElementById("productAddThreads").value;

	paras = createAddProductParas(type, name, code, model, price, costPrice, capacity, frequency, cores,
		threads, provider, desc);
	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalAddProduct", errorMsg);
		}
		$("#modalAddProduct").modal("hide");

		$("#producttype").val(getSelectedAddProductType());

		refreshProductPage();

	});
}

function raiseProductAdd() {
	updateAddProductTypes();
}

function makeThinClientPricingParas() {
	var name = document.getElementById("pricingAddName").value;
	var points = document.getElementById("pricingAddPoints").value;
	var thinclient = document.getElementById("pricingAddThinClient").value;
	var monitor = document.getElementById("pricingAddMonitor").value;
	var keymouse = document.getElementById("pricingAddKeyMouse").value;
	var thinclientCount = document.getElementById("pricingAddThinClientCount").value;
	var monitorCount = document.getElementById("pricingAddMonitorCount").value;
	var keymouseCount = document.getElementById("pricingAddKeyMouseCount").value;
	var service = document.getElementById("pricingAddService").value;
	var desc = document.getElementById("pricingAddDesc").value;

	return createAddPricingThinClientParas(name, points, thinclient, thinclientCount, monitor, monitorCount, keymouse, keymouseCount, service, desc);
}

function makeServerPricingParas() {
	var name = document.getElementById("pricingAddName").value;
	var points = document.getElementById("pricingAddHostCount").value;
	var infra = document.getElementById("pricingAddInfrastructure").value;
	var cpu = document.getElementById("pricingAddCpu").value;
	var cpuCount = document.getElementById("pricingAddCpuCount").value;
	var memory = document.getElementById("pricingAddMemory").value;
	var memoryCount = document.getElementById("pricingAddMemoryCount").value;
	var disk = document.getElementById("pricingAddDisk").value;
	var diskCount = document.getElementById("pricingAddDiskCount").value;
	var raid = document.getElementById("pricingAddRaid").value;
	var service = document.getElementById("pricingAddService").value;
	var desc = document.getElementById("pricingAddDesc").value;

	return createAddPricingServerParas(name, points, infra, cpu, cpuCount,
		memory, memoryCount, disk, diskCount, raid, service, desc);
}

function makePlatformSoftPricingParas() {
	var name = document.getElementById("pricingAddName").value;
	var hostCount = document.getElementById("pricingAddHostCount").value;
	var cpuCount = document.getElementById("pricingAddCpuCount1").value;
	var service = document.getElementById("pricingAddService").value;
	var desc = document.getElementById("pricingAddDesc").value;

	return createAddPricingPlatformSoftParas(name, hostCount, cpuCount, service, desc);
}

function makeDeskSoftPricingParas() {
	var name = document.getElementById("pricingAddName").value;
	var points = document.getElementById("pricingAddPoints").value;
	var desc = document.getElementById("pricingAddDesc").value;
	var service = document.getElementById("pricingAddService").value;
	return createAddPricingDeskSoftParas(name, points, service, desc);
}

function makeClassSoftPricingParas() {
	var name = document.getElementById("pricingAddName").value;
	var points = document.getElementById("pricingAddPoints").value;
	var desc = document.getElementById("pricingAddDesc").value;
	var service = document.getElementById("pricingAddService").value;
	return createAddPricingClassSoftParas(name, points, service, desc);
}

function mekeDeskPricingParas() {

	var name = document.getElementById("pricingAddName").value;
	var points = document.getElementById("pricingAddPoints").value;
	var pointCpu = document.getElementById("pricingAddPointCpu").value;
	var pointMemory = document.getElementById("pricingAddPointMemory").value;
	var pointDisk = document.getElementById("pricingAddPointDisk").value;

	var infra = document.getElementById("pricingAddInfrastructure").value;
	var infraCount = document.getElementById("pricingAddInfrastructureCount").value;

	var cpu = document.getElementById("pricingAddCpu").value;
	var cpuCount = document.getElementById("pricingAddCpuCount").value;

	var memory = document.getElementById("pricingAddMemory").value;
	var memoryCount = document.getElementById("pricingAddMemoryCount").value;

	var disk = document.getElementById("pricingAddDisk").value;
	var diskCount = document.getElementById("pricingAddDiskCount").value;

	var raid = document.getElementById("pricingAddRaid").value;
	var thinClient = document.getElementById("pricingAddThinClient").value;
	var keyMouse = document.getElementById("pricingAddKeyMouse").value;
	var monitor = document.getElementById("pricingAddMonitor").value;
	var thinClientCount = document.getElementById("pricingAddThinClientCount").value;
	var keyMouseCount = document.getElementById("pricingAddKeyMouseCount").value;
	var monitorCount = document.getElementById("pricingAddMonitorCount").value;

	var switches = document.getElementById("pricingAddSwitch").value;
	var switchCount = document.getElementById("pricingAddSwitchCount").value;
	var wifiRouter = document.getElementById("pricingAddWifiRouter").value;
	var wifiRouterCount = document.getElementById("pricingAddWifiRouterCount").value;

	var service = document.getElementById("pricingAddService").value;
	var desc = document.getElementById("pricingAddDesc").value;

	if (pricingType === PRICING_TYPE_OCTDESK) {
		var ukey = document.getElementById("pricingAddUkey").value;
		var ukeyCount = document.getElementById("pricingAddUkeyCount").value;
		return createAddPricingDeskParas(name, points, pointCpu, pointMemory, pointDisk,
			infra, infraCount, cpu,cpuCount, memory, memoryCount, disk, diskCount,
			raid, thinClient, thinClientCount, monitor, monitorCount, keyMouse, keyMouseCount,
			switches, switchCount, wifiRouter, wifiRouterCount, ukey, ukeyCount, service, desc);
	} else {
		return createAddPricingClassParas(name, points, infra, infraCount, cpu,
			cpuCount, memory, memoryCount, disk, diskCount, raid,
			thinClient, thinClientCount, monitor, monitorCount, keyMouse, keyMouseCount,
			switches, switchCount, wifiRouter, wifiRouterCount, service, desc);
	}
}

function addPricing() {
	var paras;

	pricingType = getSelectedPricingAddType();
	if (pricingType === PRICING_TYPE_THINCLIENT) {
		paras = makeThinClientPricingParas();
	} else if (pricingType === PRICING_TYPE_SERVER) {
		paras = makeServerPricingParas();
	} else if (pricingType === PRICING_TYPE_PLATFORM_SOFT) {
		paras = makePlatformSoftPricingParas();
	} else if (pricingType === PRICING_TYPE_OCTDESK_SOFT) {
		paras = makeDeskSoftPricingParas();
	} else if (pricingType === PRICING_TYPE_OCTCLASS_SOFT) {
		paras = makeClassSoftPricingParas();
	} else if (pricingType === PRICING_TYPE_OCTDESK || pricingType === PRICING_TYPE_OCTCLASS) {
		paras = mekeDeskPricingParas();
	}

	ajaxPost(API_URL, JSON.stringify(paras), function (resultObj) {
		var apiResponse = doResponseCheck(resultObj);
		if (apiResponse === null || apiResponse.getErrorCode() !== 0) {
			var errorMsg = apiResponse !== null ? apiResponse.getErrorMsg() : ERROR_MSG_CONN_SERVER;
			return raiseErrorAlarm("#modalAddPricing", errorMsg);
		}
		$("#modalAddPricing").modal("hide");

		$("#pricingtype").val(getSelectedPricingAddType());

		switchToPricingPage();
	});
}

function updatePricingMonitor() {

	var stype = $("#pricingAddThinClient option:selected").attr("stype");

	if (stype === PRODUCT_TYPE_ALLINONE) {
		document.getElementById("pricingAddMonitorDiv").style.display = "none";
	} else {
		document.getElementById("pricingAddMonitorDiv").style.display = "block";
	}

	updateAddThinClientCount();

}

g_products = {};

g_fill_options = [
	{
		"type": "ALLINONE",
		"realType": "THINCLIENT",
		"id": "#pricingAddThinClient"
	},
	{
		"type": "THINCLIENT",
		"id": "#pricingAddThinClient"
	},
	{
		"type": "MONITOR",
		"id": "#pricingAddMonitor"
	},
	{
		"type": "KEYMOUSE",
		"id": "#pricingAddKeyMouse"
	},
	{
		"type": "CPU",
		"id": "#pricingAddCpu"
	},
	{
		"type": "DISK",
		"id": "#pricingAddDisk"
	},
	{
		"type": "MEMORY",
		"id": "#pricingAddMemory"
	},
	{
		"type": "INFRASTRUCTURE",
		"id": "#pricingAddInfrastructure"
	},
	{
		"type": "RAID",
		"id": "#pricingAddRaid"
	},
	{
		"type": "WIFIROUTER",
		"id": "#pricingAddWifiRouter"
	},
	{
		"type": "SWITCH",
		"id": "#pricingAddSwitch"
	},
	{
		"type": "UKEY",
		"id": "#pricingAddUkey"
	},
	{
		"type": "SERVICE",
		"id": "#pricingAddService"
	}
];

function fillSelectOption(option) {

	$str = "<option value='' selected>不使用</option>";

	for (var i = 0; i < g_products[option.type].length; i++) {
		item = g_products[option.type][i];
		if (item.infoObj.hasOwnProperty("capacity")) {
			$str += "<option capacity='" + item.infoObj.capacity + "' stype='" + item.realType + "' value='" + item.id + "'>" + item.name + "，价格：" + item.infoObj.price + "</option>";
		} else {
			$str += "<option stype='" + item.realType + "' value='" + item.id + "'>" + item.name + "，价格：" + item.infoObj.price + "</option>";
		}
	}
	$(option.id).html($str);
}

function parseProductsCallback(resultObj, paras) {

	var i = 0;

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

	g_products = [];

	for (i = 0; i < dataObj.items.length; i++) {
		item = dataObj.items[i];
		if (item.type === PRODUCT_TYPE_ALLINONE) {
			item.type = PRODUCT_TYPE_THINCIENT;
			item["realType"] = PRODUCT_TYPE_ALLINONE;
		} else {
			item["realType"] = item.type;
		}
		if (g_products.hasOwnProperty(item.type)) {
			g_products[item.type].push(item);
		} else {
			g_products[item.type] = [];
			g_products[item.type].push(item);
		}
	}

	for (i = 0; i < g_fill_options.length; i++) {
		var option = g_fill_options[i];
		if (option.type !== PRODUCT_TYPE_ALLINONE) {
			fillSelectOption(option);
		}
	}

	$("#pricingAddType").val(getSelectedPricingType());

	updatePricingAddForm();

	$("#modalAddPricing").modal("show");
}

function initPricingForms() {

	document.getElementById("pricingAddTypeDiv").style.display = "block";
	document.getElementById("pricingAddNameDiv").style.display = "block";
	document.getElementById("pricingAddServiceDiv").style.display = "block";
	document.getElementById("pricingAddDescDiv").style.display = "block";

	document.getElementById("pricingAddPointsDiv").style.display = "none";
	document.getElementById("pricingAddThinClientDiv").style.display = "none";
	document.getElementById("pricingAddMonitorDiv").style.display = "none";
	document.getElementById("pricingAddKeyMouseDiv").style.display = "none";
	document.getElementById("pricingAddCpuDiv").style.display = "none";
	document.getElementById("pricingAddMemoryDiv").style.display = "none";
	document.getElementById("pricingAddDiskDiv").style.display = "none";
	document.getElementById("pricingAddRaidDiv").style.display = "none";
	document.getElementById("pricingAddInfrastructureDiv").style.display = "none";
	document.getElementById("pricingAddHostCountDiv").style.display = "none";
	document.getElementById("pricingAddCpuCountDiv1").style.display = "none";

	document.getElementById("pricingAddWifiRouterDiv").style.display = "none";
	document.getElementById("pricingAddSwitchDiv").style.display = "none";
	document.getElementById("pricingAddUkeyDiv").style.display = "none";

	document.getElementById("pricingAddPointCpuDiv").style.display = "none";
	document.getElementById("pricingAddPointMemoryDiv").style.display = "none";
	document.getElementById("pricingAddPointDiskDiv").style.display = "none";

	document.getElementById("pricingNextButton").style.display = "none";
	document.getElementById("pricingButton").style.display = "inline-block";

	document.getElementById("pricingAddInfrastructureCount").value = 0;
	document.getElementById("pricingAddCpuCount").value = "";
	document.getElementById("pricingAddMemoryCount").value = "";
	document.getElementById("pricingAddDiskCount").value = "";
	document.getElementById("pricingAddSwitchCount").value = "";
	document.getElementById("pricingAddWifiRouterCount").value = "";

	document.getElementById("pricingAddPointCpu").value = "";
	document.getElementById("pricingAddPointMemory").value = "";
	document.getElementById("pricingAddPointDisk").value = "";
}

g_pricing_step = "step1";

function updatePricingAddForm() {

	initPricingForms();

	pricingType = getSelectedPricingAddType();
	if (pricingType === PRICING_TYPE_THINCLIENT) {
		document.getElementById("pricingAddPointsDiv").style.display = "block";
		document.getElementById("pricingAddThinClientDiv").style.display = "block";
		document.getElementById("pricingAddMonitorDiv").style.display = "block";
		document.getElementById("pricingAddKeyMouseDiv").style.display = "block";
	} else if (pricingType === PRICING_TYPE_SERVER) {
		document.getElementById("pricingAddHostCountDiv").style.display = "block";
		document.getElementById("pricingAddCpuDiv").style.display = "block";
		document.getElementById("pricingAddMemoryDiv").style.display = "block";
		document.getElementById("pricingAddDiskDiv").style.display = "block";
		document.getElementById("pricingAddRaidDiv").style.display = "block";
		document.getElementById("pricingAddInfrastructureDiv").style.display = "block";
		document.getElementById("pricingAddInfrastructureCountDiv").style.display = "none";
	} else if (pricingType === PRICING_TYPE_PLATFORM_SOFT) {
		document.getElementById("pricingAddHostCountDiv").style.display = "block";
		document.getElementById("pricingAddCpuCountDiv1").style.display = "block";
	} else if (pricingType === PRICING_TYPE_OCTDESK_SOFT || pricingType === PRICING_TYPE_OCTCLASS_SOFT) {
		document.getElementById("pricingAddPointsDiv").style.display = "block";
	} else if (pricingType === PRICING_TYPE_OCTDESK || pricingType === PRICING_TYPE_OCTCLASS) {
		document.getElementById("pricingNextButton").style.display = "inline-block";
		document.getElementById("pricingButton").style.display = "none";
		g_pricing_step = "step1";
		$("#pricingNextButton").html("下一步");

		document.getElementById("pricingAddDescDiv").style.display = "none";
		document.getElementById("pricingAddServiceDiv").style.display = "none";
		document.getElementById("pricingAddPointsDiv").style.display = "block";

		if (pricingType === PRICING_TYPE_OCTDESK) {
			document.getElementById("pricingAddPointCpuDiv").style.display = "block";
			document.getElementById("pricingAddPointMemoryDiv").style.display = "block";
			document.getElementById("pricingAddPointDiskDiv").style.display = "block";
		}

		document.getElementById("pricingAddInfrastructureDiv").style.display = "block";
		document.getElementById("pricingAddInfrastructureCountDiv").style.display = "block";

		document.getElementById("pricingAddCpuDiv").style.display = "block";
		document.getElementById("pricingAddMemoryDiv").style.display = "block";
		document.getElementById("pricingAddDiskDiv").style.display = "block";
		document.getElementById("pricingAddRaidDiv").style.display = "block";
	}
}

function pricingDeskNext() {

	pricingType = getSelectedPricingAddType();

	if (pricingType === PRICING_TYPE_OCTDESK) {
		if (g_pricing_step === "step1") {
			document.getElementById("pricingButton").style.display = "inline-block";
			$("#pricingNextButton").html("上一步");
			g_pricing_step = "step2";

			document.getElementById("pricingAddTypeDiv").style.display = "none";
			document.getElementById("pricingAddNameDiv").style.display = "none";

			document.getElementById("pricingAddPointsDiv").style.display = "none";
			document.getElementById("pricingAddPointCpuDiv").style.display = "none";
			document.getElementById("pricingAddPointMemoryDiv").style.display = "none";
			document.getElementById("pricingAddPointDiskDiv").style.display = "none";

			document.getElementById("pricingAddDescDiv").style.display = "none";
			document.getElementById("pricingAddServiceDiv").style.display = "none";

			document.getElementById("pricingAddInfrastructureDiv").style.display = "none";
			document.getElementById("pricingAddInfrastructureCountDiv").style.display = "none";

			document.getElementById("pricingAddCpuDiv").style.display = "none";
			document.getElementById("pricingAddMemoryDiv").style.display = "none";
			document.getElementById("pricingAddDiskDiv").style.display = "none";
			document.getElementById("pricingAddRaidDiv").style.display = "none";
			document.getElementById("pricingAddWifiRouterDiv").style.display = "none";
			document.getElementById("pricingAddSwitchDiv").style.display = "none";

			document.getElementById("pricingAddThinClientDiv").style.display = "block";
			document.getElementById("pricingAddMonitorDiv").style.display = "block";
			document.getElementById("pricingAddKeyMouseDiv").style.display = "block";
			document.getElementById("pricingAddWifiRouterDiv").style.display = "block";
			document.getElementById("pricingAddSwitchDiv").style.display = "block";
			document.getElementById("pricingAddUkeyDiv").style.display = "block";
			document.getElementById("pricingAddDescDiv").style.display = "block";
			document.getElementById("pricingAddServiceDiv").style.display = "block";

			updatePricingMonitor();

		} else {
			document.getElementById("pricingButton").style.display = "none";
			document.getElementById("pricingNextButton").style.display = "inline-block";
			$("#pricingNextButton").html("下一步");
			g_pricing_step = "step1";

			document.getElementById("pricingAddThinClientDiv").style.display = "none";
			document.getElementById("pricingAddMonitorDiv").style.display = "none";
			document.getElementById("pricingAddKeyMouseDiv").style.display = "none";
			document.getElementById("pricingAddWifiRouterDiv").style.display = "none";
			document.getElementById("pricingAddSwitchDiv").style.display = "none";
			document.getElementById("pricingAddUkeyDiv").style.display = "none";
			document.getElementById("pricingAddDescDiv").style.display = "none";
			document.getElementById("pricingAddServiceDiv").style.display = "none";

			document.getElementById("pricingAddTypeDiv").style.display = "block";
			document.getElementById("pricingAddNameDiv").style.display = "block";

			document.getElementById("pricingAddPointsDiv").style.display = "block";
			document.getElementById("pricingAddPointCpuDiv").style.display = "block";
			document.getElementById("pricingAddPointMemoryDiv").style.display = "block";
			document.getElementById("pricingAddPointDiskDiv").style.display = "block";

			document.getElementById("pricingAddInfrastructureDiv").style.display = "block";
			document.getElementById("pricingAddInfrastructureCountDiv").style.display = "block";

			document.getElementById("pricingAddCpuDiv").style.display = "block";
			document.getElementById("pricingAddMemoryDiv").style.display = "block";
			document.getElementById("pricingAddDiskDiv").style.display = "block";
			document.getElementById("pricingAddRaidDiv").style.display = "block";
		}
	} else {
		if (g_pricing_step === "step1") {
			document.getElementById("pricingButton").style.display = "inline-block";
			$("#pricingNextButton").html("上一步");
			g_pricing_step = "step2";

			document.getElementById("pricingAddTypeDiv").style.display = "none";
			document.getElementById("pricingAddNameDiv").style.display = "none";

			document.getElementById("pricingAddPointsDiv").style.display = "none";
			document.getElementById("pricingAddDescDiv").style.display = "none";
			document.getElementById("pricingAddServiceDiv").style.display = "none";

			document.getElementById("pricingAddInfrastructureDiv").style.display = "none";
			document.getElementById("pricingAddInfrastructureCountDiv").style.display = "none";

			document.getElementById("pricingAddCpuDiv").style.display = "none";
			document.getElementById("pricingAddMemoryDiv").style.display = "none";
			document.getElementById("pricingAddDiskDiv").style.display = "none";
			document.getElementById("pricingAddRaidDiv").style.display = "none";
			document.getElementById("pricingAddWifiRouterDiv").style.display = "none";
			document.getElementById("pricingAddSwitchDiv").style.display = "none";

			document.getElementById("pricingAddThinClientDiv").style.display = "block";
			document.getElementById("pricingAddMonitorDiv").style.display = "block";
			document.getElementById("pricingAddKeyMouseDiv").style.display = "block";
			document.getElementById("pricingAddWifiRouterDiv").style.display = "block";
			document.getElementById("pricingAddSwitchDiv").style.display = "block";
			document.getElementById("pricingAddServiceDiv").style.display = "block";
			document.getElementById("pricingAddDescDiv").style.display = "block";

			updatePricingMonitor();

		} else {
			document.getElementById("pricingButton").style.display = "none";
			document.getElementById("pricingNextButton").style.display = "inline-block";
			$("#pricingNextButton").html("下一步");
			g_pricing_step = "step1";

			document.getElementById("pricingAddThinClientDiv").style.display = "none";
			document.getElementById("pricingAddMonitorDiv").style.display = "none";
			document.getElementById("pricingAddKeyMouseDiv").style.display = "none";
			document.getElementById("pricingAddWifiRouterDiv").style.display = "none";
			document.getElementById("pricingAddSwitchDiv").style.display = "none";
			document.getElementById("pricingAddDescDiv").style.display = "none";
			document.getElementById("pricingAddServiceDiv").style.display = "none";

			document.getElementById("pricingAddTypeDiv").style.display = "block";
			document.getElementById("pricingAddNameDiv").style.display = "block";

			document.getElementById("pricingAddPointsDiv").style.display = "block";
			document.getElementById("pricingAddInfrastructureDiv").style.display = "block";
			document.getElementById("pricingAddInfrastructureCountDiv").style.display = "block";

			document.getElementById("pricingAddCpuDiv").style.display = "block";
			document.getElementById("pricingAddMemoryDiv").style.display = "block";
			document.getElementById("pricingAddDiskDiv").style.display = "block";
			document.getElementById("pricingAddRaidDiv").style.display = "block";
		}
	}
}

function raisePricingAdd() {
	ajaxPost(API_URL, JSON.stringify(createGetProductsParas("", "Enabled")), parseProductsCallback);
}

function updateInfrastructureCount() {
	var pricingType = getSelectedPricingAddType();
	var infra = document.getElementById("pricingAddInfrastructure").value;

	if (infra === "") {
		document.getElementById("pricingAddInfrastructureCount").value = "";
		return;
	}

	var points = parseInt(document.getElementById("pricingAddPoints").value);
	if (!points) {
		alert("点位数必须制定。。");
		document.getElementById("pricingAddInfrastructureCount").value = "";
		return;
	}
	if (pricingType !== PRICING_TYPE_OCTDESK) {
		count = parseInt((points + 50 - 1) / 50);
	} else {
		count = parseInt((points + 40 - 1) / 40);
	}

	document.getElementById("pricingAddInfrastructureCount").value = count;
}

function updateAddCpuCount() {
	var cpu = document.getElementById("pricingAddCpu").value;
	var infra = document.getElementById("pricingAddInfrastructure").value;
	var infraCount = document.getElementById("pricingAddInfrastructureCount").value;

	if (cpu === "" || infra === "" || infraCount === "0") {
		document.getElementById("pricingAddCpuCount").value = 0;
	} else {
		pricintType = getSelectedPricingAddType();
		if (pricingType === PRICING_TYPE_SERVER) {
			infraCount = document.getElementById("pricingAddHostCount").value
		}
		document.getElementById("pricingAddCpuCount").value = parseInt(infraCount) * 2;
	}
}


function updateAddMemoryCount() {
	var memory = document.getElementById("pricingAddMemory").value;
	if (memory === "") {
		document.getElementById("pricingAddMemoryCount").value = 0;
		return;
	}

	var pricingType = getSelectedPricingAddType();
	if (pricingType === PRICING_TYPE_OCTDESK) {
		capacity = parseInt($("#pricingAddMemory option:selected").attr("capacity"));

		points = parseInt(document.getElementById("pricingAddPoints").value);
		if (!points) {
			alert("点位数必须制定。。");
			document.getElementById("pricingAddMemory").value = "";
			return;
		}

		pointMemory = parseInt(document.getElementById("pricingAddPointMemory").value);
		if (!pointMemory) {
			alert("每点位内存数必须制定。。");
			document.getElementById("pricingAddMemory").value = "";
			return;
		}
		document.getElementById("pricingAddMemoryCount").value = parseInt((points * pointMemory - capacity + 1) / capacity) + 1;
	} else if (pricingType === PRICING_TYPE_OCTCLASS) {
		capacity = parseInt($("#pricingAddMemory option:selected").attr("capacity"));
		points = parseInt(document.getElementById("pricingAddPoints").value);
		pointMemory = parseInt(document.getElementById("pricingAddPointMemory").value);
		document.getElementById("pricingAddMemoryCount").value = parseInt((points * 3 - capacity + 1) / capacity) + 1;
	}
}

function updateAddDiskCount() {

	var disk = document.getElementById("pricingAddDisk").value;
	if (disk === "") {
		document.getElementById("pricingAddDiskCount").value = 0;
		return;
	}

	var pricingType = getSelectedPricingAddType();
	if (pricingType === PRICING_TYPE_OCTDESK) {
		capacity = parseInt($("#pricingAddDisk option:selected").attr("capacity"));
		points = parseInt(document.getElementById("pricingAddPoints").value);
		if (!points) {
			alert("点位数必须制定。。");
			document.getElementById("pricingAddDisk").value = "";
			return;
		}
		pointDisk = parseInt(document.getElementById("pricingAddPointDisk").value);
		if (!pointDisk) {
			alert("每点位磁盘数必须制定。。");
			document.getElementById("pricingAddDisk").value = "";
			return;
		}
		document.getElementById("pricingAddDiskCount").value = parseInt((points * pointDisk - capacity + 1) / capacity);
	} else if (pricingType === PRICING_TYPE_OCTCLASS) {
		document.getElementById("pricingAddDiskCount").value = 2;
	}
}

function updateAddSwitchCount() {
	var switches = document.getElementById("pricingAddSwitch").value;
	if (switches === "") {
		document.getElementById("pricingAddSwitchCount").value = 0;
		return;
	}

	var points = parseInt(document.getElementById("pricingAddPoints").value);
	var capacity = parseInt($("#pricingAddSwitch option:selected").attr("capacity"));
	if (!capacity) {
		document.getElementById("pricingAddSwitchCount").value = 0;
		return;
	}

	document.getElementById("pricingAddSwitchCount").value = parseInt((points + capacity - 1) / capacity);
}

function updateAddWifiRouterCount() {
	var switches = document.getElementById("pricingAddWifiRouter").value;
	if (switches === "") {
		document.getElementById("pricingAddWifiRouterCount").value = 0;
		return;
	}

	var points = parseInt(document.getElementById("pricingAddPoints").value);
	var capacity = parseInt($("#pricingAddWifiRouter option:selected").attr("capacity"));
	if (!capacity) {
		document.getElementById("pricingAddWifiRouterCount").value = 0;
		return;
	}

	document.getElementById("pricingAddWifiRouterCount").value = parseInt((points + capacity - 1) / capacity);
}

function updateAddThinClientCount() {
	var clients = document.getElementById("pricingAddThinClient").value;
	if (clients === "") {
		document.getElementById("pricingAddThinClientCount").value = 0;
		return;
	}

	var points = parseInt(document.getElementById("pricingAddPoints").value);
	document.getElementById("pricingAddThinClientCount").value = parseInt(points);
}

function updateAddMonitorCount() {
	var monitors = document.getElementById("pricingAddMonitor").value;
	if (monitors === "") {
		document.getElementById("pricingAddMonitorCount").value = 0;
		return;
	}

	var points = parseInt(document.getElementById("pricingAddPoints").value);
	document.getElementById("pricingAddMonitorCount").value = parseInt(points);
}

function updateAddKeyMouseCount() {
	var clients = document.getElementById("pricingAddKeyMouse").value;
	if (clients === "") {
		document.getElementById("pricingAddKeyMouseCount").value = 0;
		return;
	}

	var points = parseInt(document.getElementById("pricingAddPoints").value);
	document.getElementById("pricingAddKeyMouseCount").value = parseInt(points);
}

function updateAddUkeyCount() {
	var clients = document.getElementById("pricingAddUkey").value;
	if (clients === "") {
		document.getElementById("pricingAddUkeyCount").value = 0;
		return;
	}

	var points = parseInt(document.getElementById("pricingAddPoints").value);
	document.getElementById("pricingAddUkeyCount").value = parseInt(points);
}