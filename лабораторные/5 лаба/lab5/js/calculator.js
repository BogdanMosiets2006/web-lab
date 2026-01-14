// Компонент: Калькулятор
// Автор: Студент
// Дата: 2025

class Calculator {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.historyElement = document.getElementById('history');
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;

        this.initEventListeners();
    }

    initEventListeners() {
        const buttons = document.querySelectorAll('.calc-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                const value = button.dataset.value;

                switch(action) {
                    case 'number':
                        this.inputNumber(value);
                        break;
                    case 'operator':
                        this.inputOperator(value);
                        break;
                    case 'decimal':
                        this.inputDecimal();
                        break;
                    case 'equals':
                        this.calculate();
                        break;
                    case 'clear':
                        this.clear();
                        break;
                    case 'backspace':
                        this.backspace();
                        break;
                }
            });
        });

        // Поддержка клавиатуры
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    inputNumber(num) {
        if (this.shouldResetDisplay) {
            this.currentValue = num;
            this.shouldResetDisplay = false;
        } else {
            this.currentValue = this.currentValue === '0' ? num : this.currentValue + num;
        }
        this.updateDisplay();
    }

    inputOperator(op) {
        if (this.operation !== null && !this.shouldResetDisplay) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operation = op;
        this.shouldResetDisplay = true;
        this.updateHistory();
    }

    inputDecimal() {
        if (this.shouldResetDisplay) {
            this.currentValue = '0.';
            this.shouldResetDisplay = false;
        } else if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
        this.updateDisplay();
    }

    calculate() {
        if (this.operation === null || this.shouldResetDisplay) return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;

        switch(this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 'Ошибка';
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
        this.updateHistory();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
        this.updateHistory();
    }

    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayElement.textContent = this.currentValue;
    }

    updateHistory() {
        if (this.operation && this.previousValue) {
            const operatorSymbol = {
                '+': '+',
                '-': '-',
                '*': '×',
                '/': '÷',
                '%': '%'
            };
            this.historyElement.textContent = `${this.previousValue} ${operatorSymbol[this.operation]}`;
        } else {
            this.historyElement.textContent = '';
        }
    }

    handleKeyboard(e) {
        if (e.key >= '0' && e.key <= '9') {
            this.inputNumber(e.key);
        } else if (e.key === '.') {
            this.inputDecimal();
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            this.inputOperator(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.calculate();
        } else if (e.key === 'Escape' || e.key === 'c') {
            this.clear();
        } else if (e.key === 'Backspace') {
            this.backspace();
        }
    }
}

// Инициализация калькулятора
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
