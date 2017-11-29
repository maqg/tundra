# -*- coding: utf-8 -*-

import os

DB_USER = "root"
DB_PASSWORD = "123456"
DB_NAME = "dbtundra"

UNIXSOCKET_DEBIAN = "/var/run/mysqld/mysqld.sock"
UNIXSOCKET_REDCENT = "/var/lib/mysql/mysql.sock"
DB_SERVER = "localhost"

TB_ACCOUNT = "tb_account"
TB_MISC = "tb_misc"
TB_LOG = "tb_log"
TB_SESSION = "tb_session"
TB_APITRACE = "tb_apitrace"
TB_REMOTELOG = "tb_remotelog"
TB_PRODUCT = "tb_product"
TB_QUERYRESULT = "tb_queryresult"

def get_sock_file():
	if (os.path.exists(UNIXSOCKET_DEBIAN)):
		return UNIXSOCKET_DEBIAN
	else:
		return UNIXSOCKET_REDCENT
