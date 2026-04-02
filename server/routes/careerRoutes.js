const express = require('express');
const router = express.Router();
const { generateCareers, getCareers, selectCareer } = require('../controllers/careerController');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, generateCareers);
router.get('/', protect, getCareers);
router.put('/select', protect, selectCareer);

module.exports = router;
