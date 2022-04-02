//referenciando html principal
let emailRef = document.querySelector('#inputEmail')
let passwordRef = document.querySelector('#inputPassword')
let buttonRef = document.querySelector('#submitBtn')

let infoUser = {};

//relizando login
buttonRef.addEventListener('click', event => {
    event.preventDefault()

    //verifica se input esta vazio
    function isEmpty(input) {
        return input.value.trim() === "";
    };

    //adiciona o alert box
    function addAlert(a, b) {
        a.innerHTML = ""
        a.innerHTML += '<p>Este campo é obrigatorio</p>'
        b.style.border = '1px solid red';
    };

    //desativa o alert box
    function unableAlert(query, input) {
        input.addEventListener('keyup', () => {
            query.innerHTML = ""
            input.style.border = '0px'
        })
    };

    //adiciona alert box verificacao senha
    function addAlertPassword(query, ref, m) {
        query.innerHTML = ""
        query.innerHTML += `<p>${m}</p>`
        ref.style.border = '1px solid red';
    };

    //desativar alerta box
    unableAlert(document.querySelector("#errorEmail"), emailRef)
    unableAlert(document.querySelector("#errorSenha"), passwordRef)

    //condicional
    if (isEmpty(emailRef)) {
        addAlert(document.querySelector("#errorEmail"), emailRef)
    }
    else if (isEmpty(passwordRef)) {
        addAlert(document.querySelector("#errorSenha"), passwordRef)
    }
    else if (passwordRef.value.trim().length < 6) {
        addAlertPassword(document.querySelector("#errorSenha"), passwordRef, 'Minimo de 6 caracteres')
    }
    else if (passwordRef.value.trim().search(/[a-z]/) < 0) {
        addAlertPassword(document.querySelector("#errorSenha"), passwordRef, 'Minimo de 1 letra minuscula')
    }
    else if (passwordRef.value.trim().search(/[A-Z]/) < 0) {
        addAlertPassword(document.querySelector("#errorSenha"), passwordRef, 'Minimo de 1 letra maiuscula')
    }
    else if (passwordRef.value.trim().search(/[0-9]/) < 0) {
        addAlertPassword(document.querySelector("#errorSenha"), passwordRef, 'Minimo de 1 numero')
    }
    else {
        infoUser.email = emailRef.value.trim()
        infoUser.password = passwordRef.value.trim()
        window.location.href = "http://127.0.0.1:5500/tarefas.html"
        localStorage.setItem('email', infoUser.email)
    }
});

