import SkillWanted from '../models/SkillWanted.js';

// @route  GET /api/skills-wanted
// @access Private — returns the current user's wanted skills
export const getMySkillsWanted = async (req, res, next) => {
  try {
    const wanted = await SkillWanted.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, skillsWanted: wanted });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/skills-wanted/all
// @access Public — returns all wanted skills
export const getAllSkillsWanted = async (req, res, next) => {
  try {
    const { category, urgency, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (urgency) query.urgency = urgency;
    if (search) query.title = { $regex: search, $options: 'i' };

    const wanted = await SkillWanted.find(query)
      .populate('user', 'name university avatarUrl')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, skillsWanted: wanted });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/skills-wanted/:id
// @access Public
export const getSkillWantedById = async (req, res, next) => {
  try {
    const wanted = await SkillWanted.findById(req.params.id).populate(
      'user',
      'name university avatarUrl'
    );

    if (!wanted) {
      res.status(404);
      throw new Error('Skill wanted not found');
    }

    res.status(200).json({ success: true, skillWanted: wanted });
  } catch (error) {
    next(error);
  }
};

// @route  POST /api/skills-wanted
// @access Private
export const createSkillWanted = async (req, res, next) => {
  try {
    const { title, description, category, urgency } = req.body;

    const wanted = await SkillWanted.create({
      user: req.user._id,
      title,
      description,
      category,
      urgency,
    });

    res.status(201).json({ success: true, skillWanted: wanted });
  } catch (error) {
    next(error);
  }
};

// @route  PUT /api/skills-wanted/:id
// @access Private
export const updateSkillWanted = async (req, res, next) => {
  try {
    const wanted = await SkillWanted.findById(req.params.id);

    if (!wanted) {
      res.status(404);
      throw new Error('Skill wanted not found');
    }

    if (wanted.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this skill wanted');
    }

    const { title, description, category, urgency } = req.body;

    if (title !== undefined) wanted.title = title;
    if (description !== undefined) wanted.description = description;
    if (category !== undefined) wanted.category = category;
    if (urgency !== undefined) wanted.urgency = urgency;

    await wanted.save();

    res.status(200).json({ success: true, skillWanted: wanted });
  } catch (error) {
    next(error);
  }
};

// @route  DELETE /api/skills-wanted/:id
// @access Private
export const deleteSkillWanted = async (req, res, next) => {
  try {
    const wanted = await SkillWanted.findById(req.params.id);

    if (!wanted) {
      res.status(404);
      throw new Error('Skill wanted not found');
    }

    if (wanted.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this skill wanted');
    }

    await wanted.deleteOne();

    res.status(200).json({ success: true, message: 'Skill wanted removed' });
  } catch (error) {
    next(error);
  }
};