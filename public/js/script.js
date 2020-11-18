
//handing the donner sign in and registration page
let signup_d = document.getElementById("signup_d") // by default the sign up page should be hidden until the link is signup link is clicked
let login_d = document.getElementById("login_d")
let signup_d2 = document.getElementById("signup_d2")
let signin_d2 = document.getElementById("signin_d2")
let donnor_login = document.getElementById("donnor_login")


if(login_d){
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
}
else{
    // //handing the needy/receivers login and sign up page

    let form_login_id = document.getElementById("form_login_id") //login form id
    let form_signup_id = document.getElementById("form_signup_id") //sign up form id
    let form_signup_2 = document.getElementById("form_signup_2") //sign up form 2
    let form_2_signin = document.getElementById("form_2_signin")
    form_signup_2.hidden = true; //by default

    // //used to switch to the sign up page when clicked
    form_signup_id.addEventListener("click", function(event){
        event.preventDefault();
        
        form_login_id.hidden = true;
        form_signup_2.hidden = false;
    })

    //used to switch to the sign in page when clicked
    form_2_signin.addEventListener("click", function(event){
        event.preventDefault();
        form_signup_2.hidden = true;
        form_login_id.hidden = false; 
    })

}










