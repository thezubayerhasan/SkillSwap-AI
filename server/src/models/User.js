import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    university: { type: String, trim: true },
    bio: { type: String, maxlength: 500 },
    avatarUrl: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    walletBalance: { type: Number, default: 0 },
    trustScore: { type: Number, default: 50 },
    refreshToken: { type: String, select: false },
    isVerified: { type: Boolean, default: false },
    verificationOTP: { type: String, select: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
