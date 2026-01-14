// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful:', registration.scope);
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed:', err);
      });
  });
}

// Обработка события установки PWA
let deferredPrompt;
const installButton = document.getElementById('installButton');
const installModal = document.getElementById('installModal');

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  
  // Предотвращаем автоматический показ промпта
  e.preventDefault();
  
  // Сохраняем событие для последующего использования
  deferredPrompt = e;
  
  // Показываем модальное окно с предложением установки при первом заходе
  if (!localStorage.getItem('pwaInstallPromptShown')) {
    showInstallPrompt();
    localStorage.setItem('pwaInstallPromptShown', 'true');
  }
  
  // Показываем кнопку установки, если она есть
  if (installButton) {
    installButton.style.display = 'block';
  }
});

// Функция показа промпта установки
function showInstallPrompt() {
  if (installModal) {
    // Используем Bootstrap модальное окно
    const modal = new bootstrap.Modal(installModal);
    modal.show();
  }
}

// Обработчик клика по кнопке установки
if (installButton) {
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
      return;
    }
    
    // Показываем промпт установки
    deferredPrompt.prompt();
    
    // Ждем ответа пользователя
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Сбрасываем отложенный промпт
    deferredPrompt = null;
    
    // Скрываем кнопку установки
    installButton.style.display = 'none';
  });
}

// Обработка успешной установки
window.addEventListener('appinstalled', (evt) => {
  console.log('PWA was installed');
  
  // Показываем уведомление об успешной установке
  if (typeof showToast === 'function') {
    showToast('success', 'Приложение успешно установлено!');
  }
});

// Функция для показа toast уведомлений
function showToast(type, message) {
  const toastContainer = document.querySelector('.toast-container') || createToastContainer();
  
  const toastEl = document.createElement('div');
  toastEl.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  
  toastContainer.appendChild(toastEl);
  
  const toast = new bootstrap.Toast(toastEl, {
    autohide: true,
    delay: 3000
  });
  
  toast.show();
  
  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container position-fixed top-0 end-0 p-3';
  container.style.zIndex = '11';
  document.body.appendChild(container);
  return container;
}

// Проверка, установлено ли приложение
function isAppInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

// Скрываем кнопку установки, если приложение уже установлено
if (isAppInstalled() && installButton) {
  installButton.style.display = 'none';
}
