from fastapi import (APIRouter,HTTPException,Depends,Form)
from sqlalchemy.orm import Session
from auth import create_access_token
from database.connection import get_db
from dotenv import load_dotenv
import os
import random
from models.user_model import User
from auth import (verify_password,otp_store)
from email_service import send_otp_email


load_dotenv()


router = APIRouter(tags=["Auth"])
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ADMIN_PANEL_PASSWORD = os.getenv("ADMIN_PANEL_PASSWORD")
ADMIN_PANEL_USERNAME = os.getenv("ADMIN_PANEL_USERNAME")


# LOGIN
@router.post("/login")
def login(username: str = Form(...),password: str = Form(...),db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == username).first()
    if not user:
        raise HTTPException(status_code=401,detail="Invalid email")

    if not verify_password(password,user.password):
        raise HTTPException(status_code=401,detail="Invalid password")


    # GENERATE OTP
    otp = str(random.randint(100000,999999))

    # STORE OTP
    otp_store[user.email] = otp

    # SEND OTP EMAIL
    send_otp_email(user.email,otp)

    return {"message":"OTP sent to email","email":user.email}

# VERIFY OTP
@router.post("/verify-otp")
def verify_otp(data: dict):
    email = data.get("email")
    otp = data.get("otp")
    stored_otp = otp_store.get(email)

    if not stored_otp:
        raise HTTPException(status_code=401,detail="OTP expired")

    if otp != stored_otp:
        raise HTTPException(status_code=401,detail="Invalid OTP")


    # DELETE OTP AFTER SUCCESS
    del otp_store[email]

    # CREATE JWT TOKEN
    token = create_access_token({"sub": email})

    return {"access_token":token,"token_type":"bearer"}