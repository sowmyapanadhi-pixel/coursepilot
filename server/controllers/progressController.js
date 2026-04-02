const Progress = require('../models/Progress');
const User = require('../models/User');

// @desc    Get user progress
// @route   GET /api/progress
exports.getProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user._id })
      .populate('coursesEnrolled')
      .populate('coursesCompleted');
    
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
};

// @desc    Update roadmap steps
// @route   PUT /api/progress/roadmap
exports.updateRoadmap = async (req, res) => {
  try {
    const { roadmapSteps } = req.body;
    let progress = await Progress.findOne({ userId: req.user._id });
    
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }

    progress.roadmapSteps = roadmapSteps;
    await progress.save();

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error updating roadmap' });
  }
};

// @desc    Toggle roadmap step completion
// @route   PUT /api/progress/roadmap/:stepIndex/toggle
exports.toggleRoadmapStep = async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const stepIndex = parseInt(req.params.stepIndex);
    if (progress.roadmapSteps[stepIndex]) {
      progress.roadmapSteps[stepIndex].completed = !progress.roadmapSteps[stepIndex].completed;
      if (progress.roadmapSteps[stepIndex].completed) {
        progress.roadmapSteps[stepIndex].completedAt = new Date();
      } else {
        progress.roadmapSteps[stepIndex].completedAt = null;
      }
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling step' });
  }
};

// @desc    Generate roadmap based on career
// @route   POST /api/progress/generate-roadmap
exports.generateRoadmap = async (req, res) => {
  try {
    const { career } = req.body;
    let progress = await Progress.findOne({ userId: req.user._id });
    
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }

    // Generate roadmap based on career path
    const roadmaps = {
      'Full Stack Developer': [
        { title: 'Learn HTML & CSS Fundamentals', description: 'Master the building blocks of web development', order: 1 },
        { title: 'Master JavaScript ES6+', description: 'Learn modern JavaScript including async/await, destructuring, and modules', order: 2 },
        { title: 'Learn React.js', description: 'Build interactive UIs with components, hooks, and state management', order: 3 },
        { title: 'Study Node.js & Express', description: 'Build server-side applications and REST APIs', order: 4 },
        { title: 'Learn Database (MongoDB)', description: 'Understand NoSQL databases, queries, and data modeling', order: 5 },
        { title: 'Build Full Stack Projects', description: 'Combine frontend and backend skills in real projects', order: 6 },
        { title: 'Learn Git & Deployment', description: 'Version control and deploying to cloud platforms', order: 7 },
        { title: 'Practice DSA & System Design', description: 'Prepare for technical interviews', order: 8 }
      ],
      'Data Scientist': [
        { title: 'Learn Python Programming', description: 'Master Python syntax, data structures, and OOP', order: 1 },
        { title: 'Statistics & Mathematics', description: 'Learn probability, statistics, and linear algebra', order: 2 },
        { title: 'Data Analysis with Pandas', description: 'Clean, transform, and analyze datasets', order: 3 },
        { title: 'Data Visualization', description: 'Create charts and dashboards with Matplotlib and Seaborn', order: 4 },
        { title: 'Machine Learning Basics', description: 'Learn supervised and unsupervised learning algorithms', order: 5 },
        { title: 'Deep Learning', description: 'Neural networks, CNNs, RNNs with TensorFlow/PyTorch', order: 6 },
        { title: 'Work on Real Datasets', description: 'Kaggle competitions and real-world projects', order: 7 },
        { title: 'Build Portfolio & Resume', description: 'Showcase your data science projects', order: 8 }
      ],
      'UX/UI Designer': [
        { title: 'Learn Design Principles', description: 'Color theory, typography, layout, and visual hierarchy', order: 1 },
        { title: 'Master Figma', description: 'Learn the industry-standard design tool', order: 2 },
        { title: 'User Research Methods', description: 'Interviews, surveys, and usability testing', order: 3 },
        { title: 'Wireframing & Prototyping', description: 'Create low and high-fidelity prototypes', order: 4 },
        { title: 'Design Systems', description: 'Build reusable component libraries', order: 5 },
        { title: 'Learn Basic HTML/CSS', description: 'Understand development constraints', order: 6 },
        { title: 'Build Design Portfolio', description: 'Showcase 3-5 case studies', order: 7 },
        { title: 'Practice Design Challenges', description: 'Daily UI challenges and redesign exercises', order: 8 }
      ],
      'default': [
        { title: 'Identify Your Interests', description: 'Explore different tech domains and find your passion', order: 1 },
        { title: 'Learn Programming Basics', description: 'Start with Python or JavaScript fundamentals', order: 2 },
        { title: 'Take Online Courses', description: 'Enroll in structured courses on platforms like Coursera', order: 3 },
        { title: 'Build Small Projects', description: 'Apply your knowledge in hands-on projects', order: 4 },
        { title: 'Join Communities', description: 'Connect with peers on GitHub, Discord, and LinkedIn', order: 5 },
        { title: 'Contribute to Open Source', description: 'Collaborate on real-world projects', order: 6 },
        { title: 'Build Portfolio', description: 'Showcase your best work online', order: 7 },
        { title: 'Prepare for Interviews', description: 'Practice coding challenges and mock interviews', order: 8 }
      ]
    };

    const steps = roadmaps[career] || roadmaps['default'];
    progress.roadmapSteps = steps.map(s => ({ ...s, completed: false }));
    await progress.save();

    res.json(progress);
  } catch (error) {
    console.error('Generate roadmap error:', error);
    res.status(500).json({ message: 'Error generating roadmap' });
  }
};

// @desc    Update skill scores
// @route   PUT /api/progress/skills
exports.updateSkillScores = async (req, res) => {
  try {
    const { skillScores } = req.body;
    let progress = await Progress.findOne({ userId: req.user._id });
    
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }

    progress.skillScores = new Map(Object.entries(skillScores));
    await progress.save();

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill scores' });
  }
};
