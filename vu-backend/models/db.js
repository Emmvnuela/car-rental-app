const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         // À adapter
  host: 'localhost',
  database: 'vu_vehicles',  // Ton nom de base
  password: 'root',  // À adapter
  port: 5432
});

module.exports = pool;
