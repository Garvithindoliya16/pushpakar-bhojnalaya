from sqlalchemy import Column,Integer,String
from database.connection import Base

class MenuItem(Base):
    __tablename__="menu_items"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String)
    description=Column(String)
    price = Column(String)
    category = Column(String)
    image=Column(String)
    