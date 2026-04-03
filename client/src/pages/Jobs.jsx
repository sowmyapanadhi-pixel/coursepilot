import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, Zap, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Jobs = () => {
  const { applications } = useAppContext();
  const [autoApply, setAutoApply] = useState(true);

  const appliedCount = applications.filter(a => a.status === 'applied').length;
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
      
      {/* Header Stats */}
      <div className="glass-panel p-10 mb-8 flex flex-col md:flex-row justify-between md:items-end gap-8 border-white shadow-xl shadow-indigo-50 bg-white">
        <div>
          <div className="flex justify-between items-center w-full mb-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Job Applications</h1>
            <div className="md:hidden flex items-center gap-3">
              <span className="text-sm font-black text-slate-600 uppercase tracking-wider">Auto Apply</span>
              <button 
                onClick={() => setAutoApply(!autoApply)} 
                className={`w-14 h-7 rounded-full p-1.5 transition-all shadow-inner ${autoApply ? 'bg-indigo-500' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${autoApply ? 'translate-x-7' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
          <p className="text-slate-500 font-bold text-lg italic">Track all your job applications in one place with AI-driven distribution.</p>
        </div>

        <div className="hidden md:flex items-center gap-4 bg-slate-50 border-2 border-slate-100 p-2.5 rounded-2xl shadow-inner">
          <span className="text-xs font-black text-slate-600 px-3 uppercase tracking-widest">Auto Apply Distribution</span>
          <button 
            onClick={() => setAutoApply(!autoApply)} 
            className={`w-14 h-7 rounded-full p-1.5 transition-all shadow-inner ${autoApply ? 'bg-indigo-500' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${autoApply ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="glass-panel p-8 border-b-8 border-b-emerald-400 flex justify-between items-center bg-white shadow-lg shadow-emerald-50 border-white">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-black mb-2 uppercase tracking-widest text-xs"><CheckCircle size={18} /> Applied</div>
            <div className="text-4xl font-black text-slate-800">{appliedCount} <span className="text-lg text-slate-400 font-bold">Positions</span></div>
          </div>
        </div>
        <div className="glass-panel p-8 border-b-8 border-b-amber-400 flex justify-between items-center bg-white shadow-lg shadow-amber-50 border-white">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-black mb-2 uppercase tracking-widest text-xs"><Clock size={18} /> Pending</div>
            <div className="text-4xl font-black text-slate-800">{pendingCount} <span className="text-lg text-slate-400 font-bold">Positions</span></div>
          </div>
        </div>
        <div className="glass-panel p-8 border-b-8 border-b-rose-400 flex justify-between items-center bg-white shadow-lg shadow-rose-50 border-white">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-black mb-2 uppercase tracking-widest text-xs"><XCircle size={18} /> Rejected</div>
            <div className="text-4xl font-black text-slate-800">{rejectedCount} <span className="text-lg text-slate-400 font-bold">Positions</span></div>
          </div>
        </div>
      </div>

      {/* Auto Apply Banner */}
      <div className={`p-8 rounded-3xl mb-10 flex flex-col md:flex-row justify-between items-center transition-all duration-500 shadow-2xl border-4 ${autoApply ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-white' : 'bg-white text-slate-500 border-slate-100 shadow-slate-100'}`}>
         <div className="text-center md:text-left mb-6 md:mb-0">
           <h2 className="text-2xl font-black flex items-center justify-center md:justify-start gap-3 mb-2 uppercase tracking-tight">
             <Zap size={24} className={autoApply ? 'text-amber-300 animate-pulse' : 'text-slate-400'} />
             {autoApply ? 'AI Auto-Distribution Active' : 'Auto-Distribution Paused'}
           </h2>
           <p className={`text-lg font-bold ${autoApply ? 'text-indigo-100 italic' : 'text-slate-400'}`}>
             {autoApply ? 'CoursePilot is automatically applying to high-match positions for you.' : 'Enable to let our AI handle your professional distribution.'}
           </p>
         </div>
         {autoApply && (
           <div className="bg-white/20 px-8 py-5 rounded-2xl text-center backdrop-blur-xl border-2 border-white/20 shadow-2xl scale-110">
             <div className="text-5xl font-black mb-1">5</div>
             <div className="text-[10px] uppercase tracking-widest font-black opacity-90">Applications Today</div>
           </div>
         )}
      </div>

      {/* Applications Table */}
      <div className="glass-panel overflow-hidden border-white shadow-2xl shadow-indigo-50 bg-white rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-100 text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 italic">
                <th className="p-6 w-64">Target Company</th>
                <th className="p-6">Professional Position</th>
                <th className="p-6">Application Date</th>
                <th className="p-6">Current Status</th>
                <th className="p-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-indigo-50/50 transition-all group cursor-default">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 group-hover:bg-white rounded-xl shadow-inner border border-slate-100 flex items-center justify-center shrink-0 transition-colors">
                        <span className="text-xl group-hover:scale-110 transition-transform">🚀</span>
                      </div>
                      <span className="font-black text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{app.company}</span>
                    </div>
                  </td>
                  <td className="p-6 text-slate-600 font-bold text-lg">{app.position}</td>
                  <td className="p-6 text-slate-500 font-medium italic">{app.date}</td>
                  <td className="p-6">
                    {app.status === 'applied' && <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-600 border-2 border-emerald-100 uppercase tracking-wider"><CheckCircle size={14} /> Applied</span>}
                    {app.status === 'pending' && <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-amber-50 text-amber-600 border-2 border-amber-100 uppercase tracking-wider"><Clock size={14} /> Pending</span>}
                    {app.status === 'rejected' && <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-rose-50 text-rose-600 border-2 border-rose-100 uppercase tracking-wider"><XCircle size={14} /> Rejected</span>}
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-indigo-600 hover:text-indigo-500 font-black text-sm transition-colors uppercase tracking-widest border-b-2 border-indigo-100 hover:border-indigo-500 pb-0.5">
                      View Pipeline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
