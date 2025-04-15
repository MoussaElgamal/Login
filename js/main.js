let submit = document.getElementById("submit")
let name = document.getElementById("myName")
let btnLogin = document.getElementById("btnLogin")
let email = undefined
let password = undefined


submit.addEventListener("click", function(){
    console.log()
    if(submit.textContent == "Sign Up")
    {
    myName.classList.remove("d-none");
    submit.textContent = "Sign In";
    btnLogin.textContent = "Sign Up"
    }
    else if (submit.textContent == "Sign In"){
        myName.classList.add("d-none")
        submit.textContent = "Sign Up"
        btnLogin.textContent = "Log In"
    }
})




