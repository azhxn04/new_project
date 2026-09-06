import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Menu, Bell, ShieldCheck, Sparkles } from 'lucide-react';
import Logo from './Logo';

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur transition-all">
      {/* Left section: Hamburger & Mobile Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 md:hidden">
          <Logo className="h-8 w-auto" />
        </div>

        {/* Status indicator on desktop */}
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span>AI Engine Active (Groq Llama 3)</span>
        </div>
      </div>

      {/* Right section: User profile & controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification indicator */}
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500"></span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-xs font-semibold text-slate-900 leading-tight">
              {user?.name || 'Entrepreneur'}
            </div>
            <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
              {user?.businessName || user?.email}
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-xs ring-2 ring-brand-500/20">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : <User className="h-4 w-4" />}
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Log out of VYAPARMITRA"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;