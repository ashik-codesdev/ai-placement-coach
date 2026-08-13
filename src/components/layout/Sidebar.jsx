import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Code2,
  Brain,
  FileCheck2,
  Video,
  Building2,
  Briefcase,
  BarChart3,
  Bot,
  User,
  Sparkles,
  Flame
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const { profile } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Placement Roadmap', path: '/roadmap', icon: Map },
    { name: 'Coding Practice', path: '/coding', icon: Code2 },
    { name: 'Aptitude Practice', path: '/aptitude', icon: Brain },
    { name: 'AI Resume Analyzer', path: '/resume', icon: FileCheck2 },
    { name: 'AI Mock Interview', path: '/interview', icon: Video },
    { name: 'Company Preparation', path: '/companies', icon: Building2 },
    { name: 'Application Tracker', path: '/applications', icon: Briefcase },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Study Assistant', path: '/assistant', icon: Bot },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900/90 border-r border-slate-800 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800/80 shrink-0">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              Placement<span className="gradient-text font-black">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Coach Platform</p>
          </div>
        </div>

        {/* Streak & Prep Score Widget */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">{profile?.streak_count || 0} Day Streak</p>
              <p className="text-[10px] text-slate-400">Keep learning daily!</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-indigo-400">{profile?.prep_score || 72}%</span>
            <p className="text-[9px] text-slate-400 uppercase tracking-wider">Score</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Profile Summary */}
        <div className="p-4 border-t border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={profile?.full_name || 'User Avatar'}
              className="w-9 h-9 rounded-full object-cover border border-slate-700"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-200 truncate">{profile?.full_name || 'Student'}</p>
              <p className="text-[10px] text-slate-400 truncate">{profile?.target_role || 'Targeting Software Engineer'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
