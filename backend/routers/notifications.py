from fastapi import APIRouter
from typing import List
from database import get_db
from models import NotificationItem

router = APIRouter(prefix="/api/notifications", tags=["notifications"])

@router.get("", response_model=List[NotificationItem])
def get_notifications():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notifications ORDER BY ROWID ASC")
    rows = cursor.fetchall()
    conn.close()

    items = []
    for r in rows:
        items.append(NotificationItem(
            id=r["id"],
            title=r["title"],
            message=r["message"],
            timestamp=r["timestamp"],
            read=bool(r["read"]),
            type=r["type"]
        ))
    return items

@router.post("/{notif_id}/read")
def mark_read(notif_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE notifications SET read = 1 WHERE id = ?", (notif_id,))
    conn.commit()
    conn.close()
    return {"message": "Notification marked as read", "id": notif_id}
