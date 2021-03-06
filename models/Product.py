# -*- coding: utf-8 -*-

from conf.dbconfig import TB_PRODUCT
from core.err_code import DB_ERR, OCT_SUCCESS
from core.log import WARNING, DEBUG
from utils.commonUtil import transToObj, transToStr, getUuid
from utils.timeUtil import get_current_time, getStrTime


PRODUCT_TYPE_CPU = "CPU"
PRODUCT_TYPE_MEMORY = "MEMORY"
PRODUCT_TYPE_THINCIENT = "THINCLIENT"
PRODUCT_TYPE_DISK = "DISK"
PRODUCT_TYPE_RAID = "RAID"
PRODUCT_TYPE_INFRASTRUCTURE = "INFRASTRUCTURE"
PRODUCT_TYPE_MONITOR = "MONITOR"
PRODUCT_TYPE_KEYMOUSE = "KEYMOUSE"
PRODUCT_TYPE_SWITCH = "SWITCH"
PRODUCT_TYPE_UKEY = "UKEY"
PRODUCT_TYPE_WIFIROUTER = "WIFIROUTER"
PRODUCT_TYPE_SOFTWARE = "SOFTWARE"
PRODUCT_TYPE_ALLINONE = "ALLINONE"
PRODUCT_TYPE_SERVICE = "SERVICE"

PRODUCT_TYPES = {
	PRODUCT_TYPE_INFRASTRUCTURE: "硬件平台",
	PRODUCT_TYPE_CPU: "CPU",
	PRODUCT_TYPE_MEMORY: "内存",
	PRODUCT_TYPE_DISK: "磁盘",
	PRODUCT_TYPE_RAID: "RAID卡",
	PRODUCT_TYPE_ALLINONE: "终端一体机",
	PRODUCT_TYPE_THINCIENT: "瘦客户机 云终端",
	PRODUCT_TYPE_MONITOR: "显示器",
	PRODUCT_TYPE_KEYMOUSE: "键鼠套装",
	PRODUCT_TYPE_UKEY: "UKEY",
	PRODUCT_TYPE_SWITCH: "交换机",
	PRODUCT_TYPE_WIFIROUTER: "无线路由器",
	PRODUCT_TYPE_SOFTWARE: "软件平台",
	PRODUCT_TYPE_SERVICE: "售后服务",
}


def getProduct(db, myId):
	if not myId:
		return None
	
	cond = "WHERE ID='%s'" % (myId)

	dbObj = db.fetchone(TB_PRODUCT, cond=cond)
	if (not dbObj):
		WARNING("product %s not exist" % cond)
		return None
	
	obj = Product(db, dbObj=dbObj)
	obj.loadFromObj()
	
	return obj


def getSoftProduct(db, key):
	cond = "WHERE P_Type='%s' AND P_Info LIKE '%%%s%%'" % (PRODUCT_TYPE_SOFTWARE, key)
	dbObj = db.fetchone(TB_PRODUCT, cond=cond)
	if (not dbObj):
		WARNING("product %s not exist" % cond)
		return None
	
	obj = Product(db, dbObj=dbObj)
	obj.loadFromObj()
	
	return obj

SOFTWARE_TYPE_PLATFORM = "PLATFORM"
SOFTWARE_TYPE_OCTDESK = "OCTDESK"
SOFTWARE_TYPE_OCTCLASS = "OCTCLASS"


def getPlatformProduct(db):
	return getSoftProduct(db, SOFTWARE_TYPE_PLATFORM)


def getDeskProduct(db):
	return getSoftProduct(db, SOFTWARE_TYPE_OCTDESK)


def getClassProduct(db):
	return getSoftProduct(db, SOFTWARE_TYPE_OCTCLASS)


class Product:
	def __init__(self, db=None, myId=None, name=None, dbObj=None):
		
		self.db = db
		self.myId = myId
		self.name = name
		self.dbObj = dbObj
		
		self.state = "Enabled"
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
	
	def add(self):
		
		self.myId = getUuid()
		
		obj = {
			"ID": self.myId,
			"P_Name": self.name,
			"P_Type": self.type,
			"P_TypeName": PRODUCT_TYPES[self.type],
			"P_Description": self.desc,
			"P_Info": transToStr(self.infoObj),
			"P_CreateTime": get_current_time(),
			"P_LastSync": get_current_time()
		}
		
		ret = self.db.insert(TB_PRODUCT, obj)
		if (ret == -1):
			WARNING("add product %s error for db operation" % self.name)
			return DB_ERR
		
		DEBUG(obj)
		
		return OCT_SUCCESS
	
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
		self.capacity = infoObj.get("capacity") or 0
		
		if infoObj.get("basePrice"):
			self.basePrice = infoObj.get("basePrice")
		else:
			self.basePrice = 0
			
		if infoObj.get("hostPrice"):
			self.hostPrice = infoObj.get("hostPrice")
		else:
			self.hostPrice = 0
			
		if infoObj.get("cpuPrice"):
			self.cpuPrice = infoObj.get("cpuPrice")
		else:
			self.cpuPrice = 0
			
		if infoObj.get("pointPrice"):
			self.pointPrice = infoObj.get("pointPrice")
		else:
			self.pointPrice = 0
			
		if infoObj.get("cores"):
			self.cores = infoObj.get("cores")
			
		if infoObj.get("threads"):
			self.threads = infoObj.get("threads")
			
		if infoObj.get("frequency"):
			self.frequency = infoObj.get("frequency")
		
		self.desc = infoObj.get("desc") or ""
		self.price = infoObj.get("price") or 0

	def toObj(self):
		return self.info
