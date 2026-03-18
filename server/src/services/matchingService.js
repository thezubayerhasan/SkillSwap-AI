import Skill from '../models/Skill.js';
import SkillWanted from '../models/SkillWanted.js';
import User from '../models/User.js';

export const computeMatches = async (userId) => {
  const mySkills = await Skill.find({ user: userId, isActive: true });
  const myWanted = await SkillWanted.find({ user: userId });

  if (mySkills.length === 0 && myWanted.length === 0) {
    return [];
  }

  const mySkillTitles = mySkills.map(s => s.title.toLowerCase());
  const myWantedTitles = myWanted.map(w => w.title.toLowerCase());

  // Fetch all other users' data
  const otherUsers = await User.find({ _id: { $ne: userId } })
    .select('name university avatarUrl trustScore');

  const results = [];

  for (const candidate of otherUsers) {
    const theirSkills = await Skill.find({ user: candidate._id, isActive: true });
    const theirWanted = await SkillWanted.find({ user: candidate._id });

    let matchScore = 0;
    const matchedSkills = [];
    const matchedNeeds = [];

    // Checking: they have skills I want
    const theyHaveWhatIWant = theirSkills.some(s => {
      const isMatch = myWantedTitles.includes(s.title.toLowerCase());
      if (isMatch) {
        matchScore += 50;
        matchedSkills.push(s.title);
        // Level bonus
        if (s.level === 'intermediate' || s.level === 'advanced') matchScore += 5;
      }
      return isMatch;
    });

    // Checking: I have skills they want
    const iHaveWhatTheyWant = theirWanted.some(w => {
      const isMatch = mySkillTitles.includes(w.title.toLowerCase());
      if (isMatch) {
        matchScore += 50;
        matchedNeeds.push(w.title);
      }
      return isMatch;
    });

    if (matchScore === 0) continue;

    // Mutual match bonus
    if (theyHaveWhatIWant && iHaveWhatTheyWant) {
      matchScore += 10;
    }

    // Trust score bonus (0–10 points)
    if (candidate.trustScore) {
      matchScore += Math.round(candidate.trustScore / 10);
    }

    results.push({
      user: candidate,
      matchScore,
      theyHaveWhatIWant,
      iHaveWhatTheyWant,
      matchedSkills,
      matchedNeeds,
    });
  }

  // Sort by score descending
  return results.sort((a, b) => b.matchScore - a.matchScore);
};
