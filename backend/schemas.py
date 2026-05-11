from pydantic import BaseModel
from typing import List, Optional, Any

class TreeBase(BaseModel):
    name: str
    structure: Any # Recursive dict

class TreeCreate(TreeBase):
    pass

class TreeUpdate(TreeBase):
    pass

class TreeResponse(TreeBase):
    id: int

    class Config:
        from_attributes = True
