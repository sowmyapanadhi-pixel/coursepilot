import React, { useState, useEffect } from 'react';
import { Target, ArrowRight, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Simple mock question bank
const questionBank = {
  JavaScript: [
    { q: 'What is a closure in JavaScript?', opts: ['A function with access to its outer scope', 'A loop closing', 'A CSS property', 'Window close event'], ans: 0 },
    { q: 'What does JSON.stringify() do?', opts: ['Parses a JSON string', 'Converts JS object to JSON string', 'Secures the JSON', 'None of the above'], ans: 1 }
  ],
  React: [
    { q: 'What is the Virtual DOM in React?', opts: ['A real DOM copy for efficiency', 'A completely new browser', 'A CSS framework', 'A backend server'], ans: 0 },
    { q: 'Which hook deals with side effects?', opts: ['useState', 'useEffect', 'useReducer', 'useContext'], ans: 1 }
  ],
  Python: [
    { q: 'What is a list comprehension?', opts: ['A compact way to create lists', 'A sorting algorithm', 'A database', 'An error'], ans: 0 }
  ],
  default: [
    { q: 'What does API stand for?', opts: ['Application Programming Interface', 'Automated Process Internet', 'Applied Programming Integration', 'None'], ans: 0 },
    { q: 'What is version control used for?', opts: ['Managing databases', 'Designing UI', 'Tracking code changes', 'Speeding up internet'], ans: 2 }
  ]
};

const Assessment = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useAppContext();
  const [started, setStarted] = useState(false);
  
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Generate questions based on user skills
    let generated = [];
    if (userData.skills && userData.skills.length > 0) {
      userData.skills.forEach(skill => {
        if (questionBank[skill]) {
          generated = [...generated, ...questionBank[skill]];
        }
      });
    }
    
    // Fallback to default if no matching skills found or array too small
    if (generated.length < 2) {
      generated = [...generated, ...questionBank.default];
    }
    
    // limit to 3 questions for quick demo
    setQuestions(generated.slice(0, 3));
  }, [userData.skills]);

  const handleNext = () => {
    // Check answer
    const isCorrect = selectedOption === questions[currentQIndex].ans;
    if (isCorrect) setScore(prev => prev + 1);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Finished
      const finalScore = isCorrect ? score + 1 : score;
      setUserData(prev => ({ ...prev, assessmentScore: Math.round((finalScore / questions.length) * 100) }));
      navigate('/careers');
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-4xl font-black text-slate-800 mb-2">Skill Assessment</h1>
      <p className="text-slate-500 font-bold mb-8 italic text-lg">Evaluate your technical skills to uncover your specific strengths.</p>

      {!started ? (
        <div className="glass-panel p-12 text-center flex flex-col items-center bg-white border-white shadow-2xl shadow-indigo-50">
          <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
            <BrainCircuit size={48} className="text-indigo-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-tight">Quiz Generated from Your Skills</h2>
          <p className="text-slate-500 max-w-lg mb-10 text-xl font-medium leading-relaxed">
            We've generated {questions.length} questions based on your stated skills: <span className="text-indigo-600 font-black italic">{userData.skills?.join(', ') || 'General Knowledge'}</span>.
          </p>
          <button 
            onClick={() => setStarted(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl px-12 py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center gap-3 active:scale-95"
          >
            <span>Start Assessment</span>
            <Target size={24} />
          </button>
        </div>
      ) : (
        <div className="glass-panel p-12 bg-white border-white shadow-2xl shadow-indigo-50">
          <div className="flex justify-between items-center mb-10">
            <span className="text-indigo-600 font-black tracking-[0.2em] uppercase text-xs">Question {currentQIndex + 1} of {questions.length}</span>
            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500 transition-all" style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
          </div>
          
          <h2 className="text-3xl text-slate-800 font-black mb-10 leading-tight">
            {questions[currentQIndex]?.q}
          </h2>
          
          <div className="space-y-5 mb-10 text-left">
            {questions[currentQIndex]?.opts.map((option, i) => (
              <label 
                key={i} 
                className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                  selectedOption === i 
                    ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-50' 
                    : 'border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-6 flex items-center justify-center transition-all ${selectedOption === i ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200'}`}>
                  {selectedOption === i && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <input 
                  type="radio" 
                  name="answer"
                  checked={selectedOption === i}
                  onChange={() => setSelectedOption(i)} 
                  className="hidden" 
                />
                <span className={`text-xl font-bold ${selectedOption === i ? 'text-indigo-900' : 'text-slate-600'}`}>{option}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center pt-8 border-t-2 border-slate-50">
            <button className="text-slate-400 hover:text-rose-500 transition-colors font-black uppercase tracking-widest text-sm" onClick={() => navigate('/dashboard')}>
              Quit Assessment
            </button>
            <button 
              onClick={handleNext}
              disabled={selectedOption === null}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black px-10 py-4 rounded-xl shadow-xl shadow-indigo-100 transition-all flex items-center gap-3 active:scale-95 text-lg"
            >
              <span>{currentQIndex === questions.length - 1 ? 'Finish & See Careers' : 'Next Question'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment;
