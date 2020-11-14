
//checking for the fibinaci
let fib = function fib (n){
    let data = {}
    for(i=0; i<n+1; i++){
        if(i == 0){
            data[i] = 0
        }
        else if(i == 1){
            data[i] = 1
        }   
        else{
            data[i] = data[i-2] + data[i-1]
        }
    }
    return data[n]
}

//checking for prime numbers. 
let prim = function prim(n){
    for(var i = 2; i < n; i++){
        if(n % i === 0){
            return false;
        }
    }
    return n > 1;
}

//getting the values from the form input, button and id or classes
let mySearch = document.getElementById('search');
let myButton = document.querySelector('.btnClass');
let myForm = document.querySelector('.new-post-form');
let pi = document.getElementById("fail")

//checking for a valid form
if(myForm){
    myForm.addEventListener('submit', function(event){
        event.preventDefault();
        if (mySearch.value.trim()){

            //making sure we dont take negative numers 
            if(mySearch.value < 0){
                document.getElementById("fail").innerHTML =  "Input is less than 0, enter a number greater than 0"
                document.getElementById("fail").style.visibility = "visible"
            }
            else{
                var li = document.createElement("li");
                let output = "The Fibonacci of " + mySearch.value +  " is " + fib(parseInt(mySearch.value)) + " ."
                var text = document.createTextNode(output);
                li.appendChild(text);
                document.getElementById("results").appendChild(li);
                if(prim(fib(parseInt(mySearch.value)))){
                    li.className = 'is-prime'
                }
                else{
                    li.className = 'not-prime'
                }
                myForm.reset();
                document.getElementById("fail").style.visibility = "hidden"
            }
        }
        //if input is empty
        else{
            document.getElementById("fail").innerHTML =  "Input is empy, Please input a number"
            document.getElementById("fail").style.visibility = "visible"
        }
    })
}

