import React, { useState, useEffect } from 'react';
import { Bike, Footprints, Bus, Car, AlertCircle, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { TransportMode } from '../types';
import { SimpleDonutChart } from '../components/ChartComponents';

export const TransportAnalytics: React.FC = () => {
  const [modes, setModes] = useState<TransportMode[]>([]);
  const [sustainableShare, setSustainableShare] = useState(61);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [userCommute, setUserCommute] = useState('Bicycle');
  const [loggedMessage, setLoggedMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getTransportData();
        setModes(res.modes);
        setSustainableShare(res.sustainable_share_pct);
        setRecommendations(res.ai_recommendations);
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, []);

  const donutItems = modes.map((m) => {
    let color = '#64748b';
    if (m.mode === 'Walking') color = '#15803d';
    if (m.mode === 'Bicycle') color = '#0f766e';
    if (m.mode.includes('Transit')) color = '#0284c7';
    if (m.mode.includes('Shuttle')) color = '#0d9488';
    if (m.mode.includes('Two-Wheeler')) color = '#f59e0b';
    if (m.mode === 'Private Car') color = '#ef4444';
    return {
      label: m.mode,
      percentage: m.percentage,
      color
    };
  });

  const handleLogCommute = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedMessage(`Logged today's commute: ${userCommute}. Thank you for contributing to campus mobility intelligence!`);
    setTimeout(() => setLoggedMessage(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100/80 text-teal-800">
              <Bike className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Campus Commute & Active Mobility
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Examine commuter transit distributions, active pedestrian/cycling shares, and shuttle connectivity
          </p>
        </div>

        <span className="self-start sm:self-center text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
          Demo / Estimated
        </span>
      </div>

      {/* Sustainable Share Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 rounded-3xl p-6 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-teal-200 uppercase tracking-wider block">
            Modal Split Insight
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold mt-1">
            {sustainableShare}% of Campus Commuters Use Sustainable Transit
          </h2>
          <p className="text-xs text-teal-100/80 mt-1 max-w-xl">
            Walking, cycling, college shuttles, and regional public transit compose the majority of daily campus trips.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center flex-shrink-0">
          <span className="text-xs text-teal-200 block">Active + Shared Share</span>
          <span className="text-3xl font-black">{sustainableShare}%</span>
        </div>
      </div>

      {/* Chart & Quick Logger Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Donut Distribution */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Commute Mode Distribution (%)
            </h3>
            <span className="text-[11px] text-slate-400">Sample survey</span>
          </div>
          <SimpleDonutChart items={donutItems} size={180} />
        </div>

        {/* Quick Log My Commute Form */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              Log Today's Campus Commute
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Help your campus eco-committee refine sustainable transit planning by logging your primary commute method.
            </p>

            {loggedMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                {loggedMessage}
              </div>
            )}

            <form onSubmit={handleLogCommute} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Mode
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Walking', 'Bicycle', 'Public Transit / Metro', 'College Shuttle Bus', 'Motorized Two-Wheeler', 'Private Car'].map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setUserCommute(mode)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        userCommute === mode
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Submit Today's Commute Log
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800">
          <AlertCircle className="w-4 h-4 text-teal-700" />
          <span>AI Active Mobility Recommendations</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-teal-50/40 border border-teal-100 text-xs text-teal-950 font-medium leading-relaxed">
              • {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
