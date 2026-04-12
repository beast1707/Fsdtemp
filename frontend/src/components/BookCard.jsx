import React from 'react';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      <p className="book-desc">{book.description}</p>
      
      <div className="book-footer">
        <span className="book-price">${book.price.toFixed(2)}</span>
        <div className="book-actions">
          <button className="btn btn-sm btn-edit" onClick={onEdit}>Edit</button>
          <button className="btn btn-sm btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
