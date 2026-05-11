from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class Tree(Base):
    __tablename__ = "trees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    structure = Column(JSON) # Stores the recursive tree object
