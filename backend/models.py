from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# Authentication Models
class UserLogin(BaseModel):
    email: str
    password: str

class UserSignup(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "student"

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    token: str

# RAG & AI Models
class RagSourceItem(BaseModel):
    id: str
    title: str
    category: str
    source: str
    relevance_score: float
    excerpt: str

class AgentWorkflowStep(BaseModel):
    step: int
    name: str
    description: str
    status: str  # "completed" | "in_progress" | "pending"
    detail: Optional[str] = None

class AiQueryRequest(BaseModel):
    question: str
    domain_hint: Optional[str] = None

class AiQueryResponse(BaseModel):
    question: str
    direct_answer: str
    recommended_actions: List[str]
    why_it_matters: str
    sustainability_area: str
    sdg_alignment: str
    confidence_score: float
    uncertainty_note: Optional[str] = None
    sources: List[RagSourceItem]
    workflow_steps: List[AgentWorkflowStep]
    ai_provider: str  # "IBM Granite (watsonx.ai)" or "Demo AI Mode (Local Grounded RAG)"
    is_demo_mode: bool

# Assessment Models
class AssessmentInput(BaseModel):
    campus_name: Optional[str] = "Green Campus University (Sample Campus)"
    
    # Energy
    electricity_use_level: str = "moderate" # low, moderate, high, very_high
    has_solar_pv: bool = False
    has_led_lighting: bool = True
    ac_temperature_policy: bool = False
    energy_efficient_equipment: bool = True
    
    # Water
    water_consumption_level: str = "moderate"
    leak_frequency: str = "occasional" # rare, occasional, frequent
    has_rainwater_harvesting: bool = False
    has_greywater_reuse: bool = False
    
    # Waste
    waste_segregation_implemented: bool = True
    has_organic_composting: bool = False
    has_ewaste_protocol: bool = True
    single_use_plastic_ban: bool = True
    
    # Transport
    cycling_infrastructure: bool = False
    public_transit_connectivity: str = "moderate" # poor, moderate, excellent
    campus_ev_shuttle: bool = False
    pedestrian_friendly_walkways: bool = True
    
    # Buildings
    daylight_utilization: str = "moderate" # low, moderate, high
    natural_ventilation: bool = True
    green_space_coverage_pct: int = 25

class SustainabilityCategoryScore(BaseModel):
    category: str
    score: int # 0 - 100
    status: str # "Needs Attention", "Moderate", "Good", "Excellent"
    highlight: str
    icon: str

class SustainabilityActionItem(BaseModel):
    id: str
    title: str
    category: str
    urgency: str # "Quick Win", "Medium-Term", "Long-Term"
    why: str
    first_step: str
    expected_benefit: str
    responsible_stakeholder: str
    status: str # "Not Started", "In Progress", "Completed"
    sdg_target: str
    is_demo_estimate: bool = True

class AssessmentResult(BaseModel):
    assessment_id: str
    campus_name: str
    date_assessed: str
    overall_score: int
    overall_status: str
    disclaimer: str = "This assessment is an educational prototype and should not be interpreted as an official sustainability certification."
    categories: List[SustainabilityCategoryScore]
    recommended_actions: List[SustainabilityActionItem]

# Analytics Models
class EnergyEntry(BaseModel):
    month: str
    electricity_usage_kwh: float
    building: str
    occupants: int
    note: Optional[str] = None

class WaterEntry(BaseModel):
    month: str
    water_usage_kl: float
    leak_reports_count: int
    action_taken: Optional[str] = None

class WasteEntry(BaseModel):
    month: str
    organic_kg: float
    recyclable_kg: float
    hazardous_kg: float
    landfill_kg: float

class TransportEntry(BaseModel):
    mode: str
    percentage: float
    is_sustainable: bool

# Knowledge Base Admin Models
class KnowledgeDoc(BaseModel):
    id: str
    title: str
    category: str
    source: str
    tags: List[str]
    date: str
    description: str
    content: str

class KnowledgeDocCreate(BaseModel):
    title: str
    category: str
    source: str
    tags: List[str]
    description: str
    content: str

class KnowledgeDocUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    source: Optional[str] = None
    tags: Optional[List[str]] = None
    description: Optional[str] = None
    content: Optional[str] = None

# Notification Model
class NotificationItem(BaseModel):
    id: str
    title: str
    message: str
    timestamp: str
    read: bool
    type: str # "recommendation" | "assessment" | "system" | "action"
