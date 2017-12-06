# -*- coding: utf-8 -*-

from views.api.api import PARAM_TYPE_STRING, PARAM_TYPE_INT, PARAM_NOT_NULL, PARAM_TYPE_BOOLEAN

moduleName = "pricing"

funcList = {

	"APIShowProductTypes": {
		"name": "查看所有产品类型",
		"serviceName": "pricing.pricing_web.web_get_product_types",
		"paras": {}
	},
	
	"APIShowProducts": {
		"name": "查看所有产品",
		"serviceName": "pricing.pricing_web.web_get_products",
		"paras": {
			"type": {
				"type": PARAM_TYPE_STRING,
				"desc": "Product Type",
				"descCN": "产品类型, CPU,MEMORY,DISK",
				"default": ""
			},
		}
	},
	
	"APIRemoveProduct": {
		"name": "删除产品",
		"serviceName": "pricing.pricing_web.web_remove_product",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "产品ID",
				"default": PARAM_NOT_NULL
			},
		}
	},
	
	"APIUpdateProduct": {
		"name": "编辑产品",
		"serviceName": "pricing.pricing_web.web_update_product",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "产品ID",
				"default": PARAM_NOT_NULL
			},
			"name": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "产品名称",
				"default": PARAM_NOT_NULL
			},
			"state": {
				"type": PARAM_TYPE_BOOLEAN,
				"desc": "",
				"descCN": "状态",
				"default": True
			},
			"desc": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "描述",
				"default": ""
			},
		}
	},
	
	"APIAddProduct": {
		"name": "添加产品",
		"serviceName": "pricing.pricing_web.web_add_product",
		"paras": {
			"type": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "产品类型，CPU,MEMORY,DISK,RAID,INFRASTRUCTURE,SWITCH,WIFIROUTER,THINCLIENT,MONITOR,KEYMOUSE",
				"default": PARAM_NOT_NULL
			},
			"name": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "产品名称",
				"default": PARAM_NOT_NULL
			},
			"code": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "产品编号",
				"default": PARAM_NOT_NULL
			},
			"model": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "型号",
				"default": ""
			},
			"price": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "单价",
				"default": 0
			},
			"capacity": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "容量，尺寸，大小等",
				"default": 0
			},
			"frequency": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "主频",
				"default": ""
			},
			"cores": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "核心数",
				"default": 0
			},
			"threads": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "线程数",
				"default": 0
			},
			"provider": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "供应商",
				"default": ""
			},
			"desc": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "描述",
				"default": ""
			},
		}
	},
	
	"APIUpdateProductPrice": {
		"name": "编辑产品价格",
		"serviceName": "pricing.pricing_web.web_update_productprice",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "产品ID",
				"default": PARAM_NOT_NULL
			},
			"price": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "价格",
				"default": 0
			},
			"costPrice": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "成本价",
				"default": 0
			},
			"basePrice": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "平台价格",
				"default": 0
			},
			"hostPrice": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "每台物理主机授权价格",
				"default": 0
			},
			"cpuPrice": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "每颗CPU授权价格",
				"default": 0
			},
			"pointPrice": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "每点位授权价格",
				"default": 0
			}
		}
	},
	
	"APIShowQueryResults": {
		"name": "查看所有报价结果",
		"serviceName": "pricing.pricing_web.web_get_queryresults",
		"paras": {
			"type": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "产品类型, PLATFORM,OCTCLASS,OCTDESK",
				"default": ""
			},
		}
	},
	
	"APIRemovePricing": {
		"name": "删除报价结果",
		"serviceName": "pricing.pricing_web.web_remove_pricing",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "报价ID",
				"default": PARAM_NOT_NULL
			},
		}
	},
	
	"APIQueryDeskPrice": {
		"name": "生成云桌面报价",
		"serviceName": "pricing.pricing_web.web_query_deskprice",
		"paras": {
			"name": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "客户名称",
				"default": PARAM_NOT_NULL
			},
			"point": {
				"type": PARAM_TYPE_INT,
				"desc": "Point Count",
				"descCN": "点位数",
				"default": 50
			},
			"withHardware": {
				"type": PARAM_TYPE_BOOLEAN,
				"desc": "",
				"descCN": "是否有硬件",
				"default": True
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
			"desc": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "其他补充说明",
				"default": ""
			},
		}
	},

	"APIQueryThinClientPrice": {
		"name": "生成瘦客户端硬件报价",
		"serviceName": "pricing.pricing_web.web_query_thinclientprice",
		"paras": {
			"name": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "客户名称",
				"default": PARAM_NOT_NULL
			},
			"point": {
				"type": PARAM_TYPE_INT,
				"desc": "Point Count",
				"descCN": "点位数",
				"default": 50
			},
			"thinClient": {
				"type": PARAM_TYPE_STRING,
				"desc": "Thin Client Type",
				"descCN": "瘦终端类型，空表示无",
				"default": PARAM_NOT_NULL
			},
			"monitor": {
				"type": PARAM_TYPE_STRING,
				"desc": "Monitor Type",
				"descCN": "显示器类型，空表示无",
				"default": ""
			},
			"keyMouse": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "键鼠套装类型，空表示无",
				"default": ""
			},
			"desc": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "其他补充说明",
				"default": ""
			},
		}
	},
	
	"APIQueryServerPrice": {
		"name": "生成服务器硬件报价",
		"serviceName": "pricing.pricing_web.web_query_serverprice",
		"paras": {
			"name": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "客户名称",
				"default": PARAM_NOT_NULL
			},
			"infrastructure": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "服务器平台",
				"default": PARAM_NOT_NULL
			},
			"point": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "服务器台数",
				"default": 1
			},
			"cpu": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "CPU类型",
				"default": PARAM_NOT_NULL
			},
			"cpuCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "CPU数",
				"default": 2
			},
			"disk": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "磁盘类型",
				"default": PARAM_NOT_NULL
			},
			"diskCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "磁盘数",
				"default": 2
			},
			"memory": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "内存类型",
				"default": PARAM_NOT_NULL
			},
			"memoryCount": {
				"type": PARAM_TYPE_INT,
				"desc": "",
				"descCN": "内存数",
				"default": 16
			},
			"raid": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "RAID卡类型",
				"default": ""
			},
			"desc": {
				"type": PARAM_TYPE_STRING,
				"desc": "",
				"descCN": "其他补充说明",
				"default": ""
			},
		}
	},
}
