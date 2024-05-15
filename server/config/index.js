/* require("dotenv").config();
const { Pool } = require("pg");

// Выводим значения переменных окружения
console.log(`User: ${process.env.POSTGRES_USER}`);
console.log(`Password: ${process.env.POSTGRES_PASSWORD}`);
console.log(`Host: ${process.env.POSTGRES_HOST}`);
console.log(`Port: ${process.env.POSTGRES_PORT}`);
console.log(`Node Environment: ${process.env.NODE_ENV}`);

const isProduction = process.env.NODE_ENV === "production";
const database =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_DB_TEST
    : process.env.POSTGRES_DB;

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;
const pool = new Pool({
  connectionString,

  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
}; */
require("dotenv").config();
const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";
// const database =
//     process.env.NODE_ENV === "test"
//         ? process.env.POSTGRES_DB_TEST
//         : process.env.POSTGRES_DB;

// const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;
const databaseUrl = process.env.DATABASE_URL
console.log(databaseUrl);

// const connectionString = `postgresql://user:databasepassword@localhost:7890/database`;
// console.log(connectionString);

const pool = new Pool({
  connectionString: databaseUrl,
  /*
    SSL is not supported in development
    */
  // ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
