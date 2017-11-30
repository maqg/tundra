/**
 * Created by henry on 2015/5/12.
 */


API_PREFIX = "octlink.tundra.v1.";
URL_LOGIN = "/logout/";

// USER
API_GET_USER = API_PREFIX + "enduser.APIShowEnduser";
API_UPDATE_USER = API_PREFIX + "enduser.APIUpdateEnduser";
API_CHANGE_USER_PASS = API_PREFIX + "enduser.APIUpdateEnduserPassword";

// offering
API_GET_OFFERING_LIST = API_PREFIX + "offering.APIShowAllServiceOffering";


API_URL = "/api/";
API_UUID = "00000000000000000000000000000000";
API_SKEY = "";

function createSyncVmAppStatusParas(vmId) {
	return {
		"module": "vm",
		"api": API_SYNC_VMAPP_STATUS,
		"paras": {
			"id": vmId
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createSetVmAppStatusParas(vmId, state) {
	return {
		"module": "vm",
		"api": API_SET_VMAPP_STATUS,
		"paras": {
			"id": vmId,
			"state": state
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetServiceVmListParas(serviceId) {
	return {
		"module": "service",
		"api": API_GET_SERVICE_VMLIST,
		"paras": {
			"id": serviceId
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