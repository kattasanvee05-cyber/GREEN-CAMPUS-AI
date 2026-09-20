import React, { useState, useEffect } from 'react';
import { Zap, Plus, AlertCircle, TrendingDown, Building, Users, Calendar } from 'lucide-react';
import { api } from '../services/api';
import { EnergyRecord } from '../types';
import { SimpleLineChart, SimpleBarChart } from '../components/ChartComponents';

export const EnergyAnalytics: React.FC = () => {
  const [records, setRecords] = useState<EnergyRecord[]>([]);
  const [observation, setObservation] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    month: 'Apr',
    electricity_usage_kwh: 29500,
    building: 'Academic Block A',
    occupants: 850,
    note: 'Summer session'
  });

  const loadData = async () => {
    try {
      const res = await api.getEnergyData();
      setRecords(res.records);
      setObservation(res.ai_observation);
      setRecommendations(res.key_recommendations);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addEnergyEntry(formData);
      setShowAddModal(false);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const chartData = records.map((r) => ({
    label: r.month,
    value: r.electricity_usage_kwh
  }));

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100/80 text-amber-800">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Campus Energy Telemetry
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Analyze electricity baseload, HVAC cooling trends, and block-by-block consumption patterns
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Demo / Estimated
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Log Reading
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Monthly Consumption Trend (kWh)
            </h3>
            <span className="text-[11px] text-slate-400">Academic Block A</span>
          </div>
          <SimpleLineChart data={chartData} color="#d97706" height={190} unit="kWh" />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Monthly Usage Comparison (kWh)
            </h3>
            <span className="text-[11px] text-slate-400">Bar Distribution</span>
          </div>
          <SimpleBarChart data={chartData} color="#15803d" height={190} />
        </div>
      </div>

      {/* AI Observations Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <AlertCircle className="w-4 h-4 text-emerald-700" />
          <span>AI Observation & Analysis</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
          {observation}
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Recommended Facility Interventions
          </h4>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {recommendations.map((rec, i) => (
              <div key={i} className="p-3 rounded-xl bg-amber-50/40 border border-amber-100 text-xs text-amber-950 font-medium">
                • {rec}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reading History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 font-bold text-xs text-slate-700 uppercase tracking-wider">
          Logged Consumption Records
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 font-semibold">Month</th>
                <th className="px-6 py-3 font-semibold">Electricity (kWh)</th>
                <th className="px-6 py-3 font-semibold">Building Block</th>
                <th className="px-6 py-3 font-semibold">Occupancy</th>
                <th className="px-6 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-3 font-bold text-slate-900">{r.month}</td>
                  <td className="px-6 py-3 font-mono font-medium text-amber-700">{r.electricity_usage_kwh.toLocaleString()}</td>
                  <td className="px-6 py-3">{r.building}</td>
                  <td className="px-6 py-3">{r.occupants} occupants</td>
                  <td className="px-6 py-3 text-slate-500 italic">{r.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Log Sample Energy Reading</h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Month</label>
                <input
                  type="text"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Electricity Usage (kWh)</label>
                <input
                  type="number"
                  value={formData.electricity_usage_kwh}
                  onChange={(e) => setFormData({ ...formData, electricity_usage_kwh: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Building</label>
                <input
                  type="text"
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Occupants</label>
                <input
                  type="number"
                  value={formData.occupants}
                  onChange={(e) => setFormData({ ...formData, occupants: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Observation Note</label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-900"
                >
                  Save Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
