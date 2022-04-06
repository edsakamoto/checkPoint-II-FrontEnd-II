let userNameReference = document.querySelector('#userName');
let cadastroTarefaReference = document.querySelector('#cadastroTarefa');
let novaTarefaReference = document.querySelector('#novaTarefa');
let tarefasPendentesReference = document.querySelector('.tarefas-pendentes');
let dados = [];
let requestHeaders = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
}
let requestConfiguration = {
    headers: requestHeaders
};


fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe',requestConfiguration)
    .then(response =>{
            response.json()
                .then(data =>{
                    console.log(data)
                    userNameReference.innerHTML += `${data.firstName} ${data.lastName}`;
                    dados.push(data);
                    localStorage.setItem('idUser',data.id)
                    localStorage.setItem('firstNameUser',data.firstName)
                    localStorage.setItem('lastNameUser',data.lastName)
                    localStorage.setItem('emailUser',data.email)
                })
    })
    

cadastroTarefaReference.addEventListener('click',event =>{
    
    event.preventDefault();

    let posts = {
        description: novaTarefaReference.value.trim(),
        completed: false
    };

    let requestConfigurationPost = {
        method:'POST',
        body: JSON.stringify(posts),
        headers: requestHeaders
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks',requestConfigurationPost)
        .then(response =>{
            response.json()
                .then(data => {
                    console.log(data)
                    tarefasPendentesReference.innerHTML += `
                    <div id="">
                    <li class="tarefa">
                    <div class="not-done"></div>
                    <div class="descricao">
                    <p class="nome">${data.description}</p>
                    <p class="timestamp">${data.createdAt}</p>
                    </div>
                    `
                })
        })

})