/**
 * AI Logic Simulation Engine
 * This module simulates a small LLM by dynamically generating questions 
 * and career insights based on user-provided profile data.
 */

const baseQuestions = {
  technical: [
    "Critically evaluate how {skill} manages race conditions and memory safety in a high-concurrency distributed system. What is the fatal flaw in most implementations?",
    "Explain the precise micro-architectural differences between how {skill} handles JIT compilation vs. Ahead-of-Time compilation. Which is superior for low-latency?",
    "Contrast {skill}'s dependency resolution algorithm with alternative package managers. How do you resolve a circular dependency on a production-scale build?",
    "Describe the underlying memory heap allocation strategy in {skill}. How do you prevent garbage collection pauses from exceeding 10ms in a real-time data stream?",
    "How does the {skill} runtime handle prototype-based inheritance vs. class-based structure when scaling to millions of dynamic objects?"
  ],
  logic: [
    "To reach your goal of {goal}, how would you architect a zero-downtime migration strategy using {skill} while maintaining 99.99% system availability?",
    "Given your background in {about}, how do you technically reconcile 'clean code' principles with the aggressive performance requirements of {skill} to meet {goal}?",
    "Analyze the technical debt trade-offs you would make when prioritizing {goal} over a full architectural rewrite of a legacy {skill} codebase.",
    "If a critical security exploit is discovered in the {skill} core library, what is your 4-hour tactical response plan to protect your trajectory toward {goal}?",
    "How do you mathematically optimize resource allocation in a cloud-native {skill} environment to reduce costs while aggressively pursuing {goal}?"
  ],
  general: [
    "What is the most 'elegant' but 'tricky' hack you've ever implemented in {skill} to bypass a fundamental library limitation?",
    "Defend why {skill} is or is not the final architectural choice for a global-scale SaaS platform. What is the 'X-Factor' most engineers miss?",
    "Explain a scenario where following {skill}'s 'best practices' actually led to a catastrophic production failure. What was the post-mortem takeaway?",
    "How do you verify the integrity of a high-throughput data pipeline in {skill} when the underlying schema is dynamically evolving?",
    "Discuss the trade-offs between 'Security by Obscurity' vs. 'Open-Source Transparency' within the {skill} ecosystem."
  ]
};

const API_BASE_URL = "http://localhost:5000/api/ai";

export const generateAIQuestions = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessment/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('API failed');
    return await response.json();
  } catch (error) {
    console.warn("AI API failed, falling back to mock logic:", error);
    // FALLBACK MOCK LOGIC (Original logic)
    const { skills, goals, about } = userData;
    const primarySkill = skills && skills.length > 0 ? skills[0] : "Advanced Technology";
    const primaryGoal = goals || "high-level strategic growth";
    const shortAbout = about || "your technical background";
    let questions = [];
    const selectRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // 1. Technical Depth Question
    const techTpl = selectRandom(baseQuestions.technical);
    questions.push({
      q: techTpl.replace(/{skill}/g, primarySkill),
      opts: ["By isolating immutable state and using atomic locks", "By implementing a custom AST transformation layer", "By prioritizing heap allocation optimizations", "Through aggressive horizontal scaling and load balancing"],
      ans: 1
    });

    // 2. Logic & Strategy Question
    const logicTpl = selectRandom(baseQuestions.logic);
    questions.push({
      q: logicTpl.replace(/{skill}/g, primarySkill).replace(/{goal}/g, primaryGoal).replace(/{about}/g, shortAbout),
      opts: ["Implement a blue-green canary deployment with rollback", "Refactor the core logic into micro-services", "Leverage sharding at the data persistence layer", "Prioritize technical debt reduction and refactoring"],
      ans: 0
    });

    // 3. Trick Architect Question
    const genTpl = selectRandom(baseQuestions.general);
    questions.push({
      q: genTpl.replace(/{skill}/g, primarySkill),
      opts: ["Optimizing the critical render path for speed", "Ensuring strict type-safety across all layers", "Balancing developer experience with raw performance", "Implementing end-to-end encryption by default"],
      ans: 2
    });
    return questions;
  }
};

export const generateCareerMatches = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/careers/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('API failed');
    return await response.json();
  } catch (error) {
    console.warn("AI API failed, falling back to mock logic:", error);
    // FALLBACK MOCK LOGIC
    const { skills, goals, about, aboutInfo, interests } = userData;
    const userSkillsStr = (skills || []).join(' ').toLowerCase();
    const userGoalsStr = (goals || '').toLowerCase();
    const userInterestsStr = (interests || []).join(' ').toLowerCase();
    const primarySkill = (skills || [])[0] || "Advanced Technology";
    
    const careerPool = [
      { name: "Full Stack Architect", keywords: ["web", "javascript", "react", "node", "fullstack"], focus: "Omni-channel Architecture", match: 98 },
      { name: "Senior DevOps Engineer", keywords: ["cloud", "docker", "aws", "infrastructure"], focus: "Cloud-Native Infrastructure", match: 95 },
      { name: "AI/ML Solutions Lead", keywords: ["ai", "ml", "intelligence", "data"], focus: "Neural System Synthesis", match: 92 },
      { name: "Cybersecurity Strategist", keywords: ["security", "risk", "firewall"], focus: "Defensive Logic Systems", match: 90 },
      { name: "Principal Data Scientist", keywords: ["data", "analysis", "insights"], focus: "Predictive Intelligence", match: 88 },
      { name: "UI/UX Experience Architect", keywords: ["design", "ui", "ux"], focus: "Human-Logic Interaction", match: 86 },
      { name: "Blockchain Core Developer", keywords: ["blockchain", "crypto", "web3"], focus: "Decentralized Protocols", match: 85 }
    ];

    const scoredCareers = careerPool.map(career => {
      let score = career.match;
      career.keywords.forEach(kw => {
        if (userSkillsStr.includes(kw)) score += 5;
        if (userGoalsStr.includes(kw)) score += 10;
        if (userInterestsStr.includes(kw)) score += 5;
      });
      return { ...career, calculatedScore: score };
    });

    return scoredCareers
      .sort((a, b) => b.calculatedScore - a.calculatedScore)
      .slice(0, 3)
      .map(c => ({
        ...c,
        match: Math.min(99, c.calculatedScore),
        focus: `${primarySkill}-Driven ${c.focus}`,
        description: `Synthesized from your background in ${primarySkill}, this vector utilizes specialized ${primarySkill} logic to accelerate your progress toward ${goals || 'professional leadership'}.`,
        salary: `₹${Math.floor(Math.random() * 10 + 15)},00,000 - ₹${Math.floor(Math.random() * 20 + 35)},00,000`,
        demand: "Hyper-High"
      }));
  }
};

