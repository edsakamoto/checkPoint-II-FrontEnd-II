let userNameReference = document.querySelector('#userName');
let cadastroTarefaReference = document.querySelector('#cadastroTarefa');
let novaTarefaReference = document.querySelector('#novaTarefa');
let tarefasPendentesReference = document.querySelector('.tarefas-pendentes');
let tarefasTerminadasReference = document.querySelector('.tarefas-terminadas');
let closeAppReference = document.querySelector('#closeApp');

let requestHeaders = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
}
let requestConfiguration = {
    headers: requestHeaders
};

let requestConfigurationPut = {
    method:'PUT',    
    headers: requestHeaders
}

let requestDeleteConfiguration = {
    method: 'DELETE',
    headers: requestHeaders
}

//colocar o getme numa função
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe',requestConfiguration)
    .then(response =>{
            response.json()
                .then(data =>{
                   
                    userNameReference.innerHTML += `${data.firstName} ${data.lastName}`;
                   
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

        novaTarefaReference.value = ''

        

        fetch('https://ctd-todo-api.herokuapp.com/v1/tasks',requestConfigurationPost)
            .then(response =>{
                if(response.ok){
                   
                    obterLista();

                } else {
                    alert('falha ao tentar realizar cadastro de nova tarefa')
                }
            })
    

})

function obterLista(){

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks',requestConfiguration)
    .then(response =>{        
       
        if(response.ok){            
           
            response.json()
                .then(tasks =>{
                    
                    if(tasks.length === 0){

                        /* somente para manter a estrutura skeleton caso n encontre nenhum valor no objeto retornado */
                        if(window.localStorage){
                            if(!localStorage.getItem('firstLoad')){
                                localStorage['firstLoad'] = true;
                                window.location.reload();
                            } else {
                                localStorage.removeItem('firstLoad');
                            }
                        }

                    } else{

                        /*--reseta a "lista" do html atual para n duplicar ao passar nas funcoes atualizaTarefa() e deletarTarefa()--*/
                    tarefasTerminadasReference.innerHTML = ''
                    tarefasPendentesReference.innerHTML = ''
                    /*-------------------------------------*/                   

                    for(task in tasks){
                   
                        const dataAtual = new Date(tasks[task].createdAt);
                        const dataFormatada = dataAtual.toLocaleDateString('pt-BR',{
                            day:'2-digit',
                            month:'2-digit',
                            year:'numeric'
                        })

                        if(tasks[task].completed){   
                            
                            tarefasTerminadasReference.innerHTML += `
                             <li class="tarefa">
                                 <div class="not-done" onclick="atualizaTarefa(${tasks[task].id},'false')"></div>
                                 <div class="descricao">
                                    <p class="nome">${tasks[task].description}</p>
                                    <p class="timestamp">Criada em: ${dataFormatada}</p>
                                </div>    
                                <img src="https://img.icons8.com/fluency/344/minus.png" alt="logo de menos" onclick="deletarTarefa(${tasks[task].id})">                            
                             </li>                            
                            `

                        } else {
                            tarefasPendentesReference.innerHTML += `
                            <li class="tarefa">
                                <div class="not-done" onclick="atualizaTarefa(${tasks[task].id},'true')"></div>
                                <div class="descricao">
                                    <p class="nome">${tasks[task].description}</p>
                                    <p class="timestamp">Criada em: ${dataFormatada}</p>
                                </div>
                            </li>
                            `
                        }

                        
                    }

                    }

                    
                })

        }
    })

}

function atualizaTarefa(id,completed){

    requestConfigurationPut.body = JSON.stringify({completed: completed})

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`,requestConfigurationPut)
        .then(response =>{

            if(response.ok){

                obterLista();

            }
            
        })
}

function deletarTarefa(id){

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`,requestDeleteConfiguration)
    .then(
        response => {

            if(response.ok){

                obterLista();

            }

        }

    )

}

function logOutUser(){

    localStorage.clear()
    window.location.href = './index.html'
}

closeAppReference.addEventListener('click',event =>{

    event.preventDefault();
    logOutUser();
    
})

obterLista()