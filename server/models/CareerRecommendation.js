const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  careers: [{
    title: { type: String, required: true },
    explanation: { type: String },
    demand: { type: String, enum: ['high', 'medium', 'low'], default: 'high' },
    trend: { type: String },
    matchScore: { type: Number, default: 0 },
    icon: { type: String, default: '💼' },
    salaryRange: { type: String },
    skills: [{ type: String }]
  }],
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CareerRecommendation', careerSchema);
