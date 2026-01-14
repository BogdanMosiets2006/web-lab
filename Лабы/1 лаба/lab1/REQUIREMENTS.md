# СПРАВКА ПО ВЫПОЛНЕНИЮ ТРЕБОВАНИЙ ЛАБОРАТОРНОЙ РАБОТЫ №1

## ✅ ПРОВЕРОЧНЫЙ СПИСОК

### HTML-теги (требуется 55+, использовано 60+)

#### Семантические HTML5 теги (требуется 15+, использовано 17):
1. `<header>` - шапка сайта и страниц
2. `<footer>` - подвал сайта
3. `<nav>` - навигационное меню
4. `<main>` - основное содержимое
5. `<section>` - секции контента
6. `<article>` - статьи и карточки
7. `<aside>` - боковые блоки
8. `<figure>` - изображения с подписями
9. `<figcaption>` - подписи к изображениям
10. `<details>` - раскрывающиеся блоки
11. `<summary>` - заголовок details
12. `<time>` - временные метки
13. `<mark>` - выделенный текст
14. `<progress>` - индикаторы прогресса
15. `<meter>` - измерительные шкалы
16. `<address>` - контактная информация
17. `<output>` - вывод результата

#### Остальные теги (43+):
18. `<html>`, `<head>`, `<body>`, `<title>`, `<meta>`, `<link>`
19. `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`
20. `<p>`, `<div>`, `<span>`, `<br>`
21. `<a>`, `<img>`, `<iframe>`
22. `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>`
23. `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`
24. `<form>`, `<input>`, `<textarea>`, `<select>`, `<option>`, `<button>`, `<label>`, `<fieldset>`, `<legend>`
25. `<strong>`, `<em>`, `<small>`, `<abbr>`, `<cite>`, `<code>`, `<blockquote>`
26. `<i>` (для иконок Font Awesome)

---

## CSS ПОЗИЦИОНИРОВАНИЕ (требуется 3+, использовано 5)

### 1. Position: static
```css
.container {
    position: static; /* По умолчанию */
}
```
**Где используется**: контейнеры, базовые элементы

### 2. Position: relative
```css
.main-header {
    position: relative;
}
.gallery-item {
    position: relative;
}
```
**Где используется**: 
- Главный header (index.html)
- Элементы галереи
- Карточки новостей
- Родительские элементы для absolute детей

### 3. Position: absolute
```css
.hero-section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.gallery-item figcaption {
    position: absolute;
    bottom: 0;
}
```
**Где используется**:
- Hero секция (центрирование)
- Подписи к изображениям
- Оверлеи
- Декоративные элементы

### 4. Position: fixed
```css
.main-nav {
    position: fixed;
    top: 0;
}
#scrollToTop {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
}
```
**Где используется**:
- Навигационное меню (все страницы)
- Кнопка "Наверх"

### 5. Position: sticky
```css
.page-header {
    position: sticky;
    top: 0;
}
.section-header {
    position: sticky;
    top: 80px;
}
```
**Где используется**:
- Заголовки страниц
- Заголовки секций (прилипают при скролле)

---

## ОБТЕКАНИЕ (требуется 1+, использовано 2)

### Float: left
```css
.profile-image-wrapper {
    float: left;
    margin-right: var(--spacing-md);
}
```
**Где используется**: about.html - изображение разработчика

### Float: right
```css
.heritage-quote {
    float: right;
    width: 40%;
    margin-left: var(--spacing-md);
}
```
**Где используется**: history.html - цитата справа от текста

