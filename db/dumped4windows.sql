-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: dbtundra
-- ------------------------------------------------------
-- Server version	5.5.47-0+deb7u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_account`
--

DROP TABLE IF EXISTS `tb_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_account` (
  `ID` varchar(36) NOT NULL DEFAULT '',
  `U_State` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1: OK, 0: Bad',
  `U_Type` int(11) NOT NULL DEFAULT '3' COMMENT '7: super,3 admin,1 audit',
  `U_Name` varchar(128) NOT NULL DEFAULT '',
  `U_UKey` varchar(36) NOT NULL DEFAULT '' COMMENT 'UKEY Id',
  `U_LdapUid` varchar(128) NOT NULL DEFAULT '' COMMENT 'Ldap User Id',
  `U_Password` varchar(128) NOT NULL DEFAULT '',
  `U_Email` varchar(128) NOT NULL DEFAULT '',
  `U_PhoneNumber` varchar(32) NOT NULL DEFAULT '',
  `U_LastLogin` bigint(20) NOT NULL DEFAULT '0',
  `U_CreateTime` bigint(20) NOT NULL DEFAULT '0',
  `U_LastSync` bigint(20) NOT NULL DEFAULT '0',
  `U_Description` varchar(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `tb_account_id` (`ID`),
  KEY `tb_account_state` (`U_State`),
  KEY `tb_account_name` (`U_Name`),
  KEY `tb_account_type` (`U_Type`),
  KEY `tb_account_ukey` (`U_UKey`),
  KEY `tb_account_ldapuid` (`U_LdapUid`),
  KEY `tb_account_email` (`U_Email`),
  KEY `tb_account_phonenumber` (`U_PhoneNumber`),
  KEY `tb_account_password` (`U_Password`),
  KEY `tb_account_createtime` (`U_CreateTime`),
  KEY `tb_account_lastlogin` (`U_LastLogin`),
  KEY `tb_account_lastsync` (`U_LastSync`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_account`
--

