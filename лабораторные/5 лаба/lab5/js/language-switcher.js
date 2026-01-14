// Компонент: Переключатель языка интерфейса
// Автор: Студент
// Дата: 2025

class LanguageSwitcher {
    constructor() {
        this.currentLang = 'ru';
        
        // Словарь переводов
        this.translations = {
            ru: {
                pageTitle: 'Переключатель языка',
                pageSubtitle: 'Мультиязычный интерфейс',
                welcomeTitle: 'Добро пожаловать!',
                welcomeText: 'Это демонстрация компонента переключения языка. Выберите язык выше, чтобы увидеть, как меняется содержимое страницы.',
                feature1: 'Многоязычность',
                feature2: 'Быстрое переключение',
                feature3: 'Сохранение выбора'
            },
            en: {
                pageTitle: 'Language Switcher',
                pageSubtitle: 'Multilingual Interface',
                welcomeTitle: 'Welcome!',
                welcomeText: 'This is a demonstration of the language switching component. Select a language above to see how the page content changes.',
                feature1: 'Multilingual',
                feature2: 'Quick Switching',
                feature3: 'Save Choice'
            },
            es: {
                pageTitle: 'Selector de Idioma',
                pageSubtitle: 'Interfaz Multilingüe',
                welcomeTitle: '¡Bienvenido!',
                welcomeText: 'Esta es una demostración del componente de cambio de idioma. Seleccione un idioma arriba para ver cómo cambia el contenido de la página.',
                feature1: 'Multilingüe',
                feature2: 'Cambio Rápido',
                feature3: 'Guardar Elección'
            },
            de: {
                pageTitle: 'Sprachwechsler',
                pageSubtitle: 'Mehrsprachige Oberfläche',
                welcomeTitle: 'Willkommen!',
                welcomeText: 'Dies ist eine Demonstration der Sprachwechsel-Komponente. Wählen Sie oben eine Sprache aus, um zu sehen, wie sich der Seiteninhalt ändert.',
                feature1: 'Mehrsprachig',
                feature2: 'Schneller Wechsel',
                feature3: 'Auswahl Speichern'
            }
        };

        this.init();
    }

    init() {
        this.loadSavedLanguage();
        this.initEventListeners();
        this.updateContent();
    }

    initEventListeners() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.updateContent();
            this.updateActiveButton();
            this.saveLanguage();
            this.showNotification(lang);
        }
    }

    updateContent() {
        const translation = this.translations[this.currentLang];
        
        // Обновление всех текстовых элементов
        Object.keys(translation).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = translation[key];
            }
        });

        // Обновление атрибута lang в HTML
        document.documentElement.lang = this.currentLang;
    }

    updateActiveButton() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            if (button.dataset.lang === this.currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    saveLanguage() {
        localStorage.setItem('selectedLanguage', this.currentLang);
    }

    loadSavedLanguage() {
        const saved = localStorage.getItem('selectedLanguage');
        if (saved && this.translations[saved]) {
            this.currentLang = saved;
        }
    }

    showNotification(lang) {
        const langNames = {
            ru: 'Русский',
            en: 'English',
            es: 'Español',
            de: 'Deutsch'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = `${langNames[lang]} ✓`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// CSS для анимации уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация переключателя языка
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
