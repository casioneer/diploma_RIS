## Мята — pet‑project интернет‑пиццерии (React + Node)

Современный лендинг c каталогом пицц и корзиной. Фокус — чистый UI/UX, понятная архитектура фронтенда, рабочие бэкенд‑ендпоинты корзины, удобный локальный запуск.

### Основные возможности
- Каталог «Наше меню» с карточками пицц, ценами и CTA «Добавить»
- Корзина на клиенте: счётчик в хедере, добавление/удаление, +/- количества, итоговая сумма
- Серверная корзина (Node/Express): REST API `/api/cart` (add/get/increment/decrement/delete) — включён dev‑bypass для простого теста
- Адаптивный UI, тёмная тема, аккуратный футер в 3 колонки

### Технологии
- Клиент: React 18, Vite, Tailwind utility‑классы, React Icons
- Сервер: Node.js + Express, JWT‑middleware (dev‑bypass), in‑memory cart db‑adapter

### Быстрый старт
1) Запуск сервера (порт 8091)
```
cd server
$env:NODE_ENV = 'development'
$env:PORT = '8091'
npm install
npm run dev
```
Ожидаете: `Magic happening on port: 8091`.

Проверка API (PowerShell одной строкой):
```
Invoke-WebRequest -UseBasicParsing -Method POST -Uri http://localhost:8091/api/cart/add -Headers @{'Content-Type'='application/json';'x-dev-bypass'='1'} -Body '{"product_id":1,"quantity":1}' | Select-Object -ExpandProperty Content
```

2) Запуск клиента (Vite)
```
cd client
npm install
npm run start
```
Откройте адрес из вывода Vite (обычно http://localhost:5173).

### Навигация и UX
- Навбар: «Главная», «Меню», «Информация», «Заказ» (кнопка с индикатором количества)
- «Добавить» на карточке — добавляет товар и обновляет счётчик (без автоперехода в корзину)
- Корзина: современные кнопки +/−, удалить, аккуратные отступы, итоговая сумма
- Футер: 3‑колоночная сетка, ссылки‑якоря на разделы страницы

### Архитектура фронтенда
- `src/components` — атомарные блоки секций: Navbar, Hero, Services (каталог), Banner, AppStore, Testimonial, Footer, корзина (`cart.jsx`)
- `src/App.jsx` — единый state корзины, навигация‑якоря, переключение вида «каталог/корзина»
- Добавление из каталога — через кастомное событие `window.dispatchEvent(new CustomEvent('add-to-cart', {detail:{...}}))`, которое перехватывает `App.jsx`

### Архитектура бэкенда
- `server/app.js` — конфиг Express; `server/index.js` — сервер
- `server/middleware/verifyToken.js` — JWT‑проверка, в dev: bypass по заголовку `x-dev-bypass: 1`
- `server/controllers/cart.controller.js` — хэндлеры `/api/cart`
- `server/services/cart.service.js` — бизнес‑логика+вызовы db‑адаптера
- `server/db/cart.db.js` — in‑memory реализация: `createCartDb`, `getCartByIdDb`, `addItemDb`, `deleteItemDb`, `increaseItemQuantityDb`, `decreaseItemQuantityDb`, `emptyCartDb`

### API корзины (кратко)
- GET `/api/cart` — получить текущую корзину (dev: `x-dev-bypass: 1`)
- POST `/api/cart/add` — `{ product_id:number, quantity:number }` → массив позиций
- PUT `/api/cart/increment` — `{ product_id }`
- PUT `/api/cart/decrement` — `{ product_id }`
- DELETE `/api/cart/delete` — `{ product_id }`

Токен: в проде — `auth-token: <JWT>`. В dev для простоты допускается `x-dev-bypass: 1`.

### Что посмотреть в коде
- `client/src/components/Services/Services.jsx` — карточки и кнопка «Добавить»
- `client/src/components/cart.jsx` — UI корзины и логика `+/-/Удалить`
- `client/src/App.jsx` — state корзины, навигация, интеграция секций
- `server/controllers/cart.controller.js` — минимальный, чистый контроллер

### Дальнейшие улучшения (roadmap)
- Перевести клиентскую корзину на серверный API полностью (вместо локального стейта)
- Авторизация/регистрация + реальные JWT в заголовках
- Хранение корзины на уровне пользователя; персистентность (SQLite/Postgres)
- Тесты (Jest/RTL), CI, предпрод билд и деплой на Vercel/Render

### Почему этот проект
- Показывает умение быстро собрать современный лендинг, аккуратный UI, продуманный UX
- Видно владение React (state‑менеджмент без лишних зависимостей), Tailwind‑подходом, семантикой
- На бэке — чистая слойность, простые эндпоинты, dev‑friendly проверка

### Лицензия
MIT