### Clearfix
```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

---

## СЕЛЕКТОРЫ (требуется 6+, использовано 8+)

### 1. Селектор по тегу
```css
body { }
h1 { }
p { }
a { }
img { }
```

### 2. Селектор по классу
```css
.container { }
.nav-menu { }
.hero-title { }
```

### 3. Селектор по ID
```css
#menu-toggle { }
#scrollToTop { }
#contactForm { }
```

### 4. Универсальный селектор
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

### 5. Селектор по атрибуту
```css
a[href^="mailto:"] { }
a[href^="tel:"] { }
a[target="_blank"]::after { }
input[type="text"] { }
input[required] { }
```

### 6. Группировка селекторов
```css
h1, h2, h3, h4, h5, h6 { }
*::before, *::after { }
```

### 7. Селектор класса с тегом
```css
a.active { }
button.btn-primary { }
```

### 8. Множественные классы
```css
.nav-menu .active { }
.form-input.error { }
```

---

## КОМБИНАТОРЫ (требуется 2, использовано 4)

### 1. Потомки (A B)
```css
.nav-menu a { }
.footer-content p { }
.container section { }
```

### 2. Дочерние элементы (A > B)
```css
.nav-menu > li { }
.photo-grid > figure { }
```

### 3. Соседние элементы (A + B)
```css
h2 + p { }
.form-label + input { }
```

### 4. Общие соседние (A ~ B)
```css
h2 ~ p { }
.form-input ~ .error-message { }
```

---

## ПСЕВДОКЛАССЫ (требуется 10+, использовано 16)

### 1. :hover
```css
a:hover { }
.nav-menu a:hover { }
.gallery-item:hover img { }
button:hover { }
```

### 2. :active
```css
button:active { }
a:active { }
```

### 3. :focus
```css
input:focus { }
textarea:focus { }
button:focus { }
```

### 4. :visited
```css
a:visited { }
```

### 5. :link
```css
a:link { }
```

### 6. :first-child
```css
.nav-menu li:first-child a { }
.footer-section:first-child { }
```

### 7. :last-child
```css
.nav-menu li:last-child a { }
```

### 8. :nth-child(n)
```css
.photo-grid figure:nth-child(odd) { }
.photo-grid figure:nth-child(even) { }
.news-card:nth-child(1) { }
```

### 9. :nth-of-type(n)
```css
article:nth-of-type(2n) { }
.skill-item:nth-of-type(odd) .skill-progress { }
```

### 10. :not()
```css
.nav-menu a:not(.active) { }
button:not([disabled]) { }
input:not([type="checkbox"]):not([type="radio"]) { }
```

### 11. :disabled
```css
input:disabled { }
button:disabled { }
```

### 12. :required
```css
input:required { }
```

### 13. :valid
```css
input:valid:not(:placeholder-shown) { }
```

### 14. :invalid
```css
input:invalid:not(:placeholder-shown) { }
```

### 15. :lang()
```css
:lang(ru) { }
```

### 16. :checked
```css
input[type="checkbox"]:checked + span::before { }
```

---

## ПСЕВДОЭЛЕМЕНТЫ (требуется 1+, использовано 2)

### ::before
```css
.section-header::before {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background: var(--gradient-accent);
}

.hero-section::before {
    content: "";
    position: absolute;
    background: var(--gradient-overlay);
}

.quote::before {
    content: """;
    font-size: 4rem;
}
```

### ::after
```css
.nav-container::after {
    content: "";
    display: table;
    clear: both;
}

.header-line::after {
    content: "";
    display: block;
    height: 2px;
    background: var(--color-gray-light);
}

a[target="_blank"]::after {
    content: " ↗";
}
```

---

## СТРАНИЦЫ САЙТА (требуется 6, создано 6)

### 1. index.html - Главная
✅ Описание города  
✅ 8 фотографий (адаптивная вёрстка)  
✅ 4 актуальных события  

### 2. about.html - О разработчике
✅ Фотография разработчика  
✅ Биография  
✅ 6 навыков с процентами (горизонтальные диаграммы)  

### 3. history.html - История
✅ Таблица с 11 значимыми событиями  
✅ Дата, название, описание, значение  

### 4. infrastructure.html - Инфраструктура
✅ Географическое положение  
✅ Встроенная карта (iframe OpenStreetMap)  
✅ Административное деление (4 района)  
✅ Система транспорта (3 вида)  

### 5. culture.html - Культура и искусство
✅ 4 учреждения культуры  
✅ 4 известных деятеля  
✅ Фестивали и события  

### 6. contact.html - Обратная связь
✅ Поля: имя, email, сообщение  
✅ Валидация HTML5  
✅ CSS стилизация ошибок  
✅ Кнопка отправки  

---

## ДОПОЛНИТЕЛЬНЫЕ ТРЕБОВАНИЯ

### ✅ Адаптивный дизайн
- Медиа-запросы для 4 брейкпоинтов
- Flexbox и Grid layout
- Мобильное меню

### ✅ Google Fonts
- Playfair Display (заголовки)
- IBM Plex Sans (основной текст)

### ✅ Font Awesome 6.4.0
- Иконки в навигации
- Иконки в заголовках секций
- Социальные сети

### ✅ Навигация между страницами
- Меню на всех страницах
- Активная ссылка текущей страницы
- Кнопки "Следующая/Предыдущая"

---

## ФАЙЛЫ ПРОЕКТА

1. **index.html** (14KB) - Главная страница
2. **about.html** (16KB) - О разработчике
3. **history.html** (22KB) - История города
4. **infrastructure.html** (22KB) - Инфраструктура
5. **culture.html** (26KB) - Культура и искусство
6. **contact.html** (21KB) - Форма обратной связи
7. **styles.css** (40KB) - Все стили
8. **script.js** (17KB) - JavaScript
9. **README.md** (8.5KB) - Документация

**ИТОГО**: 9 файлов, ~185KB

---

## СТАТИСТИКА

- **HTML теги**: 60+ (требовалось 55)
- **HTML5 теги**: 17 (требовалось 15)
- **Позиционирования**: 5 (требовалось 3)
- **Обтекания**: 2 (требовалось 1)
- **Простых селекторов**: 8+ (требовалось 6)
- **Комбинаторов**: 4 (требовалось 2)
- **Псевдоклассов**: 16 (требовалось 10)
- **Псевдоэлементов**: 2 (требовалось 1)
- **Страниц**: 6 (требовалось 6)

## ✅ ВСЕ ТРЕБОВАНИЯ ВЫПОЛНЕНЫ!
