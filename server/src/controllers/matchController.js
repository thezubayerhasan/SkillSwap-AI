import { computeMatches } from '../services/matchingService.js';

// @route  GET /api/matches
// @access Private
export const getMatches = async (req, res, next) => {
  try {
    const matches = await computeMatches(req.user._id);
    res.status(200).json({ success: true, matches });
  } catch (error) {
    next(error);
  }
};
