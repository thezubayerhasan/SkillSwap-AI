import express from 'express';
import {
  getExchanges,
  getExchangeById,
  createExchange,
  updateExchangeStatus,
} from '../controllers/exchangeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getExchanges);
router.get('/:id', protect, getExchangeById);
router.post('/', protect, createExchange);
router.patch('/:id/status', protect, updateExchangeStatus);

export default router;
