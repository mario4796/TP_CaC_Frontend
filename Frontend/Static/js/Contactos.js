let btnSend = document.querySelector(".contact-button");

btnSend.addEventListener('click', function () {
    let email = document.querySelector("#contacto-email");
    let nombre = document.querySelector("#contacto-nombre");
    let asunto = document.querySelector("#contacto-asunto");
    let consulta = document.querySelector("#contacto-consulta");
    // Expresiones regulares
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(nombre.value.trim().length);

    document.querySelector("#error-nombre").innerHTML = "";
    document.querySelector("#error-email").innerHTML = "";
    document.querySelector("#error-asunto").innerHTML = "";
    document.querySelector("#error-consulta").innerHTML = "";

    let errorInputs = document.querySelectorAll('.error-contacto');
    errorInputs.forEach(input => {
        input.classList.remove('error-input-contacto');
    });

    nombre.addEventListener('input', function(){
        if (nombre.value.trim() == '' || nombre.value.trim().length < 3) {
            document.querySelector("#error-nombre").innerHTML = "Debes completar el campo Nombre (mínimo 3 caracteres)";
            nombre.classList.add('error-input-contacto');
        } else {
            document.querySelector("#error-nombre").innerHTML = "";
            nombre.classList.remove('error-input-contacto');
        }
    });

    if (nombre.value.trim() == '' || nombre.value.trim().length < 3) {
        document.querySelector("#error-nombre").innerHTML = "Debes completar el campo Nombre";
        nombre.classList.add('error-input-contacto');
        return;
    }

    email.addEventListener('input', function(){
        if (!emailRegex.test(email.value.trim())) {
            document.querySelector("#error-email").innerHTML = "El email no tiene un formato válido.";
            email.classList.add('error-input-contacto');
        } else {
            document.querySelector("#error-email").innerHTML = "";
            email.classList.remove('error-input-contacto');
        }
    });

    if (!emailRegex.test(email.value)) {
        document.querySelector("#error-email").innerHTML = "El email no tiene un formato valido.";
        email.classList.add('error-input-contacto');
        return;
    }

    asunto.addEventListener('input', function(){
        if (asunto.value.trim() == '') {
            document.querySelector("#error-asunto").innerHTML = "Debes completar el campo Asunto";
            asunto.classList.add('error-input-contacto');
        } else {
            document.querySelector("#error-asunto").innerHTML = "";
            asunto.classList.remove('error-input-contacto');
        }
    });

    if (asunto.value.trim() == '') {
        document.querySelector("#error-asunto").innerHTML = "Debes completar el campo Asunto";
        asunto.classList.add('error-input-contacto');
        return;
    }

    consulta.addEventListener('input', function(){
        if (consulta.value.trim() == '') {
            document.querySelector("#error-consulta").innerHTML = "Debes completar el campo Connsulta";
            consulta.classList.add('error-input-contacto');
        } else {
            document.querySelector("#error-consulta").innerHTML = "";
            consulta.classList.remove('error-input-contacto');
        }
    });
    
    if (consulta.value.trim() == '') {
        document.querySelector("#error-consulta").innerHTML = "Debes completar el campo Consulta";
        consulta.classList.add('error-input-contacto');
        return;
    }

    alert('Su cosulta fue enviada exitosamente');

    window.location.href = './contactos.html';
});