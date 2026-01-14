<?php
/**
 * Страница просмотра фотографии
 */

// Запуск сессии
session_start();

// Подключение конфигурации
require_once '../config/config.php';
require_once '../config/Database.php';

// Подключение моделей
require_once '../models/User.php';
require_once '../models/Photo.php';

// Подключение контроллера
require_once '../controllers/GalleryController.php';

// Проверка параметра ID
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    header("Location: index.php");
    exit();
}

// Создание контроллера и вызов метода
$controller = new GalleryController();
$controller->show($_GET['id']);
