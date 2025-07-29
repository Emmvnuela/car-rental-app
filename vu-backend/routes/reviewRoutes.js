const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Routes principales
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);

// Routes filtrées
router.get('/car/:car_id', reviewController.getReviewsByCar);
router.get('/agent/:agent_id', reviewController.getReviewsByAgent);

router.delete('/:id', reviewController.deleteReview);

module.exports = router;
