import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// @route  GET /api/wallet
// @access Private
export const getWallet = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('walletBalance');
    res.status(200).json({ success: true, balance: user.walletBalance });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/wallet/transactions
// @access Private
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    next(error);
  }
};
