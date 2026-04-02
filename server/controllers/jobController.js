const JobApplication = require('../models/JobApplication');
const Notification = require('../models/Notification');
const jobsData = require('../data/jobs');

// @desc    Get available jobs
// @route   GET /api/jobs/available
exports.getAvailableJobs = async (req, res) => {
  try {
    res.json(jobsData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

// @desc    Apply for a job (simulated)
// @route   POST /api/jobs/apply
exports.applyForJob = async (req, res) => {
  try {
    const { jobTitle, company, location, salary, description } = req.body;

    // Check for duplicate application
    const existing = await JobApplication.findOne({
      userId: req.user._id,
      jobTitle,
      company
    });
    if (existing) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    const application = await JobApplication.create({
      userId: req.user._id,
      jobTitle,
      company,
      location,
      salary,
      description,
      status: 'applied',
      matchScore: Math.floor(Math.random() * 30) + 70
    });

    // Simulate status change after a delay (in real app, this would be a cron job)
    setTimeout(async () => {
      try {
        const app = await JobApplication.findById(application._id);
        if (app && app.status === 'applied') {
          const statuses = ['reviewing', 'pending', 'interview'];
          app.status = statuses[Math.floor(Math.random() * statuses.length)];
          await app.save();

          await Notification.create({
            userId: req.user._id,
            title: `Application Update: ${jobTitle}`,
            message: `Your application at ${company} has been updated to "${app.status}".`,
            type: 'job',
            icon: '💼'
          });
        }
      } catch (err) {
        console.error('Status update error:', err);
      }
    }, 10000); // Update status after 10 seconds

    // Create notification
    await Notification.create({
      userId: req.user._id,
      title: 'Application Submitted! 💼',
      message: `You applied for "${jobTitle}" at ${company}. We'll keep you updated!`,
      type: 'job',
      icon: '📨'
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ message: 'Error applying for job' });
  }
};

// @desc    Get user's job applications
// @route   GET /api/jobs/applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

// @desc    Get application stats
// @route   GET /api/jobs/stats
exports.getJobStats = async (req, res) => {
  try {
    const applications = await JobApplication.find({ userId: req.user._id });
    const stats = {
      total: applications.length,
      applied: applications.filter(a => a.status === 'applied').length,
      reviewing: applications.filter(a => a.status === 'reviewing').length,
      pending: applications.filter(a => a.status === 'pending').length,
      interview: applications.filter(a => a.status === 'interview').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      accepted: applications.filter(a => a.status === 'accepted').length
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job stats' });
  }
};
