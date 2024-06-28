import os
import mysql.connector
from flask import g
from dotenv import load_dotenv

# Carga variables de entorno desde .env
load_dotenv()

DATABASE_CONFIG = {
    'user': os.getenv('DB_USERNAME'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'port': os.getenv('DB_PORT', 3306) 
}

# Conexión a la base de datos
def get_db():
    
    if 'db' not in g:
        
        g.db = mysql.connector.connect(**DATABASE_CONFIG)
    
    return g.db

# Cierra conexión a la base de datos
def close_db(e=None):
    
    db = g.pop('db', None)
    if db is not None:
        db.close()

# Función para inicializar la aplicación con el manejo de la base de datos
def init_app(app):
    # Registrar 'close_db' para que se ejecute al final del contexto de la aplicación
    app.teardown_appcontext(close_db)