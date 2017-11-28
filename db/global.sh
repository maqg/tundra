#!/bin/sh

export DB_NAME=dbtundra
export DB_USER=root
export DB_PASSWD=123456
export MYSQL="mysql --default-character-set=utf8 --socket=/var/run/mysqld/mysqld.sock"
export MYSQLADMIN="mysqladmin --socket=/var/run/mysqld/mysqld.sock"
