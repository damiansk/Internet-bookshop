-- phpMyAdmin SQL Dump
-- version home.pl
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 03, 2017 at 06:39 PM
-- Server version: 5.5.54-38.6-log
-- PHP Version: 7.1.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `14651951_ibd`
--

-- --------------------------------------------------------

--
-- Table structure for table `AddressData`
--

CREATE TABLE IF NOT EXISTS `AddressData` (
  `idAddressData` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `fisrtName` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `nipNumber` varchar(45) DEFAULT NULL,
  `phoneNumber` int(11) NOT NULL,
  `street` varchar(45) NOT NULL,
  `houseNumber` varchar(45) NOT NULL,
  `apartmentNumber` varchar(45) DEFAULT NULL,
  `postalCode` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  PRIMARY KEY (`idAddressData`),
  UNIQUE KEY `idAddressData_UNIQUE` (`idAddressData`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Author`
--

CREATE TABLE IF NOT EXISTS `Author` (
  `idAuthor` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `surName` varchar(45) NOT NULL,
  PRIMARY KEY (`idAuthor`),
  UNIQUE KEY `idAutor_UNIQUE` (`idAuthor`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin2 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `Author`
--

INSERT INTO `Author` (`idAuthor`, `firstName`, `surName`) VALUES
(1, 'firssst', 'surrrName'),
(2, 'test1', 'muahahahah'),
(3, 'test1', 'janusze zla'),
(4, 'test1', 'test2'),
(5, 'test1', 'test2'),
(6, 'Jacek', 'Panek');

-- --------------------------------------------------------

--
-- Table structure for table `AuthorBook`
--

CREATE TABLE IF NOT EXISTS `AuthorBook` (
  `idAuthor` int(10) unsigned NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  PRIMARY KEY (`idAuthor`,`ISBN`),
  KEY `ISBN_idx` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Table structure for table `Book`
--

CREATE TABLE IF NOT EXISTS `Book` (
  `ISBN` varchar(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `idPublisher` int(10) unsigned NOT NULL,
  `year` int(4) NOT NULL,
  `idCategory` int(10) unsigned NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `onDemand` tinyint(4) NOT NULL DEFAULT '0',
  `suspended` tinyint(4) NOT NULL DEFAULT '0',
  `purchasePrice` double unsigned NOT NULL,
  `sellingPrice` double unsigned NOT NULL,
  `numberSold` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`ISBN`),
  KEY `idPublisher_idx` (`idPublisher`),
  KEY `idCategory_idx` (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Table structure for table `BookInOrder`
--

CREATE TABLE IF NOT EXISTS `BookInOrder` (
  `idOrder` int(10) unsigned NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`idOrder`,`ISBN`),
  KEY `ISBNorder_idx` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE IF NOT EXISTS `Category` (
  `idCategory` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE KEY `idCategory_UNIQUE` (`idCategory`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Deliverer`
--

CREATE TABLE IF NOT EXISTS `Deliverer` (
  `idDeliverer` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `idAddresData` int(10) unsigned NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`idDeliverer`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `idAddresDeliverer_idx` (`idAddresData`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Delivery`
--

CREATE TABLE IF NOT EXISTS `Delivery` (
  `idDelivery` int(10) unsigned NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  `deliveryDate` date NOT NULL,
  `numberOfOrdered` int(11) NOT NULL,
  `idDeliverer` int(11) NOT NULL,
  PRIMARY KEY (`idDelivery`),
  UNIQUE KEY `idDelivery_UNIQUE` (`idDelivery`),
  KEY `ISBNdelivery_idx` (`ISBN`),
  KEY `idPublisherDelivery_idx` (`idDeliverer`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE IF NOT EXISTS `employee` (
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`login`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Table structure for table `Order`
--

CREATE TABLE IF NOT EXISTS `Order` (
  `idOrder` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idUser` varchar(100) NOT NULL,
  `orderDate` date NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `comments` text,
  PRIMARY KEY (`idOrder`),
  UNIQUE KEY `idOrder_UNIQUE` (`idOrder`),
  KEY `idUser_idx` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Photo`
--

CREATE TABLE IF NOT EXISTS `Photo` (
  `photoLink` varchar(255) NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  PRIMARY KEY (`photoLink`),
  KEY `ISBN_idx` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Table structure for table `Publisher`
--

CREATE TABLE IF NOT EXISTS `Publisher` (
  `idPublisher` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `idAddressData` int(10) unsigned NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`idPublisher`),
  UNIQUE KEY `idPublisher_UNIQUE` (`idPublisher`),
  KEY `idAddressData_idx` (`idAddressData`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `idAddressData` int(10) unsigned NOT NULL,
  `idInvoiceData` int(10) unsigned NOT NULL,
  `idDeliveryData` int(10) unsigned NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `idAddressData_idx` (`idAddressData`),
  KEY `idInvoiceData_idx` (`idInvoiceData`),
  KEY `idDeliveryData_idx` (`idDeliveryData`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AuthorBook`
--
ALTER TABLE `AuthorBook`
  ADD CONSTRAINT `idAuthor` FOREIGN KEY (`idAuthor`) REFERENCES `Author` (`idAuthor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ISBN` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Book`
--
ALTER TABLE `Book`
  ADD CONSTRAINT `idCategory` FOREIGN KEY (`idCategory`) REFERENCES `Category` (`idCategory`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idPublisher` FOREIGN KEY (`idPublisher`) REFERENCES `Publisher` (`idPublisher`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `BookInOrder`
--
ALTER TABLE `BookInOrder`
  ADD CONSTRAINT `idOrder` FOREIGN KEY (`idOrder`) REFERENCES `Order` (`idOrder`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ISBNorder` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Deliverer`
--
ALTER TABLE `Deliverer`
  ADD CONSTRAINT `idAddresDeliverer` FOREIGN KEY (`idAddresData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Delivery`
--
ALTER TABLE `Delivery`
  ADD CONSTRAINT `idPublisherDelivery` FOREIGN KEY (`idDeliverer`) REFERENCES `Deliverer` (`idDeliverer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ISBNdelivery` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `idUser` FOREIGN KEY (`idUser`) REFERENCES `User` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Photo`
--
ALTER TABLE `Photo`
  ADD CONSTRAINT `ISBNbook` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Publisher`
--
ALTER TABLE `Publisher`
  ADD CONSTRAINT `idAddressData` FOREIGN KEY (`idAddressData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `idDeliveryData` FOREIGN KEY (`idDeliveryData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idAddressDataUser` FOREIGN KEY (`idAddressData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idInvoiceData` FOREIGN KEY (`idInvoiceData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
