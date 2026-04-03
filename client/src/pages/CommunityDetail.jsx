import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MessageSquare, ShieldCheck, Zap, Star, Globe, GraduationCap, Trophy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CommunityDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { userData } = useAppContext();

  // Mock members based on interest
  const members = [
    { name: "Sarah L.", role: "Lead Architect", expertise: "Neural Systems", points: "4.8k", avatar: "SL", status: "online" },
    { name: "Marcus V.", role: "Cloud Strategist", expertise: "Zero-Downtime Ops", points: "4.2k", avatar: "MV", status: "offline" },
    { name: "Emma R.", role: "UX Experience Lead", expertise: "Cognitive Design", points: "3.9k", avatar: "ER", status: "online" },
    { name: "Liam S.", role: "Security Researcher", expertise: "Protocol Audit", points: "3.5k", avatar: "LS", status: "online" },
    { name: "Yuki T.", role: "Data Scientist", expertise: "Predictive Engines", points: "3.1k", avatar: "YT", status: "offline" },
    { name: "Alex C.", role: "Software Engineer", expertise: "Frontend Logic", points: "2.8k", avatar: "AC", status: "online" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-12 duration-1000 space-y-12 pb-20">
      
      {/* Header / Navigation */}
      <div className="flex justify-between items-center bg-white p-8 border-4 border-slate-50 rounded-[2.5rem] shadow-xl shadow-slate-50">
        <button 
          onClick={() => navigate('/community')}
          className="flex items-center gap-3 text-slate-400 hover:text-violet-600 font-black uppercase tracking-widest text-xs transition-all group"
        >
          <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-violet-50 transition-colors"><ArrowLeft size={18} /></div>
          <span>Back to Pulse Hub</span>
        </button>
        <div className="flex gap-4">
           <button className="bg-violet-50 text-violet-600 font-black px-6 py-3 rounded-full text-xs uppercase tracking-widest border-2 border-violet-100 italic">
             Cohort Alpha-7
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Section: Member Directory */}
        <div className="lg:col-span-2 space-y-10">
           <div className="glass-panel p-12 bg-white border-white shadow-2xl shadow-purple-50 rounded-[3rem]">
              <div className="flex items-center gap-4 mb-10 border-b-4 border-slate-50 pb-8">
                 <Users className="text-violet-500" size={32} />
                 <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-8 decoration-violet-50 underline-offset-8">Group Residents</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {members.map((member, i) => (
                  <div key={i} className="p-8 bg-slate-50 border-4 border-white rounded-[2.5rem] hover:shadow-2xl hover:shadow-purple-100 hover:-translate-y-2 transition-all group cursor-default relative overflow-hidden">
                     {member.status === 'online' && (
                       <div className="absolute top-6 right-6 w-4 h-4 bg-emerald-400 rounded-full border-4 border-white animate-pulse"></div>
                     )}
                     <div className="flex items-center gap-6 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-tr from-violet-200 to-rose-200 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:rotate-6 transition-transform">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight italic">{member.name}</h4>
                          <span className="text-[10px] font-black uppercase tracking-widest text-violet-500">{member.role}</span>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-500 font-bold italic text-xs">
                           <ShieldCheck size={14} className="text-emerald-400" />
                           Expertise: {member.expertise}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t-2 border-white">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Logic Points</span>
                           <span className="font-black text-violet-600">{member.points} XP</span>
                        </div>
                     </div>
                     <button className="w-full mt-6 py-3 bg-white text-violet-600 font-black rounded-xl text-[10px] uppercase tracking-widest shadow-sm hover:bg-violet-600 hover:text-white transition-all border-2 border-violet-50">
                        Initiate Connection
                     </button>
                  </div>
                ))}
              </div>
           </div>

           {/* Ranking / Leaderboard Section */}
           <div className="glass-panel p-12 bg-white border-white shadow-2xl shadow-purple-50 rounded-[3rem]">
              <div className="flex items-center gap-4 mb-12 border-b-4 border-slate-50 pb-8">
                 <Trophy className="text-amber-400" size={32} />
                 <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-8 decoration-amber-50 underline-offset-8">Cognitive Leaderboard</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { rank: 1, user: "Sarah L.", points: "4,820", trend: "+12%" },
                  { rank: 2, user: "Sofia Ramirez", points: "4,650", trend: "+8%" },
                  { rank: 3, user: "Liam Smith", points: "4,410", trend: "+15%" },
                  { rank: 4, user: "Yuki Tanaka", points: "4,200", trend: "+5%" },
                  { rank: 5, user: "Marcus V.", points: "3,950", trend: "+3%" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-8 rounded-[2rem] border-4 border-slate-50 hover:border-violet-100 hover:bg-slate-50/50 transition-all cursor-default">
                    <div className="flex items-center gap-8">
                       <span className={`text-4xl font-black italic tracking-tighter w-12 ${i === 0 ? 'text-amber-500' : 'text-slate-300'}`}>0{item.rank}</span>
                       <div>
                         <h4 className="font-black text-slate-800 text-[1.4rem] tracking-tight">{item.user}</h4>
                         <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{item.trend} Velocity Alignment</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-3xl font-black text-slate-800 font-mono tracking-tighter">{item.points}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">XP Synthesized</span>
                    </div>
                  </div>
                ))}
              </div>

               <div className="mt-12 p-8 bg-violet-600 rounded-[2.5rem] text-white flex justify-between items-center shadow-2xl shadow-purple-200 border-b-4 border-black/10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl rotate-6 italic shadow-inner">
                      {(userData.name?.[0] || "Y").toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-black text-xl uppercase tracking-tight">Your Cohort Rank</h4>
                      <p className="text-violet-100 font-black text-xs uppercase tracking-widest italic opacity-90">Infecting Top 10 soon</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black tracking-tighter italic">#14</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-violet-200 opacity-80">Global Vector Position</span>
                  </div>
               </div>
           </div>
        </div>

        {/* Sidebar: Group Data */}
        <div className="space-y-12">
           <div className="glass-panel p-10 bg-gradient-to-br from-violet-600 to-rose-500 rounded-[3rem] text-white shadow-2xl shadow-purple-200 border-4 border-white">
              <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center text-4xl mb-8 shadow-inner italic">
                {groupId?.[0].toUpperCase() || "C"}
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase italic">{groupId?.replace(/-/g, ' ')}</h3>
              <p className="text-violet-50 font-medium italic opacity-90 leading-relaxed mb-10">
                You are currently synchronized with the top performers in this vector. Your expertise in {userData.skills?.[0] || 'Technology'} is flagged for strategic synergy.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/10 p-5 rounded-3xl text-center">
                    <div className="text-2xl font-black">124</div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-violet-100">Daily Discourse</span>
                 </div>
                 <div className="bg-white/10 p-5 rounded-3xl text-center">
                    <div className="text-2xl font-black">94%</div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-violet-100">Synergy Rate</span>
                 </div>
              </div>
           </div>

           <div className="glass-panel p-10 bg-white border-white shadow-2xl shadow-purple-50 rounded-[3rem]">
              <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-8 italic flex items-center gap-3">
                <Globe size={18} className="text-violet-500" />
                Community Discourse
              </h4>
              <div className="space-y-8">
                 {[
                   { user: "Sarah L.", text: "Anyone reviewing the new neural protocol?" },
                   { user: "Emma R.", text: "The pastel shift really hit the Dashboard hard!" },
                   { user: "Marcus V.", text: "I need a strategic audit on my cloud infra." }
                 ].map((chat, i) => (
                   <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center font-black text-xs text-slate-400 shrink-0 group-hover:bg-violet-50 group-hover:text-violet-400 transition-all">{chat.user[0]}</div>
                      <div>
                        <p className="font-black text-slate-800 text-[11px] mb-1">{chat.user}</p>
                        <p className="text-xs text-slate-500 font-medium italic leading-relaxed">"{chat.text}"</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-5 bg-slate-50 text-slate-400 font-black rounded-[2rem] text-xs uppercase tracking-widest hover:bg-violet-50 hover:text-violet-600 transition-all border-2 border-transparent italic">
                Enter Discussion Terminal
              </button>
           </div>
        </div>

      </div>

    </div>
  );
};

export default CommunityDetail;
