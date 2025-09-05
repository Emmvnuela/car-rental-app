const pool = require('../config/db');

const verifyDeliveryOwnerOrAdmin = async (req, res, next) => {
  const user = req.user;
  const deliveryId = req.params.id;

  try {
    // Si admin, laisse passer
    if (user.role === 'admin') return next();

    // Sinon on vérifie que l’agent connecté est celui assigné à cette livraison
    const query = `SELECT agent_id FROM deliveries WHERE id = $1`;
    const result = await pool.query(query, [deliveryId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livraison non trouvée' });
    }

    const delivery = result.rows[0];

    // Vérifie que l’agent_id de la livraison correspond à l’agent connecté
    const agentQuery = `SELECT id FROM agents WHERE user_id = $1`;
    const agentResult = await pool.query(agentQuery, [user.id]);

    if (agentResult.rows.length === 0) {
      return res.status(403).json({ error: 'Agent non autorisé' });
    }

    const connectedAgentId = agentResult.rows[0].id;

    if (connectedAgentId !== delivery.agent_id) {
      return res.status(403).json({ error: 'Cette livraison ne vous appartient pas' });
    }

    next();
  } catch (error) {
    console.error('Erreur middleware verifyDeliveryOwnerOrAdmin:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = verifyDeliveryOwnerOrAdmin;
