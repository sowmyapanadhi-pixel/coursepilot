const express = require('express');
const router = express.Router();
const { generateResumeData, getResume, updateResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, generateResumeData);
router.get('/', protect, getResume);
router.put('/', protect, updateResume);

module.exports = router;
