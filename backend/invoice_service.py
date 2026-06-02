from jinja2 import Environment
from jinja2 import FileSystemLoader
from playwright.sync_api import sync_playwright
import os
import json



def parse_items(items_string):
    cart_items =json.loads(items_string)
    parsed = []

    for item in cart_items:
        parsed.append({
            "name":item["name"],
            "qty":item["quantity"],
            "price":item["price"],
            "total":float(item["price"])*float(item["quantity"])
        })
    return parsed

def generate_invoice(order):

    # CREATE FOLDER
    os.makedirs("invoices",exist_ok=True)

    # TEMPLATE ENGINE
    env = Environment(
        loader=FileSystemLoader(
            "templates"
        )
    )

    template =env.get_template("invoice_template.html")

    # RENDER HTML
    html_content =template.render(
            customer_name=order.customer_name,
            email=order.email,
            phone=order.phone,
            address=order.address,
            items=order.items,
            total=order.total,
            order_id=order.id,
            payment_method=order.payment_method,
            payment_status=order.payment_status,
            parsed_items=parse_items(order.items),
        )



    # PDF PATH
    pdf_path = \
        f"invoices/invoice_{order.id}.pdf"

    # GENERATE PDF USING CHROME
    with sync_playwright() as p:
        browser =p.chromium.launch()
        page =browser.new_page()
        page.set_content(html_content)
        page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True
        )
        browser.close()
    return pdf_path




