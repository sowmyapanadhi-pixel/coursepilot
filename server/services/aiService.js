/**
 * Mock AI Service — Simulates OpenAI-like responses for all AI features.
 * Easily replaceable with real OpenAI API calls by swapping function implementations.
 */

// ─── Assessment Question Generation ───
function generateAssessmentQuestions(skills, interests) {
  const questionBank = {
    'javascript': [
      { question: 'What is a closure in JavaScript?', options: ['A function with access to its outer scope', 'A way to close the browser', 'A CSS property', 'A type of loop'], correctAnswer: 0, category: 'JavaScript', difficulty: 'medium' },
      { question: 'Which method converts JSON to a JavaScript object?', options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.toObject()'], correctAnswer: 1, category: 'JavaScript', difficulty: 'easy' },
      { question: 'What does "this" refer to in an arrow function?', options: ['The global object', 'The function itself', 'The enclosing lexical context', 'undefined'], correctAnswer: 2, category: 'JavaScript', difficulty: 'hard' },
    ],
    'python': [
      { question: 'What is a list comprehension in Python?', options: ['A way to create lists using a compact syntax', 'A method to sort lists', 'A type of data structure', 'A debugging tool'], correctAnswer: 0, category: 'Python', difficulty: 'easy' },
      { question: 'Which keyword is used for inheritance in Python?', options: ['extends', 'inherits', 'class ChildClass(ParentClass)', 'super'], correctAnswer: 2, category: 'Python', difficulty: 'medium' },
      { question: 'What is a decorator in Python?', options: ['A design pattern only', 'A function that modifies another function', 'A type of variable', 'A CSS-like syntax'], correctAnswer: 1, category: 'Python', difficulty: 'hard' },
    ],
    'react': [
      { question: 'What is the Virtual DOM in React?', options: ['A copy of the real DOM for efficient updates', 'A CSS framework', 'A database', 'A testing tool'], correctAnswer: 0, category: 'React', difficulty: 'easy' },
      { question: 'What hook is used for side effects in React?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctAnswer: 1, category: 'React', difficulty: 'easy' },
      { question: 'What is React fiber?', options: ['A CSS library', 'A reimplementation of React core algorithm', 'A state management tool', 'A routing library'], correctAnswer: 1, category: 'React', difficulty: 'hard' },
    ],
    'data science': [
      { question: 'What is the purpose of data normalization?', options: ['To delete data', 'To scale data to a standard range', 'To encrypt data', 'To compress data'], correctAnswer: 1, category: 'Data Science', difficulty: 'easy' },
      { question: 'Which algorithm is used for classification?', options: ['Linear Regression', 'K-Means', 'Random Forest', 'PCA'], correctAnswer: 2, category: 'Data Science', difficulty: 'medium' },
      { question: 'What does overfitting mean in ML?', options: ['Model performs well on training but poorly on test data', 'Model is too simple', 'Model has no bias', 'Model runs too fast'], correctAnswer: 0, category: 'Data Science', difficulty: 'medium' },
    ],
    'design': [
      { question: 'What is the purpose of white space in design?', options: ['To waste space', 'To improve readability and focus', 'To add more content', 'To reduce file size'], correctAnswer: 1, category: 'Design', difficulty: 'easy' },
      { question: 'What does UX stand for?', options: ['User Exchange', 'User Experience', 'Universal Extension', 'Unified Execution'], correctAnswer: 1, category: 'Design', difficulty: 'easy' },
      { question: 'What is a wireframe?', options: ['A 3D model', 'A low-fidelity layout blueprint', 'A type of animation', 'A CSS grid'], correctAnswer: 1, category: 'Design', difficulty: 'easy' },
    ],
    'general': [
      { question: 'What does API stand for?', options: ['Application Programming Interface', 'Applied Program Integration', 'Automated Process Instruction', 'Application Process Interface'], correctAnswer: 0, category: 'General', difficulty: 'easy' },
      { question: 'What is version control used for?', options: ['Tracking changes in code', 'Controlling internet speed', 'Managing user accounts', 'Designing UIs'], correctAnswer: 0, category: 'General', difficulty: 'easy' },
      { question: 'What is agile methodology?', options: ['A programming language', 'An iterative approach to project management', 'A database system', 'A testing framework'], correctAnswer: 1, category: 'General', difficulty: 'medium' },
      { question: 'What is cloud computing?', options: ['Computing done in the sky', 'On-demand delivery of IT resources via the internet', 'A type of weather app', 'Local server management'], correctAnswer: 1, category: 'General', difficulty: 'easy' },
      { question: 'What is the purpose of a database index?', options: ['To make the database larger', 'To speed up data retrieval', 'To encrypt data', 'To compress data'], correctAnswer: 1, category: 'General', difficulty: 'medium' },
    ]
  };

  let questions = [];
  
  // Add questions based on user skills
  const allSkills = [...(skills || []), ...(interests || [])].map(s => s.toLowerCase());
  
  allSkills.forEach(skill => {
    const key = Object.keys(questionBank).find(k => skill.includes(k) || k.includes(skill));
    if (key && questionBank[key]) {
      questions.push(...questionBank[key]);
    }
  });

  // Always add general questions
  questions.push(...questionBank.general);

  // Remove duplicates and limit to 10
  const uniqueQuestions = questions.filter((q, i, arr) => 
    arr.findIndex(item => item.question === q.question) === i
  );

  return uniqueQuestions.slice(0, 10);
}

// ─── Evaluate Assessment Results ───
function evaluateAssessment(questions, responses) {
  let correct = 0;
  const categoryScores = {};

  responses.forEach(r => {
    const q = questions[r.questionIndex];
    if (!q) return;
    const isCorrect = r.selectedAnswer === q.correctAnswer;
    if (isCorrect) correct++;

    if (!categoryScores[q.category]) {
      categoryScores[q.category] = { correct: 0, total: 0 };
    }
    categoryScores[q.category].total++;
    if (isCorrect) categoryScores[q.category].correct++;
  });

  const strengths = [];
  const weaknesses = [];

  Object.entries(categoryScores).forEach(([cat, scores]) => {
    const ratio = scores.correct / scores.total;
    if (ratio >= 0.6) strengths.push(cat);
    else weaknesses.push(cat);
  });

  return {
    score: Math.round((correct / questions.length) * 100),
    strengths: strengths.length > 0 ? strengths : ['General Knowledge'],
    weaknesses
  };
}

// ─── Career Recommendations ───
function generateCareerRecommendations(skills, interests, strengths) {
  const careerDatabase = [
    {
      title: 'Full Stack Developer',
      explanation: 'Build complete web applications from frontend to backend. High demand in tech industry with excellent growth potential.',
      demand: 'high',
      trend: '📈 Growing 25% annually — companies need full-stack developers who can handle end-to-end development',
      matchSkills: ['javascript', 'react', 'node', 'html', 'css', 'web', 'programming', 'coding'],
      icon: '💻',
      salaryRange: '$70,000 - $150,000',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'CSS', 'Git']
    },
    {
      title: 'Data Scientist',
      explanation: 'Analyze complex data to help organizations make better decisions. One of the most sought-after careers in tech.',
      demand: 'high',
      trend: '📈 Growing 35% annually — data-driven decision making is becoming essential across all industries',
      matchSkills: ['python', 'data', 'machine learning', 'ml', 'ai', 'statistics', 'analytics', 'math'],
      icon: '📊',
      salaryRange: '$80,000 - $160,000',
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow', 'Data Visualization']
    },
    {
      title: 'UX/UI Designer',
      explanation: 'Create intuitive and beautiful user interfaces. Critical role in product development with growing demand.',
      demand: 'high',
      trend: '📈 Growing 20% annually — user experience is now a key differentiator for products',
      matchSkills: ['design', 'ui', 'ux', 'figma', 'creative', 'art', 'graphic', 'photoshop'],
      icon: '🎨',
      salaryRange: '$60,000 - $130,000',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Visual Design', 'CSS']
    },
    {
      title: 'Cloud Solutions Architect',
      explanation: 'Design and manage cloud infrastructure for scalable applications. Essential role in modern tech companies.',
      demand: 'high',
      trend: '📈 Growing 30% annually — cloud migration is accelerating across enterprises',
      matchSkills: ['cloud', 'aws', 'azure', 'devops', 'infrastructure', 'networking', 'linux', 'docker'],
      icon: '☁️',
      salaryRange: '$90,000 - $180,000',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux']
    },
    {
      title: 'AI/ML Engineer',
      explanation: 'Build intelligent systems using machine learning and artificial intelligence. Cutting-edge field with massive potential.',
      demand: 'high',
      trend: '📈 Growing 40% annually — AI is transforming every industry from healthcare to finance',
      matchSkills: ['ai', 'machine learning', 'ml', 'deep learning', 'python', 'tensorflow', 'neural'],
      icon: '🤖',
      salaryRange: '$100,000 - $200,000',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'Mathematics']
    },
    {
      title: 'Cybersecurity Analyst',
      explanation: 'Protect organizations from cyber threats and security breaches. Critical and high-demand career path.',
      demand: 'high',
      trend: '📈 Growing 32% annually — cybersecurity threats are increasing, driving huge demand',
      matchSkills: ['security', 'cyber', 'networking', 'ethical hacking', 'linux', 'firewall'],
      icon: '🔒',
      salaryRange: '$75,000 - $145,000',
      skills: ['Network Security', 'Ethical Hacking', 'SIEM', 'Encryption', 'Linux', 'Compliance']
    },
    {
      title: 'Mobile App Developer',
      explanation: 'Create applications for iOS and Android platforms. Huge market with billions of smartphone users worldwide.',
      demand: 'high',
      trend: '📈 Growing 22% annually — mobile-first approach is now the standard',
      matchSkills: ['mobile', 'android', 'ios', 'react native', 'flutter', 'swift', 'kotlin', 'app'],
      icon: '📱',
      salaryRange: '$65,000 - $140,000',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'REST APIs', 'UI Design']
    },
    {
      title: 'Product Manager',
      explanation: 'Lead product strategy and development. Bridge between business, design, and engineering teams.',
      demand: 'medium',
      trend: '📈 Growing 18% annually — product-led growth is becoming the dominant strategy',
      matchSkills: ['product', 'management', 'strategy', 'business', 'analytics', 'leadership'],
      icon: '📋',
      salaryRange: '$85,000 - $170,000',
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Stakeholder Management', 'Roadmapping', 'A/B Testing']
    }
  ];

  const allUserSkills = [...(skills || []), ...(interests || []), ...(strengths || [])].map(s => s.toLowerCase());

  // Score each career based on skill matching
  const scoredCareers = careerDatabase.map(career => {
    let score = 0;
    career.matchSkills.forEach(ms => {
      allUserSkills.forEach(us => {
        if (us.includes(ms) || ms.includes(us)) {
          score += 20;
        }
      });
    });
    // Add some randomness for variety
    score += Math.floor(Math.random() * 15);
    return { ...career, matchScore: Math.min(score, 98) };
  });

  // Sort by score and return top 5
  scoredCareers.sort((a, b) => b.matchScore - a.matchScore);
  return scoredCareers.slice(0, 5).map(c => {
    const { matchSkills, ...career } = c;
    return career;
  });
}

