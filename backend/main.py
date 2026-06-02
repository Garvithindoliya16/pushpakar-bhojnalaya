from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers.payment_router import router as payment_router
from database.connection import Base, engine
from routers.menu_router import router as menu_router
from routers.order_router import router as order_router
from routers.auth_router import router as auth_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/invoices",StaticFiles(directory="invoices"),name="invoices")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(menu_router)
app.include_router(order_router)
app.include_router(auth_router)
app.include_router(payment_router)
