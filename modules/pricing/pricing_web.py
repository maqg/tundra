# -*- coding: utf-8 -*-

from modules.pricing.pricing import get_product_types
from utils.commonUtil import buildRetObj


def web_get_product_types(db, env, arg):
	ret, data = get_product_types(db, arg)
	return buildRetObj(ret, data)