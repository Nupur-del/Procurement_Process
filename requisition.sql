-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2020 at 02:49 PM
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
CREATE DATABASE IF NOT EXISTS `requisition` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `requisition`;

-- --------------------------------------------------------

--
-- Table structure for table `budgets`
--

CREATE TABLE `budgets` (
  `id` int(40) NOT NULL,
  `department` varchar(200) DEFAULT NULL,
  `location` varchar(200) NOT NULL,
  `budget` int(40) NOT NULL,
  `current_balance` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `budgets`:
--

--
-- Dumping data for table `budgets`
--

INSERT INTO `budgets` (`id`, `department`, `location`, `budget`, `current_balance`) VALUES
(1, 'Technical', 'Mumbai', 140000, 140000),
(2, 'HR', 'Mumbai', 22000, 150000),
(3, 'Testing', 'Mumbai', 80000, 120000),
(4, 'Management', 'Mumbai', 66000, 130000),
(5, 'IT', 'Mumbai', 100000, 100000),
(6, 'Electrical', 'Mumbai', 90000, 90000),
(7, 'Technical', 'Chennai', 140000, 140000),
(8, 'HR', 'Chennai', 150000, 150000),
(9, 'Electrical', 'Chennai', 90000, 90000),
(10, 'Testing', 'Chennai', 120000, 120000),
(11, 'Management', 'Chennai', 130000, 130000),
(12, 'IT', 'Chennai', 100000, 100000),
(13, 'Technical', 'Delhi', 140000, 140000),
(14, 'HR', 'Delhi', 140400, 150000),
(15, 'Management', 'Delhi', 130000, 130000),
(16, 'Testing', 'Delhi', 120000, 120000),
(17, 'IT', 'Delhi', 100000, 100000),
(18, 'Electrical', 'Delhi', 90000, 90000),
(19, 'Technical', 'Hyderabad', 140000, 140000),
(20, 'HR', 'Hyderabad', 150000, 150000),
(21, 'Testing', 'Hyderabad', 120000, 120000),
(22, 'Management', 'Hyderabad', 126800, 130000),
(23, 'IT', 'Hyderabad', 100000, 100000),
(24, 'Electrical', 'Hyderabad', 90000, 90000),
(25, 'Technical', 'Bangalore', 140000, 140000),
(26, 'HR', 'Bangalore', 150000, 150000),
(27, 'Testing', 'Bangalore', 62400, 120000),
(28, 'Management', 'Bangalore', 130000, 130000),
(29, 'IT', 'Bangalore', 100000, 100000),
(30, 'Electrical', 'Bangalore', 51600, 90000),
(31, 'Technical', 'Pune', 140000, 140000),
(32, 'HR', 'Pune', 150000, 150000),
(33, 'Testing', 'Pune', 120000, 120000),
(34, 'Management', 'Pune', 130000, 130000),
(35, 'IT', 'Pune', 100000, 100000),
(36, 'Electrical', 'Pune', 90000, 90000);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `location` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `cities`:
--

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `location`) VALUES
(1, 'Mumbai'),
(2, 'Chennai'),
(3, 'Delhi'),
(4, 'Hyderabad'),
(5, 'Pune'),
(6, 'Bangalore');

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
  `item_id` int(40) NOT NULL,
  `invoice_date` varchar(200) NOT NULL,
  `invoice_due_date` varchar(200) NOT NULL,
  `credit_days` int(40) NOT NULL,
  `invoice_address` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `market_price` int(40) NOT NULL,
  `unit_price` int(40) NOT NULL,
  `ordered_quantity` int(40) NOT NULL,
  `invoiced_quantity` int(40) NOT NULL,
  `tax` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `invoices`:
