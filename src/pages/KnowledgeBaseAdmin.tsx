import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Trash2, Edit3, Tag, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { KnowledgeDocument } from '../types';

export const KnowledgeBaseAdmin: React.FC = () => {
  const [docs, setDocs] = useState<KnowledgeDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<KnowledgeDocument | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Energy',
    source: '',
    tags: '',
    description: '',
    content: ''
  });

  const loadDocs = async () => {
    try {
      const data = await api.getKnowledgeDocs(selectedCategory, searchQuery);
      setDocs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, [selectedCategory, searchQuery]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      category: formData.category,
      source: formData.source,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      description: formData.description,
      content: formData.content
    };

    try {
      if (editingDoc) {
        await api.updateKnowledgeDoc(editingDoc.id, payload);
      } else {
        await api.createKnowledgeDoc(payload);
      }
      setShowModal(false);
      setEditingDoc(null);
      setFormData({ title: '', category: 'Energy', source: '', tags: '', description: '', content: '' });
      loadDocs();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this document from the RAG knowledge base?')) {
      try {
        await api.deleteKnowledgeDoc(id);
        loadDocs();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleEdit = (doc: KnowledgeDocument) => {
    setEditingDoc(doc);
    setFormData({
      title: doc.title,
      category: doc.category,
      source: doc.source,
      tags: doc.tags.join(', '),
      description: doc.description,
      content: doc.content
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100/80 text-teal-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Knowledge Base Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage verified institutional manuals, guidelines, and frameworks indexed for RAG retrieval
          </p>
        </div>

        <button
          onClick={() => {
            setEditingDoc(null);
            setFormData({ title: '', category: 'Energy', source: '', tags: '', description: '', content: '' });
            setShowModal(true);
          }}
          className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Guide
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 w-full sm:w-72 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-transparent outline-none placeholder:text-slate-400 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs">
          {['all', 'Energy', 'Water', 'Waste', 'Transportation', 'Green Buildings', 'Campus Awareness'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {docs.map((d) => (
          <div
            key={d.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  {d.category}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">Source: {d.source}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{d.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{d.description}</p>
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                {d.tags?.map((t, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleEdit(d)}
                className="p-2 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                title="Edit Document"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(d.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              {editingDoc ? 'Edit Sustainability Guide' : 'Add New Sustainability Guide'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Campus Sub-metering Implementation Manual"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Energy">Energy</option>
                    <option value="Water">Water</option>
                    <option value="Waste">Waste</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Green Buildings">Green Buildings</option>
                    <option value="Campus Awareness">Campus Awareness</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Authoritative Source</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g. BEE / UNEP Higher Education"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="energy, submetering, audit, load-shifting"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief 1-sentence summary of this document..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Document Text Content (for RAG)</label>
                <textarea
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter detailed technical guidance, flow rates, standards, and action protocols..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900"
                >
                  {editingDoc ? 'Save Updates' : 'Index Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
