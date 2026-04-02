import React from 'react';
import { Briefcase, TrendingUp, ChevronRight, Award, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Simple mock career database
const careerDb = {
  'Web Development': {
    title: 'Full Stack Developer',
    explanation: 'Build complete web applications. Matches your interest in Web Development.',
    demand: 'Very High',
    matchScore: 95,
    icon: '💻',
    salary: '₹8,00,000 - ₹15,00,000'
  },
  'AI/ML': {
    title: 'AI/ML Engineer',
    explanation: 'Build intelligent systems using Machine Learning. Extremely high demand field.',
    demand: 'Explosive',
    matchScore: 92,
    icon: '🤖',
    salary: '₹12,00,000 - ₹25,00,000'
  },
  'Data Science': {
    title: 'Data Scientist',
    explanation: 'Turn complex data into actionable insights for corporate strategy.',
    demand: 'High',
    matchScore: 88,
    icon: '📊',
    salary: '₹10,00,000 - ₹20,00,000'
  },
  'UI/UX Design': {
    title: 'UX/UI Designer',
    explanation: 'Create intuitive user interfaces and beautiful digital experiences.',
    demand: 'High',
    matchScore: 85,
    icon: '🎨',
    salary: '₹6,00,000 - ₹12,00,000'
  },
  'Cybersecurity': {
    title: 'Security Analyst',
    explanation: 'Protect organizations from cyber threats and security vulnerabilities.',
    demand: 'Very High',
    matchScore: 90,
    icon: '🔒',
    salary: '₹9,00,000 - ₹18,00,000'
  },
  'Mobile Apps': {
    title: 'Mobile App Developer',
    explanation: 'Create applications for iOS and Android platforms.',
    demand: 'Medium',
    matchScore: 80,
    icon: '📱',
    salary: '₹6,00,000 - ₹14,00,000'
  },
  'Cloud Computing': {
    title: 'Cloud Architect',
    explanation: 'Design scalable cloud infrastructure for enterprise applications.',
    demand: 'Very High',
    matchScore: 94,
    icon: '☁️',
    salary: '₹15,00,000 - ₹30,00,000'
  }
};

const topCorporateSkills = [
  { name: 'Generative AI Prompting', trend: '+150% YoY', icon: <BrainCircuit size={16} /> },
  { name: 'Cloud Computing (AWS/Azure)', trend: '+45% YoY', icon: <Cloud size={16} /> },
  { name: 'Cybersecurity Threat Modeling', trend: '+60% YoY', icon: <ShieldAlert size={16} /> },
  { name: 'Data Storytelling', trend: '+35% YoY', icon: <BarChart size={16} /> },
  { name: 'Full Stack React & Node', trend: '+30% YoY', icon: <Code size={16} /> }
];

import { BrainCircuit, Cloud, ShieldAlert, BarChart, Code } from 'lucide-react';

const Careers = () => {
  const navigate = useNavigate();
  const { userData, selectCareer } = useAppContext();
  
  // Calculate careers based on user interests
  let recommendations = [];
  if (userData.interests && userData.interests.length > 0) {
    userData.interests.forEach(interest => {
      if (careerDb[interest]) {
        recommendations.push(careerDb[interest]);
      }
    });
  }
  
  // Fallback default careers
  if (recommendations.length === 0) {
    recommendations = [careerDb['Web Development'], careerDb['Data Science'], careerDb['Cloud Computing']];
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
      
      {/* Top Section - Recommendations */}
      <div>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Career Matches</h1>
            <p className="text-slate-400">
              Personalized based on your <span className="text-purple-400 font-medium">{userData.interests.join(', ') || 'selected interests'}</span> 
              &nbsp;and your assessment score of <span className="text-indigo-400 font-bold">{userData.assessmentScore}%</span>.
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.slice(0, 3).map((career, index) => (
            <div key={index} className="glass-panel p-6 flex flex-col relative overflow-hidden group hover:border-indigo-500/50 transition-all">
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                  #1 MATCH
                </div>
              )}
              
              <div className="text-5xl shrink-0 p-4 bg-slate-800/50 group-hover:bg-slate-800 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 transition-colors">
                {career.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-white">{career.title}</h2>
                </div>
                
                <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20 mb-4">
                  {career.matchScore}% Compatibility
                </span>

                <p className="text-slate-400 mb-6 text-sm">{career.explanation}</p>
                
                <div className="flex flex-col gap-3 text-sm font-medium mb-6">
                  <div className="flex items-center justify-between text-slate-300 bg-slate-800/50 p-2 rounded-lg">
                    <span className="flex items-center gap-2"><TrendingUp size={16} className="text-indigo-400" /> Demand</span>
                    <span className="text-indigo-300">{career.demand}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300 bg-slate-800/50 p-2 rounded-lg">
                    <span className="flex items-center gap-2"><Briefcase size={16} className="text-teal-400" /> Salary</span>
                    <span className="text-teal-300">{career.salary}</span>
                  </div>
                </div>
              </div>
              
              <button onClick={() => { selectCareer(career.title); navigate('/learning'); }} className={`${index === 0 ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'} w-full py-3 rounded-xl transition-all font-medium flex items-center justify-center gap-2 mt-auto border ${index !== 0 ? 'border-slate-700' : 'border-indigo-500'}`}>
                <span>View Roadmap</span>
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Corporate Market Trends */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          Top Skills in the Corporate World
        </h2>
        <p className="text-slate-400 mb-6">Real-time market data showing the most requested skills by top employers this quarter.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topCorporateSkills.map((skill, index) => (
            <div key={index} className="glass-panel p-5 border-t-4 border-t-slate-700 hover:border-t-indigo-500 hover:-translate-y-1 transition-all duration-300 cursor-default">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-slate-800 rounded-lg text-indigo-400">
                  {skill.icon}
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${index < 2 ? 'bg-green-500/20 text-green-400 relative overflow-hidden' : 'bg-slate-800 text-slate-300'}`}>
                  {index < 2 && <span className="absolute inset-0 bg-white/20 animate-pulse"></span>}
                  {skill.trend}
                </div>
              </div>
              <h4 className="font-semibold text-white leading-tight">{skill.name}</h4>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Careers;
