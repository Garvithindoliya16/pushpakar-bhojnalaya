# 🍛 Pushpakar Bhojnalaya

A full-stack Restaurant Ordering & Management System built for a real restaurant business to streamline customer ordering, payments, invoice generation, and restaurant administration.

---

## 🚀 Overview

Pushpakar Bhojnalaya is a modern restaurant management platform that allows customers to browse the menu, place orders, make online payments, receive invoices via email, and enables administrators to manage dishes and customer orders through a secure dashboard.

This project was developed for a real restaurant business and focuses on providing a smooth ordering experience while reducing manual work for restaurant management.

---

## ✨ Features

### 🍽️ Customer Features

* Browse restaurant menu
* Categorized dishes
* Add items to cart
* Update item quantities
* Remove items from cart
* Responsive mobile-friendly UI
* Customer details validation
* Cash On Delivery (COD)
* Online Payments using Razorpay
* WhatsApp ordering integration
* Google Maps location integration

---

### 💳 Payment System

* Razorpay Payment Gateway Integration
* Secure online payments
* COD support
* Payment status tracking
* Payment method tracking
* Order creation after successful payment

---

### 📄 Invoice Generation

* Automatic invoice generation
* PDF invoice download
* Restaurant-branded invoice design
* Item-wise billing
* Customer details included
* Order summary included

---

### 📧 Email Automation

* Customer order confirmation email
* PDF invoice attachment
* Admin order notification email
* Automated SMTP integration

---

### 🔐 Authentication & Security

* JWT Authentication
* Password Hashing using bcrypt
* OTP-based Admin Login Verification
* Protected Admin Routes
* Environment Variable Management

---

### 👨‍💼 Admin Dashboard

* Secure Login
* OTP Verification
* Add New Dishes
* Upload Dish Images
* Manage Categories
* View Customer Orders
* Track Payment Method
* Track Payment Status
* Logout Functionality

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Font Awesome

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL
* Neon Database

### Authentication

* JWT Tokens
* bcrypt Password Hashing
* Email OTP Verification

### Payment Gateway

* Razorpay

### Email Service

* SMTP (Gmail)

### PDF Generation

* Jinja2 Templates
* Playwright
* Chromium

### Version Control

* Git
* GitHub

---

## 📂 Project Structure

```text
pushpakar_bhojnalaya/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── schemas/
│   ├── database/
│   ├── uploads/
│   ├── invoices/
│   ├── templates/
│   ├── auth.py
│   ├── email_service.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── images/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── menu.html
│   ├── cart.html
│   ├── login.html
│   └── orders.html
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Garvithindoliya16/pushpakar-bhojnalaya.git

cd pushpakar-bhojnalaya
```

---

### Create Virtual Environment

```bash
python -m venv .venv
```

Activate:

```bash
.venv\Scripts\activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

SECRET_KEY=
ALGORITHM=HS256

EMAIL_USER=
EMAIL_PASS=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

ADMIN_PANEL_USERNAME=
ADMIN_PANEL_PASSWORD=
```

---

### Run Backend

```bash
uvicorn main:app --reload
```

---

### Run Frontend

Use VS Code Live Server or any static server:

```bash
frontend/index.html
```

---

## 📸 Screenshots

### Home Page

* Restaurant Landing Page
* Hero Section
* About Section
* Contact Section

### Menu Page

* Dynamic Dish Listing
* Categories
* Add to Cart

### Cart Page

* Quantity Management
* Order Placement
* Razorpay Integration

### Admin Dashboard

* Dish Management
* Order Management
* OTP Login

---

## 🔥 Future Enhancements

* Order Status Tracking

  * Pending
  * Preparing
  * Out For Delivery
  * Delivered
  * Cancelled

* Customer Order History

* Sales Analytics Dashboard

* Inventory Management

* Restaurant Staff Panel

* SMS Notifications

* Customer Reviews & Ratings

* Progressive Web App (PWA)

---

## 🎯 Learning Outcomes

Through this project I gained practical experience in:

* Full-Stack Development
* Backend Architecture
* REST API Development
* PostgreSQL Database Design
* Payment Gateway Integration
* Authentication & Authorization
* Email Automation
* PDF Generation
* Production-Level Project Structure
* Real Business Software Development

---

## 👨‍💻 Author

**Garvit Hindoliya**

Software Developer | FastAPI | Python | PostgreSQL | AI & ML Enthusiast

LinkedIn:
https://www.linkedin.com/in/garvithindoliya/

GitHub:
https://github.com/Garvithindoliya16

---

⭐ If you found this project useful, consider giving it a star.
# 🍛 Pushpakar Bhojnalaya

A full-stack Restaurant Ordering & Management System built for a real restaurant business to streamline customer ordering, payments, invoice generation, and restaurant administration.

---

## 🚀 Overview

Pushpakar Bhojnalaya is a modern restaurant management platform that allows customers to browse the menu, place orders, make online payments, receive invoices via email, and enables administrators to manage dishes and customer orders through a secure dashboard.

This project was developed for a real restaurant business and focuses on providing a smooth ordering experience while reducing manual work for restaurant management.

---

## ✨ Features

### 🍽️ Customer Features

* Browse restaurant menu
* Categorized dishes
* Add items to cart
* Update item quantities
* Remove items from cart
* Responsive mobile-friendly UI
* Customer details validation
* Cash On Delivery (COD)
* Online Payments using Razorpay
* WhatsApp ordering integration
* Google Maps location integration

---

### 💳 Payment System

