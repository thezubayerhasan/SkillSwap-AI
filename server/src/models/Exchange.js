import mongoose from 'mongoose';

const exchangeSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skillOffered: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    skillWanted: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'disputed'],
      default: 'pending',
    },
    creditsTransferred: { type: Number, default: 0 },
    completedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

const Exchange = mongoose.model('Exchange', exchangeSchema);
export default Exchange;
