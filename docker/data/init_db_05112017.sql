-- phpMyAdmin SQL Dump
-- version home.pl
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 05, 2017 at 05:02 PM
-- Server version: 5.7.18-14-log
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin2 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `AddressData`
--

INSERT INTO `AddressData` (`idAddressData`, `name`, `fisrtName`, `surname`, `nipNumber`, `phoneNumber`, `street`, `houseNumber`, `apartmentNumber`, `postalCode`, `city`) VALUES
(1, 'name', 'firstName', 'surname', 'nipNumber', 918273652, 'street', 'houseNumber', 'apartmentNumber', 'postalCode', 'city');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin2 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `Author`
--

INSERT INTO `Author` (`idAuthor`, `firstName`, `surName`) VALUES
(7, 'Dan', 'Brown'),
(9, 'Stephen', 'King'),
(11, 'Nesbo', 'Jo');

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

--
-- Dumping data for table `AuthorBook`
--

INSERT INTO `AuthorBook` (`idAuthor`, `ISBN`) VALUES
(11, '9788324589913'),
(11, '9788327157317'),
(9, '9788378859369'),
(7, '9788381101431');

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

--
-- Dumping data for table `Book`
--

INSERT INTO `Book` (`ISBN`, `title`, `idPublisher`, `year`, `idCategory`, `description`, `quantity`, `onDemand`, `suspended`, `purchasePrice`, `sellingPrice`, `numberSold`) VALUES
('9788324589913', 'Czerwone gardło', 3, 2010, 1, 'Wiosna 1940 roku. Wojna w pełnym toku, RAF zmaga się z Luftwaffe, młodzi mężczyźni poszli na front, a Tommy Beresford, bohater poprzedniej wojny, siedzi w domu i czuje się niepotrzebny. Na szczęście otrzymuje tajne zadanie: wytropienia siatki szpiegowskiej działającej w spokojnym angielskim kurorcie. Nie jest to łatwe zadanie. Będący na jej tropie najlepszy agent został zamordowany. Zostawił jednak wskazówkę: wroga należy szukać wśród gości hoteliku Sans Souci. ', 2, 0, 0, 14.79, 21.49, 28),
('9788327157317', 'Pierwszy śnieg', 3, 2017, 1, 'Jest listopad, w Oslo właśnie spadł pierwszy śnieg. Birte Becker po powrocie z pracy do domu chwali syna i męża za ulepienie bałwana w ogrodzie. Nie jest on jednak ich dziełem. Stają przy oknie - i widzą, że bałwan jest skierowany twarzą w stronę domu. Patrzy wprost na nich.\r\nW tym samym czasie komisarz Harry Hole otrzymuje anonimowy list podpisany "Bałwan". Zaczyna dostrzegać wspólne cechy dawnych, niewyjaśnionych spraw. Okazuje się, że wraz z pierwszymi oznakami zimy do gazet trafia informacja o nowym morderstwie. Ofiara jest zawsze zamężną kobietą, a jednocześnie w pobliżu miejsca zbrodni pojawia się bałwan. Wszystko wskazuje na to, że po Oslo i okolicach znów krąży seryjny zabójca. ', 10, 0, 0, 15.99, 25.62, 0),
('9788378859369', ' Pan Mercedes', 2, 2016, 1, 'Debiut Stephena Kinga w gatunku kryminału detektywistycznego hardboiled.\r\nTuż przed świtem, w spokojnym miasteczku, setki zdesperowanych, bezrobotnych ludzi stoi w kolejce na targi pracy. Nagle, bez ostrzeżenia, samotny kierowca w kradzionym Mercedesie wpada w tłum. Zabija osiem osób, rani piętnaście. Ucieka z miejsca wypadku. Brady, nazywający sam siebie "sprafcą", pokochał dotyk śmierci pod kołami Mercedesa i chce poczuć go ponownie. Kolejna misja Brady''ego, jeśli się powiedzie, zabije tysiące osób.\r\nTylko emerytowany detektyw Bill Hodges wraz z dwójką sprzymierzeńców może zatrzymać mordercę, zanim ten uderzy ponownie. Kto kryje się pod pseudonimem Pan Mercedes i jak go odnaleźć? ', 20, 0, 0, 14.79, 29.27, 15),
('9788381101431', 'Poczatek', 1, 2017, 3, ' Robert Langdon, profesor Uniwersytetu Harvarda, specjalista w dziedzinie ikonologii religijnej i symboli, przybywa do Muzeum Guggenheima w Bilbao, gdzie ma dojść do ujawnienia odkrycia, które ?na zawsze zmieni oblicze nauki?. \r\nGospodarzem wieczoru jest Edmond Kirsch, czterdziestoletni miliarder i futurysta, którego oszałamiające wynalazki i śmiałe przepowiednie zapewniły mu rozgłos na całym świecie. Kirsch, który dwadzieścia lat wcześniej był jednym z pierwszych studentów Langdona na Harvardzie, planuje ujawnić informację, która będzie stanowić odpowiedź na fundamentalne pytania dotyczące ludzkiej egzystencji.\r\nGdy Langdon i kilkuset innych gości w osłupieniu ogląda oryginalną prezentację, wieczór zmienia się w chaos, a cenne odkrycie Kirscha może przepaść na zawsze. Chcąc stawić czoła nieuchronnemu zagrożeniu, Langdon musi uciekać z Bilbao. Towarzyszy mu Ambra Vidal, elegancka dyrektorka muzeum, która pomagała Kirschowi zorganizować wydarzenie. Razem udają się do Barcelony i podejmują niebezpieczną misję odnalezienia kryptograficznego hasła, które stanowi klucz do sekretu Kirscha. ', 12, 0, 0, 10.99, 26.99, 8);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin2 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`idCategory`, `name`) VALUES
(2, 'Horror'),
(1, 'Kryminal'),
(3, 'Sensacja');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin2 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `Publisher`
--

INSERT INTO `Publisher` (`idPublisher`, `name`, `idAddressData`, `email`) VALUES
(1, 'Sonia Draga', 1, 'sonia-draga@mail.com'),
(2, 'ALBATROS', 1, 'albatros@mail.com'),
(3, 'Dolnośląskie', 1, 'wyd-dolnoslaskie@mail.com');

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
  ADD CONSTRAINT `ISBN` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idAuthor` FOREIGN KEY (`idAuthor`) REFERENCES `Author` (`idAuthor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `ISBNorder` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idOrder` FOREIGN KEY (`idOrder`) REFERENCES `Order` (`idOrder`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Deliverer`
--
ALTER TABLE `Deliverer`
  ADD CONSTRAINT `idAddresDeliverer` FOREIGN KEY (`idAddresData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Delivery`
--
ALTER TABLE `Delivery`
  ADD CONSTRAINT `ISBNdelivery` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idPublisherDelivery` FOREIGN KEY (`idDeliverer`) REFERENCES `Deliverer` (`idDeliverer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `idAddressDataUser` FOREIGN KEY (`idAddressData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idDeliveryData` FOREIGN KEY (`idDeliveryData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idInvoiceData` FOREIGN KEY (`idInvoiceData`) REFERENCES `AddressData` (`idAddressData`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
