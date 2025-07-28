const pool = require('../models/db');
const { createNotification } = require('../models/notificationModel');

const assignAgent = async (req, res) => {
  const { reservationId } = req.params;
  const { agentId, status, deliveryDate } = req.body;

  try {
    // 1. Mettre à jour la réservation avec l'agent
    const result = await pool.query(
      `UPDATE reservations 
       SET agent_id = $1, delivery_status = $2, delivery_date = $3 
       WHERE id = $4 RETURNING *`,
      [agentId, status || 'assigné', deliveryDate || new Date(), reservationId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    // 2. Récupérer le user_id de l’agent (depuis table agents)
    const agentQuery = await pool.query(
      `SELECT user_id FROM agents WHERE id = $1`,
      [agentId]
    );

    if (agentQuery.rows.length === 0) {
      return res.status(404).json({ message: "Agent non trouvé" });
    }

    const agentUserId = agentQuery.rows[0].user_id;

    // 3. Créer une notification
    await createNotification(
      agentUserId,
      `🚗 Nouvelle réservation assignée (ID: ${reservationId})`,
      'assignation'
    );

    // 4. Vérifier si une salle de chat existe déjà
    const checkChatRoom = await pool.query(
      `SELECT * FROM chat_rooms WHERE reservation_id = $1`,
      [reservationId]
    );

    if (checkChatRoom.rows.length === 0) {
      // 5. Récupérer le client (user_id)
      const clientQuery = await pool.query(
        `SELECT user_id FROM reservations WHERE id = $1`,
        [reservationId]
      );

      if (clientQuery.rows.length > 0) {
        const clientId = clientQuery.rows[0].user_id;

        // 6. Créer une nouvelle salle de chat
        await pool.query(
          `INSERT INTO chat_rooms (reservation_id, client_id, agent_id, created_at)
           VALUES ($1, $2, $3, NOW())`,
          [reservationId, clientId, agentUserId]
        );

        console.log(`💬 Salle de chat créée pour réservation ${reservationId}`);
      }
    }

    // 7. Répondre au client
    res.json({
      message: "Agent assigné avec succès ✅",
      updatedReservation: result.rows[0],
    });

  } catch (err) {
    console.error("❌ Erreur lors de l’assignation de l’agent :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  assignAgent,
};