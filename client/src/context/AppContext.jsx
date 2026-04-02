import React, { createContext, useContext, useState, useEffect } from 'react';

const fullStackRoadmapDefault = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    lessons: 12,
    weeks: 4,
    progress: 100,
    status: 'completed',
    videoId: 'W6NZfCO5SIk',
    description: 'Master variables, functions, closures, promises, and modern ES6+ syntax to make webpages interactive.'
  },
  {
    id: 2,
    title: 'React & Modern Frontend',
    lessons: 18,
    weeks: 6,
    progress: 65,
    status: 'in-progress',
    videoId: 'bMknfKXIFA8',
    description: 'Build single-page applications using functional components, props, state, and React Hooks.'
  },
  {
    id: 3,
    title: 'Node.js & Backend Development',
    lessons: 15,
    weeks: 5,
    progress: 0,
    status: 'available',
    videoId: 'RLtyhwFtXQA', 
    description: 'Learn how to build scalable backend services, RESTful APIs, and interact with the file system.'
  },
  {
    id: 4,
    title: 'Database Design & SQL',
    lessons: 10,
    weeks: 4,
    progress: 0,
    status: 'locked',
    videoId: 'HXV3zeQKqGY',
    description: 'Understand relational databases, normalization, complex queries, and ORM integrations.'
  },
  {
    id: 5,
    title: 'API Development & Testing',
    lessons: 12,
    weeks: 3,
    progress: 0,
    status: 'locked',
    videoId: 'W6NZfCO5SIk',
    description: 'Secure your APIs using JWT, setup automated testing with Jest, and implement CI/CD.'
  },
  {
    id: 6,
    title: 'DevOps & Deployment',
    lessons: 14,
    weeks: 4,
    progress: 0,
    status: 'locked',
    videoId: 'bMknfKXIFA8',
    description: 'Containerize with Docker, orchestrate with Kubernetes, and deploy to AWS/DigitalOcean.'
  }
];

const mockApplicationsDefault = [
  { id: 1, company: 'TechCorp Inc.', position: 'Senior Full Stack Developer', date: 'Apr 1, 2026', status: 'pending' },
  { id: 2, company: 'DesignHub', position: 'Frontend React Developer', date: 'Mar 31, 2026', status: 'applied' },
  { id: 3, company: 'StartupXYZ', position: 'JavaScript Engineer', date: 'Mar 30, 2026', status: 'rejected' },
  { id: 4, company: 'CloudTech Solutions', position: 'Full Stack Engineer', date: 'Mar 29, 2026', status: 'applied' },
  { id: 5, company: 'Digital Agency', position: 'Web Developer', date: 'Mar 28, 2026', status: 'pending' }
];

const generateRoadmapFor = (title) => {
  return [
    {
      id: 1,
      title: `${title} Core Fundamentals`,
      lessons: 10,
      weeks: 3,
      progress: 0,
      status: 'in-progress', // start here
      videoId: 'W6NZfCO5SIk',
      description: `Learn the core concepts and fundamental principles of ${title}.`
    },
    {
      id: 2,
      title: `Advanced ${title} Tools & Patterns`,
      lessons: 15,
      weeks: 5,
      progress: 0,
      status: 'locked',
      videoId: 'bMknfKXIFA8',
      description: `Master the industry-standard tools and architectural patterns used by ${title} professionals.`
    },
    {
      id: 3,
      title: 'Real-World Scale Projects',
      lessons: 12,
      weeks: 4,
      progress: 0,
      status: 'locked',
      videoId: 'RLtyhwFtXQA', 
      description: `Apply your knowledge by building complex portfolio-ready projects.`
    },
    {
      id: 4,
      title: 'Interview Preparation',
      lessons: 5,
      weeks: 2,
      progress: 0,
      status: 'locked',
      videoId: 'HXV3zeQKqGY',
      description: `Prepare for technical interviews and evaluations specific to ${title} roles.`
    }
  ];
};

const API_BASE_URL = "http://localhost:8000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'Guest User',
    email: '',
    phone: '',
    skills: ['JavaScript'],
    interests: ['Web Development'],
    selectedCareer: 'Full Stack Developer',
    aboutInfo: '',
    assessmentScore: 0
  });

  const [roadmap, setRoadmap] = useState(fullStackRoadmapDefault);
  const [applications, setApplications] = useState(mockApplicationsDefault);

  // Initial load from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, roadmapRes, appsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/profile`),
          fetch(`${API_BASE_URL}/roadmap`),
          fetch(`${API_BASE_URL}/applications`)
        ]);

        if (profileRes.ok) {
          const profile = await profileRes.json();
          if (profile.name !== "Guest User") setUserData(profile);
        }
        if (roadmapRes.ok) {
          const remoteRoadmap = await roadmapRes.json();
          if (remoteRoadmap.length > 0) setRoadmap(remoteRoadmap);
        }
        if (appsRes.ok) {
          const remoteApps = await appsRes.json();
          if (remoteApps.length > 0) setApplications(remoteApps);
        }
      } catch (err) {
        console.error("Failed to fetch data from FastAPI:", err);
      }
    };
    fetchData();
  }, []);

  // Sync to Backend + LocalStorage
  useEffect(() => {
    localStorage.setItem('cp_userData', JSON.stringify(userData));
    fetch(`${API_BASE_URL}/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    }).catch(e => console.log("Sync failed:", e));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('cp_roadmap', JSON.stringify(roadmap));
    fetch(`${API_BASE_URL}/roadmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roadmap)
    }).catch(e => console.log("Sync failed:", e));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem('cp_applications', JSON.stringify(applications));
    fetch(`${API_BASE_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applications)
    }).catch(e => console.log("Sync failed:", e));
  }, [applications]);

  const selectCareer = (careerTitle) => {
    const newRoadmap = generateRoadmapFor(careerTitle);
    setUserData(prev => ({ ...prev, selectedCareer: careerTitle }));
    setRoadmap(newRoadmap);
  };

  return (
    <AppContext.Provider value={{ 
      userData, setUserData,
      roadmap, setRoadmap,
      applications, setApplications,
      selectCareer
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
