-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 27-Dez-2020 às 14:14
-- Versão do servidor: 10.4.13-MariaDB
-- versão do PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_lojavirtual`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `qtd` varchar(45) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `data` timestamp NULL DEFAULT current_timestamp(),
  `usuario_id` int(11) NOT NULL,
  `produtos_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `nome`, `qtd`, `valor`, `data`, `usuario_id`, `produtos_id`) VALUES
(48, 'Amortecedor Cofap', '2', '398.89', '2020-12-27 04:12:05', 1, 39),
(49, 'Amortecedor Cofap', '1', '398.89', '2020-12-27 04:12:38', 1, 39),
(50, 'Velas de Ignição', '1', '89.98', '2020-12-27 04:14:34', 1, 40),
(51, 'Velas de Ignição', '23', '89.98', '2020-12-27 04:20:54', 1, 40),
(52, 'Velas de Ignição', '1', '89.98', '2020-12-27 04:21:19', 1, 40),
(53, 'Velas de Ignição', '23', '89.98', '2020-12-27 04:21:46', 1, 40),
(54, 'Velas de Ignição', '1', '89.98', '2020-12-27 04:23:09', 1, 40),
(55, 'Velas de Ignição', '25', '89.98', '2020-12-27 04:24:00', 1, 40),
(56, 'Aditivo  Rosa', '1', '87.89', '2020-12-27 04:24:26', 1, 41),
(57, 'Aditivo Azul', '1', '90.98', '2020-12-27 04:25:00', 1, 42),
(58, 'Amortecedor Cofap', '1', '398.89', '2020-12-27 04:28:40', 1, 39),
(59, 'Aditivo Azul', '6', '90.98', '2020-12-27 04:31:52', 1, 42),
(60, 'Aditivo Azul', '10', '90.98', '2020-12-27 04:37:04', 1, 42),
(61, 'Aditivo Azul', '5', '90.98', '2020-12-27 04:40:04', 1, 42),
(62, 'Aditivo  Rosa', '6', '87.89', '2020-12-27 04:40:30', 1, 41),
(63, 'Aditivo Azul', '2', '90.98', '2020-12-27 04:46:44', 1, 42),
(64, 'Aditivo  Rosa', '5', '87.89', '2020-12-27 04:48:31', 1, 41),
(65, 'Aditivo  Rosa', '40', '87.89', '2020-12-27 04:49:07', 1, 41),
(66, 'Aditivo  Rosa', '3', '87.89', '2020-12-27 04:49:29', 1, 41),
(67, 'Velas de Ignição', '25', '89.98', '2020-12-27 04:52:35', 1, 40),
(68, 'Amortecedor Cofap', '31', '398.89', '2020-12-27 04:56:07', 1, 39),
(69, 'Filtro Cabine', '1', '567.00', '2020-12-27 04:59:33', 1, 44),
(70, 'Amortecedor Cofap', '3', '398.89', '2020-12-27 05:06:43', 1, 39),
(71, 'Batedor ts ', '4', '77.88', '2020-12-27 05:07:41', 1, 43),
(72, 'Amortecedor Cofap', '13', '398.89', '2020-12-27 05:09:46', 1, 39);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `barra` varchar(45) DEFAULT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `estoque` varchar(45) DEFAULT NULL,
  `qtd` varchar(45) DEFAULT NULL,
  `valor_compra` decimal(10,2) DEFAULT NULL,
  `valor_venda` decimal(10,2) DEFAULT NULL,
  `foto` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `codigo`, `barra`, `nome`, `estoque`, `qtd`, `valor_compra`, `valor_venda`, `foto`) VALUES
(39, '778899', '789456123789', 'Amortecedor Cofap', '3', '1', '123.90', '398.89', './imgs/img_user2020-12-27_01_11_35.jpg'),
(40, '78998', '789456123654', 'Velas de Ignição', '25', '1', '45.89', '89.98', './imgs/img_user2020-12-27_01_14_09.jpg'),
(41, '74185', '7485932152111', 'Aditivo  Rosa', '3', '1', '87.90', '87.89', './imgs/img_user2020-12-27_01_16_06.jpg'),
(42, '74582', '789635241089', 'Aditivo Azul', '48', '1', '34.89', '90.98', './imgs/img_user2020-12-27_01_17_02.jpg'),
(43, '79988', '7894455213325', 'Batedor ts ', '6', '1', '33.33', '77.88', './imgs/img_user2020-12-27_01_57_44.jpg'),
(44, '9898', '97777878887777', 'Filtro Cabine', '80', '1', '233.00', '567.00', './imgs/img_user2020-12-27_01_58_59.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `sobrenome` varchar(50) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  `nivel` varchar(45) DEFAULT NULL,
  `genero` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `sobrenome`, `email`, `telefone`, `endereco`, `cep`, `numero`, `bairro`, `cidade`, `estado`, `complemento`, `usuario`, `senha`, `nivel`, `genero`) VALUES
(1, 'Eneylton ', 'Barros', 'eneylton@hotmail.com', '9899158-1962', 'Rua 03', '65054530', '36', 'Cohatrac IV ', 'São Luis', 'MA', 'Proximo a Praça Verão', 'ene', '202cb962ac59075b964b07152d234b70', 'admin', 'Masculino'),
(13, 'ana maria', 'Maria', 'anamaria@gmail.com', '9876456789', 'Rua Treze', '65054700', '78', 'Cohatrac III', 'São Luís', 'MA', 'Proxima a igreja', 'ana', '202cb962ac59075b964b07152d234b70', 'atendente', 'Feminino'),
(18, 'Karla', 'Fernanda', 'kf@gmail.com', '988789888', 'Rua 03 Qd.90', '65054530', '90', 'Chafuma', 'São luis', 'MA', 'Proximo a farmacia', 'karla', '202cb962ac59075b964b07152d234b70', 'cliente', 'Feminino');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedidos_usuario_idx` (`usuario_id`),
  ADD KEY `fk_pedidos_produtos1_idx` (`produtos_id`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_produtos1` FOREIGN KEY (`produtos_id`) REFERENCES `produtos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedidos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
