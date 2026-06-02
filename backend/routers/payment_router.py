import razorpay
import os
from dotenv import load_dotenv
from fastapi import APIRouter


load_dotenv()

router = APIRouter(tags=["Payment"])

client = razorpay.Client(
    auth=(os.getenv("RAZORPAY_KEY_ID"),os.getenv("RAZORPAY_KEY_SECRET"))
)

@router.post("/create-payment")
def create_payment(data: dict):
    amount = int(data["amount"]) * 100
    payment = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1
    })
    return {
        "order_id":
            payment["id"],
        "amount":
            payment["amount"]
    }