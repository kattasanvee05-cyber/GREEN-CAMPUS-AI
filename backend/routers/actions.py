from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from database import get_db
from models import SustainabilityActionItem

router = APIRouter(prefix="/api/actions", tags=["actions"])

class StatusUpdatePayload(BaseModel):
    status: str # "Not Started", "In Progress", "Completed"

@router.get("", response_model=List[SustainabilityActionItem])
def get_actions():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM action_items ORDER BY urgency ASC")
    rows = cursor.fetchall()
    conn.close()

    items = []
    for r in rows:
        items.append(SustainabilityActionItem(
            id=r["id"],
            title=r["title"],
            category=r["category"],
            urgency=r["urgency"],
            why=r["why"],
            first_step=r["first_step"],
            expected_benefit=r["expected_benefit"],
            responsible_stakeholder=r["responsible_stakeholder"],
            status=r["status"],
            sdg_target=r["sdg_target"],
            is_demo_estimate=bool(r["is_demo_estimate"])
        ))
    return items

@router.patch("/{action_id}/status")
def update_action_status(action_id: str, payload: StatusUpdatePayload):
    if payload.status not in ["Not Started", "In Progress", "Completed"]:
        raise HTTPException(status_code=400, detail="Invalid status.")

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE action_items SET status = ? WHERE id = ?", (payload.status, action_id))
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Action not found.")
    conn.commit()
    conn.close()

    return {"message": f"Action status updated to {payload.status}", "id": action_id}

@router.get("/impact")
def get_impact_metrics() -> Dict[str, Any]:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT category, status FROM action_items")
    rows = cursor.fetchall()
    conn.close()

    total_actions = len(rows)
    completed_actions = sum(1 for r in rows if r["status"] == "Completed")
    in_progress_actions = sum(1 for r in rows if r["status"] == "In Progress")

    by_category: Dict[str, Dict[str, int]] = {}
    for r in rows:
        cat = r["category"]
        if cat not in by_category:
            by_category[cat] = {"total": 0, "completed": 0, "in_progress": 0}
        by_category[cat]["total"] += 1
        if r["status"] == "Completed":
            by_category[cat]["completed"] += 1
        elif r["status"] == "In Progress":
            by_category[cat]["in_progress"] += 1

    return {
        "disclaimer": "Prototype / Estimated Metric — Values illustrate decision-support milestones and simulated potential outcomes. Institutional validation and field instrumentation required for real-world environmental claims.",
        "is_prototype_metric": True,
        "total_actions": total_actions,
        "completed_actions": completed_actions,
        "in_progress_actions": in_progress_actions,
        "completion_rate_pct": round((completed_actions / total_actions * 100) if total_actions else 0, 1),
        "category_breakdown": by_category,
        "simulated_indicators": [
            {
                "label": "Estimated Potential Energy Efficiency Gains",
                "value": "8% – 12%",
                "type": "Demo Estimate",
                "note": "Derived from completed LED retrofits and AC thermostat alignment in sample blocks."
            },
            {
                "label": "Estimated Monthly Water Conservation Volume",
                "value": "~35 kL / month",
                "type": "Demo Estimate",
                "note": "Modeled on 20 hostel tap aerators and fast leak turnarounds."
            },
            {
                "label": "Organic Waste Diverted from Landfill",
                "value": "~240 kg / month",
                "type": "Demo Estimate",
                "note": "Estimated cafeteria waste composting yield."
            },
            {
                "label": "Sustainable Commute Adoption",
                "value": "61%",
                "type": "Demo Estimate",
                "note": "Based on campus transport survey sample."
            }
        ]
    }
