const CareerRecommendation = require('../models/CareerRecommendation');
const Assessment = require('../models/Assessment');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { generateCareerRecommendations } = require('../services/aiService');

// @desc    Generate career recommendations
// @route   POST /api/careers/generate
exports.generateCareers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const latestAssessment = await Assessment.findOne({ userId: req.user._id, status: 'completed' })
      .sort({ createdAt: -1 });

    const strengths = latestAssessment ? latestAssessment.strengths : [];
    const careers = generateCareerRecommendations(user.skills, user.interests, strengths);

    // Save or update careers
    let careerRec = await CareerRecommendation.findOne({ userId: req.user._id });
    if (careerRec) {
      careerRec.careers = careers;
      careerRec.generatedAt = new Date();
      await careerRec.save();
    } else {
      careerRec = await CareerRecommendation.create({
        userId: req.user._id,
        careers
      });
    }

    // Create notification
    await Notification.create({
      userId: req.user._id,
      title: 'Career Recommendations Ready! 🎯',
      message: `We found ${careers.length} career paths that match your profile. Check them out!`,
      type: 'career',
      icon: '🎯'
    });

    res.json(careerRec);
  } catch (error) {
    console.error('Generate careers error:', error);
    res.status(500).json({ message: 'Error generating career recommendations' });
  }
};

// @desc    Get user's career recommendations
// @route   GET /api/careers
exports.getCareers = async (req, res) => {
  try {
    const careerRec = await CareerRecommendation.findOne({ userId: req.user._id });
    res.json(careerRec || { careers: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching careers' });
  }
};

// @desc    Select a career
// @route   PUT /api/careers/select
exports.selectCareer = async (req, res) => {
  try {
    const { careerTitle } = req.body;
    const user = await User.findById(req.user._id);
    user.selectedCareer = careerTitle;
    await user.save();

    res.json({ message: 'Career selected successfully', selectedCareer: careerTitle });
  } catch (error) {
    res.status(500).json({ message: 'Error selecting career' });
  }
};
