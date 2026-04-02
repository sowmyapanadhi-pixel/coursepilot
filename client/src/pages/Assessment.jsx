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
      <h1 className="text-3xl font-bold text-white mb-2">Skill Assessment</h1>
      <p className="text-slate-400 mb-8">Evaluate your technical skills to uncover your specific strengths.</p>

      {!started ? (
        <div className="glass-panel p-10 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
            <BrainCircuit size={40} className="text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Quiz Generated from Your Skills</h2>
          <p className="text-slate-400 max-w-lg mb-8 text-lg">
            We've generated {questions.length} questions based on your stated skills: <span className="text-indigo-400 font-medium">{userData.skills.join(', ') || 'General Knowledge'}</span>.
          </p>
          <button 
            onClick={() => setStarted(true)}
            className="btn-primary text-lg px-8 py-3 flex items-center gap-2"
          >
            <span>Start Assessment</span>
            <Target size={20} />
          </button>
        </div>
      ) : (
        <div className="glass-panel p-10">
          <div className="flex justify-between items-center mb-8">
            <span className="text-indigo-400 font-medium tracking-wide uppercase text-sm">Question {currentQIndex + 1} of {questions.length}</span>
          </div>
          
          <h2 className="text-2xl text-white font-medium mb-8">
            {questions[currentQIndex]?.q}
          </h2>
          
          <div className="space-y-4 mb-8">
            {questions[currentQIndex]?.opts.map((option, i) => (
              <label 
                key={i} 
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedOption === i 
                    ? 'border-indigo-500 bg-indigo-500/10' 
                    : 'border-slate-700 hover:bg-slate-800/50 hover:border-slate-500'
                }`}
              >
                <input 
                  type="radio" 
                  name="answer"
                  checked={selectedOption === i}
                  onChange={() => setSelectedOption(i)} 
                  className="mr-4 accent-indigo-500 w-5 h-5 bg-slate-900 border-slate-700" 
                />
                <span className="text-slate-300 text-lg">{option}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-800">
            <button className="text-slate-400 hover:text-white transition-colors" onClick={() => navigate('/dashboard')}>
              Quit Assessment
            </button>
            <button 
              onClick={handleNext}
              disabled={selectedOption === null}
              className="btn-primary flex items-center gap-2"
            >
              <span>{currentQIndex === questions.length - 1 ? 'Finish & See Careers' : 'Next Question'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment;
