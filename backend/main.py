from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import database

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Nested Tags Tree API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/trees", response_model=List[schemas.TreeResponse])
def get_trees(db: Session = Depends(database.get_db)):
    return db.query(models.Tree).all()

@app.post("/api/trees", response_model=schemas.TreeResponse)
def create_tree(tree: schemas.TreeCreate, db: Session = Depends(database.get_db)):
    db_tree = models.Tree(name=tree.name, structure=tree.structure)
    db.add(db_tree)
    db.commit()
    db.refresh(db_tree)
    return db_tree

@app.put("/api/trees/{tree_id}", response_model=schemas.TreeResponse)
def update_tree(tree_id: int, tree: schemas.TreeUpdate, db: Session = Depends(database.get_db)):
    db_tree = db.query(models.Tree).filter(models.Tree.id == tree_id).first()
    if not db_tree:
        raise HTTPException(status_code=404, detail="Tree not found")
    
    db_tree.name = tree.name
    db_tree.structure = tree.structure
    db.commit()
    db.refresh(db_tree)
    return db_tree

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
