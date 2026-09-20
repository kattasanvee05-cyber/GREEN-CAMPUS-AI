import json
import os
import re
import math
from typing import List, Dict, Any, Tuple

KNOWLEDGE_FILE = os.path.join(os.path.dirname(__file__), "..", "..", "data", "knowledge_base.json")

class RagService:
    def __init__(self):
        self.documents: List[Dict[str, Any]] = []
        self.load_documents()

    def load_documents(self):
        if os.path.exists(KNOWLEDGE_FILE):
            try:
                with open(KNOWLEDGE_FILE, "r", encoding="utf-8") as f:
                    self.documents = json.load(f)
            except Exception as e:
                print(f"Error loading knowledge base: {e}")
                self.documents = []
        else:
            self.documents = []

    def save_documents(self):
        os.makedirs(os.path.dirname(KNOWLEDGE_FILE), exist_ok=True)
        with open(KNOWLEDGE_FILE, "w", encoding="utf-8") as f:
            json.dump(self.documents, f, indent=2)

    def _tokenize(self, text: str) -> List[str]:
        words = re.findall(r'\b[a-zA-Z0-9]{3,}\b', text.lower())
        stopwords = {
            "the", "and", "for", "with", "this", "that", "from", "are", "was",
            "were", "can", "will", "our", "their", "about", "what", "how", "should",
            "would", "could", "been", "have", "has", "into", "more", "most", "some"
        }
        return [w for w in words if w not in stopwords]

    def search(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        query_tokens = self._tokenize(query)
        if not query_tokens:
            return []

        scored_docs: List[Tuple[float, Dict[str, Any], str]] = []

        for doc in self.documents:
            # Combine fields with weighting
            title_tokens = self._tokenize(doc.get("title", "")) * 3
            tags_tokens = self._tokenize(" ".join(doc.get("tags", []))) * 2
            category_tokens = self._tokenize(doc.get("category", "")) * 2
            content_tokens = self._tokenize(doc.get("content", ""))
            
            doc_tokens = title_tokens + tags_tokens + category_tokens + content_tokens
            if not doc_tokens:
                continue

            # Calculate TF-IDF style overlap score
            match_count = 0
            for qt in set(query_tokens):
                tf = doc_tokens.count(qt)
                if tf > 0:
                    match_count += (1 + math.log(tf))

            # Length normalization
            score = match_count / (math.sqrt(len(doc_tokens)) + 1.0)
            
            if score > 0.05:
                # Find best excerpt
                content = doc.get("content", "")
                sentences = re.split(r'(?<=[.!?])\s+', content)
                best_sentence = sentences[0] if sentences else content[:150]
                
                # Check sentence with most token matches
                max_st_matches = -1
                for s in sentences:
                    s_tokens = set(self._tokenize(s))
                    s_matches = len(s_tokens.intersection(set(query_tokens)))
                    if s_matches > max_st_matches:
                        max_st_matches = s_matches
                        best_sentence = s

                scored_docs.append((score, doc, best_sentence))

        scored_docs.sort(key=lambda x: x[0], reverse=True)
        results = []
        for score, doc, excerpt in scored_docs[:top_k]:
            results.append({
                "id": doc.get("id"),
                "title": doc.get("title"),
                "category": doc.get("category"),
                "source": doc.get("source"),
                "relevance_score": round(min(score * 1.5, 0.98), 2),
                "excerpt": excerpt.strip()
            })
        return results

    def get_all_documents(self) -> List[Dict[str, Any]]:
        return self.documents

    def add_document(self, doc_data: Dict[str, Any]) -> Dict[str, Any]:
        self.documents.append(doc_data)
        self.save_documents()
        return doc_data

    def update_document(self, doc_id: str, updates: Dict[str, Any]) -> bool:
        for i, doc in enumerate(self.documents):
            if doc.get("id") == doc_id:
                for k, v in updates.items():
                    if v is not None:
                        self.documents[i][k] = v
                self.save_documents()
                return True
        return False

    def delete_document(self, doc_id: str) -> bool:
        initial_len = len(self.documents)
        self.documents = [d for d in self.documents if d.get("id") != doc_id]
        if len(self.documents) < initial_len:
            self.save_documents()
            return True
        return False

rag_service = RagService()
