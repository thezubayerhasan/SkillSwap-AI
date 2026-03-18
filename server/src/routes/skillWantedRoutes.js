import express from 'express';
import {
  getMySkillsWanted,
  getAllSkillsWanted,
  getSkillWantedById,
  createSkillWanted,
  updateSkillWanted,
  deleteSkillWanted,
} from '../controllers/skillWantedController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMySkillsWanted);
router.get('/all', getAllSkillsWanted);
router.get('/:id', getSkillWantedById);
router.post('/', protect, createSkillWanted);
router.put('/:id', protect, updateSkillWanted);
router.delete('/:id', protect, deleteSkillWanted);

export default router;