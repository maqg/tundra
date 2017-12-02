# -*- coding: utf-8 -*-

from modules.pricing.pricing import get_product_types, get_products, get_queryresults, query_desk_price, \
	query_thinclient_price
from utils.commonUtil import buildRetObj


def web_get_product_types(db, env, arg):
	ret, data = get_product_types(db, arg["paras"])
	return buildRetObj(ret, data)


def web_get_products(db, env, arg):
	ret, data = get_products(db, arg["paras"])
	return buildRetObj(ret, data)


def web_get_queryresults(db, env, arg):
	ret, data = get_queryresults(db, arg["paras"])
	return buildRetObj(ret, data)


def web_query_deskprice(db, env, arg):
	ret, data = query_desk_price(db, arg["paras"])
	return buildRetObj(ret, data)


def web_query_thinclientprice(db, env, arg):
	ret, data = query_thinclient_price(db, arg["paras"])
	return buildRetObj(ret, data)