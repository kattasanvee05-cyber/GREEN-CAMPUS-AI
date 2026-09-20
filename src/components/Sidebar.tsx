import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  ClipboardCheck,
  Zap,
  Droplets,
  Trash2,
  Bike,
  ListTodo,
  TrendingUp,
  ShieldAlert,
  BookOpen,
  HelpCircle,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, isOpen = true, onClose }) => {
  const mainNav = [
    { to: user?.role === 'admin' ? '/admin' : '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/ai-advisor', label: 'AI Advisor', icon: Bot, badge: 'RAG' },
    { to: '/assessment', label: 'Campus Assessment', icon: ClipboardCheck },
  ];

  const analyticsNav = [
    { to: '/energy', label: 'Energy Management', icon: Zap },
    { to: '/water', label: 'Water Stewardship', icon: Droplets },
    { to: '/waste', label: 'Waste Segregation', icon: Trash2 },
    { to: '/transport', label: 'Commute & Mobility', icon: Bike },
  ];

  const actionNav = [
    { to: '/action-plan', label: 'AI Action Plan', icon: ListTodo },
    { to: '/impact', label: 'Impact Dashboard', icon: TrendingUp },
  ];

  const trustNav = [
    { to: '/responsible-ai', label: 'Responsible AI', icon: ShieldAlert },
    { to: '/about', label: 'About Project', icon: HelpCircle },
  ];

  const adminNav = [
    { to: '/admin', label: 'Admin Overview', icon: ShieldCheck },
    { to: '/admin/knowledge-base', label: 'Knowledge Base Admin', icon: BookOpen },
  ];

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'bg-emerald-800 text-white shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 md:top-[61px] left-0 z-40 h-full md:h-[calc(100vh-61px)] w-64 bg-white border-r border-slate-200/80 p-4 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
              Decision Platform
            </span>
            <div className="space-y-1">
              {mainNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} className={navClass} onClick={onClose}>
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Resource Telemetry */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
              Campus Analytics
            </span>
            <div className="space-y-1">
              {analyticsNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} className={navClass} onClick={onClose}>
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Action & Impact */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
              Execution & Progress
            </span>
            <div className="space-y-1">
              {actionNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} className={navClass} onClick={onClose}>
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Governance & Reference */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
              Governance & Reference
            </span>
            <div className="space-y-1">
              {trustNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} className={navClass} onClick={onClose}>
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Admin Management (if admin) */}
          {user?.role === 'admin' && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 px-3 block mb-1.5">
                Campus Admin
              </span>
              <div className="space-y-1">
                {adminNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink key={item.to} to={item.to} className={navClass} onClick={onClose}>
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Meta */}
        <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] text-slate-400 space-y-1">
          <div className="font-semibold text-slate-600">GREEN CAMPUS AI</div>
          <div>1M1B AI for Sustainability</div>
          <div className="text-[10px] text-slate-400">IBM SkillsBuild × AICTE</div>
        </div>
      </aside>
    </>
  );
};
