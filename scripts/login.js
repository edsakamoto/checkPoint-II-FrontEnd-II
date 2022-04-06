let inputEmailBtnReference = document.querySelector("#inputEmail");
let inputPasswordBtnReference = document.querySelector("#inputPassword");
let submitBtnReference = document.querySelector('#submitBtn');

submitBtnReference.addEventListener('click',event =>{
    
    event.preventDefault();

    let credentials = {

        email: inputEmailBtnReference.value.trim(),
        password: inputPasswordBtnReference.value 
        
    }

    let requestHeaders = {

        'Content-Type': 'application/json'
    }

    let requestConfiguration = {

        method: 'POST',
        body: JSON.stringify(credentials),
        headers: requestHeaders

    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login',requestConfiguration)
        .then(response =>{
                response.json() 
                    .then(data => {
                            // console.log(data.jwt);
                            localStorage.setItem('token',data.jwt)
                            window.location.href = './tarefas.html'
                    })
        })   


})

