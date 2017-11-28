#!/usr/bin/python
# -*- coding: utf-8 -*-

import base64
import json
import os
import socket
import struct
import time
import uuid
import subprocess
from binascii import crc32
from hashlib import md5 as MD5
from random import Random
from xml.dom import minidom

from core.err_code import err_desc_en, err_desc_ch, OCT_SUCCESS, XML_ERR
from utils.timeUtil import get_current_time

DEBIAN_VERSION_FILE = "/etc/debian_version"
CENTOS_VERSION_FILE = "/etc/centos-release"
REDHAT_VERSION_FILE = "/etc/redhat-release"

PLATFORM_DEBIAN7 = "debian7"
PLATFORM_DEBIAN9 = "debian9"
PLATFORM_REDCENT6 = "redcent6"
PLATFORM_REDCENT7 = "redcent7"


def get_nodevalue(node, index = 0):
	return node.childNodes[index].nodeValue if node else ''

def reformat_rrd_json(data):

	rows = data["rows"]
	start_time = data["start_time"]
	end_time = data["end_time"]
	step = data["step"]
	columns = data["columns"]
	entry_list = data["entry"]
	t_v_list = data["t_v_list"]

	history = {}
	result = {
		"rows": rows,
		"start_time": start_time,
		"end_time": end_time,
		"step": step,
		"columns": columns,
		"history": history
	}

	for i in range(int(columns)):
		temp_list = []
		for t_v in t_v_list:
			temp = {
				"value": t_v["value"][i],
				"time": t_v["time"]
			}
			temp_list.append(temp)
		history[entry_list[i]] = temp_list

	return result

def xmlrrd_to_json(xml_str):
	try:
		doc = minidom.parseString(xml_str)
	except Exception:
		print("get xml data error")
		return XML_ERR, None

	root = doc.documentElement

	meta_node = root.getElementsByTagName('meta')
	start_node = meta_node[0].getElementsByTagName('start')
	start_time = get_nodevalue(start_node[0])
	step_node = meta_node[0].getElementsByTagName('step')
	step = get_nodevalue(step_node[0])
	end_node = meta_node[0].getElementsByTagName('end')
	end_time = get_nodevalue(end_node[0])
	rows_node = meta_node[0].getElementsByTagName('rows')
	rows = get_nodevalue(rows_node[0])
	columns_node = meta_node[0].getElementsByTagName('columns')
	columns = get_nodevalue(columns_node[0])
	legend_node = meta_node[0].getElementsByTagName('legend')

	entry_list = []
	entry_node = legend_node[0].getElementsByTagName('entry')
	for i in range(int(columns)):
		temp = get_nodevalue(entry_node[i])
		entry_list.append(temp)

	t_v_list = []

	data_node = root.getElementsByTagName('data')
	row = data_node[0].getElementsByTagName('row')
	for row_node in row:
		t_node = row_node.getElementsByTagName('t')
		time = get_nodevalue(t_node[0])

		v_node = row_node.getElementsByTagName('v')
		value_list = []
		for i in range(int(columns)):
			value = get_nodevalue(v_node[i])
			value_list.append(value)
		temp = {
			"time": time,
			"value": value_list
		}
		t_v_list.append(temp)

	data = {
		"start_time": start_time,
		"end_time": end_time,
		"step": step,
		"rows": rows,
		"columns": columns,
		"entry": entry_list,
		"t_v_list": t_v_list
	}

	return OCT_SUCCESS, data

# generate random str which len is randomlength.
def random_str(randomlength=8):
	str = ''
	chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
	length = len(chars) - 1
	random = Random()
	for i in range(randomlength):
		str += chars[random.randint(0, length)]
	
	return str


def CRC32(crcStr):
	return crc32(crcStr.encode()) & 0xFFFFFFFF


def listFiles(fileDir, keyword=None):
	fileList = []
	
	for file in os.listdir(fileDir):
		if (not os.path.isdir(file) and (not keyword or file.find(keyword) != -1)):
			fileList.append(file)
	
	return fileList


def getPlatform():
	if (os.path.exists(DEBIAN_VERSION_FILE)):
		fd = open(DEBIAN_VERSION_FILE, "r")
		line = fd.readline()
		version = line.split(".")[0]
		fd.close()
		return "debian" + version
	elif (os.path.exists(CENTOS_VERSION_FILE)):
		filePath = CENTOS_VERSION_FILE
	else:
		filePath = REDHAT_VERSION_FILE
	
	fd = open(filePath, "r")
	line = fd.readline()
	version = line.split(".")[0].split(" ")[-1]
	fd.close()
	
	return "readcent" + version


