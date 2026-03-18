import express from 'express';
import {
    register,
    login,
    logout,
    refreshToken,
    getMe,
    verifyEmail,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes — no token needed
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

// OTP verification
router.post('/verify-otp', verifyEmail);

// Protected route — requires valid access token (checked by protect middleware)
router.get('/me', protect, getMe);

export default router;
