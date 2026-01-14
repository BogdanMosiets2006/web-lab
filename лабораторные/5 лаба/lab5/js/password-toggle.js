// Компонент: Показать/Скрыть пароль
// Автор: Студент
// Дата: 2025

class PasswordToggle {
    constructor() {
        this.passwordInput = document.getElementById('password');
        this.toggleBtn = document.getElementById('toggleBtn');
        this.strengthBar = document.getElementById('strengthBar');
        this.strengthText = document.getElementById('strengthText');
        this.submitBtn = document.getElementById('submitBtn');

        this.isPasswordVisible = false;

        this.init();
    }

    init() {
        this.initEventListeners();
    }

    initEventListeners() {
        // Переключение видимости пароля
        this.toggleBtn.addEventListener('click', () => this.togglePasswordVisibility());

        // Проверка силы пароля при вводе
        this.passwordInput.addEventListener('input', () => {
            this.checkPasswordStrength();
            this.checkRequirements();
        });

        // Отправка формы
        this.submitBtn.addEventListener('click', () => this.handleSubmit());

        // Копирование примеров паролей
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const password = btn.dataset.password;
                this.copyToClipboard(password);
            });
        });
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;

        if (this.isPasswordVisible) {
            this.passwordInput.type = 'text';
            this.toggleBtn.textContent = '🙈';
            this.toggleBtn.title = 'Скрыть пароль';
        } else {
            this.passwordInput.type = 'password';
            this.toggleBtn.textContent = '👁️';
            this.toggleBtn.title = 'Показать пароль';
        }
    }

    checkPasswordStrength() {
        const password = this.passwordInput.value;
        
        if (password.length === 0) {
            this.strengthBar.className = 'strength-fill';
            this.strengthText.textContent = '—';
            return;
        }

        let strength = 0;

        // Критерии проверки
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        // Определение уровня надёжности
        if (strength <= 2) {
            this.strengthBar.className = 'strength-fill strength-weak';
            this.strengthText.textContent = 'Слабый';
        } else if (strength <= 4) {
            this.strengthBar.className = 'strength-fill strength-medium';
            this.strengthText.textContent = 'Средний';
        } else {
            this.strengthBar.className = 'strength-fill strength-strong';
            this.strengthText.textContent = 'Сильный';
        }
    }

    checkRequirements() {
        const password = this.passwordInput.value;

        // Проверка каждого требования
        this.updateRequirement('req-length', password.length >= 8);
        this.updateRequirement('req-uppercase', /[A-Z]/.test(password));
        this.updateRequirement('req-lowercase', /[a-z]/.test(password));
        this.updateRequirement('req-number', /[0-9]/.test(password));
        this.updateRequirement('req-special', /[^a-zA-Z0-9]/.test(password));
    }

    updateRequirement(id, isMet) {
        const requirement = document.getElementById(id);
        const icon = requirement.querySelector('.requirement-icon');

        if (isMet) {
            requirement.classList.add('met');
            icon.textContent = '✓';
        } else {
            requirement.classList.remove('met');
            icon.textContent = '○';
        }
    }

    handleSubmit() {
        const password = this.passwordInput.value;

        if (password.length === 0) {
            alert('Пожалуйста, введите пароль');
            return;
        }

        // Проверка всех требований
        const allRequirementsMet = 
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^a-zA-Z0-9]/.test(password);

        if (!allRequirementsMet) {
            alert('Пароль не соответствует всем требованиям безопасности');
            return;
        }

        // Демонстрация успешной отправки
        this.showSuccess();
    }

    showSuccess() {
        const originalText = this.submitBtn.textContent;
        this.submitBtn.textContent = '✓ Пароль принят!';
        this.submitBtn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';

        setTimeout(() => {
            this.submitBtn.textContent = originalText;
            this.submitBtn.style.background = '';
            this.passwordInput.value = '';
            this.checkPasswordStrength();
            this.checkRequirements();
        }, 2000);
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.passwordInput.value = text;
            this.checkPasswordStrength();
            this.checkRequirements();
            
            // Показываем уведомление
            this.showNotification('Пароль скопирован и вставлен');
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            // Fallback метод
            this.passwordInput.value = text;
            this.checkPasswordStrength();
            this.checkRequirements();
            this.showNotification('Пароль вставлен');
        });
    }

    showNotification(message) {
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
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// CSS для анимации
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

// Инициализация компонента
document.addEventListener('DOMContentLoaded', () => {
    new PasswordToggle();
});
