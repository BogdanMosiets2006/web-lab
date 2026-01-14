<?php
/**
 * Контроллер галереи
 */
class GalleryController {
    private $photoModel;
    private $userModel;
    
    public function __construct() {
        $this->photoModel = new Photo();
        $this->userModel = new User();
    }
    
    /**
     * Отображение главной страницы с галереей
     */
    public function index() {
        $photos = $this->photoModel->getAllByPopularity();
        require_once BASE_PATH . '/views/index.php';
    }
    
    /**
     * Отображение конкретной фотографии
     */
    public function show($id) {
        $photo = $this->photoModel->getById($id);
        
        if (!$photo) {
            header("Location: index.php");
            exit();
        }
        
        // Увеличиваем счетчик просмотров
        $this->photoModel->incrementViews($id);
        
        // Обновляем данные фото для отображения актуального числа просмотров
        $photo['views']++;
        
        require_once BASE_PATH . '/views/photo.php';
    }
    
    /**
     * Отображение формы загрузки
     */
    public function upload() {
        require_once BASE_PATH . '/views/upload.php';
    }
    
    /**
     * Обработка загрузки фотографии
     */
    public function handleUpload() {
        $errors = [];
        
        // Валидация данных пользователя
        if (empty($_POST['username'])) {
            $errors[] = "Имя пользователя обязательно";
        }
        
        if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Корректный email обязателен";
        }
        
        if (empty($_POST['title'])) {
            $errors[] = "Название фотографии обязательно";
        }
        
        // Валидация файла
        if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
            $errors[] = "Ошибка загрузки файла";
        } else {
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            $fileType = $_FILES['photo']['type'];
            
            if (!in_array($fileType, $allowedTypes)) {
                $errors[] = "Допустимые форматы: JPEG, PNG, GIF";
            }
            
            if ($_FILES['photo']['size'] > 5 * 1024 * 1024) {
                $errors[] = "Максимальный размер файла: 5MB";
            }
        }
        
        if (!empty($errors)) {
            $_SESSION['errors'] = $errors;
            header("Location: upload.php");
            exit();
        }
        
        try {
            // Получаем или создаем пользователя
            $user = $this->userModel->getByEmail($_POST['email']);
            if (!$user) {
                $userId = $this->userModel->create($_POST['username'], $_POST['email']);
            } else {
                $userId = $user['id'];
            }
            
            // Обработка файла
            $extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
            $filename = uniqid() . '_' . time() . '.' . $extension;
            
            $originalPath = ORIGINAL_PATH . $filename;
            $thumbnailPath = THUMBNAIL_PATH . $filename;
            
            // Сохранение оригинала
            move_uploaded_file($_FILES['photo']['tmp_name'], $originalPath);
            
            // Создание миниатюры
            $this->createThumbnail($originalPath, $thumbnailPath, 300, 300);
            
            // Сохранение в БД
            $photoId = $this->photoModel->create(
                $userId,
                $_POST['title'],
                $_POST['description'] ?? '',
                $filename,
                $filename
            );
            
            $_SESSION['success'] = "Фотография успешно загружена!";
            header("Location: photo.php?id=" . $photoId);
            exit();
            
        } catch (Exception $e) {
            $_SESSION['errors'] = ["Ошибка при сохранении: " . $e->getMessage()];
            header("Location: upload.php");
            exit();
        }
    }
    
    /**
     * Создание миниатюры изображения
     */
    private function createThumbnail($source, $destination, $maxWidth, $maxHeight) {
        if (!file_exists($source)) {
            throw new Exception("Исходный файл не найден");
        }
        
        $imageInfo = @getimagesize($source);
        if ($imageInfo === false) {
            throw new Exception("Не удалось получить информацию об изображении");
        }
        
        list($width, $height, $type) = $imageInfo;
        
        // Вычисляем новые размеры с сохранением пропорций
        $ratio = min($maxWidth / $width, $maxHeight / $height);
        $newWidth = (int)round($width * $ratio);
        $newHeight = (int)round($height * $ratio);
        
        // Создаем исходное изображение
        $srcImage = null;
        switch ($type) {
            case IMAGETYPE_JPEG:
                $srcImage = @imagecreatefromjpeg($source);
                break;
            case IMAGETYPE_PNG:
                $srcImage = @imagecreatefrompng($source);
                break;
            case IMAGETYPE_GIF:
                $srcImage = @imagecreatefromgif($source);
                break;
            default:
                throw new Exception("Неподдерживаемый тип изображения");
        }
        
        if ($srcImage === false) {
            throw new Exception("Не удалось создать изображение из файла");
        }
        
        // Создаем новое изображение
        $dstImage = imagecreatetruecolor($newWidth, $newHeight);
        if ($dstImage === false) {
            imagedestroy($srcImage);
            throw new Exception("Не удалось создать новое изображение");
        }
        
        // Для PNG и GIF сохраняем прозрачность
        if ($type == IMAGETYPE_PNG || $type == IMAGETYPE_GIF) {
            imagealphablending($dstImage, false);
            imagesavealpha($dstImage, true);
            $transparent = imagecolorallocatealpha($dstImage, 0, 0, 0, 127);
            imagefill($dstImage, 0, 0, $transparent);
        }
        
        // Изменяем размер
        $result = imagecopyresampled($dstImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        if ($result === false) {
            imagedestroy($srcImage);
            imagedestroy($dstImage);
            throw new Exception("Не удалось изменить размер изображения");
        }
        
        // Сохраняем миниатюру
        $saved = false;
        switch ($type) {
            case IMAGETYPE_JPEG:
                $saved = imagejpeg($dstImage, $destination, 85);
                break;
            case IMAGETYPE_PNG:
                $saved = imagepng($dstImage, $destination, 8);
                break;
            case IMAGETYPE_GIF:
                $saved = imagegif($dstImage, $destination);
                break;
        }
        
        // Освобождаем память
        imagedestroy($srcImage);
        imagedestroy($dstImage);
        
        if ($saved === false) {
            throw new Exception("Не удалось сохранить миниатюру");
        }
    }
}
