require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const coursesData = require('./data/courses');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses');

    // Insert courses
    await Course.insertMany(coursesData);
    console.log(`📚 Seeded ${coursesData.length} courses`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();
