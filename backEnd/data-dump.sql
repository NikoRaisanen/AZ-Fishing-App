-- MySQL dump 10.19  Distrib 10.3.29-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: az_water_info
-- ------------------------------------------------------
-- Server version	10.3.29-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `waters`
--

DROP TABLE IF EXISTS `waters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `rating` varchar(10) NOT NULL,
  `region` varchar(150) NOT NULL,
  `created_at` date DEFAULT curdate(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waters`
--

LOCK TABLES `waters` WRITE;
/*!40000 ALTER TABLE `waters` DISABLE KEYS */;
INSERT INTO `waters` VALUES (1,'Arivaca Lake ','Good','Southeast Arizona','2021-05-27'),(2,'Dankworth Pond ','Fair','Southeast Arizona','2021-05-27'),(3,'Frye Mesa Reservoir ','Fair','Southeast Arizona','2021-05-27'),(4,'Parker Canyon Lake ','Good','Southeast Arizona','2021-05-27'),(5,'Apache Lake ','Good','Central Arizona','2021-05-27'),(6,'Bartlett Lake ','Great','Central Arizona','2021-05-27'),(7,'Canyon Lake ','Good','Central Arizona','2021-05-27'),(8,'Lake Pleasant ','Good','Central Arizona','2021-05-27'),(9,'Lower Salt River ','Good','Central Arizona','2021-05-27'),(10,'Roosevelt Lake ','Great','Central Arizona','2021-05-27'),(11,'Saguaro Lake ','Good','Central Arizona','2021-05-27'),(12,'Tempe Town Lake* ','Good','Central Arizona','2021-05-27'),(13,'Bear Canyon Lake ','Good','Mogollon Rim','2021-05-27'),(14,'Black Canyon Lake ','Great','Mogollon Rim','2021-05-27'),(15,'Chevelon Canyon ','Fair','Mogollon Rim','2021-05-27'),(16,'Willow Springs Lake ','Fair','Mogollon Rim','2021-05-27'),(17,'Woods Canyon Lake ','Good','Mogollon Rim','2021-05-27'),(18,'Becker Lake ','Great','Mogollon Rim','2021-05-27'),(19,'Big Lake ','Great','Mogollon Rim','2021-05-27'),(20,'Greer Lakes ','Great','Mogollon Rim','2021-05-27'),(21,'Carnero Lake','Poor','Mogollon Rim','2021-05-27'),(22,'Colorado River ','Good','NW Colorado River','2021-05-27');
/*!40000 ALTER TABLE `waters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-27 12:13:58
