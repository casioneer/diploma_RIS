// Импорт Express.js для создания приложения
const express = require("express");

// Импорт модуля для обработки асинхронных ошибок в Express.js
require("express-async-errors");

// Импорт модуля для управления CORS (Cross-Origin Resource Sharing)
const cors = require("cors");

// Импорт модуля для логирования HTTP-запросов
const morgan = require("morgan");

// Импорт модуля для парсинга cookies из HTTP-заголовков
const cookieParser = require("cookie-parser");

// Импорт маршрутов приложения
const routes = require("./routes");

// Импорт модуля для защиты приложения от некоторых видов атак
const helmet = require("helmet");

// Импорт модуля для сжатия ответов сервера
const compression = require("compression");

// Импорт пользовательского промежуточного слоя для обработки неизвестных конечных точек
const unknownEndpoint = require("./middleware/unKnownEndpoint");

// Импорт вспомогательной функции для обработки ошибок
const { handleError } = require("./helpers/error");

// Создание экземпляра приложения Express.js
const app = express();

// Настройка доверия прокси-серверу
app.set("trust proxy", 1);

// Настройка CORS с разрешением на использование учетных данных и любого источника
app.use(cors({ credentials: true, origin: true }));

// Настройка приложения для обработки JSON-тел в запросах
app.use(express.json());

// Настройка логирования HTTP-запросов в режиме разработки
app.use(morgan("dev"));

// Настройка сжатия ответов сервера
app.use(compression());

// Настройка защиты приложения от некоторых видов атак
app.use(helmet());

// Настройка парсинга cookies из HTTP-заголовков
app.use(cookieParser());

// Добавление маршрутов приложения под префиксом /api
app.use("/api", routes);

// Добавление маршрута корневого URL, который возвращает простой HTML-ответ
app.get("/", (req, res) =>
  res.send("<h1 style='text-align: center'>E-COMMERCE API</h1>")
);

// Добавление пользовательского промежуточного слоя для обработки неизвестных конечных точек
app.use(unknownEndpoint);

// Добавление вспомогательной функции для обработки ошибок
app.use(handleError);

// Экспорт экземпляра приложения для использования в других частях приложения
module.exports = app;

