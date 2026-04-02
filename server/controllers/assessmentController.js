const Assessment = require('../models/Assessment');
const User = require('../models/User');
const { generateAssessmentQuestions, evaluateAssessment } = require('../services/aiService');

// @desc    Start a new assessment
// @route   POST /api/assessment/start
exports.startAssessment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const questions = generateAssessmentQuestions(user.skills, user.interests);

    const assessment = await Assessment.create({
      userId: req.user._id,
      questions,
      status: 'in_progress',
      totalQuestions: questions.length
    });

    res.status(201).json({
      _id: assessment._id,
      questions: questions.map((q, i) => ({
        index: i,
        question: q.question,
        options: q.options,
        category: q.category,
        difficulty: q.difficulty
      })),
      totalQuestions: questions.length
    });
  } catch (error) {
    console.error('Start assessment error:', error);
    res.status(500).json({ message: 'Error starting assessment' });
  }
};

// @desc    Submit assessment responses
// @route   POST /api/assessment/:id/submit
exports.submitAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    const { responses } = req.body;

    // Evaluate responses
    const processedResponses = responses.map(r => ({
      questionIndex: r.questionIndex,
      selectedAnswer: r.selectedAnswer,
      isCorrect: assessment.questions[r.questionIndex]?.correctAnswer === r.selectedAnswer
    }));

    const evaluation = evaluateAssessment(assessment.questions, processedResponses);

    assessment.responses = processedResponses;
    assessment.score = evaluation.score;
    assessment.strengths = evaluation.strengths;
    assessment.weaknesses = evaluation.weaknesses;
    assessment.status = 'completed';
    assessment.completedAt = new Date();

    await assessment.save();

    res.json({
      score: evaluation.score,
      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      totalQuestions: assessment.totalQuestions,
      correctAnswers: processedResponses.filter(r => r.isCorrect).length,
      responses: processedResponses
    });
  } catch (error) {
    console.error('Submit assessment error:', error);
    res.status(500).json({ message: 'Error submitting assessment' });
  }
};

// @desc    Get user's latest assessment
// @route   GET /api/assessment/latest
exports.getLatestAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 });

    if (!assessment) {
      return res.json(null);
    }

    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assessment' });
  }
};

// @desc    Get all assessments
// @route   GET /api/assessment/history
exports.getAssessmentHistory = async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assessment history' });
  }
};
