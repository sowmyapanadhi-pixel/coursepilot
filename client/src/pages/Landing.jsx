import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Target, BookOpen, Briefcase } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#fdf2f8] to-[#f5f3ff] text-slate-800 overflow-hidden font-sans">
      {/* Background glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-violet-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-50 transform rotate-3">
            <span className="text-2xl">🚀</span>
          </div>
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-rose-500">
            CoursePilot
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/login')}
            className="text-slate-600 hover:text-rose-500 font-black px-6 py-2 transition-colors uppercase tracking-widest text-xs"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-violet-500 to-rose-500 hover:from-violet-400 hover:to-rose-400 text-white font-black px-8 py-3 rounded-2xl transition-all shadow-xl shadow-purple-50 uppercase tracking-widest text-xs active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-1000">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-violet-50 border-2 border-violet-100 text-violet-600 font-black text-xs mb-10 shadow-sm uppercase tracking-[0.2em]">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
          </span>
          Next-Gen AI Career Guide
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-10 leading-[0.95] text-slate-900">
          Discover Your True <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-rose-500 to-violet-500">
            Career Potential
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-14 font-medium leading-relaxed italic">
          CoursePilot analyzes your skills, evaluates your logic, and uses AI to map out 
          the perfect career path with a personalized curriculum.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white font-black text-xl px-12 py-5 rounded-3xl shadow-2xl shadow-purple-200 transition-all flex items-center justify-center gap-4 transform hover:scale-105 active:scale-95 border-b-4 border-black/10"
          >
            <span>Start Your Journey</span>
            <ArrowRight size={24} />
          </button>
          
          <button 
            onClick={() => {
              const element = document.getElementById('feature-cards');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white hover:bg-slate-50 border-4 border-slate-100 text-slate-700 font-black text-xl px-12 py-5 rounded-3xl transition-all backdrop-blur-sm shadow-xl shadow-slate-100 uppercase tracking-widest text-sm active:scale-95"
          >
            Explore Experience
          </button>
        </div>

        {/* Feature Cards Showcase */}
        <div id="feature-cards" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left w-full max-w-6xl">
          <div className="glass-panel p-10 border-t-8 border-t-violet-400 shadow-2xl shadow-slate-100 overflow-hidden relative group transition-all hover:shadow-purple-100 hover:-translate-y-2 bg-white">
             <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-8 font-black shadow-inner">
               <BrainCircuit size={32} />
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">AI Skill Mapping</h3>
             <p className="text-slate-600 font-bold text-lg leading-relaxed">Dynamic assessments tailored to your unique profile to evaluate your technical and logical aptitude.</p>
          </div>
          
          <div className="glass-panel p-10 border-t-8 border-t-rose-400 shadow-2xl shadow-slate-100 overflow-hidden relative group transition-all hover:shadow-rose-100 hover:-translate-y-2 bg-white">
             <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-8 font-black shadow-inner">
               <Target size={32} />
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Career Matching</h3>
             <p className="text-slate-600 font-bold text-lg leading-relaxed">Get top-matched career recommendations based on market data, salary trends, and your strengths.</p>
          </div>
          
          <div className="glass-panel p-10 border-t-8 border-t-emerald-400 shadow-2xl shadow-slate-100 overflow-hidden relative group transition-all hover:shadow-emerald-100 hover:-translate-y-2 bg-white">
             <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 font-black shadow-inner">
               <Briefcase size={32} />
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Job Distribution</h3>
             <p className="text-slate-600 font-bold text-lg leading-relaxed">Auto-generate AI-driven resumes and track mock job applications all within the same dashboard.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
