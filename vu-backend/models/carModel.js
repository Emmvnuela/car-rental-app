// models/carModel.js
const db = require('./db');

const getAllCars = async (filters = {}) => {
  const {
    search,
    minPrice,
    maxPrice,
    available,
    year,
    page = 1,
    limit = 10,
    sort = 'created_at',
    order = 'desc'
  } = filters;

  let whereClause = `WHERE 1=1`;
  const params = [];

  if (search) {
    whereClause += ` AND (brand ILIKE $${params.length + 1} OR model ILIKE $${params.length + 1})`;
    params.push(`%${search}%`);
  }

  if (year) {
    whereClause += ` AND year = $${params.length + 1}`;
    params.push(Number(year));
  }

  if (minPrice) {
    whereClause += ` AND price_per_day >= $${params.length + 1}`;
    params.push(Number(minPrice));
  }

  if (maxPrice) {
    whereClause += ` AND price_per_day <= $${params.length + 1}`;
    params.push(Number(maxPrice));
  }

  if (available !== undefined && available !== '') {
    whereClause += ` AND available = $${params.length + 1}`;
    params.push(available === 'true');
  }

  const countQuery = `SELECT COUNT(*) FROM cars ${whereClause}`;
  const totalCountResult = await db.query(countQuery, params);
  const total = Number(totalCountResult.rows[0].count);

  const allowedSort = ['brand', 'price_per_day', 'year', 'created_at'];
  const validSort = allowedSort.includes(sort) ? sort : 'created_at';

  const dataQuery = `
    SELECT * FROM cars
    ${whereClause}
    ORDER BY ${validSort} ${order === 'asc' ? 'ASC' : 'DESC'}
    LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `;
  params.push(Number(limit), (Number(page) - 1) * Number(limit));

  const { rows } = await db.query(dataQuery, params);

  return {
    cars: rows,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit))
  };
};

const getAllCarsSimple = async () => {
  const result = await db.query('SELECT * FROM cars ORDER BY created_at DESC');
  return result.rows;
};

const getCarById = async (id) => {
  const result = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
  return result.rows[0];
};

const createCar = async (car) => {
  const { brand, model, year, price_per_day, image_url, description, available } = car;
  const result = await db.query(
    `INSERT INTO cars (brand, model, year, price_per_day, image_url, description, available)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [brand, model, year, price_per_day, image_url, description, available]
  );
  return result.rows[0];
};

const updateCar = async (id, updates) => {
  const { brand, model, year, price_per_day, image_url, description, available } = updates;
  const result = await db.query(
    `UPDATE cars SET brand=$1, model=$2, year=$3, price_per_day=$4,
     image_url=$5, description=$6, available=$7 WHERE id=$8 RETURNING *`,
    [brand, model, year, price_per_day, image_url, description, available, id]
  );
  return result.rows[0];
};

const deleteCar = async (id) => {
  const result = await db.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

const getCarStats = async () => {
  try {
    const totalCarsResult = await db.query('SELECT COUNT(*) as total FROM cars');
    const availableCarsResult = await db.query('SELECT COUNT(*) as available FROM cars WHERE available = true');
    const unavailableCarsResult = await db.query('SELECT COUNT(*) as unavailable FROM cars WHERE available = false');
    const avgPriceResult = await db.query('SELECT AVG(price_per_day) as avg_price FROM cars');
    const brandStatsResult = await db.query(`
      SELECT brand, COUNT(*) as count 
      FROM cars 
      GROUP BY brand 
      ORDER BY count DESC 
      LIMIT 5
    `);

    return {
      totalCars: parseInt(totalCarsResult.rows[0].total),
      availableCars: parseInt(availableCarsResult.rows[0].available),
      unavailableCars: parseInt(unavailableCarsResult.rows[0].unavailable),
      avgPrice: parseFloat(avgPriceResult.rows[0].avg_price) || 0,
      brandStats: brandStatsResult.rows
    };
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    throw error;
  }
};

module.exports = {
  getAllCars,
  getAllCarsSimple,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getCarStats
};
