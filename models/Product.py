# -*- coding: utf-8 -*-

from conf.dbconfig import TB_ACCOUNT
from core.err_code import DB_ERR
from core.log import WARNING
from utils.timeUtil import get_current_time, howLongAgo, getStrTime


def getProduct(db, userId=None, userName=None, uid=None):
	if (not userId and not userName and not uid):
		return None
	
	if (userId):
		cond = "WHERE ID='%s'" % (userId)
	elif userName:
		cond = "WHERE U_Name='%s'" % (userName)
	else:
		cond = "WHERE U_LdapUid='%s'" % (uid)
	
	dbObj = db.fetchone(TB_ACCOUNT, cond=cond)
	if (not dbObj):
		WARNING("user %s not exist" % cond)
		return None
	
	user = Product(db, dbObj=dbObj)
	user.loadFromObj()
	
	return user


class Product:
	def __init__(self, db=None, uid=None, name=None, dbObj=None):
		
		self.db = db
		self.myId = uid
		self.name = name
		self.dbObj = dbObj
		
		self.role = 0
		self.email = ""
		self.password = ""
		self.phone = ""
		self.state = 1
		self.stateCN = ""
		self.roleCN = ""
		
		self.lastLogin = 0
		self.lastSync = 0
		self.createTime = 0
		
		self.ukey = ""
		self.ldapUid = ""
	
	def init(self):
		
		if (self.myId != 0):
			cond = "WHERE ID='%s' " % (self.myId)
		else:
			cond = "WHERE U_Name='%s' " % (self.name)
		
		dbObj = self.db.fetchone(TB_ACCOUNT, cond)
		if (not dbObj):
			return -1
		
		self.dbObj = dbObj
		
		self.loadFromObj()
		
		return 0
	
	def loadFromObj(self):
		
		self.myId = self.dbObj["ID"]
		self.name = self.dbObj["U_Name"]
		self.email = self.dbObj["U_Email"]
		self.phone = self.dbObj["U_PhoneNumber"]
		self.password = self.dbObj["U_Password"]
		self.state = self.dbObj["U_State"]
		self.role = self.dbObj["U_Type"]
		self.lastLogin = self.dbObj["U_LastLogin"]
		self.lastSync = self.dbObj["U_LastSync"]
		self.createTime = self.dbObj["U_CreateTime"]
		self.ukey = self.dbObj["U_UKey"]
		self.ldapUid = self.dbObj["U_LdapUid"]
		
		return 0
	
	def update(self):
		
		userObj = {
			"U_Email": self.email,
			"U_PhoneNumber": self.phone,
			"U_UKey": self.ukey,
			"U_LastSync": get_current_time(),
		}
		
		cond = "WHERE ID='%s'" % self.myId
		ret = self.db.update(TB_ACCOUNT, userObj, cond=cond)
		if (ret == -1):
			WARNING("update user %s error for db operation" % self.name)
			return DB_ERR
		
		return 0
	
	def toObj(self):
		account = {
			"id": self.myId,
			"name": self.name,
			"email": self.email,
			"phone": self.phone,
			"state": self.state,
			"lastLogin": howLongAgo(self.lastLogin),
			"lastSync": getStrTime(self.lastSync),
			"createTime": getStrTime(self.createTime),
			"ukey": self.ukey,
			"ldapUid": self.ldapUid,
			"role": self.role,
			"roleCN": self.roleCN,
			"stateCN": self.stateCN
		}
		
		return account
	
	def toObjBrief(self):
		
		return {
			"id": self.myId,
			"name": self.name,
		}
