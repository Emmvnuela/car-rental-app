// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vu_vehicles',
  password: 'root',
  port: 5432,
});

module.exports = pool;
