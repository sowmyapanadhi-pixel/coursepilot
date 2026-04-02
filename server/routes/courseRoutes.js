const express = require('express');
const router = express.Router();
const { getCourses, getCourse, enrollCourse, completeLesson, submitEvaluation, getEnrolledCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

router.get('/enrolled', protect, getEnrolledCourses);
router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/:id/enroll', protect, enrollCourse);
router.post('/:id/lesson/:lessonIndex/complete', protect, completeLesson);
router.post('/:id/evaluate', protect, submitEvaluation);

module.exports = router;
