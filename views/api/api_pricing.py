# -*- coding: utf-8 -*-

from models.Account import ROLE_SUPERADMIN, ROLE_ADMIN
from views.api.api import PARAM_TYPE_STRING, PARAM_NOT_NULL, PARAM_TYPE_INT

moduleName = "pricing"

funcList = {

	"APIShowProductTypes": {
		"name": "查看所有产品类型",
		"serviceName": "pricing.pricing_web.web_get_product_types",
		"roles": [ROLE_SUPERADMIN, ROLE_ADMIN],
		"paras": {}
	},
	
	"APIShowProducts": {
		"name": "查看所有产品",
		"serviceName": "pricing.pricing_web.web_get_products",
		"roles": [ROLE_SUPERADMIN, ROLE_ADMIN],
		"paras": {
			"type": {
				"type": PARAM_TYPE_STRING,
				"desc": "Product Type",
				"descCN": "产品类型, CPU,MEMORY,DISK",
				"default": PARAM_NOT_NULL
			},
		}
	},
	
	"APIQueryDeskPrice": {
		"name": "查询云桌面报价",
		"serviceName": "pricing.pricing_web.web_query_deskprice",
		"roles": [ROLE_SUPERADMIN, ROLE_ADMIN],
		"paras": {
			"point": {
				"type": PARAM_TYPE_INT,
				"desc": "Point Count",
				"descCN": "点位数",
				"default": 50
			},
			"disk": {
				"type": PARAM_TYPE_INT,
				"desc": "Disk per Point",
				"descCN": "每点位磁盘大小，单位G",
				"default": 100
			},
			"cpu": {
				"type": PARAM_TYPE_INT,
				"desc": "VCPU per Point",
				"descCN": "每点位CPU核心数",
				"default": 2
			},
			"memory": {
				"type": PARAM_TYPE_INT,
				"desc": "Memory per Point",
				"descCN": "每点位内存数，单位M",
				"default": 2048
			},
			"thinClient": {
				"type": PARAM_TYPE_STRING,
				"desc": "Thin Client Type",
				"descCN": "瘦终端类型，空表示无",
				"default": ""
			},
			"thinClientCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "瘦客户机数量,0表示与点位数相同",
				"default": 0
			},
			"monitor": {
				"type": PARAM_TYPE_STRING,
				"desc": "Monitor Type",
				"descCN": "显示器类型，空表示无",
				"default": ""
			},
			"monitorCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "显示器数量,0表示与点位数相同",
				"default": 0
			},
			"keyMouse": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "键鼠套装类型，空表示无",
				"default": ""
			},
			"keyMouseCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "键鼠套装数量",
				"default": 0
			},
			"ukey": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "UKEY类型，空表示无",
				"default": ""
			},
			"ukeyCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "UKEY数量",
				"default": 0
			},
			"wifiRouter": {
				"type": PARAM_TYPE_STRING,
				"descCN": "无线路由器类型",
				"default": ""
			},
			"wifiRouterCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "无线路由器数量",
				"default": 0
			},
			"switch": {
				"type": PARAM_TYPE_STRING,
				"descCN": "交换机类型",
				"default": ""
			},
			"switchCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "交换机数量",
				"default": 0
			},
		}
	},
}
