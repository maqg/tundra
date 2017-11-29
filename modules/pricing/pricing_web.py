# -*- coding: utf-8 -*-

from modules.pricing import *
from utils.commonUtil import buildRetObj


def web_get_user(db, env, arg):
	userId = arg["paras"].get("id")
	if userId == None:
		ret, data = userService.get_alluser(db, arg)
	else:
		ret, data = userService.get_user(db, userId)
	
	return buildRetObj(ret, data)