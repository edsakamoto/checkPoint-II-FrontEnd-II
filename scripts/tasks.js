let buttonLogout = document.querySelector('#closeApp');


function logoutUser() {
    localStorage.clear();
    location.href = './index.html';
}

buttonLogout.addEventListener('click', event => {
    event.preventDefault();
    logoutUser();
});