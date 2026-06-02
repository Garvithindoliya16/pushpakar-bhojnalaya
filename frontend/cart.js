const API_URL = "http://127.0.0.1:8000";
const WHATSAPP_NUMBER ="917987345022"

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function loadCart() {
  const cartItems = document.getElementById("cartItems");

  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
    
  let total = 0;
  cart.forEach((item, index) => {
    total += Number(item.price) * item.quantity;
    
    const div = document.createElement("div");

    div.classList.add("cart-card");

    div.innerHTML = `

            <div class="cart-item-left">

                <img src="${item.image}">

                <div class="cart-details">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.description}
                    </p>

                    <p class="cart-price">

                        ₹${item.price}

                    </p>

                </div>

            </div>


            <div class="cart-actions">

                <div class="quantity-box">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>
        `;

    cartItems.appendChild(div);
  });

  cartTotal.innerHTML = `Total: ₹${total}`;
}



function removeItem(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

function increaseQuantity(index){

    cart[index].quantity += 1

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    )

    loadCart()
}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity -= 1

    }else{

        cart.splice(index,1)
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    )

    loadCart()
}

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


function validateCustomerDetails(){

    const name =
        document.getElementById("customerName").value.trim()

    const email =
        document.getElementById("customerEmail").value.trim()

    const phone =
        document.getElementById("customerPhone").value.trim()

    const address =
        document.getElementById("customerAddress").value.trim()



    if(!name){

        showToast(
            "Enter your name",
            "error"
        )

        return null
    }



    if(!email){

        showToast(
            "Enter your email",
            "error"
        )

        return null
    }



    if(!phone){

        showToast(
            "Enter your phone number",
            "error"
        )

        return null
    }



    if(phone.length !== 10){

        showToast(
            "Enter valid phone number",
            "error"
        )

        return null
    }



    if(!address){

        showToast(
            "Enter your address",
            "error"
        )

        return null
    }



    return {

        name,
        email,
        phone,
        address
    }
}

function calculateTotal(){

    return cart.reduce((total, item) => {

        return total +
            (
                Number(item.price)
                *
                item.quantity
            )

    }, 0)
}

function setButtonLoading(
    buttonId,
    textId,
    loaderId,
    loading,
    text
){

    const button =
        document.getElementById(buttonId)

    const btnText =
        document.getElementById(textId)

    const btnLoader =
        document.getElementById(loaderId)



    button.disabled = loading

    btnText.innerHTML = text

    btnLoader.style.display =
        loading
        ?
        "inline-block"
        :
        "none"
}

function resetForm(){

    document.getElementById(
        "customerName"
    ).value = ""



    document.getElementById(
        "customerEmail"
    ).value = ""



    document.getElementById(
        "customerPhone"
    ).value = ""



    document.getElementById(
        "customerAddress"
    ).value = ""
}

async function createOrder(
    customerData,
    paymentMethod,
    paymentStatus
){


    const total =
        calculateTotal()



    const response =
        await fetch(
            `${API_URL}/orders`,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    customer_name:
                        customerData.name,

                    email:
                        customerData.email,

                    phone:
                        customerData.phone,

                    address:
                        customerData.address,

                    items:
                        JSON.stringify(cart),

                    total:
                        total.toString(),

                    payment_method:
                        paymentMethod,

                    payment_status:
                        paymentStatus,
                }),
            }
        )



    return response
}





async function placeOrderCOD(){


    if(cart.length === 0){

        showToast(
            "Cart is empty",
            "error"
        )

        return
    }



    const customerData =
        validateCustomerDetails()



    if(!customerData)
        return



    setButtonLoading(

        "placeOrderBtn",

        "btnText",

        "btnLoader",

        true,

        "Placing Order..."
    )



    try{

        const response =
            await createOrder(

                customerData,

                "COD",

                "PENDING"
            )



        if(response.ok){

            const data =
                await response.json()



            showToast(
                "Order placed successfully 🎉",
                "success"
            )



            const invoiceBtn =
                document.getElementById(
                    "invoiceBtn"
                )



            invoiceBtn.style.display =
                "block"



            invoiceBtn.href =
                `${API_URL}/${data.invoice}`



            localStorage.removeItem(
                "cart"
            )



            cart = []

            loadCart()

            resetForm()



            setButtonLoading(

                "placeOrderBtn",

                "btnText",

                "btnLoader",

                false,

                `
                <i class="fa-solid fa-check"></i>
                Order Placed
                `
            )

        }else{

            throw new Error()
        }

    }catch(error){

        setButtonLoading(

            "placeOrderBtn",

            "btnText",

            "btnLoader",

            false,

            `
            <i class="fa-solid fa-rocket"></i>
            Cash On Delivery
            `
        )



        showToast(
            "Something went wrong",
            "error"
        )

        console.log(error)
    }
}





async function placeOrderONLINE(){


    if(cart.length === 0){

        showToast(
            "Cart is empty",
            "error"
        )

        return
    }



    const customerData =
        validateCustomerDetails()



    if(!customerData)
        return



    setButtonLoading(

        "placeOrderBtnONLINE",

        "btnTextONLINE",

        "btnLoaderONLINE",

        true,

        "Processing Payment..."
    )



    const total =
        calculateTotal()



    const response =
        await fetch(
            `${API_URL}/create-payment`,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    amount: total
                })
            }
        )



    const data =
        await response.json()



    const options = {

        key:
            "rzp_test_Su4MiuFT6ln1PX",

        amount:
            data.amount,

        currency:
            "INR",

        name:
            "Pushpakar Bhojnalaya",

        description:
            "Food Order Payment",

        order_id:
            data.order_id,



        method: {

            upi: true,

            card: true,

            netbanking: true,

            wallet: true
        },



        handler:
            async function(){


                showToast(
                    "Payment Successful 🎉",
                    "success"
                )



                const orderResponse =
                    await createOrder(

                        customerData,

                        "ONLINE",

                        "PAID"
                    )



                if(orderResponse.ok){

                    const data =
                        await orderResponse.json()



                    const invoiceBtn =
                        document.getElementById(
                            "invoiceBtn"
                        )



                    invoiceBtn.style.display =
                        "block"



                    invoiceBtn.href =
                        `${API_URL}/${data.invoice}`



                    localStorage.removeItem(
                        "cart"
                    )



                    cart = []

                    loadCart()

                    resetForm()



                    showToast(
                        "Order placed successfully 🎉",
                        "success"
                    )
                }
            }
    }



    const rzp =
        new Razorpay(options)



    rzp.open()



    setButtonLoading(

        "placeOrderBtnONLINE",

        "btnTextONLINE",

        "btnLoaderONLINE",

        false,

        `
        <i class="fa-solid fa-credit-card"></i>
        Pay Online
        `
    )
}



loadCart()