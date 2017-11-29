-- MySQL dump 10.13  Distrib 5.6.22, for osx10.10 (x86_64)
--
-- Host: localhost    Database: dbtundra
-- ------------------------------------------------------
-- Server version	5.6.22

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
INSERT INTO `tb_account` VALUES ('c0000000000000000000000000000000',1,7,'admin','','','292f137f691469948acd0e72b141e373','','',0,1511967261000,0,'');
/*!40000 ALTER TABLE `tb_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
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
INSERT INTO `tb_product` VALUES ('04285abc7e6c413898b6a18dae8b7352','Enabled','WIFIROUTER','无线路由器','飞鱼星 企业级无线路由器 40点','{\"id\": \"wifirouter-001\", \"name\": \"飞鱼星 企业级无线路由器 40点\", \"provider\": \"京东 飞鱼星\", \"desc\": \"飞鱼星VE608W 1200M企业级无线路由器，无线带机量40\", \"price\": 399}',1511967260229,1511967260229,'飞鱼星VE608W 1200M企业级无线路由器，无线带机量40'),('06cd86bbe49e4730a9cd13cf5fca498f','Enabled','MEMORY','内存','Smasung DDR4 服务器内存 16G','{\"id\": \"memory-003\", \"name\": \"Smasung DDR4 服务器内存 16G\", \"provider\": \"Samsung\", \"model\": \"DDR4\", \"capacity\": 16, \"desc\": \"\", \"price\": 1500}',1511967260229,1511967260229,''),('0a2676f6db5d4781a3255a6525bb00f2','Enabled','SOFTWARE','软件平台','软件 私有云平台 开放全部功能','{\"id\": \"software-001\", \"name\": \"软件 私有云平台 开放全部功能\", \"type\": \"private\", \"basePrice\": 0, \"hostPrice\": 20000, \"cpuPrice\": 10000, \"pointPrice\": 0}',1511967260229,1511967260229,'None'),('169861d11ea94111bb670d4e40d2b9dd','Enabled','SOFTWARE','软件平台','软件 云课堂软件 开放全部功能','{\"id\": \"software-002\", \"name\": \"软件 云课堂软件 开放全部功能\", \"type\": \"octclass\", \"basePrice\": 0, \"hostPrice\": 0, \"cpuPrice\": 0, \"pointPrice\": 600}',1511967260229,1511967260229,'None'),('19b364d4f0b84b818f755b4536b6f546','Enabled','THINCLIENT','瘦客户机 云终端','云终端 赛扬4核心 2G内存 16GSSD','{\"id\": \"thinclient-001\", \"name\": \"云终端 赛扬4核心 2G内存 16GSSD\", \"provider\": \"华科\", \"desc\": \"K700F 2G内存 16G SSD固态硬盘不带WIFI，VGA*1，HDMI*1，USB2.0*4\", \"price\": 620}',1511967260229,1511967260229,'K700F 2G内存 16G SSD固态硬盘不带WIFI，VGA*1，HDMI*1，USB2.0*4'),('28a32644e80a4db7b3518a01bfe3d2a9','Enabled','MONITOR','显示器','19.5寸 BENQ明基 显示器','{\"id\": \"monitor-001\", \"name\": \"19.5寸 BENQ明基 显示器\", \"provider\": \"京东 BEND\", \"model\": \"unknown\", \"size\": 20, \"desc\": \"标准电源\", \"price\": 488}',1511967260229,1511967260229,'标准电源'),('3012a684fa2e4de5aea93f416ed266ab','Enabled','MEMORY','内存','Smasung DDR4 服务器内存 8G','{\"id\": \"memory-004\", \"name\": \"Smasung DDR4 服务器内存 8G\", \"provider\": \"Samsung\", \"model\": \"DDR4\", \"capacity\": 8, \"desc\": \"\", \"price\": 700}',1511967260229,1511967260229,''),('312dcbf9b8c846b49465c1a86f541171','Enabled','CPU','CPU','E5 2650 v3 2.3GHz 10核20线程','{\"id\": \"cpu-002\", \"name\": \"E5 2650 v3 2.3GHz 10核20线程\", \"provider\": \"Intel\", \"version\": \"v3\", \"model\": \"E5 2650\", \"frequency\": \"2.3\", \"cores\": 10, \"threads\": 20, \"price\": 6000}',1511967260229,1511967260229,'None'),('40621f93ba69409f98850eec6c817491','Enabled','DISK','磁盘','Intel 企业级固态盘 480G','{\"id\": \"disk-001\", \"name\": \"Intel 企业级固态盘 480G\", \"provider\": \"Intel\", \"model\": \"S3500\", \"capacity\": 480, \"desc\": \"三年质保，淘宝\", \"price\": 1550}',1511967260229,1511967260229,'三年质保，淘宝'),('442f497ae1774a439091151b06c8b8df','Enabled','SOFTWARE','软件平台','软件 云桌面软件 开放全部功能','{\"id\": \"software-003\", \"name\": \"软件 云桌面软件 开放全部功能\", \"type\": \"octdesk\", \"basePrice\": 0, \"hostPrice\": 0, \"cpuPrice\": 0, \"pointPrice\": 1000}',1511967260229,1511967260229,'None'),('491d8e3af11b4c46b72e423b243b6177','Enabled','DISK','磁盘','戴尔 企业级SAS机械硬盘 1T','{\"id\": \"disk-002\", \"name\": \"戴尔 企业级SAS机械硬盘 1T\", \"provider\": \"DELL\", \"model\": \"unknown\", \"capacity\": 1024, \"desc\": \"三年质保\", \"price\": 1049}',1511967260229,1511967260229,'三年质保'),('57eaef2add8f427db316216e6796d13d','Enabled','RAID','RAID阵列卡','高性能阵列卡','{\"id\": \"raid-001\", \"name\": \"高性能阵列卡\", \"provider\": \"unknown\", \"desc\": \"可与主机一同采购\", \"price\": 1500}',1511967260229,1511967260229,'可与主机一同采购'),('70be1100db45458eb77204c669a58c50','Enabled','MEMORY','内存','Smasung DDR3 服务器内存 8G','{\"id\": \"memory-002\", \"name\": \"Smasung DDR3 服务器内存 8G\", \"provider\": \"Samsung\", \"model\": \"DDR3 1600\", \"capacity\": 8, \"desc\": \"\", \"price\": 600}',1511967260229,1511967260229,''),('74360e04d58a4775b6189e508498317a','Enabled','KEYMOUSE','键盘鼠标套装','罗技MK120 标准键鼠套装','{\"id\": \"keymouse-001\", \"name\": \"罗技MK120 标准键鼠套装\", \"provider\": \"京东 Logitech\", \"desc\": \"\", \"price\": 79}',1511967260229,1511967260229,''),('a718055f788f42828b34f4b37ec6128f','Enabled','WIFIROUTER','无线路由器','飞鱼星 企业级无线路由器 60点','{\"id\": \"wifirouter-002\", \"name\": \"飞鱼星 企业级无线路由器 60点\", \"provider\": \"京东 飞鱼星\", \"desc\": \"飞鱼星 VE984GW+ 1200M企业级无线路由器，无线带机量60\", \"price\": 599}',1511967260229,1511967260229,'飞鱼星 VE984GW+ 1200M企业级无线路由器，无线带机量60'),('a72b560c818d48489cecdd902a5a98ea','Enabled','MONITOR','显示器','19.9寸 ACER 显示器','{\"id\": \"monitor-002\", \"name\": \"19.9寸 ACER 显示器\", \"provider\": \"京东 ACER\", \"model\": \"S200HQL Hb 19.9\", \"size\": 20, \"desc\": \"12V笔记本电源，无HDMI对ARM架构盒子支持不算好\", \"price\": 499}',1511967260229,1511967260229,'12V笔记本电源，无HDMI对ARM架构盒子支持不算好'),('abe512cadb024c0c9de14dab16b66747','Enabled','INFRASTRUCTURE','硬件基础架构','强氧 2U 双路平台 最大256G内存 不含RAID卡','{\"id\": \"infrastructure-002\", \"name\": \"强氧 2U 双路平台 最大256G内存 不含RAID卡\", \"provider\": \"强氧\", \"desc\": \"含机箱、单电源（600w），主板，一代平台，支持一代CPU E5系列26XX，不带Raid卡，最大256G内存\", \"price\": 5800}',1511967260229,1511967260229,'含机箱、单电源（600w），主板，一代平台，支持一代CPU E5系列26XX，不带Raid卡，最大256G内存'),('ce6d1d8cf46e4e0890e9864ca429cf2b','Enabled','MONITOR','显示器','23寸 AOC 显示器','{\"id\": \"monitor-002\", \"name\": \"23寸 AOC 显示器\", \"provider\": \"京东 AOC\", \"model\": \"unknown\", \"size\": 23, \"desc\": \"\", \"price\": 679}',1511967260229,1511967260229,''),('dbac38310acf4a309c4e5c9c9ea50a17','Enabled','THINCLIENT','瘦客户机 云终端','云终端 赛扬4核心 2G内存 32GSSD','{\"id\": \"thinclient-002\", \"name\": \"云终端 赛扬4核心 2G内存 32GSSD\", \"provider\": \"华科\", \"desc\": \"K700F 2G内存 32G SSD固态硬盘不带WIFI，VGA*1，HDMI*1，USB2.0*4\", \"price\": 675}',1511967260229,1511967260229,'K700F 2G内存 32G SSD固态硬盘不带WIFI，VGA*1，HDMI*1，USB2.0*4'),('dffaa8db07cf47a4a781ce805c20a1fc','Enabled','MEMORY','内存','Smasung DDR3 服务器内存 16G','{\"id\": \"memory-001\", \"name\": \"Smasung DDR3 服务器内存 16G\", \"provider\": \"Samsung\", \"model\": \"DDR3 1600\", \"capacity\": 16, \"desc\": \"\", \"price\": 1200}',1511967260229,1511967260229,''),('e565b162d1624116ac2b7bb2ccd2551c','Enabled','INFRASTRUCTURE','硬件基础架构','强氧 2U 双路平台 最大128G内存 不含RAID卡','{\"id\": \"infrastructure-001\", \"name\": \"强氧 2U 双路平台 最大128G内存 不含RAID卡\", \"provider\": \"强氧\", \"desc\": \"含机箱、单电源（600w），主板，一代平台，支持3代CPU E5系列26XX V3，不带Raid阵列卡\", \"price\": 5000}',1511967260229,1511967260229,'含机箱、单电源（600w），主板，一代平台，支持3代CPU E5系列26XX V3，不带Raid阵列卡'),('eadd633eabc74296bbec2e0eaa8962c0','Enabled','CPU','CPU','E5 2620 v3 2.4GHz 6核12线程','{\"id\": \"cpu-001\", \"name\": \"E5 2620 v3 2.4GHz 6核12线程\", \"provider\": \"Intel\", \"version\": \"v3\", \"model\": \"E5 2620\", \"frequency\": \"2.4\", \"cores\": 6, \"threads\": 12, \"price\": 5500}',1511967260229,1511967260229,'None'),('f4dd67c4095146b9869ed12d7bb8fbf6','Enabled','SWITCH','交换机设备','华为 24口 千兆 交换机','{\"id\": \"switch-001\", \"name\": \"华为 24口 千兆 交换机\", \"provider\": \"京东 华为\", \"model\": \"S5700-52P-LI-AC\", \"desc\": \"\", \"price\": 2750}',1511967260229,1511967260229,'');
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
  `QR_Info` varchar(10240) NOT NULL DEFAULT '{}',
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

-- Dump completed on 2017-11-29 22:54:21
