# -*- coding: utf-8 -*-

from modules.pricing.pricing import get_product_types, get_products
from utils.commonUtil import buildRetObj


def web_get_product_types(db, env, arg):
	ret, data = get_product_types(db, arg)
	return buildRetObj(ret, data)


def web_get_products(db, env, arg):
	ret, data = get_products(db, arg)
	return buildRetObj(ret, data)


def web_query_deskprice(db, env, arg):
	ret, data = get_products(db, arg)
	return buildRetObj(ret, data)