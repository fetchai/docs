from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Define the database URL. Replace with your actual database URL.
DATABASE_URL = "postgresql+pg8000://user:pass@db/feedback"

# Create a SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a session class for database interactions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
