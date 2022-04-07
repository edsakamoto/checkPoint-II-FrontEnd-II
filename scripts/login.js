import { validate } from "./validate.js";

let buttonLoginRef = document.querySelector("button");
let emailRef = document.querySelector('.email');
let passwordRef = document.querySelector('.password');


buttonLoginRef.addEventListener("click", (event) => {
  event.preventDefault();
  
  let credentials = {
    email: emailRef.value,
    password: passwordRef.value
  };

  const requestHeaders = {
    "Content-Type": "application/json"
  };

  const requestConfig = {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: requestHeaders
  };
  validate();
  fetch(
    "https://ctd-todo-api.herokuapp.com/v1/users/login",
    requestConfig
  ).then((response) => {
    response.json().then((data) => {
      console.log(data);
      localStorage.setItem("token", data.jwt);
      window.location.href = "./tarefas.html";
    });
  });
});

export { buttonLoginRef, emailRef, passwordRef };
