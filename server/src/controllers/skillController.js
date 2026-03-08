import Skill from '../models/Skill.js';

// @route  GET /api/skills
// @access Public
export const getSkills = async (req, res, next) => {
  try {
    const { category, level, search } = req.query;
    const query = { isActive: true };
    if (category) query.category = category;
    if (level) query.level = level;
    if (search) query.title = { $regex: search, $options: 'i' };

    const skills = await Skill.find(query).populate('user', 'name university avatarUrl');
    res.status(200).json({ success: true, skills });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/skills/:id
// @access Public
export const getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id).populate('user', 'name university avatarUrl trustScore');
    if (!skill) {
      res.status(404);
      throw new Error('Skill not found');
    }
    res.status(200).json({ success: true, skill });
  } catch (error) {
    next(error);
  }
};

// @route  POST /api/skills
// @access Private
export const createSkill = async (req, res, next) => {
  try {
    const { title, description, category, level, tags } = req.body;
    const skill = await Skill.create({ user: req.user._id, title, description, category, level, tags });
    res.status(201).json({ success: true, skill });
  } catch (error) {
    next(error);
  }
};

// @route  PUT /api/skills/:id
// @access Private
export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error('Skill not found');
    }
    if (skill.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this skill');
    }
    Object.assign(skill, req.body);
    await skill.save();
    res.status(200).json({ success: true, skill });
  } catch (error) {
    next(error);
  }
};

// @route  DELETE /api/skills/:id
// @access Private
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error('Skill not found');
    }
    if (skill.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this skill');
    }
    await skill.deleteOne();
    res.status(200).json({ success: true, message: 'Skill removed' });
  } catch (error) {
    next(error);
  }
};
