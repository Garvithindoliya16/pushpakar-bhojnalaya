const API_URL = "http://127.0.0.1:8000";

function showToast(message, type){
    const toast =document.getElementById("toast")
    toast.innerText=message
    toast.className =`toast ${type} show`
    setTimeout(() => {
        toast.classList.remove("show")
    }, 3000)
}

async function adminLogin(event) {
    const loginBtn =document.getElementById("loginBtn")
    loginBtn.disabled = true
    loginBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending OTP...`
    event.preventDefault();

    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    const response = await fetch(`${API_URL}/login`,{
    method: "POST",
    body: formData,
    });

    const data = await response.json();

    if (response.ok) {
    loginBtn.disabled = false
    adminEmail = email
    showToast("OTP sent to email","success")
    document.getElementById("otp").style.display = "block"
    loginBtn.style.display = "none"
    document.getElementById("verifyBtn").style.display = "block"
    } else {
    loginBtn.disabled = false
    loginBtn.innerHTML =
    "Send OTP"
    document.getElementById("loginError").innerText =
        "Invalid Email or Password";
    }
}


async function verifyOTP(){
    const verifyBtn =document.getElementById("verifyBtn")
    verifyBtn.disabled = true
    verifyBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Verifying OTP...`

    const otp = document.getElementById("otp").value
    const response =await fetch(`${API_URL}/verify-otp`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email:adminEmail,
            otp:otp
            })
        }
    )

    const data = await response.json()
    if(response.ok){
        localStorage.setItem("token",data.access_token)
        verifyBtn.innerHTML = `Verified`
        showToast("Login Successful 🎉","success")
        await sleep(1000);
        window.location.href ="admin.html"
    }else{
        verifyBtn.disabled=false
        verifyBtn.innerHTML="Verify OTP"
        showToast(data.detail,"error")
    }
}


function sleep(ms){
    return new Promise((resolve) => {setTimeout(resolve, ms)})
}