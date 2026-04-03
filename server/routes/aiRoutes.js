const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

/**
 * AI Routes
 * These routes provide advanced AI-driven functionality across the platform
 */

// Generate assessment questions
router.post('/assessment/generate', aiController.generateAssessment);

// Generate career recommendations
router.post('/careers/generate', aiController.generateCareers);

// Evaluate individual learning answers
router.post('/learning/evaluate', aiController.evaluateLearning);

// Generate a tailored learning roadmap
router.post('/roadmap/generate', aiController.generateRoadmap);

module.exports = router;
