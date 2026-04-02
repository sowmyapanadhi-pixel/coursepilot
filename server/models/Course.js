const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  platform: { type: String, enum: ['Udemy', 'Coursera', 'edX', 'YouTube', 'LinkedIn Learning', 'FreeCodeCamp'], default: 'Udemy' },
  duration: { type: String },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  category: { type: String },
  careerPath: { type: String },
  imageUrl: { type: String, default: '' },
  rating: { type: Number, default: 4.5 },
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lessons: [{
    title: { type: String },
    videoUrl: { type: String },
    duration: { type: String },
    order: { type: Number }
  }],
  price: { type: String, default: 'Free' },
  instructor: { type: String, default: 'CareerPilot Academy' }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
