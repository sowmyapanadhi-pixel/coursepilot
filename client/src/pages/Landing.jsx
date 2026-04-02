import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Target, BookOpen, Briefcase } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-xl">🚀</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            CoursePilot
          </span>
        </div>
        <div>
          <button 
            onClick={() => navigate('/login')}
            className="text-slate-300 hover:text-white font-medium px-6 py-2 transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-white font-medium px-6 py-2 rounded-lg transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Powered by Advanced AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Discover Your True <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
            Career Potential
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12">
          CareerPilot analyzes your skills, tests your logic, and uses AI to map out 
          the perfect career path, complete with a personalized learning curriculum and job matches.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <span>Start Your Journey</span>
            <ArrowRight size={20} />
          </button>
          
          <button className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white font-medium text-lg px-8 py-4 rounded-xl transition-all backdrop-blur-sm">
            View Live Demo
          </button>
        </div>

        {/* Feature Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full max-w-5xl">
          <div className="glass-panel p-8 border-t-4 border-t-indigo-500">
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Skill Evaluation</h3>
            <p className="text-slate-400">Take dynamic assessments tailored to your unique profile to evaluate your technical and logical aptitude.</p>
          </div>
          
          <div className="glass-panel p-8 border-t-4 border-t-purple-500">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Career Matches</h3>
            <p className="text-slate-400">Get top-matched career recommendations based on market data, salary trends, and your specific strengths.</p>
          </div>
          
          <div className="glass-panel p-8 border-t-4 border-t-cyan-500">
            <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mb-6">
              <Briefcase size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Resume & Job Pipeline</h3>
            <p className="text-slate-400">Auto-generate AI-driven resumes and track mock job applications all within the same dashboard.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
