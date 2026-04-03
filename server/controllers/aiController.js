const openaiService = require('../services/openaiService');

const aiController = {
  
  /**
   * Generates assessment questions for specific user profile 
   * @route POST /api/ai/assessment/generate
   */
  async generateAssessment(req, res) {
    try {
      const userData = req.body;
      const data = await openaiService.generateAssessmentQuestions(userData);
      res.json(data.questions);
    } catch (error) {
      console.error("AI Controller Error (assessment):", error);
      res.status(500).json({ message: "Failed to generate AI assessment questions", error: error.message });
    }
  },

  /**
   * Generates tailored career matches for specific user profile 
   * @route POST /api/ai/careers/generate
   */
  async generateCareers(req, res) {
    try {
      const userData = req.body;
      const data = await openaiService.generateCareerMatches(userData);
      res.json(data.matches);
    } catch (error) {
      console.error("AI Controller Error (careers):", error);
      res.status(500).json({ message: "Failed to generate AI career recommendations", error: error.message });
    }
  },

  /**
   * Evaluates user's answer for a specific course module 
   * @route POST /api/ai/learning/evaluate
   */
  async evaluateLearning(req, res) {
    try {
      const { moduleTitle, answer } = req.body;
      const result = await openaiService.evaluateAnswer(moduleTitle, answer);
      res.json(result);
    } catch (error) {
      console.error("AI Controller Error (evaluation):", error);
      res.status(500).json({ message: "Failed to evaluate AI learning response", error: error.message });
    }
  },

  /**
   * For generating a tailored roadmap
   * @route POST /api/ai/roadmap/generate
   */
  async generateRoadmap(req, res) {
    try {
      const { careerTitle, userData } = req.body;
      const roadmap = await openaiService.generateRoadmap(careerTitle, userData);
      res.json(roadmap);
    } catch (error) {
      console.error("AI Controller Error (roadmap):", error);
      res.status(500).json({ message: "Failed to generate AI learning roadmap", error: error.message });
    }
  }
};

module.exports = aiController;
