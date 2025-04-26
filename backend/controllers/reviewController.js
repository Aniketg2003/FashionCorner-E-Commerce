import Review from '../models/reviewModel.js';
import mongoose from 'mongoose';
import orderModel from '../models/ordermodel.js'; // Order model
import reviewModel from '../models/reviewModel.js'; // Review model

// Submit a new review
export const submitReview = async (req, res) => {
  try {
    const { productId, userId, username, rating, comment } = req.body;

    // Check if the user has already reviewed this product
    const existingReview = await reviewModel.findOne({ userId, productId });

    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    // If the user hasn't reviewed yet, proceed to create the new review
    const newReview = new reviewModel({
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await reviewModel.find({
      $or: [
        { productId: new mongoose.Types.ObjectId(productId) },
        { productId: productId }
      ]
    }).sort({ date: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check if user can review
export const canUserReview = async (req, res) => {
  const userId = req.userId; // Assuming `req.userId` is set from JWT or middleware
  const { productId } = req.params;

  try {
    // Check if the user has ordered the product
    const orders = await orderModel.find({ userId, 'items.productId': productId });

    // Check if the user has already reviewed the product
    const alreadyReviewed = await reviewModel.findOne({ userId, productId });

    // User can review if they have ordered the product and haven't reviewed yet
    const canReview = orders.length > 0 && !alreadyReviewed;

    res.status(200).json({ success: true, canReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to check review permission' });
  }
};
