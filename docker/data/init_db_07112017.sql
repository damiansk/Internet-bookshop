-- phpMyAdmin SQL Dump
-- version home.pl
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 07, 2017 at 02:43 PM
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
-- Table structure for table `Book`
--

CREATE TABLE IF NOT EXISTS `Book` (
  `ISBN` varchar(20) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `idPublisher` int(10) unsigned NOT NULL,
  `year` int(4) NOT NULL,
  `idCategory` int(10) unsigned NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `onDemand` tinyint(4) NOT NULL DEFAULT '0',
  `suspended` tinyint(4) NOT NULL DEFAULT '0',
  `purchasePrice` double unsigned NOT NULL,
  `sellingPrice` double unsigned NOT NULL,
  `numberSold` int(10) unsigned NOT NULL DEFAULT '0',
  `Thumbnail` varchar(100) NOT NULL,
  PRIMARY KEY (`ISBN`),
  KEY `idPublisher_idx` (`idPublisher`),
  KEY `idCategory_idx` (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- Dumping data for table `Book`
--

INSERT INTO `Book` (`ISBN`, `title`, `idPublisher`, `year`, `idCategory`, `description`, `quantity`, `onDemand`, `suspended`, `purchasePrice`, `sellingPrice`, `numberSold`, `Thumbnail`) VALUES
('9788324589913', 'Czerwone gardło', 3, 2010, 1, 'Wiosna 1940 roku. Wojna w pełnym toku, RAF zmaga się z Luftwaffe, młodzi mężczyźni poszli na front, a Tommy Beresford, bohater poprzedniej wojny, siedzi w domu i czuje się niepotrzebny. Na szczęście otrzymuje tajne zadanie: wytropienia siatki szpiegowskiej działającej w spokojnym angielskim kurorcie. Nie jest to łatwe zadanie. Będący na jej tropie najlepszy agent został zamordowany. Zostawił jednak wskazówkę: wroga należy szukać wśród gości hoteliku Sans Souci. ', 2, 0, 0, 14.79, 21.49, 28, 'https://woblink.com/storable/pub_photos/1295134-pdw_book_cover.jpg'),
('9788327157317', 'Pierwszy śnieg', 3, 2017, 1, 'Jest listopad, w Oslo właśnie spadł pierwszy śnieg. Birte Becker po powrocie z pracy do domu chwali syna i męża za ulepienie bałwana w ogrodzie. Nie jest on jednak ich dziełem. Stają przy oknie - i widzą, że bałwan jest skierowany twarzą w stronę domu. Patrzy wprost na nich.\r\nW tym samym czasie komisarz Harry Hole otrzymuje anonimowy list podpisany "Bałwan". Zaczyna dostrzegać wspólne cechy dawnych, niewyjaśnionych spraw. Okazuje się, że wraz z pierwszymi oznakami zimy do gazet trafia informacja o nowym morderstwie. Ofiara jest zawsze zamężną kobietą, a jednocześnie w pobliżu miejsca zbrodni pojawia się bałwan. Wszystko wskazuje na to, że po Oslo i okolicach znów krąży seryjny zabójca. ', 10, 0, 0, 15.99, 25.62, 0, 'http://ecsmedia.pl/c/harry-hole-tom-7-pierwszy-snieg-b-iext43178539.jpg'),
('9788378859369', ' Pan Mercedes', 2, 2016, 1, 'Debiut Stephena Kinga w gatunku kryminału detektywistycznego hardboiled.\r\nTuż przed świtem, w spokojnym miasteczku, setki zdesperowanych, bezrobotnych ludzi stoi w kolejce na targi pracy. Nagle, bez ostrzeżenia, samotny kierowca w kradzionym Mercedesie wpada w tłum. Zabija osiem osób, rani piętnaście. Ucieka z miejsca wypadku. Brady, nazywający sam siebie "sprafcą", pokochał dotyk śmierci pod kołami Mercedesa i chce poczuć go ponownie. Kolejna misja Brady''ego, jeśli się powiedzie, zabije tysiące osób.\r\nTylko emerytowany detektyw Bill Hodges wraz z dwójką sprzymierzeńców może zatrzymać mordercę, zanim ten uderzy ponownie. Kto kryje się pod pseudonimem Pan Mercedes i jak go odnaleźć? ', 20, 0, 0, 14.79, 29.27, 15, 'https://woblink.com/storable/pub_photos/386950-pan-mercedes.jpg'),
('9788381101431', 'Poczatek', 1, 2017, 3, ' Robert Langdon, profesor Uniwersytetu Harvarda, specjalista w dziedzinie ikonologii religijnej i symboli, przybywa do Muzeum Guggenheima w Bilbao, gdzie ma dojść do ujawnienia odkrycia, które ?na zawsze zmieni oblicze nauki?. \r\nGospodarzem wieczoru jest Edmond Kirsch, czterdziestoletni miliarder i futurysta, którego oszałamiające wynalazki i śmiałe przepowiednie zapewniły mu rozgłos na całym świecie. Kirsch, który dwadzieścia lat wcześniej był jednym z pierwszych studentów Langdona na Harvardzie, planuje ujawnić informację, która będzie stanowić odpowiedź na fundamentalne pytania dotyczące ludzkiej egzystencji.\r\nGdy Langdon i kilkuset innych gości w osłupieniu ogląda oryginalną prezentację, wieczór zmienia się w chaos, a cenne odkrycie Kirscha może przepaść na zawsze. Chcąc stawić czoła nieuchronnemu zagrożeniu, Langdon musi uciekać z Bilbao. Towarzyszy mu Ambra Vidal, elegancka dyrektorka muzeum, która pomagała Kirschowi zorganizować wydarzenie. Razem udają się do Barcelony i podejmują niebezpieczną misję odnalezienia kryptograficznego hasła, które stanowi klucz do sekretu Kirscha. ', 12, 0, 0, 10.99, 26.99, 8, 'https://media.merlin.pl/media/original/000/015/641/5971c1ab4914a.jpg');

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
