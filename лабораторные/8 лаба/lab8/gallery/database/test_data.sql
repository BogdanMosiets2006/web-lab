-- Тестовые данные для галереи
USE photo_gallery;

-- Добавление тестовых пользователей
INSERT INTO users (username, email, created_at) VALUES
('Иван Иванов', 'ivan@example.com', '2025-01-01 10:00:00'),
('Мария Петрова', 'maria@example.com', '2025-01-02 11:30:00'),
('Алексей Сидоров', 'alexey@example.com', '2025-01-03 14:15:00'),
('Елена Смирнова', 'elena@example.com', '2025-01-04 16:45:00'),
('Дмитрий Козлов', 'dmitry@example.com', '2025-01-05 09:20:00');

-- Примечание: фотографии нужно будет загрузить через интерфейс,
-- так как требуется создание файлов на сервере.
-- Ниже приведены примеры INSERT для справки:

-- INSERT INTO photos (user_id, title, description, filename, thumbnail, views, created_at) VALUES
-- (1, 'Закат на море', 'Красивый закат в Сочи', 'sunset_001.jpg', 'sunset_001.jpg', 45, '2025-01-06 18:00:00'),
-- (2, 'Горный пейзаж', 'Вид на Эльбрус', 'mountain_001.jpg', 'mountain_001.jpg', 67, '2025-01-07 12:30:00'),
-- (3, 'Городская архитектура', 'Современное здание в центре города', 'city_001.jpg', 'city_001.jpg', 23, '2025-01-08 15:00:00'),
-- (4, 'Лесная тропинка', 'Осенний лес', 'forest_001.jpg', 'forest_001.jpg', 89, '2025-01-09 10:45:00'),
-- (5, 'Ночное небо', 'Млечный путь над озером', 'night_001.jpg', 'night_001.jpg', 120, '2025-01-10 21:00:00');

-- Проверка данных
SELECT 'Пользователи:' as info;
SELECT * FROM users;

SELECT 'Фотографии:' as info;
SELECT p.id, p.title, u.username, p.views, p.created_at 
FROM photos p 
JOIN users u ON p.user_id = u.id 
ORDER BY p.views DESC;
