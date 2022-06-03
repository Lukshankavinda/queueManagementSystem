-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: queuemanagementsystem
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tpno` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `issue` text NOT NULL,
  `status` enum('waiting','inprogress','close') NOT NULL DEFAULT 'waiting',
  `issue_no` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `normalUsersId` int NOT NULL,
  `counterId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f73ee686679b47885183c19bce4` (`normalUsersId`),
  KEY `FK_382115843058fa2cca2f3a0e39d` (`counterId`),
  CONSTRAINT `FK_382115843058fa2cca2f3a0e39d` FOREIGN KEY (`counterId`) REFERENCES `counters` (`id`),
  CONSTRAINT `FK_f73ee686679b47885183c19bce4` FOREIGN KEY (`normalUsersId`) REFERENCES `normal_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
INSERT INTO `issues` VALUES (1,'Lukshan','0774561234','lukshan@testmail.com','lukshan@testmail.com first issue','waiting',1,'2022-06-01 09:55:59.038117','2022-06-03 14:51:38.349837',1,2),(2,'Kavinda','0771230987','kavinda@testmail.com','kavinda@testmail.com first  counter 2  iss 2','waiting',2,'2022-06-01 11:06:10.018284','2022-06-03 14:51:38.478990',2,2),(3,'Kasun','0770981234','kasun@testmail.com','kasun@testmail.com first  Counter Id 2  Issue No 3','waiting',3,'2022-06-01 11:10:11.727018','2022-06-03 14:51:38.480001',3,2),(4,'Laksiri','0770451234','laksiri@testmail.com','laksiri@testmail.com first  Counter Id 2  Issue No 4','waiting',4,'2022-06-01 11:11:07.259948','2022-06-03 14:51:38.480627',4,2);
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-03 14:53:53
