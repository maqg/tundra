/**
 * Created by henry on 2015/5/12.
 */


API_PREFIX = "octlink.tundra.v1.";
URL_LOGIN = "/logout/";

// USER
API_GET_USER = API_PREFIX + "account.APIShowAccount";
API_UPDATE_USER = API_PREFIX + "account.APIUpdateAccount";
API_CHANGE_USER_PASS = API_PREFIX + "account.APIUpdateAccountPassword";

// pricing
API_GET_QUERY_RESULTS = API_PREFIX + "pricing.APIShowQueryResults";

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

function createGetQueryResultsParas() {
	return {
		"module": "pricing",
		"api": API_GET_QUERY_RESULTS,
		"paras": { },
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

function createAddServiceParas(userId, name, offering, desc) {
	return {
		"module": "service",
		"api": API_ADD_SERVICE,
		"paras": {
			"offeringId": offering,
			"userId": userId,
			"name": name,
			"desc": desc
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}