LOCK TABLES `tb_account` WRITE;
/*!40000 ALTER TABLE `tb_account` DISABLE KEYS */;
INSERT INTO `tb_account` VALUES ('c0000000000000000000000000000000',1,7,'admin','','','292f137f691469948acd0e72b141e373','','',0,1512122757000,0,'');
/*!40000 ALTER TABLE `tb_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trigger_delete_account AFTER DELETE ON tb_account FOR EACH ROW
BEGIN
DELETE FROM tb_session WHERE S_UserId=old.ID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tb_apitrace`
--

DROP TABLE IF EXISTS `tb_apitrace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_apitrace` (
  `ID` varchar(36) NOT NULL DEFAULT '',
  `AT_AccountId` varchar(36) NOT NULL DEFAULT '',
  `AT_Type` varchar(16) NOT NULL DEFAULT 'api' COMMENT 'api or task',
  `AT_ApiId` varchar(200) NOT NULL DEFAULT '',
  `AT_State` varchar(16) NOT NULL DEFAULT 'New' COMMENT 'New,Loaded,Running,ServerRunning,Failed,Finished',
  `AT_Name` varchar(128) NOT NULL DEFAULT '',
  `AT_CreateTime` bigint(20) NOT NULL DEFAULT '0',
  `AT_StartTime` bigint(20) NOT NULL DEFAULT '0',
  `AT_FinishTime` bigint(20) NOT NULL DEFAULT '0',
  `AT_User` varchar(64) NOT NULL DEFAULT '',
  `AT_ServerTaskId` varchar(36) NOT NULL DEFAULT '',
  `AT_Request` varchar(8192) NOT NULL DEFAULT '{}',
  `AT_ServerRequest` varchar(8192) NOT NULL DEFAULT '{}',
  `AT_Reply` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `tb_apitrace_id` (`ID`),
  KEY `tb_apitrace_type` (`AT_Type`),
  KEY `tb_apitrace_apiid` (`AT_ApiId`),
  KEY `tb_apitrace_staskid` (`AT_ServerTaskId`),
  KEY `tb_apitrace_user` (`AT_User`),
  KEY `tb_apitrace_accountId` (`AT_AccountId`),
  KEY `tb_apitrace_createtime` (`AT_CreateTime`),
  KEY `tb_apitrace_finishtime` (`AT_FinishTime`),
  KEY `tb_apitrace_starttime` (`AT_StartTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_apitrace`
--

LOCK TABLES `tb_apitrace` WRITE;
/*!40000 ALTER TABLE `tb_apitrace` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_apitrace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_misc`
--

DROP TABLE IF EXISTS `tb_misc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_misc` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `M_Name` varchar(64) NOT NULL DEFAULT '',
  `M_Value` varchar(64) NOT NULL DEFAULT '',
  `M_Type` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `tb_misc_id` (`ID`),
  KEY `tb_misc_name` (`M_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_misc`
--

LOCK TABLES `tb_misc` WRITE;
/*!40000 ALTER TABLE `tb_misc` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_misc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_product`
--

DROP TABLE IF EXISTS `tb_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_product` (
  `ID` varchar(36) NOT NULL DEFAULT '',
  `P_State` varchar(16) NOT NULL DEFAULT 'Enabled' COMMENT 'Disabled,Enabled',
  `P_Type` varchar(32) NOT NULL DEFAULT 'CPU' COMMENT 'CPU,MEMORY,DISK,RAID',
  `P_TypeName` varchar(32) NOT NULL DEFAULT 'CPU' COMMENT 'CPU,内存,磁盘,RAID卡',
  `P_Name` varchar(128) NOT NULL DEFAULT '',
  `P_Info` varchar(1024) NOT NULL DEFAULT '{}',
  `P_LastSync` bigint(20) NOT NULL DEFAULT '0',
  `P_CreateTime` bigint(20) NOT NULL DEFAULT '0',
  `P_Description` varchar(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `tb_product_id` (`ID`),
  KEY `tb_product_state` (`P_State`),
  KEY `tb_product_type` (`P_Type`),
  KEY `tb_product_name` (`P_Name`),
  KEY `tb_product_lastsync` (`P_LastSync`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_product`
--

LOCK TABLES `tb_product` WRITE;
/*!40000 ALTER TABLE `tb_product` DISABLE KEYS */;
INSERT INTO `tb_product` VALUES ('0a808dcc92f54e3b9c256a3b6d5b62b0','Enabled','MEMORY','内存','Smasung DDR4 服务器内存 16G','{\"capacity\": 16, \"name\": \"Smasung DDR4 服务器内存 16G\", \"price\": 1500, \"provider\": \"Samsung\", \"model\": \"DDR4\", \"id\": \"memory-003\", \"desc\": \"\"}',1512122756308,1512122756308,''),('1f2a5edcdb04473d8ac73fb96c2db1e8','Enabled','MONITOR','显示器','23寸 AOC 显示器','{\"name\": \"23寸 AOC 显示器\", \"price\": 679, \"provider\": \"京东 AOC\", \"model\": \"unknown\", \"desc\": \"\", \"id\": \"monitor-003\", \"size\": 23}',1512122756308,1512122756308,''),('3c868c236cfd4d4eb37b9461ba3db8ef','Enabled','MEMORY','内存','Smasung DDR3 服务器内存 8G','{\"capacity\": 8, \"name\": \"Smasung DDR3 服务器内存 8G\", \"price\": 600, \"provider\": \"Samsung\", \"model\": \"DDR3 1600\", \"id\": \"memory-002\", \"desc\": \"\"}',1512122756308,1512122756308,''),('403158a0a8234a1db8375d917cf09079','Enabled','MONITOR','显示器','19.9寸 ACER 显示器','{\"name\": \"19.9寸 ACER 显示器\", \"price\": 499, \"provider\": \"京东 ACER\", \"model\": \"S200HQL Hb 19.9\", \"desc\": \"12V笔记本电源，无HDMI对ARM架构盒子支持不算好\", \"id\": \"monitor-002\", \"size\": 20}',1512122756308,1512122756308,'12V笔记本电源，无HDMI对ARM架构盒子支持不算好'),('4046df354342414fa8b1abdb387ad744','Enabled','DISK','磁盘','戴尔 企业级SAS机械硬盘 1T','{\"capacity\": 1024, \"name\": \"戴尔 企业级SAS机械硬盘 1T\", \"price\": 1049, \"provider\": \"DELL\", \"model\": \"unknown\", \"id\": \"disk-002\", \"desc\": \"三年质保\"}',1512122756308,1512122756308,'三年质保'),('4c7069f83b0f42868b4360d91a3b71f9','Enabled','UKEY','UKEY','UKEY2000','{\"price\": 100, \"desc\": \"\", \"provider\": \"淘宝 ukey2000型\", \"id\": \"ukey-001\", \"name\": \"UKEY2000\"}',1512122756308,1512122756308,''),('50c72b2e07e04bd4bc1ad8c5881335f7','Enabled','KEYMOUSE','键盘鼠标套装','罗技MK120 标准键鼠套装','{\"price\": 79, \"desc\": \"\", \"provider\": \"京东 Logitech\", \"id\": \"keymouse-001\", \"name\": \"罗技MK120 标准键鼠套装\"}',1512122756308,1512122756308,''),('5366da553db14b25ab8778c7c5ee44c8','Enabled','THINCLIENT','瘦客户机 云终端','云终端 赛扬4核心 2G内存 16GSSD','{\"price\": 620, \"desc\": \"K700F 2G内存 16G SSD固态硬盘不带WIFI，VGA*1，HDMI*1，USB2.0*4\", \"provider\": \"华科\", \"id\": \"thinclient-001\", \"name\": \"云终端 赛扬4核心 2G内存 16GSSD\"}',1512122756308,1512122756308,'K700F 2G内存 16G SSD固态硬盘不带WIFI，VGA*1，HDMI*1，USB2.0*4'),('59ff85efd6044aa4808a14d39519fac3','Enabled','SOFTWARE','软件平台','软件 云桌面软件 开放全部功能','{\"cpuPrice\": 0, \"name\": \"软件 云桌面软件 开放全部功能\", \"hostPrice\": 0, \"pointPrice\": 1000, \"basePrice\": 0, \"type\": \"OCTDESK\", \"id\": \"software-003\"}',1512122756308,1512122756308,'None'),('5c5e172f9b6d4ad9bf15ac64b0a320eb','Enabled','WIFIROUTER','无线路由器','飞鱼星 企业级无线路由器 40点','{\"price\": 399, \"desc\": \"飞鱼星VE608W 1200M企业级无线路由器，无线带机量40\", \"provider\": \"京东 飞鱼星\", \"id\": \"wifirouter-001\", \"name\": \"飞鱼星 企业级无线路由器 40点\"}',1512122756308,1512122756308,'飞鱼星VE608W 1200M企业级无线路由器，无线带机量40'),('60c95d920113457f861972d4812075c9','Enabled','INFRASTRUCTURE','硬件基础架构','强氧 2U 双路平台 最大256G内存 不含RAID卡','{\"price\": 5800, \"desc\": \"含机箱、单电源（600w），主板，一代平台，支持一代CPU E5系列26XX，不带Raid卡，最大256G内存\", \"provider\": \"强氧\", \"id\": \"infrastructure-002\", \"name\": \"强氧 2U 双路平台 最大256G内存 不含RAID卡\"}',1512122756308,1512122756308,'含机箱、单电源（600w），主板，一代平台，支持一代CPU E5系列26XX，不带Raid卡，最大256G内存'),('62915d3615744bf2aa322276959220b5','Enabled','THINCLIENT','瘦客户机 云终端','云终端 赛扬4核心 2G内存 32GSSD','{\"price\": 675, \"desc\": \"K700F 2G内存 32G SSD固态硬盘不带WIFI，VGA*1，HDMI*1，USB2.0*4\", \"provider\": \"华科\", \"id\": \"thinclient-002\", \"name\": \"云终端 赛扬4核心 2G内存 32GSSD\"}',1512122756308,1512122756308,'K700F 2G内存 32G SSD固态硬盘不带WIFI，VGA*1，HDMI*1，USB2.0*4'),('71aa353d09f5465cb653909c4687ff7a','Enabled','INFRASTRUCTURE','硬件基础架构','强氧 2U 双路平台 最大128G内存 不含RAID卡','{\"price\": 5000, \"desc\": \"含机箱、单电源（600w），主板，一代平台，支持3代CPU E5系列26XX V3，不带Raid阵列卡\", \"provider\": \"强氧\", \"id\": \"infrastructure-001\", \"name\": \"强氧 2U 双路平台 最大128G内存 不含RAID卡\"}',1512122756308,1512122756308,'含机箱、单电源（600w），主板，一代平台，支持3代CPU E5系列26XX V3，不带Raid阵列卡'),('7f7c6c70d5474b6e8ceb1d806277b9e6','Enabled','WIFIROUTER','无线路由器','飞鱼星 企业级无线路由器 60点','{\"price\": 599, \"desc\": \"飞鱼星 VE984GW+ 1200M企业级无线路由器，无线带机量60\", \"provider\": \"京东 飞鱼星\", \"id\": \"wifirouter-002\", \"name\": \"飞鱼星 企业级无线路由器 60点\"}',1512122756308,1512122756308,'飞鱼星 VE984GW+ 1200M企业级无线路由器，无线带机量60'),('804276dbd70c40f2b1dc04c0f73608bb','Enabled','MONITOR','显示器','19.5寸 BENQ明基 显示器','{\"name\": \"19.5寸 BENQ明基 显示器\", \"price\": 488, \"provider\": \"京东 BEND\", \"model\": \"unknown\", \"desc\": \"标准电源\", \"id\": \"monitor-001\", \"size\": 20}',1512122756308,1512122756308,'标准电源'),('9807b618475f4a4f9e8a867251cdea56','Enabled','CPU','CPU','E5 2650 v3 2.3GHz 10核20线程','{\"version\": \"v3\", \"price\": 6000, \"frequency\": \"2.3\", \"threads\": 20, \"provider\": \"Intel\", \"cores\": 10, \"model\": \"E5 2650\", \"id\": \"cpu-002\", \"name\": \"E5 2650 v3 2.3GHz 10核20线程\"}',1512122756308,1512122756308,'None'),('980f8516b4534dacb344969c03c1d037','Enabled','SWITCH','交换机设备','华为 24口 千兆 交换机','{\"name\": \"华为 24口 千兆 交换机\", \"price\": 2750, \"provider\": \"京东 华为\", \"model\": \"S5700-52P-LI-AC\", \"id\": \"switch-001\", \"desc\": \"\"}',1512122756308,1512122756308,''),('9ca8e4a27bbe40bd82f82f1a7ebc9987','Enabled','CPU','CPU','E5 2620 v3 2.4GHz 6核12线程','{\"version\": \"v3\", \"price\": 5500, \"frequency\": \"2.4\", \"threads\": 12, \"provider\": \"Intel\", \"cores\": 6, \"model\": \"E5 2620\", \"id\": \"cpu-001\", \"name\": \"E5 2620 v3 2.4GHz 6核12线程\"}',1512122756308,1512122756308,'None'),('a1b58d15b39b4f3b90218fa73a4484bf','Enabled','SOFTWARE','软件平台','软件 云课堂软件 开放全部功能','{\"cpuPrice\": 0, \"name\": \"软件 云课堂软件 开放全部功能\", \"hostPrice\": 0, \"pointPrice\": 600, \"basePrice\": 0, \"type\": \"OCTCLASS\", \"id\": \"software-002\"}',1512122756308,1512122756308,'None'),('ae12a41276c945b8ab1fb81d2a341d7b','Enabled','MEMORY','内存','Smasung DDR4 服务器内存 8G','{\"capacity\": 8, \"name\": \"Smasung DDR4 服务器内存 8G\", \"price\": 700, \"provider\": \"Samsung\", \"model\": \"DDR4\", \"id\": \"memory-004\", \"desc\": \"\"}',1512122756308,1512122756308,''),('af36e2d91b574fd88eb96124cd9948d4','Enabled','MEMORY','内存','Smasung DDR3 服务器内存 16G','{\"capacity\": 16, \"name\": \"Smasung DDR3 服务器内存 16G\", \"price\": 1200, \"provider\": \"Samsung\", \"model\": \"DDR3 1600\", \"id\": \"memory-001\", \"desc\": \"\"}',1512122756308,1512122756308,''),('c865d2ea78fb4359a9f84df996520ab1','Enabled','SOFTWARE','软件平台','软件 私有云平台 开放全部功能','{\"cpuPrice\": 10000, \"name\": \"软件 私有云平台 开放全部功能\", \"hostPrice\": 20000, \"pointPrice\": 0, \"basePrice\": 0, \"type\": \"PLATFORM\", \"id\": \"software-001\"}',1512122756308,1512122756308,'None'),('ed73c0713ea64017b21a2f5ecf0e91e4','Enabled','RAID','RAID阵列卡','高性能阵列卡','{\"price\": 1500, \"desc\": \"可与主机一同采购\", \"provider\": \"unknown\", \"id\": \"raid-001\", \"name\": \"高性能阵列卡\"}',1512122756308,1512122756308,'可与主机一同采购'),('edb76456e1ca4ba7b237ae912460ee3d','Enabled','DISK','磁盘','Intel 企业级固态盘 480G','{\"capacity\": 480, \"name\": \"Intel 企业级固态盘 480G\", \"price\": 1550, \"provider\": \"Intel\", \"model\": \"S3500\", \"id\": \"disk-001\", \"desc\": \"三年质保，淘宝\"}',1512122756308,1512122756308,'三年质保，淘宝');
/*!40000 ALTER TABLE `tb_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_queryresult`
--

DROP TABLE IF EXISTS `tb_queryresult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_queryresult` (
  `ID` varchar(36) NOT NULL DEFAULT '',
  `QR_Name` varchar(128) NOT NULL DEFAULT '',
  `QR_Type` varchar(16) NOT NULL DEFAULT 'PLATFORM' COMMENT 'PLATFORM,OCTDESK,OCTCLASS',
  `QR_WithHardare` tinyint(4) NOT NULL DEFAULT '1',
  `QR_Paras` varchar(1024) NOT NULL DEFAULT '{}',
  `QR_Info` varchar(10240) NOT NULL DEFAULT '{}',
  `QR_Price` int(11) NOT NULL DEFAULT '0',
  `QR_Points` int(11) NOT NULL DEFAULT '0',
  `QR_CreateTime` bigint(20) NOT NULL DEFAULT '0',
  `QR_Description` varchar(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `tb_queryresult_id` (`ID`),
  KEY `tb_queryresult_name` (`QR_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_queryresult`
--

LOCK TABLES `tb_queryresult` WRITE;
/*!40000 ALTER TABLE `tb_queryresult` DISABLE KEYS */;
INSERT INTO `tb_queryresult` VALUES ('292f137f691469948acd0e72b141e373','大中华-20171201','OCTDESK',1,'{}','{}',12000,60,1826789620148,'不含运费');
/*!40000 ALTER TABLE `tb_queryresult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_session`
--

DROP TABLE IF EXISTS `tb_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_session` (
  `ID` varchar(36) NOT NULL DEFAULT '',
  `S_UserId` varchar(36) NOT NULL DEFAULT '',
  `S_UserType` tinyint(4) NOT NULL DEFAULT '0' COMMENT '7:superadmin,3:admin,1:audit,0:user',
  `S_UserName` varchar(128) NOT NULL DEFAULT '',
  `S_Cookie` varchar(1024) NOT NULL DEFAULT '',
  `S_CreateTime` bigint(20) NOT NULL DEFAULT '0',
  `S_LastSync` bigint(20) NOT NULL DEFAULT '0',
  `S_ExpireTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `tb_session_id` (`ID`),
  KEY `tb_session_userid` (`S_UserId`),
  KEY `tb_session_username` (`S_UserName`),
  KEY `tb_session_createtime` (`S_CreateTime`),
  KEY `tb_session_lastsync` (`S_LastSync`),
  KEY `tb_session_expiretime` (`S_ExpireTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_session`
--

LOCK TABLES `tb_session` WRITE;
/*!40000 ALTER TABLE `tb_session` DISABLE KEYS */;
INSERT INTO `tb_session` VALUES ('00000000000000000000000000000000','c0000000000000000000000000000000',7,'admin','{\"role\": 7, \"id\": \"c0000000000000000000000000000000\", \"name\": \"admin\"}',1511429620148,0,1826789620148);
/*!40000 ALTER TABLE `tb_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dbtundra'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-01 18:05:57
