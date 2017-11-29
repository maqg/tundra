# -*- coding: utf-8 -*-

from core import dbmysql
from core.err_code import USER_ALREADY_EXIST, INVALID_PARAS, USER_NOT_EXIST
from models.Account import *

AUTHKEY_TIMEOUT = 24 * 30 * 60


def get_products(db, arg):
	
	listObj = {
		"total": 0,
		"items": [],
	}
	
	start = arg["paras"].get("start") or 0
	limit = arg["paras"].get("limit") or 100
	
	cond = "WHERE 1=1 "
	ret = db.select(TB_ACCOUNT, cond=cond, limit=int(limit), offset=int(start))
	if ret == -1:
		ERROR("get user list error")
		return (DB_ERR, None)
	
	for dur in db.cur:
		obj = dbmysql.row_to_dict(TB_ACCOUNT, dur)
		user = Account(db, dbObj=obj)
		user.loadFromObj()
		
		listObj["users"].append(user.toObj())
	
	listObj["total"] = getAccountCount(db)
	
	return (OCT_SUCCESS, listObj)


def get_product(db, userId):
	user = Account(db, userId)
	
	if (user.init() != 0):
		ERROR("user %s not exist" % userId)
		return (USER_NOT_EXIST, None)
	
	return (OCT_SUCCESS, user.toObj())