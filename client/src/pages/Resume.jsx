import React from 'react';
import { Download, Sparkles, User, Mail, Phone, Code, Briefcase } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Resume = () => {
  const { userData } = useAppContext();
  
  const skillTags = userData.skills?.length > 0 ? userData.skills : ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'];
  
  // Dynamic variables passed down from the Login context
  const displayName = userData.name && userData.name !== 'Guest User' ? userData.name : 'Alex Johnson';
  const displayEmail = userData.email || 'alex.johnson@email.com';
  const displayPhone = userData.phone || '+1 (555) 123-4567';
  const displayRole = userData.interests?.[0] || 'Full Stack Developer';

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Resume Builder</h1>
          <p className="text-slate-400">Generate a professional, ATS-friendly resume optimized by AI.</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form (Left Side) - Dynamically populating default values */}
        <div className="glass-panel p-6 space-y-8 h-fit">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-2">
              <User size={18} className="text-slate-400" />
              Personal Information
            </h3>
            <input type="text" defaultValue={displayName} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors" />
            <input type="text" defaultValue={displayRole} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors" />
            <input type="text" defaultValue={displayEmail} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors" />
            <input type="text" defaultValue={displayPhone} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <Code size={18} className="text-slate-400" />
                 Skills
               </h3>
               <button className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium">+ Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillTags.map(s => (
                <span key={s} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20 text-sm font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <Briefcase size={18} className="text-slate-400" />
                 Projects (Click to edit)
               </h3>
               <button className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium">+ Add</button>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors">
              <h4 className="font-bold text-white text-sm mb-1">E-commerce Platform</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented secure payment processing and real-time inventory management.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors">
              <h4 className="font-bold text-white text-sm mb-1">Task Management App</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Developed a collaborative task management application with real-time updates using React and Firebase.</p>
            </div>
          </div>
        </div>

        {/* Visual Preview & AI Buttons (Right Side) */}
        <div className="space-y-6">
           <div className="glass-panel p-8 bg-slate-50 relative group">
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10 hidden md:flex">
                <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2">
                  <Sparkles size={16} /> Previewing Live
                </span>
              </div>
              
              {/* Paper-like Resume View */}
              <div className="w-full h-full bg-white text-slate-900 p-8 shadow-sm rounded">
                 <h1 className="text-3xl md:text-4xl font-bold mb-1 break-words">{displayName}</h1>
                 <p className="text-lg md:text-xl text-slate-600 mb-4">{displayRole}</p>
                 <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs text-slate-500 mb-8 border-b pb-4">
                    <span className="flex items-center gap-1"><Mail size={12} /> {displayEmail}</span>
                    <span className="flex items-center gap-1"><Phone size={12} /> {displayPhone}</span>
                 </div>
                 
                 <div className="mb-6">
                   <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-800">Skills</h2>
                   <div className="flex flex-wrap gap-2">
                     {skillTags.map(s => <span key={s} className="px-2 py-1 bg-slate-100 text-xs text-slate-700 font-medium">{s}</span>)}
                   </div>
                 </div>

                 <div className="mb-6">
                   <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-800">Projects</h2>
                   <div className="mb-4">
                     <h3 className="font-bold text-sm">E-commerce Platform</h3>
                     <p className="text-xs text-slate-600 mt-1 leading-relaxed">Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented secure payment processing and real-time inventory management.</p>
                   </div>
                   <div>
                     <h3 className="font-bold text-sm">Task Management App</h3>
                     <p className="text-xs text-slate-600 mt-1 leading-relaxed">Developed a collaborative task management application with real-time updates using React and Firebase.</p>
                   </div>
                 </div>

                 <div>
                   <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-800">Experience</h2>
                   <div>
                     <h3 className="font-bold text-sm leading-tight">Junior Developer at TechCorp</h3>
                     <p className="text-xs text-slate-500 mb-1">Jan 2023 - Present</p>
                     <p className="text-xs text-slate-600 leading-relaxed">Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.</p>
                   </div>
                 </div>
              </div>
           </div>

           <button className="w-full py-4 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-xl font-bold transition-all flex justify-center items-center gap-2">
              <Download size={18} />
              Download PDF
           </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
