import React, { useState, useEffect } from 'react';
import { Trash2, Plus, AlertCircle, Recycle, Apple, Shield } from 'lucide-react';
import { api } from '../services/api';
import { WasteRecord } from '../types';
import { SimpleBarChart, SimpleDonutChart } from '../components/ChartComponents';

export const WasteAnalytics: React.FC = () => {
  const [records, setRecords] = useState<WasteRecord[]>([]);
  const [observation, setObservation] = useState('');
  const [insights, setInsights] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    month: 'Apr',
    organic_kg: 1450,
    recyclable_kg: 860,
    hazardous_kg: 35,
    landfill_kg: 710
  });

  const loadData = async () => {
    try {
      const res = await api.getWasteData();
      setRecords(res.records);
      setObservation(res.ai_observation);
      setInsights(res.ai_insights);
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
      await api.addWasteEntry(formData);
      setShowAddModal(false);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const latestRecord = records[records.length - 1] || formData;
  const totalKg = latestRecord.organic_kg + latestRecord.recyclable_kg + latestRecord.hazardous_kg + latestRecord.landfill_kg;

  const distributionItems = [
    { label: 'Organic / Wet Waste', percentage: Math.round((latestRecord.organic_kg / (totalKg || 1)) * 100), color: '#16a34a' },
    { label: 'Recyclables (Paper/Plastic)', percentage: Math.round((latestRecord.recyclable_kg / (totalKg || 1)) * 100), color: '#0284c7' },
    { label: 'General Landfill Trash', percentage: Math.round((latestRecord.landfill_kg / (totalKg || 1)) * 100), color: '#64748b' },
    { label: 'Hazardous / E-Waste', percentage: Math.round((latestRecord.hazardous_kg / (totalKg || 1)) * 100), color: '#dc2626' }
  ];

  const barData = records.map((r) => ({
    label: r.month,
    value: Math.round(r.recyclable_kg)
  }));

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100/80 text-emerald-800">
              <Trash2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Campus Waste & Circularity
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Analyze 3-bin source segregation, cafeteria food scrap composting, and e-waste disposal
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Demo / Estimated
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Log Waste Reading
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Latest Month Waste Breakdown
            </h3>
            <span className="text-[11px] text-slate-400">Total: {totalKg.toLocaleString()} kg</span>
          </div>
          <SimpleDonutChart items={distributionItems} size={180} />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Recyclables Diverted (kg)
            </h3>
            <span className="text-[11px] text-slate-400">Monthly recovery rate</span>
          </div>
          <SimpleBarChart data={barData} color="#059669" height={190} />
        </div>
      </div>

      {/* AI Insights Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <AlertCircle className="w-4 h-4 text-emerald-700" />
          <span>AI Waste Management Insights</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
          {observation}
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Priority Interventions
          </h4>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {insights.map((ins, i) => (
              <div key={i} className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs text-emerald-950 font-medium">
                • {ins}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 font-bold text-xs text-slate-700 uppercase tracking-wider">
          Waste Auditing Records (kg)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 font-semibold">Month</th>
                <th className="px-6 py-3 font-semibold text-emerald-700">Organic (kg)</th>
                <th className="px-6 py-3 font-semibold text-blue-700">Recyclables (kg)</th>
                <th className="px-6 py-3 font-semibold text-red-600">Hazardous (kg)</th>
                <th className="px-6 py-3 font-semibold text-slate-600">Landfill (kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-3 font-bold text-slate-900">{r.month}</td>
                  <td className="px-6 py-3 font-mono font-medium text-emerald-700">{r.organic_kg}</td>
                  <td className="px-6 py-3 font-mono font-medium text-blue-700">{r.recyclable_kg}</td>
                  <td className="px-6 py-3 font-mono font-medium text-red-600">{r.hazardous_kg}</td>
                  <td className="px-6 py-3 font-mono font-medium text-slate-500">{r.landfill_kg}</td>
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
            <h3 className="text-sm font-bold text-slate-900 mb-4">Log Waste Audit</h3>
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
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Organic (kg)</label>
                  <input
                    type="number"
                    value={formData.organic_kg}
                    onChange={(e) => setFormData({ ...formData, organic_kg: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Recyclable (kg)</label>
                  <input
                    type="number"
                    value={formData.recyclable_kg}
                    onChange={(e) => setFormData({ ...formData, recyclable_kg: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hazardous / E-Waste (kg)</label>
                  <input
                    type="number"
                    value={formData.hazardous_kg}
                    onChange={(e) => setFormData({ ...formData, hazardous_kg: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Landfill Trash (kg)</label>
                  <input
                    type="number"
                    value={formData.landfill_kg}
                    onChange={(e) => setFormData({ ...formData, landfill_kg: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
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
                  Save Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
