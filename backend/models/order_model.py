from sqlalchemy import Integer,String, Column
from database.connection import Base

class Order(Base):
    __tablename__="orders"
    id=Column(Integer,primary_key=True,index=True)
    customer_name=Column(String)
    phone=Column(String)
    email = Column(String)
    address=Column(String)
    items=Column(String)
    total=Column(String)
    payment_method = Column(String)
    payment_status = Column(String)