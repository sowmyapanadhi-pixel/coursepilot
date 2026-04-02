const { getChatbotResponse } = require('../services/aiService');

// @desc    Send message to chatbot
// @route   POST /api/chatbot
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const userContext = {
      name: req.user?.name || 'User',
      skills: req.user?.skills || [],
      selectedCareer: req.user?.selectedCareer || ''
    };

    const response = getChatbotResponse(message, userContext);

    res.json({
      message: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ message: 'Error processing chat message' });
  }
};
