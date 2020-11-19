-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2020 at 09:53 AM
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
-- Dumping data for table `budgets`
--

INSERT INTO `budgets` (`id`, `department`, `location`, `budget`, `current_balance`) VALUES
(1, 'Technical', 'Mumbai', 140000, 140000),
(2, 'HR', 'Mumbai', 150000, 150000),
(3, 'Testing', 'Mumbai', 120000, 120000),
(4, 'Management', 'Mumbai', 130000, 130000),
(5, 'IT', 'Mumbai', 100000, 100000),
(6, 'Electrical', 'Mumbai', 90000, 90000),
(7, 'Technical', 'Chennai', 140000, 140000),
(8, 'HR', 'Chennai', 150000, 150000),
(9, 'Electrical', 'Chennai', 90000, 90000),
(10, 'Testing', 'Chennai', 120000, 120000),
(11, 'Management', 'Chennai', 130000, 130000),
(12, 'IT', 'Chennai', 100000, 100000),
(13, 'Technical', 'Delhi', 140000, 140000),
(14, 'HR', 'Delhi', 150000, 150000),
(15, 'Management', 'Delhi', 130000, 130000),
(16, 'Testing', 'Delhi', 120000, 120000),
(17, 'IT', 'Delhi', 100000, 100000),
(18, 'Electrical', 'Delhi', 90000, 90000),
(19, 'Technical', 'Hyderabad', 140000, 140000),
(20, 'HR', 'Hyderabad', 150000, 150000),
(21, 'Testing', 'Hyderabad', 120000, 120000),
(22, 'Management', 'Hyderabad', 130000, 130000),
(23, 'IT', 'Hyderabad', 100000, 100000),
(24, 'Electrical', 'Hyderabad', 90000, 90000),
(25, 'Technical', 'Bangalore', 140000, 140000),
(26, 'HR', 'Bangalore', 150000, 150000),
(27, 'Testing', 'Bangalore', 120000, 120000),
(28, 'Management', 'Bangalore', 130000, 130000),
(29, 'IT', 'Bangalore', 100000, 100000),
(30, 'Electrical', 'Bangalore', 90000, 90000),
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
  `supplier` varchar(200) DEFAULT NULL,
  `threshold` int(40) NOT NULL,
  `warranty` varchar(200) NOT NULL,
  `policy` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `features` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `name`, `sku`, `brand`, `price`, `currency`, `desc`, `discount`, `quantity`, `specification`, `unit_type`, `supplier`, `threshold`, `warranty`, `policy`, `location`, `features`) VALUES
(1740, 'UsbCable', 'SK21323212', 'IBALL', 3200, 'INR', 'Usb Cable with long wire', 3.4, 3, '1 TB', 'I-2323', 'test2', 1, '4 years', '2 months', 'Bangalore', 'Portable'),
(5472, 'Laptop', 'SK2133232', 'HP', 43000, 'INR', 'Laptop with good graphics', 4.3, 3, '30 inch', 'HP-2343', 'test1', 4, '4 years', '3 months', 'Mumbai', 'TouchPad'),
(7734, 'Laptop', 'PK21323212', 'DELL', 32000, 'INR', 'Laptop with 1 TB RAM', 0, 9, '15 inch', 'DX-2323', 'test2', 3, '1 year', '2 months', 'Delhi', 'Touch');

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
-- Dumping data for table `item_images`
--

