
require("dotenv").config();
const { Pool } = require("pg");


const databaseUrl = process.env.DATABASE_URL
console.log(databaseUrl);


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
