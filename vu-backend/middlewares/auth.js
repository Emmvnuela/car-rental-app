const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Accès refusé : token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Erreur de vérification du token:', err);
      return res.status(403).json({ error: 'Token invalide' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
