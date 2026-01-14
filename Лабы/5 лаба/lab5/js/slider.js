// Компонент: Слайдер изображений
// Автор: Студент
// Дата: 2025

class Slider {
    constructor() {
        this.currentSlide = 0;
        this.slides = [
            {
                title: 'Первый слайд',
                description: 'Добро пожаловать в галерею'
            },
            {
                title: 'Второй слайд',
                description: 'Навигация с помощью кнопок'
            },
            {
                title: 'Третий слайд',
                description: 'Или используйте индикаторы'
            },
            {
                title: 'Четвёртый слайд',
                description: 'Поддержка клавиатуры'
            },
            {
                title: 'Пятый слайд',
                description: 'Автоматическая прокрутка'
            }
        ];

        this.sliderTrack = document.getElementById('sliderTrack');
        this.indicatorsContainer = document.getElementById('indicators');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');

        this.autoplayInterval = null;
        this.autoplayDelay = 3000;

        this.init();
    }

    init() {
        this.renderSlides();
        this.renderIndicators();
        this.initEventListeners();
        this.updateInfo();
        this.startAutoplay();
    }

    renderSlides() {
        this.sliderTrack.innerHTML = '';
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
            slideElement.innerHTML = `
                <div class="slide-content">
                    <div class="slide-number">${index + 1}</div>
                    <h2 class="slide-title">${slide.title}</h2>
                    <p class="slide-description">${slide.description}</p>
                </div>
            `;
            this.sliderTrack.appendChild(slideElement);
        });
    }

    renderIndicators() {
        this.indicatorsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
    }

    initEventListeners() {
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());

        // Поддержка клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Остановка автопрокрутки при наведении
        this.sliderTrack.addEventListener('mouseenter', () => this.stopAutoplay());
        this.sliderTrack.addEventListener('mouseleave', () => this.startAutoplay());
    }

    goToSlide(index) {
        // Убираем активный класс у текущего слайда и индикатора
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');

        slides[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');

        // Устанавливаем новый индекс
        this.currentSlide = index;

        // Добавляем активный класс новому слайду и индикатору
        slides[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');

        this.updateInfo();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    updateInfo() {
        this.currentSlideEl.textContent = this.currentSlide + 1;
        this.totalSlidesEl.textContent = this.slides.length;
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});
