import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, Trophy, HelpCircle, ArrowRight, Star, TrendingUp, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { generateCommunityMatches } from '../utils/aiEngine';

const Community = () => {
  const { userData } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('groups');

  const initialPulseFeed = [
    { id: 1, user: "Sarah L.", role: "AI Strategist", content: "Just solved a race condition in our distributed ML pipeline! Pro-tip: Check your atomic locks first. 🚀", time: "2m ago", likes: 24, comments: 5 },
    { id: 2, user: "Marcus V.", role: "Cloud Architect", content: "Switching from AOT to JIT for our real-time data stream reduced latency by 15%. Thoughts?", time: "15m ago", likes: 18, comments: 12 },
    { id: 3, user: "Emma R.", role: "UX Designer", content: "Is Glassmorphism still the 'X-factor' for 2024? Loving the pastel shift lately.", time: "40m ago", likes: 45, comments: 30 },
  ];

  const [joinedGroups, setJoinedGroups] = useState([]);
  const [feed, setFeed] = useState(initialPulseFeed);

  const handleJoin = (groupName) => {
    // Navigate to Detail page
    const slug = groupName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    navigate(`/community/${slug}`);
  };

  const handleLike = (id) => {
    setFeed(feed.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleComment = (user) => {
    alert(`Establishing logical connection with ${user}'s secure communication channel...`);
  };

  const communities = generateCommunityMatches(userData);

  const leaderboard = [
    { rank: 1, user: "Alex Chen", points: "4,820", trend: "+12%" },
    { rank: 2, user: "Sofia Ramirez", points: "4,650", trend: "+8%" },
    { rank: 3, user: "Liam Smith", points: "4,410", trend: "+15%" },
    { rank: 4, user: "Yuki Tanaka", points: "4,200", trend: "+5%" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12 pb-16">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-800 mb-2 tracking-tight uppercase italic underline decoration-8 decoration-violet-50 underline-offset-8">Community Pulse</h1>
          <p className="text-xl text-slate-400 font-bold italic uppercase tracking-tighter">
            Collaborate, <span className="text-violet-600">Compete</span>, and Synthesize Knowledge.
          </p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => alert("Initializing doubt resolution protocol... Type your query in the secure terminal.")}
             className="bg-white border-2 border-slate-100 hover:border-violet-200 text-slate-600 font-black px-6 py-4 rounded-3xl transition-all shadow-sm flex items-center gap-3 active:scale-95 text-sm uppercase tracking-widest"
           >
             <HelpCircle size={18} />
             <span>Ask Doubt</span>
           </button>
           <button 
             onClick={() => alert("Synthesizing new discussion vector. Please provide your architectural focus.")}
             className="bg-violet-600 hover:bg-violet-500 text-white font-black px-8 py-4 rounded-3xl transition-all shadow-2xl shadow-purple-100 flex items-center gap-3 active:scale-95 text-sm uppercase tracking-widest border-b-4 border-black/10"
           >
             <Zap size={18} />
             <span>Start Discussion</span>
           </button>
        </div>
      </div>

      {/* Tabs / Navigation */}
      <div className="flex gap-8 border-b-4 border-slate-50 pb-2">
         {['groups', 'feed', 'leaderboard'].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-4 py-2 font-black uppercase tracking-widest text-xs transition-all border-b-4 -mb-[6px] ${
               activeTab === tab 
               ? 'text-violet-600 border-violet-600' 
               : 'text-slate-400 border-transparent hover:text-slate-600'
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-12">
          
          {activeTab === 'groups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-left-8 duration-700">
               {communities.map((group, i) => (
                 <div key={i} className="glass-panel p-8 bg-white border-white shadow-2xl shadow-slate-100 rounded-[2.5rem] group hover:border-violet-200 transition-all cursor-pointer">
                    <div className={`w-20 h-20 rounded-[1.5rem] ${group.color} flex items-center justify-center text-4xl mb-6 shadow-inner transform group-hover:rotate-6 transition-all`}>
                      {group.icon}
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{group.name}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">{group.members} Peers</span>
                    </div>
                    <p className="text-slate-500 font-medium italic mb-8 leading-relaxed line-clamp-2">{group.description}</p>
                    <button 
                      onClick={() => handleJoin(group.name)}
                      className={`w-full py-4 rounded-2xl transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest border-2 ${
                        joinedGroups.includes(group.name)
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : 'bg-slate-50 group-hover:bg-violet-600 text-slate-500 group-hover:text-white border-transparent'
                      }`}
                    >
                      <span>{joinedGroups.includes(group.name) ? 'Synchronized' : 'Synchronize Group'}</span>
                      <ArrowRight size={16} />
                    </button>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'feed' && (
            <div className="space-y-8 animate-in slide-in-from-left-8 duration-700">
              {feed.map((post, i) => (
                <div key={i} className="glass-panel p-8 bg-white border-white shadow-2xl shadow-slate-100 rounded-[2.5rem]">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-tr from-violet-200 to-rose-200 rounded-full flex items-center justify-center font-black text-white shadow-lg text-xl">
                        {post.user[0]}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 tracking-tight">{post.user}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-violet-500 italic">{post.role} • {post.time}</span>
                      </div>
                   </div>
                   <p className="text-xl text-slate-600 font-medium leading-relaxed italic border-l-8 border-violet-50 pl-6 mb-8">{post.content}</p>
                   <div className="flex gap-8 text-slate-400">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 hover:text-rose-500 transition-colors font-black uppercase tracking-widest text-[10px]"
                      >
                        <Star size={18} className={post.likes > 40 ? 'fill-rose-500 text-rose-500' : ''} /> {post.likes} Strategic Likes
                      </button>
                      <button 
                        onClick={() => handleComment(post.user)}
                        className="flex items-center gap-2 hover:text-violet-600 transition-colors font-black uppercase tracking-widest text-[10px]"
                      >
                        <MessageSquare size={18} /> {post.comments} Logical Responses
                      </button>
                   </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
             <div className="glass-panel p-10 bg-white border-white shadow-2xl shadow-slate-100 rounded-[3rem] animate-in slide-in-from-left-8 duration-700">
                 <div className="flex items-center gap-4 mb-10">
                    <Trophy className="text-amber-400" size={32} />
                    <h3 className="text-3xl font-black text-slate-800 tracking-tight italic">Top Logic Accelerators</h3>
                 </div>
                 <div className="space-y-6">
                   {leaderboard.map((user, i) => (
                     <div key={i} className="flex items-center justify-between p-6 rounded-3xl border-2 border-slate-50 hover:border-violet-100 hover:bg-slate-50/50 transition-all cursor-default">
                        <div className="flex items-center gap-6">
                           <span className={`text-2xl font-black w-10 ${i === 0 ? 'text-amber-500' : 'text-slate-300'}`}>0{user.rank}</span>
                           <div>
                             <h4 className="font-black text-slate-800 text-lg">{user.user}</h4>
                             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{user.trend} Velocity</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-2xl font-black text-slate-800 font-mono tracking-tighter">{user.points}</div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">XP Synthesized</span>
                        </div>
                     </div>
                   ))}
                 </div>
             </div>
          )}
        </div>

        {/* Sidebar / Stats Section */}
        <div className="space-y-12">
            
            <div className="glass-panel p-8 bg-gradient-to-br from-violet-600 to-rose-500 rounded-[2.5rem] text-white shadow-2xl shadow-purple-200">
               <div className="flex items-center gap-3 mb-6">
                 <TrendingUp size={24} />
                 <h4 className="font-black uppercase tracking-[0.2em] text-xs">Your Profile Pulse</h4>
               </div>
               <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
                    <span className="font-black text-xs uppercase tracking-widest text-violet-100">Daily Streak</span>
                    <span className="text-2xl font-black">12 Days</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
                    <span className="font-black text-xs uppercase tracking-widest text-violet-100">Contribution Rank</span>
                    <span className="text-2xl font-black">Expert</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
                    <span className="font-black text-xs uppercase tracking-widest text-violet-100">Synthesized Solutions</span>
                    <span className="text-2xl font-black">42</span>
                  </div>
               </div>
            </div>

            <div className="glass-panel p-8 bg-white border-white shadow-2xl shadow-slate-100 rounded-[2.5rem]">
               <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-8">Urgent Doubts Pool</h4>
               <div className="space-y-6">
                  {[
                    "How to scale Web3 protocols for high TPS?",
                    "Best atomic lock library for Python 3.12?",
                    "SVG optimization in Next.js 14 layouts?"
                  ].map((doubt, i) => (
                    <div key={i} onClick={() => alert(`Establishing neural link to resolve: "${doubt}"`)} className="group cursor-pointer">
                       <p className="text-slate-600 font-bold italic mb-2 group-hover:text-violet-600 transition-colors">"{doubt}"</p>
                       <div className="flex justify-between items-center border-b-[3px] border-slate-50 pb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">8 Responses</span>
                          <ArrowRight size={14} className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-2 transition-all" />
                       </div>
                    </div>
                  ))}
               </div>
               <button 
                 onClick={() => alert("Accessing the global archives of doubt history...")}
                 className="w-full mt-8 py-4 text-violet-600 font-black text-xs uppercase tracking-widest hover:bg-violet-50 transition-all rounded-2xl border-2 border-violet-100"
               >
                 View All Open Doubts
               </button>
            </div>

        </div>

      </div>

    </div>
  );
};

export default Community;
