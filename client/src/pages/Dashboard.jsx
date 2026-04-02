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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Overview</h1>
          <p className="text-slate-400">Track your learning and career progression.</p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div onClick={() => navigate('/careers')} className="glass-panel p-6 border-t-4 border-t-indigo-500 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 font-medium">Selected Path</h3>
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg"><Briefcase size={20} /></span>
          </div>
          <div className="text-2xl font-bold text-white truncate">{selectedPath}</div>
        </div>
        
        <div className="glass-panel p-6 border-t-4 border-t-cyan-500">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 font-medium">Skill Level</h3>
            <span className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg"><TrendingUp size={20} /></span>
          </div>
          <div className="text-2xl font-bold text-white">{skillLevel}</div>
        </div>

        <div onClick={() => navigate('/learning')} className="glass-panel p-6 border-t-4 border-t-purple-500 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 font-medium">Courses Active</h3>
            <span className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><BookOpen size={20} /></span>
          </div>
          <div className="text-2xl font-bold text-white">{activeCourses} in progress</div>
        </div>

        <div onClick={() => navigate('/jobs')} className="glass-panel p-6 border-t-4 border-t-emerald-500 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 font-medium">Jobs Pending</h3>
            <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><Target size={20} /></span>
          </div>
          <div className="text-2xl font-bold text-white">{jobsPending} pending</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 glass-panel p-6">
          <h2 className="text-xl font-bold text-white mb-6">Learning Process</h2>
          <div className="flex flex-col justify-center h-64 border border-slate-700/50 rounded-xl bg-slate-800/30 p-8 space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-slate-300">Overall Progress</span>
              <span className="text-sm font-bold text-indigo-400">{learningProgress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" style={{ width: `${learningProgress}%` }}></div>
            </div>
            <p className="text-slate-500 text-center mt-6 text-sm">Keep up the momentum! You have completed {completedCoursesCount} module(s) out of {roadmap.length}.</p>
          </div>
        </div>
        <div className="glass-panel p-6 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Next Steps</h2>
          <div className="space-y-4 flex-1">
            {inProgressCourse ? (
              <div onClick={() => navigate('/learning')} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <h4 className="font-medium text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">Start {inProgressCourse.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-2">{inProgressCourse.description}</p>
              </div>
            ) : (
              <div onClick={() => navigate('/resume')} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                <h4 className="font-medium text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors">Generate AI Resume</h4>
                <p className="text-sm text-slate-400">Your learning path is complete! Update your resume with your new skills.</p>
              </div>
            )}
            <div onClick={() => navigate('/jobs')} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer group">
              <h4 className="font-medium text-purple-400 mb-1 group-hover:text-purple-300 transition-colors">Apply for Jobs</h4>
              <p className="text-sm text-slate-400">Let CoursePilot auto-apply to relevant positions for you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
