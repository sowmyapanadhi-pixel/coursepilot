const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  salary: { type: String, default: '' },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['applied', 'pending', 'reviewing', 'interview', 'rejected', 'accepted'],
    default: 'applied'
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  matchScore: { type: Number, default: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
