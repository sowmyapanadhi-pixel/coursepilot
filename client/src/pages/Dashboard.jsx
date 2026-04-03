import React from 'react';
import { Target, BookOpen, Briefcase, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, roadmap, applications } = useAppContext();

  // Dynamic values
  const selectedPath = userData.selectedCareer || "Web Development";

  let skillLevel = "Beginner";
  if (userData.assessmentScore >= 80) skillLevel = "Expert";
  else if (userData.assessmentScore >= 50) skillLevel = "Intermediate";

  const activeCourses = roadmap.filter(r => r.status === 'in-progress').length;
  
  const jobsPending = applications.filter(a => a.status === 'pending' || a.status === 'applied').length;

  const inProgressCourse = roadmap.find(r => r.status === 'in-progress');
  const completedCoursesCount = roadmap.filter(r => r.status === 'completed').length;
  const learningProgress = Math.round((completedCoursesCount / roadmap.length) * 100) || 0;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-16">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-5xl font-black text-slate-800 mb-3 tracking-tighter uppercase italic">My Dashboard</h1>
          <p className="text-slate-400 font-bold text-xl uppercase tracking-tighter">
            Tracking your progress at <span className="text-violet-600 underline decoration-violet-100 underline-offset-8 decoration-8">{userData.institution || 'University'}</span>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
        <div onClick={() => navigate('/careers')} className="glass-panel p-8 border-t-8 border-t-violet-400 cursor-pointer hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-100 transition-all bg-white border-white rounded-[2rem] shadow-xl shadow-slate-100/50 group">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Career Goal</h3>
            <span className="p-4 bg-violet-50 text-violet-600 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform"><Briefcase size={32} /></span>
          </div>
          <div className="text-2xl font-black text-slate-800 truncate tracking-tight uppercase">{selectedPath}</div>
        </div>
        
        <div className="glass-panel p-8 border-t-8 border-t-emerald-400 bg-white border-white shadow-xl shadow-slate-100/50 rounded-[2rem] group">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Skill Level</h3>
            <span className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shadow-inner group-hover:-rotate-12 transition-transform"><TrendingUp size={32} /></span>
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tight uppercase">{skillLevel} Status</div>
        </div>

        <div onClick={() => navigate('/learning')} className="glass-panel p-8 border-t-8 border-t-rose-400 cursor-pointer hover:-translate-y-4 hover:shadow-2xl hover:shadow-rose-100 transition-all bg-white border-white rounded-[2rem] shadow-xl shadow-slate-100/50 group">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Current Courses</h3>
            <span className="p-4 bg-rose-50 text-rose-600 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform"><BookOpen size={32} /></span>
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tight uppercase">{activeCourses} Active Modules</div>
        </div>

        <div onClick={() => navigate('/community')} className="glass-panel p-8 border-t-8 border-t-amber-400 cursor-pointer hover:-translate-y-4 hover:shadow-2xl hover:shadow-amber-100 transition-all bg-white border-white rounded-[2rem] shadow-xl shadow-slate-100/50 group">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Community</h3>
            <span className="p-4 bg-amber-50 text-amber-600 rounded-2xl shadow-inner group-hover:-rotate-12 transition-transform"><Target size={32} /></span>
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tight uppercase">Join Discussions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        <div className="lg:col-span-2 glass-panel p-12 bg-white border-white shadow-2xl shadow-purple-50 rounded-[3rem]">
          <h2 className="text-3xl font-black text-slate-800 mb-10 uppercase tracking-tight italic underline decoration-violet-50 underline-offset-8 decoration-8">Learning Progress</h2>
          <div className="flex flex-col justify-center h-80 border-8 border-slate-50 rounded-[3rem] bg-white p-12 space-y-8 shadow-inner">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Overall Completion Percentage</span>
              <span className="text-3xl font-black text-violet-600 tracking-tighter">{learningProgress}%</span>
            </div>
            <div className="w-full h-6 bg-slate-50 rounded-full overflow-hidden border-4 border-white shadow-sm">
              <div className="h-full bg-gradient-to-r from-violet-500 via-rose-400 to-emerald-400 rounded-full transition-all duration-[2000ms]" style={{ width: `${learningProgress}%` }}></div>
            </div>
            <p className="text-slate-500 text-center mt-10 text-xl font-medium leading-relaxed border-t-2 border-slate-50 pt-8">
              "Great job! You have completed {completedCoursesCount} modules in your {selectedPath} roadmap."
            </p>
          </div>
        </div>
        <div className="glass-panel p-12 flex flex-col bg-white border-white shadow-2xl shadow-purple-50 rounded-[3rem]">
          <h2 className="text-3xl font-black text-slate-800 mb-10 uppercase tracking-tight italic underline decoration-rose-50 underline-offset-8 decoration-8">What's Next?</h2>
          <div className="space-y-8 flex-1">
            {inProgressCourse ? (
              <div onClick={() => navigate('/learning')} className="p-8 rounded-[2rem] bg-slate-50 border-4 border-white hover:border-violet-200 hover:bg-white transition-all cursor-pointer group shadow-xl shadow-slate-100/50">
                <h4 className="font-black text-violet-600 mb-3 text-2xl group-hover:text-violet-500 transition-colors uppercase tracking-tighter italic">Resume {inProgressCourse.title}</h4>
                <p className="text-lg text-slate-500 font-medium italic leading-relaxed line-clamp-3">{inProgressCourse.description}</p>
              </div>
            ) : (
              <div onClick={() => navigate('/resume')} className="p-8 rounded-[2rem] bg-slate-50 border-4 border-white hover:border-emerald-200 hover:bg-white transition-all cursor-pointer group shadow-xl shadow-slate-100/50">
                <h4 className="font-black text-emerald-600 mb-3 text-2xl group-hover:text-emerald-500 transition-colors uppercase tracking-tighter italic">Update Your Resume</h4>
                <p className="text-lg text-slate-500 font-medium italic leading-relaxed">Your roadmap is complete! Update your professional profile with your new skills.</p>
              </div>
            )}
            <div onClick={() => navigate('/jobs')} className="p-8 rounded-[2rem] bg-slate-50 border-4 border-white hover:border-rose-200 hover:bg-white transition-all cursor-pointer group shadow-xl shadow-slate-100/50">
              <h4 className="font-black text-rose-600 mb-3 text-2xl group-hover:text-rose-500 transition-colors uppercase tracking-tighter italic">Find Job Opportunities</h4>
              <p className="text-lg text-slate-500 font-medium italic leading-relaxed">Apply for available positions that match your expertise and career goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
