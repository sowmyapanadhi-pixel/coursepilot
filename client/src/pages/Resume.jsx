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
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">Resume Builder</h1>
          <p className="text-slate-500 font-bold text-lg italic">Generate a professional, ATS-friendly resume optimized by AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Editor Form (Left Side) - Dynamically populating default values */}
        <div className="glass-panel p-10 space-y-10 h-fit bg-white border-white shadow-2xl shadow-indigo-50">
          
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 border-b-2 border-slate-50 pb-3 uppercase tracking-wider">
              <User size={20} className="text-indigo-500" />
              Personal Information
            </h3>
            <div className="space-y-4">
              <input type="text" defaultValue={displayName} className="input-field" placeholder="Full Name" />
              <input type="text" defaultValue={displayRole} className="input-field" placeholder="Target Job Title" />
              <input type="text" defaultValue={displayEmail} className="input-field" placeholder="Email Address" />
              <input type="text" defaultValue={displayPhone} className="input-field" placeholder="Phone Number" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-slate-50 pb-3">
               <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-wider">
                 <Code size={20} className="text-purple-500" />
                 Core Skills
               </h3>
               <button className="text-indigo-600 hover:text-indigo-500 transition-colors text-sm font-black uppercase tracking-widest">+ Add New</button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {skillTags.map(s => (
                <span key={s} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl border-2 border-indigo-100 text-xs font-bold uppercase tracking-wider shadow-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-slate-50 pb-3">
               <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-wider">
                 <Briefcase size={20} className="text-emerald-500" />
                 Top Projects
               </h3>
               <button className="text-indigo-600 hover:text-indigo-500 transition-colors text-sm font-black uppercase tracking-widest">+ Add New</button>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-100 cursor-pointer hover:border-indigo-400 hover:bg-white transition-all shadow-inner shadow-slate-100 group">
              <h4 className="font-black text-slate-800 text-lg mb-2 group-hover:text-indigo-600 transition-colors">E-commerce Platform</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented secure payment processing and real-time inventory management.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-100 cursor-pointer hover:border-purple-400 hover:bg-white transition-all shadow-inner shadow-slate-100 group">
              <h4 className="font-black text-slate-800 text-lg mb-2 group-hover:text-purple-600 transition-colors">Task Management App</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">Developed a collaborative task management application with real-time updates using React and Firebase.</p>
            </div>
          </div>
        </div>

        {/* Visual Preview & AI Buttons (Right Side) */}
        <div className="space-y-8">
           <div className="glass-panel p-10 bg-slate-100/50 relative group border-white shadow-2xl shadow-slate-200">
              <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl z-10 hidden md:flex backdrop-blur-[2px]">
                <span className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black shadow-2xl flex items-center gap-3 text-lg scale-110">
                  <Sparkles size={20} className="text-amber-400" /> Professional Live Preview
                </span>
              </div>
              
              {/* Paper-like Resume View */}
              <div className="w-full h-full bg-white text-slate-900 p-12 shadow-2xl rounded-sm border border-slate-100">
                 <h1 className="text-4xl md:text-5xl font-black mb-2 break-words text-slate-900 tracking-tight">{displayName}</h1>
                 <p className="text-xl md:text-2xl text-slate-500 font-bold mb-6 italic">{displayRole}</p>
                 <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm text-slate-500 mb-10 border-b-2 border-slate-50 pb-6 font-medium">
                    <span className="flex items-center gap-2"><Mail size={16} className="text-indigo-400" /> {displayEmail}</span>
                    <span className="flex items-center gap-2"><Phone size={16} className="text-emerald-400" /> {displayPhone}</span>
                 </div>
                 
                 <div className="mb-10">
                   <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-indigo-600 border-b-2 border-indigo-50 w-fit pb-1">Core Expertises</h2>
                   <div className="flex flex-wrap gap-2 pt-1">
                     {skillTags.map(s => <span key={s} className="px-3 py-1.5 bg-slate-50 text-xs text-slate-600 font-black border border-slate-100 rounded-md tracking-wider uppercase">{s}</span>)}
                   </div>
                 </div>

                 <div className="mb-10">
                   <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-emerald-600 border-b-2 border-emerald-50 w-fit pb-1">Key Projects</h2>
                   <div className="mb-6">
                     <h3 className="font-black text-lg text-slate-800">E-commerce Platform</h3>
                     <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented secure payment processing and real-time inventory management.</p>
                   </div>
                   <div>
                     <h3 className="font-black text-lg text-slate-800">Task Management App</h3>
                     <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">Developed a collaborative task management application with real-time updates using React and Firebase.</p>
                   </div>
                 </div>

                 <div className="border-t-2 border-slate-50 pt-8">
                   <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-purple-600 border-b-2 border-purple-50 w-fit pb-1">Career Experience</h2>
                   <div>
                     <h3 className="font-black text-lg text-slate-800 leading-tight">Junior Developer at TechCorp</h3>
                     <p className="text-xs text-slate-400 mb-3 font-black uppercase tracking-widest">Jan 2023 - Present</p>
                     <p className="text-sm text-slate-600 leading-relaxed font-medium">Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.</p>
                   </div>
                 </div>
              </div>
           </div>

           <button className="w-full py-5 bg-white border-4 border-slate-100 hover:border-indigo-500 text-slate-800 rounded-3xl font-black transition-all flex justify-center items-center gap-4 text-xl shadow-xl shadow-slate-100 hover:shadow-indigo-100 group active:scale-[0.98]">
              <Download size={24} className="group-hover:translate-y-1 transition-transform" />
              Download My Resume (PDF)
           </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
