
//handing the donner sign in and registration page
let signup_d = document.getElementById("signup_d") // by default the sign up page should be hidden until the link is signup link is clicked
let login_d = document.getElementById("login_d")
let signup_d2 = document.getElementById("signup_d2")
let signin_d2 = document.getElementById("signin_d2")

signup_d.hidden = true; //by default


//used to switch to the sign up page when clicked
signup_d2.addEventListener("click", function(event){
    event.preventDefault();
    
    login_d.hidden = true;
    signup_d.hidden = false;
})

//used to switch to the sign in page when clicked
signin_d2.addEventListener("click", function(event){
    event.preventDefault();
    signup_d.hidden = true;
    login_d.hidden = false; 
})




