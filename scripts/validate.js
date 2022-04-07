let inputReference = document.querySelectorAll("[required]");
let passwordRegisterRef = document.getElementById('signupPassword');
let passwordMatchRef = document.getElementById('signupPasswordMatch');

console.log(inputReference);

function validate() {
  for (let input of inputReference){
    switch(input.type){
      case "text":
        if(input.className == "firstName" && input.value == ""){
          input.placeholder = 'Insira um nome (obrigatório)';
        }
        if(input.className == "lastName" && input.value == ""){
          input.placeholder = 'Insira um sobrenome (obrigatório)';
        }
        break;
        
        case "email":
          if(input.className == "email" && input.validity.valid != true){
            input.value = "";
            input.placeholder = 'Insira um e-mail válido';
          }
          break;
    }
  }
  // if(passwordMatchRef !== signupPassword) {
  //   buttonReference.disabled;
  //   document.getElementById('message').innerHTML = "As senhas não correspondem";
  // }
}

function matchPassword(pwd1, pwd2){
  if (pwd2 !== pwd1){
    document.querySelector('button').disabled;
    document.querySelector('#message').innerHTML = "As senhas não correspondem"
  }
}


export { validate, matchPassword, inputReference };
