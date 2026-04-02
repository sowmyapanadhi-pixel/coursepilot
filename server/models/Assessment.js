const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: Number },
  category: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] }
});

const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [questionSchema],
  responses: [{
    questionIndex: Number,
    selectedAnswer: Number,
    isCorrect: Boolean
  }],
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);
