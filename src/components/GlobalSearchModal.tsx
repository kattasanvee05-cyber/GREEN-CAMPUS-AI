import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, CheckCircle, ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { GlobalSearchResult } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    knowledge_base: GlobalSearchResult[];
    actions: GlobalSearchResult[];
    topics: GlobalSearchResult[];
  }>({ knowledge_base: [], actions: [], topics: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults({ knowledge_base: [], actions: [], topics: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.globalSearch(query);
        setResults(res.results);
      } catch (e) {
        console.error('Search failed:', e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search sustainability guides, actions, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400 text-slate-800"
          />
          {loading && <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 overflow-y-auto space-y-4">
          {!query.trim() ? (
            <div className="text-center py-10 text-xs text-slate-400">
              Type keywords like "solar", "energy", "hostel", "compost", "water", or "SDG" to search across the platform.
            </div>
          ) : results.knowledge_base.length === 0 && results.actions.length === 0 && results.topics.length === 0 && !loading ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No matching resources found for "{query}". Try another sustainability keyword.
            </div>
          ) : (
            <>
              {results.topics.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                    Sustainability Topics
                  </h4>
                  <div className="space-y-1">
                    {results.topics.map((t, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (t.path) navigate(t.path);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-semibold text-slate-800">{t.title}</span>
                          <span className="text-[10px] text-slate-400">{t.snippet}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.knowledge_base.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" /> Knowledge Base Documents
                  </h4>
                  <div className="space-y-1.5">
                    {results.knowledge_base.map((k, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          navigate('/ai-advisor');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-800">{k.title}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{k.category}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{k.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.actions.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3" /> Action Plan Items
                  </h4>
                  <div className="space-y-1.5">
                    {results.actions.map((a, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          navigate('/action-plan');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-800">{a.title}</div>
                          <div className="text-[10px] text-slate-500">{a.snippet}</div>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                          {a.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
