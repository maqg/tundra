/**
 * Created by henry on 2015/5/12.
 */

var URL_GET_VMUSB = "/center/3.0/vms/__VMID__/candidateusb/";
var URL_VM_BINDUSB = "/center/3.0/vms/__VMID__/usb/__USBID__/";
var URL_VM_REMOVEUSB = "/center/3.0/vms/__VMID__/removeusb/__USBID__/";

API_PREFIX = "octlink.tundra.v1.";
URL_LOGIN = "/userportal/logout/";

// USER
API_GET_USER = API_PREFIX + "enduser.APIShowEnduser";
API_UPDATE_USER = API_PREFIX + "enduser.APIUpdateEnduser";
API_CHANGE_USER_PASS = API_PREFIX + "enduser.APIUpdateEnduserPassword";

// VMS
API_GET_BIND_VMS = API_PREFIX + "enduser.APIShowBandVms";
API_VM_POWER = API_PREFIX + "vm.APIPowerVm";
API_VNC_CONSOLE = API_PREFIX + "vm.APIConnectVmConsole";
API_GET_VM = API_PREFIX + "vm.APIShowVmInfo";
API_GET_VM_NICINFO = API_PREFIX + "vm.APIShowVmNicInfo";
API_GET_VM_DISKINFO = API_PREFIX + "vm.APIShowVmVolumeInfo";
API_GET_VM_CDROM = API_PREFIX + "cdrom.APIShowVmCDROM";
API_SET_VM_PASSWORD = API_PREFIX + "enduser.APIEnduserSetVmPassword";
API_SET_VM_ADVANCED_OPTION = API_PREFIX + "vm.APISetVmAdvance";
API_SYNC_VMAPP_STATUS = API_PREFIX + "vm.APIQueryRemoteAppState";
API_SET_VMAPP_STATUS = API_PREFIX + "vm.APISetRemoteAppState";

// cdrom
API_GET_VM_ISO_LIST = API_PREFIX + "cdrom.APIShowVmAvailableISO";
API_GET_ISO_INFO = API_PREFIX + "image.APIShowImage";
API_CDROM_SET_ISO = API_PREFIX + "cdrom.APIUpdateCDROM";
API_DEL_CDROM = API_PREFIX + "v5.cdrom.APIDeleteCDROM";
API_ADD_CDROM = API_PREFIX + "cdrom.APIAddCDROM";

// app
API_GET_VM_APPS = API_PREFIX + "vm.APIShowAllApp";
API_DEL_VM_APP = API_PREFIX + "vm.APIRemoveApp";
API_ADD_VM_APP = API_PREFIX + "vm.APIAddApp";
API_UPDATE_VM_APP = API_PREFIX + "vm.APIUpdateApp";
API_SYNC_VM_APP = API_PREFIX + "vm.APISyncApp";

// service
API_SHOW_ALL_SERVICE = API_PREFIX + "service.APIShowEnduserService";
API_STOP_SERVICE = API_PREFIX + "service.APIStopService";
API_START_SERVICE = API_PREFIX + "service.APIStartService";
API_DELETE_SERVICE = API_PREFIX + "service.APIDeleteService";
API_RESUME_SERVICE = API_PREFIX + "service.APIResumeService";
API_CANCEL_SERVICE = API_PREFIX + "service.APIRevokeService";
API_ABANDON_SERVICE = API_PREFIX + "service.APIAbandonService";
API_ADD_SERVICE = API_PREFIX + "service.APIRegisterService";
API_GET_SERVICE_VMLIST = API_PREFIX + "service.APIShowServiceVmList";

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

