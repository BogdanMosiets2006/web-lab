<?php
/**
 * Страница загрузки фотографий
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

// Создание контроллера
$controller = new GalleryController();

// Обработка POST-запроса (загрузка файла)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->handleUpload();
} else {
    // Отображение формы
    $controller->upload();
}
