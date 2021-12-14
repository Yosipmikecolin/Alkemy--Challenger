-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2021 a las 01:56:54
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gastos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `Id` int(11) NOT NULL,
  `Concepto` varchar(50) NOT NULL,
  `Monto` varchar(50) NOT NULL,
  `Fecha` varchar(50) NOT NULL,
  `Tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`Id`, `Concepto`, `Monto`, `Fecha`, `Tipo`) VALUES
(19, 'Comer Pizza', '2.300', '2021-11-25', 'egreso'),
(20, 'Compra de Xbox one x', '500.000', '2021-11-25', 'egreso'),
(21, 'Xioami mi 11T Pro', '20.000', '2021-11-22', 'ingreso'),
(24, 'Hamburguesa', '10.500', '2021-11-26', 'egreso'),
(25, 'Almorzar con mi novia', '250.000', '2021-12-14', 'egreso'),
(26, 'Pago de prestamo', '23.000', '2021-12-01', 'ingreso'),
(27, 'Comprar Purina', '10.600', '2021-12-14', 'ingreso'),
(28, 'Sacar al perro a paciar', '12.300', '2021-12-17', 'ingreso'),
(29, 'Comprar unos zapatos', '150.000', '2021-12-13', 'egreso'),
(30, 'Comprar ropa interior', '114.000', '2021-12-16', 'egreso'),
(31, 'Pago mensual de salario', '1500.000', '2021-10-13', 'ingreso'),
(32, 'Comprar una Play Statio 5 pro', '400.000', '2021-01-19', 'egreso'),
(33, 'Bañar a luna ', '5.400', '2021-12-18', 'ingreso'),
(34, 'Repasar para el examen', '12.000', '2021-12-13', 'ingreso'),
(35, 'Comprar una cicla BMW', '3800.000', '2021-12-07', 'egreso'),
(36, 'Comprar útiles escolares ', '230.000', '2021-07-15', 'egreso'),
(37, 'Bono recibido', '240.000', '2021-11-17', 'ingreso'),
(38, 'Comprar cursos udemy', '100.000', '2021-04-07', 'egreso'),
(39, 'Formatear computador', '130.000', '2021-12-06', 'ingreso'),
(40, 'Diseñar una pagina web', '1800.000', '2021-12-06', 'ingreso'),
(41, 'Arreglar zapatos', '3.500', '2021-12-07', 'egreso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Username`, `Email`, `Password`) VALUES
(40, 'yosipmaster', 'colinparrado@gmail.com', 'yosip123'),
(41, 'manuela', 'zara@gmail.com', 'dsfsdf'),
(42, 'jim parrado', 'jimparrado960@gmail.com', 'jimparrado2001');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
