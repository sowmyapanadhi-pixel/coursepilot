import React from 'react';
import { Bell, Briefcase, BookOpen, Star, Clock } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'course',
      title: 'New module unlocked!',
      desc: 'Based on your progress, "Advanced API Development" is now available.',
      time: '2 hours ago',
      icon: <BookOpen className="text-purple-400" />,
      unread: true
    },
    {
      id: 2,
      type: 'job',
      title: 'Job application update',
      desc: 'Your application for "Junior Developer" at TechCorp was viewed.',
      time: '5 hours ago',
      icon: <Briefcase className="text-emerald-400" />,
      unread: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Profile Strengths',
      desc: 'Your score in JavaScript assessment is in the top 10%!',
      time: '1 day ago',
      icon: <Star className="text-amber-400" />,
      unread: false
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Daily learning goal',
      desc: "Don't forget to complete your daily module to maintain your streak.",
      time: '2 days ago',
      icon: <Clock className="text-indigo-400" />,
      unread: false
    }
  ];

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl shadow-inner">
            <Bell size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Notifications</h1>
            <p className="text-slate-500 font-bold italic text-lg uppercase tracking-tight">Stay updated on your learning and career progress</p>
          </div>
        </div>
        <button className="text-xs font-black text-indigo-600 hover:text-indigo-500 transition-colors uppercase tracking-[0.2em] underline decoration-indigo-100 underline-offset-4">
          Mark all read
        </button>
      </div>

      <div className="space-y-6">
        {notifications.map((notif) => (
          <div 
            key={notif.id}
            className={`glass-panel p-8 flex gap-8 border-l-8 transition-all hover:scale-[1.01] bg-white border-white shadow-xl shadow-indigo-50 ${
              notif.unread ? 'border-l-indigo-600 bg-gradient-to-r from-indigo-50/30 to-white' : 'border-l-slate-100 opacity-90'
            }`}
          >
            <div className={`p-4 rounded-2xl bg-slate-50 flex items-center justify-center h-fit shadow-inner`}>
              {notif.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <h3 className={`font-black text-xl tracking-tight ${notif.unread ? 'text-slate-800' : 'text-slate-500'}`}>
                  {notif.title}
                </h3>
                <span className="text-xs font-black text-slate-400 whitespace-nowrap mt-2 uppercase tracking-widest italic">
                  {notif.time}
                </span>
              </div>
              <p className={`text-lg font-medium leading-relaxed ${notif.unread ? 'text-slate-600' : 'text-slate-400'}`}>
                {notif.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
