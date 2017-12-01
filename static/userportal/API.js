/**
 * Created by henry on 2015/5/12.
 */


API_PREFIX = "octlink.tundra.v1.";
URL_LOGIN = "/logout/";

PRICING_TYPE_PLATFORM = "PLATFORM";
PRICING_TYPE_OCTCLASS = "OCTCLASS";
PRICING_TYPE_OCTDESK = "OCTDESK";

// USER
API_GET_USER = API_PREFIX + "account.APIShowAccount";
API_UPDATE_USER = API_PREFIX + "account.APIUpdateAccount";
API_CHANGE_USER_PASS = API_PREFIX + "account.APIUpdateAccountPassword";

// pricing
API_GET_QUERY_RESULTS = API_PREFIX + "pricing.APIShowQueryResults";
API_GET_PRODUCT_TYPES = API_PREFIX + "pricing.APIShowProductTypes";
API_GET_PRODUCTS = API_PREFIX + "pricing.APIShowProducts";


API_URL = "/api/";
API_UUID = "00000000000000000000000000000000";
API_SKEY = "";


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