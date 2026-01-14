// ===============================================
// JAVASCRIPT ДЛЯ САЙТА ШАХТЁРСК
// Лабораторная работа №1
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === КНОПКА "НАВЕРХ" ===
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // === ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
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
    
    // === ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ ПРИ КЛИКЕ НА ССЫЛКУ ===
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    });
    
    // === АНИМАЦИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Применяем анимацию к карточкам
    const animatedElements = document.querySelectorAll(
        '.news-card, .district-card, .person-card, .project-card, .activity-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // === ВАЛИДАЦИЯ ФОРМЫ ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        // Валидация в реальном времени
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Отправка формы
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Имитация отправки
                const formStatus = document.getElementById('formStatus');
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
                
                setTimeout(() => {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить сообщение';
                    
                    // Очистка ошибок
                    formInputs.forEach(input => {
                        input.classList.remove('error');
                        const errorSpan = document.getElementById(input.id + 'Error');
                        if (errorSpan) {
                            errorSpan.textContent = '';
                        }
                    });
                    
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.textContent = '';
                    }, 5000);
                }, 1500);
            } else {
                const formStatus = document.getElementById('formStatus');
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Пожалуйста, исправьте ошибки в форме.';
                
                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.textContent = '';
                }, 3000);
            }
        });
    }
    
    // === ФУНКЦИЯ ВАЛИДАЦИИ ПОЛЯ ===
    function validateField(field) {
        const errorSpan = document.getElementById(field.id + 'Error');
        let errorMessage = '';
        
        // Проверка обязательных полей
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorMessage = 'Это поле обязательно для заполнения';
        }
        // Проверка email
        else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errorMessage = 'Введите корректный email адрес';
            }
        }
        // Проверка телефона
        else if (field.type === 'tel' && field.value) {
            const phoneRegex = /[\+]?[0-9\s\-\(\)]{10,}/;
            if (!phoneRegex.test(field.value)) {
                errorMessage = 'Введите корректный номер телефона';
            }
        }
        // Проверка минимальной длины
        else if (field.minLength && field.value.length > 0 && field.value.length < field.minLength) {
            errorMessage = `Минимальная длина: ${field.minLength} символов`;
        }
        // Проверка максимальной длины
        else if (field.maxLength && field.value.length > field.maxLength) {
            errorMessage = `Максимальная длина: ${field.maxLength} символов`;
        }
        // Проверка pattern
        else if (field.pattern && field.value) {
            const regex = new RegExp(field.pattern);
            if (!regex.test(field.value)) {
                if (field.type === 'text') {
                    errorMessage = 'Используйте только буквы, пробелы и дефисы';
                } else {
                    errorMessage = 'Неверный формат';
                }
            }
        }
        // Проверка checkbox соглашения
        else if (field.type === 'checkbox' && field.id === 'agreement' && !field.checked) {
            errorMessage = 'Необходимо согласие с политикой конфиденциальности';
        }
        
        // Отображение ошибки
        if (errorMessage) {
            field.classList.add('error');
            if (errorSpan) {
                errorSpan.textContent = errorMessage;
                errorSpan.style.display = 'block';
            }
            return false;
        } else {
            field.classList.remove('error');
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }
            return true;
        }
    }
    
    // === СЧЁТЧИК СИМВОЛОВ ДЛЯ TEXTAREA ===
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const helpText = document.getElementById('messageHelp');
        
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.maxLength;
            helpText.textContent = `${currentLength}/${maxLength} символов`;
            
            if (currentLength > maxLength * 0.9) {
                helpText.style.color = 'var(--color-secondary)';
            } else {
                helpText.style.color = 'var(--color-gray)';
            }
        });
    }
    
    // === АНИМАЦИЯ ПРОГРЕСС-БАРОВ НАВЫКОВ ===
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.style.getPropertyValue('--progress');
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            bar.style.width = '0';
            skillObserver.observe(bar);
        });
    }
    
    // === ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ ===
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает нативную ленивую загрузку
        lazyImages.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback для старых браузеров
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // === АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ ===
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // === ТАБЛИЦА: ПОДСВЕТКА СТРОКИ ПРИ НАВЕДЕНИИ ===
    const tableRows = document.querySelectorAll('.history-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(231, 126, 34, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // === ОТКРЫТИЕ/ЗАКРЫТИЕ DETAILS ===
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                // Закрываем другие details в той же группе
                const parent = this.parentElement;
                const siblings = parent.querySelectorAll('details');
                siblings.forEach(sibling => {
                    if (sibling !== this && sibling.open) {
                        sibling.open = false;
                    }
                });
            }
        });
    });
    
    // === ПОКАЗ ТЕКУЩЕГО ГОДА В ФУТЕРЕ ===
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // === ПЕЧАТЬ СТРАНИЦЫ ===
    const printButtons = document.querySelectorAll('[data-print]');
    
    printButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.print();
        });
    });
    
    // === КОПИРОВАНИЕ ТЕКСТА В БУФЕР ===
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Показываем уведомление
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // === ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (ОПЦИОНАЛЬНО) ===
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // === ПРЕДЗАГРУЗКА СТРАНИЦ ПРИ НАВЕДЕНИИ ===
    const prefetchLinks = document.querySelectorAll('a[href$=".html"]');
    
    prefetchLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        });
    });
    
    // === ЗАЩИТА ОТ СПАМА В ФОРМЕ ===
    if (contactForm) {
        let submitCount = 0;
        const maxSubmits = 3;
        const timeWindow = 60000; // 1 минута
        
        contactForm.addEventListener('submit', function(e) {
            submitCount++;
            
            if (submitCount > maxSubmits) {
                e.preventDefault();
                alert('Слишком много попыток отправки. Пожалуйста, подождите минуту.');
                return false;
            }
            
            setTimeout(() => {
                submitCount = Math.max(0, submitCount - 1);
            }, timeWindow);
        });
    }
    
    // === КОНСОЛЬНОЕ СООБЩЕНИЕ ===
    console.log('%c🏔️ Сайт Шахтёрск', 'font-size: 20px; color: #e67e22; font-weight: bold;');
    console.log('%cЛабораторная работа №1 по веб-программированию', 'font-size: 14px; color: #2c3e50;');
    console.log('%cРазработано с использованием HTML5, CSS3 и JavaScript', 'font-size: 12px; color: #7f8c8d;');
    
});

// === ОБРАБОТКА ОШИБОК ===
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице:', e.message);
});

// === ПРОИЗВОДИТЕЛЬНОСТЬ ===
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Время загрузки страницы:', Math.round(perfData.loadEventEnd), 'мс');
            }
        }, 0);
    });
}