const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  skills: [{ type: String }],
  interests: [{ type: String }],
  education: {
    level: { type: String, enum: ['high_school', 'bachelors', 'masters', 'phd', 'other'], default: 'bachelors' },
    field: { type: String, default: '' },
    institution: { type: String, default: '' }
  },
  language: { type: String, enum: ['en', 'te'], default: 'en' },
  onboardingComplete: { type: Boolean, default: false },
  selectedCareer: { type: String, default: '' },
  avatarColor: { type: String, default: '#6366f1' }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
