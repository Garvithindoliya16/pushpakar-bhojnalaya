const token =localStorage.getItem("token")

if(!token){
    window.location.href = "admin-login.html"
}


menu_category=["Special Dishes","Punjabi Zaika","Dal","Rajasthani Special","Veg","Rice","Curd / Raita","Roti / Naan / Paratha"]

const API_URL = "http://127.0.0.1:8000"

// LOAD MENU

async function loadAdminMenu(){
    const response =await fetch(`${API_URL}/menu`)
    const menu = await response.json()

    const container = document.getElementById("adminMenuContainer")
    container.innerHTML = ""
    menu.forEach((item) => {
        container.innerHTML += `
            <div class="admin-menu-card">

                <!-- IMAGE -->
                <img src="${item.image}">

                <!-- INFO -->
                <div class="admin-menu-info">
                    <input type="text" id="name-${item.id}" value="${item.name}">
                    <input type="text" id="description-${item.id}" value="${item.description}">
                    <input type="number" id="price-${item.id}" value="${item.price}">
                    <select id="category-${item.id}">

                        ${menu_category.map(category => `
                            <option value="${category}"
                                ${item.category === category
                                    ?
                                    "selected"
                                    :
                                    ""
                                }
                            >

                                ${category}

                            </option>

                        `).join("")}

                    </select>

                </div>




                <!-- ACTIONS -->
                <div class="admin-actions">
                    <button class="update-btn" onclick="updateMenuItem(${item.id})">Update</button>
                    <button class="delete-btn" onclick="deleteMenuItem(${item.id})">Delete</button>
                </div>

            </div>
        `
    })
}

function showToast(message, type){
    const toast =document.getElementById("toast")
    toast.innerText=message
    toast.className =`toast ${type} show`
    setTimeout(() => {
        toast.classList.remove("show")
    }, 3000)
}

//  ADD MENU ITEM
async function addMenuItem(){
    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    const price =document.getElementById("price").value
    const category =document.getElementById("category").value
    const image =document.getElementById("image").files[0]
    const formData =new FormData()

    formData.append("name",name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("category",category)
    formData.append("image",image)

    const response =
        await fetch(
            `${API_URL}/menu`,
            {
                method: "POST",
                headers: {
                    Authorization:`Bearer ${token}`
                },
                body: formData
            }
        )



    if(response.ok){
        showToast("Dish Added Successfully","success")
        document.getElementById("menuForm").reset()
        loadAdminMenu()
    }
}



//    UPDATE MENU ITEM

async function updateMenuItem(id){
    const name =document.getElementById(`name-${id}`).value
    const description =document.getElementById(`description-${id}`).value
    const price =document.getElementById(`price-${id}`).value
    const category =document.getElementById(`category-${id}`).value


    const formData = new FormData()
    formData.append("name",name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("category",category)

    const response =
        await fetch(
            `${API_URL}/menu/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                },

                body: formData
            }
        )
    if(response.ok){
        showToast("Dish Updated Successfully","success")
        loadAdminMenu()
    }
}



//    DELETE ITEM

async function deleteMenuItem(id){
    const response =
        await fetch(
            `${API_URL}/menu/${id}`,
            {

                method: "DELETE",

                headers: {

                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
    if(response.ok){
        showToast("Dish Added Successfully","success")
        loadAdminMenu()
    }
}



/* =========================
   FORM SUBMIT
========================= */

document
    .getElementById("menuForm")
    .addEventListener(
        "submit",
        async function(event){

            event.preventDefault()

            await addMenuItem()
        }
    )



/* =========================
   LOGOUT
========================= */

function logout(){

    localStorage.removeItem("token")

    window.location.href =
        "admin-login.html"
}



/* =========================
   INITIAL LOAD
========================= */

loadAdminMenu()