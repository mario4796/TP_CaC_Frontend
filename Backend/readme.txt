Agregar VM de python, flask con archivo requirements.txt y .env al proyecto
Generar la BDD en el workbench con el script db_laberinto.sql

Python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt

//////////////////////////////////7

Crear archivo .env y completar con los datos de la BDD de cada uno:

DB_USERNAME=root
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=db_laberinto
