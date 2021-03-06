-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2021 at 09:04 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `requisition`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminaccess`
--

CREATE TABLE `adminaccess` (
  `id` int(11) NOT NULL,
  `admintype` tinyint(4) NOT NULL,
  `adminid` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `adminaccess`:
--   `admintype`
--       `admintype` -> `admintypeid`
--   `adminid`
--       `dataadmin` -> `admAdminPK`
--

--
-- Dumping data for table `adminaccess`
--

INSERT INTO `adminaccess` (`id`, `admintype`, `adminid`) VALUES
(1, 1, 104657),
(2, 1, 106414),
(3, 1, 112951),
(4, 1, 121565),
(5, 1, 126422),
(6, 2, 346755),
(7, 2, 71455),
(8, 1, 1033012),
(9, 1, 123);

-- --------------------------------------------------------

--
-- Table structure for table `admintype`
--

CREATE TABLE `admintype` (
  `admintypeid` tinyint(4) NOT NULL,
  `admintype` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `admintype`:
--

--
-- Dumping data for table `admintype`
--

INSERT INTO `admintype` (`admintypeid`, `admintype`) VALUES
(1, 'Requestor'),
(2, 'Approver');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brandpk` int(6) NOT NULL,
  `brandName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `brands`:
--

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brandpk`, `brandName`) VALUES
(1, 'CISCO'),
(2, 'IBALL'),
(3, 'HP'),
(4, 'DELL'),
(5, 'ASUS'),
(8, 'JBL'),
(9, 'SanDisk');

-- --------------------------------------------------------

--
-- Table structure for table `budgets`
--

