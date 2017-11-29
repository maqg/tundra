#!/usr/bin/python3
# -*- coding: utf-8 -*-

import json	
import time
import sys 

sys.path.append("../")

from utils.commonUtil import fileToObj, getUuid, transToStr

now = int(time.time() * 1000)

def createSql(productType, obj):

	sql = "INSERT INTO tb_product ('ID', 'P_Name', 'P_Type', 'P_TypeName') VALUES ("
	sql += "'%s'" % getUuid()

	typeName = obj["name"]
	products = obj["products"]

	for product in products:
		sql += ",'%s'" % product["name"]
		sql += ",'%s'" % productType
		sql += ",'%s'" % typeName
		print(transToStr(products))
		print("ok")
		sql += ",'%s'" % str(transToStr(products)),
		print(transToStr(products))
		sql += ",'%ld'" % now
		sql += ",'%ld'" % now


	sql += ");\n"

	return sql

if __name__ == '__main__':

	sql = ""

	prices = fileToObj("../prices.json")

	for (k, v) in prices.items():
		sql += createSql(k, v)

	print(sql)