* Razorpay Payment Gateway Integration
* Secure online payments
* COD support
* Payment status tracking
* Payment method tracking
* Order creation after successful payment

---

### 📄 Invoice Generation

* Automatic invoice generation
* PDF invoice download
* Restaurant-branded invoice design
* Item-wise billing
* Customer details included
* Order summary included

---

### 📧 Email Automation

* Customer order confirmation email
* PDF invoice attachment
* Admin order notification email
* Automated SMTP integration

---

### 🔐 Authentication & Security

* JWT Authentication
* Password Hashing using bcrypt
* OTP-based Admin Login Verification
* Protected Admin Routes
* Environment Variable Management

---

### 👨‍💼 Admin Dashboard

* Secure Login
* OTP Verification
* Add New Dishes
* Upload Dish Images
* Manage Categories
* View Customer Orders
* Track Payment Method
* Track Payment Status
* Logout Functionality

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Font Awesome

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL
* Neon Database

### Authentication

* JWT Tokens
* bcrypt Password Hashing
* Email OTP Verification

### Payment Gateway

* Razorpay

### Email Service

* SMTP (Gmail)

### PDF Generation

* Jinja2 Templates
* Playwright
* Chromium

### Version Control

* Git
* GitHub

---

## 📂 Project Structure

```text
pushpakar_bhojnalaya/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── schemas/
│   ├── database/
│   ├── uploads/
│   ├── invoices/
│   ├── templates/
│   ├── auth.py
│   ├── email_service.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── images/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── menu.html
│   ├── cart.html
│   ├── login.html
│   └── orders.html
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Garvithindoliya16/pushpakar-bhojnalaya.git

cd pushpakar-bhojnalaya
```

---

### Create Virtual Environment

```bash
python -m venv .venv
```

Activate:

```bash
.venv\Scripts\activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

SECRET_KEY=
ALGORITHM=HS256

EMAIL_USER=
EMAIL_PASS=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

ADMIN_PANEL_USERNAME=
ADMIN_PANEL_PASSWORD=
```

---

### Run Backend

```bash
uvicorn main:app --reload
```

---

### Run Frontend

Use VS Code Live Server or any static server:

```bash
frontend/index.html
```

---

## 📸 Screenshots

### Home Page

* Restaurant Landing Page
* Hero Section
* About Section
* Contact Section

### Menu Page

* Dynamic Dish Listing
* Categories
* Add to Cart

### Cart Page

* Quantity Management
* Order Placement
* Razorpay Integration

### Admin Dashboard

* Dish Management
* Order Management
* OTP Login

---

## 🔥 Future Enhancements

* Order Status Tracking

  * Pending
  * Preparing
  * Out For Delivery
  * Delivered
  * Cancelled

* Customer Order History

* Sales Analytics Dashboard

* Inventory Management

* Restaurant Staff Panel

* SMS Notifications

* Customer Reviews & Ratings

* Progressive Web App (PWA)

---

## 🎯 Learning Outcomes

Through this project I gained practical experience in:

* Full-Stack Development
* Backend Architecture
* REST API Development
* PostgreSQL Database Design
* Payment Gateway Integration
* Authentication & Authorization
* Email Automation
* PDF Generation
* Production-Level Project Structure
* Real Business Software Development

---

## 👨‍💻 Author

**Garvit Hindoliya**

Software Developer | FastAPI | Python | PostgreSQL | AI & ML Enthusiast

LinkedIn:
https://www.linkedin.com/in/garvithindoliya/

GitHub:
https://github.com/Garvithindoliya16

---

⭐ If you found this project useful, consider giving it a star.
<img width="1919" height="874" alt="Screenshot 2026-06-01 193456" src="https://github.com/user-attachments/assets/2175bd03-0229-476a-8bc3-8e3efe04ce48" />
<img width="1919" height="872" alt="Screenshot 2026-06-01 193328" src="https://github.com/user-attachments/assets/ae0716e1-85ab-45d8-b242-431cf239e906" />
<img width="1919" height="868" alt="Screenshot 2026-06-01 193317" src="https://github.com/user-attachments/assets/38a9af06-a379-47da-9af2-4ec5ba6230db" />
<img width="1919" height="871" alt="Screenshot 2026-06-01 193240" src="https://github.com/user-attachments/assets/333d1ac1-3252-4f6d-93af-3b48f3b1bd3d" />
<img width="496" height="707" alt="Screenshot 2026-06-01 193138" src="https://github.com/user-attachments/assets/36f28a6a-c1f7-43a1-9409-9f6480676be6" />
<img width="599" height="609" alt="Screenshot 2026-06-01 193729" src="https://github.com/user-attachments/assets/693780fb-c3c0-4b50-8849-4ccfd8a34b28" />
<img width="1919" height="878" alt="Screenshot 2026-06-01 192959" src="https://github.com/user-attachments/assets/903ba1ef-ff6b-4cca-9dee-e35a86494737" />
<img width="1919" height="871" alt="Screenshot 2026-06-01 193058" src="https://github.com/user-attachments/assets/5e69055d-c762-4921-84e7-8ad10e504915" />
<img width="1919" height="867" alt="Screenshot 2026-06-01 192812" src="https://github.com/user-attachments/assets/cce7a22c-2e69-41cf-a84c-d7957bd0e5c8" />
<img width="1919" height="869" alt="Screenshot 2026-06-01 192730" src="https://github.com/user-attachments/assets/462aeb0e-4d52-4d31-b037-a277aaeb7247" />
