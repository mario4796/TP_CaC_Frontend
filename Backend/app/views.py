from flask import jsonify, request
from app.models import Book

def index():
    return '<h1>Hola, bienvenido a Laberinto de letras</h1>'

def get_all_books():

    books = Book.get_all()
    list_books = [book.serialize() for book in books]
    return jsonify(list_books)

def create_book():
    
    data = request.json
    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data['genre'],
        publisher=data['publisher']
    )
    new_book.save()
    return jsonify({'message':'Petición creada con exito'}), 201
    
def update_book(book_id):
    
    book = Book.get_by_id(book_id)
    if not book:
        return jsonify({'message': 'Libro no encontrado'}), 404
    data = request.json
    book.title = data['title']
    book.author = data['author']
    book.genre = data['genre']
    book.publisher = data['publisher']
    book.save()
    return jsonify({'message': 'Libro actualizado exitosamente'})

def get_book(book_id):

    book = Book.get_by_id(book_id)
    if not book:
        return jsonify({'message': 'Libro no encontrado'}), 404
    return jsonify(book.serialize())

def delete_book(book_id):

    book = Book.get_by_id(book_id)
    if not book:
        return jsonify({'message': 'Libro no encontrado'}), 404
    book.delete()
    return jsonify({'message': 'Libro eliminado exitosamente'})