let userNameReference = document.querySelector('#userName');
let cadastroTarefaReference = document.querySelector('#cadastroTarefa');
let novaTarefaReference = document.querySelector('#novaTarefa');
let tarefasPendentesReference = document.querySelector('.tarefas-pendentes');
let tarefasTerminadasReference = document.querySelector('.tarefas-terminadas');
let closeAppReference = document.querySelector('#closeApp');

//let dados = [];
let requestHeaders = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
}
let requestConfiguration = {
    headers: requestHeaders
};

let requestConfigurationPut = {
    method:'PUT',
    // body: JSON.stringify({completed: true}), //adicionado essa body dentro da função como parametro deixando mais dinamico
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
                   // console.log(data)
                    userNameReference.innerHTML += `${data.firstName} ${data.lastName}`;
                    //dados.push(data);
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

        // let skeletonReference = document.querySelector('#skeleton');
        // skeletonReference.style.display = 'none'

        novaTarefaReference.value = ''

        

        fetch('https://ctd-todo-api.herokuapp.com/v1/tasks',requestConfigurationPost)
            .then(response =>{
                if(response.ok){

                    // response.json()
                    //     .then(data =>{
                    //         console.log(data)
                    //         const dataAtal = new Date(data.createdAt);
                    //         const dataFormatada = dataAtal.toLocaleDateString('pt-BR',{
                    //             day:'2-digit',
                    //             month:'2-digit',
                    //             year:'numeric'
                    //         })
                    //         tarefasPendentesReference.innerHTML += `
                    //         <div id="">
                    //         <li class="tarefa">
                    //         <div class="not-done" onclick="atualizaTarefa(${data.id},'false')"></div>
                    //         <div class="descricao">
                    //         <p class="nome">${data.description}</p>
                    //         <p class="timestamp">Criada em: ${dataFormatada}</p>
                    //         </div>
                    //         `
                    //     })
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
                    console.log(tasks)
                    console.log(tasks.length)

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
                    //let skeletonReference = document.querySelector('#skeleton');
                    // let tarefasPendentesReference = document.querySelector('.tarefas-pendentes');
                   
                    //skeletonReference.style.display = 'none'

                    for(task in tasks){
                        // console.log(tasks[task].createdAt.substring(0,10).toLocaleDateString())
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