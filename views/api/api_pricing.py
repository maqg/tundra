# -*- coding: utf-8 -*-

from models.Account import ROLE_SUPERADMIN, ROLE_ADMIN

moduleName = "pricing"

funcList = {

	"APIShowProductTypes": {
		"name": "查看所有产品类型",
		"serviceName": "pricing.pricing_web.web_get_product_types",
		"roles": [ROLE_SUPERADMIN, ROLE_ADMIN],
		"paras": {}
	},
}
