import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Bell, User as UserIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Chatbot from '../Chatbot';

const Layout = () => {
  const navigate = useNavigate();
  const { userData } = useAppContext();
  const initial = userData?.name ? userData.name[0].toUpperCase() : 'G';

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-8">
          <div className="text-sm text-slate-400 font-medium">
            Welcome back, <span className="text-indigo-400">{userData?.name || 'Guest'}</span>! Let's build your career.
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/notifications')}
              className="p-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full transition-all text-slate-400 hover:text-white relative hover:scale-105 active:scale-95"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border border-slate-900"></span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="group flex items-center gap-3 p-1.5 pr-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold shadow-lg text-white">
                {initial}
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Profile</span>
            </button>
          </div>
        </header>
        <main className="p-8 pb-24 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default Layout;
