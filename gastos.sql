-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-12-2021 a las 23:27:38
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
  `Tipo` varchar(50) NOT NULL,
  `User` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`Id`, `Concepto`, `Monto`, `Fecha`, `Tipo`, `User`) VALUES
(21, 'Xioami mi 11T Pro', '20.000', '2021-11-22', 'ingreso', 'Yosip'),
(25, 'Almorzar con mi novia', '250.000', '2021-12-14', 'egreso', 'Yosip'),
(26, 'Pago de prestamo', '23.000', '2021-12-01', 'ingreso', 'Yosip'),
(27, 'Comprar Purina', '10.600', '2021-12-14', 'ingreso', 'Yosip'),
(28, 'Sacar al perro a paciar', '12.300', '2021-12-17', 'ingreso', 'Yosip'),
(29, 'Comprar unos tenis adidas', '150.000', '2021-12-13', 'egreso', 'Yosip'),
(30, 'Comprar ropa interior', '114.000', '2021-12-16', 'egreso', 'Yosip'),
(31, 'Pago mensual de salario', '1500.000', '2021-10-13', 'ingreso', 'Yosip'),
(32, 'Comprar una Play Statio 8 pro', '400.000', '2021-01-19', 'egreso', 'Yosip'),
(34, 'Repasar para el examen', '12.000', '2021-12-13', 'ingreso', 'Yosip'),
(35, 'Comprar una cicla BMW', '3800.000', '2021-12-07', 'egreso', 'Yosip'),
(36, 'Comprar útiles escolares ', '230.000', '2021-07-15', 'egreso', 'Yosip'),
(37, 'Bono recibido', '240.000', '2021-11-17', 'ingreso', 'Yosip'),
(38, 'Comprar cursos udemy', '100.000', '2021-04-07', 'egreso', 'Yosip'),
(39, 'Formatear computador', '130.000', '2021-12-06', 'ingreso', 'Yosip'),
(40, 'Diseñar una pagina web', '1800.000', '2021-12-06', 'ingreso', 'Yosip'),
(41, 'Arreglar zapatos', '3.500', '2021-12-07', 'egreso', 'Yosip'),
(97, 'Bañar a luna', '3.400', '2021-12-20', 'egreso', 'Yosip'),
(104, 'mono araño', '3.400', '2021-12-09', 'egreso', 'Yosip'),
(134, 'Nintendo Switch Pro', '1500.000', '2021-12-09', 'ingreso', 'Yosip');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Username`, `Email`, `Password`) VALUES
(128, 'Yosip', 'colinparrado@gmail.com', '$2b$08$zymOthVCPPyNhvPrdbqbTuUZDUxGyycsVkvvOai.aKo1okoqLqbRm');

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
