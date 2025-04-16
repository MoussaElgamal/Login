let submit = document.getElementById("submit")
let btnLogin = document.getElementById("btnLogin")
let name_value = document.getElementById("myName")
let email = document.getElementById("myEmail")
let password = document.getElementById("myPassword")
let alert_signup = document.getElementById("alert-signup")
let success_signup = document.getElementById("success-signup")
let myHome = document.getElementById("myHome")

const nameRegex = /^[A-Za-zÄÖÜäöüß\s'-]+$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^.+$/;


let users = JSON.parse(localStorage.getItem("users")) || []; 


document.addEventListener('click', function(event) {
    if (event.target.matches('#btnLogOut')) {
        myHome.classList.add("d-none");
    }
  })


submit.addEventListener("click", function(){
    console.log()
    if(submit.textContent == "Sign Up")
    {
      
       

        name_value.classList.remove("d-none");
        submit.textContent = "Sign In";
        btnLogin.textContent = "Sign Up"

       

    }
    else if (submit.textContent == "Sign In"){
        name_value.classList.add("d-none")
        submit.textContent = "Sign Up"
        btnLogin.textContent = "Log In"
    }
})



function isExisted(user)
{
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i].email == user.email) {
                return true;
            }
        }
    
        return false;
}


function findByEmail(email)
{
    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            return users[i].name;
        }
    }
}


function checkCredentials(user)
{
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i].email == user.email) {
                if(users[i].password == user.password)
                {
                    return { success: true, message: "" };
                }
                else
                {
                    return { success: false, message: "Password is incorrect" };
                }
            }
        }
        
        
        return { success: false, message: "not valid" };
}



btnLogin.addEventListener("click", function(){
    console.log()
    if(btnLogin.textContent == "Sign Up")
    {
      
        let user = {
            name : name_value.value,
            email : email.value,
            password : password.value,

        }

        if(nameRegex.test(name_value.value) &&  emailRegex.test(email.value) && passwordRegex.test(password.value) && (!isExisted(user))) {
            
       
            users.push(user)
            localStorage.setItem("users",JSON.stringify(users))

            //signup failed
            alert_signup.classList.add("d-none");
            success_signup.classList.remove("d-none");

            //return login
            name_value.classList.add("d-none")
            submit.textContent = "Sign Up"
            btnLogin.textContent = "Log In"

            console.log(users)

        }
        else {
            //signup not successed
            
            let message = ""
            if(!nameRegex.test(name_value.value))
            {
                message = "Enter a valid Name"
            }
            else if(!emailRegex.test(email.value))
                {
                    message = "Enter a valid Email"
                }
            else if(!passwordRegex.test(password.value))
            {
                        message = "Enter a valid password"
            }
            else if(isExisted(user)){
                  message = "User is already existed"
            }    
            document.getElementById("alert-signup").textContent = `Sign up Failed: ${message}` ;  
            
            alert_signup.classList.remove("d-none");
            success_signup.classList.add("d-none");

        }



       

    }
    else if (btnLogin.textContent== "Log In"){
       
       //remove signup akerts (failed and success) 
       success_signup.classList.add("d-none");
       alert_signup.classList.add("d-none");
       
       let user = {
        email : email.value,
        password : password.value,

    }
    let result = checkCredentials(user);
    if(  result.success)
    {
        console.log("log in")
        myHome.classList.remove("d-none");
        console.log(findByEmail(user.email))
        myHome.innerHTML = `<h1 class="text-center text-bg-success">Welcome ${findByEmail(user.email)}</h1>
                            <button id="btnLogOut" class="py-2 px-3  mt-5 text-center form-control w-25 mx-auto text-white bg-warning fs-5" >Log Out</button>`
                 
    }

    else{
        alert(result.message)
    }



      
    }
})



