# -*- coding: utf-8 -*-

from conf.dbconfig import TB_QUERYRESULT
from core.err_code import DB_ERR, OCT_SUCCESS
from core.log import WARNING, DEBUG
from models.Product import getProduct, getPlatformProduct, getSoftProduct
from utils.commonUtil import transToObj, getUuid, transToStr
from utils.timeUtil import getStrTime, get_current_time

PRICING_TYPE_PLATFORM = "PLATFORM"
PRICING_TYPE_OCTCLASS = "OCTCLASS"
PRICING_TYPE_OCTDESK = "OCTDESK"
PRICING_TYPE_PLATFORM_SOFT = "PLATFORMSOFT"
PRICING_TYPE_OCTCLASS_SOFT = "OCTCLASSSOFT"
PRICING_TYPE_OCTDESK_SOFT = "OCTDESKSOFT"
PRICING_TYPE_THINCLIENT = "THINCLIENT"
PRICING_TYPE_SERVER = "SERVER"


PRICING_TYPES = {
	PRICING_TYPE_PLATFORM: {
		"name": "私有云软硬一体",
	},
	PRICING_TYPE_OCTCLASS: {
		"name": "云课堂软硬一体"
	},
	PRICING_TYPE_OCTDESK: {
		"name": "云桌面软硬一体"
	},
	PRICING_TYPE_PLATFORM_SOFT: {
		"name": "私有云软件",
	},
	PRICING_TYPE_OCTCLASS_SOFT: {
		"name": "云课堂软件"
	},
	PRICING_TYPE_OCTDESK_SOFT: {
		"name": "云桌面软件"
	},
	PRICING_TYPE_THINCLIENT: {
		"name": "云终端硬件"
	},
	PRICING_TYPE_SERVER: {
		"name": "服务器硬件"
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
		
		self.pointCpu = 0
		self.pointMemory = 0
		self.pointDisk = 0

		self.thinClient = None
		self.thinclientCount = 0
		
		self.allinone = None
		self.allinoneCount = 0

		self.monitor = None
		self.monitorCount = 0

		self.keyMouse = None
		self.keymouseCount = 0
		
		self.ukey = None
		self.ukeyCount = 0
		
		self.infrastructure = None
		self.infrastructureCount = 0
		
		self.cpu = None
		self.cpuCount = 0
		
		self.hostCount = 0
		
		self.memory = None
		self.memoryCount = 0
		
		self.raid = None
		self.raidCount = 0
		
		self.disk = None
		self.diskCount = 0
		
		self.switch = None
		self.switchCount = 0
		
		self.wifiRouter = None
		self.wifiRouterCount = 0

		self.desc = ""
		self.createTime = 0
		
		self.paras = {}
		
	def init(self):
		cond = "WHERE ID='%s' " % (self.myId)
		
		dbObj = self.db.fetchone(TB_QUERYRESULT, cond)
		if (not dbObj):
			return -1
		
		self.dbObj = dbObj
		
		self.loadFromObj()
		
		return 0
	
	def remove(self):
		cond = "WHERE ID='%s'" % (self.myId)
		self.db.delete(TB_QUERYRESULT, cond=cond)
		return 0
	
	def add(self):
		
		self.myId = getUuid()
		
		obj = {
			"ID": self.myId,
			"QR_Name": self.name,
			"QR_Type": self.type,
			"QR_Price": self.price,
			"QR_Points": self.points,
			"QR_Info": transToStr(self.info),
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
	
	def pricing(self, type):
		
		self.pricing_software(type)
		
		self.info["points"] = self.points
		self.info["pointCpu"] = self.pointCpu
		self.info["pointMemory"] = self.pointMemory
		self.info["pointDisk"] = self.pointDisk
		
		self.appendSummaryItem(getProduct(self.db, self.infrastructure), self.infrastructureCount)
		self.appendSummaryItem(getProduct(self.db, self.cpu), self.cpuCount)
		self.appendSummaryItem(getProduct(self.db, self.memory), self.memoryCount)
		self.appendSummaryItem(getProduct(self.db, self.disk), self.diskCount)
		
		self.appendSummaryItem(getProduct(self.db, self.raid), self.raidCount)
		self.appendSummaryItem(getProduct(self.db, self.ukey), self.ukeyCount)
		self.appendSummaryItem(getProduct(self.db, self.switch), self.switchCount)
		self.appendSummaryItem(getProduct(self.db, self.wifiRouter), self.wifiRouterCount)
		
		self.appendSummaryItem(getProduct(self.db, self.thinClient), self.points)
		self.appendSummaryItem(getProduct(self.db, self.monitor), self.points)
		self.appendSummaryItem(getProduct(self.db, self.keyMouse), self.points)
		
		self.info["price"] = self.price
	
	def appendSummaryItem(self, product, count):
		if not product:
			return
		
		item = {
			"name": product.name,
			"id": product.myId,
			"count": count,
			"price": product.info.price,
			"capacity": product.info.capacity,
			"type": product.type,
			"typeName": product.typeName,
			"totalPrice": count * product.info.price
		}
		self.price += count * product.info.price
		self.info["items"].append(item)
	
	def pricing_thinclient(self):
		self.info["points"] = self.points
		self.info["items"] = []
		self.appendSummaryItem(getProduct(self.db, self.thinClient), self.points)
		self.appendSummaryItem(getProduct(self.db, self.monitor), self.points)
		self.appendSummaryItem(getProduct(self.db, self.keyMouse), self.points)
		self.info["price"] = self.price
		
	def pricing_server(self):
		self.info["points"] = self.points
		self.info["items"] = []
		self.appendSummaryItem(getProduct(self.db, self.infrastructure), self.infrastructureCount)
		self.appendSummaryItem(getProduct(self.db, self.cpu), self.cpuCount)
		self.appendSummaryItem(getProduct(self.db, self.memory), self.memoryCount)
		self.appendSummaryItem(getProduct(self.db, self.disk), self.diskCount)
		self.appendSummaryItem(getProduct(self.db, self.raid), self.raidCount)
		self.info["price"] = self.price
		
	def pricing_software(self, softwareType):
		
		self.info["points"] = self.points
		self.info["items"] = []
		
		platform = getSoftProduct(self.db, softwareType)
		if platform.info.basePrice:
			item = {
				"name": platform.name + "-软件授权",
				"id": platform.myId,
				"count": 1,
				"price": platform.info.basePrice,
				"type": platform.type,
				"typeName": platform.typeName,
				"totalPrice": platform.info.basePrice
			}
			self.price += platform.info.basePrice
			self.info["items"].append(item)
			
		if platform.info.pointPrice and self.points:
			item = {
				"name": platform.name + "-点位授权",
				"id": platform.myId,
				"count": self.points,
				"price": platform.info.pointPrice,
				"type": platform.type,
				"typeName": platform.typeName,
				"totalPrice": platform.info.pointPrice * self.points
			}
			self.price += platform.info.pointPrice * self.points
			self.info["items"].append(item)
			
		if platform.info.hostPrice and self.hostCount:
			item = {
				"name": platform.name + "-物理主机授权",
				"id": platform.myId,
				"count": self.hostCount,
				"price": platform.info.hostPrice,
				"type": platform.type,
				"typeName": platform.typeName,
				"totalPrice": platform.info.hostPrice * self.hostCount
			}
			self.price += platform.info.hostPrice * self.hostCount
			self.info["items"].append(item)

		if platform.info.cpuPrice and self.cpuCount:
			item = {
				"name": platform.name + "-CPU授权",
				"id": platform.myId,
				"count": self.cpuCount,
				"price": platform.info.cpuPrice,
				"type": platform.type,
				"typeName": platform.typeName,
				"totalPrice": platform.info.cpuPrice * self.cpuCount
			}
			self.price += platform.info.cpuPrice * self.cpuCount
			self.info["items"].append(item)

		self.info["price"] = self.price
	
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
			"createTime": getStrTime(self.createTime),
		}
		
		return item