// ─── Resume Generation ───
function generateResume(userData, skills, projects, education, experience) {
  const name = userData.name || 'Student';
  const email = userData.email || '';
  const career = userData.selectedCareer || 'Software Developer';
  const userSkills = skills || userData.skills || [];

  const summary = `Results-driven ${career} with a strong foundation in ${userSkills.slice(0, 3).join(', ')}. ` +
    `Passionate about leveraging technology to solve real-world problems. ` +
    `Proven ability to learn quickly and deliver high-quality solutions. ` +
    `Seeking opportunities to contribute to innovative projects and grow professionally.`;

  return {
    personalInfo: { name, email, phone: '', location: '', linkedin: '', portfolio: '' },
    summary,
    skills: userSkills,
    education: education || [{ degree: userData.education?.field || 'Computer Science', institution: userData.education?.institution || 'University', year: '2024', gpa: '' }],
    experience: experience || [],
    projects: projects || [
      { name: 'CareerPilot Platform', description: 'AI-powered career guidance platform built with React and Node.js', technologies: ['React', 'Node.js', 'MongoDB'], link: '' }
    ],
    certifications: [],
    generatedContent: summary
  };
}

// ─── Chatbot Responses ───
function getChatbotResponse(message, userContext) {
  const msg = message.toLowerCase();

  const responses = {
    greeting: {
      patterns: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'howdy', 'greetings'],
      response: `Hello! 👋 I'm your CareerPilot AI assistant. I can help you with:\n\n🎯 Career guidance & recommendations\n📚 Course & learning suggestions\n📄 Resume building tips\n💼 Job application advice\n\nWhat would you like to know?`
    },
    career: {
      patterns: ['career', 'job path', 'what should i become', 'career advice', 'career path', 'career change', 'which career'],
      response: `Great question about careers! 🎯\n\nHere are my top tips:\n\n1. **Take the Assessment** — Complete your skill assessment to get personalized career recommendations.\n2. **Follow Your Strengths** — Focus on careers that align with your strongest skills.\n3. **Check Market Demand** — Look for careers with growing demand and good salary potential.\n4. **Build a Portfolio** — Hands-on projects are the best way to stand out.\n\nHave you taken the career assessment yet? It's the best starting point!`
    },
    resume: {
      patterns: ['resume', 'cv', 'resume tips', 'how to write resume', 'resume help', 'resume advice'],
      response: `Here are my top resume tips! 📄\n\n1. **Keep it concise** — 1-2 pages maximum\n2. **Use action verbs** — "Built", "Designed", "Led", "Improved"\n3. **Quantify achievements** — "Increased performance by 40%"\n4. **Tailor for each role** — Customize your resume for each application\n5. **Include projects** — Show what you've built\n6. **Proofread carefully** — No typos or grammar errors\n\nYou can use our AI Resume Builder to generate a professional resume!`
    },
    learning: {
      patterns: ['learn', 'study', 'course', 'how to learn', 'learning path', 'roadmap', 'what to study', 'skill'],
      response: `Here's my learning advice! 📚\n\n1. **Start with fundamentals** — Master the basics before advancing\n2. **Practice daily** — Consistency beats intensity\n3. **Build projects** — Apply what you learn in real projects\n4. **Follow a roadmap** — structured learning is more effective\n5. **Join communities** — Learn with others\n\nCheck out the Learning section for your personalized roadmap and recommended courses!`
    },
    interview: {
      patterns: ['interview', 'interview tips', 'prepare for interview', 'interview questions'],
      response: `Interview preparation tips! 🎤\n\n1. **Research the company** — Know their products, culture, and recent news\n2. **Practice common questions** — "Tell me about yourself", "Why this role?"\n3. **Use STAR method** — Situation, Task, Action, Result\n4. **Prepare questions** — Ask thoughtful questions about the role\n5. **Mock interviews** — Practice with friends or AI tools\n6. **Technical prep** — Review DSA and system design for tech roles`
    },
    motivation: {
      patterns: ['motivat', 'discouraged', 'stressed', 'overwhelmed', 'confused', 'lost', 'help me', 'struggling'],
      response: `I understand the journey can feel overwhelming sometimes. 💪\n\nRemember:\n\n🌟 **Every expert was once a beginner**\n📈 **Progress is not always linear** — small steps add up\n🎯 **Focus on one thing at a time** — you don't need to learn everything at once\n🤝 **Ask for help** — there's no shame in seeking guidance\n💡 **Celebrate small wins** — every completed lesson is progress\n\nYou're already on the right track by using CareerPilot! Keep going! 🚀`
    },
    thanks: {
      patterns: ['thank', 'thanks', 'appreciate', 'helpful'],
      response: `You're welcome! 😊 I'm always here to help. Feel free to ask me anything about careers, learning, or your professional journey. Good luck! 🚀`
    }
  };

  // Find matching response
  for (const [key, data] of Object.entries(responses)) {
    if (data.patterns.some(p => msg.includes(p))) {
      return data.response;
    }
  }

  // Default response
  return `I'd be happy to help! 🤔\n\nI can assist you with:\n\n• **Career guidance** — "What career should I choose?"\n• **Learning advice** — "How should I learn coding?"\n• **Resume tips** — "How to write a good resume?"\n• **Interview prep** — "How to prepare for interviews?"\n• **Motivation** — "I'm feeling overwhelmed"\n\nTry asking me one of these questions!`;
}

