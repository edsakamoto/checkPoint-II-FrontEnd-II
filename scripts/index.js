//login
let emailLogin = document.querySelector("#inputEmail");
let passwordLogin = document.querySelector("#inputPassword");
let buttonLogin = document.querySelector("button");
let errorMsg = document.querySelector('#errorMsg');

buttonLogin.addEventListener("click", (event) => {
  event.preventDefault();

  let userData = {
    email: emailLogin.value,
    password: passwordLogin.value
  };

  const requestHeaders = {
    "Content-Type": "application/json",
  };

  const requestConfig = {
    method: "POST",
    body: JSON.stringify(userData),
    headers: requestHeaders,
  };

  fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", requestConfig)
  .then(resp => {
      if (resp.ok){
          resp.json().then(data => {
          localStorage.setItem('token', data.jwt);
          console.log(data);
          location.href = "./tarefas.html";
        })
      } else {
          errorMsg.innerHTML = "E-mail e/ou senha incorretos";
      }
  })
  
});
