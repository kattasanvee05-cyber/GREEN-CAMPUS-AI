import React from 'react';
import { Leaf, Award, HelpCircle, Target, Users, Sparkles, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100/80 text-emerald-800">
            <Leaf className="w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            About GREEN CAMPUS AI
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Project mission, collaborative partners, academic context, and Sustainable Development Goal grounding
        </p>
      </div>

      {/* Internship & Project Credential Card */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold mb-4">
          <Award className="w-3.5 h-3.5" /> Virtual Internship Initiative
        </div>
        <h2 className="text-xl sm:text-2xl font-black">
          1M1B AI for Sustainability Virtual Internship
        </h2>
        <p className="mt-1 text-xs text-emerald-200 font-semibold">
          In collaboration with IBM SkillsBuild and AICTE
        </p>

        <div className="mt-6 pt-6 border-t border-white/15 grid sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-emerald-300 font-semibold block">Student Researcher:</span>
            <span className="text-white font-bold text-sm">Katta Sanvee</span>
          </div>
          <div>
            <span className="text-emerald-300 font-semibold block">Internship Identifier:</span>
            <span className="font-mono text-emerald-100 font-semibold">INTERNSHIP_17828984086a44dee80acf6</span>
          </div>
        </div>
      </div>

      {/* Problem & Solution Narrative */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Problem Statement
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Educational institutions consume substantial resources across energy, water, transportation, and waste management. Students and campus decision-makers frequently lack an accessible, trustworthy mechanism to connect fragmented sustainability information and available campus data with practical, prioritized actions.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Proposed Solution
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            GreenCampus AI is an AI-powered sustainability decision-support platform combining IBM Granite, Retrieval-Augmented Generation (RAG), analytics, and agent-style workflows to provide grounded sustainability insights and actionable roadmaps.
          </p>
        </div>
      </div>

      {/* SDG Alignment */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Sustainable Development Goal Alignment
        </h3>
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
          <div className="flex items-center justify-between mb-1">
            <span className="font-black text-sm text-emerald-950">
              Primary: SDG 11 — Sustainable Cities and Communities
            </span>
            <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-bold px-2 py-0.5 rounded">
              Core Anchor
            </span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Academic campuses serve as micro-cities. By fostering active mobility, energy efficiency, safe public spaces, and low-waste campuses, GreenCampus AI equips students to model sustainable urban living.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="font-bold text-slate-800 block mb-0.5">SDG 6 — Clean Water and Sanitation</span>
            <span className="text-slate-500 text-[11px]">Hostel tap aerators, leak mitigation, and rainwater harvesting.</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="font-bold text-slate-800 block mb-0.5">SDG 7 — Affordable and Clean Energy</span>
            <span className="text-slate-500 text-[11px]">LED lighting conversions, AC setpoint baselines, and solar PV feasibility.</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="font-bold text-slate-800 block mb-0.5">SDG 12 — Responsible Consumption</span>
            <span className="text-slate-500 text-[11px]">Three-bin source segregation, food composting, and e-waste management.</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="font-bold text-slate-800 block mb-0.5">SDG 13 — Climate Action</span>
            <span className="text-slate-500 text-[11px]">Active commuter mobility, modal shift incentives, and climate literacy.</span>
          </div>
        </div>
      </div>

      {/* Future Scope */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">
          Future Research & Engineering Scope
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span>Real-time IoT sub-metering sensors across departmental blocks</span>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span>Smart water flow meters with automated nocturnal leak detection</span>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span>Campus Digital Twin simulation for thermal airflow modeling</span>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span>Multilingual vernacular AI advisor support for diverse campuses</span>
          </div>
        </div>
      </div>
    </div>
  );
};
