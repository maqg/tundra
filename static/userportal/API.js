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
PRODUCT_TYPE_SOFTWARE = "SOFTWARE";
PRODUCT_TYPE_INFRASTRUCTURE = "INFRASTRUCTURE";


// USER
API_GET_USER = API_PREFIX + "account.APIShowAccount";
API_UPDATE_USER = API_PREFIX + "account.APIUpdateAccount";
API_CHANGE_USER_PASS = API_PREFIX + "account.APIUpdateAccountPassword";

// pricing
API_GET_QUERY_RESULTS = API_PREFIX + "pricing.APIShowQueryResults";
API_REMOVE_PRICING = API_PREFIX + "pricing.APIRemovePricing";
API_ADD_PRICING_THINCLIENT = API_PREFIX + "pricing.APIQueryThinClientPrice";

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

function createAddPricingThinClientParas(name, points, thinclient, monitor, keymouse, desc) {
	return {
		"module": "pricing",
		"api": API_ADD_PRICING_THINCLIENT,
		"paras": {
			"name": name,
			"point": points,
			"thinClient": thinclient,
			"monitor": monitor,
			"keyMouse": keymouse,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createAddProductParas(type, name, code, model, price, capacity, frequency, cores,
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

function createUpdateProductPriceParas(productId, price, base, host, point, cpu) {
	return {
		"module": "pricing",
		"api": API_UPDATE_PRODUCT_PRICE,
		"paras": {
			"id": productId,
			"price": price,
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

function createUpdateProductParas(productId, name, state, desc) {
	return {
		"module": "pricing",
		"api": API_UPDATE_PRODUCT,
		"paras": {
			"id": productId,
			"name": name,
			"state": state === "Enabled",
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

function createGetQueryResultsParas(type) {
	return {
		"module": "pricing",
		"api": API_GET_QUERY_RESULTS,
		"paras": {
			"type": type
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetProductsParas(type) {
	return {
		"module": "pricing",
		"api": API_GET_PRODUCTS,
		"paras": {
			"type": type
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