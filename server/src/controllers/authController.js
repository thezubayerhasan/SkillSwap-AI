import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../middleware/Email.js';

// ─── Helper: send refresh token as httpOnly cookie ────────────────────────────
// httpOnly = JS cannot read it (XSS-safe)
// sameSite = CSRF protection
const sendRefreshTokenCookie = (res, token) => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
};

// ─── @route  POST /api/auth/register ─────────────────────────────────────────
// @desc   Create a new user account
// @access Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password, university } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error('An account with this email already exists');
        }

        // Create user (password hashed by User model pre-save hook)
        const user = await User.create({ name, email, password, university });

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token to DB so we can invalidate it on logout
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        user.verificationOTP = otp;
        await user.save({ validateBeforeSave: false });
        await sendVerificationEmail(user.email, otp);
        // Send refresh token in cookie, access token in response body
        sendRefreshTokenCookie(res, refreshToken);
        res.status(201).json({
            success: true,
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                role: user.role,
                walletBalance: user.walletBalance,
            },
        });
    } catch (error) {
        next(error);
    }
};

// ─── @route  POST /api/auth/login ─────────────────────────────────────────────
// @desc   Authenticate user and return tokens
// @access Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('Please provide email and password');
        }


        // Find user and explicitly include password (it's excluded by default)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Only allow login if user is verified
        if (!user.isVerified) {
            res.status(401);
            throw new Error('Account not verified. Please check your email for the OTP.');
        }

        // Compare entered password with hashed password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token to DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        sendRefreshTokenCookie(res, refreshToken);

        res.status(200).json({
            success: true,
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                role: user.role,
                walletBalance: user.walletBalance,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
};

// ─── @route  POST /api/auth/logout ────────────────────────────────────────────
// @desc   Clear tokens and log user out
// @access Private
export const logout = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;

        if (token) {
            // Remove refresh token from DB so it can't be reused
            await User.findOneAndUpdate(
                { refreshToken: token },
                { $unset: { refreshToken: '' } }
            );
        }

        // Clear the cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

// ─── @route  POST /api/auth/refresh-token ─────────────────────────────────────
// @desc   Issue a new access token using the refresh token cookie
// @access Public (uses cookie)
export const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;

        if (!token) {
            res.status(401);
            throw new Error('No refresh token, please log in again');
        }

        // Verify the refresh token is valid
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch {
            res.status(401);
            throw new Error('Refresh token expired, please log in again');
        }

        // Make sure this token is still stored in DB (not logged out)
        const user = await User.findOne({ _id: decoded.id, refreshToken: token });
        if (!user) {
            res.status(401);
            throw new Error('Invalid refresh token');
        }

        // Issue a new access token
        const newAccessToken = generateAccessToken(user._id);

        res.status(200).json({ success: true, accessToken: newAccessToken });
    } catch (error) {
        next(error);
    }
};

// ─── @route  GET /api/auth/me ─────────────────────────────────────────────────
// @desc   Get currently logged-in user's profile
// @access Private (requires valid access token)
export const getMe = async (req, res, next) => {
    try {
        // req.user is set by the protect middleware
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                role: user.role,
                walletBalance: user.walletBalance,
                trustScore: user.trustScore,
                avatarUrl: user.avatarUrl,
                bio: user.bio,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const verifyEmail = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            res.status(400);
            throw new Error('Email and OTP required');
        }
        const user = await User.findOne({ email }).select('+verificationOTP');
        if (!user || user.verificationOTP !== otp) {
            res.status(400);
            throw new Error('Invalid OTP');
        }
        user.isVerified = true;
        user.verificationOTP = undefined;
        await user.save();
        res.status(200).json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500);
        throw new Error('Server error during email verification');
    }
}
