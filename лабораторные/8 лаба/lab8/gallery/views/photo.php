<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($photo['title']) ?> - Фото Галерея</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>📸 Фото Галерея</h1>
            <nav>
                <a href="index.php" class="btn btn-primary">← Назад к галерее</a>
                <a href="upload.php" class="btn btn-success">Загрузить фото</a>
            </nav>
        </header>
        
        <main>
            <div class="photo-view">
                <div class="photo-container">
                    <img src="uploads/original/<?= htmlspecialchars($photo['filename']) ?>" 
                         alt="<?= htmlspecialchars($photo['title']) ?>"
                         class="photo-full">
                </div>
                
                <div class="photo-info">
                    <h2><?= htmlspecialchars($photo['title']) ?></h2>
                    
                    <?php if (!empty($photo['description'])): ?>
                        <p class="description"><?= nl2br(htmlspecialchars($photo['description'])) ?></p>
                    <?php endif; ?>
                    
                    <div class="photo-meta">
                        <div class="meta-item">
                            <span class="meta-label">👁 Просмотров:</span>
                            <span class="meta-value"><?= $photo['views'] ?></span>
                        </div>
                        
                        <div class="meta-item">
                            <span class="meta-label">👤 Автор:</span>
                            <span class="meta-value"><?= htmlspecialchars($photo['username']) ?></span>
                        </div>
                        
                        <div class="meta-item">
                            <span class="meta-label">📧 Email:</span>
                            <span class="meta-value"><?= htmlspecialchars($photo['email']) ?></span>
                        </div>
                        
                        <div class="meta-item">
                            <span class="meta-label">📅 Дата загрузки:</span>
                            <span class="meta-value"><?= date('d.m.Y H:i', strtotime($photo['created_at'])) ?></span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        
        <footer class="footer">
            <p>&copy; 2025 Фото Галерея | Лабораторная работа №8</p>
        </footer>
    </div>
    
    <script src="js/main.js"></script>
</body>
</html>
