import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Droplets,
  Trash2,
  Bike,
  ArrowRight,
  Sparkles,
  Bot,
  ClipboardCheck,
  ListTodo,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Building
} from 'lucide-react';
import { api } from '../services/api';
import { User, ActionItem } from '../types';

interface UserDashboardProps {
  user: User;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [summary, setSummary] = useState<any>(null);
  const [pendingActions, setPendingActions] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [sumRes, actRes] = await Promise.all([
          api.getAnalyticsSummary(),
          api.getActions()
        ]);
        setSummary(sumRes);
        setPendingActions(actRes.filter((a) => a.status !== 'Completed').slice(0, 3));
      } catch (e) {
        console.error('Failed to load dashboard data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Campus Sustainability Intelligence Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good morning, {user.name}
          </h1>
          <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed font-normal">
            Let's make your campus a little more sustainable today. Explore AI-grounded decision support, analyze resource telemetry, and track collaborative climate actions.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/ai-advisor')}
              className="px-4 py-2 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-700" /> Ask GreenCampus AI
            </button>
            <button
              onClick={() => navigate('/assessment')}
              className="px-4 py-2 bg-emerald-700/80 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-600/50"
            >
              <ClipboardCheck className="w-4 h-4" /> Start Assessment
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Cards */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Campus Resource Telemetry
            </h2>
            <p className="text-xs text-slate-500">
              Operational overview across core sustainability pillars
            </p>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Demo / Estimated Metrics
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Energy Card */}
          <div
            onClick={() => navigate('/energy')}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ENERGY
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {summary?.energy?.current_value || '27,300 kWh'}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-700">Needs Attention</span>
              <span className="text-slate-400 font-medium">+4.2%</span>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-snug line-clamp-2 border-t border-slate-100 pt-2.5">
              {summary?.energy?.recommendation || 'Conduct walk-through lighting and AC audit across Academic Block A.'}
            </p>
          </div>

          {/* Water Card */}
          <div
            onClick={() => navigate('/water')}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                WATER
              </span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700 group-hover:scale-110 transition-transform">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {summary?.water?.current_value || '540 kL'}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-700">Moderate</span>
              <span className="text-slate-400 font-medium">-3.5%</span>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-snug line-clamp-2 border-t border-slate-100 pt-2.5">
              {summary?.water?.recommendation || 'Hostel tap aerator retrofit progressing; 4 leaks logged this month.'}
            </p>
          </div>

          {/* Waste Card */}
          <div
            onClick={() => navigate('/waste')}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                WASTE
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:scale-110 transition-transform">
                <Trash2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {summary?.waste?.current_value || '72%'}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700">Improving</span>
              <span className="text-emerald-700 font-semibold">+6.0%</span>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-snug line-clamp-2 border-t border-slate-100 pt-2.5">
              {summary?.waste?.recommendation || 'Expand organic composting capacity for cafeteria food scraps.'}
            </p>
          </div>

          {/* Transport Card */}
          <div
            onClick={() => navigate('/transport')}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                TRANSPORT
              </span>
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700 group-hover:scale-110 transition-transform">
                <Bike className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {summary?.transport?.current_value || '61%'}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-teal-700">Sustainable Trips</span>
              <span className="text-teal-700 font-semibold">+2.8%</span>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-snug line-clamp-2 border-t border-slate-100 pt-2.5">
              {summary?.transport?.recommendation || 'Install covered bicycle parking racks near South Gate.'}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section: Pending Actions & AI Recommendations */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Actions List */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Active Campus Action Milestones
              </h3>
            </div>
            <button
              onClick={() => navigate('/action-plan')}
              className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
            >
              View all actions <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingActions.map((action) => (
              <div
                key={action.id}
                className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                      {action.urgency}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {action.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {action.why}
                  </p>
                  <div className="mt-1 text-[11px] text-slate-400">
                    Lead: <span className="text-slate-600 font-medium">{action.responsible_stakeholder}</span>
                  </div>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${
                    action.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {action.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Prototype Assessment Callout */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-teal-700">
              <ClipboardCheck className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-900">
                Prototype Assessment
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluate your campus conditions across Energy, Water, Waste, Transport, and Green Buildings to generate an instant baseline sustainability profile.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Latest Campus Score:</span>
                <span className="font-bold text-emerald-800">66 / 100</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Status Rating:</span>
                <span className="font-semibold text-teal-700">Moderate Progress</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-full rounded-full" style={{ width: '66%' }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/assessment')}
            className="mt-6 w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            Update Assessment <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
