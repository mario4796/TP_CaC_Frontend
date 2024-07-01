let btnSend = document.querySelector(".login-button");

btnSend.addEventListener('click', function () {
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");

    console.log(username.value.trim().length);

    document.querySelector("#error-username").innerHTML = "";
    document.querySelector("#error-password").innerHTML = "";
    let errorInputs = document.querySelectorAll('.error-input');
    errorInputs.forEach(input => {
        input.classList.remove('error-input');
    });

    username.addEventListener('input', function () {
        if (username.value.trim() == '' || username.value.trim().length < 3) {
            document.querySelector("#error-username").innerHTML = "Debes completar el campo Usuario";
            username.classList.add('error-input');
        } else {
            document.querySelector("#error-username").innerHTML = "";
            username.classList.remove('error-input');
        }
    });

    if (username.value.trim() == '' || username.value.trim().length < 3) {
        document.querySelector("#error-username").innerHTML = "Debes completar el campo Usuario";
        username.classList.add('error-input');
        return;
    }

    password.addEventListener('input', function () {
        if (password.value.trim() == '') {
            document.querySelector("#error-password").innerHTML = "Debes completar el campo Contraseña";
            password.classList.add('error-input');
        } else {
            document.querySelector("#error-password").innerHTML = "";
            password.classList.remove('error-input');
        }
    });

    if (password.value.trim() == '') {
        document.querySelector("#error-password").innerHTML = "Debes completar el campo Contraseña";
        password.classList.add('error-input');
        return;
    }

    alert('Inicio de sesión exitoso');

    window.location.href = '../index.html';
});