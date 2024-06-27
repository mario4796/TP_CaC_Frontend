let btnSend = document.querySelector(".register-button");

btnSend.addEventListener('click', function () {
    let email = document.querySelector("#email");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let repeatpassword = document.querySelector("#repeatpassword");
    let terminos = document.querySelector("#terminos");
    let pais = document.querySelector("#pais");
    // Expresiones regulares
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(username.value.trim().length);

    document.querySelector("#error-username").innerHTML = "";
    document.querySelector("#error-password").innerHTML = "";
    document.querySelector("#error-email").innerHTML = "";
    document.querySelector("#error-repeatpassword").innerHTML = "";
    document.querySelector("#error-terminos").innerHTML = "";
    document.querySelector("#error-pais").innerHTML = "";

    let errorInputs = document.querySelectorAll('.error-input');
    errorInputs.forEach(input => {
        input.classList.remove('error-input');
    });

    pais.addEventListener('change', function() {
        if (pais.value === "") {
            document.querySelector("#error-pais").innerHTML = "Debes seleccionar un país.";
            pais.classList.add('error-input');
        } else {
            document.querySelector("#error-pais").innerHTML = "";
            pais.classList.remove('error-input');
        }
    });

    if (pais.value === "") {
        document.querySelector("#error-pais").innerHTML = "Debes seleccionar un país.";
        pais.classList.add('error-input');
        return;
    }

    terminos.addEventListener('change', verificarTerminos);
    function verificarTerminos() {
        let errorTerminos = document.querySelector("#error-terminos");
        if (terminos.checked) {
            errorTerminos.innerHTML = "";
            terminos.classList.remove('error-input-checkbox');
        }
    }

    email.addEventListener('input', function(){
        if (!emailRegex.test(email.value.trim())) {
            document.querySelector("#error-email").innerHTML = "El email no tiene un formato válido.";
            email.classList.add('error-input');
        } else {
            document.querySelector("#error-email").innerHTML = "";
            email.classList.remove('error-input');
        }
    });

    if (!emailRegex.test(email.value)) {
        document.querySelector("#error-email").innerHTML = "El email no tiene un formato valido.";
        email.classList.add('error-input');
        return;
    }

    username.addEventListener('input', function(){
        if (username.value.trim() == '' || username.value.trim().length < 3) {
            document.querySelector("#error-username").innerHTML = "Debes completar el campo Usuario (mínimo 3 caracteres)";
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

    password.addEventListener('input', function(){
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

    repeatpassword.addEventListener('input', function(){
        if (repeatpassword.value.trim() !== password.value.trim()) {
            document.querySelector("#error-repeatpassword").innerHTML = "Las contraseñas no coinciden";
            repeatpassword.classList.add('error-input');
        } else {
            document.querySelector("#error-repeatpassword").innerHTML = "";
            repeatpassword.classList.remove('error-input');
        }
    });
    

    if (password.value !== repeatpassword.value) {
        document.querySelector("#error-repeatpassword").innerHTML = "Las contraseñas no coinciden.";
        repeatpassword.classList.add('error-input');
        return;
    } else if (repeatpassword.value.trim() == '') {
        document.querySelector("#error-repeatpassword").innerHTML = "Debes repetir la contraseña.";
        repeatpassword.classList.add('error-input');
        return;
    }

    if (!terminos.checked) {
        document.querySelector("#error-terminos").innerHTML = "Debes aceptar los términos y condiciones";
        terminos.classList.add('error-input-checkbox');
        return;
    }

    alert('Registro exitoso');

    window.location.href = './login.html';

});