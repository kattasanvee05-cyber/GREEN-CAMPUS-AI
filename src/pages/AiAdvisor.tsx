import React, { useState, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Loader2,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { api } from '../services/api';
import { AiResponse, SampleQuestion, RagSource } from '../types';
import { RagSourceModal } from '../components/RagSourceModal';

export const AiAdvisor: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [sampleQuestions, setSampleQuestions] = useState<SampleQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AiResponse | null>(null);
  const [selectedSources, setSelectedSources] = useState<RagSource[]>([]);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [providerInfo, setProviderInfo] = useState<{ name: string; is_demo_mode: boolean; model: string; status: string } | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const [qRes, sRes] = await Promise.all([
          api.getSampleQuestions(),
          api.getAiStatus()
        ]);
        setSampleQuestions(qRes);
        setProviderInfo(sRes);
      } catch (e) {
        console.error('Failed to load initial advisor data:', e);
      }
    }
    init();
  }, []);

  const handleQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await api.queryAi(queryText);
      setResponse(res);
      setSelectedSources(res.sources || []);
    } catch (err: any) {
      console.error('AI Advisor error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuery(question);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header & Provider Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100/70 text-emerald-800">
              <Bot className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Ask GreenCampus AI
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Grounded sustainability decision support powered by IBM Granite & Curated Institutional RAG
          </p>
        </div>

        {/* Provider Badge */}
        <div
          className={`self-start sm:self-center px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-2 ${
            providerInfo?.is_demo_mode
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              providerInfo?.is_demo_mode ? 'bg-amber-500' : 'bg-emerald-600'
            }`}
          />
          <span>{providerInfo?.status || 'Demo AI Mode (Local Grounded RAG)'}</span>
        </div>
      </div>

      {/* Preloaded Sample Questions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>Recommended Campus Questions</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {sampleQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => {
                setQuestion(q.question);
                handleQuery(q.question);
              }}
              disabled={loading}
              className="text-left p-3 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-xs text-slate-700 flex flex-col justify-between group disabled:opacity-60"
            >
              <span className="font-semibold text-slate-800 group-hover:text-emerald-950 transition-colors">
                "{q.question}"
              </span>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                  {q.category}
                </span>
                <span className="text-emerald-700 font-semibold">{q.sdg}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="relative">
        <div className="bg-white rounded-2xl border-2 border-slate-200 focus-within:border-emerald-600 focus-within:shadow-md transition-all p-2 flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a campus sustainability question (e.g. how to reduce hostel electricity bills)..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Analyze</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3 shadow-2xs">
          <Loader2 className="w-8 h-8 text-emerald-700 animate-spin mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">
            Running 6-Step Agent Decision Workflow...
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Identifying intent, retrieving verified guidelines from the knowledge base, assessing grounding, and applying Responsible AI guardrails.
          </p>
        </div>
      )}

      {/* Response Panel */}
      {response && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Answer Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header metadata */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                  {response.sustainability_area}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">
                  {response.question}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  Alignment: <strong className="text-slate-800">{response.sdg_alignment}</strong>
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Uncertainty Warning Banner if applicable */}
              {response.uncertainty_note && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <span className="font-bold">Uncertainty Notice:</span> {response.uncertainty_note}
                  </div>
                </div>
              )}

              {/* Direct Answer */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Direct Guidance
                </h4>
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100 font-sans">
                  {response.direct_answer}
                </div>
              </div>

              {/* Recommended Actions */}
              {response.recommended_actions?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Prioritized Recommended Actions
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {response.recommended_actions.map((act, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl border border-slate-200/80 bg-white flex items-start gap-2.5"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 leading-snug font-medium">
                          {act}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why It Matters */}
              {response.why_it_matters && (
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                    Why This Matters for Your Campus
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {response.why_it_matters}
                  </p>
                </div>
              )}

              {/* RAG Sources Inspection Trigger */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-800">
                    Grounded Knowledge ({response.sources?.length || 0} Sources Retrieved)
                  </span>
                </div>

                <button
                  onClick={() => setIsSourceModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Inspect RAG Citations</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Observable Agent Workflow Steps */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  High-Level Agent Workflow
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">
                Auditable decision steps (no opaque reasoning tokens)
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {response.workflow_steps?.map((step) => (
                <div
                  key={step.step}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400">
                      STEP {step.step}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {step.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RAG Sources Modal */}
      <RagSourceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        sources={selectedSources}
        activeDomain={response?.sustainability_area}
      />
    </div>
  );
};
