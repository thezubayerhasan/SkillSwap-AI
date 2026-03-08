import Review from '../models/Review.js';
import Exchange from '../models/Exchange.js';
import User from '../models/User.js';

/**
 * Recompute and save a user's trust score based on:
 * - Average review rating (0–100 scale)
 * - Number of completed exchanges
 */
export const computeTrustScore = async (userId) => {
  const reviews = await Review.find({ reviewee: userId });
  const completedExchanges = await Exchange.countDocuments({
    $or: [{ requester: userId }, { provider: userId }],
    status: 'completed',
  });

  let score = 50; // base score

  if (reviews.length > 0) {
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    score = Math.round(avgRating * 20); // 1–5 → 20–100
  }

  // Bonus for activity
  score = Math.min(100, score + Math.min(completedExchanges * 2, 20));

  await User.findByIdAndUpdate(userId, { trustScore: score });
  return score;
};
