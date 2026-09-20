from fastapi import APIRouter
import uuid
from datetime import datetime
from typing import List, Dict, Any
from database import get_db
from models import EnergyEntry, WaterEntry, WasteEntry, TransportEntry

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

@router.get("/summary")
def get_analytics_summary() -> Dict[str, Any]:
    return {
        "energy": {
            "title": "Energy Management",
            "current_value": "27,300 kWh",
            "metric_label": "Monthly Electrical Draw",
            "status": "Needs Attention",
            "trend": "+4.2% from last month",
            "recommendation": "Conduct walk-through lighting and AC audit across Academic Block A.",
            "is_demo": True,
            "sdg": "SDG 7"
        },
        "water": {
            "title": "Water Stewardship",
            "current_value": "540 kL",
            "metric_label": "Monthly Water Withdrawal",
            "status": "Moderate",
            "trend": "-3.5% from last month",
            "recommendation": "Hostel tap aerator retrofit is progressing; 4 leaks logged this month.",
            "is_demo": True,
            "sdg": "SDG 6"
        },
        "waste": {
            "title": "Waste Segregation",
            "current_value": "72%",
            "metric_label": "Source Segregation Rate",
            "status": "Improving",
            "trend": "+6.0% diversion rate",
            "recommendation": "Expand organic composting capacity for cafeteria food scraps.",
            "is_demo": True,
            "sdg": "SDG 12"
        },
        "transport": {
            "title": "Active & Shared Mobility",
            "current_value": "61%",
            "metric_label": "Sustainable Commute Share",
            "status": "Good",
            "trend": "+2.8% cycling & transit",
            "recommendation": "Install covered bicycle parking racks near South Gate.",
            "is_demo": True,
            "sdg": "SDG 11"
        }
    }

# Energy
@router.get("/energy")
def get_energy_data():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM energy_records ORDER BY ROWID ASC")
    rows = cursor.fetchall()
    conn.close()

    records = [dict(r) for r in rows]
    return {
        "records": records,
        "is_demo_mode": True,
        "ai_observation": "Building A records higher electricity consumption than other campus blocks during the late afternoon. Consider reviewing occupancy, chiller setpoints, and laboratory appliance standby draw before drawing conclusions.",
        "key_recommendations": [
            "Verify thermostat setpoint adheres to 24°C–26°C guideline during peak ambient heat.",
            "Deploy plug-load timers on desktop laboratory equipment."
        ]
    }

@router.post("/energy")
def add_energy_entry(entry: EnergyEntry):
    conn = get_db()
    cursor = conn.cursor()
    new_id = f"nrg_{uuid.uuid4().hex[:8]}"
    cursor.execute("""
    INSERT INTO energy_records (id, month, electricity_usage_kwh, building, occupants, note, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (new_id, entry.month, entry.electricity_usage_kwh, entry.building, entry.occupants, entry.note, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"message": "Energy record logged successfully", "id": new_id}

# Water
@router.get("/water")
def get_water_data():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM water_records ORDER BY ROWID ASC")
    rows = cursor.fetchall()
    conn.close()

    records = [dict(r) for r in rows]
    return {
        "records": records,
        "is_demo_mode": True,
        "ai_observation": "Recorded water consumption dropped in December due to winter examination recess, and rebounded slightly in March due to grounds irrigation. Leak report resolution has averaged 48 hours.",
        "conservation_actions": [
            "Prioritize tap aerator fitting in hostel blocks with repeat leak tickets.",
            "Schedule grounds horticultural irrigation for early morning hours to minimize evaporative loss."
        ]
    }

@router.post("/water")
def add_water_entry(entry: WaterEntry):
    conn = get_db()
    cursor = conn.cursor()
    new_id = f"wtr_{uuid.uuid4().hex[:8]}"
    cursor.execute("""
    INSERT INTO water_records (id, month, water_usage_kl, leak_reports_count, action_taken, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (new_id, entry.month, entry.water_usage_kl, entry.leak_reports_count, entry.action_taken, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"message": "Water record logged successfully", "id": new_id}

# Waste
@router.get("/waste")
def get_waste_data():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM waste_records ORDER BY ROWID ASC")
    rows = cursor.fetchall()
    conn.close()

    records = [dict(r) for r in rows]
    return {
        "records": records,
        "is_demo_mode": True,
        "ai_observation": "Your sample data indicates that recyclable packaging and paper represent 35-40% of recorded solid waste. Expanding dedicated blue-bin collection stations in faculty and library blocks can further reduce landfill tonnage.",
        "ai_insights": [
            "Organic food scrap diversion through composting will prevent localized methane emissions.",
            "End-of-semester paper recycling drives can reclaim significant academic book/exam sheet volumes."
        ]
    }

@router.post("/waste")
def add_waste_entry(entry: WasteEntry):
    conn = get_db()
    cursor = conn.cursor()
    new_id = f"wst_{uuid.uuid4().hex[:8]}"
    cursor.execute("""
    INSERT INTO waste_records (id, month, organic_kg, recyclable_kg, hazardous_kg, landfill_kg, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (new_id, entry.month, entry.organic_kg, entry.recyclable_kg, entry.hazardous_kg, entry.landfill_kg, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"message": "Waste record logged successfully", "id": new_id}

# Transport
@router.get("/transport")
def get_transport_data():
    sample_modes = [
        {"mode": "Walking", "percentage": 28.0, "is_sustainable": True},
        {"mode": "Bicycle", "percentage": 18.0, "is_sustainable": True},
        {"mode": "Public Transit / Metro", "percentage": 15.0, "is_sustainable": True},
        {"mode": "College Shuttle Bus", "percentage": 12.0, "is_sustainable": True},
        {"mode": "Motorized Two-Wheeler", "percentage": 17.0, "is_sustainable": False},
        {"mode": "Private Car", "percentage": 10.0, "is_sustainable": False}
    ]
    sustainable_share = sum(m["percentage"] for m in sample_modes if m["is_sustainable"])
    return {
        "modes": sample_modes,
        "sustainable_share_pct": sustainable_share,
        "is_demo_mode": True,
        "ai_recommendations": [
            "Incentivize bicycle commuting with secure covered bicycle racks and basic repair pump stations.",
            "Synchronize college shuttle arrival times with the city metro schedule at University Station."
        ]
    }
