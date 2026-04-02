const Course = require('../models/Course');
const Progress = require('../models/Progress');
const Notification = require('../models/Notification');
const { evaluateUnderstanding } = require('../services/aiService');

// @desc    Get all courses
// @route   GET /api/courses
exports.getCourses = async (req, res) => {
  try {
    const { category, difficulty, careerPath } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (careerPath) filter.careerPath = { $regex: careerPath, $options: 'i' };

    const courses = await Course.find(filter);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course' });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if already enrolled
    if (course.enrolledUsers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolledUsers.push(req.user._id);
    await course.save();

    // Update progress
    let progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }
    if (!progress.coursesEnrolled.includes(course._id)) {
      progress.coursesEnrolled.push(course._id);
      await progress.save();
    }

    // Create notification
    await Notification.create({
      userId: req.user._id,
      title: 'Enrolled Successfully! 📚',
      message: `You've enrolled in "${course.title}". Start learning now!`,
      type: 'course',
      icon: '📚'
    });

    res.json({ message: 'Enrolled successfully', course });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: 'Error enrolling in course' });
  }
};

// @desc    Mark lesson as complete
// @route   POST /api/courses/:id/lesson/:lessonIndex/complete
exports.completeLesson = async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }

    const lessonEntry = {
      courseId: req.params.id,
      lessonIndex: parseInt(req.params.lessonIndex)
    };

    // Check if already completed
    const alreadyComplete = progress.lessonsCompleted.some(
      l => l.courseId.toString() === req.params.id && l.lessonIndex === lessonEntry.lessonIndex
    );

    if (!alreadyComplete) {
      progress.lessonsCompleted.push(lessonEntry);
      await progress.save();
    }

    // Check if all lessons in course are complete
    const course = await Course.findById(req.params.id);
    if (course) {
      const completedInCourse = progress.lessonsCompleted.filter(
        l => l.courseId.toString() === req.params.id
      ).length;

      if (completedInCourse >= course.lessons.length) {
        if (!progress.coursesCompleted.includes(course._id)) {
          progress.coursesCompleted.push(course._id);
          await progress.save();

          await Notification.create({
            userId: req.user._id,
            title: 'Course Completed! 🎉',
            message: `Congratulations! You completed "${course.title}".`,
            type: 'course',
            icon: '🏆'
          });
        }
      }
    }

    res.json({ message: 'Lesson marked as complete', progress });
  } catch (error) {
    res.status(500).json({ message: 'Error completing lesson' });
  }
};

// @desc    Submit evaluation for a course module
// @route   POST /api/courses/:id/evaluate
exports.submitEvaluation = async (req, res) => {
  try {
    const { explanation, topic } = req.body;
    const evaluation = evaluateUnderstanding(explanation, topic);

    let progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }

    progress.evaluations.push({
      courseId: req.params.id,
      explanation,
      aiScore: evaluation.score,
      feedback: evaluation.feedback
    });

    // Update overall score
    const avgScore = progress.evaluations.reduce((sum, e) => sum + e.aiScore, 0) / progress.evaluations.length;
    progress.overallScore = Math.round(avgScore);

    await progress.save();

    res.json({ score: evaluation.score, feedback: evaluation.feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating' });
  }
};

// @desc    Get enrolled courses for user
// @route   GET /api/courses/enrolled
exports.getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({ enrolledUsers: req.user._id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrolled courses' });
  }
};
