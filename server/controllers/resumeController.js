const Resume = require('../models/Resume');
const User = require('../models/User');
const { generateResume } = require('../services/aiService');

// @desc    Generate AI resume
// @route   POST /api/resume/generate
exports.generateResumeData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { skills, projects, education, experience } = req.body;

    const resumeData = generateResume(user, skills, projects, education, experience);

    let resume = await Resume.findOne({ userId: req.user._id });
    if (resume) {
      Object.assign(resume, resumeData);
      await resume.save();
    } else {
      resume = await Resume.create({ userId: req.user._id, ...resumeData });
    }

    res.json(resume);
  } catch (error) {
    console.error('Generate resume error:', error);
    res.status(500).json({ message: 'Error generating resume' });
  }
};

// @desc    Get user's resume
// @route   GET /api/resume
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume' });
  }
};

// @desc    Update resume
// @route   PUT /api/resume
exports.updateResume = async (req, res) => {
  try {
    let resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found. Generate one first.' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        resume[key] = updates[key];
      }
    });

    await resume.save();
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume' });
  }
};
