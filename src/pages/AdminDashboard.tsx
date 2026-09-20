import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, BookOpen, Users, ClipboardCheck, ArrowRight, Database, Zap, Droplets, Trash2, Bike } from 'lucide-react';
import { api } from '../services/api';
import { SimpleLineChart, SimpleBarChart } from '../components/ChartComponents';

export const AdminDashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [docsCount, setDocsCount] = useState(0);
  const [latestAssessment, setLatestAssessment] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAdmin() {
      try {
        const [sumRes, docsRes, asmRes] = await Promise.all([
          api.getAnalyticsSummary(),
          api.getKnowledgeDocs(),
          api.getLatestAssessment()
        ]);
        setSummary(sumRes);
        setDocsCount(docsRes.length);
        setLatestAssessment(asmRes);
      } catch (e) {
        console.error(e);
      }
    }
    loadAdmin();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100/80 text-teal-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Campus Administration Console
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Director-level overview of campus resource telemetry, knowledge base index, and assessments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin/knowledge-base')}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" /> Manage Knowledge Base
          </button>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
            Indexed Guidelines
          </span>
          <div className="text-3xl font-black text-slate-900">{docsCount}</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Active RAG Documents</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
            Campus Assessment
          </span>
          <div className="text-3xl font-black text-emerald-800">
            {latestAssessment?.overall_score || 66}/100
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{latestAssessment?.overall_status || 'Moderate Progress'}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
            Active Commuters
          </span>
          <div className="text-3xl font-black text-teal-800">61%</div>
          <p className="text-[11px] text-teal-700 font-medium mt-1">Sustainable modal share</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
            AI Guardrails
          </span>
          <div className="text-2xl font-black text-slate-900 flex items-center gap-1">
            100%
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Responsible AI Active</p>
        </div>
      </div>

      {/* Assessment Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
            Latest Institutional Baseline
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1.5">
            {latestAssessment?.campus_name || 'Green Campus University (Sample Campus)'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Prototype assessment evaluated across Energy, Water, Waste, Transport, and Green Buildings. Review action plan milestones to elevate score to 'Good'.
          </p>
        </div>

        <button
          onClick={() => navigate('/assessment')}
          className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 flex-shrink-0 transition-colors"
        >
          Review Assessment <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Telemetry Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/energy')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-300 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" /> Energy Telemetry
          </div>
          <div className="text-xl font-black text-slate-900">27,300 kWh</div>
          <p className="text-xs text-slate-500 mt-1">Needs attention in Block A</p>
        </div>

        <div
          onClick={() => navigate('/water')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Droplets className="w-4 h-4" /> Water Stewardship
          </div>
          <div className="text-xl font-black text-slate-900">540 kL</div>
          <p className="text-xs text-slate-500 mt-1">4 leaks logged this month</p>
        </div>

        <div
          onClick={() => navigate('/waste')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Trash2 className="w-4 h-4" /> Waste Segregation
          </div>
          <div className="text-xl font-black text-slate-900">72% Segregation</div>
          <p className="text-xs text-slate-500 mt-1">Compost unit recommended</p>
        </div>

        <div
          onClick={() => navigate('/transport')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Bike className="w-4 h-4" /> Commute Share
          </div>
          <div className="text-xl font-black text-slate-900">61% Active / Shared</div>
          <p className="text-xs text-slate-500 mt-1">Cycle racks proposed</p>
        </div>
      </div>
    </div>
  );
};
