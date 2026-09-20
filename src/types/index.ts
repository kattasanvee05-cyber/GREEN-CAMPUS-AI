export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  token: string;
}

export interface RagSource {
  id: string;
  title: string;
  category: string;
  source: string;
  relevance_score: number;
  excerpt: string;
}

export interface WorkflowStep {
  step: number;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  detail?: string;
}

export interface AiResponse {
  question: string;
  direct_answer: string;
  recommended_actions: string[];
  why_it_matters: string;
  sustainability_area: string;
  sdg_alignment: string;
  confidence_score: number;
  uncertainty_note?: string;
  sources: RagSource[];
  workflow_steps: WorkflowStep[];
  ai_provider: string;
  is_demo_mode: boolean;
}

export interface SampleQuestion {
  id: string;
  question: string;
  category: string;
  sdg: string;
}

export interface SustainabilityCategory {
  category: string;
  score: number;
  status: 'Needs Attention' | 'Moderate' | 'Good' | 'Excellent';
  highlight: string;
  icon: string;
}

export interface ActionItem {
  id: string;
  title: string;
  category: string;
  urgency: 'Quick Win' | 'Medium-Term' | 'Long-Term';
  why: string;
  first_step: string;
  expected_benefit: string;
  responsible_stakeholder: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  sdg_target: string;
  is_demo_estimate: boolean;
}

export interface AssessmentResult {
  assessment_id: string;
  campus_name: string;
  date_assessed: string;
  overall_score: number;
  overall_status: string;
  disclaimer: string;
  categories: SustainabilityCategory[];
  recommended_actions: ActionItem[];
}

export interface EnergyRecord {
  id: string;
  month: string;
  electricity_usage_kwh: number;
  building: string;
  occupants: number;
  note?: string;
  created_at: string;
}

export interface WaterRecord {
  id: string;
  month: string;
  water_usage_kl: number;
  leak_reports_count: number;
  action_taken?: string;
  created_at: string;
}

export interface WasteRecord {
  id: string;
  month: string;
  organic_kg: number;
  recyclable_kg: number;
  hazardous_kg: number;
  landfill_kg: number;
  created_at: string;
}

export interface TransportMode {
  mode: string;
  percentage: number;
  is_sustainable: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  source: string;
  tags: string[];
  date: string;
  description: string;
  content: string;
}

export interface GlobalSearchResult {
  id?: string;
  title: string;
  category: string;
  snippet: string;
  type: string;
  path?: string;
}
