import React from 'react';
import { Briefcase, TrendingUp, ChevronRight, Award, Trophy, Star, BrainCircuit, Cloud, ShieldAlert, BarChart, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Corporate skills for market trends section
const topCorporateSkills = [
  { name: 'Generative AI Prompting', trend: '+150% YoY', icon: <BrainCircuit size={16} /> },
  { name: 'Cloud Computing (AWS/Azure)', trend: '+45% YoY', icon: <Cloud size={16} /> },
  { name: 'Cybersecurity Threat Modeling', trend: '+60% YoY', icon: <ShieldAlert size={16} /> },
  { name: 'Data Storytelling', trend: '+35% YoY', icon: <BarChart size={16} /> },
  { name: 'Full Stack React & Node', trend: '+30% YoY', icon: <Code size={16} /> }
];

import { generateCareerMatches } from '../utils/aiEngine';

const Careers = () => {
  const navigate = useNavigate();
  const { userData, selectCareer } = useAppContext();
  
  const [recommendations, setRecommendations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const matches = await generateCareerMatches(userData);
        setRecommendations(matches);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, [userData]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-16">
      
      {/* Top Section - Recommendations */}
      <div>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-8">
          <div>
            <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">Recommended Careers</h1>
            
            {/* Skills & Interests "Head" */}
            <div className="flex flex-col gap-3 mb-10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Your Analyzed Vectors</span>
              <div className="flex flex-wrap gap-4">
                {userData.skills?.map((skill, i) => (
                  <div key={i} className="px-5 py-2.5 bg-violet-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest border-b-4 border-black/10 shadow-lg shadow-purple-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    {skill}
                  </div>
                ))}
                {userData.interests?.map((interest, i) => (
                  <div key={i} className="px-5 py-2.5 bg-rose-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest border-b-4 border-black/10 shadow-lg shadow-rose-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    {interest}
                  </div>
                ))}
                {(!userData.skills?.length && !userData.interests?.length) && (
                  <span className="text-slate-400 italic font-medium">No vectors analyzed yet. Update your profile to see matches.</span>
                )}
              </div>
            </div>

            <p className="text-xl text-slate-400 font-bold uppercase tracking-tighter">
              Bespoke recommendations based on your <span className="text-violet-600 font-black underline decoration-violet-100 underline-offset-8">Vector Profile</span> 
              &nbsp;and your assessment score of <span className="text-rose-500 font-black">{userData.assessmentScore}%</span>.
            </p>
          </div>
          <button 
            onClick={() => navigate('/onboarding')}
            className="bg-white hover:bg-slate-50 text-slate-800 font-black px-10 py-5 rounded-[2rem] shadow-xl shadow-slate-100 transition-all active:scale-95 border-b-8 border-slate-200 uppercase tracking-widest text-sm flex items-center gap-3"
          >
            <BrainCircuit size={20} className="text-violet-600" />
            <span>Update Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="glass-panel p-10 flex flex-col items-center justify-center min-h-[400px] animate-pulse bg-white/50 border-white rounded-[3rem]">
                <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] mb-10"></div>
                <div className="w-48 h-10 bg-slate-100 rounded-full mb-6"></div>
                <div className="w-32 h-6 bg-slate-100 rounded-full mb-10"></div>
                <div className="w-full h-24 bg-slate-50 rounded-3xl mb-10"></div>
                <div className="w-full h-16 bg-slate-100 rounded-3xl mt-auto"></div>
              </div>
            ))
          ) : (
            recommendations.map((career, index) => (
              <div key={index} className="glass-panel p-10 flex flex-col relative overflow-hidden group hover:border-violet-400 hover:shadow-2xl hover:shadow-purple-100 transition-all border-white bg-white shadow-2xl shadow-slate-100 rounded-[3rem]">
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-black px-6 py-2.5 rounded-bl-[2rem] shadow-lg uppercase tracking-[0.2em] animate-pulse">
                    Top Suggestion
                  </div>
                )}
                
                <div className="shrink-0 p-6 bg-slate-50 group-hover:bg-violet-50 rounded-[2.5rem] w-28 h-28 flex items-center justify-center mb-10 transition-all shadow-inner transform group-hover:rotate-6">
                  <div className="text-5xl drop-shadow-lg">
                    {career.name.toLowerCase().includes('web') || career.name.toLowerCase().includes('architect') || career.name.toLowerCase().includes('developer') ? '💻' : 
                    career.name.toLowerCase().includes('cloud') || career.name.toLowerCase().includes('devops') ? '☁️' : 
                    career.name.toLowerCase().includes('ai') || career.name.toLowerCase().includes('ml') ? '🤖' : 
                    career.name.toLowerCase().includes('security') ? '🔒' : 
                    career.name.toLowerCase().includes('data') ? '📊' : 
                    career.name.toLowerCase().includes('design') || career.name.toLowerCase().includes('ux') ? '🎨' : 
                    career.name.toLowerCase().includes('blockchain') ? '⛓️' : '🚀'}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4 text-slate-800">
                    <h2 className="text-3xl font-black tracking-tight leading-tight">{career.name}</h2>
                  </div>
                  
                  <span className="inline-block px-5 py-2 bg-rose-50 text-rose-600 text-[10px] font-black rounded-full border-2 border-rose-100 mb-8 uppercase tracking-[0.2em] shadow-sm">
                    {career.match}% Match Rate
                  </span>

                  <p className="text-slate-500 mb-10 text-xl font-medium leading-relaxed italic border-l-8 border-violet-100 pl-6 py-2">{career.description}</p>
                  
                  <div className="flex flex-col gap-5 text-sm font-black mb-10">
                    <div className="flex items-center justify-between text-slate-500 bg-slate-50 p-5 rounded-[1.5rem] border-2 border-slate-50 shadow-sm">
                      <span className="flex items-center gap-3 uppercase tracking-widest text-xs"><TrendingUp size={22} className="text-violet-500" /> Market Demand</span>
                      <span className="text-violet-600 text-base">{career.demand}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 bg-slate-50 p-5 rounded-[1.5rem] border-2 border-slate-50 shadow-sm">
                      <span className="flex items-center gap-3 uppercase tracking-widest text-xs"><Briefcase size={22} className="text-rose-500" /> Estimated Salary</span>
                      <span className="text-rose-600 text-base">{career.salary}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => { selectCareer(career.name); navigate('/learning'); }} 
                  className={`${index === 0 ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-2xl shadow-purple-100' : 'bg-slate-50 hover:bg-white text-slate-500 hover:text-violet-600 hover:border-violet-100'} w-full py-6 rounded-3xl transition-all font-black flex items-center justify-center gap-4 mt-auto border-4 border-transparent uppercase tracking-widest text-xs active:scale-95`}
                >
                  <span>Select Career Path</span>
                  <ChevronRight size={22} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Section - Corporate Market Trends */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 mb-4 flex items-center gap-4 uppercase tracking-tight">
          <Trophy className="text-rose-400" size={40} />
          Current Market Trends
        </h2>
        <p className="text-slate-400 mb-12 font-bold text-xl italic leading-relaxed">Real-time data showing the most in-demand skills in the current job market.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {topCorporateSkills.map((skill, index) => (
            <div key={index} className="glass-panel p-8 border-t-8 border-t-slate-50 hover:border-t-violet-400 hover:-translate-y-4 hover:bg-white transition-all duration-700 cursor-default shadow-2xl shadow-slate-50 border-white bg-slate-50/50 rounded-3xl">
              <div className="flex flex-col gap-6 mb-4">
                <div className="p-5 bg-white rounded-2xl text-violet-600 shadow-xl shadow-purple-50 w-fit">
                  {skill.icon}
                </div>
                <div className={`text-[10px] uppercase font-black px-4 py-2 rounded-full tracking-widest w-fit shadow-inner ${index < 2 ? 'bg-rose-50 text-rose-600 relative overflow-hidden' : 'bg-slate-100 text-slate-500'}`}>
                  {index < 2 && <span className="absolute inset-0 bg-white/30 animate-pulse"></span>}
                  {skill.trend} Acceleration
                </div>
              </div>
              <h4 className="font-black text-slate-800 leading-tight text-xl tracking-tight uppercase">{skill.name}</h4>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Careers;
