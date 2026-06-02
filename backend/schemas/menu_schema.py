from pydantic import BaseModel

class MenuCreate(BaseModel):
    name:str
    description:str
    price:str
    image:str