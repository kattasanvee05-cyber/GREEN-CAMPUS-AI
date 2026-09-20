import React, { useState, useEffect } from 'react';
import { Droplets, Plus, AlertCircle, Wrench, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { WaterRecord } from '../types';
import { SimpleLineChart, SimpleBarChart } from '../components/ChartComponents';

export const WaterAnalytics: React.FC = () => {
  const [records, setRecords] = useState<WaterRecord[]>([]);
  const [observation, setObservation] = useState('');
  const [conservationActions, setConservationActions] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    month: 'Apr',
    water_usage_kl: 570,
    leak_reports_count: 5,
    action_taken: 'Inspected Block B washrooms'
  });

  const loadData = async () => {
    try {
      const res = await api.getWaterData();
      setRecords(res.records);
      setObservation(res.ai_observation);
      setConservationActions(res.conservation_actions);
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
      await api.addWaterEntry(formData);
      setShowAddModal(false);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const chartData = records.map((r) => ({
    label: r.month,
    value: r.water_usage_kl
  }));

  const leakData = records.map((r) => ({
    label: r.month,
    value: r.leak_reports_count
  }));

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100/80 text-blue-800">
              <Droplets className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Campus Water Stewardship
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track freshwater withdrawal, student hostel plumbing leaks, and greywater recycling
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Demo / Estimated
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Log Water Record
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Monthly Consumption (kL / month)
            </h3>
            <span className="text-[11px] text-slate-400">Total Campus Draw</span>
          </div>
          <SimpleLineChart data={chartData} color="#0284c7" height={190} unit="kL" />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Reported Hostel Tap Leaks
            </h3>
            <span className="text-[11px] text-slate-400">Incidents logged</span>
          </div>
          <SimpleBarChart data={leakData} color="#0f766e" height={190} />
        </div>
      </div>

      {/* AI Observations Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800">
          <AlertCircle className="w-4 h-4 text-blue-700" />
          <span>AI Observation & Conservation Diagnostics</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
          {observation}
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Targeted Water Stewardship Actions
          </h4>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {conservationActions.map((act, i) => (
              <div key={i} className="p-3 rounded-xl bg-blue-50/40 border border-blue-100 text-xs text-blue-950 font-medium">
                • {act}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 font-bold text-xs text-slate-700 uppercase tracking-wider">
          Water Telemetry History
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 font-semibold">Month</th>
                <th className="px-6 py-3 font-semibold">Water Usage (kL)</th>
                <th className="px-6 py-3 font-semibold">Leak Tickets</th>
                <th className="px-6 py-3 font-semibold">Maintenance Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-3 font-bold text-slate-900">{r.month}</td>
                  <td className="px-6 py-3 font-mono font-medium text-blue-700">{r.water_usage_kl} kL</td>
                  <td className="px-6 py-3 text-slate-800 font-semibold">{r.leak_reports_count} leaks logged</td>
                  <td className="px-6 py-3 text-slate-600">{r.action_taken || 'Routine inspection'}</td>
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
            <h3 className="text-sm font-bold text-slate-900 mb-4">Log Water Reading</h3>
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
                <label className="block font-semibold text-slate-700 mb-1">Water Withdrawal (kL)</label>
                <input
                  type="number"
                  value={formData.water_usage_kl}
                  onChange={(e) => setFormData({ ...formData, water_usage_kl: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Leak Reports Count</label>
                <input
                  type="number"
                  value={formData.leak_reports_count}
                  onChange={(e) => setFormData({ ...formData, leak_reports_count: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Action / Resolution Taken</label>
                <input
                  type="text"
                  value={formData.action_taken}
                  onChange={(e) => setFormData({ ...formData, action_taken: e.target.value })}
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
