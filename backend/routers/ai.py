from fastapi import APIRouter
from typing import List, Dict, Any
from models import AiQueryRequest, AiQueryResponse
from services.ai.agent_service import agent_service
from services.ai.granite_service import granite_service

router = APIRouter(prefix="/api/ai", tags=["ai"])

@router.get("/status")
def get_ai_status():
    return granite_service.get_provider_info()

@router.get("/sample-questions")
def get_sample_questions() -> List[Dict[str, str]]:
    return [
        {
            "id": "q1",
            "question": "How can our college reduce electricity consumption?",
            "category": "Energy",
            "sdg": "SDG 7"
        },
        {
            "id": "q2",
            "question": "How can we reduce water wastage in hostels?",
            "category": "Water",
            "sdg": "SDG 6"
        },
        {
            "id": "q3",
            "question": "What are practical ways to improve campus waste management?",
            "category": "Waste",
            "sdg": "SDG 12"
        },
        {
            "id": "q4",
            "question": "What are practical sustainable transport options for students?",
            "category": "Transportation",
            "sdg": "SDG 11"
        },
        {
            "id": "q5",
            "question": "How can a campus reduce food waste in cafeteria dining halls?",
            "category": "Waste",
            "sdg": "SDG 12"
        },
        {
            "id": "q6",
            "question": "What are some renewable energy options for educational institutions?",
            "category": "Energy",
            "sdg": "SDG 7"
        }
    ]

@router.post("/query", response_model=AiQueryResponse)
def query_ai_advisor(payload: AiQueryRequest):
    result = agent_service.run_agent_workflow(
        question=payload.question.strip(),
        domain_hint=payload.domain_hint
    )
    return result
