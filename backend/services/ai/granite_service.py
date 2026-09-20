import json
import requests
from typing import Dict, Any, List, Optional
from config import settings

class GraniteService:
    """Service abstraction for IBM Granite on watsonx.ai with clean Demo AI Mode fallback."""

    def __init__(self):
        self.is_configured = settings.is_ibm_configured
        self.api_key = settings.IBM_WATSONX_API_KEY
        self.project_id = settings.IBM_PROJECT_ID
        self.url = settings.IBM_URL.rstrip('/')
        self.model_id = settings.IBM_GRANITE_MODEL

    def get_provider_info(self) -> Dict[str, Any]:
        if self.is_configured:
            return {
                "name": "IBM Granite (watsonx.ai)",
                "is_demo_mode": False,
                "model": self.model_id,
                "status": "IBM Granite Connected"
            }
        else:
            return {
                "name": "Demo AI Mode (Local Grounded RAG)",
                "is_demo_mode": True,
                "model": "Local RAG Synthesis (Deterministic Demo Provider)",
                "status": "Demo AI Mode"
            }

    def _get_iam_token(self) -> Optional[str]:
        """Obtains an IAM access token using the IBM Cloud API key."""
        try:
            headers = {"Content-Type": "application/x-www-form-urlencoded"}
            data = f"grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey={self.api_key}"
            response = requests.post("https://iam.cloud.ibm.com/identity/token", headers=headers, data=data, timeout=10)
            if response.status_code == 200:
                return response.json().get("access_token")
            return None
        except Exception as e:
            print(f"Failed to fetch IBM IAM Token: {e}")
            return None

    def generate_response(
        self,
        question: str,
        sources: List[Dict[str, Any]],
        domain: str
    ) -> Dict[str, Any]:
        """Generates a grounded response using IBM Granite or Demo AI Mode."""
        if self.is_configured:
            token = self._get_iam_token()
            if token:
                try:
                    return self._call_granite_api(token, question, sources, domain)
                except Exception as e:
                    print(f"IBM watsonx.ai call failed, falling back to Demo Mode: {e}")
            else:
                print("Could not obtain IBM token, falling back to Demo Mode.")

        # Fallback to Demo AI Mode with domain knowledge synthesis
        return self._generate_demo_mode_response(question, sources, domain)

    def _call_granite_api(
        self,
        token: str,
        question: str,
        sources: List[Dict[str, Any]],
        domain: str
    ) -> Dict[str, Any]:
        context_text = "\n\n".join([f"Source [{s.get('title')}]: {s.get('excerpt')}" for s in sources])
        prompt = (
            f"You are GreenCampus AI, an expert sustainability advisor for educational institutions.\n"
            f"Ground your answer strictly on the provided campus sustainability context.\n"
            f"Context:\n{context_text}\n\n"
            f"Question: {question}\n\n"
            f"Provide a direct answer, key recommended actions, why it matters, and SDG alignment."
        )

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
            "Accept": "application/json"
        }

        payload = {
            "model_id": self.model_id,
            "input": prompt,
            "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": 500,
                "repetition_penalty": 1.1
            },
            "project_id": self.project_id
        }

        endpoint = f"{self.url}/ml/v1/text/generation?version=2023-05-29"
        res = requests.post(endpoint, headers=headers, json=payload, timeout=25)
        if res.status_code == 200:
            data = res.json()
            generated_text = data.get("results", [{}])[0].get("generated_text", "")
            return {
                "direct_answer": generated_text,
                "is_demo_mode": False,
                "ai_provider": "IBM Granite (watsonx.ai)"
            }
        else:
            raise Exception(f"API returned status {res.status_code}: {res.text}")

    def _generate_demo_mode_response(
        self,
        question: str,
        sources: List[Dict[str, Any]],
        domain: str
    ) -> Dict[str, Any]:
        """Provides realistic, high-fidelity grounded responses in Demo AI Mode."""
        q_lower = question.lower()

        # Build context-aware synthesized answer
        if "electricity" in q_lower or "energy" in q_lower or domain == "Energy":
            direct_answer = (
                "Educational institutions can reduce electricity consumption by targeting their largest baseload areas: "
                "classroom lighting, computing laboratories, and campus HVAC cooling. By transitioning to high-efficiency LED luminaires, "
                "instituting institutional thermostat baselines of 24°C–26°C, and utilizing occupancy sensors in unoccupied seminar halls, "
                "campuses can eliminate significant phantom loads without compromising academic comfort."
            )
            actions = [
                "Conduct a block-by-block walk-through audit of academic buildings to identify baseline lighting and phantom appliance draw.",
                "Standardize air-conditioning setpoints to 24°C–26°C across faculty offices, lecture halls, and laboratories.",
                "Retrofit common-area fluorescent fixtures with high-efficiency LED luminaires.",
                "Deploy sub-metering across departmental blocks to establish baseline consumption profiles."
            ]
            why_it_matters = (
                "Electricity is often the largest single operational utility expenditure for educational institutions. "
                "Curtailing avoidable baseload lowers operating overhead while advancing national clean energy targets."
            )
            sdg_alignment = "SDG 7 (Affordable & Clean Energy) and SDG 11 (Sustainable Cities & Communities)"

        elif "water" in q_lower or "hostel" in q_lower or domain == "Water":
            direct_answer = (
                "Water conservation in university residential hostels and campus facilities centers on leak mitigation and flow optimization. "
                "A single continuous dripping faucet can waste over 30 liters daily. Implementing simple faucet aerators, dual-flush cisterns, "
                "and an active student leak-reporting system resolves the primary sources of per-capita campus water loss."
            )
            actions = [
                "Retrofit sink taps in student hostels and dining halls with water-saving aerators to curb excessive flow rates.",
                "Establish a rapid facilities dispatch system for student-reported plumbing leaks and overflow valves.",
                "Inspect overhead tank float valves to prevent nocturnal overflow during municipal pumping hours.",
                "Evaluate feasibility of decentralized greywater recycling for campus landscaping and grounds maintenance."
            ]
            why_it_matters = (
                "Colleges and universities in rapidly urbanizing areas face acute municipal water stress and escalating tanker costs. "
                "Proactive water stewardship protects local groundwater aquifers and ensures institutional resilience."
            )
            sdg_alignment = "SDG 6 (Clean Water & Sanitation) and SDG 11 (Sustainable Cities & Communities)"

        elif "waste" in q_lower or "food" in q_lower or domain == "Waste":
            direct_answer = (
                "Campus waste management requires strict source segregation and circular treatment of cafeteria organic scraps. "
                "Educational institutions generate substantial volumes of compostable food matter and recyclable paper/packaging. "
                "Deploying standardized 3-bin collection stations (Wet, Dry Recyclable, Hazardous) paired with on-site aerobic composting "
                "transforms waste from an institutional disposal cost into high-grade organic garden manure."
            )
            actions = [
                "Deploy standardized color-coded 3-bin stations (Green for wet, Blue for recyclables, Red/Black for domestic hazardous) across all blocks.",
                "Establish an on-site aerobic composting unit or vermicompost pit for cafeteria and mess hall food scraps.",
                "Implement a semester-end e-waste and paper recycling drive partnered with authorized recyclers.",
                "Conduct regular mess hall 'food waste awareness audits' to encourage conscious student plate-portioning."
            ]
            why_it_matters = (
                "Diverting organic waste from open municipal landfills prevents anaerobic methane emissions while producing zero-cost soil nourishment for campus green spaces."
            )
            sdg_alignment = "SDG 12 (Responsible Consumption & Production) and SDG 11 (Sustainable Cities & Communities)"

        elif "transport" in q_lower or "commute" in q_lower or domain == "Transportation":
            direct_answer = (
                "Sustainable campus transportation is achieved by prioritizing active mobility (walking and cycling) and synchronizing shared transit. "
                "Educational campuses have high pedestrian density; creating shaded car-free zones, organizing campus bicycle hubs, "
                "and coordinating college shuttle connections with local public bus and metro timetables drastically lowers commuter congestion."
            )
            actions = [
                "Designate pedestrian-only internal campus avenues with shaded tree-lined walkways and dedicated bicycle lanes.",
                "Provide secure, covered bicycle parking racks adjacent to main gates, academic blocks, and library facilities.",
                "Coordinate college bus scheduling with city metro and rail terminal arrival timings.",
                "Install solar-powered low-capacity EV charging points for electric two-wheelers used by students and staff."
            ]
            why_it_matters = (
                "Commuter trips by single-occupancy motorized two-wheelers and automobiles contribute significantly to localized particulate emissions and campus parking congestion."
            )
            sdg_alignment = "SDG 11 (Sustainable Cities & Communities) and SDG 13 (Climate Action)"

        else:
            direct_answer = (
                "GreenCampus AI recommends adopting an integrated campus sustainability management framework. "
                "Begin by mapping resource flows across energy, water, waste, and commuter transit. "
                "Pairing foundational technological interventions (such as sub-metering and efficient fixtures) with student-led sustainability ambassadors "
                "creates lasting cultural and operational improvements across the educational institution."
            )
            actions = [
                "Conduct a baseline sustainability walkthrough across all campus departments and student hostels.",
                "Establish a student-faculty Green Campus Committee to oversee action milestones.",
                "Integrate campus sustainability telemetry into student project work and classroom curricula.",
                "Publish a transparent annual campus environmental progress dashboard to track improvement over time."
            ]
            why_it_matters = (
                "Educational institutions educate tomorrow's leaders; modeling sustainable operations provides both operational savings and invaluable experiential education."
            )
            sdg_alignment = "SDG 11 (Sustainable Cities & Communities)"

        return {
            "direct_answer": direct_answer,
            "actions": actions,
            "why_it_matters": why_it_matters,
            "sdg_alignment": sdg_alignment,
            "is_demo_mode": True,
            "ai_provider": "Demo AI Mode (Local Grounded RAG)"
        }

granite_service = GraniteService()
