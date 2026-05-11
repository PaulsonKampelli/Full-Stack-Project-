import os
from sqlalchemy import create_engine
import sys
import urllib.parse

# Using urllib.parse.quote_plus to be absolutely safe
password = "-8Ru%zU$BXX!GKwr"
encoded_password = urllib.parse.quote_plus(password)

db_url = f"postgresql://postgres:{encoded_password}@db.nktdqrxkrmsvisaoykxb.supabase.co:5432/postgres"

print(f"Testing connection to: db.nktdqrxkrmsvisaoykxb.supabase.co")

try:
    engine = create_engine(db_url)
    with engine.connect() as connection:
        print("Connection successful!")
        sys.path.append(os.path.join(os.getcwd(), 'backend'))
        import models
        models.Base.metadata.create_all(bind=engine)
        print("Database tables initialized successfully!")
except Exception as e:
    print(f"Connection failed: {e}")
