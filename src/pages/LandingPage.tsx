import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Leaf,
  Bot,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Droplets,
  Trash2,
  Bike,
  Building2,
  Database,
  Sliders,
  Scale,
  Sparkles,
  Info
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 text-center font-medium border-b border-emerald-800">
        <span>1M1B AI for Sustainability Virtual Internship</span>
        <span className="mx-2 opacity-60">•</span>
        <span>In collaboration with IBM SkillsBuild & AICTE</span>
        <span className="mx-2 opacity-60">•</span>
        <span className="font-semibold text-white">Student: Katta Sanvee</span>
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
            <Leaf className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              GREEN CAMPUS AI
            </span>
            <span className="block text-[11px] text-slate-500 font-medium">
              Decision Support Platform
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#challenge" className="hover:text-emerald-800 transition-colors">The Challenge</a>
          <a href="#solution" className="hover:text-emerald-800 transition-colors">Solution</a>
          <a href="#sdg" className="hover:text-emerald-800 transition-colors">SDG 11</a>
          <a href="#features" className="hover:text-emerald-800 transition-colors">Features</a>
          <a href="#responsible-ai" className="hover:text-emerald-800 transition-colors">Responsible AI</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all"
          >
            Launch Prototype
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 text-emerald-900 text-xs font-semibold mb-6 border border-emerald-200/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Primary Alignment: UN Sustainable Development Goal 11</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Build a Smarter, Greener Campus with{' '}
          <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
            Responsible AI
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          GreenCampus AI combines trusted sustainability knowledge, AI-powered analysis and practical recommendations to help educational institutions make more informed environmental decisions.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md shadow-emerald-950/15 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            Explore Dashboard <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/ai-advisor')}
            className="px-6 py-3 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs flex items-center gap-2 transition-all hover:border-slate-400"
          >
            <Bot className="w-4 h-4 text-emerald-700" /> Try AI Advisor
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs mb-1">
              <Database className="w-4 h-4" /> Grounded RAG
            </div>
            <div className="text-xs text-slate-600">
              Retrieves verified institutional guidelines before answer generation.
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs mb-1">
              <Bot className="w-4 h-4" /> IBM Granite Layer
            </div>
            <div className="text-xs text-slate-600">
              Enterprise AI service abstraction with transparent Demo AI mode fallback.
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-amber-700 font-semibold text-xs mb-1">
              <Sliders className="w-4 h-4" /> Agentic Workflow
            </div>
            <div className="text-xs text-slate-600">
              Observable 6-step reasoning from natural question to prioritized action plan.
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs mb-1">
              <Scale className="w-4 h-4" /> Responsible AI
            </div>
            <div className="text-xs text-slate-600">
              Safety guardrails, uncertainty indicators, and human oversight by design.
            </div>
          </div>
        </div>
      </section>

      {/* The Campus Sustainability Challenge */}
      <section id="challenge" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              The Reality of Campus Operations
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              The Campus Sustainability Challenge
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Educational institutions function as micro-cities, consuming massive resources. But resource consumption is not the root barrier.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mb-10">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">ENERGY</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Phantom computer lab loads, continuous AC chillers, and unmetered lighting fixtures.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">WATER</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Hostel shower runoff, slow leak turnarounds, and untracked tank overflows.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">WASTE</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Cafeteria food waste in landfills, mixed paper packaging, and obsolete computing e-waste.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-3">
                <Bike className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">TRANSPORTATION</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Single-occupancy motorized commuter trips and internal campus vehicle congestion.
              </p>
            </div>
          </div>

          {/* Central Problem Callout */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto text-center">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">
              The Underlying Core Problem
            </span>
            <blockquote className="text-base sm:text-lg font-semibold text-slate-900 italic max-w-2xl mx-auto">
              "Students and campus decision-makers may not have an accessible way to connect sustainability information and available data with practical actions."
            </blockquote>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-600">
              <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">Campus Baseline</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">Energy / Water / Waste / Transport</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">Data & Guidelines</span>
              <span>→</span>
              <span className="px-3 py-1 bg-emerald-800 text-white rounded-lg">Actionable AI Bridge</span>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section id="sdg" className="py-16 bg-[#f8faf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Sustainable Development Goals
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Why SDG 11 — Sustainable Cities & Communities?
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              GreenCampus AI supports the broader goal of making communities more sustainable by helping educational institutions understand sustainability challenges and identify practical actions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Primary SDG 11 Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold mb-4">
                  Primary SDG Anchor
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  SDG 11: Sustainable Cities & Communities
                </h3>
                <p className="mt-3 text-sm text-emerald-100/90 leading-relaxed max-w-xl">
                  Colleges and universities act as micro-cities. By fostering active mobility, energy efficiency, safe public spaces, and low-waste campuses, GreenCampus AI equips students to model sustainable urban living.
                </p>
                <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-emerald-300 font-semibold block">Target 11.6</span>
                    <span className="text-emerald-100/80">Reduce per capita environmental impact via waste management & clean air.</span>
                  </div>
                  <div>
                    <span className="text-emerald-300 font-semibold block">Target 11.7</span>
                    <span className="text-emerald-100/80">Universal access to safe, inclusive, accessible green & public spaces.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary SDGs */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-blue-700 flex items-center justify-between">
                  <span>SDG 6 — Clean Water & Sanitation</span>
                  <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-semibold">Secondary</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Hostel tap aerators, leak tracking, and greywater reuse.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-amber-700 flex items-center justify-between">
                  <span>SDG 7 — Affordable & Clean Energy</span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-semibold">Secondary</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">LED lighting conversions, AC setpoints (24°C–26°C), rooftop solar.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-emerald-700 flex items-center justify-between">
                  <span>SDG 12 — Responsible Consumption</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-semibold">Secondary</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">3-bin source segregation, cafeteria food composting, e-waste drives.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-teal-700 flex items-center justify-between">
                  <span>SDG 13 — Climate Action</span>
                  <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-semibold">Secondary</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Active transit, bicycle parking, and campus green nudges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              User Personas
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Who Is GreenCampus AI For?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all">
              <h4 className="text-sm font-bold text-slate-900">Students</h4>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">Understand sustainable choices</p>
              <p className="text-xs text-slate-500 mt-2">
                Report hostel leaks, understand individual commute footprints, and get grounded AI advice on reducing electricity and waste.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all">
              <h4 className="text-sm font-bold text-slate-900">Faculty & Mentors</h4>
              <p className="text-xs text-teal-700 font-semibold mt-0.5">Promote sustainability awareness</p>
              <p className="text-xs text-slate-500 mt-2">
                Integrate real campus telemetry and sustainability case studies into coursework, research projects, and student eco-initiatives.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all">
              <h4 className="text-sm font-bold text-slate-900">Campus Administrators</h4>
              <p className="text-xs text-amber-700 font-semibold mt-0.5">Understand resource-use patterns</p>
              <p className="text-xs text-slate-500 mt-2">
                Identify utility outliers across blocks, prioritize capital interventions, and track institutional progress over time.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all">
              <h4 className="text-sm font-bold text-slate-900">Sustainability Teams</h4>
              <p className="text-xs text-indigo-700 font-semibold mt-0.5">Track actions & access knowledge</p>
              <p className="text-xs text-slate-500 mt-2">
                Manage curated compliance documentation, track Quick-Win and Long-Term tasks, and publish transparent campus profiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features (6 cards) */}
      <section id="features" className="py-16 bg-[#f8faf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Platform Modules
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              One Platform, Multiple Sustainability Needs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate('/ai-advisor')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. AI Sustainability Advisor</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Ask questions and receive grounded sustainability guidance tailored to academic institutions.
              </p>
            </div>

            <div
              onClick={() => navigate('/admin/knowledge-base')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. RAG Knowledge Base</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Retrieve verified sustainability guidelines before generating responses, preventing hallucinations.
              </p>
            </div>

            <div
              onClick={() => navigate('/assessment')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Campus Sustainability Assessment</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Evaluate sample campus conditions across energy, water, waste, transport, and green buildings.
              </p>
            </div>

            <div
              onClick={() => navigate('/energy')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">4. Resource Analytics</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Visualize energy, water, waste and transportation telemetry with AI observations separating correlation from causation.
              </p>
            </div>

            <div
              onClick={() => navigate('/action-plan')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">5. AI Action Plan</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Convert observations into practical Quick-Win, Medium-Term, and Long-Term actions with assigned stakeholders.
              </p>
            </div>

            <div
              onClick={() => navigate('/impact')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">6. Impact Dashboard</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Track sustainability milestones and clearly labeled prototype/estimated indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible AI by Design */}
      <section id="responsible-ai" className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Ethical AI Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Responsible AI by Design
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              GreenCampus AI embeds ethical principles directly into its decision-support workflows.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-900 block mb-1">FAIRNESS</span>
              <p className="text-xs text-slate-500">
                Avoids unsupported assumptions and biased recommendations across different campus sizes.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-900 block mb-1">TRANSPARENCY</span>
              <p className="text-xs text-slate-500">
                Displays verified institutional sources used by the RAG workflow with clickable citations.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-900 block mb-1">PRIVACY</span>
              <p className="text-xs text-slate-500">
                Scans and minimizes unnecessary personal information or identifiable credentials.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-900 block mb-1">SAFETY</span>
              <p className="text-xs text-slate-500">
                Blocks guidance on hazardous electrical tampering or unsafe chemical disposal.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-900 block mb-1">HUMAN OVERSIGHT</span>
              <p className="text-xs text-slate-500">
                AI supports decision-making; recommendations must be vetted by campus authorities.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 max-w-3xl mx-auto">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">Uncertainty Mandate:</span> If the knowledge base does not contain sufficient verified information, the system explicitly communicates uncertainty rather than fabricating an answer.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                  <Leaf className="w-4 h-4 text-emerald-200" />
                </div>
                <span className="text-base font-extrabold text-white tracking-tight">
                  GREEN CAMPUS AI
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 max-w-md">
                AI-Powered Sustainability Management & Decision Support Platform for Educational Institutions.
              </p>
            </div>

            <div className="text-xs space-y-1 text-slate-300">
              <div className="font-semibold text-white">1M1B AI for Sustainability Virtual Internship</div>
              <div>In collaboration with IBM SkillsBuild & AICTE</div>
              <div>Student: <span className="text-emerald-400 font-semibold">Katta Sanvee</span></div>
              <div className="font-mono text-[11px] text-slate-400">ID: INTERNSHIP_17828984086a44dee80acf6</div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              Primary Alignment: <span className="text-slate-300 font-medium">SDG 11 — Sustainable Cities and Communities</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/responsible-ai')} className="hover:text-white transition-colors">
                Responsible AI
              </button>
              <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                About Project
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
