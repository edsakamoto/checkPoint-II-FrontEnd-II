let createUserReference = document.querySelector('#createUser');
let firstNameReference = document.querySelector('#firstName');
let lastNameReference = document.querySelector('#lastName');
let emailCadastroReference = document.querySelector('#emailCadastro');
let passwordCadastroReference = document.querySelector('#passwordCadastro');

createUserReference.addEventListener('click',event =>{
    
    event.preventDefault();

    let users = {

        firstName: firstNameReference.value.trim(),
        lastName: lastNameReference.value.trim(),
        email: emailCadastroReference.value.trim(),
        password: passwordCadastroReference.value
        
    }

    let requestHeaders = {

        'Content-Type': 'application/json'
    }

    let requestConfiguration = {

        method: 'POST',
        body: JSON.stringify(users),
        headers: requestHeaders

    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users',requestConfiguration)
        .then(response =>{
                response.json() 
                    .then(data => {
                            // console.log(data.jwt);
                            localStorage.setItem('token',data.jwt);
                            // if(data.ok){
                            //     window.location.href = './index.html'                                
                            // }
                    })
        })


})