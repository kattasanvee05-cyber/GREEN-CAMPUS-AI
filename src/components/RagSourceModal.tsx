import React from 'react';
import { X, BookOpen, ExternalLink, ShieldCheck, Tag } from 'lucide-react';
import { RagSource } from '../types';

interface RagSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sources: RagSource[];
  activeDomain?: string;
}

export const RagSourceModal: React.FC<RagSourceModalProps> = ({
  isOpen,
  onClose,
  sources,
  activeDomain
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-800">
                Knowledge Used (RAG Sources)
              </h3>
              <p className="text-xs text-slate-500">
                Institutional documents retrieved to ground this AI response
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-3.5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-800 leading-relaxed">
              <span className="font-semibold">Grounding & Verifiability:</span> These documents were retrieved from the GreenCampus AI curated knowledge base. IBM Granite / Demo AI synthesizes responses strictly using this grounded context, preventing hallucinations.
            </div>
          </div>

          {sources.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No specific institutional sources retrieved for this query. Response is based on generalized sustainability heuristics.
            </div>
          ) : (
            <div className="space-y-3.5">
              {sources.map((s, idx) => (
                <div
                  key={s.id || idx}
                  className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-emerald-300 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100/70 text-emerald-800 mb-1.5">
                        {s.category}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-800 leading-snug">
                        {s.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded text-[11px] font-semibold flex-shrink-0">
                      <span>{Math.round(s.relevance_score * 100)}% match</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed font-mono">
                    "{s.excerpt}"
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[320px]">
                      Source: <span className="text-slate-700 font-medium">{s.source}</span>
                    </span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      Verified Document
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
