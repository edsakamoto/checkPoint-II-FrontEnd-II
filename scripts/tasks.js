let buttonLogout = document.querySelector("#closeApp");
let buttonNewTask = document.querySelector("#newTask");
let taskName = document.querySelector("#novaTarefa");
let userToken = localStorage.getItem("token");
let userNameRef = document.getElementById("userName");
let userImageRef = document.querySelector('.user-image');
let baseUrl = 'https://ctd-todo-api.herokuapp.com/v1';

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: userToken,
};

function logoutUser() {
  localStorage.clear();
  location.href = "./index.html";
}

let getMeConfig = {
  headers: requestHeaders,
};

fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", getMeConfig).then(
  (getMeResponse) => {
    if (getMeResponse.ok) {
      getMeResponse.json().then((getMeData) => {
        userNameRef.innerHTML = `Olá, ${getMeData.firstName} ${getMeData.lastName}!`;
        userImageRef.innerHTML = getMeData.firstName[0]+getMeData.lastName[0];
      }); 
    } else {
      alert("Ocorreu um erro, faça login novamente.");
      logoutUser();
    }
  }
);

buttonLogout.addEventListener("click", (event) => {
  event.preventDefault();
  logoutUser();
});

let newTaskData = {
  description: taskName.value,
  completed: false,
};

let newTaskConfig = {
  headers: requestHeaders,
};

buttonNewTask.addEventListener("click", (event) => {
  event.preventDefault();
  if (taskName.value === "") {
    taskName.placeholder = "Insira um título para a tarefa";
  }
  fetch(baseUrl+'/tasks', newTaskConfig)
  .then(newTaskResponse => {
    newTaskResponse.json().then(newTaskData => {
      console.log(newTaskData);
    })
  })
});
