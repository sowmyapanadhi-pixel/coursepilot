const express = require('express');
const router = express.Router();
const { getProgress, updateRoadmap, toggleRoadmapStep, generateRoadmap, updateSkillScores } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getProgress);
router.put('/roadmap', protect, updateRoadmap);
router.put('/roadmap/:stepIndex/toggle', protect, toggleRoadmapStep);
router.post('/generate-roadmap', protect, generateRoadmap);
router.put('/skills', protect, updateSkillScores);

module.exports = router;
