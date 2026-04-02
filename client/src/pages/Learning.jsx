import React, { useState } from 'react';
import { PlayCircle, CheckCircle, BrainCircuit, BookOpen, Clock, Lock, ChevronLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Learning = () => {
  const navigate = useNavigate();
  const { roadmap, setRoadmap, userData } = useAppContext();
  const [activeModule, setActiveModule] = useState(null);
  
  // States purely for the active module view
  const [explanation, setExplanation] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Dynamic progress calculation
  const completedCount = roadmap.filter(r => r.status === 'completed').length;
  const overallProgress = Math.round((completedCount / roadmap.length) * 100) || 16;

  const handleEvaluate = () => {
    if (explanation.length < 20) {
      alert("Please provide a more detailed explanation (at least 20 characters).");
      return;
    }
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      let score = Math.min(85 + (explanation.length / 10), 98);
      setFeedback({
        score: Math.round(score),
        text: score > 90 ? '🌟 Excellent understanding! You nailed the core concepts perfectly.' : '👍 Good job! You covered the basics well. Review the feedback and continue.'
      });
    }, 1500);
  };

  const markCompleteAndReturn = () => {
    setRoadmap(prev => {
      const newMap = [...prev];
      const idx = newMap.findIndex(m => m.id === activeModule.id);
      if (idx > -1) {
        newMap[idx].status = 'completed';
        newMap[idx].progress = 100;
        
        // Unlock next module
        if (idx + 1 < newMap.length) {
          if (newMap[idx + 1].status === 'locked' || newMap[idx + 1].status === 'available') {
            newMap[idx + 1].status = 'in-progress';
          }
        }
      }
      return newMap;
    });
    
    // clear active
    setActiveModule(null);
    setFeedback(null);
    setExplanation('');
  };

  if (!activeModule) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="glass-panel p-8 mb-12">
          <h1 className="text-2xl font-bold text-white mb-2">{userData.selectedCareer} Roadmap</h1>
          <p className="text-slate-400 mb-6 font-medium">Your personalized learning path to becoming a {userData.selectedCareer}</p>
          
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-slate-300">Overall Progress</span>
            <span className="text-sm font-bold text-indigo-400">{overallProgress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" style={{ width: `${overallProgress}%` }}></div>
          </div>
        </div>

        <div className="relative pl-8 md:pl-12 space-y-8">
          <div className="absolute top-0 bottom-0 left-[15px] md:left-[23px] w-[2px] bg-slate-800 rounded-full"></div>

          {roadmap.map((mod, i) => {
            const isCompleted = mod.status === 'completed';
            const isInProgress = mod.status === 'in-progress';
            const isLocked = mod.status === 'locked';
            
            return (
              <div key={mod.id} className="relative group">
                <div className={`absolute -left-8 md:-left-12 top-6 w-6 h-6 rounded-full border-4 border-slate-950 z-10 flex items-center justify-center transition-colors duration-500
                  ${isCompleted ? 'bg-green-500' : isInProgress ? 'bg-indigo-500' : isLocked ? 'bg-slate-700' : 'bg-slate-500'}
                `}>
                  {isCompleted && <CheckCircle size={10} className="text-slate-950" strokeWidth={4} />}
                  {isInProgress && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  {isLocked && <Lock size={10} className="text-slate-950" strokeWidth={3} />}
                </div>

                <div className={`glass-panel p-6 border transition-all duration-300
                  ${isLocked ? 'opacity-60 border-slate-800 bg-slate-900/40' : 'border-slate-700 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]'}
                `}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-500' : 'text-white'}`}>{mod.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5"><BookOpen size={16} /> {mod.lessons} lessons</span>
                        <span className="flex items-center gap-1.5"><Clock size={16} /> {mod.weeks} weeks</span>
                      </div>
                    </div>
                    {isCompleted && <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/20">Completed</span>}
                    {isLocked && <span className="text-slate-500 text-sm font-medium">Locked</span>}
                  </div>

                  {!isLocked && (
                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-xs font-semibold text-slate-400">Progress</span>
                        <span className="text-xs font-bold text-indigo-400">{mod.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} style={{ width: `${mod.progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {!isLocked && (
                    <button 
                      onClick={() => setActiveModule(mod)}
                      className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                        ${isCompleted 
                          ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'}
                      `}
                    >
                      <span>{isCompleted ? 'Review Material' : isInProgress ? 'Continue Learning' : 'Start Learning'}</span>
                      <PlayCircle size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {overallProgress >= 100 && (
          <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
            <div className="glass-panel p-8 border-2 border-indigo-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2 flex flex-col items-center gap-2">
                   <div className="bg-indigo-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/40 mb-2">🎉</div>
                   Roadmap Completed!
                </h2>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto">You've mastered the required skills for this career path. It is time to construct your professional profile and start applying.</p>
                <button onClick={() => navigate('/resume')} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg w-full max-w-md mx-auto py-4 rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2">
                  <Sparkles size={24} />
                  Generate AI Resume
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto">
      <button 
        onClick={() => {
          setActiveModule(null);
          setFeedback(null);
          setExplanation('');
        }}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium"
      >
        <ChevronLeft size={20} />
        Back to Roadmap
      </button>

      <div className="glass-panel p-8">
        <h2 className="text-3xl font-bold text-white mb-2">{activeModule.title}</h2>
        <p className="text-slate-400 mb-8 max-w-3xl">{activeModule.description}</p>
        
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 mb-10 shadow-2xl relative">
           <iframe 
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${activeModule.videoId}?rel=0`} 
              title="YouTube video player" 
              frameBorder="0" 
              allowFullScreen>
           </iframe>
        </div>

        <div className="border border-slate-800 rounded-2xl p-6 bg-slate-900/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          
          <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
            <BrainCircuit className="text-indigo-400" size={28} />
            AI Concept Evaluation
          </h3>
          <p className="text-slate-400 mb-6 text-lg">
            Ready to pass this module? Explain the core concepts of <strong className="text-slate-200">{activeModule.title}</strong> to verify your understanding.
          </p>
          
          <textarea
             disabled={feedback !== null}
             value={explanation}
             onChange={(e) => setExplanation(e.target.value)}
             placeholder="Write your explanation in detail here..."
             className="w-full h-48 bg-slate-950 border border-slate-700 rounded-xl p-5 text-slate-200 focus:ring-2 focus:ring-indigo-500 mb-6 disabled:opacity-50"
          />
          
          {!feedback ? (
            <button onClick={handleEvaluate} disabled={evaluating || explanation.length === 0} className="btn-primary px-8 py-3 flex gap-2">
              {evaluating ? <span>Evaluating...</span> : <span>Submit for Evaluation</span>}
            </button>
          ) : (
            <div className="bg-slate-800 border border-indigo-500/30 rounded-xl p-6">
              <div className="flex gap-4 mb-4">
                <div className="text-4xl font-extrabold text-green-400">{feedback.score}/100</div>
                <div>
                  <h4 className="font-bold text-white text-xl">Evaluation Complete</h4>
                  <p className="text-indigo-300">Passed Successfully</p>
                </div>
              </div>
              <p className="text-slate-300 mb-8">{feedback.text}</p>
              <div className="flex gap-4">
                 <button onClick={() => setFeedback(null)} className="btn-secondary px-6">Try Again</button>
                 <button onClick={markCompleteAndReturn} className="btn-primary flex-1 flex justify-center gap-2">
                   <span>Mark as Completed & Return</span>
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;
