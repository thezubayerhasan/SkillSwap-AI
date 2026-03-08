import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const creditUser = async (userId, amount, description, exchangeId = null) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.walletBalance += amount;
  await user.save({ validateBeforeSave: false });

  await Transaction.create({
    user: userId,
    type: 'credit',
    amount,
    description,
    exchange: exchangeId,
    balanceAfter: user.walletBalance,
  });

  return user.walletBalance;
};

export const debitUser = async (userId, amount, description, exchangeId = null) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  if (user.walletBalance < amount) throw new Error('Insufficient wallet balance');

  user.walletBalance -= amount;
  await user.save({ validateBeforeSave: false });

  await Transaction.create({
    user: userId,
    type: 'debit',
    amount,
    description,
    exchange: exchangeId,
    balanceAfter: user.walletBalance,
  });

  return user.walletBalance;
};
