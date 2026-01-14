/**
 * Главный JavaScript файл галереи
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Предпросмотр изображения перед загрузкой
    const photoInput = document.getElementById('photo');
    const imagePreview = document.getElementById('imagePreview');
    
    if (photoInput && imagePreview) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Проверка размера файла (5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Размер файла не должен превышать 5MB');
                    photoInput.value = '';
                    imagePreview.innerHTML = '';
                    return;
                }
                
                // Проверка типа файла
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Допустимые форматы: JPEG, PNG, GIF');
                    photoInput.value = '';
                    imagePreview.innerHTML = '';
                    return;
                }
                
                // Создание превью
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            } else {
                imagePreview.innerHTML = '';
            }
        });
    }
    
    // Валидация формы перед отправкой
    const uploadForm = document.getElementById('uploadForm');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const title = document.getElementById('title').value.trim();
            const photo = document.getElementById('photo').files[0];
            
            let errors = [];
            
            if (!username) {
                errors.push('Введите имя пользователя');
            }
            
            if (!email) {
                errors.push('Введите email');
            } else if (!isValidEmail(email)) {
                errors.push('Введите корректный email');
            }
            
            if (!title) {
                errors.push('Введите название фотографии');
            }
            
            if (!photo) {
                errors.push('Выберите файл для загрузки');
            }
            
            if (errors.length > 0) {
                e.preventDefault();
                alert('Ошибки:\n- ' + errors.join('\n- '));
                return false;
            }
        });
    }
    
    // Автоматическое скрытие уведомлений
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.5s ease';
            setTimeout(function() {
                alert.remove();
            }, 500);
        }, 5000);
    });
    
    // Анимация появления элементов галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(function(item, index) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(function() {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});

/**
 * Проверка корректности email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Форматирование числа просмотров
 */
function formatViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}
