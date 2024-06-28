from app.database import get_db

class Book:

    def __init__(self,id_book=None,title=None,author=None,genre=None,publisher=None):
        self.id_book=id_book
        self.title=title
        self.author=author
        self.genre=genre
        self.publisher=publisher

    def serialize(self):
        return {
            'id_book': self.id_book,
            'title': self.title,
            'author': self.author,
            'genre': self.genre,
            'publisher': self.publisher
        }
    
    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        query = "SELECT * FROM books"
        cursor.execute(query)
        rows = cursor.fetchall() #Devuelve tuplas

        books = [Book(id_book=row[0], title=row[1], author=row[2], genre=row[3], publisher=row[4]) for row in rows]

        cursor.close()
        return books
        

    @staticmethod
    def get_by_id(book_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM books WHERE id_book = %s", (book_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Book(id_book=row[0], title=row[1], author=row[2], genre=row[3], publisher=row[4])
        return None
    
    
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_book:
            cursor.execute("""
                UPDATE books SET title = %s, author = %s, genre = %s, publisher = %s
                WHERE id_book = %s
            """, (self.title, self.author, self.genre, self.publisher, self.id_book))
        else:
            cursor.execute("""
                INSERT INTO books (title, author, genre, publisher) VALUES (%s, %s, %s, %s)
            """, (self.title, self.author, self.genre, self.publisher))
            self.id_book = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM books WHERE id_book = %s", (self.id_book,))
        db.commit()
        cursor.close()
