#!/usr/bin/python
# -*- coding: utf-8 -*-

import os.path as op
import re


def file_exist(filename):
    return op.isfile(filename)


def check_name(name):
    flag = re.match(r'^[a-zA-Z0-9][\w\-\.]*$', name)
    if flag is None:
        return False
    else:
        return True


def check_server_name(name):
    flag = re.match(r'^[a-zA-Z0-9][\w]*$', name)
    if flag is None:
        return False
    else:
        return True


def check_policy_name(name):
    t_name = name
    if type(name) == str:
        t_name = str(name, "utf-8")
    flag = re.match(r'^[a-zA-Z0-9\u4e00-\u9fa5][\w\u4e00-\u9fa5]*$', t_name)
    if flag is None:
        return False
    else:
        return True


def check_file_name(name):
    flag = re.match(r'^[a-zA-Z0-9][\w\.]*$', name)
    if flag is None:
        return False
    else:
        return True


def check_password(pwd):
    flag = re.match(r'^[\x20-\x7e]*$', pwd)
    if flag is None:
        return False
    else:
        return True


def check_number(db, env, obj):
    p = re.compile('^\d+-\d+$')
    res = p.match(obj)
    if res == None:
        return -1
    return 0


def check_email(email):
    flag = re.match('^[\w-]+@[\w-]+(\.[\w-]+)+$', email)
    if flag is None:
        return False
    else:
        return True


def check_ip(inStr):
    reg = '^(([3-9]\d?|[01]\d{0,2}|2\d?|2[0-4]\d|25[0-5])\.){3}([3-9]\d?|[01]\d{0,2}|2\d?|2[0-4]\d|25[0-5])'
    flag = re.match(reg, inStr)
    if flag is None:
        return False
    else:
        return True
