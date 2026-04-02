const express = require('express');
const router = express.Router();
const { startAssessment, submitAssessment, getLatestAssessment, getAssessmentHistory } = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');

router.post('/start', protect, startAssessment);
router.post('/:id/submit', protect, submitAssessment);
router.get('/latest', protect, getLatestAssessment);
router.get('/history', protect, getAssessmentHistory);

module.exports = router;
