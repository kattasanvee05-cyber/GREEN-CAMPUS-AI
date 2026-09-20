import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle2, AlertCircle, Award, Target, ShieldCheck, Zap, Droplets, Trash2, Bike } from 'lucide-react';
import { api } from '../services/api';

export const ImpactDashboard: React.FC = () => {
  const [impact, setImpact] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImpact() {
      try {
        const data = await api.getImpactMetrics();
        setImpact(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadImpact();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100/80 text-emerald-800">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Campus Sustainability Impact Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track operational execution milestones and simulated environmental outcomes
          </p>
        </div>

        <span className="self-start sm:self-center text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Prototype / Estimated Metrics
        </span>
      </div>

      {/* Prominent Truth-in-Metrics Alert */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
        <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">Transparent Disclosure:</span> {impact?.disclaimer || "Prototype / Estimated Metric — Values illustrate decision-support milestones and simulated potential outcomes. Institutional validation and field instrumentation required for real-world environmental claims."}
        </div>
      </div>

      {/* Execution Summary Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Overall Action Completion</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {impact?.completion_rate_pct || 0}%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="bg-emerald-700 h-full rounded-full transition-all duration-700"
              style={{ width: `${impact?.completion_rate_pct || 0}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            {impact?.completed_actions || 0} of {impact?.total_actions || 0} initiatives executed
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Active Implementation</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-700">
            {impact?.in_progress_actions || 0}
          </div>
          <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
            Actions currently being implemented by student eco-clubs & facility wings
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Primary SDG Focus</span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-teal-800">
            SDG 11
          </div>
          <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
            Modeling sustainable micro-communities via active transit & resource circularity
          </p>
        </div>
      </div>

      {/* Simulated Operational Indicators */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Prototype Operational Indicators (Simulated Models)
            </h3>
            <p className="text-xs text-slate-500">
              Engineering estimates modeled on completed Quick-Win and baseline interventions
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {impact?.simulated_indicators?.map((ind: any, i: number) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-amber-800 font-bold uppercase tracking-wider mb-1">
                  <span>{ind.type}</span>
                  <span className="bg-amber-100 px-1.5 py-0.5 rounded font-semibold">Estimated</span>
                </div>
                <div className="text-xs font-bold text-slate-800 mb-1.5">
                  {ind.label}
                </div>
                <div className="text-2xl font-black text-emerald-800">
                  {ind.value}
                </div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                {ind.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
