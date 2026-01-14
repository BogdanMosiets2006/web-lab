// Компонент: Фильтрация элементов по категории
// Автор: Студент
// Дата: 2025

class ItemFilter {
    constructor() {
        // Данные для демонстрации
        this.items = [
            { id: 1, name: 'Яблоко', category: 'фрукты', icon: '🍎', description: 'Сочное красное яблоко' },
            { id: 2, name: 'Банан', category: 'фрукты', icon: '🍌', description: 'Спелый тропический фрукт' },
            { id: 3, name: 'Апельсин', category: 'фрукты', icon: '🍊', description: 'Цитрусовый фрукт, богатый витамином C' },
            { id: 4, name: 'Виноград', category: 'фрукты', icon: '🍇', description: 'Сладкие ягоды винограда' },
            { id: 5, name: 'Морковь', category: 'овощи', icon: '🥕', description: 'Оранжевый корнеплод' },
            { id: 6, name: 'Помидор', category: 'овощи', icon: '🍅', description: 'Красный сочный томат' },
            { id: 7, name: 'Огурец', category: 'овощи', icon: '🥒', description: 'Свежий зелёный огурец' },
            { id: 8, name: 'Брокколи', category: 'овощи', icon: '🥦', description: 'Полезный зелёный овощ' },
            { id: 9, name: 'Кофе', category: 'напитки', icon: '☕', description: 'Ароматный горячий кофе' },
            { id: 10, name: 'Чай', category: 'напитки', icon: '🍵', description: 'Зелёный чай' },
            { id: 11, name: 'Сок', category: 'напитки', icon: '🧃', description: 'Свежевыжатый апельсиновый сок' },
            { id: 12, name: 'Лимонад', category: 'напитки', icon: '🥤', description: 'Освежающий лимонад' },
            { id: 13, name: 'Торт', category: 'десерты', icon: '🍰', description: 'Праздничный торт' },
            { id: 14, name: 'Мороженое', category: 'десерты', icon: '🍦', description: 'Холодное мороженое' },
            { id: 15, name: 'Пончик', category: 'десерты', icon: '🍩', description: 'Глазированный пончик' },
            { id: 16, name: 'Печенье', category: 'десерты', icon: '🍪', description: 'Хрустящее печенье' }
        ];

        this.currentCategory = 'все';
        this.searchQuery = '';

        this.itemsGrid = document.getElementById('itemsGrid');
        this.searchInput = document.getElementById('searchInput');
        this.noResults = document.getElementById('noResults');
        this.visibleCountEl = document.getElementById('visibleCount');
        this.totalCountEl = document.getElementById('totalCount');

        this.init();
    }

    init() {
        this.renderItems();
        this.initEventListeners();
        this.updateStats();
    }

    initEventListeners() {
        // Фильтрация по категориям
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentCategory = btn.dataset.category;
                this.updateActiveButton(btn);
                this.filterItems();
            });
        });

        // Поиск
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.filterItems();
        });
    }

    renderItems() {
        this.itemsGrid.innerHTML = '';

        this.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.dataset.id = item.id;
            card.dataset.category = item.category;
            card.dataset.name = item.name.toLowerCase();
            
            card.innerHTML = `
                <div class="item-icon">${item.icon}</div>
                <div style="text-align: center;">
                    <span class="item-category category-${item.category}">${item.category}</span>
                </div>
                <h3 class="item-title">${item.name}</h3>
                <p class="item-description">${item.description}</p>
            `;

            this.itemsGrid.appendChild(card);
        });
    }

    filterItems() {
        const cards = document.querySelectorAll('.item-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.dataset.category;
            const name = card.dataset.name;

            // Проверка категории
            const categoryMatch = this.currentCategory === 'все' || category === this.currentCategory;

            // Проверка поиска
            const searchMatch = this.searchQuery === '' || name.includes(this.searchQuery);

            // Показываем или скрываем карточку
            if (categoryMatch && searchMatch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Показываем сообщение "ничего не найдено"
        if (visibleCount === 0) {
            this.noResults.style.display = 'block';
        } else {
            this.noResults.style.display = 'none';
        }

        this.updateStats(visibleCount);
        this.animateCards();
    }

    updateActiveButton(activeBtn) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    updateStats(visibleCount = null) {
        if (visibleCount === null) {
            visibleCount = this.items.length;
        }

        this.visibleCountEl.textContent = visibleCount;
        this.totalCountEl.textContent = this.items.length;
    }

    animateCards() {
        const visibleCards = document.querySelectorAll('.item-card:not(.hidden)');
        visibleCards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeInScale 0.4s ease ${index * 0.05}s forwards`;
            }, 10);
        });
    }
}

// CSS для анимации карточек
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .item-card {
        animation: fadeInScale 0.4s ease forwards;
    }
`;
document.head.appendChild(style);

// Инициализация фильтра
document.addEventListener('DOMContentLoaded', () => {
    new ItemFilter();
});
