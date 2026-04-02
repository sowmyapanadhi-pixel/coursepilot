const courses = [
  {
    title: 'Complete JavaScript Mastery',
    description: 'Master JavaScript from fundamentals to advanced concepts including ES6+, async/await, and DOM manipulation.',
    platform: 'Udemy',
    duration: '40 hours',
    difficulty: 'Beginner',
    category: 'Web Development',
    careerPath: 'Full Stack Developer',
    rating: 4.8,
    price: '$12.99',
    instructor: 'John Doe',
    lessons: [
      { title: 'Introduction to JavaScript', videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk', duration: '15 min', order: 1 },
      { title: 'Variables and Data Types', videoUrl: 'https://www.youtube.com/embed/9emXNzqCKyg', duration: '20 min', order: 2 },
      { title: 'Functions and Scope', videoUrl: 'https://www.youtube.com/embed/xUI5Tsl2JpY', duration: '25 min', order: 3 },
      { title: 'DOM Manipulation', videoUrl: 'https://www.youtube.com/embed/y17RuWkWdn8', duration: '30 min', order: 4 },
      { title: 'Async JavaScript', videoUrl: 'https://www.youtube.com/embed/ZYb_ZU8LNxs', duration: '35 min', order: 5 }
    ]
  },
  {
    title: 'React - The Complete Guide',
    description: 'Build powerful single page applications with React.js. Learn hooks, context, routing, and state management.',
    platform: 'Coursera',
    duration: '35 hours',
    difficulty: 'Intermediate',
    category: 'Web Development',
    careerPath: 'Full Stack Developer',
    rating: 4.7,
    price: '$14.99',
    instructor: 'Jane Smith',
    lessons: [
      { title: 'React Fundamentals', videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM', duration: '20 min', order: 1 },
      { title: 'Components & Props', videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM', duration: '25 min', order: 2 },
      { title: 'State & Hooks', videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM', duration: '30 min', order: 3 },
      { title: 'React Router', videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM', duration: '20 min', order: 4 },
      { title: 'Context API & Redux', videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM', duration: '35 min', order: 5 }
    ]
  },
  {
    title: 'Node.js Backend Development',
    description: 'Learn server-side development with Node.js and Express. Build REST APIs and connect to databases.',
    platform: 'Udemy',
    duration: '30 hours',
    difficulty: 'Intermediate',
    category: 'Backend Development',
    careerPath: 'Full Stack Developer',
    rating: 4.6,
    price: '$11.99',
    instructor: 'Mike Johnson',
    lessons: [
      { title: 'Node.js Basics', videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4', duration: '20 min', order: 1 },
      { title: 'Express Framework', videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4', duration: '25 min', order: 2 },
      { title: 'REST API Design', videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4', duration: '30 min', order: 3 },
      { title: 'MongoDB Integration', videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4', duration: '25 min', order: 4 },
      { title: 'Authentication & Security', videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4', duration: '30 min', order: 5 }
    ]
  },
  {
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis, visualization, and machine learning fundamentals.',
    platform: 'Coursera',
    duration: '45 hours',
    difficulty: 'Beginner',
    category: 'Data Science',
    careerPath: 'Data Scientist',
    rating: 4.9,
    price: 'Free',
    instructor: 'Dr. Sarah Lee',
    lessons: [
      { title: 'Python Basics', videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw', duration: '25 min', order: 1 },
      { title: 'NumPy & Pandas', videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw', duration: '30 min', order: 2 },
      { title: 'Data Visualization', videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw', duration: '25 min', order: 3 },
      { title: 'Statistical Analysis', videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw', duration: '30 min', order: 4 },
      { title: 'Intro to ML', videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw', duration: '35 min', order: 5 }
    ]
  },
  {
    title: 'Machine Learning A-Z',
    description: 'Comprehensive machine learning course covering supervised, unsupervised learning, and deep learning.',
    platform: 'edX',
    duration: '50 hours',
    difficulty: 'Advanced',
    category: 'AI & Machine Learning',
    careerPath: 'AI/ML Engineer',
    rating: 4.8,
    price: '$19.99',
    instructor: 'Prof. Andrew Ng',
    lessons: [
      { title: 'ML Fundamentals', videoUrl: 'https://www.youtube.com/embed/GwIo3gDZCVQ', duration: '30 min', order: 1 },
      { title: 'Regression Models', videoUrl: 'https://www.youtube.com/embed/GwIo3gDZCVQ', duration: '35 min', order: 2 },
      { title: 'Classification', videoUrl: 'https://www.youtube.com/embed/GwIo3gDZCVQ', duration: '30 min', order: 3 },
      { title: 'Neural Networks', videoUrl: 'https://www.youtube.com/embed/GwIo3gDZCVQ', duration: '40 min', order: 4 },
      { title: 'Model Deployment', videoUrl: 'https://www.youtube.com/embed/GwIo3gDZCVQ', duration: '25 min', order: 5 }
    ]
  },
  {
    title: 'UI/UX Design Fundamentals',
    description: 'Learn user interface and user experience design principles. Master Figma and create stunning designs.',
    platform: 'LinkedIn Learning',
    duration: '25 hours',
    difficulty: 'Beginner',
    category: 'Design',
    careerPath: 'UX/UI Designer',
    rating: 4.7,
    price: '$9.99',
    instructor: 'Emily Chen',
    lessons: [
      { title: 'Design Principles', videoUrl: 'https://www.youtube.com/embed/YiLUYf4HDh4', duration: '20 min', order: 1 },
      { title: 'Color Theory', videoUrl: 'https://www.youtube.com/embed/YiLUYf4HDh4', duration: '15 min', order: 2 },
      { title: 'Typography', videoUrl: 'https://www.youtube.com/embed/YiLUYf4HDh4', duration: '20 min', order: 3 },
      { title: 'Figma Mastery', videoUrl: 'https://www.youtube.com/embed/YiLUYf4HDh4', duration: '30 min', order: 4 },
      { title: 'Prototyping', videoUrl: 'https://www.youtube.com/embed/YiLUYf4HDh4', duration: '25 min', order: 5 }
    ]
  },
  {
    title: 'AWS Cloud Practitioner',
    description: 'Get started with cloud computing. Learn AWS core services, security, and cloud architecture.',
    platform: 'FreeCodeCamp',
    duration: '20 hours',
    difficulty: 'Beginner',
    category: 'Cloud Computing',
    careerPath: 'Cloud Solutions Architect',
    rating: 4.6,
    price: 'Free',
    instructor: 'Cloud Academy',
    lessons: [
      { title: 'Cloud Concepts', videoUrl: 'https://www.youtube.com/embed/3hLmDS179YE', duration: '20 min', order: 1 },
      { title: 'AWS Services Overview', videoUrl: 'https://www.youtube.com/embed/3hLmDS179YE', duration: '25 min', order: 2 },
      { title: 'Compute & Storage', videoUrl: 'https://www.youtube.com/embed/3hLmDS179YE', duration: '30 min', order: 3 },
      { title: 'Networking & Security', videoUrl: 'https://www.youtube.com/embed/3hLmDS179YE', duration: '25 min', order: 4 },
      { title: 'Cloud Architecture', videoUrl: 'https://www.youtube.com/embed/3hLmDS179YE', duration: '20 min', order: 5 }
    ]
  },
  {
    title: 'Cybersecurity Essentials',
    description: 'Learn the fundamentals of cybersecurity, ethical hacking, and network security.',
    platform: 'Coursera',
    duration: '35 hours',
    difficulty: 'Intermediate',
    category: 'Cybersecurity',
    careerPath: 'Cybersecurity Analyst',
    rating: 4.5,
    price: '$16.99',
    instructor: 'Security Pro',
    lessons: [
      { title: 'Security Fundamentals', videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE', duration: '20 min', order: 1 },
      { title: 'Network Security', videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE', duration: '25 min', order: 2 },
      { title: 'Ethical Hacking Basics', videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE', duration: '30 min', order: 3 },
      { title: 'Cryptography', videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE', duration: '25 min', order: 4 },
      { title: 'Incident Response', videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE', duration: '20 min', order: 5 }
    ]
  },
  {
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native and JavaScript.',
    platform: 'Udemy',
    duration: '30 hours',
    difficulty: 'Intermediate',
    category: 'Mobile Development',
    careerPath: 'Mobile App Developer',
    rating: 4.6,
    price: '$13.99',
    instructor: 'Alex Turner',
    lessons: [
      { title: 'React Native Setup', videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc', duration: '15 min', order: 1 },
      { title: 'Core Components', videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc', duration: '25 min', order: 2 },
      { title: 'Navigation', videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc', duration: '20 min', order: 3 },
      { title: 'State Management', videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc', duration: '25 min', order: 4 },
      { title: 'Publishing Apps', videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc', duration: '20 min', order: 5 }
    ]
  }
];

module.exports = courses;
