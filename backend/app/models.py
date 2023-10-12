from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class Feedback(Base):
    __tablename__ = 'feedbacks'

    id = Column(Integer, primary_key=True, index=True)
    feedback_type = Column(String, index=True)
    description = Column(String)
    page_url = Column(String)
    # userId = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