def isPlatformDebian7():
	return getPlatform() == PLATFORM_DEBIAN7


def isPlatformDebian9():
	return getPlatform() == PLATFORM_DEBIAN9


def ip2long(ip):
	packedIP = socket.inet_aton(ip)
	return struct.unpack("!L", packedIP)[0]


def long2ip(ip_long):
	return socket.inet_ntoa(struct.pack("!L", ip_long))


def removeFile(filepath):
	if (filepath == None or os.path.exists(filepath) == False):
		return
	
	os.remove(filepath)


def buildRetMsg(errorCode, data=None, errorLog=None):
	if (not errorLog):
		return (errorCode, data)
	else:
		return (errorCode, data, errorLog)


def buildRetObj(errorCode, data=None, errorLog=""):
	return {
		"RetCode": errorCode,
		"RetObj": data,
		"ErrorLog": errorLog
	}


def toString(src, encoding="utf-8"):
	if (type(src) == str):
		try:
			return src.encode(encoding)
		except:
			return octUnicode(src).encode(encoding)
	else:
		return src


def transToObj(string):
	if (string == None):
		return None
	
	if (type(string) != type("a") and type(string) != type('a')):
		string = string.encode()
	
	if (len(string) < 2):
		return None
	
	try:
		obj = json.loads(string, encoding="utf-8")
	except:
		obj = {}
	
	return obj


def tryToDump(string):
	if (string == None):
		return {}
	
	if (type(string) != type("a")):
		string = string.encode()
	
	if (len(string) < 2):
		return {}
	
	try:
		obj = json.loads(string)
	except:
		obj = string
	
	return json.dumps(obj, sort_keys=True, indent=4)


def getStrTime(milisecs=None):
	if not milisecs:
		milisecs = get_current_time()
	return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(milisecs) / 1000))


def isSystemWindows():
	import platform
	if (platform.system() == "Windows"):
		return True
	else:
		return False


def transToStr(obj, indent=False):
	if (indent != False):
		return json.dumps(obj, ensure_ascii=False, indent=indent)
	else:
		return json.dumps(obj, ensure_ascii=False)


def oct_trim(inStr):
	segs = inStr.split(" ")
	result = ""
	
	for seg in segs:
		if (seg == ''):
			continue
		result += seg
		result += " "
	
	return result.rstrip()


def OCT_SYSTEM(formatStr, arg=None):
	TEMPFILE_NAME = "/tmp/OCTTEMP_FILE_%ld%s" % (get_current_time(), getUuid())
	
	if (arg):
		CMD = formatStr % arg
	else:
		CMD = formatStr
	
	CMD += " > %s" % (TEMPFILE_NAME)
	ret = os.system(CMD)
	
	fp = open(TEMPFILE_NAME, 'r')
	if (fp == None):
		return (ret >> 8 & 0XFF, None)
	
	data = fp.read()
	fp.close()
	os.remove(TEMPFILE_NAME)
	
	if (len(data) == 0):
		return (ret >> 8 & 0XFF, None)
	
	if (data[-1] == '\n'):
		data = data[:-1]  # to remove last "\n"
	
	if (len(data) == 0):
		data = None
	
	return (ret >> 8 & 0XFF, data)


def OCT_PIPERUN(cmd):
	import subprocess
	
	if (cmd == None):
		return (0, None)
	
	args = cmd.split()
	p = subprocess.Popen(args, close_fds=True, stdout=subprocess.PIPE,
	                     stderr=subprocess.PIPE, shell=False)
	p.wait()
	
	ret = p.returncode
	msg = p.stdout.read()
	
	return (ret, msg)


def getUuid(spilt=None):
	if (spilt):
		return str(uuid.uuid4())
	else:
		x = uuid.uuid4().hex
		return x


def allocVmMac(vmId, nicId):
	m = MD5()
	string = "%s/%s" % (vmId, nicId)
	m.update(string.encode())
	v = m.hexdigest()
	return "52:54:%s:%s:%s:%s" % (v[0:2], v[4:6], v[8:10], v[12:14])


def trimUuid(uuid):
	segs = uuid.split("-")
	if (len(segs) != 5):
		return uuid
	return "%s%s%s%s%s" % (uuid[0:8],
	                       uuid[9:13],
	                       uuid[14:18],
	                       uuid[19:23],
	                       uuid[24:36])


