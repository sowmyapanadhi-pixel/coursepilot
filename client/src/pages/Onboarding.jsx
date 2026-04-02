import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Target, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const availableSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++',
  'Machine Learning', 'Data Analysis', 'UI/UX Design', 'SQL', 'AWS',
  'Docker', 'Communication', 'Leadership', 'Problem Solving'
];

const availableInterests = [
  'Web Development', 'Mobile Apps', 'AI/ML', 'Data Science', 'Cybersecurity',
  'Cloud Computing', 'Game Development', 'DevOps'
];

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

const Onboarding = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useAppContext();
  
  // Step logic
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Step 1 Data
  const [selectedSkills, setSelectedSkills] = useState(userData.skills || []);
  const [selectedInterests, setSelectedInterests] = useState(userData.interests || []);
  const [aboutText, setAboutText] = useState(userData.aboutInfo || '');
  const [education, setEducation] = useState('');

  // Step 2 Data (Assessment)
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Initialize questions on component mount so they are ready when we transition to Step 2
  useEffect(() => {
    if (userData.skills && userData.skills.length > 0) {
      generateQuestions(userData.skills);
    }
  }, [userData.skills]);

  const generateQuestions = (skills) => {
    let generated = [];
    const topics = skills.length > 0 ? skills : ['default'];
    topics.forEach(skill => {
      if (questionBank[skill]) {
        generated = [...generated, ...questionBank[skill]];
      }
    });
    
    if (generated.length < 3) {
      generated = [...generated, ...questionBank.default];
    }
    
    const shuffled = generated.sort(() => 0.5 - Math.random()).slice(0, 3);
    setQuestions(shuffled);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    generateQuestions(selectedSkills);
    setStep(2);
  };

  const handleQuizNext = () => {
    const isCorrect = selectedOption === questions[currentQIndex].ans;
    const newScore = isCorrect ? score + 1 : score;
    
    if (currentQIndex < questions.length - 1) {
      setScore(newScore);
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Finalize onboarding
      const finalPercentage = Math.round((newScore / questions.length) * 100);
      setUserData(prev => ({
        ...prev,
        skills: selectedSkills,
        interests: selectedInterests,
        aboutInfo: aboutText,
        assessmentScore: finalPercentage
      }));
      navigate('/analyzing');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-6 overflow-x-hidden">
      
      {/* Top Header */}
      <header className="w-full max-w-4xl flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
             CP
           </div>
           <span className="font-bold text-xl text-white">CoursePilot AI</span>
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mt-4 mb-10 flex flex-col items-center">
         <div className="flex justify-between w-full text-sm font-medium mb-2">
            <span className="text-slate-400">Step {step} of {totalSteps}</span>
            <span className="text-indigo-400">{Math.round((step / totalSteps) * 100)}%</span>
         </div>
         <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
         </div>
      </div>

      {step === 1 ? (
        <div className="glass-panel max-w-4xl w-full p-8 md:p-12 animate-in slide-in-from-right-8 duration-500">
          <h1 className="text-3xl font-bold text-white mb-2">Tell us about yourself</h1>
          <p className="text-slate-400 mb-10 text-lg">Help us personalize your career journey</p>
          
          <form onSubmit={handleNextStep} className="space-y-10">
            <div>
              <label className="block text-slate-300 font-medium mb-3">About You</label>
              <textarea 
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                placeholder="Tell us a little bit about yourself, your background, and your goals..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px] transition-all"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-3">Education Level</label>
              <select 
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select your education level</option>
                <option value="highschool">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">Ph.D.</option>
                <option value="other">Other / Self-taught</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-3">
                Your Skills <span className="text-slate-500 font-normal text-sm ml-2">({selectedSkills.length} selected)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {availableSkills.map(skill => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 font-medium ${
                      selectedSkills.includes(skill)
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-3">
                Your Interests <span className="text-slate-500 font-normal text-sm ml-2">({selectedInterests.length} selected)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {availableInterests.map(interest => (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 font-medium ${
                      selectedInterests.includes(interest)
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
              >
                <span>Continue to Skill Check</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="glass-panel max-w-4xl w-full p-8 md:p-12 animate-in slide-in-from-right-8 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <BrainCircuit size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">Quick Skill Check</h1>
          </div>
          <p className="text-slate-400 mb-10 text-lg">We've generated a few random questions based on your selected skills.</p>

          <div className="mb-8">
            <span className="text-indigo-400 font-medium tracking-wide uppercase text-sm">Question {currentQIndex + 1} of {questions.length}</span>
            <h2 className="text-2xl text-white font-medium mt-4 mb-8">
              {questions[currentQIndex]?.q}
            </h2>
            
            <div className="space-y-4">
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
                    name="onboarding-quiz"
                    checked={selectedOption === i}
                    onChange={() => setSelectedOption(i)} 
                    className="mr-4 accent-indigo-500 w-5 h-5 bg-slate-900" 
                  />
                  <span className="text-slate-300 text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-slate-800">
            <button 
              onClick={() => setStep(1)} 
              className="text-slate-400 hover:text-white transition-colors"
            >
              Back to Info
            </button>
            <button 
              onClick={handleQuizNext}
              disabled={selectedOption === null}
              className="btn-primary px-8 py-3 flex items-center gap-2"
            >
              <span>{currentQIndex === questions.length - 1 ? 'Finish Onboarding' : 'Next Question'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
