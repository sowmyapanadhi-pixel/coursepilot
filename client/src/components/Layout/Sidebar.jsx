import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Target, BookOpen, FileText, Briefcase, User as UserIcon, MessageSquare, Users } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Learning', path: '/learning', icon: <BookOpen size={20} /> },
    { name: 'Community', path: '/community', icon: <Users size={20} /> },
    { name: 'Careers', path: '/careers', icon: <Briefcase size={20} /> },
    { name: 'Resume', path: '/resume', icon: <FileText size={20} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'Profile', path: '/profile', icon: <UserIcon size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r-4 border-slate-50 fixed left-0 top-0 flex flex-col shadow-2xl shadow-indigo-50/30">
      <div className="p-8">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-rose-400 flex items-center gap-3 tracking-tighter">
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-500 to-rose-500 rounded-xl flex items-center justify-center text-white text-xs shadow-lg shadow-purple-100 transform rotate-6">CP</div>
          <span>CoursePilot</span>
        </h1>
      </div>
      
      <div className="p-4 border-b-2 border-slate-50 mb-4">
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-center gap-3 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-black py-4 rounded-2xl transition-all shrink-0 border-2 border-slate-50 hover:border-rose-100 uppercase tracking-widest text-[10px] italic shadow-sm active:scale-95"
        >
          <span>De-Authorize Session</span>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-3 mt-2 overflow-y-auto pb-8">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-300 group ${
                isActive 
                  ? 'bg-violet-50 text-violet-600 border-2 border-violet-100 shadow-xl shadow-purple-50/50' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-violet-500 hover:translate-x-2'
              }`
            }
          >
            <div className="group-hover:rotate-12 transition-transform">{item.icon}</div>
            <span className="font-black uppercase tracking-widest text-[11px]">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
