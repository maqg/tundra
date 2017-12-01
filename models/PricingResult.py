# -*- coding: utf-8 -*-

from conf.dbconfig import TB_QUERYRESULT
from core.err_code import DB_ERR, OCT_SUCCESS
from core.log import WARNING, DEBUG
from utils.commonUtil import transToObj, getUuid, transToStr
from utils.timeUtil import getStrTime, get_current_time

PRICING_TYPE_PLATFORM = "PLATFORM"
PRICING_TYPE_OCTCLASS = "OCTCLASS"
PRICING_TYPE_OCTDESK = "OCTDESK"


PRICING_TYPES = {
	PRICING_TYPE_PLATFORM: {
		"name": "八爪鱼私有云管理平台软件",
	},
	PRICING_TYPE_OCTCLASS: {
		"name": "八爪鱼云课堂软件"
	},
	PRICING_TYPE_OCTDESK: {
		"name": "八爪鱼云桌面软件"
	}
}


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
		self.type = PRICING_TYPE_PLATFORM
		self.typeName = ""
		
		self.info = {}
		self.price = 0
		self.points = 0
		self.withHareware = 1
		self.desc = ""
		self.createTime = 0
		
		self.paras = {}
		
		self.summary = ""
		
	def createSummary(self):
		
		self.summary = "总价：%s<br>" % self.price
		
		if not self.withHareware:
			self.summary += "不含硬件<br>"
			
		return self.summary
	
	def init(self):
		cond = "WHERE ID='%s' " % (self.myId)
		
		dbObj = self.db.fetchone(TB_QUERYRESULT, cond)
		if (not dbObj):
			return -1
		
		self.dbObj = dbObj
		
		self.loadFromObj()
		
		return 0
	
	def add(self):
		
		self.myId = getUuid()
		
		obj = {
			"ID": self.myId,
			"QR_Name": self.name,
			"QR_Type": self.type,
			"QR_WithHardware": self.withHareware,
			"QR_Price": self.price,
			"QR_Points": self.points,
			"QR_Paras": transToStr(self.paras),
			"QR_CreateTime": get_current_time(),
			"QR_Description": self.desc,
		}
		
		ret = self.db.insert(TB_QUERYRESULT, obj)
		if (ret == -1):
			WARNING("add user %s error for db operation" % self.name)
			return DB_ERR
		
		DEBUG(obj)
		
		return OCT_SUCCESS
	
	def pricing(self):
		if not self.withHareware:
			self.price += self.points * 1000
	
	def loadFromObj(self):
		self.myId = self.dbObj["ID"]
		self.name = self.dbObj["QR_Name"]
		self.type = self.dbObj["QR_Type"]
		self.price = self.dbObj["QR_Price"]
		self.points = self.dbObj["QR_Points"]
		
		self.info = transToObj(self.dbObj["QR_Info"])
		self.paras = transToObj(self.dbObj["QR_Paras"])
		self.desc = self.dbObj["QR_Description"]
		self.createTime = self.dbObj["QR_CreateTime"]
		
		return 0
	
	def toObj(self):
		
		item = {
			"id": self.myId,
			"name": self.name,
			"type": self.type,
			"price": self.price,
			"points": self.points,
			"typeCN": PRICING_TYPES[self.type]["name"],
			"info": self.info,
			"desc": self.desc,
			"paras": self.paras,
			"summary": self.createSummary(),
			"createTime": getStrTime(self.createTime),
		}
		
		return item
