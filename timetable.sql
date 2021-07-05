

CREATE TABLE `admin` (
  `idadmin` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idadmin`)
) ENGINE=InnoDB AUTO_INCREMENT=2;

INSERT INTO `admin` VALUES (1,'walid@gmail.com','$2a$10$PH.1rv8GBGQ3zrMPk1Pvyu');

CREATE TABLE `filiere` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6;

INSERT INTO `filiere` VALUES (1,'Cycle Preparatoire'),(2,'Génie Informatique'),(3,'Génie de Reseau'),(4,'Génie Industriel'),(5,'GPMC');


CREATE TABLE `classe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) DEFAULT NULL,
  `filiere_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_filiere_departement_idx` (`filiere_id`),
  CONSTRAINT `fk_filiere_departement` FOREIGN KEY (`filiere_id`) REFERENCES `filiere` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6;

INSERT INTO `classe` VALUES (1,'Cycle Preparatoire 1',1),(2,'Cycle Preparatoire 2',1),(3,'3eme année Génie Informatique',2),(4,'4eme année Génie Informatique',2),(5,'5eme année Génie Informatique',2);

CREATE TABLE `year` (
  `id` int NOT NULL AUTO_INCREMENT,
  `annee` int DEFAULT NULL,
  `semestre` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4;

INSERT INTO `year` VALUES (1,2021,1),(2,2021,2);

CREATE TABLE `emploie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `classe` varchar(45) DEFAULT NULL,
  `year_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_emploie_year1_idx` (`year_id`),
  CONSTRAINT `fk_emploie_year1` FOREIGN KEY (`year_id`) REFERENCES `year` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11;


INSERT INTO `emploie` VALUES (1,'Cycle Preparatoire 1',1),(2,'Cycle Preparatoire 1',2),(3,'3eme année Génie Informatique',1),(4,'4eme année Génie Informatique',1),(5,'5eme année Génie Informatique',1),(6,'3eme année Génie Informatique',2),(7,'4eme année Génie Informatique',2),(8,'5eme année Génie Informatique',2),(9,'Cycle Preparatoire 2',1),(10,'Cycle Preparatoire 2',2);


CREATE TABLE `type_cours` (
  `id_type` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4;

INSERT INTO `type_cours` VALUES (1,'Cours'),(2,'TD'),(3,'TP');

CREATE TABLE `groupe` (
  `id_groupe` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) DEFAULT NULL,
  `classe_id` int NOT NULL,
  `id_type` int NOT NULL,
  PRIMARY KEY (`id_groupe`),
  KEY `fk_groupe_filiere1_idx` (`classe_id`),
  KEY `fk_groupe_type_cours1_idx` (`id_type`),
  CONSTRAINT `fk_groupe_filiere1` FOREIGN KEY (`classe_id`) REFERENCES `classe` (`id`),
  CONSTRAINT `fk_groupe_type_cours1` FOREIGN KEY (`id_type`) REFERENCES `type_cours` (`id_type`)
) ENGINE=InnoDB AUTO_INCREMENT=42;

INSERT INTO `groupe` VALUES (1,'Classe',1,1),(2,'G1',1,2),(3,'G2',1,2),(4,'G3',1,2),(5,'Classe',2,1),(6,'G1',2,2),(7,'G2',2,2),(8,'G3',2,2),(9,'Classe',3,1),(10,'Groupe A',3,3),(11,'Groupe B',3,3),(12,'Groupe C',3,3),(13,'Classe',4,1),(14,'Groupe A',4,3),(15,'Groupe B',4,3),(16,'Groupe C',4,3),(17,'Classe',5,1),(18,'Groupe A',5,3),(19,'Groupe B',5,3),(20,'Groupe C',5,3),(21,'G1A',1,3),(22,'G1B',1,3),(23,'G1C',1,3),(24,'G2A',1,3),(25,'G2B',1,3),(26,'G2C',1,3),(27,'G3A',1,3),(28,'G3B',1,3),(29,'G3C',1,3),(30,'G1A',2,3),(31,'G1B',2,3),(32,'G1C',2,3),(33,'G2A',2,3),(34,'G2B',2,3),(35,'G2C',2,3),(36,'G3A',2,3),(37,'G3B',2,3),(38,'G3C',2,3),(39,'Classe',3,2),(40,'Classe',4,2),(41,'Classe',5,2);


CREATE TABLE `matiere` (
  `id_matiere` int NOT NULL AUTO_INCREMENT,
  `nom_matiere` varchar(250) DEFAULT NULL,
  `semestre` int DEFAULT NULL,
  `classe_id` int NOT NULL,
  PRIMARY KEY (`id_matiere`),
  KEY `fk_matiere_filiere1_idx` (`classe_id`),
  CONSTRAINT `fk_matiere_filiere1` FOREIGN KEY (`classe_id`) REFERENCES `classe` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38;

INSERT INTO `matiere` VALUES (1,'Analyse I',1,1),(2,'Architecture des Ordinateurs',1,1),(3,'Mécanique I',1,1),(4,'TEC1 et Activité d\'Ouverture',1,1),(5,'Physique I (Electrostatique)',1,1),(6,'Algèbre 1',1,1),(7,'Algèbre 3',1,2),(8,'Thermodynamique',1,2),(9,'Analyse 3',1,2),(10,'Mécanique du solide',1,2),(11,'Mécanique du fluide',1,2),(12,'Anglais',1,2),(13,'Electromagnétisme',1,2),(14,'Sciences Humaines TEC',1,2),(15,'DAO',1,2),(16,'Electronique numérique',1,3),(17,'Traitement de Signaux et Systèmes',1,3),(18,'Algorithmique avancée',1,3),(19,'Analyse numérique',1,3),(20,'Technologie Web I',1,3),(21,'Projets et Séminaires',1,3),(22,'Système d\'information',1,3),(23,'Programmation Orientée Objet Java II',1,4),(24,'Technologie Web Dynamique (php/MySQL)',1,4),(25,'Programmation C# et .Net',1,4),(26,'Projets et Séminaires',1,4),(27,'Développement pour plateformes mobiles',1,4),(28,'BE Réseaux I',1,4),(29,'TEC',1,4),(30,'Anglais',1,4),(31,'JEE et Web Services',1,5),(32,'Management de projet',1,5),(33,'ERP et tendances informatiques',1,5),(34,'Base de Données Avancées',1,5),(35,'Cryptage et sécurité informatique',1,5),(36,'BE Réseaux II',1,5),(37,'Entreprenariat',1,5);


CREATE TABLE `prof` (
  `id_prof` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `matiere` varchar(100) DEFAULT NULL,
  `departement` varchar(115) DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `password` varchar(115) DEFAULT NULL,
  PRIMARY KEY (`id_prof`)
) ENGINE=InnoDB AUTO_INCREMENT=50;


INSERT INTO `prof` VALUES (1,'M. BOUARIFI Walid','Analyse I','Informatique','bouarifi@gmail.com','$2a$10$PH.1rv8GBGQ3zrMPk1PvyuuEu3T9qsc6GpeZy1AXl2Ip8DpyQOmb6'),(2,'M. CHAHINE Radouane','Architecture des Ordinateurs','Informatique','chahin@gmail.com','$2a$10$M4oDpDu5QjqPmuKIAz5giupDWbgLzEAWir37J8tyiKWbtg73p/qSu'),(3,'M. KRIRAA Mounir','Mécanique I','Industriel',NULL,NULL),(4,'M. Baba Lahsen','TEC1 et Activité d\'Ouverture','Informatique',NULL,NULL),(5,'M. BENLAMKADEM','Physique I (Electrostatique)','Industriel',NULL,NULL),(6,'M. HARZALLA Driss','Algèbre 1','Informatique',NULL,NULL),(7,'Mme. LAAFAR Sara','Analyse I','Informatique',NULL,NULL),(8,'M. ELALLAOUI Abdelati','Algèbre 1','Informatique',NULL,NULL),(9,'Mme. SEMLALI Hayat','Architecture des Ordinateurs','Informatique',NULL,NULL),(10,'M. BOUKHATEM Lahcen','Physique I (Electrostatique)','Industriel',NULL,NULL),(11,'M. ZYANE Abdellah','Architecture des Ordinateurs','Industriel',NULL,NULL),(12,'M. OUJAOURA Mustapha','Analyse I','Informatique',NULL,NULL),(13,'M. ARBAOUI Jamal','Mécanique I','Industriel',NULL,NULL),(14,'M. KHRISSI Salam','Physique I (Electrostatique)','Industriel',NULL,NULL),(15,'M. OUAFIK Youssef','Algèbre 1','Informatique',NULL,NULL),(16,'M. AMMAR Abdelghali','Algèbre 3','Informatique',NULL,NULL),(17,'Mme LIFI Houda','Thermodynamique','Industriel',NULL,NULL),(18,'M. AMMAR Abdelghali','Analyse 3','Informatique',NULL,NULL),(19,'M. EL ABIDI Abderrahim','Mécanique du solide','Industriel',NULL,NULL),(20,'M. BOUKHATEM Lahcen','Mécanique du fluide','Industriel',NULL,NULL),(21,'M. LOTFI','Anglais','Industriel',NULL,NULL),(22,'M. SAAD Bendaoud','Electromagnétisme','Industriel',NULL,NULL),(23,'M. BOUDI','Sciences Humaines TEC','Industriel',NULL,NULL),(24,'M. OUAFIK Youssef','Algèbre 3','Informatique',NULL,NULL),(25,'Mme ELAIMANI Leila','Algèbre 3','Informatique',NULL,NULL),(26,'ELALLAOUI Abdelati','Analyse 3','Informatique',NULL,NULL),(27,'Mme HANNAOUI Kaoutar','Mécanique du solide','Industriel',NULL,NULL),(28,'M. OULDZIRA Hicham','DAO','Industriel',NULL,NULL),(29,'ECH-CHADI','Electronique numérique','Informatique',NULL,NULL),(30,'HABBA Maryam','Traitement de Signaux et Systèmes','Informatique',NULL,NULL),(31,'CHOUKRI','Algorithmique avancée','Informatique',NULL,NULL),(32,'JRAIFI','Analyse numérique','Informatique',NULL,NULL),(33,'EL MESLOUHI','Technologie Web I','Informatique',NULL,NULL),(34,'M. SAID ECH-CHADI','Système d\'information','Informatique',NULL,NULL),(35,'M. OUJAOURA Mustapha','Programmation Orientée Objet Java II','Informatique',NULL,NULL),(36,'M. BOUARIFI Walid','Technologie Web Dynamique (php/MySQL)','Informatique',NULL,NULL),(37,'OUARRACHI','Programmation C# et .Net','Informatique',NULL,NULL),(38,'Département','Projets et Séminaires','Informatique',NULL,NULL),(39,'EL MESLOUHI','Développement pour plateformes mobiles','Informatique',NULL,NULL),(40,'M. Baba Lahsen','TEC','Industriel',NULL,NULL),(41,'EL ATRI','Anglais','Industriel',NULL,NULL),(42,'M. CHAHINE Radouane','BE Réseaux I','Informatique',NULL,NULL),(43,'M. OUJAOURA Mustapha','JEE et Web Services','Informatique',NULL,NULL),(44,'M. BOUARIFI Walid','Management de projet','Informatique',NULL,NULL),(45,'M. OUJAOURA Mustapha','ERP et tendances informatiques','Informatique',NULL,NULL),(46,'M. SAID ECH-CHADI','Base de Données Avancées','Informatique',NULL,NULL),(47,'HARZALLA Driss','Cryptage et sécurité informatique','Informatique',NULL,NULL),(48,'ZYANE Abdellah','BE Réseaux II','Informatique',NULL,NULL),(49,'ECH-CHADI/ BEKKAS','Entreprenariat','Informatique',NULL,NULL);


CREATE TABLE `salle` (
  `id_salle` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_salle`)
) ENGINE=InnoDB AUTO_INCREMENT=27;


