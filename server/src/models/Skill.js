import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 1000 },
    category: { type: String, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
