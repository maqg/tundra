# -*- coding: utf-8 -*-

from conf.dbconfig import TB_PRODUCT, TB_QUERYRESULT
from core import dbmysql
from core.err_code import DB_ERR, OCT_SUCCESS, SEGMENT_NOT_EXIST
from core.log import ERROR
from models.PricingResult import PricingResult, PRICING_TYPE_OCTDESK, PRICING_TYPE_THINCLIENT, \
	PRODUCT_TYPE_PLATFORM_SOFT, PRODUCT_TYPE_OCTCLASS_SOFT, PRODUCT_TYPE_OCTDESK_SOFT, getPricingResult
from models.Product import Product, getProduct
from utils.timeUtil import getCurrentStrDate

AUTHKEY_TIMEOUT = 24 * 30 * 60


def get_products(db, paras):
	listObj = {
		"items": [],
		"total": 0,
	}
	type = paras["type"]
	
	cond = "WHERE 1=1 "
	if type:
		cond += "AND P_Type='%s' " % type
	cond += "ORDER BY P_CreateTime "
	
	ret = db.select(TB_PRODUCT, cond=cond)
	if ret == -1:
		ERROR("get user list error")
		return (DB_ERR, None)
	
	for dur in db.cur:
		obj = dbmysql.row_to_dict(TB_PRODUCT, dur)
		product = Product(db, dbObj=obj)
		product.loadFromObj()
		
		listObj["items"].append(product.toObj())
	
	listObj["items"].sort(key=lambda x:x["infoObj"]["id"])
	
	listObj["total"] = len(listObj["items"])
	
	
	return (OCT_SUCCESS, listObj)


def get_product_types(db, paras):
	items = []
	
	cond = "WHERE 1=1 GROUP BY P_Type"
	ret = db.select(TB_PRODUCT, cond=cond)
	if ret == -1:
		ERROR("get user list error")
		return (DB_ERR, None)
	
	for dur in db.cur:
		obj = dbmysql.row_to_dict(TB_PRODUCT, dur)
		product = Product(db, dbObj=obj)
		product.loadFromObj()
		
		items.append(product.toProductTypeObj())
	
	return (OCT_SUCCESS, items)


def add_product(db, paras):
	return OCT_SUCCESS, None


def remove_product(db, paras):
	product = getProduct(db, paras["id"])
	if not product:
		return SEGMENT_NOT_EXIST, None
	return product.remove(), None


def update_product(db, paras):
	product = getProduct(db, paras["id"])
	if not product:
		return SEGMENT_NOT_EXIST, None
	
	product.name = paras["name"]
	product.desc = paras["desc"]
	product.state = paras["state"] and "Enabled" or "Disabled"
	
	product.update()
	
	return OCT_SUCCESS, None


def update_product_price(db, paras):
	product = getProduct(db, paras["id"])
	if not product:
		return SEGMENT_NOT_EXIST, None
	
	if product.type in (PRODUCT_TYPE_PLATFORM_SOFT,
	                    PRODUCT_TYPE_OCTCLASS_SOFT,
	                    PRODUCT_TYPE_OCTDESK_SOFT):
		product.infoObj["basePrice"] = paras["basePrice"]
		product.infoObj["hostPrice"] = paras["hostPrice"]
		product.infoObj["cpuPrice"] = paras["cpuPrice"]
		product.infoObj["pointPrice"] = paras["pointPrice"]
	else:
		product.infoObj["price"] = paras["price"]
		
	product.updatePrice()
	
	return OCT_SUCCESS, None


def get_queryresults(db, paras):
	listObj = {
		"items": [],
		"total": 0,
	}
	type = paras["type"]
	
	cond = "WHERE 1=1 "
	if type:
		cond += "AND QR_Type='%s'" % type
	
	ret = db.select(TB_QUERYRESULT, cond=cond)
	if ret == -1:
		ERROR("get user list error")
		return (DB_ERR, None)
	
	for dur in db.cur:
		obj = dbmysql.row_to_dict(TB_QUERYRESULT, dur)
		item = PricingResult(db, dbObj=obj)
		item.loadFromObj()
		
		listObj["items"].append(item.toObj())
	
	listObj["total"] = len(listObj["items"])
	
	return (OCT_SUCCESS, listObj)


DESK_PARAS = {
	"name": "中国银行",
	"point": 50,
	"withHardware": False,
	"disk": 100,
	"cpu": 2,
	"memory": 2048,
	"thinClient": "",
	"thinClientCount": 0,
	"monitor": "",
	"monitorCount": 0,
	"keyMouse": "",
	"keyMouseCount": 0,
	"ukey": "",
	"ukeyCount": 0,
	"wifiRouter": "",
	"wifiRouterCount": 0,
	"switch": "",
	"switchCount": 0,
	"desc": "",
	"timeout": 0
}
def query_desk_price(db, paras):
	
	pricing = PricingResult(db)
	
	pricing.paras = paras
	pricing.type = PRICING_TYPE_OCTDESK
	pricing.name = paras["name"] + "-报价-" + getCurrentStrDate()
	pricing.withHareware = paras["withHardware"] and 1 or 0
	pricing.points = paras["point"]
	
	pricing.pricing()
	
	ret = pricing.add()
	
	return ret, pricing.toObj()


THINCLIENT_PARAS = {
	"name": "",
	"point": 50,
	"thinClient": "",
	"monitor": "",
	"keyMouse": "",
	"desc": "",
	"timeout": 0
}
def query_thinclient_price(db, paras):

	pricing = PricingResult(db)

	pricing.paras = paras
	pricing.type = PRICING_TYPE_THINCLIENT
	pricing.name = paras["name"] + "-报价-" + getCurrentStrDate()
	pricing.points = paras["point"]

	pricing.thinClient = paras["thinClient"]
	pricing.monitor = paras["monitor"]
	pricing.keyMouse = paras["keyMouse"]

	pricing.pricing_thinclient()

	ret = pricing.add()

	return ret, pricing.toObj()
	

def remove_pricing(db, paras):
	pricing = getPricingResult(db, paras["id"])
	if not pricing:
		return SEGMENT_NOT_EXIST, None
	return pricing.remove(), None
