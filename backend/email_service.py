import smtplib
import os
import json
from dotenv import load_dotenv
from email.message import EmailMessage

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def send_order_email(order, invoice_path):
    items_list = json.loads(order.items)
    formatted_items = ""
    for item in items_list:
        formatted_items += f"""

• {item['name']}

  Quantity: {item['quantity']}
  Price: ₹{item['price']}
  Total: ₹{float(item['price']) * float(item['quantity'])}

"""



    # =========================
    # ADMIN EMAIL
    # =========================

    admin_msg = EmailMessage()

    admin_msg["Subject"] = \
        "New Bhojnalaya Order"

    admin_msg["From"] = \
        EMAIL_USER

    admin_msg["To"] = \
        EMAIL_USER



    admin_body = f"""
New Order Received 🍛

Customer:{order.customer_name}

Email:{order.email}

Phone:{order.phone}

Address:{order.address}

Ordered Items:{formatted_items}

Total Amount:₹ {order.total}

Payment Method:{order.payment_method}
Payment Status:{order.payment_status}

Customer invoice PDF is attached with this email.
"""



    admin_msg.set_content(
        admin_body
    )



    # =========================
    # ATTACH PDF TO ADMIN
    # =========================

    with open(invoice_path, "rb") as f:

        file_data = f.read()

        file_name = os.path.basename(
            invoice_path
        )



    admin_msg.add_attachment(
        file_data,
        maintype="application",
        subtype="pdf",
        filename=file_name
    )



    # =========================
    # CUSTOMER EMAIL
    # =========================

    customer_msg = EmailMessage()

    customer_msg["Subject"] = \
        "Order Confirmation - Pushpakar Bhojnalaya"

    customer_msg["From"] = \
        EMAIL_USER

    customer_msg["To"] = \
        order.email



    customer_body = f"""
Hello {order.customer_name},

Thank you for ordering from Pushpakar Bhojnalaya 🍛

Your order has been received successfully.


Ordered Items:
{formatted_items}


Total Amount:
₹ {order.total}

Payment Method:{order.payment_method}
Payment Status:{order.payment_status}

Your invoice PDF is attached with this email.

We will contact you soon.

धन्यवाद 🙏
"""



    customer_msg.set_content(
        customer_body
    )



    # =========================
    # ATTACH PDF TO CUSTOMER
    # =========================

    customer_msg.add_attachment(
        file_data,
        maintype="application",
        subtype="pdf",
        filename=file_name
    )



    # =========================
    # SMTP SERVER
    # =========================

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )
    server.starttls()
    server.login(
        EMAIL_USER,
        EMAIL_PASS
    )



    # =========================
    # SEND EMAILS
    # =========================

    server.send_message(admin_msg)
    server.send_message(customer_msg)
    server.quit()



    # =========================
    # DELETE PDF AFTER SENDING
    # =========================

    if os.path.exists(invoice_path):
        os.remove(invoice_path)

def send_otp_email(email,otp):
    msg = EmailMessage()
    msg["Subject"] = \
        "Pushpakar Admin Login OTP"

    msg["From"] = \
        EMAIL_USER

    msg["To"] = \
        email

    msg.set_content(f"""

Your OTP for Pushpakar Admin Login is:

{otp}

This OTP is valid for 5 minutes.

If you did not request this login,
please ignore this email.
""")

    server = smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login(EMAIL_USER,EMAIL_PASS)
    server.send_message(msg)
    server.quit()