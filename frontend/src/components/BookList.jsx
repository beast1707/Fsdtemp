import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onEdit, onDelete }) => {
  if (!books || books.length === 0) {
    return (
      <div className="empty-state">
        <h3>No books found!</h3>
        <p>Start by adding a new book to your inventory.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map(book => (
        <BookCard 
          key={book._id} 
          book={book} 
          onEdit={() => onEdit(book)} 
          onDelete={() => onDelete(book._id)}
        />
      ))}
    </div>
  );
};

export default BookList;
