// ===================================
// FORM VALIDATION
// ===================================

// Получаем все формы, которые требуют валидации
const forms = document.querySelectorAll('.needs-validation');

// Применяем валидацию Bootstrap к каждой форме
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            handleFormSubmit(form);
        }
        
        form.classList.add('was-validated');
    }, false);
});

// Обработчик отправки формы
function handleFormSubmit(form) {
    // Показываем сообщение об успехе
    const formType = form.classList.contains('booking-form') ? 'бронирование' : 
                     form.classList.contains('contact-form') ? 'сообщение' :
                     form.classList.contains('newsletter-form') ? 'подписка' :
                     form.classList.contains('checkout-form') ? 'заказ' : 'форма';
    
    alert(`Ваш ${formType} успешно отправлен! Мы свяжемся с вами в ближайшее время.`);
    
    // Сброс формы
    form.reset();
    form.classList.remove('was-validated');
    
    // Закрываем модальное окно, если оно открыто
    const modal = form.closest('.modal');
    if (modal) {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
            bsModal.hide();
        }
    }
}

// ===================================
// REAL-TIME VALIDATION
// ===================================

// Валидация email в реальном времени
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('input', () => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (emailPattern.test(input.value)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else if (input.value.length > 0) {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    });
});

// Валидация телефона в реальном времени
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', () => {
        const phonePattern = /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        if (phonePattern.test(input.value)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else if (input.value.length > 0) {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    });
});

// ===================================
// CART FUNCTIONALITY
// ===================================

// Управление количеством товаров в корзине
const quantityControls = document.querySelectorAll('.input-group');
quantityControls.forEach(group => {
    const decreaseBtn = group.querySelector('button:first-child');
    const increaseBtn = group.querySelector('button:last-child');
    const input = group.querySelector('input[type="number"]');
    
    if (decreaseBtn && increaseBtn && input) {
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            const min = parseInt(input.min) || 1;
            if (currentValue > min) {
                input.value = currentValue - 1;
                updateCartTotal();
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            const max = parseInt(input.max) || 10;
            if (currentValue < max) {
                input.value = currentValue + 1;
                updateCartTotal();
            }
        });
        
        input.addEventListener('change', () => {
            const min = parseInt(input.min) || 1;
            const max = parseInt(input.max) || 10;
            let value = parseInt(input.value);
            
            if (value < min) input.value = min;
            if (value > max) input.value = max;
            
            updateCartTotal();
        });
    }
});

// Удаление товара из корзины
const deleteButtons = document.querySelectorAll('.btn-outline-danger');
deleteButtons.forEach(btn => {
    if (btn.textContent.includes('🗑️')) {
        btn.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
                const card = btn.closest('.card');
                if (card) {
                    card.style.transform = 'translateX(100%)';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.remove();
                        updateCartTotal();
                    }, 300);
                }
            }
        });
    }
});

// Обновление итоговой суммы
function updateCartTotal() {
    // Эта функция должна пересчитывать общую стоимость товаров
    console.log('Корзина обновлена');
}

// ===================================
// IMAGE GALLERY
// ===================================

// Переключение главного изображения товара
const thumbnails = document.querySelectorAll('.product-image-wrapper ~ .row img');
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const mainImage = document.querySelector('.product-image-wrapper img');
        if (mainImage) {
            const tempSrc = mainImage.src;
            mainImage.src = thumb.src;
            thumb.src = tempSrc;
            
            // Анимация смены изображения
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        }
    });
});

// ===================================
// SMOOTH SCROLL
// ===================================

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#checkoutModal') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

// Фильтрация каталога (если есть поиск)
const searchInput = document.querySelector('input[type="search"]');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.product-card, .category-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const text = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || text.includes(searchTerm)) {
                card.closest('.col-lg-3, .col-md-4, .col-md-6').style.display = 'block';
            } else {
                card.closest('.col-lg-3, .col-md-4, .col-md-6').style.display = 'none';
            }
        });
    });
}

// ===================================
// DATE PICKER RESTRICTIONS
// ===================================

// Ограничение выбора даты (только будущие даты)
const dateInputs = document.querySelectorAll('input[type="date"]');
dateInputs.forEach(input => {
    if (!input.min) {
        const today = new Date().toISOString().split('T')[0];
        input.min = today;
    }
});

// ===================================
// PROMO CODE
// ===================================

// Обработка промокода
const promoButton = document.querySelector('.input-group button');
if (promoButton && promoButton.textContent.includes('Применить')) {
    promoButton.addEventListener('click', () => {
        const promoInput = document.querySelector('.input-group input[type="text"]');
        const promoCode = promoInput?.value.trim().toUpperCase();
        
        const validPromoCodes = {
            'WELCOME10': 10,
            'SUMMER20': 20,
            'SALE15': 15
        };
        
        if (promoCode && validPromoCodes[promoCode]) {
            const discount = validPromoCodes[promoCode];
            alert(`Промокод применен! Скидка ${discount}%`);
            promoInput.value = '';
            promoInput.disabled = true;
            promoButton.disabled = true;
            promoButton.textContent = 'Применено';
            updateCartTotal();
        } else if (promoCode) {
            alert('Неверный промокод. Попробуйте другой.');
        } else {
            alert('Введите промокод');
        }
    });
}

// ===================================
// ANIMATION ON SCROLL
// ===================================

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за карточками
document.querySelectorAll('.product-card, .category-card, .team-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===================================
// LOCAL STORAGE
// ===================================

// Сохранение данных формы в localStorage
const saveFormData = (formId) => {
    const form = document.querySelector(`#${formId}`);
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type !== 'password' && input.type !== 'checkbox') {
                input.addEventListener('blur', () => {
                    localStorage.setItem(`${formId}_${input.id}`, input.value);
                });
                
                // Восстановление данных
                const savedValue = localStorage.getItem(`${formId}_${input.id}`);
                if (savedValue) {
                    input.value = savedValue;
                }
            }
        });
    }
};

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

// Изменение навбара при прокрутке
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// RATING STARS
// ===================================

// Интерактивные звезды рейтинга (если есть)
const starRatings = document.querySelectorAll('.rating-stars');
starRatings.forEach(container => {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
});

// ===================================
// TOOLTIP INITIALIZATION
// ===================================

// Инициализация всех тултипов Bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
    new bootstrap.Tooltip(tooltipTriggerEl)
);

// ===================================
// CONSOLE INFO
// ===================================

console.log('%c🎉 FunZone - Магазин развлечений', 
    'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c✅ Все скрипты загружены успешно', 
    'font-size: 14px; color: #198754;');
console.log('%c📱 Адаптивная верстка активна', 
    'font-size: 14px; color: #0d6efd;');

// ===================================
// INITIALIZE ON DOM LOADED
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM полностью загружен');
    
    // Инициализация всех компонентов
    updateCartTotal();
    
    // Показываем приветственное сообщение (опционально)
    // setTimeout(() => {
    //     alert('Добро пожаловать в FunZone! 🎉');
    // }, 1000);
});