const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const newUser = await userModel.createUser({ name, email, password, phone });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
  }
};
