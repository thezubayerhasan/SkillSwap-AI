import Skill from '../models/Skill.js';
import SkillWanted from '../models/SkillWanted.js';
import User from '../models/User.js';

// @route  GET /api/matches
// @access Private
export const getMatches = async (req, res, next) => {
  try {
    const mySkills = await Skill.find({ user: req.user._id, isActive: true });
    const myWanted = await SkillWanted.find({ user: req.user._id });

    const mySkillTitles = mySkills.map(s => s.title.toLowerCase());
    const myWantedTitles = myWanted.map(w => w.title.toLowerCase());

    // Find users who have skills I want and want skills I have
    const candidates = await User.find({ _id: { $ne: req.user._id } }).select('name university avatarUrl trustScore');

    const matches = [];
    for (const candidate of candidates) {
      const theirSkills = await Skill.find({ user: candidate._id, isActive: true });
      const theirWanted = await SkillWanted.find({ user: candidate._id });

      const theyHaveWhatIWant = theirSkills.some(s => myWantedTitles.includes(s.title.toLowerCase()));
      const iHaveWhatTheyWant = theirWanted.some(w => mySkillTitles.includes(w.title.toLowerCase()));

      if (theyHaveWhatIWant || iHaveWhatTheyWant) {
        matches.push({ user: candidate, theyHaveWhatIWant, iHaveWhatTheyWant });
      }
    }

    res.status(200).json({ success: true, matches });
  } catch (error) {
    next(error);
  }
};
