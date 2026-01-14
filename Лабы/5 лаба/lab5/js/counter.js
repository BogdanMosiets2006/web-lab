// Компонент: Счётчик кликов
// Автор: Студент
// Дата: 2025

class Counter {
    constructor() {
        // Инициализация переменных
        this.count = 0;
        this.totalClicks = 0;
        this.increments = 0;
        this.decrements = 0;

        // Получение элементов DOM
        this.counterValue = document.getElementById('counterValue');
        this.totalClicksEl = document.getElementById('totalClicks');
        this.incrementsEl = document.getElementById('increments');
        this.decrementsEl = document.getElementById('decrements');

        // Привязка обработчиков событий
        this.initEventListeners();
        
        // Загрузка сохранённых данных
        this.loadFromStorage();
    }

    initEventListeners() {
        document.getElementById('incrementBtn').addEventListener('click', () => this.increment());
        document.getElementById('decrementBtn').addEventListener('click', () => this.decrement());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }

    increment() {
        this.count++;
        this.totalClicks++;
        this.increments++;
        this.updateDisplay();
        this.saveToStorage();
        this.animate();
    }

    decrement() {
        this.count--;
        this.totalClicks++;
        this.decrements++;
        this.updateDisplay();
        this.saveToStorage();
        this.animate();
    }

    reset() {
        if (confirm('Вы уверены, что хотите сбросить счётчик?')) {
            this.count = 0;
            this.totalClicks = 0;
            this.increments = 0;
            this.decrements = 0;
            this.updateDisplay();
            this.saveToStorage();
        }
    }

    updateDisplay() {
        this.counterValue.textContent = this.count;
        this.totalClicksEl.textContent = this.totalClicks;
        this.incrementsEl.textContent = this.increments;
        this.decrementsEl.textContent = this.decrements;
    }

    animate() {
        this.counterValue.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.counterValue.style.transform = 'scale(1)';
        }, 200);
    }

    saveToStorage() {
        const data = {
            count: this.count,
            totalClicks: this.totalClicks,
            increments: this.increments,
            decrements: this.decrements
        };
        localStorage.setItem('counterData', JSON.stringify(data));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('counterData');
        if (saved) {
            const data = JSON.parse(saved);
            this.count = data.count || 0;
            this.totalClicks = data.totalClicks || 0;
            this.increments = data.increments || 0;
            this.decrements = data.decrements || 0;
            this.updateDisplay();
        }
    }
}

// Инициализация счётчика при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Counter();
});