export const generateCommunityMatches = (userData) => {
  const { skills, goals, aboutInfo } = userData;
  const primarySkill = (skills && skills.length > 0) ? skills[0] : "Strategic Tech";
  const primaryGoal = goals || "professional leadership";
  const aboutText = aboutInfo ? aboutInfo.toLowerCase() : "";

  let specialGroup = "Cloud Evolution Strategists";
  let specialIcon = "☁️";
  
  if (aboutText.includes("security") || aboutText.includes("cyber")) {
    specialGroup = "Zero-Trust Infrastructure Ops"; specialIcon = "🛡️";
  } else if (aboutText.includes("design") || aboutText.includes("ux")) {
    specialGroup = "Cognitive Interface Synthesis"; specialIcon = "🎨";
  } else if (aboutText.includes("data") || aboutText.includes("ml")) {
    specialGroup = "Neural Logic & Big Data Hub"; specialIcon = "📊";
  }

  return [
    { name: `Synthesized ${primarySkill} Architects`, members: "1.2k", description: `Join peers leveraging ${primarySkill} based on your unique profile vector to accelerate growth.`, icon: "💻", color: "bg-violet-50 text-violet-600" },
    { name: `${primaryGoal} Velocity Hub`, members: "850", description: `Strategic cohort for mastering the ${primaryGoal} trajectory using your analyzed skills.`, icon: "⚡", color: "bg-rose-50 text-rose-600" },
    { name: specialGroup, members: "600", description: `A bespoke group generated from your specific profile: "${aboutInfo ? aboutInfo.substring(0, 40) + '...' : 'A professional background in ' + primarySkill}"`, icon: specialIcon, color: "bg-emerald-50 text-emerald-600" },
    { name: "Global Logic Synthesizers", members: "1.1k", description: `Cross-disciplinary collaboration focusing on ${primarySkill} and strategic ${primaryGoal} scaling.`, icon: "🌐", color: "bg-amber-50 text-amber-600" }
  ];
};

export const evaluateLearningAnswer = async (moduleTitle, answer) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleTitle, answer })
    });
    if (!response.ok) throw new Error('API failed');
    return await response.json();
  } catch (error) {
    console.warn("AI API failed, falling back to mock logic:", error);
    await new Promise(resolve => setTimeout(resolve, 800));
    const normalizedAnswer = (answer || '').toLowerCase();
    const normalizedTitle = (moduleTitle || '').toLowerCase();
    const keywords = normalizedTitle.split(' ').filter(word => word.length > 3);
    const matches = keywords.filter(kw => normalizedAnswer.includes(kw));
    const relevanceRatio = keywords.length > 0 ? (matches.length / keywords.length) : 1;
    
    if (normalizedAnswer.length < 30 || (relevanceRatio < 0.2 && normalizedAnswer.length < 100)) {
      return {
        isRelevant: false, score: 20,
        feedback: `⚠️ Synthesis Insufficient: Your explanation does not sufficiently capture the core architectural logic of "${moduleTitle}".`,
        suggestReview: true
      };
    }
    return {
      isRelevant: true, score: 85,
      feedback: `✨ Understanding Verified: Excellent synthesis! You have successfully integrated the logic of "${moduleTitle}" into your professional profile.`,
      suggestReview: false
    };
  }
};

export const generateAIRoadmap = async (careerTitle, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/roadmap/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ careerTitle, userData })
    });
    if (!response.ok) throw new Error('API failed');
    return await response.json();
  } catch (error) {
    console.warn("AI Roadmap API failed, falling back to template logic:", error);
    // FALLBACK TEMPLATE
    return [
      { id: 1, title: `${careerTitle} Core Fundamentals`, lessons: 10, weeks: 3, progress: 0, status: 'in-progress', videoId: 'W6NZfCO5SIk', description: `Learn the core concepts and fundamental principles of ${careerTitle}.` },
      { id: 2, title: `Advanced ${careerTitle} Tools & Patterns`, lessons: 15, weeks: 5, progress: 0, status: 'locked', videoId: 'bMknfKXIFA8', description: `Master the industry-standard tools and architectural patterns used by ${careerTitle} professionals.` },
      { id: 3, title: 'Real-World Scale Projects', lessons: 12, weeks: 4, progress: 0, status: 'locked', videoId: 'RLtyhwFtXQA', description: `Apply your knowledge by building complex portfolio-ready projects.` },
      { id: 4, title: 'Interview Preparation', lessons: 5, weeks: 2, progress: 0, status: 'locked', videoId: 'HXV3zeQKqGY', description: `Prepare for technical interviews and evaluations specific to ${careerTitle} roles.` }
    ];
  }
};

