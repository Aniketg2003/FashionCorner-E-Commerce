import Review from '../models/reviewModel.js';
import mongoose from 'mongoose';


// Submit a new review
const submitReview = async (req, res) => {
  try {
    const { productId, userId, username, rating, comment } = req.body;

    // Validate required fields
    if (!productId || !userId || !username || !rating || !comment) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    const newReview = new Review({
      productId,
      userId,
      username,
      rating,
      comment
    });

    await newReview.save();

    res.json({ success: true, message: 'Review submitted successfully' });
  } catch (error) {
    console.log('Review submission error:', error);
    res.json({ success: false, message: error.message });
  }
};


const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Support both ObjectId and String stored productId
    console.log("productId param:", req.params.productId);

    const reviews = await Review.find({
      
      $or: [
        { productId: new mongoose.Types.ObjectId(productId) },
        { productId: productId }
      ]
      
    }).sort({ date: -1 });
    res.json({ success: true, reviews});
    console.log(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const canUserReview = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    const orders = await orderModel.find({ userId, 'items.productId': productId });
    const alreadyReviewed = await reviewModel.findOne({ userId, productId });

    const canReview = orders.length > 0 && !alreadyReviewed;
    res.status(200).json({ success: true, canReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to check review permission' });
  }
};



export { submitReview, getProductReviews };
