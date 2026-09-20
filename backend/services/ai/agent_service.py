import re
from typing import Dict, Any, List
from .rag_service import rag_service
from .granite_service import granite_service
from .safety_service import safety_service

class AgentService:
    """Coordinates the high-level agent decision-support workflow."""

    def identify_domain(self, query: str) -> str:
        q = query.lower()
        if any(w in q for w in ["electric", "power", "energy", "solar", "ac", "hvac", "light", "bill", "kwh"]):
            return "Energy"
        elif any(w in q for w in ["water", "tap", "leak", "hostel", "shower", "tank", "rainwater", "borewell"]):
            return "Water"
        elif any(w in q for w in ["waste", "trash", "garbage", "food", "compost", "e-waste", "plastic", "recycle"]):
            return "Waste"
        elif any(w in q for w in ["transport", "bus", "bike", "cycle", "commute", "car", "travel", "vehicle"]):
            return "Transportation"
        elif any(w in q for w in ["building", "ventilation", "daylight", "roof", "architecture", "classroom"]):
            return "Green Buildings"
        else:
            return "Campus Sustainability"

    def identify_intent(self, query: str) -> str:
        q = query.lower()
        if any(w in q for w in ["how can", "how to", "ways to", "how do we"]):
            return "Action Plan & Best Practices"
        elif any(w in q for w in ["what is", "why", "explain"]):
            return "Knowledge & Conceptual Inquiry"
        elif any(w in q for w in ["reduce", "save", "cut", "mitigate", "optimize"]):
            return "Efficiency & Conservation Strategy"
        elif any(w in q for w in ["audit", "measure", "assess", "track"]):
            return "Measurement & Assessment"
        else:
            return "General Decision Support"

    def run_agent_workflow(self, question: str, domain_hint: str = None) -> Dict[str, Any]:
        workflow_steps = []

        # Step 1: Input Safety Check
        safety_result = safety_service.check_input_safety(question)
        if not safety_result["is_safe"]:
            return {
                "question": question,
                "direct_answer": f"Responsible AI Warning: {safety_result['reason']}",
                "recommended_actions": ["Consult authorized campus facility engineers or licensed safety officers."],
                "why_it_matters": "Responsible AI protocols prohibit guidance on hazardous or uncertified infrastructure tasks.",
                "sustainability_area": "Safety Protocol",
                "sdg_alignment": "SDG 11",
                "confidence_score": 1.0,
                "uncertainty_note": "Request blocked by safety guardrails.",
                "sources": [],
                "workflow_steps": [{
                    "step": 1,
                    "name": "Safety Guardrail Check",
                    "description": "Safety filter triggered",
                    "status": "blocked",
                    "detail": safety_result["reason"]
                }],
                "ai_provider": "Safety Guardrail Engine",
                "is_demo_mode": True
            }

        # Step 2: Intent Identification
        intent = self.identify_intent(question)
        workflow_steps.append({
            "step": 1,
            "name": "Intent Identification",
            "description": f"Identified intent: {intent}",
            "status": "completed",
            "detail": f"Classified query type as '{intent}'"
        })

        # Step 3: Domain Mapping
        domain = domain_hint if domain_hint else self.identify_domain(question)
        workflow_steps.append({
            "step": 2,
            "name": "Sustainability Domain Mapping",
            "description": f"Mapped to domain: {domain}",
            "status": "completed",
            "detail": f"Targeted category: {domain}"
        })

        # Step 4: RAG Knowledge Retrieval
        sources = rag_service.search(f"{domain} {question}", top_k=3)
        workflow_steps.append({
            "step": 3,
            "name": "RAG Knowledge Retrieval",
            "description": f"Retrieved {len(sources)} verified institutional guide(s)",
            "status": "completed",
            "detail": f"Searched knowledge base for '{domain}' references"
        })

        # Step 5: Grounding and Uncertainty Assessment
        grounding = safety_service.evaluate_grounding_and_uncertainty(question, sources)
        workflow_steps.append({
            "step": 4,
            "name": "Grounding & Evidence Verification",
            "description": f"Knowledge confidence: {int(grounding['confidence_score'] * 100)}%",
            "status": "completed",
            "detail": f"Calculated grounding metric ({grounding['status']})"
        })

        # Step 6: AI Generation (IBM Granite or Demo Provider)
        ai_output = granite_service.generate_response(question, sources, domain)
        workflow_steps.append({
            "step": 5,
            "name": "AI Decision Synthesis",
            "description": f"Synthesized grounded response via {ai_output['ai_provider']}",
            "status": "completed",
            "detail": f"Provider: {ai_output['ai_provider']}"
        })

        # Step 7: Responsible AI & Safety Post-Check
        guarded_answer = safety_service.apply_post_generation_guardrails(ai_output["direct_answer"])
        workflow_steps.append({
            "step": 6,
            "name": "Responsible AI Verification",
            "description": "Passed ethical & human oversight verification",
            "status": "completed",
            "detail": "Applied transparency disclosures and human oversight notice"
        })

        return {
            "question": question,
            "direct_answer": guarded_answer,
            "recommended_actions": ai_output.get("actions", [
                "Conduct initial department walkthrough",
                "Engage student sustainability ambassadors",
                "Track consumption trends over next 30 days"
            ]),
            "why_it_matters": ai_output.get("why_it_matters", "Supports institutional conservation and sustainability goals."),
            "sustainability_area": domain,
            "sdg_alignment": ai_output.get("sdg_alignment", "SDG 11 (Sustainable Cities and Communities)"),
            "confidence_score": grounding["confidence_score"],
            "uncertainty_note": grounding["uncertainty_note"],
            "sources": sources,
            "workflow_steps": workflow_steps,
            "ai_provider": ai_output["ai_provider"],
            "is_demo_mode": ai_output["is_demo_mode"]
        }

agent_service = AgentService()
