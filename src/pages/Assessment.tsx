import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  Zap,
  Droplets,
  Trash2,
  Bike,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Award,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { AssessmentResult } from '../types';

export const Assessment: React.FC = () => {
  const [formData, setFormData] = useState({
    campus_name: 'Green Campus University (Sample Campus)',
    electricity_use_level: 'moderate',
    has_solar_pv: false,
    has_led_lighting: true,
    ac_temperature_policy: true,
    energy_efficient_equipment: true,

    water_consumption_level: 'moderate',
    leak_frequency: 'occasional',
    has_rainwater_harvesting: true,
    has_greywater_reuse: false,

    waste_segregation_implemented: true,
    has_organic_composting: false,
    has_ewaste_protocol: true,
    single_use_plastic_ban: true,

    cycling_infrastructure: true,
    public_transit_connectivity: 'moderate',
    campus_ev_shuttle: false,
    pedestrian_friendly_walkways: true,

    daylight_utilization: 'moderate',
    natural_ventilation: true,
    green_space_coverage_pct: 35
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    async function loadLatest() {
      try {
        const res = await api.getLatestAssessment();
        setResult(res);
      } catch (e) {
        console.error('Failed to load initial assessment:', e);
      }
    }
    loadLatest();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.evaluateCampus(formData);
      setResult(res);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error('Assessment failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'Trash2':
        return <Trash2 className="w-5 h-5 text-emerald-600" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-teal-600" />;
      default:
        return <Building2 className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-100/80 text-teal-800">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Campus Sustainability Assessment
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Evaluate sample institutional parameters to generate a baseline Prototype Sustainability Profile and prioritized action roadmap.
        </p>
      </div>

      {/* Prominent Educational Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">Educational Prototype Notice:</span> This assessment is an educational prototype and decision-support simulator. It should not be interpreted as an official ISO 14001, LEED, or NAAC green certification.
        </div>
      </div>

      {/* Assessment Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
            Campus Name
          </label>
          <input
            type="text"
            value={formData.campus_name}
            onChange={(e) => setFormData({ ...formData, campus_name: e.target.value })}
            className="w-full sm:w-80 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 text-slate-800 font-medium"
          />
        </div>

        {/* 5 Assessment Domains */}
        <div className="grid md:grid-cols-2 gap-6 pt-2">
          {/* Energy Domain */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Energy & Lighting
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_led_lighting}
                  onChange={(e) => setFormData({ ...formData, has_led_lighting: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                LED fixtures deployed in major lecture halls & labs
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_solar_pv}
                  onChange={(e) => setFormData({ ...formData, has_solar_pv: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                Rooftop Solar PV installed on campus blocks
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ac_temperature_policy}
                  onChange={(e) => setFormData({ ...formData, ac_temperature_policy: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                Institutional AC thermostat policy (24°C–26°C baseline)
              </label>
            </div>
          </div>

          {/* Water Domain */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
              <Droplets className="w-4 h-4" /> Water Management
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_rainwater_harvesting}
                  onChange={(e) => setFormData({ ...formData, has_rainwater_harvesting: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                Rooftop rainwater harvesting recharge shafts
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_greywater_reuse}
                  onChange={(e) => setFormData({ ...formData, has_greywater_reuse: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                Decentralized greywater recycling for gardens
              </label>
              <div className="pt-1">
                <span className="text-slate-500 block mb-1">Hostel Plumbing Leak Frequency:</span>
                <select
                  value={formData.leak_frequency}
                  onChange={(e) => setFormData({ ...formData, leak_frequency: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                >
                  <option value="rare">Rare (Routine inspections)</option>
                  <option value="occasional">Occasional (Repaired in 48 hrs)</option>
                  <option value="frequent">Frequent (Persistent tap dripping)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Waste Domain */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <Trash2 className="w-4 h-4" /> Waste & Circularity
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.waste_segregation_implemented}
                  onChange={(e) => setFormData({ ...formData, waste_segregation_implemented: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                3-Bin color-coded segregation (Wet, Dry, Hazardous)
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_organic_composting}
                  onChange={(e) => setFormData({ ...formData, has_organic_composting: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                On-site aerobic composting for mess hall food scraps
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_ewaste_protocol}
                  onChange={(e) => setFormData({ ...formData, has_ewaste_protocol: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                Authorized computer & electronics e-waste recycling
              </label>
            </div>
          </div>

          {/* Transportation Domain */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <Bike className="w-4 h-4" /> Commute & Active Mobility
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.cycling_infrastructure}
                  onChange={(e) => setFormData({ ...formData, cycling_infrastructure: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                Designated bicycle paths & covered bicycle racks
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.pedestrian_friendly_walkways}
                  onChange={(e) => setFormData({ ...formData, pedestrian_friendly_walkways: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                Shaded, car-free internal pedestrian zones
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.campus_ev_shuttle}
                  onChange={(e) => setFormData({ ...formData, campus_ev_shuttle: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                Electric campus shuttles / EV charging points
              </label>
            </div>
          </div>
        </div>

        {/* Buildings & Green Spaces */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> Green Buildings & Campus Canopy
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Classroom Natural Daylighting:</span>
              <select
                value={formData.daylight_utilization}
                onChange={(e) => setFormData({ ...formData, daylight_utilization: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
              >
                <option value="high">High (Extensive windows, North-South orientation)</option>
                <option value="moderate">Moderate (Standard window-to-wall ratio)</option>
                <option value="low">Low (Heavy reliance on daytime lighting)</option>
              </select>
            </div>
            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Campus Tree Canopy & Green Space:</span>
                <span className="font-bold text-emerald-800">{formData.green_space_coverage_pct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={formData.green_space_coverage_pct}
                onChange={(e) => setFormData({ ...formData, green_space_coverage_pct: parseInt(e.target.value) })}
                className="w-full accent-emerald-700"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-950/10 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Generate Campus Sustainability Profile
            </>
          )}
        </button>
      </form>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Overall Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                  Prototype Campus Profile
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {result.campus_name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluated on {result.date_assessed}
                </p>
              </div>

              <div className="flex items-center gap-4 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80">
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-900 leading-none">
                    {result.overall_score} <span className="text-sm font-normal text-slate-500">/ 100</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-800 mt-1">
                    {result.overall_status}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-inner">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-6">
              {result.categories.map((cat) => (
                <div
                  key={cat.category}
                  className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">{cat.category}</span>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    {cat.score}%
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {cat.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Recommended Action Plan */}
          {result.recommended_actions?.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">
                  AI-Recommended Action Roadmap
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {result.recommended_actions.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                          {act.urgency}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{act.sdg_target}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {act.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        {act.why}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1">
                      <div className="text-slate-700 font-medium">
                        First Step: <span className="font-normal text-slate-600">{act.first_step}</span>
                      </div>
                      <div className="text-slate-400">
                        Lead: <span className="text-slate-600 font-medium">{act.responsible_stakeholder}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