--

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_no`, `billNo`, `item_id`, `invoice_date`, `invoice_due_date`, `credit_days`, `invoice_address`, `description`, `item_name`, `market_price`, `unit_price`, `ordered_quantity`, `invoiced_quantity`, `tax`) VALUES
(8, 1, 386, '2020-11-18 00:00:00', '2020-11-15 00:00:00', 2, 'Ramnagar Mumbai', 'Item is delivered', 'Laptop', 43000, 43000, 1, 43000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(40) NOT NULL,
  `name` varchar(200) NOT NULL,
  `sku` varchar(200) NOT NULL,
  `brand` varchar(200) NOT NULL,
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
  `supplier` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `items`:
--   `supplier`
--       `logins` -> `id`
--

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `name`, `sku`, `brand`, `price`, `currency`, `desc`, `discount`, `quantity`, `specification`, `unit_type`, `threshold`, `warranty`, `policy`, `location`, `features`, `supplier`) VALUES
(4721, 'Router', 'CIS232132', 'CISCO', 34000, 'INR', 'It is useful for encrypted data', 0.3, 8, NULL, NULL, 2, '4 years', '2 years', 'Hyderabad', 'Secure Sockets Layer', 2),
(4800, 'UsbCable', 'SK21323212', 'IBALL', 3200, 'INR', 'Usb Cable with long wire', 3.4, 3, '1 TB', 'I-2323', 1, '4 years', '2 months', 'Bangalore', 'Portable', 2),
(5472, 'Laptop', 'SK2133232', 'HP', 43000, 'INR', 'Laptop with good graphics', 4.3, 3, '30 inch', 'HP-2343', 4, '4 years', '3 months', 'Mumbai', 'TouchPad', 5),
(7734, 'Laptop', 'PK21323212', 'DELL', 32000, 'INR', 'Laptop with 1 TB RAM', 0, 9, '15 inch', 'DX-2323', 3, '1 year', '2 months', 'Delhi', 'Touch', 2),
(9317, 'Router', 'ASUS21332', 'ASUS', 4200, 'INR', 'It is good for AiProtection', 0.3, 6, NULL, NULL, 4, '4 years', '2 years', 'Lucknow', 'Adaptive QoS', 2);

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
--   `item_id`
--       `items` -> `item_id`
--

--
-- Dumping data for table `item_images`
--

INSERT INTO `item_images` (`id`, `item_id`, `imageName`) VALUES
(233, 7734, '1605277248233-upload-Dell_laptop_1.jpg'),
(234, 7734, '1605277258535-upload-Dell_laptop_2.jpg'),
(235, 7734, '1605277268227-upload-Dell_laptop_3.jpg'),
(236, 5472, '1605277660836-upload-HP_laptop_1.png'),
(237, 5472, '1605277672387-upload-HP_laptop_7.jpg'),
(238, 5472, '1605277685150-upload-HP_laptop_5.jpg'),
(242, 9317, '1606829607075-upload-asus_router_1.jpg'),
(243, 9317, '1606829633719-upload-asus_router_4.jpg'),
(244, 9317, '1606829618181-upload-asus_router_2.jpg'),
(245, 9317, '1606829625680-upload-asus_router_3.jpg'),
(249, 4800, '1606850353295-upload-usb_cable_pic5.jpg'),
(250, 4800, '1605277898204-upload-multi_colored_usb_cables.jpg'),
(251, 4800, '1606850884814-upload-usb_cable_pic2.jpg'),
(252, 4721, '1606887927304-upload-cisco_router_1.png'),
(253, 4721, '1606887935087-upload-cisco_router_2.jpg'),
(254, 4721, '1606887944068-upload-cisco_router_3.jpg'),
(255, 4721, '1606887951976-upload-cisco_router_4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `location` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `total_price` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `locations`:
--   `order_id`
--       `orders` -> `order_id`
--

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `order_id`, `location`, `department`, `total_price`) VALUES
(1, 3844, 'Chennai', 'Electrical', 9600),
(2, 3844, 'Hyderabad', 'Management', 9600),
(5, 1784, 'Bangalore', 'Electrical', 38400),
(6, 1784, 'Bangalore', 'Testing', 28800),
(7, 4969, 'Mumbai', 'Testing', 40000),
(8, 998, 'Chennai', 'Electrical', 9600),
(9, 998, 'Hyderabad', 'Management', 9600),
(10, 658, 'Delhi', 'HR', 9600),
(11, 2732, 'Pune', 'Management', 75000),
(12, 2732, 'Bangalore', 'Testing', 32000),
(13, 2766, 'Hyderabad', 'Management', 3200),
(14, 1784, 'Hyderabad', 'IT', 63000),
(53, 5594, 'Mumbai', 'Testing', 40000),
(54, 9443, 'Bangalore', 'Electrical', 38400),
(55, 9443, 'Bangalore', 'Testing', 28800),
(59, 4220, 'Bangalore', 'Testing', 28800),
(60, 6050, 'Mumbai', 'Management', 64000),
(61, 6050, 'Mumbai', 'HR', 128000),
(62, 3372, 'Mumbai', 'Testing', 40000),
(63, 5249, 'Chennai', 'Management', 216000),
(64, 5249, 'Hyderabad', 'Testing', 80600),
(65, 4164, 'Pune', 'HR', 139200),
(66, 4164, 'Delhi', 'HR', 413000),
(67, 3707, 'Chennai', 'Management', 216000),
(68, 3707, 'Hyderabad', 'Testing', 80600),
(69, 6876, 'Mumbai', 'HR', 98000),
(70, 2996, 'Mumbai', 'IT', 48400),
(71, 2996, 'Pune', 'HR', 43000);

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `contact_no` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `logins`:
--

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`id`, `email`, `password`, `type`, `name`, `contact_no`) VALUES
(1, 'test1@test.com', '12345678', 'Requestor', 'test1', 8987343223),
(2, 'test2@test.com', '12345678', 'Supplier', 'test2', 8987342564),
(3, 'test3@test.com', '12345678', 'Approver', 'test3', 9532098045),
(4, 'test4@test.com', '12345678', 'Requestor', 'test4', 9839569967),
(5, 'test5@test.com', '12345678', 'Supplier', 'test5', 9345267578),
(6, 'test6@test.com', '12345678', 'Approver', 'test6', 9345267578);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `created_by` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `order_desc` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `orders`:
--

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `created_by`, `date`, `order_desc`) VALUES
(658, 'test1', '2020-11-24', 'Order for Laptop'),
(998, 'test1', '2020-11-24', 'Sample Order'),
(1784, 'test1', '2020-11-25', 'Orders for USB CABLE'),
(2732, 'test1', '2020-11-24', 'Order for Laptop'),
(2766, 'test1', '2020-11-25', 'Sample Order'),
(2996, 'test1', '2020-12-02', 'Order for Laptop'),
(3372, 'test1', '2020-11-28', 'Sample Order'),
(3707, 'test1', '2020-12-02', 'Sample Order'),
(3844, 'test1', '2020-11-24', 'Sample Order'),
(4164, 'test1', '2020-12-02', 'Order for Routers'),
(4220, 'test1', '2020-11-26', 'Orders for USB CABLE'),
(4969, 'test1', '2020-11-24', 'Sample Order'),
(5249, 'test1', '2020-12-02', 'Sample Order'),
(5594, 'test1', '2020-11-26', 'Sample Order'),
(6050, 'test1', '2020-11-28', 'Sample Order'),
(6876, 'test1', '2020-12-02', 'Order'),
(9443, 'test1', '2020-11-26', 'Orders for USB CABLE');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `specification` varchar(200) DEFAULT NULL,
  `prefered_vendor` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_type` varchar(200) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `currency` varchar(200) NOT NULL,
  `custom` varchar(200) DEFAULT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `status` varchar(200) NOT NULL,
  `estimated_arrival` varchar(200) DEFAULT NULL,
  `tracking_link` varchar(200) DEFAULT NULL,
  `location` varchar(200) NOT NULL,
  `department` varchar(300) NOT NULL,
  `supplier` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order_items`:
--   `order_id`
--       `orders` -> `order_id`
--

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `name`, `specification`, `prefered_vendor`, `quantity`, `unit_type`, `price`, `currency`, `custom`, `comment`, `status`, `estimated_arrival`, `tracking_link`, `location`, `department`, `supplier`) VALUES
(1, 3844, 'UsbCable', '1 TB', 'IBALL', 3, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Chennai', 'Electrical', 'test2'),
(2, 3844, 'UsbCable', '1 TB', 'IBALL', 3, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Hyderabad', 'Management', 'test2'),
(5, 1784, 'UsbCable', '1 TB', 'IBALL', 12, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Bangalore', 'Electrical', 'test2'),
(6, 1784, 'UsbCable', '1 TB', 'IBALL', 9, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Bangalore', 'Testing', 'test2'),
(7, 4969, 'Laptop', '15 inch', 'HP', 2, 'HN-3232', 20000, 'INR', NULL, 'none', 'Approved', NULL, NULL, 'Mumbai', 'Testing', NULL),
(8, 998, 'UsbCable', '1 TB', 'IBALL', 3, 'I-2323', 3200, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Chennai', 'Electrical', NULL),
(9, 998, 'UsbCable', '1 TB', 'IBALL', 3, 'I-2323', 3200, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Hyderabad', 'Management', NULL),
(10, 658, 'UsbCable', '1 TB', 'IBALL', 3, 'I-2323', 3200, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Delhi', 'HR', 'test2'),
(11, 2732, 'Laptop', '30 inch', 'HP', 1, 'HP-2343', 43000, 'INR', NULL, NULL, 'PO created', NULL, NULL, 'Pune', 'Management', 'test1'),
(12, 2732, 'Laptop', '15 inch', 'DELL', 1, 'DX-2323', 32000, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Pune', 'Management', 'test2'),
(13, 2732, 'Laptop', '15 inch', 'DELL', 1, 'DX-2323', 32000, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Bangalore', 'Testing', 'test2'),
(14, 2766, 'UsbCable', '1 TB', 'IBALL', 1, 'I-2323', 3200, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Hyderabad', 'Management', 'test2'),
(15, 1784, 'Laptop', '30 inch', 'HP', 1, 'HP-2343', 43000, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Hyderabad', 'IT', 'test1'),
(16, 1784, 'Laptop', '12 inch', 'HP', 2, 'LK-121212', 10000, 'INR', NULL, 'none', 'Pending', NULL, NULL, 'Hyderabad', 'IT', 'test2'),
(55, 5594, 'Laptop', '15 inch', 'HP', 2, 'HN-3232', 20000, 'INR', NULL, 'none', 'Pending', NULL, NULL, 'Mumbai', 'Testing', NULL),
(56, 9443, 'UsbCable', '1 TB', 'IBALL', 12, 'I-2323', 3200, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Bangalore', 'Electrical', NULL),
(57, 9443, 'UsbCable', '1 TB', 'IBALL', 9, 'I-2323', 3200, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Bangalore', 'Testing', NULL),
(61, 4220, 'UsbCable', '1 TB', 'IBALL', 9, 'I-2323', 3200, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Bangalore', 'Testing', NULL),
(62, 6050, 'Laptop', '15 inch', 'DELL', 2, 'DX-2323', 32000, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Mumbai', 'Management', 'test2'),
(63, 6050, 'Laptop', '15 inch', 'DELL', 4, 'DX-2323', 32000, 'INR', NULL, NULL, 'Approved', NULL, NULL, 'Mumbai', 'HR', 'test2'),
(64, 3372, 'Laptop', '15 inch', 'HP', 2, 'HN-3232', 20000, 'INR', NULL, 'none', 'Denied', NULL, NULL, 'Mumbai', 'Testing', NULL),
(65, 5249, 'Laptop', '34 inch', 'HP', 2, 'HN-32323', 23000, 'INR', NULL, 'none', 'Denied', NULL, NULL, 'Chennai', 'Management', 'test5'),
(66, 5249, 'Router', NULL, 'CISCO', 2, NULL, 34000, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Hyderabad', 'Testing', '2'),
(67, 5249, 'Router', NULL, 'CISCO', 5, NULL, 34000, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Chennai', 'Management', '2'),
(68, 5249, 'Router', NULL, 'ASUS', 3, NULL, 4200, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Hyderabad', 'Testing', '2'),
(69, 4164, 'Router', '67 inch', 'ASUS', 3, 'ASUS-3232', 45000, 'INR', NULL, 'none', 'Denied', NULL, NULL, 'Pune', 'HR', 'test5'),
(71, 4164, 'Router', NULL, 'ASUS', 1, NULL, 4200, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Pune', 'HR', '2'),
(72, 4164, 'Router', '34 inch', 'IBALL', 2, 'IBALL-3232', 56000, 'INR', NULL, 'none', 'Denied', NULL, NULL, 'Delhi', 'HR', 'test2'),
(73, 4164, 'Laptop', '30 inch', 'HP', 7, 'HP-2343', 43000, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Delhi', 'HR', '5'),
(74, 3707, 'Laptop', '34 inch', 'HP', 2, 'HN-32323', 23000, 'INR', NULL, 'none', 'Denied', NULL, NULL, 'Chennai', 'Management', NULL),
(75, 3707, 'Router', NULL, 'CISCO', 2, NULL, 34000, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Hyderabad', 'Testing', NULL),
(76, 3707, 'Router', NULL, 'CISCO', 5, NULL, 34000, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Chennai', 'Management', NULL),
(77, 3707, 'Router', NULL, 'ASUS', 3, NULL, 4200, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Hyderabad', 'Testing', NULL),
(78, 6876, 'Laptop', '45 inch', 'DELL', 1, 'JN-453534', 34000, 'INR', NULL, 'none', 'Denied', NULL, NULL, 'Mumbai', 'HR', 'test5'),
(79, 6876, 'Laptop', '15 inch', 'DELL', 2, 'DX-2323', 32000, 'INR', NULL, NULL, 'Denied', NULL, NULL, 'Mumbai', 'HR', '2'),
(80, 2996, 'Router', '89 inch', 'CISCO', 2, 'CISCO-2321', 20000, 'INR', NULL, 'none', 'Pending', NULL, NULL, 'Mumbai', 'IT', 'test5'),
(81, 2996, 'Router', NULL, 'ASUS', 2, NULL, 4200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Mumbai', 'IT', '2'),
(82, 2996, 'Laptop', '30 inch', 'HP', 1, 'HP-2343', 43000, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Pune', 'HR', '5');

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `status` varchar(200) NOT NULL,
  `message` varchar(200) NOT NULL,
  `color` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order_status`:
