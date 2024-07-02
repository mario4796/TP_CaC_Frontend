// const BASEURL = 'http://127.0.0.1:5000';

const BASEURL = 'https://ivmalattanzio.pythonanywhere.com/'

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
    var boton = document.getElementById('btn-save-book');
    if (boton.innerText === 'Actualizar') {
        boton.innerText = 'Agregar';
    }
    books.forEach((book, index) => {
        let tr = `<tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.publisher}</td>
                    <td>
                        <button class="btn-cac" title="Actualizar" onclick='updateBook(${book.id_book})'><img src="../Static/Imagenes/Icons/book_settings.png" width=30px style="filter: invert(1);"></button>
                        <button class="btn-cac" title="Eliminar" onclick='deleteBook(${book.id_book})'><img src="../Static/Imagenes/Icons/book_remove.png" width=30px style="filter: invert(1);"><i class="fa fa-trash" ></button>
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
async function saveBook() {
    console.log("Botón presionado"); // Verificar que la función se llama
    const idBook = document.querySelector('#id-book').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const genre = document.querySelector('#genre').value;
    const publisher = document.querySelector('#publisher').value;
    //VALIDACION DE FORMULARIO
    if (!title || !author || !genre || !publisher) {
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
        genre: genre,
        publisher: publisher,
    };
    let result = null;
    // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
    if (idBook !== "") {
        result = await fetchData(`${BASEURL}/api/books/${idBook}`, 'PUT', bookData);
    } else {
        // Si no hay idMovie, realiza una petición POST para crear una nueva película
        result = await fetchData(`${BASEURL}/api/books/`, 'POST', bookData);
    }

    const formBook = document.querySelector('#form-books');
    formBook.reset();
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
function deleteBook(id) {
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
async function updateBook(id) {
    //Buscamos en el servidor la pelicula de acuerdo al id
    var boton = document.getElementById('btn-save-book');
    if (boton.innerText === 'Agregar') {
        boton.innerText = 'Actualizar';
    }

    let response = await fetchData(`${BASEURL}/api/books/${id}`, 'GET');
    const idBook = document.querySelector('#id-book');
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const genre = document.querySelector('#genre');
    const publisher = document.querySelector('#publisher');

    idBook.value = response.id_book;
    title.value = response.title;
    author.value = response.author;
    genre.value = response.genre;
    publisher.value = response.publisher;

}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function () {
    const btnSaveBook = document.querySelector('#btn-save-book');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveBook.addEventListener('click', saveBook);
    showBooks();
});
