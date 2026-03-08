import express from 'express';
import { getUsers, getUserById, deleteUser } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect, roleMiddleware('admin'));

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);

export default router;
