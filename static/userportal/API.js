/**
 * Created by henry on 2015/5/12.
 */


API_PREFIX = "octlink.tundra.v1.";
URL_LOGIN = "/logout/";

PRICING_TYPE_PLATFORM = "PLATFORM";
PRICING_TYPE_OCTCLASS = "OCTCLASS";
PRICING_TYPE_OCTDESK = "OCTDESK";
PRICING_TYPE_PLATFORM_SOFT = "PLATFORMSOFT";
PRICING_TYPE_OCTCLASS_SOFT = "OCTCLASSSOFT";
PRICING_TYPE_OCTDESK_SOFT = "OCTDESKSOFT";
PRICING_TYPE_THINCLIENT = "THINCLIENT";
PRICING_TYPE_SERVER = "SERVER";
PRICING_TYPE_OCTDESK = "OCTDESK";

PRODUCT_TYPE_CPU = "CPU";
PRODUCT_TYPE_MEMORY = "MEMORY";
PRODUCT_TYPE_THINCIENT = "THINCLIENT";
PRODUCT_TYPE_DISK = "DISK";
PRODUCT_TYPE_RAID = "RAID";
PRODUCT_TYPE_INFRASTRUCTURE = "INFRASTRUCTURE";
PRODUCT_TYPE_MONITOR = "MONITOR";
PRODUCT_TYPE_KEYMOUSE = "KEYMOUSE";
PRODUCT_TYPE_SWITCH = "SWITCH";
PRODUCT_TYPE_UKEY = "UKEY";
PRODUCT_TYPE_WIFIROUTER = "WIFIROUTER";
PRODUCT_TYPE_SOFTWARE = "SOFTWARE";
PRODUCT_TYPE_ALLINONE = "ALLINONE";


// USER
API_GET_USER = API_PREFIX + "account.APIShowAccount";
API_UPDATE_USER = API_PREFIX + "account.APIUpdateAccount";
API_CHANGE_USER_PASS = API_PREFIX + "account.APIUpdateAccountPassword";

// pricing
API_GET_QUERY_RESULTS = API_PREFIX + "pricing.APIShowQueryResults";
API_REMOVE_PRICING = API_PREFIX + "pricing.APIRemovePricing";
API_ADD_PRICING_THINCLIENT = API_PREFIX + "pricing.APIQueryThinClientPrice";
API_ADD_PRICING_SERVER = API_PREFIX + "pricing.APIQueryServerPrice";
API_ADD_PRICING_PLATFORMSOFT = API_PREFIX + "pricing.APIQueryPlatformSoftPrice";
API_ADD_PRICING_OCTDESKSOFT = API_PREFIX + "pricing.APIQueryDeskSoftPrice";
API_ADD_PRICING_OCTCLASSSOFT = API_PREFIX + "pricing.APIQueryClassSoftPrice";
API_ADD_PRICING_OCTDESK = API_PREFIX + "pricing.APIQueryDeskPrice";
API_ADD_PRICING_OCTCLASS = API_PREFIX + "pricing.APIQueryClassPrice";


// product
API_GET_PRODUCT_TYPES = API_PREFIX + "pricing.APIShowProductTypes";
API_GET_PRODUCTS = API_PREFIX + "pricing.APIShowProducts";
API_REMOVE_PRODUCT = API_PREFIX + "pricing.APIRemoveProduct";
API_UPDATE_PRODUCT = API_PREFIX + "pricing.APIUpdateProduct";
API_UPDATE_PRODUCT_PRICE = API_PREFIX + "pricing.APIUpdateProductPrice";
API_ADD_PRODUCT = API_PREFIX + "pricing.APIAddProduct";


API_URL = "/api/";
API_UUID = "00000000000000000000000000000000";
API_SKEY = "";

