import sqlite3
import os
import json
import uuid
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "campus_sustainability.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_db()
    cursor = conn.cursor()

    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'student',
        created_at TEXT NOT NULL
    )
    """)

    # Seed demo users if not present
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
        INSERT INTO users (id, name, email, password_hash, role, created_at)
        VALUES 
        ('user_student_01', 'Katta Sanvee', 'student@greencampus.edu', 'student123', 'student', ?),
        ('user_admin_01', 'Dr. Ramesh Kumar (Campus Sustainability Director)', 'admin@greencampus.edu', 'admin123', 'admin', ?)
        """, (datetime.now().isoformat(), datetime.now().isoformat()))

    # Assessments table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS assessments (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        campus_name TEXT,
        date_assessed TEXT,
        overall_score INTEGER,
        overall_status TEXT,
        categories_json TEXT,
        actions_json TEXT
    )
    """)

    # Energy entries table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS energy_records (
        id TEXT PRIMARY KEY,
        month TEXT,
        electricity_usage_kwh REAL,
        building TEXT,
        occupants INTEGER,
        note TEXT,
        created_at TEXT
    )
    """)

    # Water entries table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS water_records (
        id TEXT PRIMARY KEY,
        month TEXT,
        water_usage_kl REAL,
        leak_reports_count INTEGER,
        action_taken TEXT,
        created_at TEXT
    )
    """)

    # Waste entries table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS waste_records (
        id TEXT PRIMARY KEY,
        month TEXT,
        organic_kg REAL,
        recyclable_kg REAL,
        hazardous_kg REAL,
        landfill_kg REAL,
        created_at TEXT
    )
    """)

    # Action items table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS action_items (
        id TEXT PRIMARY KEY,
        title TEXT,
        category TEXT,
        urgency TEXT,
        why TEXT,
        first_step TEXT,
        expected_benefit TEXT,
        responsible_stakeholder TEXT,
        status TEXT,
        sdg_target TEXT,
        is_demo_estimate INTEGER DEFAULT 1
    )
    """)

    # Notifications table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        title TEXT,
        message TEXT,
        timestamp TEXT,
        read INTEGER DEFAULT 0,
        type TEXT
    )
    """)

    # Seed Action Items if empty
    cursor.execute("SELECT COUNT(*) FROM action_items")
    if cursor.fetchone()[0] == 0:
        initial_actions = [
            ("act_01", "Hostel Tap Aerator Retrofit", "Water", "Quick Win", "Reduces per-tap flow rate without compromising wash pressure.", "Order sample aerator nozzles for Block A restrooms.", "Estimated 25-30% reduction in tap discharge volume.", "Hostel Maintenance Committee", "In Progress", "SDG 6", 1),
            ("act_02", "Classroom Lighting Audit & LED Conversion", "Energy", "Quick Win", "Eliminates high-draw fluorescent tubes across lecture halls.", "Count active T8 fixtures in Main Academic Block.", "Estimated 40% reduction in lighting wattage demand.", "Electrical Facility Wing", "Completed", "SDG 7", 1),
            ("act_03", "Standardize AC Setpoints to 24°C-26°C", "Energy", "Quick Win", "Mitigates overcooling and unnecessary chiller energy surge.", "Issue campus administrative advisory for thermostat baselines.", "Lowers HVAC operational draw during peak diurnal hours.", "Campus Facilities Directorate", "In Progress", "SDG 7", 1),
            ("act_04", "Three-Bin Color-Coded Segregation Station Rollout", "Waste", "Medium-Term", "Ensures clean dry recyclable streams and diverts food waste.", "Procure labeled bins for library, cafeteria, and central quad.", "Reduces mixed municipal trash sent to open dumping grounds.", "Student Eco Club & Housekeeping", "In Progress", "SDG 12", 1),
            ("act_05", "Mess Hall Aerobic Compost Drum System", "Waste", "Medium-Term", "Converts organic canteen scraps into high-nutrient landscaping compost.", "Finalize site selection near campus nursery.", "Organic waste diverted from landfills; zero-cost campus soil enrichment.", "Catering & Horticultural Unit", "Not Started", "SDG 12", 1),
            ("act_06", "Campus Bicycle Share & Secure Parking Hubs", "Transportation", "Medium-Term", "Encourages low-carbon active commute between gates and hostels.", "Mark dedicated cycle bays at North & South gates.", "Promotes active mobility and eases internal vehicle congestion.", "Student Council & Security", "Not Started", "SDG 11", 1),
            ("act_07", "Rooftop Solar PV Feasibility Study", "Energy", "Long-Term", "Harnesses unshaded campus rooftop areas for clean power.", "Commission structural load analysis for Library & Science blocks.", "Supplements institutional diurnal grid power.", "Campus Planning Directorate", "Not Started", "SDG 7", 1),
            ("act_08", "Rainwater Harvesting Recharge Shaft Construction", "Water", "Long-Term", "Recharges depleted regional groundwater aquifers during monsoon.", "Inspect storm drain channels and soil percolation rate.", "Augments groundwater reserves and mitigates localized waterlogging.", "Civil Engineering Division", "Not Started", "SDG 6", 1)
        ]
        cursor.executemany("""
        INSERT INTO action_items (id, title, category, urgency, why, first_step, expected_benefit, responsible_stakeholder, status, sdg_target, is_demo_estimate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, initial_actions)

    # Seed Energy Telemetry if empty
    cursor.execute("SELECT COUNT(*) FROM energy_records")
    if cursor.fetchone()[0] == 0:
        sample_energy = [
            (str(uuid.uuid4()), "Oct", 28400, "Academic Block A", 850, "Regular semester", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Nov", 26200, "Academic Block A", 850, "Mild weather", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Dec", 22100, "Academic Block A", 400, "Winter examination break", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Jan", 25800, "Academic Block A", 850, "New semester commencement", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Feb", 27300, "Academic Block A", 850, "Laboratory courses in session", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Mar", 31200, "Academic Block A", 850, "Early summer temperature rise", datetime.now().isoformat()),
        ]
        cursor.executemany("""
        INSERT INTO energy_records (id, month, electricity_usage_kwh, building, occupants, note, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, sample_energy)

    # Seed Water Telemetry if empty
    cursor.execute("SELECT COUNT(*) FROM water_records")
    if cursor.fetchone()[0] == 0:
        sample_water = [
            (str(uuid.uuid4()), "Oct", 620, 8, "Repaired 3 hostel tap drips", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Nov", 580, 5, "Fitted 20 flow aerators", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Dec", 410, 2, "Winter vacation reduced occupancy", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Jan", 560, 6, "Float valve replacement in tank 2", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Feb", 540, 4, "Hostel plumbing routine check", datetime.now().isoformat()),
            (str(uuid.uuid4()), "Mar", 590, 7, "Increased grounds watering due to heat", datetime.now().isoformat()),
        ]
        cursor.executemany("""
        INSERT INTO water_records (id, month, water_usage_kl, leak_reports_count, action_taken, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """, sample_water)

    # Seed Waste Telemetry if empty
    cursor.execute("SELECT COUNT(*) FROM waste_records")
    if cursor.fetchone()[0] == 0:
        sample_waste = [
            (str(uuid.uuid4()), "Oct", 1450, 620, 45, 980, datetime.now().isoformat()),
            (str(uuid.uuid4()), "Nov", 1380, 690, 30, 890, datetime.now().isoformat()),
            (str(uuid.uuid4()), "Dec", 820, 410, 80, 520, datetime.now().isoformat()),
            (str(uuid.uuid4()), "Jan", 1320, 720, 25, 810, datetime.now().isoformat()),
            (str(uuid.uuid4()), "Feb", 1390, 780, 35, 760, datetime.now().isoformat()),
            (str(uuid.uuid4()), "Mar", 1420, 840, 40, 720, datetime.now().isoformat()),
        ]
        cursor.executemany("""
        INSERT INTO waste_records (id, month, organic_kg, recyclable_kg, hazardous_kg, landfill_kg, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, sample_waste)

    # Seed Notifications if empty
    cursor.execute("SELECT COUNT(*) FROM notifications")
    if cursor.fetchone()[0] == 0:
        sample_notifs = [
            ("notif_01", "New AI Recommendation", "AI Advisor generated 3 targeted recommendations for Academic Block A energy reduction.", "10 mins ago", 0, "recommendation"),
            ("notif_02", "Sustainability Assessment Ready", "Your Prototype Campus Sustainability Profile scored 66/100 (Moderate Progress).", "1 hour ago", 0, "assessment"),
            ("notif_03", "Knowledge Base Updated", "Added 'Three-Bin Waste Segregation & Organic Composting Manual' to knowledge base.", "Yesterday", 1, "system"),
            ("notif_04", "Action Milestone Pending", "Review pending action: 'Hostel Tap Aerator Retrofit' in hostel Block A.", "2 days ago", 1, "action")
        ]
        cursor.executemany("""
        INSERT INTO notifications (id, title, message, timestamp, read, type)
        VALUES (?, ?, ?, ?, ?, ?)
        """, sample_notifs)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully.")
