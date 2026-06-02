const API_URL = "http://127.0.0.1:8000";

const hamburger = document.getElementById("hamburger");

const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active")
    if(navLinks.classList.contains("active")){
        hamburger.innerHTML = "✕"
    }else{
        hamburger.innerHTML = "☰"
        }
});










/* SCROLL ANIMATION */

window.addEventListener("scroll", reveal);

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;

    const revealTop = section.getBoundingClientRect().top;

    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {
      section.classList.add("active");
    }
  });
}

reveal();

async function loadMenu() {
  const response = await fetch(`${API_URL}/menu`);
  const menu = await response.json();

  const menuContainer = document.getElementById("menuContainer");

  menuContainer.innerHTML = "";
  menu.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("menu-card");
    card.innerHTML = `
            <img src="${item.image}">
            <div class="menu-content">
                <div class="menu-top">
                    <h3>${item.name}</h3>
                    <span>₹${item.price}</span>
                </div>
                <p>${item.description}</p>
            </div>
            <button
                class="cart-btn"
                onclick='addToCart(
                    ${JSON.stringify(item)}
                )'
            >
                Add To Cart
            </button>
        `;

    menuContainer.appendChild(card);
  });
}

loadMenu();

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || []


function addToCart(item){

    const existingItem =
        cart.find(
            cartItem => cartItem.id === item.id
        )

    if(existingItem){

        existingItem.quantity += 1

    }else{

        item.quantity = 1

        cart.push(item)
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    )

    alert(`${item.name} added to cart`)
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");

  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += Number(item.price);

    const div = document.createElement("div");

    div.innerHTML = `

            <p>
                ${item.name}
                - ₹${item.price}
            </p>
        `;

    cartItems.appendChild(div);
  });

  cartTotal.innerHTML = `Total: ₹${total}`;
}

function openAdmin(){
    window.location.href =
        "admin-login.html"
}

function updateCartCount(){

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || []



    let totalItems = 0



    cart.forEach((item) => {

        totalItems +=
            item.quantity
    })



    const cartCount =
        document.getElementById(
            "cartCount"
        )



    if(cartCount){

        cartCount.innerText =
            totalItems
    }
}

updateCartCount()