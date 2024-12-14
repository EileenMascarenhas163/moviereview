import express from 'express';
import { createReview } from '../controllers/reviewController.js';

const router = express.Router();

// Route to add a review for a specific movie
router.post('/:movieId/review', createReview);

export default router;
