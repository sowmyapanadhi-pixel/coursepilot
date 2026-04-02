import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Loader2 } from 'lucide-react';

const Loading = () => {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState('Analyzing your profile...');

  useEffect(() => {
    // Sequence of loading texts
    const texts = [
      'Evaluating technical skills...',
      'Mapping career trajectories...',
      'Generating personalized roadmap...',
      'Finalizing your dashboard...',
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      index++;
      if (index === texts.length) {
        clearInterval(interval);
      }
    }, 800);

    // Navigate to dashboard after 3.5 seconds
    const timeout = setTimeout(() => {
      navigate('/dashboard');
    }, 3800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-12 animate-in zoom-in duration-500">
        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[50px] opacity-20 animate-pulse"></div>
        <div className="w-32 h-32 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center relative z-10 shadow-2xl shadow-indigo-500/10">
          <BrainCircuit size={60} className="text-indigo-400 animate-pulse" />
        </div>
        
        {/* Orbiting element */}
        <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full animate-[spin_4s_linear_infinite]">
          <div className="absolute top-0 right-4 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
        </div>
        <div className="absolute inset-[-20px] border border-purple-500/20 rounded-full animate-[spin_5s_linear_infinite_reverse]">
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
        Building Your Career Profile
      </h2>
      
      <div className="flex flex-col items-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-indigo-400" size={24} />
        <p className="text-lg animate-pulse">{loadingText}</p>
      </div>
      
      <div className="w-64 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 animate-[pulse_2s_ease-in-out_infinite] w-full origin-left shrink-0 scale-x-0 transition-transform duration-[3800ms] ease-out" style={{ transform: 'scaleX(1)' }}></div>
      </div>
    </div>
  );
};

export default Loading;
