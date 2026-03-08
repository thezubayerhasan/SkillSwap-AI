import Review from '../models/Review.js';
import User from '../models/User.js';

// @route  GET /api/reviews/:userId
// @access Public
export const getReviewsForUser = async (req, res, next) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate('reviewer', 'name avatarUrl')
      .sort({ createdAt: -1 });

    const avgRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.status(200).json({ success: true, reviews, avgRating: Math.round(avgRating * 10) / 10 });
  } catch (error) {
    next(error);
  }
};

// @route  POST /api/reviews
// @access Private
export const createReview = async (req, res, next) => {
  try {
    const { reviewee, exchange, rating, comment } = req.body;

    const existing = await Review.findOne({ reviewer: req.user._id, exchange });
    if (existing) {
      res.status(400);
      throw new Error('You have already reviewed this exchange');
    }

    const review = await Review.create({
      reviewer: req.user._id,
      reviewee,
      exchange,
      rating,
      comment,
    });

    // Update trust score (simple average)
    const allReviews = await Review.find({ reviewee });
    const newScore = Math.round(allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length * 20);
    await User.findByIdAndUpdate(reviewee, { trustScore: newScore });

    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};
