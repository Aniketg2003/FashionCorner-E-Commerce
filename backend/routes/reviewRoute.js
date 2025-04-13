import express from 'express';
import { submitReview, getProductReviews,canUserReview } from '../controllers/reviewController.js'
import authUser from '../middleware/auth.js';

const router = express.Router();

// Submit a review (requires authentication)
router.post('/submit', authUser, submitReview);

// Get reviews for a product 
router.get('/product/:productId', getProductReviews);

router.get('/can-review/:productId', authUser, canUserReview,);

export default router;
