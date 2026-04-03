import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Target, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { generateAIQuestions } from '../utils/aiEngine';

const Onboarding = () => {
  const navigate = useNavigate();
  const { userData, setUserData, selectCareer } = useAppContext();
  
  // Step logic
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Step 1 Data
  const [selectedSkills, setSelectedSkills] = useState(userData.skills || []);
  const [skillText, setSkillText] = useState(userData.skills?.join(', ') || '');
  const [selectedInterests, setSelectedInterests] = useState(userData.interests || []);
  const [interestText, setInterestText] = useState(userData.interests?.join(', ') || '');
  const [aboutText, setAboutText] = useState(userData.aboutInfo || '');
  const [goalText, setGoalText] = useState(userData.goals || '');
  const [education, setEducation] = useState('');
  const [institution, setInstitution] = useState('');

  // Step 2 Data (Assessment)
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateQuestions = async (skills, goals, about) => {
    setIsGenerating(true);
    try {
      const aiQuestions = await generateAIQuestions({
        skills,
        goals,
        about
      });
      setQuestions(aiQuestions);
      setStep(2);
    } catch (err) {
      console.error(err);
      setStep(2); // Still proceed, fallback is inside aiEngine
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    // Parse texts into arrays
    const skillsArray = skillText.split(',').map(s => s.trim()).filter(s => s !== '');
    const interestsArray = interestText.split(',').map(i => i.trim()).filter(i => i !== '');
    
    setSelectedSkills(skillsArray);
    setSelectedInterests(interestsArray);
    await generateQuestions(skillsArray, goalText, aboutText);
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
      
      const newUserData = {
        ...userData,
        skills: selectedSkills,
        interests: selectedInterests,
        aboutInfo: aboutText,
        goals: goalText,
        education: education,
        institution: institution,
        assessmentScore: finalPercentage
      };

      // Set ALL user data first (skills, interests, scores, etc.)
      setUserData(newUserData);

      // Then automatically find and set the best career roadmap
      import('../utils/aiEngine').then(async ({ generateCareerMatches }) => {
        const matches = await generateCareerMatches(newUserData);
        if (matches && matches.length > 0) {
          const topMatch = matches[0].name;
          // selectCareer will specifically update the selectedCareer name and swap the roadmap!
          selectCareer(topMatch);
        }
      });
      
      navigate('/analyzing');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#fdf2f8] to-[#f5f3ff] flex flex-col items-center p-6 overflow-x-hidden">
      
      {/* Top Header */}
      <header className="w-full max-w-4xl flex justify-between items-center py-6">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-gradient-to-tr from-violet-400 to-rose-400 rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-purple-50 transform rotate-3">
             CP
           </div>
           <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-rose-500">CoursePilot AI</span>
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mt-4 mb-14 flex flex-col items-center">
         <div className="flex justify-between w-full text-xs font-black mb-3 uppercase tracking-widest">
            <span className="text-slate-500">Step {step} of {totalSteps}</span>
            <span className="text-violet-600">{Math.round((step / totalSteps) * 100)}% Complete</span>
         </div>
         <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner shadow-slate-200 border border-white">
            <div 
               className="h-full bg-gradient-to-r from-violet-400 via-rose-400 to-teal-400 transition-all duration-1000 rounded-full"
               style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
         </div>
      </div>

      {step === 1 ? (
        <div className="glass-panel max-w-4xl w-full p-10 md:p-14 animate-in slide-in-from-right-12 duration-700 bg-white shadow-2xl shadow-indigo-50 border-white">
          <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Tell us about yourself</h1>
          <p className="text-slate-500 mb-12 text-xl font-medium italic">Help us personalize your learning journey</p>
          
          <form onSubmit={handleNextStep} className="space-y-12">
            <div>
              <label className="block text-slate-800 font-black mb-4 uppercase tracking-widest text-xs">A Brief Introduction</label>
              <textarea 
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                placeholder="Tell us about your background, career goals, and what drives you..."
                className="input-field min-h-[140px] text-lg font-medium leading-relaxed"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-slate-800 font-black mb-4 uppercase tracking-widest text-xs">Educational Background</label>
              <div className="space-y-6">
                <div className="relative">
                  <select 
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="input-field cursor-pointer appearance-none text-lg font-medium"
                    required
                  >
                    <option value="" disabled>Select your highest degree</option>
                    <option value="highschool">High School Diploma</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">Doctorate (Ph.D.)</option>
                    <option value="other">Other / Self-taught Specialist</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ArrowRight className="rotate-90" size={20} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-500 font-black mb-3 uppercase tracking-widest text-[10px] italic">Institution Name</label>
                  <input 
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Enter your College, School, or University name..."
                    className="input-field text-lg font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-800 font-black mb-4 uppercase tracking-widest text-xs">
                Your Skills
              </label>
              <textarea 
                value={skillText}
                onChange={(e) => setSkillText(e.target.value)}
                placeholder="Enter your top skills (e.g. JavaScript, React, Marketing)..."
                className="input-field min-h-[140px] text-lg font-medium leading-relaxed"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-slate-800 font-black mb-4 uppercase tracking-widest text-xs">
                Your Career Goals
              </label>
              <textarea 
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder="Where do you want to be in the next 2-5 years?"
                className="input-field min-h-[140px] text-lg font-medium leading-relaxed"
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white font-black py-5 rounded-3xl shadow-2xl shadow-purple-100 transition-all flex items-center justify-center gap-3 text-xl active:scale-[0.98] border-b-4 border-black/10 disabled:opacity-75"
              >
                {isGenerating ? (
                   <div className="flex items-center gap-3 uppercase tracking-[0.2em] text-sm animate-pulse font-black">
                     <BrainCircuit className="animate-spin" size={24} />
                     <span>Synthesizing Assessment Questions...</span>
                   </div>
                ) : (
                  <>
                    <span>Continue to Quiz</span>
                    <ArrowRight size={24} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="glass-panel max-w-4xl w-full p-10 md:p-14 animate-in slide-in-from-right-12 duration-700 bg-white shadow-2xl shadow-indigo-50 border-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-violet-50 text-violet-600 rounded-3xl shadow-inner shadow-violet-100">
              <BrainCircuit size={32} />
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Quick Quiz</h1>
          </div>
          <p className="text-slate-500 mb-12 text-xl font-medium italic">Answer these questions based on your skills.</p>

          <div className="mb-10">
            <span className="text-violet-600 font-black tracking-[0.2em] uppercase text-xs">Question {currentQIndex + 1} of {questions.length}</span>
            <h2 className="text-3xl text-slate-800 font-black mt-6 mb-10 leading-tight">
              {questions[currentQIndex]?.q}
            </h2>
            
            <div className="space-y-5">
              {questions[currentQIndex]?.opts.map((option, i) => (
                <label 
                  key={i} 
                  className={`flex items-center p-6 border-4 rounded-3xl cursor-pointer transition-all ${
                    selectedOption === i 
                      ? 'border-violet-400 bg-violet-50 shadow-xl shadow-purple-50' 
                      : 'border-slate-50 hover:bg-slate-50 hover:border-slate-100 shadow-sm shadow-slate-100 bg-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-4 mr-6 flex items-center justify-center transition-all ${selectedOption === i ? 'bg-violet-600 border-violet-600' : 'bg-white border-slate-100'}`}>
                    {selectedOption === i && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <input 
                    type="radio" 
                    name="onboarding-quiz"
                    checked={selectedOption === i}
                    onChange={() => setSelectedOption(i)} 
                    className="hidden" 
                  />
                  <span className={`text-xl font-bold ${selectedOption === i ? 'text-violet-900' : 'text-slate-700'}`}>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-10 border-t-2 border-slate-50">
            <button 
              onClick={() => setStep(1)} 
              className="text-slate-400 hover:text-rose-500 transition-colors font-black uppercase tracking-widest text-xs border-b-2 border-slate-50 hover:border-rose-100 pb-1"
            >
              Back to Info
            </button>
            <button 
              onClick={handleQuizNext}
              disabled={selectedOption === null}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black px-12 py-5 rounded-2xl shadow-2xl shadow-purple-100 transition-all flex items-center gap-4 text-xl active:scale-[0.98] border-b-4 border-black/10"
            >
              <span>{currentQIndex === questions.length - 1 ? 'Finish & Create Roadmap' : 'Next Question'}</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
