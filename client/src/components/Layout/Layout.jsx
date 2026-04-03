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
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto">
        <header className="h-20 border-b-2 border-slate-50 bg-white/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-10 shadow-sm shadow-slate-100">
          <div className="text-base text-slate-400 font-bold uppercase tracking-tight">
            Welcome back, <span className="text-violet-600 font-black underline decoration-violet-100 underline-offset-4">{userData?.name || 'Guest'}</span>!
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/notifications')}
              className="p-3 bg-white hover:bg-rose-50 border-2 border-slate-100 rounded-2xl transition-all text-slate-400 hover:text-rose-500 relative hover:scale-110 active:scale-95 shadow-xl shadow-slate-50"
            >
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 rounded-full border-2 border-white shadow-lg animate-pulse"></span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="group flex items-center gap-4 p-2 pr-6 bg-white hover:bg-violet-50 border-2 border-slate-100 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-50"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-400 to-rose-400 flex items-center justify-center font-black shadow-lg text-white transform rotate-3 group-hover:rotate-0 transition-transform">
                {initial}
              </div>
              <span className="text-sm font-black text-slate-500 group-hover:text-violet-600 transition-colors uppercase tracking-widest">My Profile</span>
            </button>
          </div>
        </header>
        <main className="p-10 pb-32 max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default Layout;
