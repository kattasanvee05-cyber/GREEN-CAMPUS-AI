import {
  User,
  AiResponse,
  SampleQuestion,
  AssessmentResult,
  ActionItem,
  EnergyRecord,
  WaterRecord,
  WasteRecord,
  TransportMode,
  NotificationItem,
  KnowledgeDocument,
  GlobalSearchResult
} from '../types';
const API_BASE = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api`;

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(err.detail || `Server returned ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn(`API call to ${endpoint} failed, checking demo fallback:`, err.message);
    throw err;
  }
}

export const api = {
  // Health
  checkHealth: () => request<{ status: string; platform: string; is_ibm_configured: boolean; active_ai_provider: string }>('/health'),

  // Auth
  login: (email: string, password: string) => request<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  signup: (name: string, email: string, password: string, role = 'student') => request<User>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role })
  }),
  getDemoStudent: () => request<User>('/auth/demo-student'),
  getDemoAdmin: () => request<User>('/auth/demo-admin'),

  // AI & RAG
  getAiStatus: () => request<{ name: string; is_demo_mode: boolean; model: string; status: string }>('/ai/status'),
  getSampleQuestions: () => request<SampleQuestion[]>('/ai/sample-questions'),
  queryAi: (question: string, domainHint?: string) => request<AiResponse>('/ai/query', {
    method: 'POST',
    body: JSON.stringify({ question, domain_hint: domainHint })
  }),

  // Assessment
  evaluateCampus: (inputData: any) => request<AssessmentResult>('/assessment/evaluate', {
    method: 'POST',
    body: JSON.stringify(inputData)
  }),
  getLatestAssessment: () => request<AssessmentResult>('/assessment/latest'),

  // Analytics
  getAnalyticsSummary: () => request<any>('/analytics/summary'),
  getEnergyData: () => request<{ records: EnergyRecord[]; is_demo_mode: boolean; ai_observation: string; key_recommendations: string[] }>('/analytics/energy'),
  addEnergyEntry: (data: Partial<EnergyRecord>) => request<{ message: string; id: string }>('/analytics/energy', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getWaterData: () => request<{ records: WaterRecord[]; is_demo_mode: boolean; ai_observation: string; conservation_actions: string[] }>('/analytics/water'),
  addWaterEntry: (data: Partial<WaterRecord>) => request<{ message: string; id: string }>('/analytics/water', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getWasteData: () => request<{ records: WasteRecord[]; is_demo_mode: boolean; ai_observation: string; ai_insights: string[] }>('/analytics/waste'),
  addWasteEntry: (data: Partial<WasteRecord>) => request<{ message: string; id: string }>('/analytics/waste', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getTransportData: () => request<{ modes: TransportMode[]; sustainable_share_pct: number; is_demo_mode: boolean; ai_recommendations: string[] }>('/analytics/transport'),

  // Action Items & Impact
  getActions: () => request<ActionItem[]>('/actions'),
  updateActionStatus: (id: string, status: 'Not Started' | 'In Progress' | 'Completed') => request<{ message: string }>(`/actions/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  getImpactMetrics: () => request<any>('/actions/impact'),

  // Knowledge Base
  getKnowledgeDocs: (category?: string, search?: string) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    return request<KnowledgeDocument[]>(`/knowledge?${params.toString()}`);
  },
  createKnowledgeDoc: (doc: Partial<KnowledgeDocument>) => request<KnowledgeDocument>('/knowledge', {
    method: 'POST',
    body: JSON.stringify(doc)
  }),
  updateKnowledgeDoc: (id: string, doc: Partial<KnowledgeDocument>) => request<KnowledgeDocument>(`/knowledge/${id}`, {
    method: 'PUT',
    body: JSON.stringify(doc)
  }),
  deleteKnowledgeDoc: (id: string) => request<{ message: string; id: string }>(`/knowledge/${id}`, {
    method: 'DELETE'
  }),

  // Notifications
  getNotifications: () => request<NotificationItem[]>('/notifications'),
  markNotificationRead: (id: string) => request<{ message: string }>(`/notifications/${id}/read`, {
    method: 'POST'
  }),

  // Global Search
  globalSearch: (q: string) => request<{ query: string; results: { knowledge_base: GlobalSearchResult[]; actions: GlobalSearchResult[]; topics: GlobalSearchResult[] }; total_matches: number }>(`/search?q=${encodeURIComponent(q)}`)
};
