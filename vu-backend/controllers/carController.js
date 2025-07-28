// controllers/carController.js
const carModel = require('../models/carModel');

// 🧾 GET - Toutes les voitures
exports.getAllCars = async (req, res) => {
  try {
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
    } = req.query;

    const allowedSort = ['brand', 'price_per_day', 'year', 'created_at'];
    if (sort && !allowedSort.includes(sort)) {
      return res.status(400).json({ error: 'Champ de tri invalide' });
    }

    const filters = {
      search,
      minPrice,
      maxPrice,
      available,
      year,
      page,
      limit,
      sort,
      order
    };

    const result = await carModel.getAllCars(filters);
    res.json(result);
  } catch (error) {
    console.error('❌ Erreur GET /cars:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔄 GET simple
exports.getAllCarsSimple = async (req, res) => {
  try {
    const cars = await carModel.getAllCarsSimple();
    res.json(cars);
  } catch (error) {
    console.error('❌ Erreur GET /cars simple:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔍 GET by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await carModel.getCarById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Voiture non trouvée' });
    res.json(car);
  } catch (error) {
    console.error('❌ Erreur GET /cars/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ➕ POST
exports.createCar = async (req, res) => {
  try {
    const { brand, model, year, price_per_day, image_url, description, available } = req.body;

    if (!brand || !model || !year || !price_per_day) {
      return res.status(400).json({ error: 'Champs obligatoires manquants: brand, model, year, price_per_day' });
    }

    if (isNaN(Number(year)) || isNaN(Number(price_per_day))) {
      return res.status(400).json({ error: 'year et price_per_day doivent être des nombres' });
    }

    const carData = {
      brand: String(brand).trim(),
      model: String(model).trim(),
      year: Number(year),
      price_per_day: Number(price_per_day),
      image_url: image_url ? String(image_url).trim() : null,
      description: description ? String(description).trim() : '',
      available: available !== undefined ? Boolean(available) : true
    };

    const car = await carModel.createCar(carData);
    res.status(201).json(car);
  } catch (error) {
    console.error('❌ Erreur POST /cars:', error);
    res.status(500).json({ error: 'Erreur lors de la création: ' + error.message });
  }
};

// ✏️ PUT
exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, model, year, price_per_day, image_url, description, available } = req.body;

    const existingCar = await carModel.getCarById(id);
    if (!existingCar) return res.status(404).json({ error: 'Voiture non trouvée' });

    const updates = {
      brand: brand || existingCar.brand,
      model: model || existingCar.model,
      year: year ? Number(year) : existingCar.year,
      price_per_day: price_per_day ? Number(price_per_day) : existingCar.price_per_day,
      image_url: image_url !== undefined ? image_url : existingCar.image_url,
      description: description !== undefined ? description : existingCar.description,
      available: available !== undefined ? available : existingCar.available
    };

    const car = await carModel.updateCar(id, updates);
    res.json(car);
  } catch (error) {
    console.error('❌ Erreur PUT /cars/:id:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

// 🗑️ DELETE
exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const existingCar = await carModel.getCarById(id);
    if (!existingCar) return res.status(404).json({ error: 'Voiture non trouvée' });

    const car = await carModel.deleteCar(id);
    res.json({ message: 'Voiture supprimée avec succès', car });
  } catch (error) {
    console.error('❌ Erreur DELETE /cars/:id:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};

// 📊 STATISTIQUES
exports.getCarStats = async (req, res) => {
  try {
    const stats = await carModel.getCarStats();
    res.json(stats);
  } catch (error) {
    console.error('❌ Erreur GET /cars/stats:', error);
    res.status(500).json({ error: 'Erreur lors du chargement des statistiques' });
  }
};