function  createAddPricingDeskParas(name, points, pointCpu, pointMemory, pointDisk,
			infra, infraCount, cpu,cpuCount, memory, memoryCount, disk, diskCount, disk1, disk1Count,
			raid, thinClient, thinClientCount, monitor, monitorCount, keyMouse, keyMouseCount,
			switches, switchCount, wifiRouter, wifiRouterCount, ukey, ukeyCount, service, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRICING_OCTDESK,
		"paras": {
			"name": name,
			"point": points,
			"pointCpu": pointCpu,
			"pointMemory": pointMemory,
			"pointDisk": pointDisk,
			"infrastructure": infra,
			"infrastructureCount": infraCount,
			"cpu": cpu,
			"cpuCount": cpuCount,
			"disk": disk,
			"diskCount": diskCount,
			"disk1": disk1,
			"disk1Count": disk1Count,
			"memory": memory,
			"memoryCount": memoryCount,
			"raid": raid,
			"thinClient": thinClient,
			"monitor": monitor,
			"keyMouse": keyMouse,
			"ukey": ukey,
			"thinClientCount": thinClientCount,
			"monitorCount": monitorCount,
			"keyMouseCount": keyMouseCount,
			"ukeyCount": ukeyCount,
			"switch": switches,
			"switchCount": switchCount,
			"wifiRouter": wifiRouter,
			"wifiRouterCount": wifiRouterCount,
			"service": service,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function  createAddPricingClassParas(name, points, infra, infraCount, cpu,
			cpuCount, memory, memoryCount, disk, diskCount, raid,
			thinClient, thinClientCount, monitor, monitorCount, keyMouse, keyMouseCount,
			switches, switchCount, wifiRouter, wifiRouterCount, service, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRICING_OCTCLASS,
		"paras": {
			"name": name,
			"point": points,
			"infrastructure": infra,
			"infrastructureCount": infraCount,
			"cpu": cpu,
			"cpuCount": cpuCount,
			"disk": disk,
			"diskCount": diskCount,
			"memory": memory,
			"memoryCount": memoryCount,
			"raid": raid,
			"thinClient": thinClient,
			"monitor": monitor,
			"keyMouse": keyMouse,
			"thinClientCount": thinClientCount,
			"monitorCount": monitorCount,
			"keyMouseCount": keyMouseCount,
			"switch": switches,
			"switchCount": switchCount,
			"wifiRouter": wifiRouter,
			"wifiRouterCount": wifiRouterCount,
			"service": service,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createAddPricingPlatformSoftParas(name, hostCount, cpuCount, service, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRICING_PLATFORMSOFT,
		"paras": {
			"name": name,
			"cpuCount": cpuCount,
			"hostCount": hostCount,
			"service": service,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createAddPricingDeskSoftParas(name, points, servive, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRICING_OCTDESKSOFT,
		"paras": {
			"name": name,
			"point": points,
			"service": servive,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createAddPricingClassSoftParas(name, poitns, service, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRICING_OCTCLASSSOFT,
		"paras": {
			"name": name,
			"point": poitns,
			"service": service,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createAddPricingServerParas(name, points, infra, cpu, cpuCount, memory, memoryCount,
                                     disk, diskCount, disk1, disk1Count, raid, service, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRICING_SERVER,
		"paras": {
			"name": name,
			"point": points,
			"infrastructure": infra,
			"cpu": cpu,
			"cpuCount": cpuCount,
			"disk": disk,
			"diskCount": diskCount,
			"disk1": disk1,
			"disk1Count": disk1Count,
			"memory": memory,
			"memoryCount": memoryCount,
			"raid": raid,
			"service": service,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createAddPricingThinClientParas(name, points, thinclient, thinclientCount, monitor,
                                         monitorCount, keymouse, keymouseCount, service, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRICING_THINCLIENT,
		"paras": {
			"name": name,
			"point": points,
			"thinClient": thinclient,
			"monitor": monitor,
			"keyMouse": keymouse,
			"thinClientCount": thinclientCount,
			"monitorCount": monitorCount,
			"keyMouseCount": keymouseCount,
			"service": service,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createAddProductParas(type, name, code, model, price, costPrice, capacity, frequency, cores,
                               threads, provider, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRODUCT,
		"paras": {
			"type": type,
			"name": name,
			"code": code,
			"model": model,
			"price": price,
			"costPrice": costPrice,
			"capacity": capacity,
			"frequency": frequency,
			"cores": cores,
			"threads": threads,
			"provider": provider,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createUpdateProductPriceParas(productId, price, costPrice, base, host, point, cpu) {
	return {
		"module": "pricing",
		"api": API_UPDATE_PRODUCT_PRICE,
		"paras": {
			"id": productId,
			"price": price,
			"costPrice": costPrice,
			"basePrice": base,
			"hostPrice": host,
			"pointPrice": point,
			"cpuPrice": cpu
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createUpdateProductParas(productId, name, state, capacity, desc) {
	return {
		"module": "pricing",
		"api": API_UPDATE_PRODUCT,
		"paras": {
			"id": productId,
			"name": name,
			"state": state === "Enabled",
			"capacity": capacity,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createPricingRemoveParas(id) {
	return {
		"module": "pricing",
		"api": API_REMOVE_PRICING,
		"paras": {
			"id": id
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createProductRemoveParas(id) {
	return {
		"module": "pricing",
		"api": API_REMOVE_PRODUCT,
		"paras": {
			"id": id
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetUserParas(userId) {
	return {
		"module": "account",
		"api": API_GET_USER,
		"paras": {
			"id": userId
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetQueryResultsParas(type, date, keyword) {
	return {
		"module": "pricing",
		"api": API_GET_QUERY_RESULTS,
		"paras": {
			"type": type,
			"date": date,
			"keyword": keyword
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetProductsParas(type, state) {
	return {
		"module": "pricing",
		"api": API_GET_PRODUCTS,
		"paras": {
			"type": type,
			"state": state
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetProductTypesParas() {
	return {
		"module": "pricing",
		"api": API_GET_PRODUCT_TYPES,
		"paras": {	},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createUpdateUserParas(userId, email, phoneNumber, desc) {
    return {
        "module": "enduser",
        "api": API_UPDATE_USER,
        "paras": {
            "id": g_current_user_id,
            "email": email,
            "phoneNumber": phoneNumber,
            "desc": desc
        },
        "async": false,
        "session": {
            "uuid": API_UUID,
            "skey": API_SKEY
        }
    };
}

function createChangeUserPassParaqs(userId, oldPassword, newPassword) {
    return {
        "module": "enduser",
        "api": API_CHANGE_USER_PASS,
        "async": false,
        "paras": {
            "id": userId,
            "oldPassword": new Base64().encode(oldPassword),
            "newPassword": new Base64().encode(newPassword)
        },
        "session": {
            "uuid": API_UUID,
            "skey": API_SKEY
        }
    };
}