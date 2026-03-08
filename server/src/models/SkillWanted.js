import mongoose from 'mongoose';

const skillWantedSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 500 },
    category: { type: String },
    urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  },
  { timestamps: true }
);

const SkillWanted = mongoose.model('SkillWanted', skillWantedSchema);
export default SkillWanted;
