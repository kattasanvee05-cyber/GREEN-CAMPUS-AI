from fastapi import APIRouter
import uuid
import json
from datetime import datetime
from database import get_db
from models import AssessmentInput, AssessmentResult, SustainabilityCategoryScore, SustainabilityActionItem

router = APIRouter(prefix="/api/assessment", tags=["assessment"])

@router.post("/evaluate", response_model=AssessmentResult)
def evaluate_campus(data: AssessmentInput):
    # Calculate category scores (0 - 100)
    # Energy
    energy_score = 40
    if data.has_led_lighting: energy_score += 20
    if data.has_solar_pv: energy_score += 25
    if data.ac_temperature_policy: energy_score += 15
    if data.electricity_use_level == "low": energy_score += 10
    elif data.electricity_use_level == "very_high": energy_score -= 15
    energy_score = max(20, min(energy_score, 95))

    # Water
    water_score = 45
    if data.has_rainwater_harvesting: water_score += 25
    if data.has_greywater_reuse: water_score += 20
    if data.leak_frequency == "rare": water_score += 15
    elif data.leak_frequency == "frequent": water_score -= 20
    water_score = max(20, min(water_score, 95))

    # Waste
    waste_score = 35
    if data.waste_segregation_implemented: waste_score += 25
    if data.has_organic_composting: waste_score += 25
    if data.has_ewaste_protocol: waste_score += 15
    if data.single_use_plastic_ban: waste_score += 10
    waste_score = max(20, min(waste_score, 95))

    # Transport
    transport_score = 40
    if data.pedestrian_friendly_walkways: transport_score += 20
    if data.cycling_infrastructure: transport_score += 20
    if data.campus_ev_shuttle: transport_score += 15
    if data.public_transit_connectivity == "excellent": transport_score += 15
    elif data.public_transit_connectivity == "poor": transport_score -= 10
    transport_score = max(20, min(transport_score, 95))

    # Buildings
    building_score = 45
    if data.natural_ventilation: building_score += 20
    if data.daylight_utilization == "high": building_score += 20
    if data.green_space_coverage_pct >= 30: building_score += 15
    building_score = max(20, min(building_score, 95))

    def get_status(s: int) -> str:
        if s >= 80: return "Excellent"
        if s >= 65: return "Good"
        if s >= 50: return "Moderate"
        return "Needs Attention"

    categories = [
        SustainabilityCategoryScore(
            category="Energy",
            score=energy_score,
            status=get_status(energy_score),
            highlight="LED lighting deployed; scope for rooftop solar PV & sub-metering" if data.has_led_lighting else "Lighting efficiency transition recommended",
            icon="Zap"
        ),
        SustainabilityCategoryScore(
            category="Water",
            score=water_score,
            status=get_status(water_score),
            highlight="Active leak mitigation needed in student hostels" if data.leak_frequency != "rare" else "Low leak frequency reported",
            icon="Droplets"
        ),
        SustainabilityCategoryScore(
            category="Waste",
            score=waste_score,
            status=get_status(waste_score),
            highlight="Composting unit needed for cafeteria scraps" if not data.has_organic_composting else "Organic waste diversion operational",
            icon="Trash2"
        ),
        SustainabilityCategoryScore(
            category="Transportation",
            score=transport_score,
            status=get_status(transport_score),
            highlight="Bicycle lanes & public transit synchronizing recommended",
            icon="Bike"
        ),
        SustainabilityCategoryScore(
            category="Green Buildings",
            score=building_score,
            status=get_status(building_score),
            highlight=f"Natural daylighting and {data.green_space_coverage_pct}% campus canopy coverage",
            icon="Building2"
        )
    ]

    overall_score = round(sum([c.score for c in categories]) / len(categories))
    overall_status = get_status(overall_score)

    actions = [
        SustainabilityActionItem(
            id=f"act_eval_{uuid.uuid4().hex[:6]}",
            title="Conduct High-Occupancy Energy Audit",
            category="Energy",
            urgency="Quick Win",
            why="Potential reduction in unnecessary electricity baseload during off-peak hours.",
            first_step="Walk through science laboratories and main academic blocks at 8:00 PM.",
            expected_benefit="Identify phantom plug loads and unneeded luminaire usage.",
            responsible_stakeholder="Campus Electrical Facility Wing",
            status="Not Started",
            sdg_target="SDG 7",
            is_demo_estimate=True
        ),
        SustainabilityActionItem(
            id=f"act_eval_{uuid.uuid4().hex[:6]}",
            title="Install Hostel Faucet Flow Aerators",
            category="Water",
            urgency="Quick Win",
            why="Reduces per-minute flow rate without diminishing wash comfort.",
            first_step="Trial 20 aerator nozzles in Block A ground floor washrooms.",
            expected_benefit="Mitigate unnecessary discharge volume in residential hostels.",
            responsible_stakeholder="Hostel Caretaker & Plumbing Team",
            status="Not Started",
            sdg_target="SDG 6",
            is_demo_estimate=True
        ),
        SustainabilityActionItem(
            id=f"act_eval_{uuid.uuid4().hex[:6]}",
            title="Deploy Standardized 3-Bin Segregation Stations",
            category="Waste",
            urgency="Medium-Term",
            why="Improves dry recyclable yield and prevents cafeteria scrap contamination.",
            first_step="Place color-coded bins at cafeteria entrance and central quad.",
            expected_benefit="Diverts recyclable cardboard and plastic from general municipal landfill bins.",
            responsible_stakeholder="Student Eco Club & Housekeeping Directorate",
            status="Not Started",
            sdg_target="SDG 12",
            is_demo_estimate=True
        )
    ]

    assessment_id = f"asm_{uuid.uuid4().hex[:8]}"
    date_str = datetime.now().strftime("%b %d, %Y")

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO assessments (id, user_id, campus_name, date_assessed, overall_score, overall_status, categories_json, actions_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        assessment_id,
        "user_student_01",
        data.campus_name or "Green Campus University",
        date_str,
        overall_score,
        overall_status,
        json.dumps([c.model_dump() for c in categories]),
        json.dumps([a.model_dump() for a in actions])
    ))
    conn.commit()
    conn.close()

    return AssessmentResult(
        assessment_id=assessment_id,
        campus_name=data.campus_name or "Green Campus University",
        date_assessed=date_str,
        overall_score=overall_score,
        overall_status=overall_status,
        disclaimer="This assessment is an educational prototype and should not be interpreted as an official sustainability certification.",
        categories=categories,
        recommended_actions=actions
    )

@router.get("/latest", response_model=AssessmentResult)
def get_latest_assessment():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assessments ORDER BY ROWID DESC LIMIT 1")
    row = cursor.fetchone()
    conn.close()

    if row:
        return AssessmentResult(
            assessment_id=row["id"],
            campus_name=row["campus_name"],
            date_assessed=row["date_assessed"],
            overall_score=row["overall_score"],
            overall_status=row["overall_status"],
            categories=json.loads(row["categories_json"]),
            recommended_actions=json.loads(row["actions_json"])
        )
    
    # Return initial default assessment if none submitted yet
    default_input = AssessmentInput()
    return evaluate_campus(default_input)
