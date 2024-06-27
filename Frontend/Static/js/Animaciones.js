//Animaciones Nav

function activarAnimacion(event) {
  let icono = event.currentTarget.querySelector('.icono');
  icono.classList.add('animacion-salto');
}

function detenerAnimacion(event) {
  let icono = event.currentTarget.querySelector('.icono');
  icono.classList.remove('animacion-salto');
}

//Popup Footer

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.message');
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      //forEach y querySelectorAll para desactivar las referencias de <a>
    });
  });
});


function showPopup(event) {
  let link = event.currentTarget.querySelector('.popup-message');
  link.style.display = 'block';
}

function hidePopup(event) {
  let link = event.currentTarget.querySelector('.popup-message');
  link.style.display = 'none';
}
