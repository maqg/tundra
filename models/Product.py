# -*- coding: utf-8 -*-

from conf.dbconfig import TB_PRODUCT
from core.err_code import DB_ERR
from core.log import WARNING
from utils.commonUtil import transToObj, transToStr
from utils.timeUtil import get_current_time, howLongAgo, getStrTime


def getProduct(db, myId):
	cond = "WHERE ID='%s'" % (myId)

	dbObj = db.fetchone(TB_PRODUCT, cond=cond)
	if (not dbObj):
		WARNING("product %s not exist" % cond)
		return None
	
	obj = Product(db, dbObj=dbObj)
	obj.loadFromObj()
	
	return obj


class Product:
	def __init__(self, db=None, myId=None, name=None, dbObj=None):
		
		self.db = db
		self.myId = myId
		self.name = name
		self.dbObj = dbObj
		
		self.state = 1
		self.stateCN = ""

		self.type = ""
		self.typeName = ""

		self.info = {}
		self.desc = ""

		self.lastSync = 0
		self.createTime = 0

	def init(self):
		
		if (self.myId != 0):
			cond = "WHERE ID='%s' " % (self.myId)
		else:
			cond = "WHERE U_Name='%s' " % (self.name)
		
		dbObj = self.db.fetchone(TB_PRODUCT, cond)
		if (not dbObj):
			return -1
		
		self.dbObj = dbObj
		
		self.loadFromObj()
		
		return 0
	
	def loadFromObj(self):
		
		self.myId = self.dbObj["ID"]
		self.name = self.dbObj["P_Name"]

		self.type = self.dbObj["P_Type"]
		self.typeName = self.dbObj["P_TypeName"]
		self.info = transToObj(self.dbObj["P_Info"])
		self.desc = self.dbObj["P_Description"]
		self.state = self.dbObj["P_State"]

		self.lastSync = self.dbObj["P_LastSync"]
		self.createTime = self.dbObj["P_CreateTime"]

		return 0
	
	def update(self):
		
		userObj = {
			"P_Info": transToStr(self.info),
			"P_LastSync": get_current_time(),
			"P_Description": self.desc
		}
		
		cond = "WHERE ID='%s'" % self.myId
		ret = self.db.update(TB_PRODUCT, userObj, cond=cond)
		if (ret == -1):
			WARNING("update user %s error for db operation" % self.name)
			return DB_ERR
		
		return 0


	def toProductTypeObj(self):
		return {
			"type": self.type,
			"name": self.typeName
		}

	
	def toObj(self):
		account = {
			"id": self.myId,
			"name": self.name,

			"type": self.type,
			"typeName": self.typeName,

			"state": self.state,

			"info": self.info,
			"desc": self.desc,

			"lastSync": howLongAgo(self.lastSync),
			"createTime": getStrTime(self.createTime),
		}
		
		return account
	
	def toObjBrief(self):
		
		return {
			"id": self.myId,
			"name": self.name,
		}


class ProductType:
	def __init__(self, db=None, type="", name=""):
		self.db = db
		self.type = type
		self.name = name

	def toObj(self):
		return {
			"type": self.type,
			"name": self.name
		}
