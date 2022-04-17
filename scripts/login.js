let inputEmailBtnReference = document.querySelector("#inputEmail");
let inputPasswordBtnReference = document.querySelector("#inputPassword");
let submitBtnReference = document.querySelector('#submitBtn');
let controladoresReference = document.querySelectorAll('.controlador');
/*     users criados para teste
user: teste@teste.com / senha: 12345
user: killbill@django.com   / senha: django
*/

for(let controladorReferencia of controladoresReference){
    
    let inputReferencia = controladorReferencia.children[0]

    inputReferencia.addEventListener('keyup',event =>{

       if(inputReferencia.checkValidity()){
    
            controladorReferencia.classList.remove('erro')
            submitBtnReference.disabled = false            
    
        } else {
    
            controladorReferencia.classList.add('erro')
            submitBtnReference.disabled = true
    
        }    
    })   
}

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
            console.log(response)
            if(response.status === 404){

                alert('Usuário não encontrado. Tente novamente.')
                inputEmailBtnReference.value = ''
                inputPasswordBtnReference.value = ''

            } else if (response.status === 400){

                alert('Senha incorreta. Digite novamente.')
                inputPasswordBtnReference.value = ''

            } else if (response.ok){

                response.json()
                    .then(data => {                        
                        localStorage.setItem('token',data.jwt)
                        window.location.href = './tarefas.html'
                    })
            } else {alert('Erro no servidor')}            
        })   
})