const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    name: { type: String },
    email: { type: String },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' }
  },
  summary: { type: String, default: '' },
  skills: [{ type: String }],
  education: [{
    degree: { type: String },
    institution: { type: String },
    year: { type: String },
    gpa: { type: String, default: '' }
  }],
  experience: [{
    title: { type: String },
    company: { type: String },
    duration: { type: String },
    description: { type: String }
  }],
  projects: [{
    name: { type: String },
    description: { type: String },
    technologies: [{ type: String }],
    link: { type: String, default: '' }
  }],
  certifications: [{ type: String }],
  generatedContent: { type: String, default: '' },
  template: { type: String, enum: ['modern', 'classic', 'minimal'], default: 'modern' }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
