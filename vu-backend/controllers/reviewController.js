const Review = require('../models/reviewModel');

const reviewController = {
  async createReview(req, res) {
    try {
      const review = await Review.create(req.body);
      res.status(201).json(review);
    } catch (error) {
      console.error('Erreur création avis:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async getAllReviews(req, res) {
    try {
      const reviews = await Review.getAll();
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Erreur récupération avis:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async getReviewById(req, res) {
    try {
      const review = await Review.getById(req.params.id);
      if (!review) {
        return res.status(404).json({ error: 'Avis non trouvé' });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async getReviewsByCar(req, res) {
    try {
      const reviews = await Review.getByCarId(req.params.car_id);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async getReviewsByAgent(req, res) {
    try {
      const reviews = await Review.getByAgentId(req.params.agent_id);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async deleteReview(req, res) {
    try {
      const deleted = await Review.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Avis non trouvé' });
      }
      res.status(200).json({ message: 'Avis supprimé' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};

module.exports = reviewController;
