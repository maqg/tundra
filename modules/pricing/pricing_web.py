# -*- coding: utf-8 -*-

from modules.pricing.pricing import get_product_types, get_products, get_queryresults, query_desk_price, \
	query_thinclient_price, update_product, remove_product, update_product_price, add_product, remove_pricing, \
	query_server_price, query_platformsoft_price, query_desksoft_price, query_classsoft_price
from utils.commonUtil import buildRetObj


def web_get_product_types(db, env, arg):
	ret, data = get_product_types(db, arg["paras"])
	return buildRetObj(ret, data)


def web_get_products(db, env, arg):
	ret, data = get_products(db, arg["paras"])
	return buildRetObj(ret, data)


def web_add_product(db, env, arg):
	ret, data = add_product(db, arg["paras"])
	return buildRetObj(ret, data)


def web_remove_product(db, env, arg):
	ret, data = remove_product(db, arg["paras"])
	return buildRetObj(ret, data)


def web_update_product(db, env, arg):
	ret, data = update_product(db, arg["paras"])
	return buildRetObj(ret, data)


def web_update_productprice(db, env, arg):
	ret, data = update_product_price(db, arg["paras"])
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


def web_query_serverprice(db, env, arg):
	ret, data = query_server_price(db, arg["paras"])
	return buildRetObj(ret, data)


def web_query_platformsoftprice(db, env, arg):
	ret, data = query_platformsoft_price(db, arg["paras"])
	return buildRetObj(ret, data)


def web_query_desksoftprice(db, env, arg):
	ret, data = query_desksoft_price(db, arg["paras"])
	return buildRetObj(ret, data)


def web_query_classsoftprice(db, env, arg):
	ret, data = query_classsoft_price(db, arg["paras"])
	return buildRetObj(ret, data)


def web_remove_pricing(db, env, arg):
	ret, data = remove_pricing(db, arg["paras"])
	return buildRetObj(ret, data)
