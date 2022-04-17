let createUserReference = document.querySelector('#createUser');
let firstNameReference = document.querySelector('#firstName');
let lastNameReference = document.querySelector('#lastName');
let emailCadastroReference = document.querySelector('#emailCadastro');
let passwordCadastroReference = document.querySelector('#passwordCadastro');
let controladoresReference = document.querySelectorAll('.controlador');
let validador = []

for(let controladorReferencia of controladoresReference){
    
    let inputReferencia = controladorReferencia.children[0]
    let smallReferencia = controladorReferencia.children[1]
    inputReferencia.addEventListener('keyup',event =>{

       if(inputReferencia.checkValidity()){
    
            controladorReferencia.classList.remove('erro')
            createUserReference.disabled = false 
            /* if para validar se as senhas são iguais */
            if(inputReferencia.type === 'password' && inputReferencia.id === 'passwordCadastro'){                
                
                validador[0] = (inputReferencia.value)
                
            } else if (inputReferencia.type === 'password' && inputReferencia.id === 'repetirPassword'){
                
                validador[1] = (inputReferencia.value)
                
                if(validador[0] !== validador[1]){

                    smallReferencia.innerHTML = 'A senha repetida está diferente. Digite novamente '
                    controladorReferencia.classList.add('erro')
                    createUserReference.disabled = true

                }
            }
    
        } else {
    
            controladorReferencia.classList.add('erro')
            createUserReference.disabled = true
    
        }    
    })   
}

createUserReference.addEventListener('click',event =>{
    
    event.preventDefault();

    validador.splice(0, validador.length) //somente para esvaziar os dados gravados, validador foi utilizado durante o listener do keyup

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

                            localStorage.setItem('token',data.jwt);                            
                            window.location.href = './index.html';

                    })
        })

})