INSERT INTO `salle` VALUES (1,'Salle 1'),(2,'Salle 2'),(3,'Salle 3'),(4,'Salle 4'),(5,'Salle 5'),(6,'Salle 6'),(7,'Salle 7'),(8,'Salle 8'),(9,'Salle 9'),(10,'Salle 10'),(11,'Salle 11'),(12,'Salle 12'),(13,'Salle 13'),(14,'Salle 14'),(15,'Salle 15'),(16,'Salle 16'),(17,'Salle 17'),(18,'Salle 18'),(19,'Salle 19'),(20,'Salle 20'),(21,'Amphi A'),(22,'Amphi B'),(23,'Atelier 1'),(24,'Atelier 2'),(25,'Atelier 3'),(26,'Atelier 4');

CREATE TABLE `seance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heure` varchar(45) DEFAULT NULL,
  `matiere` varchar(115) DEFAULT NULL,
  `type_cours` varchar(45) DEFAULT NULL,
  `groupe` varchar(115) DEFAULT NULL,
  `prof` varchar(115) DEFAULT NULL,
  `salle` varchar(45) DEFAULT NULL,
  `debut` int DEFAULT NULL,
  `fin` int DEFAULT NULL,
  `emploie_id` int NOT NULL,
  `jour` varchar(115) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_seance_emploie1_idx` (`emploie_id`),
  CONSTRAINT `fk_seance_emploie1` FOREIGN KEY (`emploie_id`) REFERENCES `emploie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134;

