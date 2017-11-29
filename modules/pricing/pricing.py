# -*- coding: utf-8 -*-

from conf.dbconfig import TB_PRODUCT
from core import dbmysql
from core.err_code import DB_ERR, OCT_SUCCESS
from core.log import ERROR
from models.Product import Product

AUTHKEY_TIMEOUT = 24 * 30 * 60


def get_products(db, arg):
	
	listObj = {
		"total": 0,
		"items": [],
	}
	
	start = arg["paras"].get("start") or 0
	limit = arg["paras"].get("limit") or 100
	
	cond = "WHERE 1=1 "
	ret = db.select(TB_PRODUCT, cond=cond, limit=int(limit), offset=int(start))
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


def get_product_types(db, arg):

	listObj = {
		"total": 0,
		"items": [],
	}

	start = arg["paras"].get("start") or 0
	limit = arg["paras"].get("limit") or 100

	cond = "WHERE 1=1 GROUP BY P_Type"
	ret = db.select(TB_PRODUCT, cond=cond, limit=int(limit), offset=int(start))
	if ret == -1:
		ERROR("get user list error")
		return (DB_ERR, None)

	for dur in db.cur:
		obj = dbmysql.row_to_dict(TB_PRODUCT, dur)
		product = Product(db, dbObj=obj)
		product.loadFromObj()

		listObj["items"].append(product.toProductTypeObj())

	listObj["total"] = len(listObj["items"])

	return (OCT_SUCCESS, listObj)