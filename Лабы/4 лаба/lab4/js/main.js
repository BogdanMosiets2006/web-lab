// Инициализация корзины из localStorage
let cart = JSON.parse(localStorage.getItem('sushiCart')) || [];

// Данные о товарах
const products = {
  1: { id: 1, name: 'Филадельфия', price: 590, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop' },
  2: { id: 2, name: 'Калифорния', price: 490, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=200&fit=crop' },
  3: { id: 3, name: 'Дракон', price: 650, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&h=200&fit=crop' },
  4: { id: 4, name: 'Сет Император', price: 1990, image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=300&h=200&fit=crop' }
};

// Обновление счетчика корзины
function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

// Добавление товара в корзину
function addToCart(productId) {
  const product = products[productId];
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  localStorage.setItem('sushiCart', JSON.stringify(cart));
  updateCartBadge();
  
  // Показываем уведомление
  if (typeof showToast === 'function') {
    showToast('success', `${product.name} добавлен в корзину!`);
  }
}

// Удаление товара из корзины
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('sushiCart', JSON.stringify(cart));
  updateCartBadge();
  
  // Перезагружаем страницу корзины если мы на ней
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
}

// Изменение количества товара
function updateQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.quantity += delta;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    localStorage.setItem('sushiCart', JSON.stringify(cart));
    updateCartBadge();
    
    if (window.location.pathname.includes('cart.html')) {
      renderCart();
    }
  }
}

// Очистка корзины
function clearCart() {
  cart = [];
  localStorage.setItem('sushiCart', JSON.stringify(cart));
  updateCartBadge();
  
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
}

// Рендер корзины на странице cart.html
function renderCart() {
  const cartContainer = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartSummary = document.getElementById('cartSummary');
  
  if (!cartContainer) return;
  
  if (cart.length === 0) {
    if (emptyCart) emptyCart.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'none';
    cartContainer.innerHTML = '';
    return;
  }
  
  if (emptyCart) emptyCart.style.display = 'none';
  if (cartSummary) cartSummary.style.display = 'block';
  
  let html = '';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    html += `
      <div class="cart-item card mb-3 border-0 shadow-sm">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-3">
              <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
            </div>
            <div class="col-5">
              <h6 class="cart-item__title mb-1">${item.name}</h6>
              <p class="cart-item__price text-danger mb-0">${item.price} ₽</p>
            </div>
            <div class="col-4 text-end">
              <div class="cart-item__controls d-flex align-items-center justify-content-end gap-2 mb-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="cart-item__quantity fw-bold">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  cartContainer.innerHTML = html;
  
  // Обновляем итоговую сумму
  const totalElement = document.getElementById('cartTotal');
  if (totalElement) {
    totalElement.textContent = `${total} ₽`;
  }
}

// Countdown Timer для акции
function initCountdown() {
  // Устанавливаем дату окончания акции (через 3 дня от текущей даты)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  endDate.setHours(23, 59, 59, 999);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;
    
    if (distance < 0) {
      // Акция закончилась - перезапускаем таймер на 3 дня
      endDate.setDate(endDate.getDate() + 3);
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  
  // Обновляем каждую секунду
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Валидация формы обратной связи
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity()) {
      // Здесь был бы запрос на сервер
      // Для демонстрации просто показываем уведомление
      
      if (typeof showToast === 'function') {
        showToast('success', 'Спасибо! Ваше сообщение отправлено.');
      }
      
      form.reset();
      form.classList.remove('was-validated');
    } else {
      form.classList.add('was-validated');
    }
  });
}

// Валидация формы оформления заказа
function initCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity()) {
      // Показываем модальное окно успешного заказа
      const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
      successModal.show();
      
      // Очищаем корзину
      clearCart();
      
      // Через 3 секунды перенаправляем на главную
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    } else {
      form.classList.add('was-validated');
    }
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Обновляем счетчик корзины
  updateCartBadge();
  
  // Инициализируем countdown если есть на странице
  if (document.getElementById('days')) {
    initCountdown();
  }
  
  // Инициализируем форму обратной связи
  initContactForm();
  
  // Инициализируем форму оформления заказа
  initCheckoutForm();
  
  // Рендерим корзину если мы на странице корзины
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
  
  // Инициализируем Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Добавляем плавную прокрутку к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Экспортируем функции для использования в HTML
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
