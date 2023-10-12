from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models
from pydantic import BaseModel
from .database import SessionLocal  # Import your database session here

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

class FeedbackRequest(BaseModel):
    feedbackType: str
    description: str
    pageUrl: str
    # userId: int #will integrate userId later once done

@app.get("/_ping")
def ping():
    return {"message": "ping recieved"}

@app.post("/api/feedback")
def submit_feedback(feedback_data: FeedbackRequest, db: Session = Depends(get_db)):
    db_feedback = models.Feedback(
        feedback_type=feedback_data.feedbackType,
        description=feedback_data.description,
        page_url=feedback_data.pageUrl,
        # userId=feedback_data.userId
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return {"message": "Feedback submitted successfully"}