import React, { useState, useEffect } from 'react';
import { ListTodo, CheckCircle2, Clock, AlertTriangle, Sparkles, Filter, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { ActionItem } from '../types';

export const ActionPlan: React.FC = () => {
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const loadActions = async () => {
    try {
      const data = await api.getActions();
      setActions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActions();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'Not Started' | 'In Progress' | 'Completed') => {
    try {
      await api.updateActionStatus(id, newStatus);
      if (newStatus === 'Completed') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
      loadActions();
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = actions.filter((a) => {
    const matchUrgency = selectedUrgency === 'all' || a.urgency === selectedUrgency;
    const matchStatus = selectedStatus === 'all' || a.status === selectedStatus;
    return matchUrgency && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100/80 text-purple-800">
              <ListTodo className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Campus AI Action Plan
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Prioritized sustainability roadmap structured into Quick-Win, Medium-Term, and Long-Term operational milestones
          </p>
        </div>

        <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-xl text-slate-600 font-semibold">
          {actions.filter((a) => a.status === 'Completed').length} of {actions.length} Actions Completed
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 font-semibold px-2 text-[11px] uppercase tracking-wider">Urgency:</span>
          {['all', 'Quick Win', 'Medium-Term', 'Long-Term'].map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUrgency(u)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all capitalize whitespace-nowrap ${
                selectedUrgency === u
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {u === 'all' ? 'All Tiers' : u}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold px-2 text-[11px] uppercase tracking-wider">Status:</span>
          {['all', 'Not Started', 'In Progress', 'Completed'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap ${
                selectedStatus === s
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Actions Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border bg-white shadow-2xs flex flex-col justify-between transition-all ${
              item.status === 'Completed'
                ? 'border-emerald-200 bg-emerald-50/15'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    item.urgency === 'Quick Win'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.urgency === 'Medium-Term'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {item.urgency}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700">
                    {item.sdg_target}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>

              <div className="mt-2.5 space-y-2 text-xs">
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-800">Why:</span> {item.why}
                </p>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                  <span className="font-semibold text-slate-800">First Step:</span> {item.first_step}
                </div>
                <p className="text-slate-500 text-[11px]">
                  <span className="font-semibold text-slate-600">Expected Benefit:</span> {item.expected_benefit}
                </p>
                <p className="text-slate-400 text-[11px]">
                  <span className="font-semibold text-slate-500">Stakeholder:</span> {item.responsible_stakeholder}
                </p>
              </div>
            </div>

            {/* Status Selector Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">Update Status:</span>
              <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200 text-xs">
                {(['Not Started', 'In Progress', 'Completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(item.id, st)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                      item.status === st
                        ? st === 'Completed'
                          ? 'bg-emerald-700 text-white shadow-2xs'
                          : st === 'In Progress'
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'bg-slate-700 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