--   `order_id`
--       `orders` -> `order_id`
--

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `order_id`, `status`, `message`, `color`) VALUES
(1, 3844, 'Pending', 'Pending for approval', 'primary'),
(5, 4969, 'Approved', 'undefined', 'primary'),
(6, 998, 'Denied', 'not required', 'primary'),
(7, 658, 'Approved', 'It is Approved', 'primary'),
(8, 2732, 'PO created', 'PO sent to Supplier', 'primary'),
(9, 2766, 'Approved', 'Request is approved', 'primary'),
(10, 1784, 'Pending', 'Pending for approval', 'primary'),
(49, 5594, 'Pending', 'Pending for approval', 'primary'),
(50, 9443, 'Approved', 'Request is approved', 'primary'),
(54, 4220, 'Approved', 'Request is approved', 'primary'),
(55, 6050, 'Approved', 'Request is approved', 'primary'),
(56, 3372, 'Denied', 'It is not required', 'primary'),
(57, 5249, 'Denied', 'Required budget is not available for location Chennai', 'primary'),
(59, 4164, 'Denied', 'Required budget is not available', 'primary'),
(60, 3707, 'Denied', 'For Chennai location, we don\'t have required balance', 'primary'),
(61, 6876, 'Denied', 'Required budget is not available', 'primary'),
(63, 2996, 'Pending', 'Pending for approval', 'primary');

