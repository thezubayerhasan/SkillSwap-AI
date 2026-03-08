import Exchange from '../models/Exchange.js';

// @route  GET /api/exchanges
// @access Private
export const getExchanges = async (req, res, next) => {
  try {
    const exchanges = await Exchange.find({
      $or: [{ requester: req.user._id }, { provider: req.user._id }],
    })
      .populate('requester', 'name avatarUrl')
      .populate('provider', 'name avatarUrl')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, exchanges });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/exchanges/:id
// @access Private
export const getExchangeById = async (req, res, next) => {
  try {
    const exchange = await Exchange.findById(req.params.id)
      .populate('requester', 'name avatarUrl trustScore')
      .populate('provider', 'name avatarUrl trustScore');

    if (!exchange) {
      res.status(404);
      throw new Error('Exchange not found');
    }

    const isParticipant =
      exchange.requester._id.toString() === req.user._id.toString() ||
      exchange.provider._id.toString() === req.user._id.toString();

    if (!isParticipant) {
      res.status(403);
      throw new Error('Not authorized to view this exchange');
    }

    res.status(200).json({ success: true, exchange });
  } catch (error) {
    next(error);
  }
};

// @route  POST /api/exchanges
// @access Private
export const createExchange = async (req, res, next) => {
  try {
    const { provider, skillOffered, skillWanted, notes } = req.body;
    const exchange = await Exchange.create({
      requester: req.user._id,
      provider,
      skillOffered,
      skillWanted,
      notes,
    });
    res.status(201).json({ success: true, exchange });
  } catch (error) {
    next(error);
  }
};

// @route  PATCH /api/exchanges/:id/status
// @access Private
export const updateExchangeStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const exchange = await Exchange.findById(req.params.id);

    if (!exchange) {
      res.status(404);
      throw new Error('Exchange not found');
    }

    const isParticipant =
      exchange.requester.toString() === req.user._id.toString() ||
      exchange.provider.toString() === req.user._id.toString();

    if (!isParticipant) {
      res.status(403);
      throw new Error('Not authorized');
    }

    exchange.status = status;
    if (status === 'completed') exchange.completedAt = new Date();
    await exchange.save();

    res.status(200).json({ success: true, exchange });
  } catch (error) {
    next(error);
  }
};
