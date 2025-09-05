// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("🛡️ Header reçu:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou mal formé' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token vérifié. Payload:", decoded); // ← Debug utile
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Erreur vérification JWT:", error.message); // ← Log d’erreur
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
}

module.exports = verifyToken;
