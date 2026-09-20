from fastapi import APIRouter, HTTPException, Query
import uuid
from datetime import datetime
from typing import List, Optional
from models import KnowledgeDoc, KnowledgeDocCreate, KnowledgeDocUpdate
from services.ai.rag_service import rag_service

router = APIRouter(prefix="/api/knowledge", tags=["knowledge"])

@router.get("", response_model=List[KnowledgeDoc])
def list_documents(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    docs = rag_service.get_all_documents()
    if category and category.lower() != "all":
        docs = [d for d in docs if d.get("category", "").lower() == category.lower()]
    if search:
        s = search.lower()
        docs = [d for d in docs if s in d.get("title", "").lower() or s in d.get("content", "").lower() or any(s in t.lower() for t in d.get("tags", []))]
    return docs

@router.get("/{doc_id}", response_model=KnowledgeDoc)
def get_document(doc_id: str):
    docs = rag_service.get_all_documents()
    for d in docs:
        if d.get("id") == doc_id:
            return d
    raise HTTPException(status_code=404, detail="Document not found.")

@router.post("", response_model=KnowledgeDoc)
def create_document(payload: KnowledgeDocCreate):
    new_id = f"doc_{uuid.uuid4().hex[:6]}"
    doc_data = {
        "id": new_id,
        "title": payload.title,
        "category": payload.category,
        "source": payload.source,
        "tags": payload.tags,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "description": payload.description,
        "content": payload.content
    }
    rag_service.add_document(doc_data)
    return doc_data

@router.put("/{doc_id}", response_model=KnowledgeDoc)
def update_document(doc_id: str, payload: KnowledgeDocUpdate):
    updates = payload.model_dump(exclude_unset=True)
    success = rag_service.update_document(doc_id, updates)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found.")
    return get_document(doc_id)

@router.delete("/{doc_id}")
def delete_document(doc_id: str):
    success = rag_service.delete_document(doc_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found.")
    return {"message": "Document deleted successfully", "id": doc_id}
