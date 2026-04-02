const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Progress = require('../models/Progress');
const Notification = require('../models/Notification');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Create empty progress record
    await Progress.create({ userId: user._id });

    // Create welcome notification
    await Notification.create({
      userId: user._id,
      title: 'Welcome to CareerPilot! 🚀',
      message: 'Complete your profile and take the assessment to get personalized career recommendations.',
      type: 'system',
      icon: '🎉'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        interests: user.interests,
        education: user.education,
        onboardingComplete: user.onboardingComplete,
        selectedCareer: user.selectedCareer,
        language: user.language,
        avatarColor: user.avatarColor,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, skills, interests, education, language, selectedCareer, onboardingComplete } = req.body;
    
    if (name) user.name = name;
    if (skills) user.skills = skills;
    if (interests) user.interests = interests;
    if (education) user.education = education;
    if (language) user.language = language;
    if (selectedCareer !== undefined) user.selectedCareer = selectedCareer;
    if (onboardingComplete !== undefined) user.onboardingComplete = onboardingComplete;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      skills: updatedUser.skills,
      interests: updatedUser.interests,
      education: updatedUser.education,
      onboardingComplete: updatedUser.onboardingComplete,
      selectedCareer: updatedUser.selectedCareer,
      language: updatedUser.language,
      avatarColor: updatedUser.avatarColor
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating profile' });
  }
};