CREATE TABLE `budgets` (
  `id` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `location` varchar(11) NOT NULL,
  `budget` bigint(20) NOT NULL,
  `current_balance` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `budgets`:
--   `department`
--       `departments` -> `id`
--

--
-- Dumping data for table `budgets`
--

INSERT INTO `budgets` (`id`, `department`, `location`, `budget`, `current_balance`) VALUES
(1, 1, '01010101005', 100000, 100000),
(2, 1, '01010101003', 100000, 100000),
(3, 1, '01010101006', 100000, 100000),
(4, 1, '01010101024', 100000, 100000),
(5, 1, '01010101025', 100000, 100000),
(6, 1, '01010101018', 100000, 100000),
(7, 1, '01010101002', 100000, 100000),
(8, 1, '01010101007', 100000, 100000),
(9, 1, '01010101016', 100000, 100000),
(10, 1, '01010101021', 100000, 100000),
(11, 1, '01010101023', 100000, 100000),
(12, 1, '01010101015', 100000, 100000),
(13, 1, '01010101017', 100000, 100000),
(14, 1, '01010101014', 100000, 100000),
(15, 1, '01010101020', 100000, 100000),
(16, 1, '01010101013', 100000, 100000),
(17, 1, '01010101012', 100000, 100000),
(18, 1, '01010101011', 100000, 100000),
(19, 1, '01010101010', 100000, 100000),
(20, 1, '01010101026', 100000, 100000),
(21, 1, '01010101009', 100000, 100000),
(22, 1, '01010101001', 100000, 100000),
(23, 1, '01010101004', 100000, 100000),
(24, 1, '01010101022', 100000, 100000),
(25, 1, '01010101008', 100000, 100000),
(26, 1, '01010101019', 100000, 100000),
(27, 3, '01010101005', 90000, 90000),
(28, 3, '01010101003', 90000, 90000),
(29, 3, '01010101006', 90000, 90000),
(30, 3, '01010101024', 90000, 90000),
(31, 3, '01010101025', 90000, 90000),
(32, 3, '01010101018', 90000, 90000),
(33, 3, '01010101002', 90000, 90000),
(34, 3, '01010101007', 90000, 90000),
(35, 3, '01010101016', 90000, 90000),
(36, 3, '01010101021', 90000, 90000),
(37, 3, '01010101023', 90000, 90000),
(38, 3, '01010101015', 90000, 90000),
(39, 3, '01010101017', 90000, 90000),
(40, 3, '01010101014', 90000, 90000),
(41, 3, '01010101020', 88000, 90000),
(42, 3, '01010101013', 90000, 90000),
(43, 3, '01010101012', 90000, 90000),
(44, 3, '01010101011', 90000, 90000),
(45, 3, '01010101010', 90000, 90000),
(46, 3, '01010101026', 90000, 90000),
(47, 3, '01010101009', 90000, 90000),
(48, 3, '01010101001', 90000, 90000),
(49, 3, '01010101004', 90000, 90000),
(50, 3, '01010101022', 90000, 90000),
(51, 3, '01010101008', 90000, 90000),
(52, 3, '01010101019', 90000, 90000),
(53, 4, '01010101005', 118000, 150000),
(54, 4, '01010101003', 150000, 150000),
(55, 4, '01010101006', 150000, 150000),
(56, 4, '01010101024', 86000, 150000),
(57, 4, '01010101025', 150000, 150000),
(58, 4, '01010101018', 150000, 150000),
(59, 4, '01010101002', 150000, 150000),
(60, 4, '01010101007', 150000, 150000),
(61, 4, '01010101016', 150000, 150000),
(62, 4, '01010101021', 128000, 150000),
(63, 4, '01010101023', 150000, 150000),
(64, 4, '01010101015', 96000, 150000),
(65, 4, '01010101017', 150000, 150000),
(66, 4, '01010101014', 150000, 150000),
(67, 4, '01010101020', 150000, 150000),
(68, 4, '01010101013', 150000, 150000),
(69, 4, '01010101012', 150000, 150000),
(70, 4, '01010101011', 150000, 150000),
(71, 4, '01010101010', 150000, 150000),
(72, 4, '01010101026', 150000, 150000),
(73, 4, '01010101009', 150000, 150000),
(74, 4, '01010101001', 150000, 150000),
(75, 4, '01010101004', 150000, 150000),
(76, 4, '01010101022', 150000, 150000),
(77, 4, '01010101008', 150000, 150000),
(78, 4, '01010101019', 150000, 150000),
(79, 5, '01010101005', 130000, 130000),
(80, 5, '01010101003', 66000, 130000),
(81, 5, '01010101006', 130000, 130000),
(82, 5, '01010101024', 130000, 130000),
(83, 5, '01010101025', 130000, 130000),
(84, 5, '01010101018', 130000, 130000),
(85, 5, '01010101002', 130000, 130000),
(86, 5, '01010101007', 130000, 130000),
(87, 5, '01010101016', 130000, 130000),
(88, 5, '01010101021', 130000, 130000),
(89, 5, '01010101023', 108000, 130000),
(90, 5, '01010101015', 130000, 130000),
(91, 5, '01010101017', 130000, 130000),
(92, 5, '01010101014', 130000, 130000),
(93, 5, '01010101020', 130000, 130000),
(94, 5, '01010101013', 130000, 130000),
(95, 5, '01010101012', 130000, 130000),
(96, 5, '01010101011', 130000, 130000),
(97, 5, '01010101010', 130000, 130000),
(98, 5, '01010101026', 130000, 130000),
(99, 5, '01010101009', 130000, 130000),
(100, 5, '01010101001', 130000, 130000),
(101, 5, '01010101004', 130000, 130000),
(102, 5, '01010101022', 96000, 130000),
(103, 5, '01010101008', 130000, 130000),
(104, 5, '01010101019', 130000, 130000),
(105, 6, '01010101005', 140000, 140000),
(106, 6, '01010101003', 140000, 140000),
(107, 6, '01010101006', 140000, 140000),
(108, 6, '01010101024', 140000, 140000),
(109, 6, '01010101025', 140000, 140000),
(110, 6, '01010101018', 140000, 140000),
(111, 6, '01010101002', 140000, 140000),
(112, 6, '01010101007', 140000, 140000),
(113, 6, '01010101016', 140000, 140000),
(114, 6, '01010101021', 120000, 140000),
(115, 6, '01010101023', 140000, 140000),
(116, 6, '01010101015', 106000, 140000),
(117, 6, '01010101017', 140000, 140000),
(118, 6, '01010101014', 106000, 140000),
(119, 6, '01010101020', 140000, 140000),
(120, 6, '01010101013', 140000, 140000),
(121, 6, '01010101012', 140000, 140000),
(122, 6, '01010101011', 140000, 140000),
(123, 6, '01010101010', 140000, 140000),
(124, 6, '01010101026', 72000, 140000),
(125, 6, '01010101009', 140000, 140000),
(126, 6, '01010101001', 140000, 140000),
(127, 6, '01010101004', 140000, 140000),
(128, 6, '01010101022', 140000, 140000),
(129, 6, '01010101008', 140000, 140000),
(130, 6, '01010101019', 140000, 140000),
(131, 7, '01010101005', 120000, 120000),
(132, 7, '01010101003', 56000, 120000),
(133, 7, '01010101006', 120000, 120000),
(134, 7, '01010101024', 120000, 120000),
(135, 7, '01010101025', 120000, 120000),
(136, 7, '01010101018', 120000, 120000),
(137, 7, '01010101002', 120000, 120000),
(138, 7, '01010101007', 120000, 120000),
(139, 7, '01010101016', 120000, 120000),
(140, 7, '01010101021', 120000, 120000),
(141, 7, '01010101023', 120000, 120000),
(142, 7, '01010101015', 120000, 120000),
(143, 7, '01010101017', 120000, 120000),
(144, 7, '01010101014', 120000, 120000),
(145, 7, '01010101020', 120000, 120000),
(146, 7, '01010101013', 120000, 120000),
(147, 7, '01010101012', 120000, 120000),
(148, 7, '01010101011', 120000, 120000),
(149, 7, '01010101010', 120000, 120000),
(150, 7, '01010101026', 120000, 120000),
(151, 7, '01010101009', 120000, 120000),
(152, 7, '01010101001', 120000, 120000),
(153, 7, '01010101004', 120000, 120000),
(154, 7, '01010101022', 120000, 120000),
(155, 7, '01010101008', 120000, 120000),
(156, 7, '01010101019', 118000, 120000);

-- --------------------------------------------------------

--
-- Table structure for table `dataadmin`
--

CREATE TABLE `dataadmin` (
  `admAdminPK` int(9) NOT NULL,
  `admName` varchar(30) NOT NULL,
  `admDOJ` date NOT NULL,
  `admIsActive` bit(1) NOT NULL,
  `admpwd` varchar(60) NOT NULL,
  `admSecretQn` varchar(50) NOT NULL,
  `admSecretAns` varchar(60) NOT NULL,
  `admOffLandLineNo` varchar(20) NOT NULL,
  `admMobileNo` varchar(20) DEFAULT NULL,
  `admFaxNo` varchar(20) DEFAULT NULL,
  `admEmail` varchar(30) NOT NULL,
  `admVoIP` varchar(20) DEFAULT NULL,
  `admPhotoURL` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `dataadmin`:
--

--
-- Dumping data for table `dataadmin`
--

INSERT INTO `dataadmin` (`admAdminPK`, `admName`, `admDOJ`, `admIsActive`, `admpwd`, `admSecretQn`, `admSecretAns`, `admOffLandLineNo`, `admMobileNo`, `admFaxNo`, `admEmail`, `admVoIP`, `admPhotoURL`) VALUES
(123, 'Nupur Swami', '2020-12-08', b'1', '12345678', 'What is your favourite city', 'Lucknow', '2692873', '9543059543', '3212312', 'abc091xyz1234@gmail.com', NULL, NULL),
(9130, 'Murahar Kulkarni', '1980-10-01', b'1', '12345678', 'What is my monther\'s maiden name?', '$2a$12$Dbb/Aw5MLPSRRroD9s/3G.sUyBTiCtnN74Jcd13KLjXNKZWVCNSQW', '022-6778 8165', '91 98191 00959', '', 'murahar.kulkarni@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\9130.jpg'),
(13269, 'Vijay Jayakar', '2000-01-01', b'1', '12345678', 'Location', '$2a$12$yh.QRfHmBuB3JAyP2cCD0exQSWxGPNEbXc8LHHxYz1LQ1YjYqGSaS', '67787560', '9223313189', '', 'vijay.jayakar@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\13269.jpg'),
(13722, 'Narendra Bhanushali', '2000-01-01', b'1', '12345678', '29071955', '$2a$12$iyplE4CRTkw5hAzdGGjyeuvNKCozyf/KvCTWUciEYs84TLuYzuOQu', '67783219', '9223427417', '', 'narendra.bhanushali@tcs.co', '4223219', 'C:\\CommonFolderMirror\\UserImages\\13722.jpg'),
(14176, 'Thomas Mathew', '1989-12-18', b'1', '12345678', 'wife\'s name', '$2a$12$..r6EvsNm4zJO9LRUPXWeenmfx5qzpVM6M8k4aGWlNcosMbnKBNd2', '67798741', '7045537808', '', 'thomas2.mathew@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\14176.png'),
(33855, 'Chaitanya Sathe', '2000-01-01', b'1', '12345678', '33855', '$2a$12$nbmVf/BdNsxK8l1MiwrSm.8ledAA2md.3ZvhsC86SzuwXo4RXsbbm', '67795606', '', '', 'chaitanya.sathe@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\33855.jpg'),
(71455, 'Shirish Dhurat', '1991-04-08', b'1', '12345678', 'What is your Mother\'s Name', '$2a$12$EeB75cMABq66YjmXufXvT.eIhNQ2ePD85kNy0WsT5K5Ov8Yi6bZZO', '67789976', '9223313064', '67789000', 'shirish.dhurat@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\71455.JPG'),
(78361, 'Praful Chandran', '1993-06-12', b'1', '12345678', 'Mother\'s maiden name', '$2a$12$8Cq7U4NoRdaKvOYcPWABqOTsSecxveEDUxhl4of0KWGKY7PHc6fnq', '677895640', '8097096664', '', ' t.praful@tcs.com ', '4295640', 'C:\\CommonFolderMirror\\UserImages\\78361.jpg'),
(102549, 'Preethi santosh', '1994-09-26', b'1', '12345678', 'Mother\'s name', '$2a$12$.Xgfu1sRA4C37y9b9MIOn.Fj3C9k0rnZj7tVRlpi/bOXeNqEaSWOa', '67799762', '9823251730', '', 'preethi.santosh@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\102549.jpg'),
(103384, 'Sushma Patkar', '1995-04-03', b'1', '12345678', 'Place of birth', '$2a$12$zRWZ8a4ny4Jzl2dp1TCD3.8SuBQgvdYfCZBd9BufTGKkhKrOlRcBu', '67798627', '9819568684', '', 'sushma.patkar@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\103384.JPG'),
(104657, 'Mi Nagarajan', '1995-09-14', b'1', '12345678', 'what is the name of your school', '$2a$12$34qF3MDNuvyKvS0NDpCLnODYD3/Xo/xQfKEGlzYIrU7s6W425PYNy', '67665004', '8976084639', '', 'mi.nagarajan@tcs.com', '', 'F:\\Pankaj.jpg'),
(104768, 'S.V. Sirmokadam', '1995-10-09', b'1', '12345678', 'My name', '$2a$12$Z376cDkh/rLZm66TNTfkt.PS/7aX9/wZN0JdPejg11FVKm2vOrgru', '67795604', '9223313097', '', 'shrikrishna.sirmokadam@tcs.c', '', 'C:\\CommonFolderMirror\\UserImages\\104768.jpg'),
(106414, 'Nisha Mayekar', '1996-04-25', b'1', '12345678', 'What is my employee no?', '$2a$12$YFXcQU/zjGlt.qutuaaWo.W9IfVsursezDBOugZodMWaVU.dq9Q2G', '02267789284', '09920461373', '02267789344', 'nisha.mayekar@tcs.com', '4289284', 'C:\\CommonFolderMirror\\UserImages\\106414.png'),
(106419, 'Rajan N Chodankar', '1996-05-07', b'1', '12345678', 'Native place', '$2a$12$O0Q5DEgKgb8FTTlnEcr7SeSwyuNVHgQOKZFi27pxU1P081SAqbETm', '67798416', '9223101032', '', 'rajan.chodankar@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\106419.JPG'),
(112204, 'Leslie Mascarenhas', '1973-09-06', b'1', '12345678', 'My Birthplace', '$2a$12$zJMTFbFysfVa3ITvHAVqROlrdLX..8oaIh43MRfJz1haKXu2Sfoza', '67796360', '9223329617', '', ' leslie.mascarenhas@tcs.com ', '4296360', 'C:\\CommonFolderMirror\\UserImages\\112204.jpg'),
(112951, 'Sunil Sudhakaran', '1998-01-19', b'1', '12345678', 'what is your first school name?', '$2a$12$CxdohDPEABzvb5.F6jSLoOjROldYD58EzLFuaTlOJVoHx3cZaOgZO', '02267797222', '9223101151', '', 's.sunil@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\112951.jpg'),
(116169, 'Prafulla Poojary', '1998-11-02', b'1', '12345678', 'Godess', '$2a$12$hgKUR6Bb1mBw3iiqUgfye.NcK4uE4n9dozMyxK9WgnfrIYjVNy8YC', '67798933', '9869338087', '', 'prafulla.poojary@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\116169.jpg'),
(120224, 'Lekha Raghu', '1900-01-01', b'1', '12345678', '', '$2a$12$NdjkeLLlb3alKF4rMNt6BuuZ/VdwcxHeZzFLLrPaWh3sX/bcs66VS', '', '', '', 'lekha.raghu@tcs.com', '', NULL),
(121565, 'Thulasi Sunil', '2000-08-01', b'1', '12345678', 'Mother Maiden Name', '$2a$12$vh4loJgJj6Ur2NdFDwHAUupFSd8To7y20AHBA//3LzP0XajZKJFH2', '61327774', '', '', 'thulasi.chandran@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\121565.jpg'),
(123521, 'Sangameshwaran Iyer', '2000-11-20', b'1', '12345678', '', '', '', '', '', '', '', NULL),
(126422, 'Sandip Divekar', '2001-04-20', b'1', '12345678', 'My birth place', '$2a$12$pMnYj6px8XA2JpiGLUAk.exkZ.7gU6FzKOoXGxiqg714GORSUKkAO', '022-67798655', '9223357825', '', 'sandip.divekar@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\126422.jpg'),
(126477, 'Joshy Joseph', '2001-04-26', b'1', '12345678', 'mothers name', '$2a$12$qEdJTa9HEVGj32jfSOG10.TKfGp2U2cggoSDLPPosIPHbtkEzrp/m', '67782672', '8097001082', '67782190', 'joshy.joseph@tcs.com', '4222672', 'C:\\CommonFolderMirror\\UserImages\\126477.PNG'),
(126904, 'Vijay Kamath', '2000-01-01', b'1', '12345678', 'Name of country', '$2a$12$TgRpCl8cYvL9siTbwK5MdOcvcUkN9rMgdVHuyPLPOo5UqLAw/XcMO', '67785151', '9892169944', '67785151', ' vijay.kamath@tcs.com ', '85151', 'C:\\CommonFolderMirror\\UserImages\\126904.jpg'),
(126913, 'Deepa Kelshikar', '2001-06-11', b'1', '12345678', 'what is mother name', '$2a$12$H84uPjALtgvoKF5p9hNY3OOft0yGIXclNplJodJsoZLJg5zJ8M1ha', '67782090', '9819775364', '0', 'deepa.kelshikar@tcs.com', '4222090', 'C:\\CommonFolderMirror\\UserImages\\126913.jpg'),
(128797, 'Deepa Poojary', '2000-01-01', b'1', '12345678', 'Name of your school', '$2a$12$mcRPWQYzHLpYGm3fOsTwv.eUEUyFDD/lYoG7qBxd9J.wWpQ0TTr2i', '67796307', '9004679595', '', 'deepa.poojary@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\128797.jpg'),
(131385, 'Gul Chanchlani', '2002-10-16', b'1', '12345678', 'What is your mother\'s maiden name', '$2a$12$37QmQiaErfzrTUsnLb48LekOpjx8WeFCJDb3XdKu2tkOPgyn4VJza', '67795646', '9967279538', '', 'gul.chanchlani@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\131385.jpg'),
(131572, 'Sheeba Biju', '2002-11-06', b'1', '12345678', 'home town', '$2a$12$kk2YASgdY4QYqVWjXyFmduIH9DiFIIpf5s1j3.jgmZ10Qb86W/BTq', '67782502', '9930508087', '', 'sheeba.biju@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\131572.jpg'),
(133230, 'Jignesh Gandhi', '2003-02-10', b'1', '12345678', 'Registration no. of 1st vehicle', '$2a$12$ziphih.NEyOvNTzzyEFdEOBwEGfuIK9v0BKZuxY7oF3LKFG8fF8vu', '67794720', '7045511858', '', 'jignesh.gandhi@tcs.com', '4720', 'C:\\CommonFolderMirror\\UserImages\\133230.JPG'),
(150406, 'Urvish Bhatt', '2004-01-10', b'1', '12345678', 'game', '$2a$12$xNr11lDgCcO6BX8uNW/z3O3mKjrgBZYR7YsvZloIInbRXRkNJOLAC', '67794612', '9223324936', '', 'urvish.bhatt@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\150406.jpg'),
(152250, 'Narayan Giri ', '2004-11-25', b'1', '12345678', 'Which country are you born', '$2a$12$tIRN5YMfbrV6o1ByXdUAiu7s0Qo6Tkqi4QrvxpTpHXMhZlF3xf.Py', '67322000', '9223313061', '67322255', ' narayan.giri@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\152250.jpg'),
(152527, 'Janhavi Sonavane', '2004-12-08', b'1', '12345678', 'where do you stay?', '$2a$12$EwzG9.TY0PFz8gJvXgCHoeegvYeDR2OlHnHEKQwtp9HCkg379WJl.', '67797210', '9821445567', '', 'janhavi.sonavane@tcs.com ', '4227210', 'C:\\CommonFolderMirror\\UserImages\\152527.JPG'),
(153961, 'Ashwini Pednekar', '2005-01-25', b'1', '12345678', 'What is your college Name', '$2a$12$.W51sN71l0g.JxoIIJ9DT.1KsNrENo7Qp/t3BOiVDpnOWm00flfN2', '67323126', '9892422965', '67323300', 'ashwini.pednekar@tcs.com', '4233126', 'C:\\CommonFolderMirror\\UserImages\\153961.jpg'),
(163906, 'Abhishek Kunigal', '2005-09-25', b'1', '12345678', 'What is your name', '$2a$12$k/KAb4sqXFv24vqsq2zwW.Ej5atd1S5eHnaMTk/t3iP9wrgnV4mtG', '022 67794720', '9820097995', '022 67795656', 'abhishek.kunigal@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\163906.jpg'),
(170033, 'Kishor Parab', '2006-02-01', b'1', '12345678', '170033', '$2a$12$7uWrJrHGRFJf5NQOkKHSaOaWplyFv/Cm4LgYbSnZaH4lLUl6bR5iq', '022 67324757', '098690447979', '02267323300', 'kishor.parab@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\170033.jpg'),
(170041, 'Dipty Deshmukh', '2006-02-01', b'1', '12345678', 'My birth place', '$2a$12$1hIzfJLtJFyJAl1J173bg.AqxIQ.r4cUmz/fGLz8FyyvGRTugUGNi', '022-67798627', '9833557257', '', 'dipty.deshmukh@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\170041.jpg'),
(170044, 'Uday Bandekar', '2006-01-02', b'1', '12345678', 'Vilage Name', '$2a$12$HlOC2IcBMrsH1T3NajZv2uqqBhbnl1E2tO/8XPrycZEls7S0AOZbK', '67796108', '9619086123', '-', ' udayk.bandekar@tcs.com ', '-', 'C:\\CommonFolderMirror\\UserImages\\170044.JPG'),
(170048, 'Deepak Walve', '2000-01-01', b'1', '12345678', 'whats my colleagues name', '$2a$12$k9DD9ipj4i/.nPjhCbPpA.uWn90F3l4O4KRRmYoJpsSuXubBbElL2', '67793845', '9221051681', '', 'deepak.walve@tcs.com ', '93845', 'C:\\CommonFolderMirror\\UserImages\\170048.jpg'),
(170075, 'RK Rajendran', '1900-01-01', b'1', '12345678', '', '$2a$12$QqFsWlwI4Q9iHKKTGfEiMeD2zvOaXSd3yDybOqJ1DdQ37kNmTCSNO', '', '', '', ' rk.rajendran@tcs.com ', '', NULL),
(170077, 'Vijayan C.', '1900-01-01', b'1', '12345678', '', '$2a$12$GF9UvKXEDnQEZgMilHJ4JuicF9vcjgC5lb1FtN0/GjTSWXTY4kotG', '', '', '', 'vijayan.c@tcs.com', '', NULL),
(170185, 'Kamla Mali', '2006-02-01', b'1', '12345678', 'Favourite color', '$2a$12$AglIw76HkuqAEywRHFE97O9oerG/w4AFK7.UtoDSZqqZHOBsoNqbW', '67789609', '9920456927', '67789660', ' kamla.mali@tcs.com ', '4289609', 'C:\\CommonFolderMirror\\UserImages\\170185.JPG'),
(170202, 'Anil Kapoor', '2006-02-01', b'1', '12345678', 'Native Place', '$2a$12$DBVEcxOwSEKDdCvnM.PiOeOpz3yjX5gCCyUAONV4C0pvcZ2PbvJGu', '022-67796697', '9860298157', '022-67794755', 'anil.kapoor@tcs.com', '42296697', 'C:\\CommonFolderMirror\\UserImages\\170202.JPG'),
(170261, 'Hiraman Bhirud', '2006-02-01', b'1', '12345678', 'Birth place', '$2a$12$xpjNW/WTO957OpllypXsQOau0vZwB9x.EDDL.LUqahQQMhnVRKPFG', '02267782122', '02267782122', '', 'hiraman.bhirud@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\170261.jpg'),
(170377, 'Vikas Tikekar', '2000-01-01', b'1', '12345678', 'School Name', '$2a$12$E0InYskUPX1aHbUHVMu60umU4.6uIuLhBCEEIqDM2k2dPC8O/6tIe', '67796309', '9870429291', '', 'vikas1.tikekar@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\170377.JPG'),
(170388, 'Rajesh Sarfare', '2006-02-01', b'1', '12345678', 'My daughter name', '$2a$12$4rqB40YkNCqmvuN0A8lC3.ebIjcs2tkQOTO0um3RtWRNg1vzQ2sc2', '67323123', '9867265264', '', ' rajesh.sarfare@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\170388.JPG'),
(170929, 'Sayed Hussain', '2000-01-01', b'1', '12345678', 'Own Name', '$2a$12$RfK72iZu2mSQHAi3zeW/JutnZrlNxjQNeIbcSNHEq1cQXtS1k6Ut2', '67787222', '9223101468', '', 'sayed.hussain@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\170929.jpg'),
(170976, 'Chidanand T Hadapad', '2006-02-01', b'1', '12345678', 'Birth Place', '$2a$12$pfb0fswmVv5HxkcUCL1LA.n9lFr.Bo9ZEM8lGai99Yd78CdeTkeEy', '02267785503', '9821852540', '', 'chidanand.hadpad@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\170976.jpg'),
(170983, 'Delnaz Jasoomani', '2000-01-01', b'1', '12345678', 'Sons Name', '$2a$12$DZs6cbkf9lRx9rV4sOcnj.GVseDzOBM4tZc1WzZ9tQsmamoFxBZre', '6779 3613', '9223310123', '', 'delnaz.jasoomani@tcs.com', '429 3613', 'C:\\CommonFolderMirror\\UserImages\\170983.jpg'),
(175463, 'Hutoxi Irani', '2000-01-01', b'1', '12345678', 'Native place', '$2a$12$EdHva60gTv1OdY1lbiLMaOBr4lMqzDjobgaGQta/syxh5AjirNgBK', '67798416', '9223101032', '', ' hutoxi.irani@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\175463.jpg'),
(181897, 'Naveen Malaha', '2006-03-13', b'1', '12345678', 'your Pet name', '$2a$12$wb7kaiaKO6j7AmQL45vbyewqqky5SNHtW2LAaN3j0GkLaBTVkaKbi', '67798655', '7208619660', '', 'naveen.malaha@tcs.com', '4298655', 'C:\\CommonFolderMirror\\UserImages\\181897.JPG'),
(198725, 'Cdr Benny Mathews', '2000-01-01', b'1', '12345678', 'What is your mother\'s first name', '$2a$12$gJWjWFPNAOzImQevAb/Ave/9Z2KlZsYy/sX.nPH2Trr2KReIb04Lq', '02267323001', '8097000238', '02267323300', ' benny.mathews@tcs.com ', '4233001', 'C:\\CommonFolderMirror\\UserImages\\198725.jpg'),
(200534, 'Ninad Patil', '1900-01-01', b'1', '12345678', '', '$2a$12$ehanIgldBAgrN9EWKWKpHu9/ebdZNt..yAw/aymM7ezkqCfldWNQy', '', '', '', 'ninad.p@tcs.com', '', NULL),
(201288, 'Mahesh Pujari', '2000-01-01', b'1', '12345678', 'location', '$2a$12$4zX.UrG1tAbNkL.vK7UUse8WEePFlt076mxZbHN6ZGhVcRIEg6pR6', '67787781', '67787781', '', 'm.pujari@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\201288.jpg'),
(202728, 'Allwyn Sawant', '2000-01-01', b'1', '12345678', 'What is the name of your pet', '$2a$12$eTiuGdqvRV5gpRLahXRv0.0sgQ5B0HUkYv0Ossro3aKOwcT9SMY7G', '02267799879', '9870538777', '', ' allwyn.sawant@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\202728.jpg'),
(209897, 'Hari KG', '2000-01-01', b'1', '12345678', '209897', '$2a$12$bAA3THF.egU4zFRDKHF/7Oos/zeErstM9UbWlD.VDkYTHHmbKEPBO', '02267795633', '9223500166', '', 'hari.kg@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\209897.jpg'),
(210958, 'Andrea Menezes', '2007-05-09', b'1', '12345678', 'first job', '$2a$12$ewjatqnxihhX7B0HJImUBeO.KvtfyDY5jT9745ijj56HLZ8JsKqJW', '67799708', '9987721071', '', 'andrea.menezes@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\210958.JPG'),
(222479, 'Belinda Menezes', '2007-07-16', b'1', '12345678', 'best friend', '$2a$12$dayeqBCWgYT1xrkNcEGgs.Bw9tMAlqOHKaCR2Y8/btySTvXOWxiIC', '67793852', '9820025076', '67793939', ' belinda.menezes@tcs.com ', '4223852', 'C:\\CommonFolderMirror\\UserImages\\222479.jpg'),
(238775, 'Oriston Vaz', '2007-12-03', b'1', '12345678', 'What is your name', '$2a$12$5JELIXpr.CIjbQKYdcWo0uPkstZTfGF/x/.CnTwnUJOuwy.kfSMxG', '02267665678', '9223101063', '', 'oriston.vaz@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\238775.jpg'),
(242938, 'Nilesh Gaikwad', '2008-02-20', b'1', '12345678', 'Nick Name', '$2a$12$j2OMJpLLQjeEI/l3/ICBPOEWn74FfKXs9NUJO.E8V6KbNhnxhIG/G', '6778 7200', '9920980097', '', 'nilesh.g@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\242938.jpg'),
(245468, 'Ashim Dutta', '1900-01-01', b'1', '12345678', '', '$2a$12$Vq4r//BvWWnRA3DMg2U5D.L1ISVBXiM02tD7GL41BExZBL1SVDlcG', '', '', '', ' ashim.d@tcs.com ', '', NULL),
(245499, 'PK Rajeevan', '2008-04-16', b'1', '12345678', 'What is my pet name?', '$2a$12$nCmfqB11zHF4cf6i7JkRQuZlHgx7mkUBt.YAQ3zcq.ycdBi0GzXtm', '022-67789331', '9869860150', '', 'pk.rajeevan@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\245499.jpg'),
(247971, 'Cdr.Dipankar Goswami', '1900-01-01', b'0', '12345678', '', '$2a$12$WCGh6jBKaUV7zwQgBeCrq.3qLosU3ifvEitvVpxyMaRyi4Y..v5dS', '', '', '', 'dipankar.goswami@tcs.com', '', NULL),
(270044, 'Prathamesh Takale', '1900-01-01', b'1', '12345678', '', '$2a$12$0pFE1dEDTr5sW1WJmWwWPO9QeeLXIPlMtOaXhg0eDMNaOT7KDAm3a', '', '', '', ' prathamesh.takale@tcs.com ', '', NULL),
(276629, 'Jayesh Gangawane', '1900-01-01', b'1', '12345678', '', '', '', '', '', '', '', NULL),
(279572, 'Shadab Patel', '2008-07-02', b'1', '12345678', 'Hero', '$2a$12$6/LyAaI0q3ip8AnPYQlOGOTfrQt0ZPb/ve2wxcwH2nwUEZXHAFm3.', '02267796412', '9819405050', '', 'shadab.patel@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\279572.jpg'),
(308518, 'Akshata Joshi', '2008-11-05', b'1', '12345678', 'City of Birth', '$2a$12$Bqu9iYEktDo4vbTcKO9/k.1Z91.mFx.nvxohBjORKDX5h4Z2Z.z/6', '67783485', '9769555121', '', 'akshata.joshi@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\308518.jpg'),
(316603, 'Arvind Chavan', '2009-02-18', b'1', '12345678', 'Mother Name', '$2a$12$aglm63Sgh9unqctupPFqMOcH2dAbXQQaPBcIVnNeVXeHqCGE.XUj.', '67783000', '9223357087', '', ' arvind.rchavan@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\316603.jpg'),
(328696, 'Farzaad Mehta', '2009-11-09', b'1', '12345678', 'place of birth', '$2a$12$KnGe/gmTxo1pAGAvHN5D7uf/MDNE0VuKEvO70pGx5z5pppXwG/UVO', '67665038', '123456789', '', ' farzaad.mehta@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\328696.jpg'),
(330241, 'Ajay Muglikar', '2009-11-25', b'1', '12345678', '330241', '$2a$12$FAPN547XhPkoivKH9vMriOY/C4rutefEK6kcXyXS1rrdUDN4tfgjm', '02267795613', '8097005062', '', 'ajay.muglikar@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\330241.jpeg'),
(340775, 'Ramanjineya Bajantri', '2010-01-25', b'1', '12345678', 'Place of Birth', '$2a$12$DqvYfkG/luI16ZP9DjIOJeA5eQLTpf4h.5vYaF2y1laYVmv0RZqxS', '022-67665004', '9987045357', '', ' ramanjineya.b@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\340775.JPG'),
(344069, 'Vicky Srimalani', '2010-02-01', b'1', '12345678', ' Monther Name', '$2a$12$Sl/0YWbQwgg57..HHyP3XOchSzOKQ2./2nse0vtP2ggTAawRq2VjC', '9320977175', '9320977175', '-', 'v.srimalani@tcs.com', '-', 'C:\\CommonFolderMirror\\UserImages\\344069.jpg'),
(346755, 'R. S. Ravindra', '2010-03-04', b'1', '12345678', 'Mother\'s Name', '$2a$12$34KlnPO5T13UPU5s.2E2T.xMJPXVLM2O/N7A5gAL6S6ViP04V8ywO', '02267795334', '7588743779', '0', 'rs.ravindra@tcs.com', '0', 'C:\\Pictures\\image.jpg'),
(349448, 'Prasad Palkar', '2010-03-17', b'1', '12345678', 'where do you stay', '$2a$12$/Ni0lvpUtLm6b/4kRQPwve46.M7mnM.FwxAhBCAI/r0y7KWEDvKYy', '67799762', '9757172838', '', 'prasad.palkar@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\349448.JPG'),
(357465, 'Biju B. Nair', '2010-05-12', b'1', '12345678', 'Date of Joining TCS', '$2a$12$jMPN4ArROZOBMKHCtED89O4hJ9xx/lFiA0WRqFT.O6mH2WLaGMnOC', '67324830', '9833547527', '67324111', 'biju.bnair@tcs.com', '4234830', 'C:\\CommonFolderMirror\\UserImages\\357465.png'),
(360236, 'Nilendra Parab', '2010-06-09', b'1', '12345678', '360236', '$2a$12$hyJiOXic.ommdsgHy8s02uJt36icPTKQbPXnpK7yv8IN4CVDjEb9O', '67782252', '8097099735', '', ' nilendra.parab@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\360236.jpg'),
(360246, 'Samidha kadam', '2010-06-09', b'1', '12345678', 'Mother Name', '$2a$12$pW9rOk4mGEmeX1/JcCsG3.LjorkTsuychj0bX4PRq6Vl8m5tH5CQq', '67783005', '9773080003', '', 'samidha.kadam@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\360246.jpg'),
(362918, 'Deepak Mhatre', '2010-07-01', b'1', '12345678', 'Petname', '$2a$12$hUP7rnjnkbsr.y5v0aFHgu0YOzT2VbyJIboMW2lszOFORd6b25s3S', '67132125', '9822779296', '', 'deepak.mhatre@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\362918.png'),
(362929, 'Prashant Gaikwad', '1900-01-01', b'0', '12345678', '', '$2a$12$CeUJv1Bvs4Lmni7D8/d9SeenadRSaqyi4FvxpyLCj.FKMsFaIBh8i', '', '', '', 'prashant.gaikwad@tcs.com', '', NULL),
(385154, 'Pramod Sawant', '2010-10-20', b'1', '12345678', 'Mother maiden name', '$2a$12$tWpaSk1JLy05c6fmwPgNY.Nne.OTnr4QEAngai6veD8iClHtj/sXO', '67793865', '7208099363', '', ' ps.sawant@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\385154.JPG'),
(397561, 'Rakesh Dalvi', '2010-12-01', b'1', '12345678', 'Birth Place', '$2a$12$uORbI3qKOyO2wZh/uSwe4u3RnmB4ruuK7ohrqgxglszcr/a4I8Yaa', '67786667', '9870489592', '', ' rakesh.dalvi@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\397561.jpg'),
(397565, 'Tejas Bandarkar', '2010-12-01', b'1', '12345678', 'School Name', '$2a$12$txkLV/ckVXlabdosdKnhCO.ftwjsPEbytXGpfqxYqVwvCGR5okvUO', '022-67798757', '9820365580', '', 'tejas.bandarkar@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\397565.JPG'),
(453006, 'Sagar Jadav', '2010-12-15', b'1', '12345678', 'What is your favourite colour', '$2a$12$vcOF2z75nRQUzFNYqW/5S.pAfl.BJ4sMTZK03SWtNQNqXgZDXJ/xu', '93656', '9860224794', '', ' sagar.jadav@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\453006.jpg'),
(453024, 'Subhash Jaybhaye', '2010-12-15', b'1', '12345678', 'Native Place', '$2a$12$EpaHc.YZKS.DOvvDqHOkPOJxxT6kPmMMfRqDnLe50sH19rHOTxoay', '02267794829', '9987219264', '02267794755', 'subhash.jaybhaye@tcs.com', '-', 'C:\\CommonFolderMirror\\UserImages\\453024.jpg'),
(473224, 'Vijay Ramekar', '2011-03-09', b'1', '12345678', 'What is native place', '$2a$12$b6PmllNsKXvUnLvsUfRORujm3XCDjTSa3JPUvaoVgtq7kt4NHqwXK', '67789031', '9967305844', '67789000', ' vijay.ramekar@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\473224.JPG'),
(477633, 'Siddharth Jadli', '1900-01-01', b'0', '12345678', '', '$2a$12$./ISDTIbKmYnJ3d2lK9JlevUrMbXmaXmTBHbyrvqtcoNokpf94C0e', '', '', '', 'siddharth.jadli@tcs.com', '', NULL),
(484749, 'Jagdish D Poojari', '2011-04-27', b'1', '12345678', 'Mothers name', '$2a$12$rOpjYvE07ByO0Q6eX04KEeMaW4.WSY0vZEE8lPmqWp1EMaLt0pR5i', '67788236', '9819703441', '', 'jagdish.poojari@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\484749.JPG'),
(485014, 'Swatantra Singh', '2011-04-27', b'1', '12345678', 'my best friend', '$2a$12$wAnrLHSGUwpu0MW1zqGkwufHV1exyRbrl7GDQBedf55fU7f84AdB6', '', '9920076024', '', 'swatantra.singh@tcs.com', '', NULL),
(486479, 'Vinod S Motling', '2011-05-11', b'1', '12345678', 'favourite cricket player', '$2a$12$MFUX1bBTBORgXl0/SgSl1OSLXF9znfObTl8PLQ2qCxTvILxf/X1Jq', '67794719', '897649315', '', 'vinods.motling@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\486479.jpg'),
(490459, 'Cdr Avinash Ramakrishnan', '2011-06-08', b'1', '12345678', 'Daughters name', '$2a$12$L.2NWbvlltdyg0XkPAG.hOUvmdkl06rIerysJNuBY.TKDQ6.LUho6', '67783200', '8097094594', '', 'avinash.ramakrishnan@tcs.c', '', 'C:\\CommonFolderMirror\\UserImages\\490459.jpg'),
(495515, 'Cdr Krishnan Padmadas', '2011-06-29', b'1', '12345678', 'Mothers name', '$2a$12$BNPSIJYwtwudhk0K69puce1ulhe7kJqi1EXNoyCEPCEJF2wi4XpaS', '67793840', '9869279710', '', ' krishnan.padmadas@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\495515.jpg'),
(528936, 'Subramanya Rai', '2011-11-28', b'1', '12345678', 'Mother\'s Maiden Name', '$2a$12$zitxXcqb3ppZDctHEZzPZek9/39tLS5c/Lg8LD2dG5hExBotdXhBG', '02267796412', '8097947501', '', 'subramanya.rai@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\528936.jpg'),
(536759, 'Mal Singh', '2011-10-25', b'1', '12345678', 'place of birth', '$2a$12$/x9TaofvSaQ5EacKDwaLw.g8Wrxw6aAGGCc9dOfpuQF3E5dqQSjcW', '66489730', '9967521727', '', 'mal.singh@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\536759.JPG'),
(572869, 'Kiran Patil', '2012-01-25', b'1', '12345678', 'Favorite cricket player', '$2a$12$9OXB6pOIesmfeXkqWx9Fe.l.aqlbR0yRULp2sSBUajZtqhnWahug2', '', '', '', 'kiran.patil1@tcs.com', '', NULL),
(694514, 'Vikram Kamble', '2012-05-17', b'1', '12345678', 'Mothers Maiden name', '$2a$12$xfmrSg/kqdkCNSTwh0Xtv.//fm/d9r4uf.TPAn1glXBlojnhAGmUa', '02261327763', '9892164400', '0', 'kamble.vikram@tcs,com ', '0', 'C:\\CommonFolderMirror\\UserImages\\694514.JPG'),
(712186, 'Ron Phillip', '2002-08-28', b'1', '12345678', 'What is your PET Name', '$2a$12$Kg9J2fAC6PWyNgAPMr6chu8JWeATdel7RH5EC81DP6SOxlqBH7/Ym', '67322018', '9833198159', '67322255', ' ron.philip@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\712186.png'),
(785316, 'Uday Ram Godbole', '2013-07-03', b'1', '12345678', 'My pet name', '$2a$12$ODNh31kyAmrVw8nPwVWp3.Px3PL2zORwjQt.eyoRpcZcsNwk.32yC', '67788159', '8097000386', '', 'uday.ramgodbole@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\785316.JPG'),
(792952, 'Priti Pandya', '2013-07-09', b'1', '12345678', 'Employee no', '$2a$12$Ea00iiMedFNoewXkR6UMXO9CjJAh2SOXpbim97yU0kKucfup2uMYW', '61327778', '09820789938', '', 'priti.pandya@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\792952.png'),
(830035, 'Amol Salve', '2013-10-01', b'1', '12345678', 'test1', '$2a$12$ct5UwzJ3cxqlD71/jyqVw.nGK0W8NuA6N6hFz5DMTUYKJ.trYTGSO', '022-6648 9838', '8097672701', '', 'amol.salve@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\830035.jpg'),
(850097, 'Milind Savaratkar', '2013-11-05', b'1', '12345678', 'Birth Location', '$2a$12$CIVsbvf1wQ/vuaVZwVUG4eJ9zk7GNl2N7xEKQr/eXgL2Pcb70Fhoa', '61327775', '9930300211', '', ' milind.savaratkar1@tcs.com ', '', 'C:\\CommonFolderMirror\\UserImages\\850097.JPG'),
(854673, 'Prakash Pawar', '1900-01-01', b'1', '12345678', '', '$2a$12$rBYQTvL1anhMaqhK8Ie.WuWHQrQnKDwK315/gJ5hytwYd06BjJlxi', '', '', '', ' prakash.pawar1@tcs.com ', '', NULL),
(856782, 'Pooja Kohli', '2013-12-18', b'1', '12345678', 'What is your birth place', '$2a$12$f7nv.d1vvunNdyBhKGfvUuqTwKBQ8v07.hISaKISmr9Nj/2WUxFte', '02267787789', '9819869663', '', 'pooja.kohli@tcs2016', '', 'C:\\CommonFolderMirror\\UserImages\\856782.jpg'),
(871928, 'Vishal Thacker', '2000-01-01', b'1', '12345678', '', '$2a$12$Z.GN9DJmF9NpAJYJtItnJ.KKbWjDFG/CWriPq8Ssac0pWSKrzM6VC', '', '', '', 'vishal.thacker@tcs.com', '', NULL),
(888052, 'Biplop Sarkar', '2014-05-07', b'1', '12345678', '', '$2a$12$EzjaSpPoLJSHiqSP0PW1LOygvCp5MvxL/6DYngnQJX5EKezoIW81.', '', '', '', 'bb.sarkar@tcs.com', '', NULL),
(892694, 'Cdr Birender Verma', '2014-11-06', b'1', '12345678', 'your mothers maiden name', '$2a$12$.iSPPn0PbZdO3wUUR43/oOT6yVd01CYfuaDOXEeV6e2PqNsLfvA3i', '02267782145', '9769546659', '', 'birender.verma@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\892694.jpg'),
(918505, 'Anil Panicker', '2014-08-01', b'1', '12345678', 'mom\'s name', '$2a$12$LQF3ftbVuY9O9bW4lOGjPucEejW726tQ1xplkjE8/SCn9fLEpAGWe', '61327771', '9167293632', '', 'anil.panicker1@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\918505.jpg'),
(925147, 'Anil Jadhav', '2014-10-17', b'1', '12345678', 'What is your school name', '$2a$12$Fc8sRYtQFPkQGeXtctWiXePeFpXeKol8rsEHKa/JnRsSCIta.ohc6', '67323008', '9220512570', '67323300', 'anil.jadhav1@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\925147.jpg'),
(927744, 'Amit Narhari Mokal', '2014-09-17', b'1', '12345678', 'mother name', '$2a$12$gsMgXxH3h3td11PU2kNKCuKoyqP2QceK/pkp22KePSHhmNu80xKXq', '67793854', '8097780183', '', 'an.mokal@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\927744.jpg'),
(989491, 'Bhavna Julka', '2014-11-12', b'1', '12345678', 'Birth City', '$2a$12$H8PGJxdV9VtU9f6TvYFzfOFgHz8tsvdDHfKMAVtU9n4JfopYUSEau', '022-67780777', '9833475887', '', 'bhavna.julka@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\989491.jpg'),
(1022055, 'Cdr Ajay Bisht', '2015-03-11', b'1', '12345678', 'mothers maiden name?', '$2a$12$8Hn.e./DBdDJmBp2W7gXUum86USrnCFu2eru89/eNCGMtZ57XpKdm', '02267323002', '9930180925', '', 'bisht.ajay1@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1022055.jpg'),
(1033012, 'Bipin Menon', '2015-04-15', b'0', '12345678', 'Mothers Name', '$2a$12$RWsIVXuKBx3lS4aUD9XrA.0oc1qDu3PBRN7wc5jlzzX8oh5oOWfjy', '67783000', '9821112973', '67783399', 'bipin.menon@tcs.com', '00000', 'C:\\CommonFolderMirror\\UserImages\\1033012.jpg'),
(1042821, 'Lt Cdr Arun Varghese', '2015-05-13', b'1', '12345678', 'mother maiden name', '$2a$12$CEw9eh0M0OXDX2Qk560nROIHvtSmPb8Uc.pg1ovj8wVTEx1Hi2Z..', '86633', '9757169379', '', 'arun.varghese1@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1042821.jpg'),
(1082506, 'Supriyo Gupta', '2015-09-02', b'1', '12345678', 'What is your Pet Name', '$2a$12$pYPbhEvLYtzflkQt33jbvu/zqBcY0KhPLAH24e9QpPVzxY0XW7iYa', '67780700', '9819711187', '', 'supriyo.gupta@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1082506.JPG'),
(1099761, 'Aravind Kulkarni', '2015-10-01', b'1', '12345678', '', '', '', '', '', '', '', NULL),
(1099914, 'Chitralekha R More', '2015-10-01', b'1', '12345678', 'Birth Place', '$2a$12$mFlxepc5wCeju03JHTFpv.5kQEbNatqyCwpZMkToJrt5nm794zibS', '02267798627', '9769225484', '', 'chitralekhar.more@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1099914.jpg'),
(1099946, 'Helen George', '2015-10-01', b'1', '12345678', 'Whats your Best Friends Name', '$2a$12$mkLkeQ5lDZwbag.G0wHevu1bgttRbCoG.ENwpAaOoutmPROxucTly', '677857144', '+919920568735', '', 'helengeorge25@gmail.com', '', 'C:\\CommonFolderMirror\\UserImages\\1099946.jpg'),
(1100141, 'Shrikant Joshi', '2015-10-01', b'1', '12345678', 'Name of God you praise', '$2a$12$D/tAchH/Iab34i7GCzSYBOkncivyotDjreB8OEmXbNdz8jU2WP/EK', '02267811735', '9004342488', '02267811735', 'shrikant.joshi2@tcs.com', '02267811735', 'C:\\CommonFolderMirror\\UserImages\\1100141.JPG'),
(1103369, 'Prashant Patil', '2015-10-01', b'1', '12345678', 'Place of Birth', '$2a$12$1TJ2I.jKmcUu.b2C1y50Qui.U1OXF46Z0Qyl2x6X/5gJ13bru.vOO', '022-67811730', '9867257794', '', 'patil.prashant5@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1103369.jpg'),
(1103590, 'Sagar Budhale', '2015-10-01', b'1', '12345678', '', '', '', '', '', '', '', NULL),
(1203427, 'Venkatachari S', '2015-10-20', b'1', '12345678', '', '', '', '', '', '', '', NULL),
(1219561, 'Jaison Joseph', '2015-11-25', b'1', '12345678', 'Birth place', '$2a$12$8m6MfCPIiHktc/QbkB33IudPUbagnMnn72fRcs435NEd6hoz0jKia', '63712357', '9920239767', '', 'jaison.joseph1@tcs.com', '12357', 'C:\\CommonFolderMirror\\UserImages\\1219561.jpg'),
(1219736, 'Sreekumar Nair', '2015-11-25', b'1', '12345678', 'mother', '$2a$12$YnFrsOSZAc.Tu12nHKv5QuT3DwVSRtoySqzdm.kzxtjo7yXahuOG.', '67783164', '8108706176', '', 'nair.sreekumar@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1219736.jpg'),
(1224134, 'Emmanuel Pereira', '2016-01-13', b'1', '12345678', 'Mothers maiden name', '$2a$12$RQxngLR7MaBlmaYqfvegOeVngRHLRjWms5QZYZxxwbMiZ7aqHVu9i', '67665003', '9870990031', '', 'emmanuelpereira@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1224134.jpg'),
(1224162, 'Poonam Laheri', '2016-03-02', b'1', '12345678', 'Birthplace', '$2a$12$fFFezBIJLhq57PcZSKJZje.ljUtEitjWT/V1iJ35VvjbUuFtzGNx6', '67796100', '9167001252', '', 'poonam.laheri@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1224162.jpg'),
(1224180, 'Nitins Suvarna', '2016-01-06', b'1', '12345678', 'mothers maiden name', '$2a$12$ZEgJOsazcRR4QlW6W9l2ku1knHXLOV/aHOCyflxC421ISOs59kV5.', '67789770', '9819088032', '', 'nitins.suvarna@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1224180.jpg'),
(1227141, 'Sibu Samuel', '2016-01-13', b'1', '12345678', 'Birth Place', '$2a$12$THPJOYeHwggBcF2lgAbMle6H2TIYw0XgEeyxy2t827bCmmRhfcu2a', '67782828', '7738435699', '', 'sibu.samuel@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1227141.04.07.jpeg'),
(1252099, 'Sambasivam Jayaraman', '2016-03-09', b'1', '12345678', 'Place of Birth', '$2a$12$2qpltqOjBiORuhyLRHfSpef4.bcEnocqkxHnIMFGrc5sFegN1BIwa', '67798498', '9004408667', '67798546', 'Sambasivam.iyer@tcs.com', '422-98498', 'C:\\CommonFolderMirror\\UserImages\\1252099.jpg'),
(1252101, 'Shakeer Abdul', '2016-03-09', b'1', '12345678', 'Car', '$2a$12$wlYZY8jqqtZmlyhgrjYm1O5wxN3gIWFAEjfVTOLv2FEMl6FaIIarC', '2267794706', '7208347632', '', 'abdul.shakeer@tcs.com', '4294706', 'C:\\CommonFolderMirror\\UserImages\\1252101.jpg'),
(1252180, 'Onkar Rege', '2016-03-09', b'1', '12345678', 'Favourite Place?', '$2a$12$D7y8/zqrgFu2CJA.DQBNrOb6mgJyXZTy608nAPtT7H6dbFdTmN4gK', '02267798656', '9029443922', '', 'onkar.rege@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1252180.JPG'),
(1312657, 'Sarfaraz Shaikh', '2016-07-13', b'1', '12345678', 'place of birth', '$2a$12$vHuvaIMrzzdcBoH0mDlCa.iQNjq35y8szXCf2UFbpmVcLUt4QbseG', '02267811751', '8983126987', '', 'sarfaraz.shaik@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1312657.JPG'),
(1324742, 'Afzal Shaikh', '2016-09-07', b'1', '12345678', 'Ride', '$2a$12$cNPZOE2Flfve2pRehXUhQOrGpD58D9xZdSZpHSOd8PCJbiDjc9GP2', '67898741', '9820535556', '', 'shaikh.afzal@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1324742.jpg'),
(1326006, 'Murugan Govindaraj', '2016-09-28', b'1', '12345678', 'favourite sports', '$2a$12$zriH49SeyFMPqjBbgSAjxO91kF83eex6gFvzk6B4BdWgMkHuanmvC', '67792081', '', '', '1326006', '', 'C:\\CommonFolderMirror\\UserImages\\1326006.jpg'),
(1334149, 'Akash Pimple', '2016-11-02', b'1', '12345678', 'My Native Place', '$2a$12$AWNDnMy.jD4MKfXDkT9RLOV9yOEuXtVv1Dy7Fp.giQB9Mue6JON9K', '67792073', '7777077208', '', 'akash.pimple@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1334149.PNG'),
(1349929, 'Amol Wadikar', '2016-11-09', b'1', '12345678', 'Anniversary', '$2a$12$CUTRG5dOgO.obTkabpJPHuzbnSaBtWtAu.kwQ43DySs4MnqursH7.', '02267795633', '9422429640', '', 'wadikar.amol@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1349929.jpg'),
(1524082, 'Santhosh G', '2018-05-02', b'1', '12345678', 'pet name', '$2a$12$j7nuX0tiosFdviiaeW/obe6vhMlOAqPe6EeNZV1pcWibxsBO6CdqG', '', '7738428888', '', 'santhosh.g3@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1524082.jpg'),
(1541738, 'Sreejith Raveendran', '2018-06-20', b'1', '12345678', '', '', '', '', '', '', '', NULL),
(1690173, 'Cdr Prashant Sharma', '2019-06-19', b'1', '12345678', 'Son\'s name', '$2a$12$3PjRW4Vk/p3.4ItF1MOA4.fLsUlgz8bXOrOBv.4X8.HModBKdb6XC', '', '9910048713', '', 'prashant.sharma16@tcs.com', '', 'C:\\CommonFolderMirror\\UserImages\\1690173.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `datacategory`
--

CREATE TABLE `datacategory` (
  `catCategoryPK` varchar(3) NOT NULL,
  `catName` varchar(50) NOT NULL,
  `catIsActive` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `datacategory`:
--

--
-- Dumping data for table `datacategory`
--

INSERT INTO `datacategory` (`catCategoryPK`, `catName`, `catIsActive`) VALUES
('1', 'Electrical', b'1'),
('2', 'BMS', b'1'),
('3', 'Office Equipments', b'1'),
('4', 'Office External Equipments', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `datalocation`
--

CREATE TABLE `datalocation` (
  `locLocationPK` varchar(11) NOT NULL,
  `locName` varchar(30) NOT NULL,
  `locShortName` varchar(10) NOT NULL,
  `locCityFK` varchar(8) NOT NULL,
  `locIsActive` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `datalocation`:
--

--
-- Dumping data for table `datalocation`
--

INSERT INTO `datalocation` (`locLocationPK`, `locName`, `locShortName`, `locCityFK`, `locIsActive`) VALUES
('01010101001', 'SEEPZ', 'SPZ', '01010101', b'1'),
('01010101002', 'GATEWAY PARK', 'GP', '01010101', b'1'),
('01010101003', 'AIR INDIA', 'AI', '01010101', b'1'),
('01010101004', 'TCS Nesco', 'NES', '01010101', b'1'),
('01010101005', 'ACKRUTI TRADE CENTRE', 'ATC', '01010101', b'1'),
('01010101006', 'Banyan Park', 'BP', '01010101', b'1'),
('01010101007', 'GE GDC Borivali', 'GEBOR', '01010101', b'1'),
('01010101008', 'Wellspring', 'WELLS', '01010101', b'1'),
('01010101009', 'PRAFULLIT NIWAS', 'PN', '01010101', b'1'),
('01010101010', 'Nortel Borivali', 'NORBOR', '01010101', b'1'),
('01010101011', 'NKP', 'NKP', '01010101', b'1'),
('01010101012', 'NIRMAL', 'NIR', '01010101', b'1'),
('01010101013', 'NEPTUNE', 'NEP', '01010101', b'1'),
('01010101014', 'Malad', 'MALAD', '01010101', b'1'),
('01010101015', 'MAHAPE', 'MHP', '01010101', b'1'),
('01010101016', 'KENSINGTON', 'KEN', '01010101', b'1'),
('01010101017', 'Maker Towers', 'MKT', '01010101', b'1'),
('01010101018', 'EMPIRE PLAZA', 'EP', '01010101', b'1'),
('01010101019', 'YANTRA PARK', 'YP', '01010101', b'1'),
('01010101020', 'MKC', 'MKC', '01010101', b'1'),
('01010101021', 'La Sheva', 'LSH', '01010101', b'1'),
('01010101022', 'Tiffany', 'TIFF', '01010101', b'1'),
('01010101023', 'Lexington', 'LEX', '01010101', b'1'),
('01010101024', 'CMC BKC', 'CMCBKC', '01010101', b'1'),
('01010101025', 'CMC CPK', 'CMCCPK', '01010101', b'1'),
('01010101026', 'OlympusA', 'OLYMPUS', '01010101', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `datavendor`
--

CREATE TABLE `datavendor` (
  `venVendorPK` int(6) NOT NULL,
  `venName` varchar(50) NOT NULL,
  `venAbbrName` varchar(10) NOT NULL,
  `venYearOfEst` int(4) NOT NULL,
  `venAffliationWithTcs` date DEFAULT NULL,
  `venLicenceNo` varchar(50) NOT NULL,
  `venBussinessLogo` blob DEFAULT NULL,
  `venIsActive` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `datavendor`:
--

--
-- Dumping data for table `datavendor`
--

INSERT INTO `datavendor` (`venVendorPK`, `venName`, `venAbbrName`, `venYearOfEst`, `venAffliationWithTcs`, `venLicenceNo`, `venBussinessLogo`, `venIsActive`) VALUES
(8, 'PMD Ltd', 'PMD Ltd', 2001, NULL, '23123', NULL, b'0'),
(9, 'LKJ Ltd', 'LKJ Ltd', 2003, NULL, '4556', NULL, b'0'),
(21, 'ALK', 'ALK', 2001, NULL, 'w123', NULL, b'0'),
(22, 'HJK', 'HJK', 2001, NULL, '231312', NULL, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `datavendorinfo`
--

CREATE TABLE `datavendorinfo` (
  `vendorPK` int(9) NOT NULL,
  `vendorpwd` mediumtext NOT NULL,
  `vendorSecretQn` varchar(50) NOT NULL,
  `vendorSecretAns` varchar(60) NOT NULL,
  `vendorOffLandLineNo` varchar(20) DEFAULT NULL,
  `vendorMobileNo` varchar(20) DEFAULT NULL,
  `vendorFaxNo` varchar(20) DEFAULT NULL,
  `vendorEmail` varchar(30) NOT NULL,
  `vendorVoIP` varchar(20) DEFAULT NULL,
  `venVendorFK` int(6) NOT NULL,
  `vencountry` varchar(50) NOT NULL,
  `venaddress` varchar(200) NOT NULL,
  `venstate` varchar(50) NOT NULL,
  `vencity` varchar(50) NOT NULL,
  `venpostalCode` varchar(60) NOT NULL,
  `venperson` varchar(50) NOT NULL,
  `ventax` varchar(50) NOT NULL,
  `venwebsite` varchar(50) DEFAULT NULL,
  `venlang` varchar(50) NOT NULL,
  `venisapproved` varchar(50) NOT NULL,
  `venisViewed` bit(1) NOT NULL,
  `venisVerified` bit(1) NOT NULL,
  `venacceptTerms` bit(1) NOT NULL,
  `ventoken` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `datavendorinfo`:
--   `venVendorFK`
--       `datavendor` -> `venVendorPK`
--

--
-- Dumping data for table `datavendorinfo`
--

INSERT INTO `datavendorinfo` (`vendorPK`, `vendorpwd`, `vendorSecretQn`, `vendorSecretAns`, `vendorOffLandLineNo`, `vendorMobileNo`, `vendorFaxNo`, `vendorEmail`, `vendorVoIP`, `venVendorFK`, `vencountry`, `venaddress`, `venstate`, `vencity`, `venpostalCode`, `venperson`, `ventax`, `venwebsite`, `venlang`, `venisapproved`, `venisViewed`, `venisVerified`, `venacceptTerms`, `ventoken`) VALUES
(3, '$2b$10$ByX5WkWNyjqCoAcZKNZLf.CtWYMgRPfnvNRVC2thaRxsBc5GSvfXi', 'Which is your favourite fruit?', 'Mango', NULL, '9532064401', '3242353', 'opljhg82@gmail.com', NULL, 8, 'India', '90 moti nagar', 'Uttar pradesh', 'Lucknow', '226005', 'Nupur', '3232', 'http://sample.com', 'English', 'Approved', b'1', b'1', b'1', ''),
(4, '$2b$10$zZYVYznoEXokdcaEK.pyJu5f/Ls3E9UENmj03yAe3UQ7qp2se687K', 'Which is your favourite fruit?', 'Grapes', NULL, '9543024627', '656576', 'lkmnmk63@gmail.com', NULL, 9, 'India', '78 GT Road', 'Rajasthan', 'Ajmer', '231345', 'Priya', '32455656', 'http://sample.com', 'English', 'Approved', b'1', b'1', b'1', ''),
(16, '$2b$10$Y0t2Ak6hpMRDYHL87Nl/t.DevZxtQoa15XlCO9tVL7eviChb0CgUe', 'Which is your favourite fruit?', 'Mango', NULL, '9532064401', '890', 'xyz07496@gmail.com', NULL, 21, 'India', '90 moti nagar near balika vidyalaya', 'Uttar Pradesh', 'Lucknow', '220664', 'Palak', '12345', '', 'English', 'Pending', b'1', b'1', b'1', ''),
(17, '$2b$10$6pkR9SSk8Qh7eFqSG446h.1ZAflF2xs6QhHTKkG2hFuPZPCV/TAry', 'Which is your favourite fruit?', 'Mango', NULL, '9543245324', '4234', 'angel.cute1234@gmail.com', NULL, 22, 'India', '90 moti nagar near balika vidyalya', 'Uttar Pradesh', 'Lucknow', '226003', 'Payal', '123', '', 'English', 'Approved', b'1', b'1', b'1', '');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `departments`:
--

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department_name`) VALUES
(1, 'IT'),
(3, 'Electrical'),
(4, 'HR'),
(5, 'Management'),
(6, 'Technical'),
(7, 'Testing');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_no` int(40) NOT NULL,
  `billNo` int(40) NOT NULL,
  `invoice_date` datetime DEFAULT NULL,
  `invoice_due_date` datetime DEFAULT NULL,
  `credit_days` int(40) NOT NULL,
  `invoice_address` varchar(200) NOT NULL,
  `tax` int(40) NOT NULL,
  `description` varchar(200) NOT NULL,
  `total` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `invoices`:
--   `billNo`
--       `pos` -> `billNo`
--

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_no`, `billNo`, `invoice_date`, `invoice_due_date`, `credit_days`, `invoice_address`, `tax`, `description`, `total`) VALUES
(11, 1, '2021-02-14 00:00:00', '2021-02-15 00:00:00', 1, 'TCS AIR INDIA', 200, 'It is delivered', 64200),
(13, 3, '2021-02-12 00:00:00', '2021-02-13 00:00:00', 1, 'La Sheva House', 100, 'Delivered', 22100),
(14, 4, '2021-02-20 00:00:00', '2021-02-26 00:00:00', 6, 'CMC BKC', 100, 'dsad', 64100),
(15, 12, '2021-02-16 00:00:00', '2021-02-18 00:00:00', 2, 'R10, Bandra E, E Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051', 200, 'Item is delivered', 2200);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_item`
--

CREATE TABLE `invoice_item` (
  `id` int(40) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `market_price` int(40) DEFAULT NULL,
  `invoiced_quantity` int(40) DEFAULT NULL,
  `invoice_no` int(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `invoice_item`:
--   `invoice_no`
--       `invoices` -> `invoice_no`
--   `item_id`
--       `order_items` -> `id`
--

--
-- Dumping data for table `invoice_item`
--

INSERT INTO `invoice_item` (`id`, `item_id`, `market_price`, `invoiced_quantity`, `invoice_no`) VALUES
(1, 126, 64000, 2, 11),
(4, 132, 20000, 1, 13),
(5, 131, 2000, 1, 13),
(6, 134, 32000, 2, 14),
(7, 176, 2000, 1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(40) NOT NULL,
  `name` varchar(200) NOT NULL,
  `sku` varchar(200) NOT NULL,
  `brand` int(6) NOT NULL,
  `price` int(40) NOT NULL,
  `currency` varchar(200) NOT NULL,
  `desc` varchar(200) NOT NULL,
  `discount` double NOT NULL,
  `quantity` int(40) NOT NULL,
  `specification` varchar(200) DEFAULT NULL,
  `unit_type` varchar(200) DEFAULT NULL,
  `threshold` int(40) NOT NULL,
  `warranty` varchar(200) NOT NULL,
  `policy` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `features` varchar(200) DEFAULT NULL,
  `supplier` int(6) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `items`:
--   `brand`
--       `brands` -> `brandpk`
--   `supplier`
--       `datavendor` -> `venVendorPK`
--

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `name`, `sku`, `brand`, `price`, `currency`, `desc`, `discount`, `quantity`, `specification`, `unit_type`, `threshold`, `warranty`, `policy`, `location`, `features`, `supplier`, `createdAt`, `updatedAt`) VALUES
(1305, 'Laptop', 'H_121321321', 3, 34000, 'INR', 'Gaming Laptop', 20, 20, '35 inch', NULL, 10, '6 years', '6 years', 'Kolkata', 'Intel Processor', 8, '2021-02-04 19:39:40', '2021-02-04 19:39:40'),
(2627, 'USB', 'U_21223321321', 8, 2000, 'INR', 'Portable', 20, 20, '32 GB', NULL, 10, '2 years', '3 years', 'Delhi', '32 GB', 9, '2021-02-16 11:38:40', '2021-02-16 11:38:40'),
(6857, 'USB', 'U_21223321321', 8, 2000, 'INR', 'Portable', 20, 20, '32 GB', NULL, 10, '2 years', '3 years', 'Delhi', '32 GB', 9, '2021-02-04 12:38:35', '2021-02-04 12:38:35'),
(8524, 'USB', 'U_21223321321', 2, 20000, 'INR', 'Portable', 20, 20, '32 GB', NULL, 10, '2 years', '3 years', 'Delhi', '32 GB', 9, '2021-02-04 12:37:22', '2021-02-04 12:37:22'),
(8799, 'Laptop', 'HP_12234324', 3, 20000, 'INR', 'Good for gaming', 20, 20, '35 inch', NULL, 10, '4', '5', 'Lucknow', '35 inch', 22, '2021-02-17 18:38:25', '2021-02-17 18:38:25');

-- --------------------------------------------------------

--
-- Table structure for table `item_images`
--

CREATE TABLE `item_images` (
  `id` int(40) NOT NULL,
  `item_id` int(40) NOT NULL,
  `imageName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `item_images`:
--

--
-- Dumping data for table `item_images`
--

INSERT INTO `item_images` (`id`, `item_id`, `imageName`) VALUES
(286, 8524, '1612442226981-upload-usb_cable_pic5.jpg'),
(289, 6857, '1612442226981-upload-usb_cable_pic5.jpg'),
(291, 1305, '1612467552202-upload-HP_laptop_1.png'),
(292, 2627, '1612442226981-upload-usb_cable_pic5.jpg'),
(293, 8799, '1613587005144-upload-1612467552202-upload-HP_laptop_1.png'),
(294, 8799, '1613587067765-upload-HP_laptop_1.jpg'),
(295, 8799, '1613587067774-upload-HP_laptop_3.jpg'),
(296, 8799, '1613587067778-upload-HP_laptop_4.png');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `created_by` int(9) NOT NULL,
  `date` datetime DEFAULT NULL,
  `order_desc` varchar(200) NOT NULL,
  `message` varchar(200) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `approved_by` int(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `orders`:
--

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `created_by`, `date`, `order_desc`, `message`, `status`, `approved_by`) VALUES
(699, 123, '2021-02-17 16:53:25', 'USB', 'Pending for approval', 1, NULL),
(881, 123, '2021-02-12 12:03:40', 'Laptop', 'Pending for approval', 1, NULL),
(929, 123, '2021-02-12 13:04:01', 'Laptop', 'Pending for approval', 1, NULL),
(1024, 112951, '2021-02-10 12:23:41', 'USB', 'Pending for approval', 1, NULL),
(1149, 123, '2021-02-05 05:41:13', 'USB', 'approved', 4, 346755),
(1662, 123, '2021-02-15 12:07:04', 'USB', 'Pending for approval', 1, NULL),
(1684, 104657, '2021-02-10 11:49:56', 'Laptop', 'Pending for approval', 1, NULL),
(1760, 123, '2021-02-04 15:56:37', 'Laptop', 'Approved', 4, 71455),
(1917, 123, '2021-02-12 15:39:50', 'Laptop', 'approved', 4, 346755),
(2368, 123, '2021-02-12 12:03:42', 'Laptop', 'ok', 4, 346755),
(2403, 123, '2021-02-16 19:18:23', 'USB', 'undefined', 2, 71455),
(2816, 112951, '2021-02-10 12:30:56', 'USB', 'Pending for approval', 1, NULL),
(3239, 123, '2021-02-05 07:46:25', 'Laptop', 'Approved', 4, 346755),
(3296, 123, '2021-02-17 16:53:42', 'Laptop', 'Approved', 4, 71455),
(3348, 104657, '2021-02-10 11:51:19', 'Laptop', 'Pending for approval', 1, NULL),
(3476, 123, '2021-02-04 15:59:20', 'Laptop', '', 2, 71455),
(4090, 123, '2021-02-15 12:06:09', 'USB', 'approved', 4, 346755),
(4583, 123, '2021-02-10 14:26:15', 'USB', 'ok', 4, 346755),
(5576, 123, '2021-02-12 13:07:35', 'Laptop', 'Approved', 4, 71455),
(5778, 123, '2021-02-17 16:50:39', 'Laptop', 'Pending for approval', 1, NULL),
(7643, 123, '2021-02-17 04:44:32', 'Laptop', 'Pending for approval', 1, NULL),
(8029, 123, '2021-02-12 11:33:05', 'Laptop', 'approved', 4, 346755),
(8984, 123, '2021-02-12 15:41:47', 'Laptop', 'Pending for approval', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orderstatus`
--

CREATE TABLE `orderstatus` (
  `id` tinyint(4) NOT NULL,
  `orderStatus` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `orderstatus`:
--

--
-- Dumping data for table `orderstatus`
--

INSERT INTO `orderstatus` (`id`, `orderStatus`) VALUES
(1, 'Pending'),
(2, 'Denied'),
(3, 'Partially Approved'),
(4, 'Approved'),
(5, 'PO Created'),
(6, 'PO Denied'),
(7, 'Item Delivered'),
(8, 'PO Approved'),
(9, 'Order Processing'),
(10, 'Item Quality Check'),
(11, 'Item Dispatched'),
(12, 'Invoice_created'),
(13, 'Invoice_not_created');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `specification` varchar(100) DEFAULT NULL,
  `prefered_vendor` int(6) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_type` varchar(15) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `currency` varchar(20) NOT NULL,
  `comment` varchar(50) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `estimated_arrival` datetime DEFAULT NULL,
  `tracking_link` varchar(100) DEFAULT NULL,
  `department` int(11) NOT NULL,
  `location` varchar(11) NOT NULL,
  `brand` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order_items`:
--

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `name`, `specification`, `prefered_vendor`, `quantity`, `unit_type`, `price`, `currency`, `comment`, `status`, `estimated_arrival`, `tracking_link`, `department`, `location`, `brand`) VALUES
(125, 1760, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 6, NULL, NULL, 4, '01010101005', 4),
(126, 1760, 'Laptop', '14 inch monitor', 9, 2, NULL, 32000, 'INR', NULL, 7, '2021-02-15 00:00:00', 'http://sample.com', 7, '01010101003', 4),
(127, 1760, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 6, NULL, NULL, 5, '01010101003', 4),
(128, 3476, 'Laptop', '14 inch monitor', 9, 2, NULL, 32000, 'INR', NULL, 2, NULL, NULL, 7, '01010101003', 4),
(129, 3476, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 2, NULL, NULL, 5, '01010101003', 4),
(130, 3476, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 2, NULL, NULL, 4, '01010101005', 4),
(131, 1149, 'USB', '32 GB', 9, 1, NULL, 2000, 'INR', NULL, 7, '2021-02-21 00:00:00', 'http://sample.com', 4, '01010101021', 8),
(132, 1149, 'USB', '32 GB', 9, 1, NULL, 20000, 'INR', NULL, 7, '2021-02-21 00:00:00', 'http://sample.com', 4, '01010101021', 2),
(133, 1149, 'USB', '32 GB', 9, 1, NULL, 20000, 'INR', NULL, 6, NULL, NULL, 6, '01010101021', 2),
(134, 3239, 'Laptop', '14 inch monitor', 9, 2, NULL, 32000, 'INR', NULL, 7, '2021-02-28 00:00:00', 'http://sample.com', 4, '01010101024', 4),
(135, 3239, 'Laptop', '35 inch', 8, 2, NULL, 34000, 'INR', NULL, 11, '2021-02-20 00:00:00', 'http://sample.com', 6, '01010101026', 3),
(142, 1684, 'USB', '30 inch', 9, 2, '323', 20000, 'INR', 'none', 1, NULL, NULL, 4, '01010101026', 3),
(143, 1684, 'USB', '32 GB', 9, 1, NULL, 20000, 'INR', NULL, 1, NULL, NULL, 7, '01010101025', 2),
(144, 1684, 'USB', '32 GB', 9, 1, NULL, 2000, 'INR', NULL, 1, NULL, NULL, 4, '01010101026', 8),
(148, 3348, 'USB', '30 inch', 9, 2, '323', 20000, 'INR', 'none', 1, NULL, NULL, 4, '01010101026', 3),
(149, 3348, 'USB', '32 GB', 9, 1, NULL, 20000, 'INR', NULL, 1, NULL, NULL, 7, '01010101025', 2),
(150, 3348, 'USB', '32 GB', 9, 1, NULL, 2000, 'INR', NULL, 1, NULL, NULL, 4, '01010101026', 8),
(153, 1024, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 3, '01010101026', 3),
(154, 1024, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 1, NULL, NULL, 3, '01010101026', 4),
(155, 1024, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 1, NULL, NULL, 4, '01010101025', 4),
(159, 2816, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 3, '01010101026', 3),
(160, 2816, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 1, NULL, NULL, 3, '01010101026', 4),
(161, 2816, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 1, NULL, NULL, 4, '01010101025', 4),
(162, 4583, 'USB', '32 GB', 9, 1, NULL, 2000, 'INR', NULL, 7, '2021-02-26 00:00:00', 'http://sample.com', 5, '01010101023', 8),
(163, 4583, 'USB', '32 GB', 9, 1, NULL, 20000, 'INR', NULL, 6, NULL, NULL, 5, '01010101023', 2),
(164, 8029, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 7, '2021-02-13 00:00:00', 'http://sample.com', 5, '01010101003', 4),
(165, 881, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 5, '01010101022', 3),
(166, 2368, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 4, NULL, NULL, 5, '01010101022', 3),
(167, 929, 'USB', '32 GB', 9, 1, NULL, 2000, 'INR', NULL, 1, NULL, NULL, 7, '01010101007', 8),
(168, 929, 'USB', '32 GB', 9, 2, NULL, 20000, 'INR', NULL, 1, NULL, NULL, 7, '01010101007', 2),
(169, 5576, 'USB', '32 GB', 9, 1, NULL, 20000, 'INR', NULL, 6, '2021-02-27 00:00:00', NULL, 7, '01010101019', 2),
(170, 5576, 'USB', '32 GB', 9, 1, NULL, 2000, 'INR', NULL, 10, '2021-02-26 00:00:00', 'http://sample.com', 7, '01010101019', 8),
(171, 1917, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 6, NULL, NULL, 4, '01010101014', 3),
(172, 1917, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 4, NULL, NULL, 6, '01010101014', 3),
(173, 8984, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 4, '01010101014', 3),
(174, 8984, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 6, '01010101014', 3),
(175, 4090, 'USB', '32 gb', 9, 2, 'dfdsa', 20000, 'INR', 'none', 6, NULL, NULL, 3, '01010101020', 2),
(176, 4090, 'USB', '32 GB', 9, 1, NULL, 2000, 'INR', NULL, 7, '2021-02-24 00:00:00', 'http://sample.com', 3, '01010101020', 8),
(179, 1662, 'USB', '32 gb', 9, 2, 'dfdsa', 20000, 'INR', 'none', 1, NULL, NULL, 3, '01010101020', 2),
(180, 1662, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 6, '01010101020', 3),
(186, 2403, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 2, NULL, NULL, 6, '01010101020', 3),
(187, 2403, 'USB', '32 gb', 9, 2, 'dfdsa', 20000, 'INR', 'none', 2, NULL, NULL, 3, '01010101020', 2),
(188, 7643, 'Laptop', '14 inch monitor', 9, 2, NULL, 32000, 'INR', NULL, 1, NULL, NULL, 7, '01010101003', 4),
(189, 7643, 'Laptop', '14 inch monitor', 9, 1, NULL, 32000, 'INR', NULL, 1, NULL, NULL, 4, '01010101005', 4),
(190, 5778, 'USB', '32 GB', 9, 1, NULL, 20000, 'INR', NULL, 1, NULL, NULL, 4, '01010101015', 2),
(191, 5778, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 6, '01010101015', 3),
(192, 5778, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 4, '01010101015', 3),
(193, 699, 'USB', '32 gb', 9, 2, 'dfdsa', 20000, 'INR', 'none', 1, NULL, NULL, 3, '01010101020', 2),
(194, 699, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 6, '01010101020', 3),
(195, 699, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 1, NULL, NULL, 5, '01010101009', 3),
(196, 699, 'USB', '35 inch', 9, 2, 'DEF', 20000, 'INR', 'none', 1, NULL, NULL, 5, '01010101009', 2),
(197, 3296, 'USB', '32 GB', 9, 1, NULL, 20000, 'INR', NULL, 4, NULL, NULL, 4, '01010101015', 2),
(198, 3296, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 7, '2021-02-19 00:00:00', 'http://sample.com', 4, '01010101015', 3),
(199, 3296, 'Laptop', '35 inch', 8, 1, NULL, 34000, 'INR', NULL, 7, '2021-02-19 00:00:00', 'http://sample.com', 6, '01010101015', 3);

-- --------------------------------------------------------

--
-- Table structure for table `pos`
--

CREATE TABLE `pos` (
  `billNo` int(40) NOT NULL,
  `urg_msg` varchar(10) NOT NULL,
  `reason` varchar(200) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `behalf` int(9) NOT NULL,
  `purchase_type` varchar(45) NOT NULL,
  `cmp_name` varchar(200) NOT NULL,
  `bill_to_address` varchar(200) NOT NULL,
  `delivery_to` int(9) DEFAULT NULL,
  `required_by` datetime NOT NULL,
  `delivery_address` varchar(200) NOT NULL,
  `cost_center` varchar(200) NOT NULL,
  `project_code` varchar(40) DEFAULT NULL,
  `budget_code` varchar(40) DEFAULT NULL,
  `total` int(40) NOT NULL,
  `tracking_link` varchar(200) DEFAULT NULL,
  `estimated_arrival` datetime DEFAULT NULL,
  `po_status` tinyint(4) DEFAULT NULL,
  `message_client` varchar(200) DEFAULT NULL,
  `invoice_status` tinyint(4) DEFAULT NULL,
  `currency` varchar(40) NOT NULL,
  `location` varchar(11) NOT NULL,
  `supplier` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `pos`:
--

--
-- Dumping data for table `pos`
--

INSERT INTO `pos` (`billNo`, `urg_msg`, `reason`, `comment`, `behalf`, `purchase_type`, `cmp_name`, `bill_to_address`, `delivery_to`, `required_by`, `delivery_address`, `cost_center`, `project_code`, `budget_code`, `total`, `tracking_link`, `estimated_arrival`, `po_status`, `message_client`, `invoice_status`, `currency`, `location`, `supplier`) VALUES
(1, 'yes', 'We need it', 'Deliver it on time', 123, 'finished_product', 'Tata Consultancy Services', 'TCS AIR INDIA', 123, '2021-02-18 16:00:00', 'TCS AIR INDIA', '123', '456', '678', 64000, 'http://sample.com', '2021-02-15 00:00:00', 7, 'Delivered', 12, 'INR', '01010101003', 9),
(2, 'no', 'asdas', 'sdadsad', 123, 'dangerous_goods', 'Tata Consultancy Services', 'dsada', 126422, '2021-02-28 00:00:00', 'dsada', 'sad', 'dsada', 'dasda', 32000, '', '0000-00-00 00:00:00', 6, 'Denied', 13, 'INR', '01010101005', 9),
(3, 'yes', 'We need it', 'Deliver it on time', 123, 'dangerous_goods', 'Tata Consultancy Services', 'La Sheva House', 123, '2021-02-28 00:00:00', 'La Sheva House', '123', '567', '894', 22000, 'http://sample.com', '2021-02-21 00:00:00', 7, 'delivered', 12, 'INR', '01010101021', 9),
(4, 'no', 'We need it', 'Deliver it', 123, 'customer', 'Tata Consultancy Services', 'CMC BKC', 123, '2021-02-28 00:00:00', 'CMC BKC', '123', '456', '789', 64000, 'http://sample.com', '2021-02-28 00:00:00', 7, 'delivered', 12, 'INR', '01010101024', 9),
(5, 'no', 'Need', 'Deliver', 123, 'finished_product', 'Tata Consultancy Services', 'OlympusA', 123, '2021-02-27 00:00:00', 'OlympusA', '456', '789', '345', 68000, 'http://sample.com', '2021-02-20 00:00:00', 11, 'dispatched', 13, 'INR', '01010101026', 8),
(6, 'no', 'we need it', 'dasd', 123, 'customer', 'Tata Consultancy Services', 'dasd', 121565, '2021-02-20 00:00:00', 'dasd', 'sda', 'dsa', 'da', 2000, 'http://sample.com', '2021-02-26 00:00:00', 7, 'dispatched', 13, 'INR', '01010101023', 9),
(7, 'no', 'dwad', 'dsad', 123, 'customer', 'Tata Consultancy Services', 'dasd', 112951, '2021-02-14 00:00:00', 'dasd', 'dsa', 'sada', 'dasd', 20000, NULL, NULL, 6, 'Items are not available', 13, 'INR', '01010101023', 9),
(8, 'no', 'We need it', 'Deliver it', 123, 'customer', 'Tata Consultancy Services', 'ddsad', 121565, '2021-02-20 00:00:00', 'ddsad', 'dasda', 'dasd', 'das', 32000, 'http://sample.com', '2021-02-13 00:00:00', 7, 'delivered', 13, 'INR', '01010101003', 9),
(10, 'no', 'dasds', 'sads', 123, 'dangerous_goods', 'Tata Consultancy Services', 'sa', 121565, '2021-02-21 00:00:00', 'sa', 'sad', 'dsad', 'dsa', 2000, 'http://sample.com', '2021-02-26 00:00:00', 10, 'dispatched', 13, 'INR', '01010101019', 9),
(11, 'no', 'We need it', 'Deliver it', 121565, 'project', 'Tata Consultancy Services', 'Malad', 121565, '2021-02-13 00:00:00', 'Malad', '123', '567', '789', 34000, NULL, NULL, 6, 'Items are not available', 13, 'INR', '01010101014', 8),
(12, 'no', 'We need it', 'Deliver it on time', 123, 'finished_product', 'Tata Consultancy Services', 'R10, Bandra E, E Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051', 123, '2021-02-19 00:00:00', 'R10, Bandra E, E Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051', '123', '456', '678', 2000, 'http://sample.com', '2021-02-24 00:00:00', 7, 'Delivered', 12, 'INR', '01010101020', 9),
(13, 'no', 'We need it', 'Deliver it', 123, 'dangerous_goods', 'Tata Consultancy Services', 'MAHAPE', 121565, '2021-02-19 00:00:00', 'MAHAPE', '124', '4545', '32131', 68000, 'http://sample.com', '2021-02-19 00:00:00', 7, 'delivered', 13, 'INR', '01010101015', 8);

-- --------------------------------------------------------

--
-- Table structure for table `po_attachments`
--

CREATE TABLE `po_attachments` (
  `id` int(40) NOT NULL,
  `billNo` int(40) NOT NULL,
  `attachments` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `po_attachments`:
--

--
-- Dumping data for table `po_attachments`
--

INSERT INTO `po_attachments` (`id`, `billNo`, `attachments`) VALUES
(3, 1, '1612454385310-upload-1605277898204-upload-multi_colored_usb_cables.jpg'),
(4, 8, '1613129679332-upload-KGZQoR.jpg'),
(5, 11, '1613144564730-upload-usb_cable_pic2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `po_items`
--

CREATE TABLE `po_items` (
  `id` tinyint(4) NOT NULL,
  `billNo` int(40) NOT NULL,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `po_items`:
--

--
-- Dumping data for table `po_items`
--

INSERT INTO `po_items` (`id`, `billNo`, `order_id`, `item_id`) VALUES
(5, 1, 1760, 126),
(6, 1, 1760, 127),
(9, 2, 1760, 125),
(10, 3, 1149, 132),
(11, 3, 1149, 131),
(12, 3, 1149, 133),
(13, 4, 3239, 134),
(14, 5, 3239, 135),
(20, 6, 4583, 162),
(22, 7, 4583, 163),
(23, 8, 8029, 164),
(25, 10, 5576, 169),
(26, 10, 5576, 170),
(27, 11, 1917, 171),
(28, 12, 4090, 175),
(29, 12, 4090, 176),
(30, 13, 3296, 199),
(31, 13, 3296, 198);

-- --------------------------------------------------------

--
-- Table structure for table `vencategory`
--

CREATE TABLE `vencategory` (
  `id` int(30) NOT NULL,
  `category` varchar(50) NOT NULL,
  `suppRegNo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `vencategory`:
--

--
-- Dumping data for table `vencategory`
--

INSERT INTO `vencategory` (`id`, `category`, `suppRegNo`) VALUES
(16, 'Electrical', 3),
(17, 'Office Equipments', 4),
(35, 'Electrical', 16),
(36, 'ABC', 16),
(37, 'Electrical', 17),
(38, 'Electrical Wires', 17);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminaccess`
--
ALTER TABLE `adminaccess`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `adminid_UNIQUE` (`adminid`),
  ADD KEY `adminaccess_ibfk_1` (`admintype`);

--
-- Indexes for table `admintype`
--
ALTER TABLE `admintype`
  ADD PRIMARY KEY (`admintypeid`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brandpk`);

--
-- Indexes for table `budgets`
--
ALTER TABLE `budgets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departments_fk_idx` (`department`),
  ADD KEY `location_fk_idx` (`location`);

--
-- Indexes for table `dataadmin`
--
ALTER TABLE `dataadmin`
  ADD PRIMARY KEY (`admAdminPK`);

--
-- Indexes for table `datacategory`
--
ALTER TABLE `datacategory`
  ADD PRIMARY KEY (`catCategoryPK`);

--
-- Indexes for table `datalocation`
--
ALTER TABLE `datalocation`
  ADD PRIMARY KEY (`locLocationPK`),
  ADD KEY `locCityFK` (`locCityFK`);

--
-- Indexes for table `datavendor`
--
ALTER TABLE `datavendor`
  ADD PRIMARY KEY (`venVendorPK`);

--
-- Indexes for table `datavendorinfo`
--
ALTER TABLE `datavendorinfo`
  ADD PRIMARY KEY (`vendorPK`),
  ADD KEY `venVendorFK` (`venVendorFK`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`,`department_name`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_no`),
  ADD KEY `fk6` (`billNo`);

--
-- Indexes for table `invoice_item`
--
ALTER TABLE `invoice_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kj3` (`item_id`),
  ADD KEY `fg3` (`invoice_no`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `fk2_idx` (`supplier`),
  ADD KEY `brand_fk_idx` (`brand`);

--
-- Indexes for table `item_images`
--
ALTER TABLE `item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `status_fk` (`status`),
  ADD KEY `admin_fk_idx` (`created_by`),
  ADD KEY `admin_fk5` (`approved_by`);

--
-- Indexes for table `orderstatus`
--
ALTER TABLE `orderstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `pvendor_fk1_idx` (`prefered_vendor`),
  ADD KEY `status_ibFK1_1_idx` (`status`),
  ADD KEY `department_fk_idx` (`department`);

--
-- Indexes for table `pos`
--
ALTER TABLE `pos`
  ADD PRIMARY KEY (`billNo`),
  ADD KEY `po_f1` (`behalf`),
  ADD KEY `po_f2` (`delivery_to`),
  ADD KEY `po_fk3` (`po_status`),
  ADD KEY `supplier` (`supplier`);

--
-- Indexes for table `po_attachments`
--
ALTER TABLE `po_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `po_fk9` (`billNo`);

--
-- Indexes for table `po_items`
--
ALTER TABLE `po_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `po_fk4` (`billNo`),
  ADD KEY `po_fk5` (`item_id`),
  ADD KEY `po_fk6` (`order_id`);

--
-- Indexes for table `vencategory`
--
ALTER TABLE `vencategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suppRegNo` (`suppRegNo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminaccess`
--
ALTER TABLE `adminaccess`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `admintype`
--
ALTER TABLE `admintype`
  MODIFY `admintypeid` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brandpk` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `budgets`
--
ALTER TABLE `budgets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `datavendor`
--
ALTER TABLE `datavendor`
  MODIFY `venVendorPK` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `datavendorinfo`
--
ALTER TABLE `datavendorinfo`
  MODIFY `vendorPK` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_no` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `invoice_item`
--
ALTER TABLE `invoice_item`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9318;

--
-- AUTO_INCREMENT for table `item_images`
--
ALTER TABLE `item_images`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=297;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9986;

--
-- AUTO_INCREMENT for table `orderstatus`
--
ALTER TABLE `orderstatus`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT for table `pos`
--
ALTER TABLE `pos`
  MODIFY `billNo` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `po_attachments`
--
ALTER TABLE `po_attachments`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `po_items`
--
ALTER TABLE `po_items`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `vencategory`
--
ALTER TABLE `vencategory`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adminaccess`
--
ALTER TABLE `adminaccess`
  ADD CONSTRAINT `adminaccess_ibfk_1` FOREIGN KEY (`admintype`) REFERENCES `admintype` (`admintypeid`),
  ADD CONSTRAINT `adminaccess_ibfk_2` FOREIGN KEY (`adminid`) REFERENCES `dataadmin` (`admAdminPK`);

--
-- Constraints for table `budgets`
--
ALTER TABLE `budgets`
  ADD CONSTRAINT `departments_fk` FOREIGN KEY (`department`) REFERENCES `departments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `datavendorinfo`
--
ALTER TABLE `datavendorinfo`
  ADD CONSTRAINT `datavendorinfo_ibfk_1` FOREIGN KEY (`venVendorFK`) REFERENCES `datavendor` (`venVendorPK`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `fk6` FOREIGN KEY (`billNo`) REFERENCES `pos` (`billNo`);

--
-- Constraints for table `invoice_item`
--
ALTER TABLE `invoice_item`
  ADD CONSTRAINT `fg3` FOREIGN KEY (`invoice_no`) REFERENCES `invoices` (`invoice_no`),
  ADD CONSTRAINT `kj3` FOREIGN KEY (`item_id`) REFERENCES `order_items` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `brand_fk` FOREIGN KEY (`brand`) REFERENCES `brands` (`brandpk`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`supplier`) REFERENCES `datavendor` (`venVendorPK`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