// ─── Evaluate Understanding ───
function evaluateUnderstanding(explanation, topic) {
  if (!explanation || explanation.trim().length < 10) {
    return {
      score: 20,
      feedback: 'Your explanation is too brief. Try to elaborate more on the key concepts and provide examples.'
    };
  }

  const words = explanation.trim().split(/\s+/).length;
  let score = Math.min(40 + words * 2, 95);

  // Check for relevant keywords based on topic
  const topicKeywords = {
    'javascript': ['function', 'variable', 'scope', 'closure', 'async', 'promise', 'dom', 'event'],
    'python': ['function', 'class', 'list', 'dictionary', 'loop', 'module', 'library'],
    'react': ['component', 'state', 'props', 'hook', 'render', 'virtual dom', 'effect'],
    'data': ['analysis', 'model', 'training', 'feature', 'dataset', 'algorithm', 'prediction'],
  };

  const lowerExplanation = explanation.toLowerCase();
  const relevantKeywords = topicKeywords[topic?.toLowerCase()] || topicKeywords.javascript;
  const matchedKeywords = relevantKeywords.filter(kw => lowerExplanation.includes(kw));
  score = Math.min(score + matchedKeywords.length * 5, 98);

  let feedback;
  if (score >= 80) {
    feedback = '🌟 Excellent understanding! You demonstrated great knowledge of the key concepts. Keep it up!';
  } else if (score >= 60) {
    feedback = '👍 Good understanding! You covered the basics well. Try to include more specific examples and technical details.';
  } else if (score >= 40) {
    feedback = '📚 Fair understanding. Review the material and focus on the core concepts. Practice with hands-on examples.';
  } else {
    feedback = '💡 Needs improvement. Revisit the learning material and try to understand the fundamental concepts before moving on.';
  }

  return { score, feedback };
}

module.exports = {
  generateAssessmentQuestions,
  evaluateAssessment,
  generateCareerRecommendations,
  generateResume,
  getChatbotResponse,
  evaluateUnderstanding
};
