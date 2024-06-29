const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
        const response = await fetch(url, options);  // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();  // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showBooks() {
    let books = await fetchData(BASEURL + '/api/books/', 'GET');
    const tableBooks = document.querySelector('#list-table-books tbody');
    tableBooks.innerHTML = '';
    books.forEach((book, index) => {
        let tr = `<tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.gender}</td>
                    <td>${book.publisher}</td>
                    <td>
                        <button class="btn-cac" onclick='updateMovie(${book.id_book})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteMovie(${book.id_book})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
        tableBooks.insertAdjacentHTML("beforeend", tr);
    });
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveMovie() {
    const idMovie = document.querySelector('#id-book').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const releaseDate = document.querySelector('#release-date').value;
    const publisher = document.querySelector('#publisher-form').value;
    //VALIDACION DE FORMULARIO
    if (!title || !author || !releaseDate || !publisher) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }
    // Crea un objeto con los datos de la película
    const bookData = {
        title: title,
        author: author,
        gender: releaseDate,
        publisher: publisher,
    };
    let result = null;
    // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
    if (idMovie !== "") {
        result = await fetchData(`${BASEURL}/api/books/${idMovie}`, 'PUT', bookData);
    } else {
        // Si no hay idMovie, realiza una petición POST para crear una nueva película
        result = await fetchData(`${BASEURL}/api/books/`, 'POST', bookData);
    }

    const formMovie = document.querySelector('#form-book');
    formMovie.reset();
    Swal.fire({
        title: 'Exito!',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })
    showBooks();
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteMovie(id) {
    Swal.fire({
        title: "¿Esta seguro de eliminar el libro?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await fetchData(`${BASEURL}/api/books/${id}`, 'DELETE');
            showBooks();
            Swal.fire(response.message, "", "success");
        }
    });

}

/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateMovie(id) {
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/books/${id}`, 'GET');
    const idMovie = document.querySelector('#id-book');
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const releaseDate = document.querySelector('#release-date');
    const publisher = document.querySelector('#publisher-form');

    idMovie.value = response.id_book;
    title.value = response.title;
    author.value = response.author;
    releaseDate.value = response.gender;
    publisher.value = response.publisher;
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function () {
    const btnSaveMovie = document.querySelector('#btn-save-book');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveMovie.addEventListener('click', saveMovie);
    showBooks();
});
