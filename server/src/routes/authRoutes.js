import express from 'express';
import { verifyEmail } from '../controllers/authController.js'; // Import the new email verification controller
import {
    register,
    login,
    logout,
    refreshToken,
    getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes — no token needed
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/verify-email', verifyEmail); // New route for email verification

// Protected route — requires valid access token (checked by protect middleware)
router.get('/me', protect, getMe);

export default router;
