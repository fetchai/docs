from pydantic import BaseModel


class Feedback(BaseModel):
    __tablename__ = 'feedbacks'

    feedback_type: str
    description: str
    page_url: str
