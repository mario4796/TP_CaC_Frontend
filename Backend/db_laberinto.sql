create database db_laberinto;
use db_laberinto;

CREATE TABLE books (
id_book int NOT NULL AUTO_INCREMENT,
title varchar(100) NOT NULL,
author varchar(100) NOT NULL,
genre varchar(100) NOT NULL,
publisher varchar(255) DEFAULT NULL,
PRIMARY KEY (id_book)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO books (title, author, genre, publisher) values
("El Pozo de la Ascension", "Sanderson, Brandon", "Fantasía", "Nova");

SELECT * FROM books;