import React, { useState } from 'react';
import { User, Mail, Phone, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { userData } = useAppContext();
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', label: 'US English' },
    { code: 'es', label: 'ES Spanish' },
    { code: 'fr', label: 'FR French' },
    { code: 'de', label: 'DE German' }
  ];

  // Helper variables dynamically assigned from Login
  const displayName = userData.name && userData.name !== 'Guest User' ? userData.name : 'Alex Johnson';
  const displayEmail = userData.email || 'alex.johnson@email.com';
  const displayPhone = userData.phone || '+1 (555) 123-4567';
  const displayRole = userData.interests?.[0] || 'Full Stack Developer';
  
  // Extract initials
  const initials = displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 shadow-lg shadow-indigo-500/20">
        <h1 className="text-3xl font-bold text-white mb-2">Settings & Profile</h1>
        <p className="text-indigo-100 font-medium">Manage your account preferences</p>
      </div>

      {/* Profile Card */}
      <div className="glass-panel p-8 mb-8 relative">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Profile Information</h2>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm">
            Edit Profile
          </button>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {initials}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{displayName}</h3>
            <p className="text-slate-400">{displayRole}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl divide-y divide-slate-800">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="text-slate-500 w-12 flex justify-center"><Mail size={20} /></div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-500 mb-1 tracking-wider">Email</p>
              <p className="text-slate-200">{displayEmail}</p>
            </div>
          </div>
          <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="text-slate-500 w-12 flex justify-center"><Phone size={20} /></div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-500 mb-1 tracking-wider">Phone</p>
              <p className="text-slate-200">{displayPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Language Card */}
      <div className="glass-panel p-8">
        <div className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
          <Globe className="text-indigo-400" />
          Language
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang) => (
            <div 
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-4 rounded-xl border cursor-pointer font-medium transition-all ${
                language === lang.code 
                  ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-500'
              }`}
            >
              <span className={`font-bold mr-2 ${language === lang.code ? 'text-indigo-300' : 'text-slate-500'}`}>
                {lang.label.split(' ')[0]}
              </span> 
              {lang.label.split(' ')[1]}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;
