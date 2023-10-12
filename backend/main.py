import aiopg as aiopg
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app import models
from pydantic import BaseModel
from app.database import get_db
import aiopg

app = FastAPI()

# Configure CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify a list of allowed origins
    allow_methods=["*"],  # "*" allows all methods, or you can specify specific methods
    allow_headers=["*"],  # "*" allows all headers, or you can specify specific headers
    allow_credentials=True,  # Allow cookies and credentials
    allow_origin_regex="https?://.*",  # You can specify a regex for allowed origins
)


class FeedbackRequest(BaseModel):
    feedbackType: str
    description: str
    pageUrl: str
    # userId: int #will integrate userId later once done


@app.get("/_ping")
def ping():
    return {"message": "ping recieved"}


@app.post("/api/feedback")
async def submit_feedback(feedback_data: FeedbackRequest, db: aiopg.Pool = Depends(get_db)):
    with (await db.cursor()) as cur:
        await cur.execute(
            """
            INSERT INTO feedbacks(feedback_type, description, page_url)
            VALUES (%s, %s, %s);
            """,
            (
                feedback_data.feedbackType,
                feedback_data.description,
                feedback_data.pageUrl,
            )
        )

        await cur.execute("COMMIT")

    return {"message": "Feedback submitted successfully"}
