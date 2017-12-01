# -*- coding: utf-8 -*-

from conf.dbconfig import TB_PRODUCT, TB_QUERYRESULT
from core import dbmysql
from core.err_code import DB_ERR, OCT_SUCCESS
from core.log import ERROR
from models.PricingResult import PricingResult
from models.Product import Product

AUTHKEY_TIMEOUT = 24 * 30 * 60


def get_products(db, paras):
	listObj = {
		"items": [],
		"total": 0,
	}
	type = paras["type"]
	
	cond = "WHERE 1=1 "
	if type:
		cond += "AND P_Type='%s'" % type
	
	ret = db.select(TB_PRODUCT, cond=cond)
	if ret == -1:
		ERROR("get user list error")
		return (DB_ERR, None)
	
	for dur in db.cur:
		obj = dbmysql.row_to_dict(TB_PRODUCT, dur)
		product = Product(db, dbObj=obj)
		product.loadFromObj()
		
		listObj["items"].append(product.toObj())
	
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
