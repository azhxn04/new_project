import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  CheckCircle2,
  Calculator,
  Landmark,
  BotMessageSquare,
  FileText,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard,
    badge: 'Live',
    active: true,
  },
  {
    name: 'Market Potential',
    to: '/market-potential',
    icon: TrendingUp,
    badge: 'Phase 2',
    active: true,
  },
  {
    name: 'Competitor Analysis',
    to: '/market-potential',
    icon: Users,
    badge: 'Phase 2',
    active: true,
  },
  {
    name: 'Feasibility & SWOT',
    to: '/feasibility',
    icon: CheckCircle2,
    badge: 'Phase 3',
    active: true,
  },
  {
    name: 'Cost & Loan Planning',
    to: '/finance',
    icon: Calculator,
    badge: 'Phase 4',
    active: true,
  },
  {
    name: 'Government Schemes',
    to: '/schemes',
    icon: Landmark,
    badge: 'Phase 5',
    active: true,
  },
  {
    name: 'AI Business Advisor',
    to: '/advisor',
    icon: BotMessageSquare,
    badge: 'Phase 6',
    active: true,
  },
  {
    name: 'Report & Action Plan',
    to: '/reports',
    icon: FileText,
    badge: 'Phase 7',
    active: true,
  },
];

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:shadow-none'
        }`}
      >
        {/* Sidebar Brand Header with Vector Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <NavLink to="/dashboard" onClick={onClose} className="flex items-center">
            <Logo className="h-10 w-auto" />
          </NavLink>

          {/* Close button for mobile drawer */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/10'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-blue-600" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer status widget */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>System Mode</span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                Live Backend API
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Connected to Node.js Express (`:8000`) & Python ML Microservice (`:5000`).
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;