def expandUuid(uuid):
	if (uuid[8] == '-'):
		return uuid
	return "%s-%s-%s-%s-%s" % (uuid[0:8],
	                           uuid[8:12],
	                           uuid[12:16],
	                           uuid[16:20],
	                           uuid[20:32])


def jsonStringFormat(objString):
	if (type(objString) == str):
		obj = transToObj(objString)
		toString = objString
	else:
		obj = objString
		toString = transToStr(objString)
	
	try:
		result = json.dumps(obj, sort_keys=True, indent=2)
	except:
		result = toString
	
	return result


def octUnicode(src):
	if (type(src) == str):
		return src
	else:
		try:
			return str(src, "utf-8")
		except:
			return src


def fileToObj(filePath):
	if (not os.path.exists(filePath)):
		print(("file %s not exist" % (filePath)))
		return None
	
	fd = open(filePath, "r", encoding="utf-8")
	if (not fd):
		print(("open file %s error" % (filePath)))
		return None
	
	obj = transToObj(fd.read())
	
	fd.close()
	
	return obj


def getErrorMsgCN(error):
	return err_desc_ch.get(error) or ""


def getErrorMsg(error):
	return err_desc_en.get(error) or ""


def isValidJson(string):
	if (string == None):
		return False
	
	try:
		eval(string)
	except Exception as e:
		return False
	
	return True


def format_path_net(path):
	flag = 0
	
	if path == None:
		return None
	
	path = path.replace(' ', '')
	
	path_temp = path.split(':')
	
	path_t = '/' + path_temp[1] + '/'
	
	path = path_temp[0] + ':' + path_t
	
	path_str = ''
	
	for s_temp in path:
		
		if flag == 1 and s_temp == '/':
			continue
		if s_temp == '/':
			flag = 1
		else:
			flag = 0
		path_str = path_str + s_temp
	
	return path_str


def get_pid_by_process_name(name):
	cmd = 'ps -ae | grep -w %s' % name
	ret, data = OCT_SYSTEM(cmd)
	if ret != 0:
		return None
	
	return data.split()[0]


def create_secret_uuid(userKey):
	secretFile = "/tmp/secret.xml.%s" % getUuid()
	with open(secretFile, "w") as fd:
		fd.write("<secret ephemeral='no' private='no'>"
		         "<usage type='ceph'>"
		         "<name>client.admin secret</name>"
		         "</usage></secret>")
	
	errFile = "/tmp/errfile.%s" % getUuid()
	cmd = "/usr/bin/virsh secret-define --file %s 2> %s" % (secretFile, errFile)
	ret, data = OCT_SYSTEM(cmd)
	
	with open(errFile, "r") as fd:
		err = fd.read()
	
	if (ret == 0):
		uuid = data.split(" ")[1]
	elif (ret != 0 and err.find("already defined") != -1):
		index = err.find("UUID")
		uuid = err[index:].split(" ")[1]
	else:
		print("exe cmd[%s] err." % cmd)
		os.unlink(secretFile)
		os.unlink(errFile)
		return (-1, None)
	
	cmd = "/usr/bin/virsh secret-set-value --secret %s --base64 %s" % (uuid, userKey)
	ret, data = OCT_SYSTEM(cmd)
	if (ret):
		os.unlink(secretFile)
		os.unlink(errFile)
		print("exe cmd[%s] err" % cmd)
		return (-1, None)
	
	os.unlink(secretFile)
	os.unlink(errFile)
	return (0, uuid)


def b64_decode(src):
	if not src:
		return ""
	return base64.b64decode(src.encode()).decode()


def b64_encode(src):
	if not src:
		return ""
	return base64.b64encode(src.encode()).decode()


def FORMAT(total, free):
	if not total:
		return format(0, ".2%")
	return format(free / total, ".2%")

class BashError(Exception):
	'''bash error'''

def bash_errorout(cmd):
	cmd = cmd.encode()

	p = subprocess.Popen('/bin/bash', stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
	o, e = p.communicate(cmd)
	r = p.returncode

	if r != 0:
		raise BashError('failed to execute bash[%s], return code: %s, stdout: %s, stderr: %s' % (cmd, r, o, e))

	return o

if __name__ == "__main__":
	mac = allocVmMac(getUuid(), "3")
	print(mac)
