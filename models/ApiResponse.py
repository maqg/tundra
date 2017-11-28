#!/usr/bin/python
# -*- coding: utf-8 -*-


from core.err_code import OCT_SUCCESS
from utils.commonUtil import getErrorMsgCN


class ApiResponse:

	def __init__(self, netRet=OCT_SUCCESS, jsonResp=None):

		self.netErrorNo = netRet

		self.errorNo = 0
		self.errorMsg = ""
		self.errorLog = ""
		self.errorMsgEN = ""

		self.data = None

		self.apiId = ""

		self.jsonResp = jsonResp

		self.parseResponse()

	def parseResponse(self):

		if (self.netErrorNo != OCT_SUCCESS):
			self.errorNo = self.netErrorNo
			self.errorMsg = getErrorMsgCN(self.errorNo)
		else:
			errorObj = self.jsonResp["errorObj"]
			if (errorObj):
				self.errorNo = errorObj["errorNo"]
				self.errorMsg = errorObj["errorMsg"]
				self.errorMsgEN = errorObj.get("errorMsgEN")
				self.errorLog = errorObj["errorLog"]

			self.data = self.jsonResp["data"]
			self.apiId = self.jsonResp["apiId"]

	def toObj(self):

		return {
			"errorNo": self.errorNo,
			"errorMsg": self.errorMsg,
			"errorLog": self.errorLog,
			"errorMsgEN": self.errorMsgEN,
			"data": self.data,
			"apiId": self.apiId
		}
