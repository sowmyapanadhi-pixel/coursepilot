import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Target, BookOpen, FileText, Briefcase, User as UserIcon, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },

    { name: 'Learning', path: '/learning', icon: <BookOpen size={20} /> },
    { name: 'Careers', path: '/careers', icon: <Briefcase size={20} /> },
    { name: 'Resume', path: '/resume', icon: <FileText size={20} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'Profile', path: '/profile', icon: <UserIcon size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center gap-2">
          <span>🚀</span> CoursePilot
        </h1>
      </div>
      
      <div className="p-4 border-b border-slate-800">
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl transition-colors shrink-0"
        >
          <span>Logout</span>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-indigo-400 border border-primary/20 shadow-inner' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
