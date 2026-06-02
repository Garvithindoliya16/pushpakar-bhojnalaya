from fastapi import APIRouter,Depends
from schemas.order_schema import OrderCreate
from models.order_model import Order
from database.connection import get_db
from sqlalchemy.orm import Session
from auth import verify_token
from email_service import send_order_email
from invoice_service import generate_invoice


router = APIRouter(tags=["Order"])

@router.post("/orders")
def create_order(order: OrderCreate,db: Session = Depends(get_db)):
    if not order.customer_name.strip():
        return {"message": "Name required"}

    if not order.phone.strip():
        return {"message": "Phone required"}

    if not order.address.strip():
        return {"message": "Address required"}



    # SAVE ORDER
    new_order = Order(
        customer_name=order.customer_name,
        phone=order.phone,
        email=order.email,
        address=order.address,
        items=order.items,
        total=order.total,
        payment_method=order.payment_method,
        payment_status=order.payment_status
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # GENERATE PDF
    invoice_path = generate_invoice(new_order)

    # SEND EMAIL WITH PDF
    send_order_email(
        new_order,
        invoice_path
    )

    return {
        "message": "Order placed",
        "invoice": invoice_path
    }



@router.get("/orders")
def get_orders(db: Session = Depends(get_db),user: str = Depends(verify_token)):
    return db.query(Order).all()