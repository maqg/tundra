# -*- coding: utf-8 -*-

from conf.dbconfig import TB_QUERYRESULT
from core.log import WARNING
from utils.commonUtil import transToObj
from utils.timeUtil import getStrTime


def getPricingResult(db, myId):
	cond = "WHERE ID='%s'" % (myId)
	
	dbObj = db.fetchone(TB_QUERYRESULT, cond=cond)
	if (not dbObj):
		WARNING("product %s not exist" % cond)
		return None
	
	obj = PricingResult(db, dbObj=dbObj)
	obj.loadFromObj()
	
	return obj


class PricingResult:
	def __init__(self, db=None, myId=None, dbObj=None):
		self.db = db
		self.myId = myId
		self.dbObj = dbObj
		
		self.name = ""
		self.type = ""
		self.typeName = ""
		
		self.info = {}
		self.desc = ""
		self.createTime = 0
	
	def init(self):
		cond = "WHERE ID='%s' " % (self.myId)
		
		dbObj = self.db.fetchone(TB_QUERYRESULT, cond)
		if (not dbObj):
			return -1
		
		self.dbObj = dbObj
		
		self.loadFromObj()
		
		return 0
	
	def loadFromObj(self):
		self.myId = self.dbObj["ID"]
		self.name = self.dbObj["QR_Name"]
		self.type = self.dbObj["QR_Type"]
		
		self.info = transToObj(self.dbObj["QR_Info"])
		self.desc = self.dbObj["QR_Description"]
		self.createTime = self.dbObj["QR_CreateTime"]
		
		return 0
	
	def toObj(self):
		item = {
			"id": self.myId,
			"name": self.name,
			"type": self.type,
			"info": self.info,
			"desc": self.desc,
			"createTime": getStrTime(self.createTime),
		}
		
		return item
