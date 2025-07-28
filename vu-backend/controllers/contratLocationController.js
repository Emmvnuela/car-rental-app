// controllers/contratLocationController.js
const ContratLocation = require('../models/ContratLocation');
const generateContratPDF = require('../utils/generatePdf');
const sendEmail = require('../utils/SendEmail');
const path = require('path');
const pool = require('../config/db'); // pour requêtes supplémentaires
const transporter = require('../config/mailer');


exports.createContrat = async (req, res) => {
  try {
    const contrat = await ContratLocation.create(req.body);
    res.status(201).json(contrat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création du contrat" });
  }
};

exports.getContrats = async (req, res) => {
  try {
    const contrats = await ContratLocation.getAll();
    res.json(contrats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des contrats" });
  }
};

exports.getContratById = async (req, res) => {
  try {
    const contrat = await ContratLocation.getById(req.params.id);
    if (!contrat) return res.status(404).json({ message: "Contrat non trouvé" });

    // Récupérer les infos utilisateur et voiture via réservation
    const reservationResult = await pool.query(
      `SELECT r.*, c.brand, c.model, u.name, u.email
       FROM reservations r
       JOIN cars c ON r.car_id = c.id
       JOIN users u ON r.user_id = u.id
       WHERE r.id = $1`,
      [contrat.reservation_id]
    );

    const reservation = reservationResult.rows[0];

    res.json({ contrat, reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération du contrat" });
  }
};

exports.updateContrat = async (req, res) => {
  try {
    const contrat = await ContratLocation.update(req.params.id, req.body);
    res.json(contrat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du contrat" });
  }
};

exports.deleteContrat = async (req, res) => {
  try {
    await ContratLocation.delete(req.params.id);
    res.json({ message: "Contrat supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la suppression du contrat" });
  }
};
exports.createAndSendContrat = async (req, res) => {
  try {
    // 1. Création du contrat
    const contrat = await ContratLocation.create(req.body);

    // 2. Récupérer les infos user et voiture (car)
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [contrat.user_id]);
    const user = userResult.rows[0];

    // Pour récupérer la voiture, il faut d'abord récupérer la réservation liée au contrat
    const reservationResult = await pool.query('SELECT * FROM reservations WHERE id = $1', [contrat.reservation_id]);
    const reservation = reservationResult.rows[0];

    const carResult = await pool.query('SELECT * FROM cars WHERE id = $1', [reservation.car_id]);
    const car = carResult.rows[0];

    // 3. Générer le PDF
    const outputPath = path.join(__dirname, `../pdfs/contrat-${contrat.id}.pdf`);
    await generateContratPDF(contrat, car, user, outputPath);

    // 4. Envoyer le PDF par mail
    const emailSubject = `Votre contrat de location n°${contrat.id}`;
    const emailText = 'Veuillez trouver en pièce jointe votre contrat de location.';
    await sendEmail(user.email, emailSubject, emailText, outputPath);

    // 5. Réponse réussie
    res.status(201).json({ message: 'Contrat créé et envoyé par mail avec succès', contrat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création et envoi du contrat' });
  }
};

