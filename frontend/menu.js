const API_URL =
    "http://127.0.0.1:8000"

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || []
let allMenuItems = []
let currentCategory = "All"


function showToast(message, type){

    const toast =
        document.getElementById(
            "toast"
        )



    toast.innerText =
        message



    toast.className =
        `toast ${type} show`



    setTimeout(() => {

        toast.classList.remove(
            "show"
        )

    }, 3000)
}

async function loadMenu(){

    const response =
        await fetch(`${API_URL}/menu`)

    allMenuItems =
        await response.json()

    renderMenu()
}

function filterMenu(category){

    currentCategory = category

    renderMenu()
}

function searchMenu(){
    renderMenu()
}

function renderMenu(){

    const menuContainer =
        document.getElementById("menuContainer")

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase()

    menuContainer.innerHTML = ""


    let filteredItems = allMenuItems


    /* CATEGORY FILTER */

    if(currentCategory !== "All"){

        filteredItems =
            filteredItems.filter(

                item =>
                    item.category === currentCategory
            )
    }


    /* SEARCH FILTER */

    filteredItems =
        filteredItems.filter(item =>

            item.name
                .toLowerCase()
                .includes(searchValue)
        )


    /* RENDER */

    filteredItems.forEach(item => {

        const card =
            document.createElement("div")

        card.classList.add("menu-card")

        card.innerHTML = `

            <img src="${item.image}">

            <div class="menu-content">

                <div class="menu-top">

                    <h3>
                        ${item.name}
                    </h3>

                    <span>
                        ₹${item.price}
                    </span>

                </div>

                <p>
                    ${item.description}
                </p>

                <div class="menu-buttons">

                    <button
                        class="details-btn"
                        onclick='openModal(
                            ${JSON.stringify(item)}
                        )'
                    >
                        View Details
                    </button>

                    <button
                        class="cart-btn"
                        onclick='addToCart(
                            ${JSON.stringify(item)}
                        )'
                    >
                        Add To Cart
                    </button>

                </div>

            </div>
        `

        menuContainer.appendChild(card)
    })
}

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

    showToast(`${item.name} Added to cart`,"success")
    updateCartCount();

}


let selectedItem = null

let modalQuantity = 1


function openModal(item){

    selectedItem = item

    modalQuantity = 1

    document.getElementById(
        "foodModal"
    ).style.display = "flex"

    document.getElementById(
        "modalImage"
    ).src = item.image

    document.getElementById(
        "modalName"
    ).innerText = item.name

    document.getElementById(
        "modalDescription"
    ).innerText = item.description

    document.getElementById(
        "modalPrice"
    ).innerText = `₹${item.price}`

    document.getElementById(
        "modalQty"
    ).innerText = modalQuantity
}



function closeModal(){

    document.getElementById(
        "foodModal"
    ).style.display = "none"
}



function increaseModalQty(){

    modalQuantity++

    document.getElementById(
        "modalQty"
    ).innerText = modalQuantity
}



function decreaseModalQty(){

    if(modalQuantity > 1){

        modalQuantity--

        document.getElementById(
            "modalQty"
        ).innerText = modalQuantity
    }
}



function addModalToCart(){

    const existingItem =
        cart.find(
            item => item.id === selectedItem.id
        )

    if(existingItem){

        existingItem.quantity += modalQuantity

    }else{

        selectedItem.quantity = modalQuantity

        cart.push(selectedItem)
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    )

    closeModal()

    showToast(`${selectedItem.name} Added to cart`,"success")
    updateCartCount()
}


loadMenu()

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

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});