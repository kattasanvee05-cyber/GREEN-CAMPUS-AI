from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List
from database import init_db, get_db
from config import settings
from routers import auth, ai, assessment, analytics, actions, knowledge, notifications
from services.ai.rag_service import rag_service

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Powered Sustainability Management & Decision Support Platform"
)

# Enable CORS for frontend development and production ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(auth.router)
app.include_router(ai.router)
app.include_router(assessment.router)
app.include_router(analytics.router)
app.include_router(actions.router)
app.include_router(knowledge.router)
app.include_router(notifications.router)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/api/health")
def health_check() -> Dict[str, Any]:
    return {
        "status": "online",
        "platform": "GREEN CAMPUS AI",
        "version": settings.VERSION,
        "is_ibm_configured": settings.is_ibm_configured,
        "active_ai_provider": "IBM Granite (watsonx.ai)" if settings.is_ibm_configured else "Demo AI Mode (Local Grounded RAG)"
    }

@app.get("/api/search")
def global_search(q: str = Query(..., min_length=1)) -> Dict[str, Any]:
    query_str = q.lower().strip()
    
    # Search knowledge base
    all_docs = rag_service.get_all_documents()
    kb_matches = []
    for d in all_docs:
        if (query_str in d.get("title", "").lower() or 
            query_str in d.get("description", "").lower() or 
            any(query_str in t.lower() for t in d.get("tags", [])) or 
            query_str in d.get("category", "").lower()):
            kb_matches.append({
                "id": d.get("id"),
                "title": d.get("title"),
                "category": d.get("category"),
                "snippet": d.get("description", "")[:120] + "...",
                "type": "Knowledge Base"
            })

    # Search actions
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, category, urgency, status FROM action_items")
    action_rows = cursor.fetchall()
    conn.close()

    action_matches = []
    for a in action_rows:
        if query_str in a["title"].lower() or query_str in a["category"].lower() or query_str in a["urgency"].lower():
            action_matches.append({
                "id": a["id"],
                "title": a["title"],
                "category": a["category"],
                "snippet": f"{a['urgency']} • Status: {a['status']}",
                "type": "Action Plan"
            })

    # Predefined sustainability topics
    topics = [
        {"title": "Energy Management & Sub-metering", "category": "Energy", "path": "/energy"},
        {"title": "Water Stewardship & Leak Mitigation", "category": "Water", "path": "/water"},
        {"title": "Solid Waste Segregation & Composting", "category": "Waste", "path": "/waste"},
        {"title": "Active Mobility & Bicycle Hubs", "category": "Transportation", "path": "/transport"},
        {"title": "SDG 11 Alignment & Sustainable Campus Guidelines", "category": "SDG", "path": "/about"},
        {"title": "Responsible AI Principles & Guardrails", "category": "AI Ethics", "path": "/responsible-ai"}
    ]
    topic_matches = [
        {"title": t["title"], "category": t["category"], "snippet": f"Explore {t['category']} guidelines", "type": "Topic", "path": t["path"]}
        for t in topics if query_str in t["title"].lower() or query_str in t["category"].lower()
    ]

    return {
        "query": q,
        "results": {
            "knowledge_base": kb_matches[:5],
            "actions": action_matches[:5],
            "topics": topic_matches[:5]
        },
        "total_matches": len(kb_matches) + len(action_matches) + len(topic_matches)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
