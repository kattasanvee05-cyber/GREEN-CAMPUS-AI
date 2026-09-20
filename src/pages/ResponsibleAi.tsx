import React from 'react';
import {
  ShieldAlert,
  Scale,
  Eye,
  Lock,
  Flame,
  UserCheck,
  Database,
  HelpCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const ResponsibleAi: React.FC = () => {
  const pillars = [
    {
      title: 'FAIRNESS',
      icon: Scale,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      description: 'Avoid unsupported assumptions and biased recommendations.',
      details: 'GreenCampus AI accounts for varying institutional sizes, geographical climates, and campus budgets, rather than prescribing uniform, costly solutions that disadvantage smaller colleges.'
    },
    {
      title: 'TRANSPARENCY',
      icon: Eye,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      description: 'Show relevant sources used by the RAG workflow.',
      details: 'Every AI response provides clickable citations linking directly to underlying institutional manuals (BEE, CPCB, MNRE, UNEP) and surfaces discrete 6-step agent workflow progress.'
    },
    {
      title: 'PRIVACY',
      icon: Lock,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Minimize unnecessary personal information.',
      details: 'The platform scans natural language queries to prevent collection of sensitive student identification numbers, personal contact credentials, or private facilities access tokens.'
    },
    {
      title: 'SAFETY',
      icon: Flame,
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      description: 'Avoid unsupported or potentially harmful recommendations.',
      details: 'Automated safety filters prevent advice on hazardous electrical bypasses, uncertified grid tie-ins, or unauthorized chemical disposal, directing users to licensed engineers.'
    },
    {
      title: 'HUMAN OVERSIGHT',
      icon: UserCheck,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      description: 'AI supports decision-making; it does not replace campus authorities.',
      details: 'All recommendations are decision-support suggestions designed to empower human facilities directors, faculty advisors, and student committees rather than automate binding capital commitments.'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-100/80 text-indigo-800">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Responsible AI by Design
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Ethical principles, safety guardrails, and transparency mechanisms embedded within GreenCampus AI
        </p>
      </div>

      {/* Human Oversight Banner */}
      <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-4">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-950 leading-relaxed">
          <span className="font-bold text-sm block mb-0.5">Core Operational Philosophy</span>
          AI-generated recommendations should always be reviewed by appropriate campus personnel before implementation. GreenCampus AI exists to assist human decision-makers, not replace institutional engineering judgment.
        </div>
      </div>

      {/* 5 Pillars */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 border ${p.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                  {p.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-800 mt-1">
                  {p.description}
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {p.details}
                </p>
              </div>
            </div>
          );
        })}

        {/* Grounding Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border text-teal-700 bg-teal-50 border-teal-200">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
              GROUNDING & CITATIONS
            </h3>
            <p className="text-xs font-semibold text-teal-800 mt-1">
              Prefer RAG-supported answers.
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Synthesized guidance is grounded directly in curated environmental guidelines. The platform does not claim custom model pre-training or hallucinate fictitious academic citations.
            </p>
          </div>
        </div>
      </div>

      {/* Uncertainty Mandate Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>Uncertainty Communication Protocol</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          If the institutional knowledge base does not contain sufficient verified information to answer a user's question, the system strictly adheres to the uncertainty protocol:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 font-mono text-xs text-slate-800 italic">
          "I don't have enough verified information in the current knowledge base to answer this confidently. Please consult with authorized campus facilities personnel before taking action."
        </div>
      </div>
    </div>
  );
};
