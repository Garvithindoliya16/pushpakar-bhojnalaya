const API_URL = "http://127.0.0.1:8000";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "admin-login.html";
}

async function loadOrders() {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const orders = await response.json();

  const ordersContainer = document.getElementById("ordersContainer");

  ordersContainer.innerHTML = "";

  orders.forEach((order) => {

    const items =
        JSON.parse(order.items)



    const itemsHtml =
        items.map(item => `

            <li>

                ${item.name}

                ×

                ${item.quantity}

                - ₹${item.price}

            </li>

        `).join("")



    const card =
        document.createElement("div")



    card.classList.add(
        "order-card"
    )



    card.innerHTML = `

        <div class="order-header">

            <h2>

                ${order.customer_name}

            </h2>

            <div class="order-total">

                ₹${order.total}

            </div>

        </div>



        <div class="order-info">

            <p>

                📞 ${order.phone}

            </p>



            <p>

                📍 ${order.address}

            </p>



            <p>

                💳 ${order.payment_method}

            </p>



            <p>

                ✅ ${order.payment_status}

            </p>

        </div>



        <h3>

            Ordered Items

        </h3>



        <ul class="items-list">

            ${itemsHtml}

        </ul>

    `



    ordersContainer.appendChild(
        card
    )

})
}
function logout(){

    localStorage.removeItem("token")

    window.location.href =
        "admin-login.html"
}


loadOrders();
