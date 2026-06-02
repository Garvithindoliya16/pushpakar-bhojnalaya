from pydantic import BaseModel,EmailStr

class OrderCreate(BaseModel):
    customer_name: str
    email:EmailStr
    phone: str
    address: str
    items: str
    total: str
    payment_method: str
    payment_status: str