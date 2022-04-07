import { validate, matchPassword } from "./validate.js";

let buttonCreateRef = document.querySelector("button");
let firstNameRef = document.querySelector(".firstName");
let lastNameRef = document.querySelector(".lastName");
let emailRegisterRef = document.querySelector(".email");
let passwordRegisterRef = document.querySelector(".signupPassword");
let passwordMatchRef = document.querySelector("signupPasswordMatch");

buttonCreateRef.addEventListener("click", (event) => {
  event.preventDefault();
  validate();
  matchPassword(passwordRegisterRef, passwordMatchRef);
  let userData = {
    firstName: firstNameRef.value,
    lastName: lastNameRef.value,
    email: emailRegisterRef.value,
    password: passwordRegisterRef.value,
  };

  const requestHeaders = {
    "Content-Type": "application/json",
  };

  const requestConfig = {
    method: "POST",
    body: JSON.stringify(userData),
    headers: requestHeaders,
  };
  
  // fetch("https://ctd-todo-api.herokuapp.com/v1/users", requestConfig).then(
  //   (response) => {
  //     response.json().then((data) => {
  //       console.log(data);
  //     });
  //   }
  // );
});

export {
  buttonCreateRef,
  firstNameRef,
  lastNameRef,
  emailRegisterRef,
};
