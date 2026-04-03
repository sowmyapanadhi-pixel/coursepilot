const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Higher-level AI interaction service 
 * This service handles all OpenAI API calls for the platform
 */
const openaiService = {
  
  /**
   * Generates career-related content using GPT-4o
   * @param {string} prompt - The prompt to send to OpenAI
   * @param {string} systemContent - System message context
   */
  async generateContent(prompt, systemContent = "You are an expert career consultant and AI engine for CareerPilot.") {
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("OpenAI API key is missing. Please add it to your .env file.");
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Faster and cheaper for general tasks
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" } // Enforce JSON for easier parsing
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error("OpenAI Service Error:", error);
      throw error;
    }
  },

  /**
   * Specifically for generating assessment questions
   */
  async generateAssessmentQuestions(userData) {
    const prompt = `
      Based on the following user profile, generate 3 highly technical and advanced multiple-choice questions for a career assessment. 
      The questions should test the deep architectural and logical limits of their skills.
      
      User Profile:
      - Skills: ${userData.skills?.join(', ')}
      - Goal: ${userData.goals}
      - Background: ${userData.aboutInfo}
      
      Return the output strictly in this JSON format:
      {
        "questions": [
          {
            "q": "The question text",
            "opts": ["Option A", "Option B", "Option C", "Option D"],
            "ans": 0 // index of the correct answer
          }
        ]
      }
    `;
    
    return await this.generateContent(prompt, "You are a senior technical interviewer and architect.");
  },

  /**
   * For generating career matches
   */
  async generateCareerMatches(userData) {
    const prompt = `
      Analyze the following user profile and recommend the top 3 best-fit career paths in the current global tech market.
      
      User Profile:
      - Skills: ${userData.skills?.join(', ')}
      - Goals: ${userData.goals}
      - Background: ${userData.aboutInfo}
      - Interests: ${userData.interests?.join(', ')}
      - Current Assessment Score: ${userData.assessmentScore}%
      
      Return the output strictly in this JSON format:
      {
        "matches": [
          {
            "name": "Career Title",
            "focus": "Brief focus (e.g., Cloud-Native Systems)",
            "match": 95, // Percentage match 0-100
            "description": "2-sentence tailored explanation",
            "salary": "₹Range (e.g., ₹15L - ₹30L)",
            "demand": "Market demand label (Extremely High/Hyper-Growth)"
          }
        ]
      }
    `;

    return await this.generateContent(prompt, "You are an AI labor market analyst.");
  },

  /**
   * For evaluating learning answers
   */
  async evaluateAnswer(moduleTitle, answer) {
    const prompt = `
      Evaluate the following answer for a professional learning module titled "${moduleTitle}".
      Determine if the answer shows a deep understanding of the core concepts.
      
      Answer: "${answer}"
      
      Return the output strictly in this JSON format:
      {
        "isRelevant": boolean,
        "score": number (0-100),
        "feedback": "Tailored expert feedback",
        "suggestReview": boolean
      }
    `;

    return await this.generateContent(prompt, "You are a professional technical instructor.");
  },

  /**
   * For generating a dynamic learning roadmap
   */
  async generateRoadmap(careerTitle, userData) {
    const prompt = `
      Generate a detailed 6-step learning roadmap for a user transitioning to the career: "${careerTitle}".
      
      User Profile:
      - Current Skills: ${userData.skills?.join(', ')}
      - Interests: ${userData.interests?.join(', ')}
      - Goals: ${userData.goals}
      
      The roadmap should be highly tailored. If they already have a skill, skip the basics and go to advanced topics.
      Each step must include a title, number of lessons, number of weeks, and a short description.
      Also include a relevant YouTube video ID (as "videoId") from a high-quality educational channel for that specific topic.
      
      Return the output strictly in this JSON format:
      {
        "roadmap": [
          {
            "id": number,
            "title": "Module Title",
            "lessons": number,
            "weeks": number,
            "progress": 0,
            "status": "locked" (set first one to "in-progress"),
            "videoId": "string",
            "description": "Short description"
          }
        ]
      }
    `;

    const data = await this.generateContent(prompt, "You are a technical curriculum designer.");
    return data.roadmap;
  }
};

module.exports = openaiService;
