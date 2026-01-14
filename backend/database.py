from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool, StaticPool
import os
from dotenv import load_dotenv
import time

load_dotenv()

# Original Postgres URL
DATABASE_URL = os.getenv("DATABASE_URL")
engine = None
SessionLocal = None

try:
    print(f"Attempting to connect to Supabase: {DATABASE_URL.split('@')[-1] if DATABASE_URL and '@' in DATABASE_URL else '...'}")
    # Try creating engine and connecting
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL not set")
    
    # Use NullPool for Supavisor
    engine = create_engine(DATABASE_URL, poolclass=NullPool, connect_args={'connect_timeout': 5})
    
    # Test connection
    with engine.connect() as connection:
        print("Successfully connected to Supabase (Postgres).")

except Exception as e:
    print(f"\n[WARNING] Could not connect to Supabase: {e}")
    print("[INFO] Falling back to local SQLite database for development.\n")
    
    # Fallback to SQLite
    DATABASE_URL = "sqlite:///./legalese_local.db"
    engine = create_engine(
        DATABASE_URL, 
        connect_args={"check_same_thread": False}, 
        poolclass=StaticPool
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
