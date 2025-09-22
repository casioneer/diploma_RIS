## Дипломный проект: Пиццерия Мята

Полноценное веб‑приложение с витриной, корзиной, JWT‑аутентификацией и оформлением заказов с оплатой.

### Что реализовано
- JWT аутентификация (access + refresh): регистрация, вход, авто‑обновление токена, защищённые роуты (`/api/cart`, `/api/orders`).
- Корзина: добавление/удаление, изменение количества, подсчёт итогов.
- Заказы: создание заказа, история заказов, статусы на русском.
- Оплата: интеграция Stripe. В dev‑режиме есть безопасный фолбек (симуляция), чтобы можно было оформлять заказы без ключа.
- UI/UX: тёмная тема, плавная навигация по секциям, аккуратная адаптивная вёрстка корзины, отдельные информационные страницы.

### Запуск
1) Backend
```
cd server
npm install
npm run dev
```
По умолчанию сервер слушает порт 8091 и маршруты под `/api`.

Переменные окружения (server/.env):
```
NODE_ENV=development
PORT=8091
SECRET=your_secret
REFRESH_SECRET=your_refresh_secret
STRIPE_SECRET_KEY=sk_test_xxx   # опционально для реальной оплаты
POSTGRES_*                      # опционально, если подключаете реальную БД
```
В dev при отсутствии `SECRET/REFRESH_SECRET` используются безопасные значения по умолчанию, а при отсутствии `STRIPE_SECRET_KEY` — симуляция платежа.

2) Frontend
```
cd client
npm install
npm start
```
По умолчанию фронт обращается к `http://localhost:8091/api` (см. `VITE_API_URL`).

### Основные эндпоинты
- `POST /api/auth/signup` — регистрация
- `POST /api/auth/login` — вход
- `POST /api/auth/refresh-token` — обновление токена
- `GET /api/cart` — получить корзину (JWT)
- `POST /api/cart/add` — добавить товар (JWT)
- `PUT /api/cart/increment|decrement` — количество (JWT)
- `DELETE /api/cart/delete` — удалить (JWT)
- `POST /api/orders/create` — создать заказ (JWT)
- `GET /api/orders` — история заказов (JWT)
- `POST /api/payment` — оплата Stripe или dev‑фолбек

### Замечания по dev‑режиму
- История заказов и корзина в текущей конфигурации работают в in‑memory БД (для удобства разработки). После перезапуска сервера история очищается. Для постоянного хранения подключите PostgreSQL (файлы в `server/config/init.sql`, `server/config/index.js`).

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


