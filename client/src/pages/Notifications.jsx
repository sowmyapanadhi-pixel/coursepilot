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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl">
            <Bell size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            <p className="text-slate-400">Stay updated on your learning and career progress</p>
          </div>
        </div>
        <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id}
            className={`glass-panel p-6 flex gap-5 border-l-4 transition-all hover:bg-white/5 ${
              notif.unread ? 'border-l-indigo-500 bg-indigo-500/5' : 'border-l-transparent text-slate-400'
            }`}
          >
            <div className={`p-3 rounded-xl bg-slate-900/50 flex items-center justify-center h-fit`}>
              {notif.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold text-lg ${notif.unread ? 'text-white' : 'text-slate-300'}`}>
                  {notif.title}
                </h3>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap mt-1">
                  {notif.time}
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
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
