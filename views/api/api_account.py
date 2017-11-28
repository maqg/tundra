#!/usr/bin/python
# -*- coding: utf-8 -*-
from models.Account import ROLE_SUPERADMIN, ROLE_ADMIN
from views.api.api import *

moduleName = "account"

funcList = {

	"APIAddAccount": {
		"name": "添加账号",
		"serviceName": "account.account_web.web_add_user",
		"roles": [ROLE_SUPERADMIN],
		"paras": {
			"account": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account Name",
				"descCN": "账号名称",
				"default": "NotNull"
			},
			"password": {
				"type": PARAM_TYPE_STRING,
				"desc": "Password in PlainText mode",
				"descCN": "密码（明文），base64ed",
				"default": "NotNull"
			},
			"email": {
				"type": PARAM_TYPE_STRING,
				"desc": "email address for account",
				"descCN": "账号名称",
				"default": ""
			},
			"phoneNumber": {
				"type": PARAM_TYPE_STRING,
				"desc": "phone number for account",
				"descCN": "电话号码",
				"default": ""
			}
		}
	},

	"APILoginByAccount": {
		"name": "根据账号登录",
		"serviceName": "account.account_web.web_login",
		"paras": {
			"account": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account Name",
				"descCN": "账号名称",
				"default": "NotNull"
			},
			"password": {
				"type": PARAM_TYPE_STRING,
				"desc": "Password in PlainText mode",
				"descCN": "密码（明文，使用Base64编码）",
				"default": "NotNull"
			}
		}
	},
	
	"APILoginByLdap": {
		"name": "通过LDAP登录",
		"serviceName": "account.account_web.web_login_byldap",
		"paras": {
			"uid": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account Name",
				"descCN": "LDAP用户Id",
				"default": PARAM_NOT_NULL
			},
			"password": {
				"type": PARAM_TYPE_STRING,
				"desc": "Password in PlainText mode,base64ed",
				"descCN": "密码（明文，使用Base64编码）",
				"default": PARAM_NOT_NULL
			}
		}
	},
	
	"APIBindLdapUid": {
		"name": "绑定LDAP用户Id",
		"serviceName": "account.account_web.web_bind_ldapuid",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account Id",
				"descCN": "Account Uuid",
				"default": PARAM_NOT_NULL
			},
			"uid": {
				"type": PARAM_TYPE_STRING,
				"desc": "LDAP User Id",
				"descCN": "LDAP用户Id",
				"default": PARAM_NOT_NULL
			}
		}
	},
	
	"APIUnbindLdapUid": {
		"name": "解绑LDAP用户Id",
		"serviceName": "account.account_web.web_unbind_ldapuid",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account Id",
				"descCN": "Account Uuid",
				"default": PARAM_NOT_NULL
			}
		}
	},
	
	"APIBindUkey": {
		"name": "绑定UKey",
		"serviceName": "account.account_web.web_bind_ukey",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account Id",
				"descCN": "Account Uuid",
				"default": PARAM_NOT_NULL
			},
			"ukey": {
				"type": PARAM_TYPE_STRING,
				"desc": "UKey Id",
				"descCN": "UKey Id",
				"default": PARAM_NOT_NULL
			}
		}
	},
	
	"APIUnbindUkey": {
		"name": "解绑UKey",
		"serviceName": "account.account_web.web_unbind_ukey",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account Id",
				"descCN": "Account Uuid",
				"default": PARAM_NOT_NULL
			}
		}
	},
	
	"APIShowAccount": {
		"name": "获取单个账号信息",
		"serviceName": "account.account_web.web_get_user",
		"roles": [ROLE_SUPERADMIN, ROLE_ADMIN],
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's UUID",
				"descCN": "账号的UUID",
				"default": "NotNull"
			}
		}
	},

	"APIUpdateQuota": {
		"name": "编辑账号配额",
		"serviceName": "account.account_web.web_update_quota",
		"roles": [ROLE_SUPERADMIN],
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's UUID",
				"descCN": "账号的UUID",
				"default": "NotNull"
			},
			"vm": {
				"type": PARAM_TYPE_INT,
				"desc": "Vm Number",
				"descCN": "Vm Number",
				"default": 0,
			},
			"runningVm": {
				"type": PARAM_TYPE_INT,
				"desc": "Running vm Number",
				"descCN": "Running vm Number",
				"default": 0
			},
			"cpu": {
				"type": PARAM_TYPE_INT,
				"desc": "vCPU cores",
				"descCN": "vCPU Cores",
				"default": 0,
			},
			"memory": {
				"type": PARAM_TYPE_INT,
				"desc": "Memory Limitaion M",
				"descCN": "Memory Limitation M",
				"default": 0,
			},
			"eip": {
				"type": PARAM_TYPE_INT,
				"desc": "Eip",
				"descCN": "Eip Number",
				"default": 0,
			},
			"snap": {
				"type": PARAM_TYPE_INT,
				"desc": "Snap Number",
				"descCN": "Snap Number",
				"default": 0,
			},
			"imageNum": {
				"type": PARAM_TYPE_INT,
				"desc": "Image Number",
				"descCN": "Image Number",
				"default": 0,
			},
			"imageCapacity": {
				"type": PARAM_TYPE_INT,
				"desc": "Image Capacity G",
				"descCN": "Image Capacity G",
				"default": 0,
			},
			"diskNum": {
				"type": PARAM_TYPE_INT,
				"desc": "Disk Number",
				"descCN": "Disk Number",
				"default": 0,
			},
			"diskCapacity": {
				"type": PARAM_TYPE_INT,
				"desc": "Disk Capacity G",
				"descCN": "Disk Capacity G",
				"default": 0,
			}
		}
	},

	"APIShowAllAccount": {
		"name": "获取所有账号信息",
		"serviceName": "account.account_web.web_get_user",
		"roles": [ROLE_SUPERADMIN],
		"paras": {
			"start": {
				"type": PARAM_TYPE_INT,
				"desc": "start from",
				"descCN": "开始位置",
				"default": 0
			},
			"limit": {
				"type": PARAM_TYPE_INT,
				"desc": "limitation",
				"descCN": "获取条目",
				"default": 15
			}
		}
	},

	"APIShowAccountList": {
		"name": "获取账号列表",
		"roles": [ROLE_SUPERADMIN],
		"serviceName": "account.account_web.web_get_userlist",
		"paras": {}
	},

	"APIDeleteAccount": {
		"name": "删除单个账号信息",
		"roles": [ROLE_SUPERADMIN],
		"serviceName": "account.account_web.web_del_user",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's UUID",
				"descCN": "账号的UUID",
				"default": "NotNull"
			}
		}
	},

	"APIResetAccountPassword": {
		"name": "重置账号密码",
		"roles": [ROLE_SUPERADMIN],
		"serviceName": "account.account_web.web_reset_password",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's UUID",
				"descCN": "账号的UUID",
				"default": "NotNull"
			},
			"password": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's new password",
				"descCN": "密码（明文，使用Base64编码）",
				"default": "NotNull"
			}
		}
	},

	"APIUpdateAccountPassword": {
		"name": "更新账号密码",
		"roles": [ROLE_SUPERADMIN, ROLE_ADMIN],
		"serviceName": "account.account_web.web_modify_password",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's UUID",
				"descCN": "账号的UUID",
				"default": "NotNull"
			},
			"newPassword": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's new password",
				"descCN": "新密码，base64ed",
				"default": "NotNull"
			},
			"oldPassword": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's old password",
				"descCN": "原始密码，base64ed",
				"default": "NotNull"
			}
		}
	},

	"APIUpdateAccount": {
		"name": "编辑账号信息",
		"roles": [ROLE_SUPERADMIN, ROLE_ADMIN],
		"serviceName": "account.account_web.web_update_user",
		"paras": {
			"id": {
				"type": PARAM_TYPE_STRING,
				"desc": "Account's UUID",
				"descCN": "账号的UUID",
				"default": "NotNull"
			},
			"email": {
				"type": PARAM_TYPE_STRING,
				"desc": "email address for account",
				"descCN": "账号名称",
				"default": ""
			},
			"phoneNumber": {
				"type": PARAM_TYPE_STRING,
				"desc": "phone number for account",
				"descCN": "电话号码",
				"default": ""
			}
		}
	},

	"APILogOut": {
		"name": "退出登录",
		"roles": [ROLE_SUPERADMIN, ROLE_ADMIN],
		"serviceName": "account.account_web.web_logout",
		"paras": {
			"sessionUuid": {
				"type": PARAM_TYPE_STRING,
				"desc": "UUID of Account to Logou",
				"descCN": "账号UUID",
				"default": "NotNull"
			}
		}
	}
}
