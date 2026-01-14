<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Загрузить фото - Фото Галерея</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>📸 Фото Галерея</h1>
            <nav>
                <a href="index.php" class="btn btn-primary">← Назад к галерее</a>
            </nav>
        </header>
        
        <main>
            <div class="upload-container">
                <h2>Загрузить новое фото</h2>
                
                <?php if (isset($_SESSION['errors'])): ?>
                    <div class="alert alert-error">
                        <ul>
                            <?php foreach ($_SESSION['errors'] as $error): ?>
                                <li><?= htmlspecialchars($error) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <?php unset($_SESSION['errors']); ?>
                <?php endif; ?>
                
                <?php if (isset($_SESSION['success'])): ?>
                    <div class="alert alert-success">
                        <?= htmlspecialchars($_SESSION['success']) ?>
                    </div>
                    <?php unset($_SESSION['success']); ?>
                <?php endif; ?>
                
                <form action="upload.php" method="POST" enctype="multipart/form-data" class="upload-form" id="uploadForm">
                    <div class="form-group">
                        <label for="username">Ваше имя *</label>
                        <input type="text" id="username" name="username" required 
                               value="<?= isset($_POST['username']) ? htmlspecialchars($_POST['username']) : '' ?>">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required
                               value="<?= isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '' ?>">
                    </div>
                    
                    <div class="form-group">
                        <label for="title">Название фото *</label>
                        <input type="text" id="title" name="title" required
                               value="<?= isset($_POST['title']) ? htmlspecialchars($_POST['title']) : '' ?>">
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Описание</label>
                        <textarea id="description" name="description" rows="4"><?= isset($_POST['description']) ? htmlspecialchars($_POST['description']) : '' ?></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="photo">Выберите фото * (JPG, PNG, GIF, до 5MB)</label>
                        <input type="file" id="photo" name="photo" accept="image/jpeg,image/png,image/gif" required>
                        <div id="imagePreview" class="image-preview"></div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-success">📤 Загрузить фото</button>
                        <a href="index.php" class="btn btn-secondary">Отмена</a>
                    </div>
                </form>
            </div>
        </main>
        
        <footer class="footer">
            <p>&copy; 2025 Фото Галерея | Лабораторная работа №8</p>
        </footer>
    </div>
    
    <script src="js/main.js"></script>
</body>
</html>
