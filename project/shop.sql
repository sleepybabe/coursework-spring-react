-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 28 2023 г., 12:15
-- Версия сервера: 10.4.25-MariaDB
-- Версия PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auto_user`
--

CREATE TABLE `auto_user` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `usename` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `auto_user`
--

INSERT INTO `auto_user` (`id`, `address`, `name`, `password`, `phone`, `user_role`, `usename`) VALUES
(31, '', 'Alina', '$2a$10$PjuxSjuco81SBPH1h5GHtu23xSKkIvDsHrvTsv3/8QblRyT1sDidm', '', 'ROLE_ADMIN', 'admin'),
(50, 'Бульвар Гагарина, 20', 'Alice', '$2a$10$gaX7bQ4fAUUBqDDUQAliWusx6.huXR7DMU50Za2W0ugx6Smxvppgq', NULL, 'ROLE_USER', 'user'),
(49, '', '', '$2a$10$r/xF4dzwEmhiUdTKv76Sb.YIpffvgPJRv7m7O1ac1Oo6.Zl/PaVuW', '', 'ROLE_DELIVER', 'deliver'),
(48, '', '', '$2a$10$xQ0OmGGVF.jxaUF8.KKYgOOHP7AWtux5qrppf46Fp9exz4rSlH49q', '', 'ROLE_COOK', 'cook');

-- --------------------------------------------------------

--
-- Структура таблицы `menu`
--

CREATE TABLE `menu` (
  `id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `menu`
--

INSERT INTO `menu` (`id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Структура таблицы `menu_product`
--

CREATE TABLE `menu_product` (
  `menu_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `menu_product`
--

INSERT INTO `menu_product` (`menu_id`, `product_id`) VALUES
(1, 24),
(1, 20),
(1, 22),
(1, 23),
(1, 21);

-- --------------------------------------------------------

--
-- Структура таблицы `order_product`
--

CREATE TABLE `order_product` (
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `order_product`
--

INSERT INTO `order_product` (`order_id`, `product_id`) VALUES
(3, 24),
(2, 24),
(3, 20),
(5, 21),
(7, 20),
(7, 23);

-- --------------------------------------------------------

--
-- Структура таблицы `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `mime_type` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `product`
--

INSERT INTO `product` (`id`, `description`, `name`, `price`, `file_name`, `mime_type`) VALUES
(22, 'Эти два продукта отлично сочетаются друг с другом, вместе создавая очень нежное и вкусное блюдо. Как горячее, такие котлеты будут одинаково хорошо смотреться и на завтраке, не говоря уже о обеде или ужине', 'Котлеты с творогом картофельные', 100, 'recept_22264_b3x0.jpg', 'image/jpeg'),
(21, 'Измельченный отварной картофель, обычно с добавлением сливочного масла, молока, яиц или сливок', 'Картофельное пюре', 85, 'images.jpeg', 'image/jpeg'),
(20, 'Замороженное рыбное кулинарное изделие в форме вытянутых брусочков, приготовляемое из брикетов замороженного рыбного филе, обычно трески, в панировке.', 'Рыбные палочки', 219, 'photo_2023-05-26_21-26-14.jpg', 'image/jpeg'),
(23, 'Приготовленные на сковороде креветки в сливочно-чесночном соусе отлично сочетаются с рисовой лапшой или рисом', 'Креветки в сливочно-чесночном соусе', 250, 'recept_2867_x1fd.jpg', 'image/jpeg'),
(24, 'Классический рецепт грузинской кухни, который известен нам под названием хинкали. Горячее, яркое сочное блюдо - замечательный выбор горячего на обед или ужин', 'Манты грузинские', 140, 'recept_23305_lz86.jpg', 'image/jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `shopping_cart`
--

CREATE TABLE `shopping_cart` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `shopping_cart`
--

INSERT INTO `shopping_cart` (`id`, `user_id`) VALUES
(1, 41),
(2, 43),
(3, 47),
(4, 50);

-- --------------------------------------------------------

--
-- Структура таблицы `shopping_cart_product`
--

CREATE TABLE `shopping_cart_product` (
  `shopping_cart_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `user_order`
--

CREATE TABLE `user_order` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_order`
--

INSERT INTO `user_order` (`id`, `address`, `status`, `user_id`) VALUES
(3, 'Бульвар Гагарина, 20', 'DONE', 43),
(5, 'Бульвар Гагарина, 20', 'DELIVER', 50),
(7, 'Бульвар Гагарина, 20', 'COOK', 50);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `auto_user`
--
ALTER TABLE `auto_user`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `menu_product`
--
ALTER TABLE `menu_product`
  ADD UNIQUE KEY `UK_3x0fpyo630osfevs0ft7f1a71` (`product_id`),
  ADD KEY `FK755dtrv1g87t4m13bht0y5c7m` (`menu_id`);

--
-- Индексы таблицы `order_product`
--
ALTER TABLE `order_product`
  ADD KEY `FKhnfgqyjx3i80qoymrssls3kno` (`product_id`),
  ADD KEY `FK4ep47uiru57tp047hnmnabvyf` (`order_id`);

--
-- Индексы таблицы `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqp81s5485btcbtv3lr6hkcoxs` (`user_id`);

--
-- Индексы таблицы `shopping_cart_product`
--
ALTER TABLE `shopping_cart_product`
  ADD KEY `FKrhdgnliwu0vsv3wka7409p81f` (`product_id`),
  ADD KEY `FKectgy7yh5dy3261o4rei8suxq` (`shopping_cart_id`);

--
-- Индексы таблицы `user_order`
--
ALTER TABLE `user_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKii6fup6dpgr9audjeiofk9ffo` (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `auto_user`
--
ALTER TABLE `auto_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблицы `menu`
--
ALTER TABLE `menu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `shopping_cart`
--
ALTER TABLE `shopping_cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `user_order`
--
ALTER TABLE `user_order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
