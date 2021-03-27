DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `articleid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `keyword` varchar(100) NOT NULL,
  `authorid` int(10) unsigned NOT NULL,
  `issueid` mediumint(8) unsigned NOT NULL,
  `headline` varchar(255) NOT NULL,
  `sectionid` int(10) unsigned NOT NULL,
  `section` varchar(100) NOT NULL,
  `priority` smallint(6) NOT NULL DEFAULT '50',
  `body` mediumtext NOT NULL,
  `teaser` mediumtext NOT NULL,
  /*`photoUploadId` int(10) unsigned NOT NULL,
  `photoFilename` varchar(50) NOT NULL,
  `photoCaption` varchar(255) NOT NULL,
  `photoCredit` varchar(255) NOT NULL,
  `photoPosition` enum('above','embedded') NOT NULL DEFAULT 'embedded',*/
  `views` int(10) unsigned NOT NULL,
  `emailedCount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`articleid`),
  KEY `issueid` (`issueid`),
  KEY `keyword` (`keyword`),
  FULLTEXT KEY `body` (`body`),
  FULLTEXT KEY `headline` (`headline`,`body`)
) ENGINE=MyISAM AUTO_INCREMENT=3250 DEFAULT CHARSET=latin1;

INSERT INTO articles VALUES(1, 'test-article', 1, 1, 'Test article title', 1, 'section', 50, 'Lorem ipsum sit dolor amet, consectetur adipiscing elit.', 'Yay Latin', 0, 0);


DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `authorid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `author` varchar(100) NOT NULL,
  `keyword` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Writer',
  `isRetired` tinyint(1) NOT NULL DEFAULT '0',
  `articleCount` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`authorid`),
  KEY `accountid` (`accountid`),
  FULLTEXT KEY `author` (`author`)
) ENGINE=MyISAM AUTO_INCREMENT=276 DEFAULT CHARSET=latin1;

INSERT INTO authors VALUES(1, 'Jane Doe', 'Jane-Doe', 'Writer', 0, 1);


DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections` (
  `sectionid` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(100) NOT NULL,
  `section` varchar(100) NOT NULL,
  PRIMARY KEY (`sectionid`),
  KEY `keyword` (`keyword`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

INSERT INTO sections VALUES(1, 'section-page', 'section');
