import React, { useState } from 'react';
import { User as UserIcon, Bell, Sliders, Shield, Save, Check } from 'lucide-react';
import { User } from '../types';

interface ProfileSettingsProps {
  user: User;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState('0.70');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
            <UserIcon className="w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Profile & Platform Settings
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Manage your account profile, notification preferences, and AI decision-support thresholds
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" /> Preferences successfully saved.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 text-xs">
        {/* Profile Info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Account Details
          </h3>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3.5 py-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 font-medium cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assigned Role</label>
            <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold uppercase tracking-wider text-[10px]">
              {user.role} Role
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Notifications & AI Parameters
          </h3>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="rounded text-emerald-700 focus:ring-emerald-600 w-4 h-4"
            />
            <div>
              <span className="font-semibold text-slate-800 block">Campus Sustainability Notifications</span>
              <span className="text-slate-500 text-[11px]">Receive updates when new action items or assessment results are generated</span>
            </div>
          </label>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              AI Grounding Confidence Threshold
            </label>
            <select
              value={aiConfidenceThreshold}
              onChange={(e) => setAiConfidenceThreshold(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value="0.50">Standard (50% evidence density)</option>
              <option value="0.70">Recommended (70% evidence density)</option>
              <option value="0.85">Strict (85% high evidence density)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" /> Save Preferences
        </button>
      </form>
    </div>
  );
};
