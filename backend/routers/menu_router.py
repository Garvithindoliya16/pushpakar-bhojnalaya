from fastapi import APIRouter,Depends,HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import shutil,os
from models.menu_model import MenuItem
from auth import verify_token
from database.connection import get_db

router=APIRouter(tags=["Menu"])

@router.get("/menu")
def get_menu(db:Session=Depends(get_db)):
    return db.query(MenuItem).all()

@router.post("/menu")
async def add_menu_item(name: str = Form(...),description: str = Form(...),price: str = Form(...),category: str = Form(...),image: UploadFile = File(...),db: Session = Depends(get_db)):
    os.makedirs("uploads",exist_ok=True)

    file_path = f"uploads/{image.filename}"

    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(image.file,buffer)

    new_item = MenuItem(name=name,description=description,price=price,category=category,image=f"http://127.0.0.1:8000/{file_path}")
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return {"message":"Menu item added"}

@router.delete("/menu/{id}")
def delete_menu_item(id:int,db: Session = Depends(get_db),user:str=Depends(verify_token)):
    item =db.query(MenuItem).filter(MenuItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404,detail="Menu does not exist for this id")
    db.delete(item)
    db.commit()
    return {"message": "Deleted"}

@router.put("/menu/{id}")
def update_menu_item(id: int,name: str = Form(...),description: str = Form(...),price: str = Form(...),category: str = Form(...),db: Session = Depends(get_db),user:str=Depends(verify_token)):
    item = db.query(MenuItem).filter(MenuItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404,detail="Item does not found")
        
    item.name = name
    item.description = description
    item.price = price
    item.category = category

    db.commit()
    db.refresh(item)

    return item