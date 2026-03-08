import Skill from '../models/Skill.js';
import SkillWanted from '../models/SkillWanted.js';

/**
 * Find users whose offered skills match the requesting user's wanted skills,
 * and whose wanted skills match the requesting user's offered skills.
 */
export const computeMatches = async (userId) => {
  const mySkills = await Skill.find({ user: userId, isActive: true });
  const myWanted = await SkillWanted.find({ user: userId });

  const mySkillTitles = mySkills.map(s => s.title.toLowerCase());
  const myWantedTitles = myWanted.map(w => w.title.toLowerCase());

  // Find all other users with skills
  const allSkills = await Skill.find({ user: { $ne: userId }, isActive: true }).populate('user', 'name avatarUrl trustScore');

  const matchMap = new Map();
  for (const skill of allSkills) {
    const userId = skill.user._id.toString();
    if (!matchMap.has(userId)) {
      matchMap.set(userId, { user: skill.user, matchScore: 0, theirSkills: [] });
    }
    const entry = matchMap.get(userId);
    entry.theirSkills.push(skill.title.toLowerCase());
    if (myWantedTitles.includes(skill.title.toLowerCase())) {
      entry.matchScore += 50;
    }
  }

  const allWanted = await SkillWanted.find({ user: { $ne: userId } });
  for (const wanted of allWanted) {
    const uid = wanted.user.toString();
    if (matchMap.has(uid) && mySkillTitles.includes(wanted.title.toLowerCase())) {
      matchMap.get(uid).matchScore += 50;
    }
  }

  return [...matchMap.values()]
    .filter(m => m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
};
