let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let email = document.querySelector("#registerEmail");
let password = document.querySelector("#registerPassword");
let passwordMatch = document.querySelector("#passwordMatch");
let button = document.querySelector("#buttonRegister");
let errorMsg = document.querySelector("#errorMsg");
let dataValues = [firstName, lastName, email];

function testPassword(a, b) {
  if (b.value !== a.value) {
    (errorMsg.innerHTML = "As senhas não correspondem");
    location.reload();
  } else if (a.value == "") {
    return (a.placeholder = "Insira uma senha");
  }
}

function validate() {
  for (let inputs of dataValues) {
    switch (inputs.type) {
      case "text":
      case "email":
        if (inputs.value == "") {
          inputs.placeholder = "Campo obrigatório";
        }
        break;
    }
  }
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  validate();
  testPassword(password, passwordMatch);

  let userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };

  const requestHeaders = {
    "Content-Type": "application/json",
  };

  const requestConfig = {
    method: "POST",
    body: JSON.stringify(userData),
    headers: requestHeaders,
  };

  fetch("https://ctd-todo-api.herokuapp.com/v1/users", requestConfig).then(
    (response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          localStorage.setItem("token", data.jwt);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Conta criada com sucesso!',
            showConfirmButton: true
          }).then( result => {
            if(result.isConfirmed){
              location.assign("./index.html");
            }
          });
        
        });
      }
    }
  );
});

