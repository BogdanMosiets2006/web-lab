<?php
/**
 * Главная страница - галерея фотографий
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

// Создание контроллера и вызов метода
$controller = new GalleryController();
$controller->index();
