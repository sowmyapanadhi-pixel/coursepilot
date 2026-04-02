const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roadmapSteps: [{
    title: { type: String },
    description: { type: String },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    order: { type: Number }
  }],
  coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  coursesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  lessonsCompleted: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    lessonIndex: { type: Number }
  }],
  evaluations: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    explanation: { type: String },
    aiScore: { type: Number },
    feedback: { type: String },
    evaluatedAt: { type: Date, default: Date.now }
  }],
  overallScore: { type: Number, default: 0 },
  skillScores: {
    type: Map,
    of: Number,
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
