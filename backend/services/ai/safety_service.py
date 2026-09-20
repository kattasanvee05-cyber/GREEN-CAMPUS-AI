import re
from typing import Dict, Any, List, Optional

class SafetyService:
    """Responsible AI safety, ethics, and grounding guardrails."""

    DANGEROUS_PATTERNS = [
        r'\b(tamper|bypass|rewire\s+live|hack\s+meter|drain\s+acid)\b',
        r'\b(unauthorized\s+grid|override\s+breaker)\b'
    ]

    PII_PATTERNS = [
        r'\b\d{10}\b',  # 10 digit phone
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', # email
        r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b' # card/national ID format
    ]

    def check_input_safety(self, text: str) -> Dict[str, Any]:
        """Validates that user input is safe and does not contain PII or dangerous intent."""
        for pattern in self.DANGEROUS_PATTERNS:
            if re.search(pattern, text, re.IGNORECASE):
                return {
                    "is_safe": False,
                    "reason": "Safety Alert: Query requests potentially hazardous or unauthorized electrical/chemical procedures.",
                    "category": "safety"
                }

        # Check for unnecessary PII in sustainability question
        has_pii = any(re.search(p, text) for p in self.PII_PATTERNS)
        
        return {
            "is_safe": True,
            "has_pii": has_pii,
            "reason": "Input passed Responsible AI safety checks."
        }

    def evaluate_grounding_and_uncertainty(
        self,
        query: str,
        sources: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Evaluates whether retrieved sources provide sufficient grounding for an answer."""
        if not sources:
            return {
                "grounded": False,
                "confidence_score": 0.25,
                "uncertainty_note": "I don't have enough verified information in the current knowledge base to answer this question with high confidence. The following guidance is based on general sustainability principles and should be verified with campus facilities.",
                "status": "low_confidence"
            }

        avg_score = sum(s.get("relevance_score", 0.5) for s in sources) / len(sources)
        
        if avg_score < 0.35:
            return {
                "grounded": True,
                "confidence_score": round(avg_score, 2),
                "uncertainty_note": "Relevant knowledge was retrieved with moderate relevance. Please consult campus sustainability coordinators before capital investments.",
                "status": "moderate_confidence"
            }

        return {
            "grounded": True,
            "confidence_score": round(min(avg_score + 0.2, 0.95), 2),
            "uncertainty_note": None,
            "status": "high_confidence"
        }

    def apply_post_generation_guardrails(self, answer_text: str) -> str:
        """Appends mandatory ethical guidance and human oversight disclaimer if absent."""
        disclaimer = "\n\n*Note: AI recommendations should be reviewed by appropriate campus facility personnel before implementation.*"
        if "reviewed by appropriate campus" not in answer_text:
            answer_text += disclaimer
        return answer_text

safety_service = SafetyService()
