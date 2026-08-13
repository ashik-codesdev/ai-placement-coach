import React, { useState } from 'react';
import { Menu, Sun, Moon, LogOut, Bell, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

export const Topbar = ({ onToggleSidebar }) => {
  const { profile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 border-b border-slate-800 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8">
      {/* Left: Mobile Menu Toggle & Breadcrumb / Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar Input */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search problems, topics, companies..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mock Mode / AI Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Engine Ready</span>
        </div>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
              <h4 className="text-xs font-semibold text-slate-200 mb-2">Notifications</h4>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-800/50 text-xs text-slate-300">
                  <p className="font-semibold text-indigo-400">Daily Challenge Ready</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Solve 'Two Sum' to extend your 5-day streak!</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/50 text-xs text-slate-300">
                  <p className="font-semibold text-emerald-400">Upcoming Interview</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Amazon Technical Interview scheduled in 3 days.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