INSERT INTO `seance` VALUES (111,'16h:10-18h:00','Physique I (Electrostatique)','TD','G1','M. BENLAMKADEM','Salle 13',NULL,NULL,1,'lundi'),(116,'8h:00-9h:55','Analyse I','TD','G1','M. BOUARIFI Walid','Salle 8',NULL,NULL,1,'mardi'),(119,'10h:10-12h:00','Architecture des Ordinateurs','Cours','Classe','Mme. SEMLALI Hayat','Salle 14',NULL,NULL,1,'mercredi'),(121,'10h:10-12h:00','Architecture des Ordinateurs','TD','G2','M. CHAHINE Radouane','Salle 20',1,9,1,'mardi'),(122,'8h:00-9h:55','Analyse I','TD','G1','M. BOUARIFI Walid','Salle 1',NULL,NULL,1,'lundi'),(123,'8h:00-9h:55','Analyse I','TD','G2','Mme. LAAFAR Sara','Salle 2',NULL,NULL,1,'lundi'),(127,'12h:10 -14h:00','Analyse I','Cours','Classe','M. BOUARIFI Walid','Salle 7',1,7,1,'lundi'),(128,'12h:10 -14h:00','Architecture des Ordinateurs','TP','G1B','M. CHAHINE Radouane','Salle 15',8,12,1,'lundi'),(129,'8h:00-9h:55','Physique I (Electrostatique)','TD','G3','M. BENLAMKADEM','Salle 3',NULL,NULL,1,'lundi'),(130,'10h:10-12h:00','Analyse I','TD','G1','Mme. LAAFAR Sara','Salle 20',NULL,NULL,1,'lundi'),(131,'12h:10 -14h:00','Analyse I','Cours','Classe','M. BOUARIFI Walid','Salle 12',8,11,1,'lundi'),(132,'16h:10-18h:00','Architecture des Ordinateurs','TP','G2B','Mme. SEMLALI Hayat','Salle 14',NULL,NULL,1,'lundi'),(133,'16h:10-18h:00','Mécanique I','TD','G3','M. KRIRAA Mounir','Salle 19',NULL,NULL,1,'lundi');

CREATE TABLE `sousgroupe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `groupe_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sousGroupe_groupe1_idx` (`groupe_id`),
  CONSTRAINT `fk_sousGroupe_groupe1` FOREIGN KEY (`groupe_id`) REFERENCES `groupe` (`id_groupe`)
) ENGINE=InnoDB AUTO_INCREMENT=10;

INSERT INTO `sousgroupe` VALUES (1,'G1A',2),(2,'G1B',2),(3,'G1C',2),(4,'G2A',3),(5,'G2B',3),(6,'G2C',3),(7,'G3A',4),(8,'G3B',4),(9,'G3C',4);