function createGetOfferingParas() {
	return {
		"module": "service",
		"api": API_GET_OFFERING_LIST,
		"async": false,
		"paras": {
			"start": 0,
			"limit": 1000
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createServicePowerParas(serviceId, action) {

	var api = null;

	if (action === SERVICE_POWER_OFF) {
		api = API_STOP_SERVICE;
	} else {
		api = API_START_SERVICE;
	}
	return {
		"module": "service",
		"api": api,
		"async": false,
		"paras": {
			"id": serviceId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createServiceManageParas(serviceId, api) {
	return {
		"module": "service",
		"api": api,
		"async": false,
		"paras": {
			"id": serviceId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetAllServiceParas(userId) {
	return {
		"module": "service",
		"api": API_SHOW_ALL_SERVICE,
		"async": false,
		"paras": {
			"id": userId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createAddCdromParas(vmId, isoId) {
	return {
		"module": "cdrom",
		"api": API_ADD_CDROM,
		"async": false,
		"paras": {
			"vmId": vmId,
			"imageId": isoId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createDelCdromParas(cdromId) {
	return {
		"module": "cdrom",
		"api": API_DEL_CDROM,
		"async": false,
		"paras": {
			"id": cdromId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createSyncAppParas(appId) {
	return {
		"module": "cdrom",
		"api": API_SYNC_VM_APP,
		"async": false,
		"paras": {
			"id": appId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createDelAppParas(appId) {
	return {
		"module": "cdrom",
		"api": API_DEL_VM_APP,
		"async": false,
		"paras": {
			"id": appId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createCdromSetIsoParas(isoId, cdromId) {
	return {
		"module": "cdrom",
		"api": API_CDROM_SET_ISO,
		"async": false,
		"paras": {
			"imageId": isoId,
			"cdromId": cdromId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetIsoInfoParas(isoId) {
	return {
		"module": "cdrom",
		"api": API_GET_ISO_INFO,
		"async": false,
		"paras": {
			"imageId": isoId,
			"storageId": "1"
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetVmIsoListParas(vmId) {
	return {
		"module": "cdrom",
		"api": API_GET_VM_ISO_LIST,
		"async": false,
		"paras": {
			"id": vmId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetVmParas(vmId) {
	return {
		"module": "vm",
		"api": API_GET_VM,
		"async": false,
		"paras": {
			"id": vmId
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createGetBindVmsParas(userId) {
	return {
		"module": "enduser",
		"api": API_GET_BIND_VMS,
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

function createGetUserParas(userId) {
	return {
		"module": "enduser",
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

function createAddVmAppParas(vmId, name, path, paras) {
	return {
		"module": "enduser",
		"api": API_ADD_VM_APP,
		"paras": {
			"vmId": vmId,
			"name": name,
			"path": path,
			"paras": paras
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createUpdateVmAppParas(appId, name, path, paras) {
	return {
		"module": "enduser",
		"api": API_UPDATE_VM_APP,
		"paras": {
			"id": appId,
			"name": name,
			"path": path,
			"paras": paras
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
			"id": g_current_user_id,
			"oldPassword": new Base64().encode(oldPassword),
			"newPassword": new Base64().encode(newPassword)
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createVmPowerParaqs(vmId, action) {
	return {
		"module": "vm",
		"api": API_VM_POWER,
		"async": false,
		"paras": {
			"id": vmId,
			"action": action
		},
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createVmVncConsoleParas(vmId) {
	return {
		"module": "vm",
		"api": API_VNC_CONSOLE,
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

function createVmNicInfoParas(vmId) {
	return {
		"module": "vm",
		"api": API_GET_VM_NICINFO,
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

function createVmDiskInfoParas(vmId) {
	return {
		"module": "vm",
		"api": API_GET_VM_DISKINFO,
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

function createVmCdromInfoParas(vmId) {
	return {
		"module": "vm",
		"api": API_GET_VM_CDROM,
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

function createGetVmAppParas(vmId) {
	return {
		"module": "vm",
		"api": API_GET_VM_APPS,
		"paras": {
			"vmId": vmId,
			"start": 0,
			"limit": 100
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createSetVmPasswordParas(userId, vmId, username, password) {
	return {
		"module": "enduser",
		"api": API_SET_VM_PASSWORD,
		"paras": {
			"id": g_current_user_id,
			"vmId": vmId,
			"name": username,
			"newPassword": password
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}

function createVmAdvancedOptionParas(vmId, diskPersistent,
                                     allocatorStrategy, startWithHost,
                                     bootloaderArgs) {
	return {
		"module": "vm",
		"api": API_SET_VM_ADVANCED_OPTION,
		"paras": {
			"id": vmId,
			"diskPersistent": diskPersistent,
			"allocatorStrategy": allocatorStrategy,
			"startWithHost": startWithHost,
			"bootloaderArgs": bootloaderArgs
		},
		"async": false,
		"session": {
			"uuid": API_UUID,
			"skey": API_SKEY
		}
	};
}
