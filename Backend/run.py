from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

#inicializacion del proyecto Flask
app = Flask(__name__)

#Inicialización de la base de datos
init_app(app)

#Permitir solicitudes desde cualquier origen
CORS(app)

# Definición de rutas
app.route('/', methods=['GET'])(index)
app.route('/api/books/', methods=['GET'])(get_all_books)
app.route('/api/books/<int:book_id>', methods=['GET'])(get_book)
app.route('/api/books/', methods=['POST'])(create_book)
app.route('/api/books/<int:book_id>', methods=['PUT'])(update_book)
app.route('/api/books/<int:book_id>', methods=['DELETE'])(delete_book)

if __name__=='__main__':
    app.run(debug=True)