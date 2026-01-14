<?php
/**
 * Конфигурация базы данных
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'photo_gallery');
define('DB_USER', 'root');
define('DB_PASS', 's8aC6r7_Fe');
define('DB_CHARSET', 'utf8mb4');

// Базовые пути
define('BASE_PATH', dirname(__DIR__));
define('UPLOAD_PATH', BASE_PATH . '/public/uploads/');
define('ORIGINAL_PATH', UPLOAD_PATH . 'original/');
define('THUMBNAIL_PATH', UPLOAD_PATH . 'thumbnails/');

// URL пути
define('BASE_URL', '/gallery/public/');
define('UPLOAD_URL', BASE_URL . 'uploads/');
