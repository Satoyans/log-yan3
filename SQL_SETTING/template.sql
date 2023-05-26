-- --------------------------------------------------------
-- ホスト:                          127.0.0.1
-- サーバーのバージョン:                   8.0.32 - MySQL Community Server - GPL
-- サーバー OS:                      Win64
-- HeidiSQL バージョン:               12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- logyan のデータベース構造をダンプしています
DROP DATABASE IF EXISTS `logyan`;
CREATE DATABASE IF NOT EXISTS `logyan` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `logyan`;

--  テーブル logyan.blockcontainer の構造をダンプしています
DROP TABLE IF EXISTS `blockcontainer`;
CREATE TABLE IF NOT EXISTS `blockcontainer` (
  `time` datetime DEFAULT NULL,
  `playerName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `type` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `slot` int DEFAULT NULL,
  `action` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `itemId` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `amount` int DEFAULT NULL,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.blockdestroy の構造をダンプしています
DROP TABLE IF EXISTS `blockdestroy`;
CREATE TABLE IF NOT EXISTS `blockdestroy` (
  `time` datetime DEFAULT NULL,
  `playerName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `blockName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `blockData` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.blockinteractedwith の構造をダンプしています
DROP TABLE IF EXISTS `blockinteractedwith`;
CREATE TABLE IF NOT EXISTS `blockinteractedwith` (
  `time` datetime DEFAULT NULL,
  `playerName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `blockName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `blockData` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.blockplace の構造をダンプしています
DROP TABLE IF EXISTS `blockplace`;
CREATE TABLE IF NOT EXISTS `blockplace` (
  `time` datetime DEFAULT NULL,
  `playerName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `blockName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `blockData` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.entitydie の構造をダンプしています
DROP TABLE IF EXISTS `entitydie`;
CREATE TABLE IF NOT EXISTS `entitydie` (
  `time` datetime DEFAULT NULL,
  `attackerId` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `attackerName` mediumtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `victimId` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `victimName` mediumtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `cause` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.getelytra の構造をダンプしています
DROP TABLE IF EXISTS `getelytra`;
CREATE TABLE IF NOT EXISTS `getelytra` (
  `time` datetime DEFAULT NULL,
  `playerName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.itemthrow の構造をダンプしています
DROP TABLE IF EXISTS `itemthrow`;
CREATE TABLE IF NOT EXISTS `itemthrow` (
  `time` datetime DEFAULT NULL,
  `playerName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `itemName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.lightninghitblock の構造をダンプしています
DROP TABLE IF EXISTS `lightninghitblock`;
CREATE TABLE IF NOT EXISTS `lightninghitblock` (
  `time` datetime DEFAULT NULL,
  `blockName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `blockData` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.playerattack の構造をダンプしています
DROP TABLE IF EXISTS `playerattack`;
CREATE TABLE IF NOT EXISTS `playerattack` (
  `time` datetime DEFAULT NULL,
  `playerName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `victimId` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `victimName` mediumtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- エクスポートするデータが選択されていません

--  テーブル logyan.signblockplace の構造をダンプしています
DROP TABLE IF EXISTS `signblockplace`;
CREATE TABLE IF NOT EXISTS `signblockplace` (
  `time` datetime DEFAULT NULL,
  `playerName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `id` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `text` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `dimension` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- エクスポートするデータが選択されていません

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
