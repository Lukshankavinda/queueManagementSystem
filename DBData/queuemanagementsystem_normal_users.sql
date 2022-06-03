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
-- Table structure for table `normal_users`
--

DROP TABLE IF EXISTS `normal_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `normal_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tpno` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_804c5a326a153e09a661982f98` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `normal_users`
--

LOCK TABLES `normal_users` WRITE;
/*!40000 ALTER TABLE `normal_users` DISABLE KEYS */;
INSERT INTO `normal_users` VALUES (1,'Lukshan','lukshan@testmail.com','$2a$10$f325RRlnbuXpArXs7/DvP.UAaBYz.JDwgobPa9QgbzDaAR0izDuVK','0774561234','2022-06-01 08:57:14.500261','2022-06-01 08:57:14.500261'),(2,'Kavinda','kavinda@testmail.com','$2a$10$FcLrNwskRj92FQj/fQnWiuyWaS1izPsZFHhBBUKK87l0liC4qC9Vi','0771230987','2022-06-01 08:58:11.167005','2022-06-01 08:58:11.167005'),(3,'Kasun','kasun@testmail.com','$2a$10$g6lopGLK195Al27BMdDOkuipxAa79WJV7gepq/xaa7GX0yjRBYImC','0770981234','2022-06-01 08:58:51.284409','2022-06-01 08:58:51.284409'),(4,'Laksiri','laksiri@testmail.com','$2a$10$UXqGLoP5/fToDHcLiPaxJ.b51Hlf.cCwNCS0iTF9Cpw5stT3pulLO','0770451234','2022-06-01 09:23:37.731777','2022-06-01 09:23:37.731777');
/*!40000 ALTER TABLE `normal_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-03 14:53:54
