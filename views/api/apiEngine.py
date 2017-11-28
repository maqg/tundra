#!/usr/bin/python
# -*- coding: utf-8 -*-

import time

from core import dbmysql


def loadRunningApis(db):
    return []


def apiEngine(name, deley):

    db = dbmysql.mysqldb()

    # after deley seconds, start to run
    time.sleep(deley)

    while (True):
        time.sleep(1)

        apis = loadRunningApis(db)
        if (not apis):
            continue
