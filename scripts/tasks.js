let buttonLogout = document.querySelector("#closeApp");
let buttonNewTask = document.querySelector("#newTask");
let taskName = document.querySelector("#novaTarefa");
let userToken = localStorage.getItem("token");
let userNameRef = document.getElementById("userName");
let userImageRef = document.querySelector(".user-image");
let baseUrl = "https://ctd-todo-api.herokuapp.com/v1";
let skeletonRef = document.querySelector("#skeleton");
let switchViewRef = document.querySelector('.switchView');

//---------------> Toggle dark/light mode

switchViewRef.addEventListener('click', event => {
  event.preventDefault();
  document.body.classList.toggle('dark');
  
  if (document.body.classList == 'dark') {
    switchViewRef.innerHTML = `
  <img src="./assets/sunny.png" alt="light mode">
  `;
  } else {
    switchViewRef.innerHTML = `
  <img src="./assets/night.png" alt="dark mode">
  `
  }
  
})

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: userToken
};

function logoutUser() {
  localStorage.clear();
  location.href = "./index.html";
}

let getMeConfig = {
  headers: requestHeaders
};

//---------------> getMe

fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", getMeConfig).then(
  response => {
    if (response.ok) {
      response.json().then(data => {
        userNameRef.innerHTML = `Olá, ${data.firstName} ${data.lastName}!`;
        userImageRef.innerHTML = (data.firstName[0] + data.lastName[0]).toUpperCase();
        localStorage.setItem("idUser", data.id);
        localStorage.setItem("firstNameUser", data.firstName);
        localStorage.setItem("lastNameUser", data.lastName);
        localStorage.setItem("emailUser", data.email);
      });
    } else {
      
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro, faça login novamente."
      }).then(result => {
        if (result.isConfirmed) {
          logoutUser();
        }
      });
    }
  }
);

buttonLogout.addEventListener("click", event => {
  event.preventDefault();
  Swal.fire({
    position: 'center',
    icon: 'question',
    title: 'Deseja mesmo sair?',
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showConfirmButton: true,
    confirmButtonText: "Sim!"
  }).then( result => {
    if(result.isConfirmed){
      logoutUser();
    }
  });
  
});

//---------------> Mostrar lista ao carregar a página

getList();

//---------------> Nova tarefa

buttonNewTask.addEventListener("click", event => {
  event.preventDefault();

  skeletonRef.innerHTML = "";

  let newTaskBody = {
    description: taskName.value,
    completed: false
  };

  let newTaskConfig = {
    method: "POST",
    body: JSON.stringify(newTaskBody),
    headers: requestHeaders
  };

  if (taskName.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Insira um título para a tarefa."
    }).then(result => {
      if (result.isConfirmed) {
        getList();
      }
    });
  } else {
    fetch(baseUrl + "/tasks", newTaskConfig).then(response => {
      if (response.ok) {
        getList();
        taskName.value = "";
      } else {
        alert("Error");
      }
    });
  }
});

//---------------> renderizar listas

function getList() {
  fetch(baseUrl + "/tasks", getMeConfig).then(response => {
    response.json().then(tasks => {
      let taskList = document.querySelector(".tarefas-pendentes");
      let finishedTaskList = document.querySelector(".tarefas-terminadas");

      if (tasks.length === 0) {
        if (window.localStorage) {
          if (!localStorage.getItem("firstLoad")) {
            localStorage["firstLoad"] = true;
            window.location.reload();
          } else {
            localStorage.removeItem("firstLoad");
          }
        }
      } else {
        finishedTaskList.innerHTML = "";
        taskList.innerHTML = "";
      }

      for (let task in tasks) {
        const creationDate = new Date(tasks[task].createdAt);
        const formatDate = creationDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });

        if (tasks[task].completed) {
          finishedTaskList.innerHTML += `
          <li class="tarefa">
        <div class="not-done" id="finishTask" onclick="finishTask(${tasks[task].id}, false)"></div>
        <div class="descricao">
        <p class="nome">${tasks[task].description}</p>
          <p class="timestamp">Concluída em: ${formatDate}</p>
          <div class="taskButtons">
            <button type="submit" id="buttonDelete" onclick="deleteTask(${tasks[task].id})"><img src="assets/delete.png" alt="delete task"></button>
          </div>
        </div>
      </li>
          `;
        } else {
          taskList.innerHTML += `
          <li class="tarefa">
        <div class="not-done" id="finishTask" onclick="finishTask(${tasks[task].id}, true)"></div>
        <div class="descricao">
        <p class="nome">${tasks[task].description}</p>
          <p class="timestamp">Criada em: ${formatDate}</p>
          <div class="taskButtons">
            <button type="submit" id="buttonEdit" onclick="editTask(${tasks[task].id})"><img src="assets/edit.png" alt="edit task"></button>
            <button type="submit" id="buttonDelete" onclick="deleteTask(${tasks[task].id})"><img src="assets/delete.png" alt="delete task"></button>
          </div>
        </div>
      </li>
          `;
        }
      }
    });
  });
}

//---------------> deletar tarefa

function deleteTask(id) {
  Swal.fire({
    title: "Deseja excluir?",
    text: "Esta ação não pode ser desfeita",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7066e0",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sim, quero excluir!"
  }).then(result => {
    if (result.isConfirmed) {
      let deleteConfig = {
        method: "DELETE",
        headers: requestHeaders
      };
      fetch(`${baseUrl}/tasks/${id}`, deleteConfig).then(response => {
        response.ok ? getList() : alert("Error");
      });
      Swal.fire("Excluída!", "A tarefa foi excluída.", "success");
    }
  });
}

//---------------> finalizar tarefa

function finishTask(id, status) {
  let finishTaskConfig = {
    method: "PUT",
    body: JSON.stringify({
      completed: status
    }),
    headers: requestHeaders
  };

  fetch(`${baseUrl}/tasks/${id}`, finishTaskConfig).then(response => {
    if (response.ok) {
      getList();
    }
  });
}

//---------------> editar tarefa

function editTask(id, description) {
  Swal.fire({
    title: "Insira o novo título da tarefa",
    input: "text",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Editar",
    showLoaderOnConfirm: true,
    preConfirm: newDescription => {
      let editTaskConfig = {
        method: "PUT",
        body: JSON.stringify({
          description: newDescription
        }),
        headers: requestHeaders
      };
      fetch(`${baseUrl}/tasks/${id}`, editTaskConfig).then(response => {
        if (response.ok) {
          getList();
        }
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire("Pronto!", "A tarefa foi editada.", "success");
    }
  });
}


