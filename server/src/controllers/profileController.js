import User from '../models/User.js';

// @route  GET /api/profile/:id
// @access Public
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -refreshToken -email');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @route  PUT /api/profile
// @access Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, university, avatarUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, university, avatarUrl },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
