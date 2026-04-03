import React, { useState } from 'react';
import { PlayCircle, CheckCircle, BrainCircuit, BookOpen, Clock, Lock, ChevronLeft, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { evaluateLearningAnswer } from '../utils/aiEngine';

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

  const handleEvaluate = async () => {
    if (explanation.length < 20) {
      alert("Please write a longer explanation (at least 20 letters) so the AI can check your answer.");
      return;
    }

    setEvaluating(true);
    try {
      const result = await evaluateLearningAnswer(activeModule.title, explanation);
      setFeedback(result);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setEvaluating(false);
    }
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
        <div className="glass-panel p-8 mb-12 shadow-xl shadow-indigo-50 border-white">
          <h1 className="text-2xl font-black text-slate-800 mb-2">{userData.selectedCareer} Roadmap</h1>
          <p className="text-slate-500 mb-6 font-medium italic">Your personalized learning path to becoming a {userData.selectedCareer}</p>
          
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-slate-600">Course Progress</span>
            <span className="text-sm font-bold text-indigo-600">{overallProgress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner shadow-slate-200">
            <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-1000" style={{ width: `${overallProgress}%` }}></div>
          </div>
        </div>

        <div className="relative pl-8 md:pl-12 space-y-8">
          <div className="absolute top-0 bottom-0 left-[15px] md:left-[23px] w-[3px] bg-slate-100 rounded-full shadow-sm"></div>

          {roadmap.map((mod, i) => {
            const isCompleted = mod.status === 'completed';
            const isInProgress = mod.status === 'in-progress';
            const isLocked = mod.status === 'locked';
            
            return (
              <div key={mod.id} className="relative group">
                <div className={`absolute -left-8 md:-left-12 top-6 w-6 h-6 rounded-full border-4 border-[#f8fafc] z-10 flex items-center justify-center transition-colors duration-500 shadow-sm
                  ${isCompleted ? 'bg-emerald-400' : isInProgress ? 'bg-indigo-500' : isLocked ? 'bg-slate-200' : 'bg-slate-300'}
                `}>
                  {isCompleted && <CheckCircle size={10} className="text-white" strokeWidth={4} />}
                  {isInProgress && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  {isLocked && <Lock size={10} className="text-slate-500" strokeWidth={3} />}
                </div>

                <div className={`glass-panel p-6 border transition-all duration-300
                  ${isLocked ? 'opacity-60 border-slate-100 bg-white/40' : 'border-slate-100 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-50 bg-white group-hover:-translate-y-0.5'}
                `}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-black mb-2 ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>{mod.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 font-bold">
                        <span className="flex items-center gap-1.5"><BookOpen size={16} /> {mod.lessons} lessons</span>
                        <span className="flex items-center gap-1.5"><Clock size={16} /> {mod.weeks} weeks</span>
                      </div>
                    </div>
                    {isCompleted && <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-black rounded-full border border-emerald-100 uppercase tracking-wider">Completed</span>}
                    {isLocked && <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Locked</span>}
                  </div>

                  {!isLocked && (
                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-xs font-bold text-slate-500">Module Progress</span>
                        <span className="text-xs font-bold text-indigo-600">{mod.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden shadow-inner shadow-slate-100">
                        <div className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-400' : 'bg-gradient-to-r from-indigo-400 to-purple-400'}`} style={{ width: `${mod.progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {!isLocked && (
                    <button 
                      onClick={() => setActiveModule(mod)}
                      className={`w-full py-3.5 rounded-xl font-black transition-all flex items-center justify-center gap-2
                        ${isCompleted 
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-100 active:scale-95'}
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
            <div className="glass-panel p-10 border-2 border-indigo-400/30 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-slate-800 mb-4 flex flex-col items-center gap-4">
                   <div className="bg-indigo-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-2 rotate-6">🎉</div>
                   Course Completed!
                </h2>
                <p className="text-slate-600 mb-8 max-w-lg mx-auto font-bold text-lg">You've finished all the modules in this path. It is time to create your resume and start applying for jobs.</p>
                <button onClick={() => navigate('/resume')} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xl w-full max-w-md mx-auto py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-95">
                  <Sparkles size={24} />
                  Create AI Resume
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
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors font-bold text-lg"
      >
        <ChevronLeft size={20} />
        Back to Roadmap
      </button>

      <div className="glass-panel p-10 border-white shadow-2xl shadow-indigo-50">
        <h2 className="text-4xl font-black text-slate-800 mb-3">{activeModule.title}</h2>
        <p className="text-slate-600 mb-10 max-w-3xl font-medium text-lg leading-relaxed">{activeModule.description}</p>
        
        <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border-4 border-white mb-12 shadow-2xl relative">
           <iframe 
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${activeModule.videoId}?rel=0`} 
              title="YouTube video player" 
              frameBorder="0" 
              allowFullScreen>
           </iframe>
        </div>

        <div className="border border-slate-100 rounded-3xl p-8 bg-slate-50/50 relative overflow-hidden shadow-inner shadow-slate-100">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
          
          <h3 className="text-3xl font-black text-slate-800 mb-4 flex items-center gap-4">
            <BrainCircuit className="text-indigo-600" size={32} />
            Check Your Understanding
          </h3>
          <p className="text-slate-600 mb-8 text-xl font-bold italic">
            Ready to finish this module? Explain the main ideas of <strong className="text-indigo-600">"{activeModule.title}"</strong> to confirm what you learned.
          </p>
          
          <textarea
             disabled={feedback !== null}
             value={explanation}
             onChange={(e) => setExplanation(e.target.value)}
             placeholder="Type your explanation here..."
             className="w-full h-56 bg-white border-2 border-slate-100 rounded-2xl p-6 text-slate-800 font-medium text-lg focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all outline-none disabled:opacity-50"
          />
          
          {!feedback ? (
            <button onClick={handleEvaluate} disabled={evaluating || explanation.length === 0} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-purple-100 transition-all flex items-center justify-center gap-3 text-xl disabled:opacity-50 active:scale-95 border-b-8 border-black/10">
              {evaluating ? <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-white"></div> : <div className="flex items-center gap-3"><Zap size={24} /><span>Check My Answer</span></div>}
            </button>
          ) : (
            <div className={`bg-white border-4 rounded-[2.5rem] p-10 shadow-2xl transition-all ${feedback.isRelevant ? 'border-emerald-100 shadow-emerald-50' : 'border-amber-100 shadow-amber-50'}`}>
              <div className="flex gap-8 mb-8 border-b-4 border-slate-50 pb-8">
                <div className={`text-6xl font-black italic tracking-tighter w-40 flex justify-center ${feedback.isRelevant ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {feedback.isRelevant ? (
                    <span>{feedback.score}<span className="text-2xl text-slate-400 opacity-50 not-italic">/100</span></span>
                  ) : (
                    <div className="bg-amber-50 p-4 rounded-3xl border-4 border-amber-100 animate-pulse">
                       <AlertCircle size={64} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className={`font-black text-3xl uppercase italic tracking-tight ${feedback.isRelevant ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {feedback.isRelevant ? 'Correct Answer!' : 'Incomplete Answer'}
                  </h4>
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mt-1 opacity-80">AI Learning Assistant</p>
                </div>
              </div>
              
              <p className="text-slate-600 mb-12 text-xl font-medium leading-relaxed italic border-l-8 border-slate-50 pl-8 bg-slate-50/30 p-8 rounded-r-3xl">
                {feedback.feedback}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                 {feedback.isRelevant ? (
                   <>
                     <button onClick={() => setFeedback(null)} className="py-5 px-10 border-4 border-slate-50 hover:bg-slate-50 text-slate-500 font-black rounded-2xl transition-all uppercase tracking-widest text-xs italic">Edit Answer</button>
                     <button onClick={markCompleteAndReturn} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white py-5 px-8 font-black text-xl rounded-2xl shadow-xl shadow-emerald-100 transition-all active:scale-95 border-b-8 border-black/10 flex items-center justify-center gap-3">
                       <CheckCircle size={24} />
                       <span>Complete & Return</span>
                     </button>
                   </>
                 ) : (
                   <>
                     <button onClick={() => { setFeedback(null); setExplanation(''); }} className="py-5 px-10 border-4 border-slate-50 hover:bg-slate-50 text-slate-500 font-black rounded-2xl transition-all uppercase tracking-widest text-xs italic">Clear and Try Again</button>
                     <button 
                       onClick={() => {
                          const element = document.querySelector('iframe');
                          if(element) element.scrollIntoView({ behavior: 'smooth' });
                       }} 
                       className="flex-1 bg-amber-500 hover:bg-amber-400 text-white py-5 px-8 font-black text-xl rounded-2xl shadow-xl shadow-amber-100 transition-all active:scale-95 border-b-8 border-black/10 flex items-center justify-center gap-3"
                     >
                       <PlayCircle size={24} />
                       <span>Watch Module Video Again</span>
                     </button>
                   </>
                 )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;
