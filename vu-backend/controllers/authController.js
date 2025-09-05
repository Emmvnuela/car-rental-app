const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'vusecret2025';

// Inscription
async function register(req, res) {
  const { name, email, password, phone, role } = req.body;

  try {
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: hashedPassword, phone, role });

    res.status(201).json({ message: 'Utilisateur créé', user: newUser });
  } catch (error) {
    console.error('Erreur register:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Connexion
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = {
  register,
  login,
};
