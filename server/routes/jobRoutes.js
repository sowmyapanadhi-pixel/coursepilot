const express = require('express');
const router = express.Router();
const { getAvailableJobs, applyForJob, getApplications, getJobStats } = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

router.get('/available', protect, getAvailableJobs);
router.post('/apply', protect, applyForJob);
router.get('/applications', protect, getApplications);
router.get('/stats', protect, getJobStats);

module.exports = router;
