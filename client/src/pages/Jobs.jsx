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
      <div className="glass-panel p-8 mb-6 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-bold text-white mb-2">Job Applications</h1>
            <div className="md:hidden flex items-center gap-3">
              <span className="text-sm font-bold text-slate-300">Auto Apply</span>
              <button 
                onClick={() => setAutoApply(!autoApply)} 
                className={`w-12 h-6 rounded-full p-1 transition-colors ${autoApply ? 'bg-indigo-500' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoApply ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
          <p className="text-slate-400">Track all your job applications in one place.</p>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-slate-900 border border-slate-700 p-2 rounded-xl">
          <span className="text-sm font-bold text-slate-300 px-2">Auto Apply</span>
          <button 
            onClick={() => setAutoApply(!autoApply)} 
            className={`w-12 h-6 rounded-full p-1 transition-colors ${autoApply ? 'bg-indigo-500' : 'bg-slate-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoApply ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 border-b-4 border-b-green-500 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-green-400 font-medium mb-1"><CheckCircle size={16} /> Applied</div>
            <div className="text-3xl font-bold text-white">{appliedCount}</div>
          </div>
        </div>
        <div className="glass-panel p-6 border-b-4 border-b-yellow-500 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-yellow-400 font-medium mb-1"><Clock size={16} /> Pending</div>
            <div className="text-3xl font-bold text-white">{pendingCount}</div>
          </div>
        </div>
        <div className="glass-panel p-6 border-b-4 border-b-red-500 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-red-400 font-medium mb-1"><XCircle size={16} /> Rejected</div>
            <div className="text-3xl font-bold text-white">{rejectedCount}</div>
          </div>
        </div>
      </div>

      {/* Auto Apply Banner */}
      <div className={`p-6 rounded-2xl mb-8 flex justify-between items-center transition-all ${autoApply ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
         <div>
           <h2 className="text-xl font-bold flex items-center gap-2 mb-1">
             <Zap size={20} />
             {autoApply ? 'Auto Apply is Active' : 'Auto Apply is Paused'}
           </h2>
           <p className={autoApply ? 'text-indigo-100' : 'text-slate-500'}>
             {autoApply ? 'AI is automatically applying to jobs that match your profile (95%+ match).' : 'Enable to let AI handle your job posting distribution.'}
           </p>
         </div>
         {autoApply && (
           <div className="bg-white/20 px-6 py-3 rounded-xl text-center backdrop-blur-md border border-white/10">
             <div className="text-3xl font-black">5</div>
             <div className="text-xs uppercase tracking-wider font-bold opacity-80">Today</div>
           </div>
         )}
      </div>

      {/* Applications Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-xs uppercase tracking-wider font-bold text-slate-500">
                <th className="p-4 w-64">Company</th>
                <th className="p-4">Position</th>
                <th className="p-4">Applied Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center shrink-0">
                        🚀
                      </div>
                      <span className="font-bold text-slate-200">{app.company}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{app.position}</td>
                  <td className="p-4 text-slate-400">{app.date}</td>
                  <td className="p-4">
                    {app.status === 'applied' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20"><CheckCircle size={12} /> Applied</span>}
                    {app.status === 'pending' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"><Clock size={12} /> Pending</span>}
                    {app.status === 'rejected' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20"><XCircle size={12} /> Rejected</span>}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors">
                      View Details
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
