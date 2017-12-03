# -*- coding: utf-8 -*-

from conf.dbconfig import TB_PRODUCT
from core.err_code import DB_ERR
from core.log import WARNING
from utils.commonUtil import transToObj, transToStr
from utils.timeUtil import get_current_time, getStrTime


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

		self.info = None
		self.infoObj = {}

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
		self.infoObj = transToObj(self.dbObj["P_Info"])
		self.info = ProductInfo(self.type, self.infoObj)
		self.desc = self.dbObj["P_Description"]
		self.state = self.dbObj["P_State"]

		self.lastSync = self.dbObj["P_LastSync"]
		self.createTime = self.dbObj["P_CreateTime"]

		return 0
	
	def remove(self):
		cond = "WHERE ID='%s'" % (self.myId)
		self.db.delete(TB_PRODUCT, cond=cond)
		return 0
	
	def update(self):
		
		self.infoObj["name"] = self.name
		
		userObj = {
			"P_Name": self.name,
			"P_State": self.state,
			"P_Info": transToStr(self.infoObj),
			"P_LastSync": get_current_time(),
			"P_Description": self.desc
		}
		
		cond = "WHERE ID='%s'" % self.myId
		ret = self.db.update(TB_PRODUCT, userObj, cond=cond)
		if (ret == -1):
			WARNING("update user %s error for db operation" % self.name)
			return DB_ERR
		
		return 0
	
	def updatePrice(self):
		
		userObj = {
			"P_Info": transToStr(self.infoObj),
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
		item = {
			"id": self.myId,
			"name": self.name,

			"type": self.type,
			"typeName": self.typeName,

			"state": self.state,

			"infoObj": self.infoObj,
			"desc": self.desc,

			"lastSync": getStrTime(self.lastSync),
			"createTime": getStrTime(self.createTime),
		}
		
		return item
	
	def toObjBrief(self):
		
		return {
			"id": self.myId,
			"type": self.type,
			"name": self.name,
		}


class ProductInfo:
	def __init__(self, type, infoObj):

		self.info = infoObj

		self.myid = infoObj["id"]
		self.name = infoObj["name"]
		self.type = type
		self.provider = infoObj.get("providor") or "未知"
		self.model = infoObj.get("model") or ""
		self.capacity = infoObj.get("capacity") or ""
		self.desc = infoObj.get("desc") or ""
		self.price = infoObj.get("price") or 0

	def toObj(self):
		return self.info
