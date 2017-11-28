#!/usr/bin/python
# -*- coding: utf-8 -*-

import http.client
import json
import ssl
import time

import sys
sys.path.append("/OCT/OCTFrame")

from conf.config import VR_PORT, SERVER_PORT, OCTBS_PORT, API_TEST_KEY, CONSOLEPROXY_PORT, CEPHPS_PORT
from models.ApiResponse import ApiResponse
from utils.commonUtil import buildRetObj
from views.api.center.api import PARAM_NOT_NULL
from core.err_code import CONNECT_SERVER_ERR


def api_result(address, port, task_id, https=False):
	conn = http.client.HTTPConnection(address, port)
	conn.request("GET", "/api/result/%s/" % task_id)
	response = conn.getresponse()
	if response.status != 200:
		return (1, None)

	rsp_body = response.read()
	try:
		rsp = json.loads(rsp_body)
	except:
		return (2, None)

	return (0, rsp)


def api_result_server(address, port, task_id, https=False):
	return api_result(address, port, task_id, https)


def api_call(address, port, api_id, api_content, session_key, async=False, server=False, https=False):

	if https:
		if hasattr(ssl, '_create_unverified_context'):
			sslContext = ssl._create_unverified_context()
		else:
			sslContext = None
		conn = http.client.HTTPSConnection(address, port, context=sslContext, check_hostname=None, timeout=30)
	else:
		conn = http.client.HTTPConnection(address, port, timeout=30)

	headers = { "Content-Type": "application/json" }

	api_body = {
		"api": api_id,
		"paras": api_content,
		"async": async,
	}

	if session_key:
		if (server):
			api_body["session"] = {
				"skey": session_key
			}
		else:
			api_body["session"] = {
				"uuid": session_key
			}

	try:
		conn.request("POST", "/api/", json.dumps(api_body))
	except:
		return (CONNECT_SERVER_ERR, None)

	response = conn.getresponse()

	if response.status != 200:
		return (1, None)

	rsp_body = response.read()
	if type(rsp_body) == type(b'a'):
		rsp_body = rsp_body.decode()

	try:
		rsp = json.loads(rsp_body)
	except:
		return (2, None)

	if (not async or rsp["data"]["state"] in ["Finished", "Failed"]):
		return (0, rsp)

	task_id = rsp["apiId"]

	def query_until_done():
		conn.request("GET", "/api/result/%s" % task_id)
		response = conn.getresponse()
		if response.status != 200:
			return (3, None)

		rsp_body = response.read()
		rsp = json.loads(rsp_body)
		if (rsp["data"]["state"] in ["Finished", "Failed"]):
			return json.loads(0, rsp)

		time.sleep(1)
		return query_until_done()

	return query_until_done()


def parse_paras(paras, api_proto):
	for (k, v) in list(api_proto["paras"].items()):

		inV = paras.get(k)
		if (v["default"] == PARAM_NOT_NULL and not inV):
			errorMsg = "paras \"%s\" must be specified" % k
			return False, errorMsg
	return 0, None


def get_server_key():
	return API_TEST_KEY


def api_call_server(address, paras, api_proto, port=SERVER_PORT, async=False, https=False):
	(ret, errorLog) = parse_paras(paras, api_proto)
	if (ret):
		retObj = buildRetObj(ret, data=None, errorLog=errorLog)
		return ApiResponse(ret, retObj)
	(ret, resp) = api_call(address, port, api_proto["apikey"], paras, get_server_key(), async, server=True, https=https)
	return ApiResponse(ret, resp)


def api_call_vr(address, paras, api_proto, port=VR_PORT, async=False, https=False):
	(ret, errorLog) = parse_paras(paras, api_proto)
	if (ret):
		retObj = buildRetObj(ret, data=None, errorLog=errorLog)
		return ApiResponse(ret, retObj)

	(ret, resp) = api_call(address, port, api_proto["apikey"], paras, get_server_key(), async, server=True, https=https)
	return ApiResponse(ret, resp)


def api_call_octbs(address, paras, api_proto, port=OCTBS_PORT, async=False, https=False):
	(ret, errorLog) = parse_paras(paras, api_proto)
	if (ret):
		retObj = buildRetObj(ret, data=None, errorLog=errorLog)
		return ApiResponse(ret, retObj)

	(ret, resp) = api_call(address, port, api_proto["apikey"], paras, get_server_key(), async, server=True, https=https)
	return ApiResponse(ret, resp)

def api_call_consoleproxy(address, paras, api_proto, port=CONSOLEPROXY_PORT, async=False, https=False):
	(ret, errorLog) = parse_paras(paras, api_proto)
	if (ret):
		retObj = buildRetObj(ret, data=None, errorLog=errorLog)
		return ApiResponse(ret, retObj)

	(ret, resp) = api_call(address, port, api_proto["apikey"], paras, get_server_key(), async, server=True, https=https)
	return ApiResponse(ret, resp)

def api_call_cephps(address, paras, api_proto, port=CEPHPS_PORT, async=False, https=False):
	(ret, errorLog) = parse_paras(paras, api_proto)
	if (ret):
		retObj = buildRetObj(ret, data=None, errorLog=errorLog)
		return ApiResponse(ret, retObj)

	(ret, resp) = api_call(address, port, api_proto["apikey"], paras, get_server_key(), async, server=True, https=https)
	return ApiResponse(ret, resp)

if __name__ == "__main__":
	api = "octlink.tundra.v1.host.APISyncHostAddr"
	paras = {
		"hostKey": "c52987e0ea09a17dde5622a89e5fd695",
	}
	session_uuid = "00000000000000000000000000000000"

	(retCode, retObj) = api_call("10.12.13.20", "6443", api, paras, session_key=session_uuid, async=False, https=True)
	if (retCode):
		print("connect to server error")
	else:
		print((json.dumps(retObj, indent=4)))