INSERT INTO `item_images` (`id`, `item_id`, `imageName`) VALUES
(233, 7734, '1605277248233-upload-Dell_laptop_1.jpg'),
(234, 7734, '1605277258535-upload-Dell_laptop_2.jpg'),
(235, 7734, '1605277268227-upload-Dell_laptop_3.jpg'),
(236, 5472, '1605277660836-upload-HP_laptop_1.png'),
(237, 5472, '1605277672387-upload-HP_laptop_7.jpg'),
(238, 5472, '1605277685150-upload-HP_laptop_5.jpg'),
(239, 1740, '1605277898204-upload-multi_colored_usb_cables.jpg'),
(240, 1740, '1605277909996-upload-usb_cable_pic4.jpeg'),
(241, 1740, '1605277920180-upload-usb_cable_pic5.jpg');

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
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `order_id`, `location`, `department`, `total_price`) VALUES
(350, 5008, 'Mumbai', 'Electrical', 43000),
(351, 3918, 'Hyderabad', 'Electrical', 86000),
(352, 3918, 'Chennai', 'HR', 40000),
(359, 6833, 'Chennai', 'HR', 9600),
(360, 2105, 'Mumbai', 'Management', 129000),
(361, 8848, 'Chennai', 'Electrical', 3200),
(362, 8848, 'Chennai', 'HR', 86000),
(363, 8848, 'Delhi', 'Management', 3200),
(369, 9371, 'Mumbai', 'Electrical', 9600),
(370, 9371, 'Chennai', 'Electrical', 43000),
(371, 8002, 'Mumbai', 'HR', 4000),
(372, 8002, 'Delhi', 'Management', 12800),
(373, 7979, 'Chennai', 'Electrical', 3200),
(374, 7979, 'Chennai', 'HR', 86000),
(375, 7979, 'Delhi', 'Management', 3200);

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
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`id`, `email`, `password`, `type`, `name`, `contact_no`) VALUES
(1, 'test1@test.com', '12345678', 'Requestor', 'test1', 8987343223),
(2, 'test2@test.com', '12345678', 'Supplier', 'test2', 8987342564),
(3, 'test3@test.com', '12345678', 'Approver', 'test3', 9532098045);

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
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `created_by`, `date`, `order_desc`) VALUES
(2105, 'test1', '2020-11-17', 'Order for Usb Cable'),
(3918, 'test1', '2020-11-15', 'Order for Laptop  and Usb Cable'),
(3969, 'test1', '2020-11-17', 'Order Sample'),
(5008, 'test1', '2020-11-13', 'Order for Laptop'),
(6833, 'test1', '2020-11-17', 'Order for Usb Cable'),
(7979, 'test1', '2020-11-18', 'Sample Order'),
(8002, 'test1', '2020-11-18', 'Sample Order'),
(8848, 'test1', '2020-11-18', 'Sample Order'),
(9371, 'test1', '2020-11-18', 'Sample Order');

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
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `name`, `specification`, `prefered_vendor`, `quantity`, `unit_type`, `price`, `currency`, `custom`, `comment`, `status`, `estimated_arrival`, `tracking_link`, `location`, `department`, `supplier`) VALUES
(386, 5008, 'Laptop', NULL, 'HP', 1, NULL, 43000, 'INR', NULL, NULL, 'Item Delivered', '2020-11-18', '', 'Mumbai', 'Electrical', 'test1'),
(387, 3918, 'UsbCable', '15 inch', 'HP', 2, 'DC-12121', 20000, 'INR', 'none', 'none', 'Pending', NULL, NULL, 'Chennai', 'HR', 'test2'),
(388, 3918, 'Laptop', '30 inch', 'HP', 2, 'HP-2343', 43000, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Hyderabad', 'Electrical', 'test1'),
(394, 3969, 'UsbCable', '1 TB', 'IBALL', 3, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Delhi', 'Management', 'test2'),
(395, 6833, 'UsbCable', '1 TB', 'IBALL', 3, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Chennai', 'HR', 'test2'),
(396, 2105, 'Laptop', '30 inch', 'HP', 3, 'HP-2343', 43000, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Mumbai', 'Management', 'test1'),
(398, 8848, 'Laptop', '30 inch', 'HP', 2, 'HP-2343', 43000, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Chennai', 'HR', 'test1'),
(399, 8848, 'UsbCable', '1 TB', 'IBALL', 1, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Delhi', 'Management', 'test2'),
(406, 9371, 'Laptop', '30 inch', 'HP', 1, 'HP-2343', 43000, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Chennai', 'Electrical', 'test1'),
(407, 9371, 'UsbCable', '1 TB', 'IBALL', 3, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Mumbai', 'Electrical', 'test2'),
(408, 8002, 'Laptop', '13 inch', 'HP', 2, 'HN-2121', 2000, 'INR', NULL, 'none', 'Pending', NULL, NULL, 'Mumbai', 'HR', 'test2'),
(409, 8002, 'UsbCable', '1 TB', 'IBALL', 4, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Delhi', 'Management', 'test2'),
(410, 8848, 'UsbCable', '1 TB', 'IBALL', 1, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Chennai', 'Electrical', 'test2'),
(411, 7979, 'Laptop', '30 inch', 'HP', 2, 'HP-2343', 43000, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Chennai', 'HR', NULL),
(412, 7979, 'UsbCable', '1 TB', 'IBALL', 1, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Delhi', 'Management', NULL),
(413, 7979, 'UsbCable', '1 TB', 'IBALL', 1, 'I-2323', 3200, 'INR', NULL, NULL, 'Pending', NULL, NULL, 'Chennai', 'Electrical', NULL);

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
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `order_id`, `status`, `message`, `color`) VALUES
(153, 5008, 'Item Delivered', 'Item is delivered', 'accent'),
(154, 3918, 'Pending', 'Pending for approval', 'primary'),
(161, 3969, 'Pending', 'Pending for approval', 'primary'),
(162, 6833, 'Pending', 'Pending for approval', 'primary'),
(163, 2105, 'Pending', 'Pending for approval', 'primary'),
(169, 9371, 'Pending', 'Pending for approval', 'primary'),
(170, 8002, 'Pending', 'Pending for approval', 'primary'),
(171, 8848, 'Pending', 'Pending for approval', 'primary'),
(172, 7979, 'Pending', 'Pending for approval', 'primary');

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
-- Dumping data for table `pos`
--

INSERT INTO `pos` (`billNo`, `order_id`, `item_id`, `reqName`, `urg_msg`, `reason`, `comment`, `behalf`, `purchase_type`, `message`, `currency`, `org_billed`, `cmp_name`, `location`, `bill_to_address`, `delivery_to`, `required_by`, `delivery_address`, `cost_center`, `project_code`, `budget_code`, `item_name`, `quantity`, `price`, `total`, `tracking_link`, `estimated_arrival`, `po_status`, `message_client`, `invoice_status`) VALUES
(1, 5008, 386, 'test1', 'no', 'We need this for new employees', 'We need this for new employees', 'TCS', 'product2', 'Please extend RAM to 8 gb', 'INR', 'Tata Consultancy Services', 'TCS', 'Mumbai', 'Ramnagar Mumbai', 'TCS Mumbai', '2020-11-18', 'Ramnagar Mumbai', 'Technical', 'MUM_12121', 'MUM0323', 'Laptop', 1, 43000, 43000, '', '2020-11-18', 'Item Delivered', 'Item is delivered', 'created');

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
-- Dumping data for table `po_attachments`
--

INSERT INTO `po_attachments` (`id`, `billNo`, `attachments`) VALUES
(13, 1, '1605443574057-upload-Dell_laptop_4.jpg');

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
-- Dumping data for table `po_status`
--

INSERT INTO `po_status` (`id`, `billNo`, `order_id`, `status`) VALUES
(12, 1, 5008, 'Item Delivered');

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
  ADD PRIMARY KEY (`item_id`);

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
  MODIFY `item_id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7735;

--
-- AUTO_INCREMENT for table `item_images`
--
ALTER TABLE `item_images`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=376;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9946;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=414;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `pos`
--
ALTER TABLE `pos`
  MODIFY `billNo` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `po_attachments`
--
ALTER TABLE `po_attachments`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `po_status`
--
ALTER TABLE `po_status`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

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
