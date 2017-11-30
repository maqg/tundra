# -*- coding: utf-8 -*-

from conf.dbconfig import TB_PRODUCT
from core import dbmysql
from core.err_code import DB_ERR, OCT_SUCCESS
from core.log import ERROR
from models.Product import Product

AUTHKEY_TIMEOUT = 24 * 30 * 60


def get_products(db, arg):
	items = []
	type = arg["type"]
	
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
		
		items.append(product.toObj())
	
	return (OCT_SUCCESS, items)


def get_product_types(db, arg):
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
