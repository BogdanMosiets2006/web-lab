<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Фото Галерея</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>📸 Фото Галерея</h1>
            <nav>
                <a href="index.php" class="btn btn-primary">Галерея</a>
                <a href="upload.php" class="btn btn-success">Загрузить фото</a>
            </nav>
        </header>
        
        <main>
            <?php if (empty($photos)): ?>
                <div class="empty-state">
                    <p>В галерее пока нет фотографий</p>
                    <a href="upload.php" class="btn btn-success">Загрузить первое фото</a>
                </div>
            <?php else: ?>
                <div class="gallery-grid">
                    <?php foreach ($photos as $photo): ?>
                        <div class="gallery-item">
                            <a href="photo.php?id=<?= $photo['id'] ?>">
                                <img src="uploads/thumbnails/<?= htmlspecialchars($photo['thumbnail']) ?>" 
                                     alt="<?= htmlspecialchars($photo['title']) ?>">
                                <div class="gallery-item-overlay">
                                    <h3><?= htmlspecialchars($photo['title']) ?></h3>
                                    <p class="views">👁 <?= $photo['views'] ?> просмотров</p>
                                    <p class="author">Автор: <?= htmlspecialchars($photo['username']) ?></p>
                                </div>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </main>
        
        <footer class="footer">
            <p>&copy; 2025 Фото Галерея | Лабораторная работа №8</p>
        </footer>
    </div>
    
    <script src="js/main.js"></script>
</body>
</html>
