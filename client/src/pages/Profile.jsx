import React, { useState } from 'react';
import { User, Mail, Phone, Globe, GraduationCap, Target, Award, ShieldCheck, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { userData, setUserData } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [language, setLanguage] = useState('en');

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const languages = [
    { code: 'en', label: 'US English' },
    { code: 'es', label: 'ES Spanish' },
    { code: 'fr', label: 'FR French' },
    { code: 'de', label: 'DE German' }
  ];

  const displayName = editData.name || 'User';
  const displayEmail = editData.email || 'user@coursepilot.ai';
  const displayPhone = editData.phone || '+1 (555) 000-0000';
  const displayRole = editData.interests?.[0] || 'Student';
  const displayInstitution = editData.institution || 'My University';
  const displayGoals = editData.goals || 'I want to learn new skills and grow my career.';
  
  const initials = displayName.split(' ').map(n => n[0] || '').join('').substring(0, 2).toUpperCase() || "CP";

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12 pb-16 pt-12">
      
      {/* Profile Card */}
      <div className="glass-panel p-10 bg-white border-white shadow-2xl shadow-purple-50/50 rounded-[3rem]">
        <div className="flex justify-between items-center mb-10 border-b-4 border-slate-50 pb-8">
          <div className="flex items-center gap-4">
            <User className="text-violet-500" size={32} />
            <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-8 decoration-violet-50 underline-offset-8">Personal Details</h2>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => { setEditData(userData); setIsEditing(true); }}
              className="bg-slate-50 hover:bg-violet-50 text-violet-600 font-black text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full border-2 border-slate-50 hover:border-violet-100 transition-all active:scale-95 shadow-sm"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-4">
              <button 
                onClick={() => setIsEditing(false)}
                className="text-slate-400 font-black text-xs uppercase tracking-widest px-6 py-4 hover:text-rose-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="bg-violet-600 hover:bg-violet-500 text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full border-b-4 border-black/10 transition-all active:scale-95 shadow-xl shadow-purple-100"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
          <div className="w-40 h-40 bg-gradient-to-tr from-violet-500 to-rose-500 rounded-[3rem] flex items-center justify-center text-white text-6xl font-black shadow-2xl shadow-purple-200 transform -rotate-6 transition-transform cursor-pointer border-8 border-white p-2">
            <div className="w-full h-full border-4 border-white/20 rounded-[2.5rem] flex items-center justify-center">{initials}</div>
          </div>
          <div className="text-center md:text-left flex-1">
            {isEditing ? (
               <input 
                 value={editData.name}
                 onChange={(e) => setEditData({...editData, name: e.target.value})}
                 className="text-4xl font-black text-slate-800 tracking-tighter mb-4 bg-slate-50 border-4 border-white p-4 rounded-2xl w-full outline-none focus:border-violet-300 transition-all"
                 placeholder="Enter full name..."
               />
            ) : (
               <h3 className="text-5xl font-black text-slate-800 tracking-tighter mb-4">{displayName}</h3>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               {isEditing ? (
                 <input 
                    value={editData.interests?.join(', ')}
                    onChange={(e) => setEditData({...editData, interests: e.target.value.split(',').map(i => i.trim())})}
                    className="px-6 py-2 bg-violet-50 text-violet-600 font-black rounded-full text-xs uppercase tracking-widest border-2 border-violet-100 italic outline-none w-64"
                    placeholder="Enter interests..."
                 />
               ) : (
                 <span className="px-6 py-2 bg-violet-50 text-violet-600 font-black rounded-full text-xs uppercase tracking-widest border-2 border-violet-100 italic">
                   {displayRole}
                 </span>
               )}
               <span className="px-6 py-2 bg-emerald-50 text-emerald-600 font-black rounded-full text-xs uppercase tracking-widest border-2 border-emerald-100 italic">
                 {userData.assessmentScore || 85}% Assessment Score
               </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-slate-50 border-4 border-white rounded-[2.5rem] shadow-xl shadow-slate-100/50 flex items-center gap-6 group hover:translate-x-2 transition-transform">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-violet-500 shadow-xl shadow-purple-50 group-hover:scale-110 transition-transform"><Mail size={28} /></div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-[0.3em]">Email</p>
                {isEditing ? (
                  <input 
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="text-slate-800 font-black text-lg bg-white border-2 border-violet-100 rounded-xl px-4 py-2 w-full outline-none focus:ring-2 ring-violet-200"
                    placeholder="E-mail"
                  />
                ) : (
                  <p className="text-slate-800 font-black text-lg">{displayEmail}</p>
                )}
              </div>
           </div>
           <div className="p-8 bg-slate-50 border-4 border-white rounded-[2.5rem] shadow-xl shadow-slate-100/50 flex items-center gap-6 group hover:translate-x-2 transition-transform">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-xl shadow-rose-50 group-hover:scale-110 transition-transform"><Phone size={28} /></div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-[0.3em]">Phone</p>
                {isEditing ? (
                  <input 
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="text-slate-800 font-black text-lg bg-white border-2 border-rose-100 rounded-xl px-4 py-2 w-full outline-none focus:ring-2 ring-rose-200"
                    placeholder="Phone"
                  />
                ) : (
                  <p className="text-slate-800 font-black text-lg">{displayPhone}</p>
                )}
              </div>
           </div>
        </div>
      </div>

      {/* Stats Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
         {[
           { label: 'My Level', value: 'Lv. 14', color: 'from-violet-500 to-indigo-500', icon: <Award size={20} /> },
           { label: 'Learning Streak', value: '7 Days', color: 'from-rose-500 to-orange-400', icon: <Zap size={20} /> },
           { label: 'World Ranking', value: '#1,204', color: 'from-emerald-500 to-teal-400', icon: <Globe size={20} /> }
         ].map((stat, i) => (
           <div key={i} className="glass-panel p-8 bg-white border-white shadow-xl shadow-slate-100 rounded-[2.5rem] flex flex-col items-center text-center group hover:-translate-y-2 transition-all">
              <div className={`w-12 h-12 bg-gradient-to-tr ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg transform group-hover:rotate-12 transition-transform`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</span>
              <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
           </div>
         ))}
      </div>

      {/* Education & Goals Card */}
      <div className="glass-panel p-10 bg-white border-white shadow-2xl shadow-purple-50/50 rounded-[3rem]">
         <div className="flex items-center gap-4 mb-12 border-b-4 border-slate-50 pb-8">
           <Award className="text-rose-500" size={32} />
           <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-8 decoration-rose-50 underline-offset-8">Education & Goals</h2>
         </div>

         <div className="space-y-8">
            <div className="flex items-start gap-8 p-10 bg-violet-50/50 border-4 border-white rounded-[2.5rem] shadow-xl shadow-purple-50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 text-violet-100 group-hover:scale-150 transition-transform opacity-50"><ShieldCheck size={120} /></div>
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-violet-600 shadow-2xl shadow-purple-50 shrink-0 transform group-hover:rotate-12 transition-transform"><GraduationCap size={40} /></div>
               <div className="relative z-10 flex-1">
                   <p className="text-[11px] font-black uppercase text-violet-400 mb-3 tracking-[0.2em]">School / University</p>
                   {isEditing ? (
                     <input 
                        value={editData.institution}
                        onChange={(e) => setEditData({...editData, institution: e.target.value})}
                        className="text-2xl font-black text-slate-800 bg-white border-2 border-violet-100 rounded-2xl px-6 py-4 w-full outline-none shadow-inner"
                     />
                   ) : (
                     <p className="text-2xl font-black text-slate-800 tracking-tight">{displayInstitution}</p>
                   )}
                   <p className="text-violet-600 font-black text-[10px] uppercase tracking-widest mt-4 flex items-center gap-2">
                     <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                     Verified School
                   </p>
               </div>
            </div>

            <div className="flex items-start gap-8 p-10 bg-rose-50/50 border-4 border-white rounded-[2.5rem] shadow-xl shadow-rose-50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 text-rose-100 group-hover:scale-150 transition-transform opacity-50"><Target size={120} /></div>
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-rose-600 shadow-2xl shadow-rose-50 shrink-0 transform group-hover:-rotate-12 transition-transform"><Target size={40} /></div>
               <div className="relative z-10 flex-1">
                   <p className="text-[11px] font-black uppercase text-rose-400 mb-3 tracking-[0.2em]">Career Goals</p>
                   {isEditing ? (
                     <textarea 
                        value={editData.goals}
                        onChange={(e) => setEditData({...editData, goals: e.target.value})}
                        className="text-xl text-slate-700 font-bold leading-relaxed italic bg-white border-2 border-rose-100 rounded-2xl p-6 w-full outline-none min-h-[120px] shadow-inner"
                     />
                   ) : (
                     <p className="text-xl text-slate-700 font-bold leading-relaxed italic border-l-8 border-rose-100 pl-6">{displayGoals}</p>
                   )}
                   <div className="mt-8 flex items-center gap-4">
                      <div className="h-4 w-64 bg-white rounded-full overflow-hidden shadow-inner p-0.5 border-white">
                         <div className="h-full bg-gradient-to-r from-rose-400 to-violet-400 rounded-full" style={{ width: `${userData.assessmentScore || 85}%` }}></div>
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-rose-500">{userData.assessmentScore || 85}% Score Alignment</span>
                   </div>
               </div>
            </div>
         </div>
      </div>

      {/* Language Card */}
      <div className="glass-panel p-10 bg-white border-white shadow-2xl shadow-purple-50/50 rounded-[3rem]">
        <div className="flex items-center gap-4 mb-10 text-3xl font-black text-slate-800 uppercase tracking-tight italic underline decoration-8 decoration-slate-50 underline-offset-8">
          <div className="p-4 bg-slate-50 text-violet-500 rounded-3xl shadow-inner shadow-slate-100"><Globe size={32} /></div>
          Language Settings
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {languages.map((lang) => (
            <div 
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-8 rounded-[2rem] border-4 cursor-pointer transition-all duration-700 flex items-center shadow-2xl relative overflow-hidden ${
                language === lang.code 
                   ? 'bg-violet-50 border-violet-500 scale-[1.02] shadow-purple-100' 
                   : 'bg-slate-50 border-white text-slate-400 hover:bg-white hover:border-slate-100 hover:shadow-slate-100'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl mr-6 flex items-center justify-center text-lg font-black transition-all ${language === lang.code ? 'bg-violet-600 text-white shadow-xl rotate-12' : 'bg-white text-slate-400'}`}>
                {lang.label.split(' ')[0]}
              </div>
              <span className={`text-2xl font-black tracking-tight ${language === lang.code ? 'text-violet-900' : 'text-slate-700'}`}>
                {lang.label.split(' ')[1]}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;
