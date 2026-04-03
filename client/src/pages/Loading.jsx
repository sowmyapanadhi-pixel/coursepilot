import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Loader2 } from 'lucide-react';

const Loading = () => {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState('Analyzing your profile...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Sequence of loading texts
    const texts = [
      'Evaluating technical skills...',
      'Mapping career trajectories...',
      'Generating personalized roadmap...',
      'Finalizing your dashboard...',
    ];
    
    let index = 0;
    const textInterval = setInterval(() => {
      if (index < texts.length) {
        setLoadingText(texts[index]);
        index++;
      }
    }, 900);

    // Progress bar simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Navigate to dashboard after 4 seconds
    const timeout = setTimeout(() => {
      navigate('/dashboard');
    }, 4500);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#fdf2f8] to-[#f5f3ff] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      {/* Dynamic background elements for pastel mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-80 h-80 bg-violet-100/40 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-rose-100/40 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        <div className="relative mb-14 scale-110">
          <div className="w-40 h-40 bg-white rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl relative">
             <BrainCircuit size={84} className="text-violet-600 animate-pulse" />
             {/* Spinning rings */}
             <div className="absolute inset-[-15px] border-4 border-dashed border-violet-200 rounded-full animate-[spin_15s_linear_infinite]"></div>
             <div className="absolute inset-[-30px] border-2 border-dotted border-rose-200 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
          </div>
        </div>

        <h2 className="text-5xl font-black text-slate-800 mb-6 tracking-tight uppercase">
          AI Synchronizing
        </h2>
        
        <p className="text-slate-500 text-xl font-bold italic mb-12 max-w-md mx-auto h-8">
          {loadingText}
        </p>

        <div className="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner shadow-indigo-50 border-2 border-white">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 via-rose-400 to-teal-400 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-6 flex justify-between text-xs font-black text-violet-600 uppercase tracking-[0.3em] italic">
           <span>Analyzing Persona logic</span>
           <span>{progress}% Optimized</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
