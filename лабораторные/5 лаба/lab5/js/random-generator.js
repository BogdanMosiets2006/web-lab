// Компонент: Генератор случайных чисел
// Автор: Студент
// Дата: 2025

class RandomGenerator {
    constructor() {
        this.minInput = document.getElementById('minValue');
        this.maxInput = document.getElementById('maxValue');
        this.countInput = document.getElementById('count');
        this.generateBtn = document.getElementById('generateBtn');
        this.resultElement = document.getElementById('result');
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');

        this.history = [];

        this.init();
    }

    init() {
        this.loadHistory();
        this.initEventListeners();
    }

    initEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generate());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Генерация по нажатию Enter
        [this.minInput, this.maxInput, this.countInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.generate();
            });
        });

        // Валидация при вводе
        this.minInput.addEventListener('input', () => this.validateInputs());
        this.maxInput.addEventListener('input', () => this.validateInputs());
        this.countInput.addEventListener('input', () => this.validateCount());
    }

    validateInputs() {
        const min = parseInt(this.minInput.value);
        const max = parseInt(this.maxInput.value);

        if (min >= max) {
            this.maxInput.value = min + 1;
        }
    }

    validateCount() {
        const count = parseInt(this.countInput.value);
        if (count < 1) {
            this.countInput.value = 1;
        } else if (count > 20) {
            this.countInput.value = 20;
        }
    }

    generate() {
        const min = parseInt(this.minInput.value);
        const max = parseInt(this.maxInput.value);
        const count = parseInt(this.countInput.value);

        if (isNaN(min) || isNaN(max) || isNaN(count)) {
            this.showError('Пожалуйста, введите корректные числа');
            return;
        }

        if (min >= max) {
            this.showError('Минимум должен быть меньше максимума');
            return;
        }

        const results = [];
        for (let i = 0; i < count; i++) {
            const randomNum = this.getRandomInt(min, max);
            results.push(randomNum);
        }

        this.displayResult(results);
        this.addToHistory(results);
        this.animateResult();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    displayResult(results) {
        if (results.length === 1) {
            this.resultElement.textContent = results[0];
        } else {
            this.resultElement.textContent = results.join(', ');
            this.resultElement.style.fontSize = '2rem';
            setTimeout(() => {
                this.resultElement.style.fontSize = '4rem';
            }, 100);
        }
    }

    animateResult() {
        this.resultElement.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => {
            this.resultElement.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }

    addToHistory(results) {
        const timestamp = new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        
        const entry = {
            numbers: results,
            time: timestamp
        };

        this.history.unshift(entry);
        
        // Ограничиваем историю 20 записями
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }

        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<div class="empty-history">История пуста</div>';
            return;
        }

        this.historyList.innerHTML = '';
        this.history.forEach((entry, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.textContent = entry.numbers.join(', ');
            item.title = `Сгенерировано в ${entry.time}`;
            item.style.animationDelay = `${index * 0.05}s`;
            this.historyList.appendChild(item);
        });
    }

    clearHistory() {
        if (this.history.length === 0) return;
        
        if (confirm('Очистить всю историю?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    }

    saveHistory() {
        localStorage.setItem('randomGeneratorHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('randomGeneratorHistory');
        if (saved) {
            this.history = JSON.parse(saved);
            this.renderHistory();
        }
    }

    showError(message) {
        const originalText = this.resultElement.textContent;
        this.resultElement.textContent = '⚠️';
        this.resultElement.style.color = '#e74c3c';
        
        alert(message);
        
        setTimeout(() => {
            this.resultElement.textContent = originalText;
            this.resultElement.style.color = '';
        }, 1000);
    }
}

// Добавляем CSS для анимации
const style = document.createElement('style');
style.textContent = `
    .history-item {
        animation: fadeInUp 0.3s ease forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .result-number {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Инициализация генератора
document.addEventListener('DOMContentLoaded', () => {
    new RandomGenerator();
});