-- --------------------------------------------------------

--
-- Table structure for table `pos`
--

CREATE TABLE `pos` (
  `billNo` int(40) NOT NULL,
  `order_id` int(40) NOT NULL,
  `item_id` int(40) NOT NULL,
  `reqName` varchar(200) NOT NULL,
  `urg_msg` varchar(200) NOT NULL,
  `reason` varchar(200) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `behalf` varchar(200) NOT NULL,
  `purchase_type` varchar(200) NOT NULL,
  `message` varchar(200) NOT NULL,
  `currency` varchar(200) NOT NULL,
  `org_billed` varchar(200) NOT NULL,
  `cmp_name` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `bill_to_address` varchar(200) NOT NULL,
  `delivery_to` varchar(200) NOT NULL,
  `required_by` varchar(200) NOT NULL,
  `delivery_address` varchar(200) NOT NULL,
  `cost_center` varchar(200) NOT NULL,
  `project_code` varchar(200) NOT NULL,
  `budget_code` varchar(200) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `quantity` int(40) NOT NULL,
  `price` int(40) NOT NULL,
  `total` int(40) NOT NULL,
  `tracking_link` varchar(200) NOT NULL,
  `estimated_arrival` varchar(200) DEFAULT NULL,
  `po_status` varchar(200) NOT NULL,
  `message_client` varchar(200) NOT NULL,
  `invoice_status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `pos`:
--

--
-- Dumping data for table `pos`
--

INSERT INTO `pos` (`billNo`, `order_id`, `item_id`, `reqName`, `urg_msg`, `reason`, `comment`, `behalf`, `purchase_type`, `message`, `currency`, `org_billed`, `cmp_name`, `location`, `bill_to_address`, `delivery_to`, `required_by`, `delivery_address`, `cost_center`, `project_code`, `budget_code`, `item_name`, `quantity`, `price`, `total`, `tracking_link`, `estimated_arrival`, `po_status`, `message_client`, `invoice_status`) VALUES
(1, 4969, 7, 'test1', 'no', 'we need it on urgent basis', 'we need it on urgent basis', 'TCS', 'product2', 'Thanks in advance', 'INR', 'Tata Consultancy Services', 'TCS', 'Mumbai', 'Ram nagar Mumbai', 'test1', '2020-11-29', '80/23 ramnagar mumbai', 'MUM-32332', 'MUM-3233', 'MUM-21212', 'Laptop', 2, 20000, 40000, '', NULL, 'Approved', '', ''),
(2, 2732, 11, 'test1', 'no', 'We need it', 'We need it', 'TCS', 'product2', 'thanks in advance', 'INR', 'TCS', 'Tata consultancy Services', 'Pune', 'Sitapur Pune', 'Sitapur Pune', '2020-11-29', 'Sitapur Pune', 'PUN-3232', 'PUN-6788', 'PUN-12121', 'Laptop', 1, 43000, 43000, '', NULL, '', '', '');

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
--   `billNo`
--       `pos` -> `billNo`
--

--
-- Dumping data for table `po_attachments`
--

INSERT INTO `po_attachments` (`id`, `billNo`, `attachments`) VALUES
(1, 1, '1606314530598-upload-README.md'),
(2, 2, '1606315413203-upload-README.md');

-- --------------------------------------------------------

--
-- Table structure for table `po_status`
--

CREATE TABLE `po_status` (
  `id` int(40) NOT NULL,
  `billNo` int(40) NOT NULL,
  `order_id` int(40) NOT NULL,
  `status` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `po_status`:
--   `billNo`
--       `pos` -> `billNo`
--

--
-- Dumping data for table `po_status`
--

INSERT INTO `po_status` (`id`, `billNo`, `order_id`, `status`) VALUES
(1, 1, 4969, 'Approved'),
(2, 2, 2732, 'Pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budgets`
--
ALTER TABLE `budgets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`,`location`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`,`department_name`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_no`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `fk2` (`supplier`);

--
-- Indexes for table `item_images`
--
ALTER TABLE `item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `pos`
--
ALTER TABLE `pos`
  ADD PRIMARY KEY (`billNo`);

--
-- Indexes for table `po_attachments`
--
ALTER TABLE `po_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `billNo` (`billNo`);

--
-- Indexes for table `po_status`
--
ALTER TABLE `po_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `billNo` (`billNo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `budgets`
--
ALTER TABLE `budgets`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_no` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9318;

--
-- AUTO_INCREMENT for table `item_images`
--
ALTER TABLE `item_images`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9946;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `pos`
--
ALTER TABLE `pos`
  MODIFY `billNo` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `po_attachments`
--
ALTER TABLE `po_attachments`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `po_status`
--
ALTER TABLE `po_status`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `fk2` FOREIGN KEY (`supplier`) REFERENCES `logins` (`id`);

--
-- Constraints for table `item_images`
--
ALTER TABLE `item_images`
  ADD CONSTRAINT `item_images_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);

--
-- Constraints for table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `order_status`
--
ALTER TABLE `order_status`
  ADD CONSTRAINT `order_status_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `po_attachments`
--
ALTER TABLE `po_attachments`
  ADD CONSTRAINT `po_attachments_ibfk_1` FOREIGN KEY (`billNo`) REFERENCES `pos` (`billNo`);

--
-- Constraints for table `po_status`
--
ALTER TABLE `po_status`
  ADD CONSTRAINT `po_status_ibfk_2` FOREIGN KEY (`billNo`) REFERENCES `pos` (`billNo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
