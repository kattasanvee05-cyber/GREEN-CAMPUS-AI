from fastapi import APIRouter, HTTPException
import uuid
from datetime import datetime
from database import get_db
from models import UserLogin, UserSignup, UserResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login", response_model=UserResponse)
def login(creds: UserLogin):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, password_hash, role FROM users WHERE email = ?", (creds.email.lower().strip(),))
    row = cursor.fetchone()
    conn.close()

    if not row or row["password_hash"] != creds.password:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    return UserResponse(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        role=row["role"],
        token=f"demo-token-{uuid.uuid4().hex[:12]}"
    )

@router.post("/signup", response_model=UserResponse)
def signup(data: UserSignup):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email = ?", (data.email.lower().strip(),))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="An account with this email already exists.")

    new_id = f"user_{uuid.uuid4().hex[:8]}"
    role = data.role if data.role in ["student", "admin"] else "student"
    cursor.execute("""
    INSERT INTO users (id, name, email, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (new_id, data.name.strip(), data.email.lower().strip(), data.password, role, datetime.now().isoformat()))
    conn.commit()
    conn.close()

    return UserResponse(
        id=new_id,
        name=data.name,
        email=data.email,
        role=role,
        token=f"demo-token-{uuid.uuid4().hex[:12]}"
    )

@router.get("/demo-student", response_model=UserResponse)
def get_demo_student():
    return UserResponse(
        id="user_student_01",
        name="Katta Sanvee (Student Researcher)",
        email="student@greencampus.edu",
        role="student",
        token=f"demo-token-{uuid.uuid4().hex[:12]}"
    )

@router.get("/demo-admin", response_model=UserResponse)
def get_demo_admin():
    return UserResponse(
        id="user_admin_01",
        name="Dr. Ramesh Kumar (Campus Sustainability Director)",
        email="admin@greencampus.edu",
        role="admin",
        token=f"demo-token-{uuid.uuid4().hex[:12]}"
    )
