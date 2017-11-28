#!usr/bin/python
# -*- coding: utf-8 -*- 

import time
from binascii import crc32 as CRC32

from core import dbmysql
from core.err_code import USER_ALREADY_EXIST, SEGMENT_NOT_EXIST, INVALID_PARAS
from core.log import LVL_ERROR, LVL_INFO
from models.Account import *
from models.Common import DEFAULT_ACCOUNT
from utils.commonUtil import b64_decode

AUTHKEY_TIMEOUT = 24 * 30 * 60


def get_userlist(db):
	user_list = []

	ret = db.select(TB_ACCOUNT, cond="")
	if ret == -1:
		ERROR("get user list error")
		return (DB_ERR, None)

	for dur in db.cur:
		obj = dbmysql.row_to_dict(TB_ACCOUNT, dur)
		temp = {
			"id": obj["ID"],
			"name": obj["U_Name"],
		}
		user_list.append(temp)

	DEBUG(user_list)

	return (OCT_SUCCESS, user_list)


def get_alluser(db, arg):
	listObj = {
		"total": 0,
		"users": [],
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
		user.loadQuota()

		listObj["users"].append(user.toObj())

	listObj["total"] = getAccountCount(db)

	return (OCT_SUCCESS, listObj)


def get_user(db, userId):
	user = Account(db, userId)

	if (user.init() != 0):
		ERROR("user %s not exist" % userId)
		return (USER_NOT_EXIST, None)

	return (OCT_SUCCESS, user.toObj())


def add_user(db, arg):
	
	paras = arg["paras"]
	
	account = paras["account"]

	user = getAccount(db, userName=account)
	if (user):
		WARNING("user %s already exist" % account)
		return USER_ALREADY_EXIST

	user = Account(db)

	user.name = account
	user.password = b64_decode(paras["password"])

	if (not user.name or not user.password):
		ERROR("not username or password specified")
		return NOT_ENOUGH_PARAS

	user.email = paras["email"]
	user.phone = paras["phoneNumber"]

	user.quotaId = getUuid()
	quota = Quota(db, user.quotaId)

	quota.name = "Quota_for_%s" % user.name

	quota.add()

	ret = user.add()

	return ret

def delete_user(db, args):
	
	userId = args["paras"]["id"]
	account = args["env"].get("USERNAME")
	
	user = getAccount(db, userId=userId)
	if (not user):
		ERROR("account %s not exist" % (userId))
		return USER_NOT_EXIST

	if (user.name == DEFAULT_ACCOUNT):
		ERROR("account %s is super admin, forbid delete." % (userId))
		return INVALID_PARAS

	return user.delete()


def reset_password(db, arg):
	
	paras = arg["paras"]
	
	user = getAccount(db, userId=paras["id"])
	if (not user):
		ERROR("user %s not exist" % (paras["id"]))
		return USER_NOT_EXIST
	
	return user.resetPassword(b64_decode(paras["password"]))


def update_user(db, arg):
	
	user = getAccount(db, userId=arg["paras"].get("id"))
	if (not user):
		ERROR("user %s not exist" % (arg["paras"].get("id")))
		return USER_NOT_EXIST

	user.email = arg["paras"].get("email") or ""
	user.phone = arg["paras"].get("phoneNumber") or ""

	return user.update()


def change_password(db, arg):
	
	paras = arg["paras"]
	
	user = getAccount(db, userId=paras["id"])
	if (not user):
		ERROR("user %s not exist" % (paras["id"]))
		return USER_NOT_EXIST
	
	return user.changePassword(b64_decode(paras["oldPassword"]),
	                           b64_decode(paras["newPassword"]))


def getAccountByName(db, name):
	return getAccount(db, userName=name)


def getAccountByLdapId(db, uid):
	return getAccount(db, uid=uid)


def getAccountByUkey(db, ukey):
	return getAccountWithUkey(db, ukey=ukey)


def check_timestamp(incomingTime):
	currentTime = int(time.time())
	if (abs(currentTime - int(incomingTime)) > AUTHKEY_TIMEOUT):  # 30 minutes
		ERROR("Timestamp check error [%s]" % (incomingTime))
		return False

	return True


def check_CRC(rand, user, client, timestamp, crc):
	CRCStr = rand + user + client + timestamp
	CRCStr += "OCTopus Link OAuth"
	CRCValue = CRC32(CRCStr) & 0xffffffff
	if (CRCValue != int(crc)):
		ERROR("CRC check error [%s]" % (CRCStr))
		return False

	return True


def check_Client_CRC(rand, timestamp, crc):
	CRCStr = rand + timestamp
	CRCStr += "OCTopus Link OAuth"
	CRCValue = CRC32(CRCStr) & 0xffffffff
	if (CRCValue != int(crc)):
		ERROR("CRC check error [%s]" % (CRCStr))
		return False

	return True


def bind_ldapuid(db, arg):
	
	paras = arg["paras"]
	uid = paras["uid"]
	
	user = getAccount(db, userId=paras["id"])
	if (not user):
		ERROR("user %s not exist" % (paras["id"]))
		return USER_NOT_EXIST
	
	ldapUser = getAccountByLdapId(db, uid)
	if ldapUser and ldapUser.myId != user.myId:
		ERROR("ldap uid %s already bond to another account of %s" % (uid, ldapUser.name))
		return LDAPUID_ALREADY_BOUND
	
	user.ldapUid = paras["uid"]
	
	return user.bindLdapUid()


def unbind_ldapuid(db, arg):
	paras = arg["paras"]
	
	user = getAccount(db, userId=paras["id"])
	if (not user):
		ERROR("user %s not exist" % (paras["id"]))
		return USER_NOT_EXIST
	
	return user.unbindLdapUid()


def bind_ukey(db, arg):
	paras = arg["paras"]
	
	user = getAccount(db, userId=paras["id"])
	if (not user):
		ERROR("user %s not exist" % (paras["id"]))
		return USER_NOT_EXIST
	
	ukeyUser = getAccountByUkey(db, paras["ukey"])
	if ukeyUser and ukeyUser.myId != user.myId:
		ERROR("uid %s already bond to another user of %s" % (paras["ukey"], ukeyUser.name))
		return SEGMENT_NOT_EXIST
	
	user.ukey = paras["ukey"]
	
	return user.bindUkey()


def unbind_ukey(db, arg):
	paras = arg["paras"]
	
	user = getAccount(db, userId=paras["id"])
	if (not user):
		ERROR("user %s not exist" % (paras["id"]))
		return USER_NOT_EXIST
	
	return user.unbindUkey()
