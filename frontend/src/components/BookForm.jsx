import React, { useState, useEffect } from 'react';

const BookForm = ({ onSave, editingBook, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        description: editingBook.description,
        price: editingBook.price
      });
    } else {
      setFormData({
        title: '',
        author: '',
        description: '',
        price: ''
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.description || !formData.price) {
      alert('Please fill out all fields');
      return;
    }
    
    onSave({
      ...formData,
      price: parseFloat(formData.price)
    });

    if (!editingBook) {
      setFormData({ title: '', author: '', description: '', price: '' });
    }
  };

  return (
    <div className="glass-panel">
      <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title"
            name="title" 
            className="form-control" 
            placeholder="Book Title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input 
            type="text" 
            id="author"
            name="author" 
            className="form-control" 
            placeholder="Author Name" 
            value={formData.author} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input 
            type="number" 
            id="price"
            name="price" 
            className="form-control" 
            placeholder="0.00" 
            step="0.01" 
            min="0"
            value={formData.price} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description"
            name="description" 
            className="form-control" 
            placeholder="Brief book description..." 
            rows="4"
            value={formData.description} 
            onChange={handleChange} 
            required 
          ></textarea>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            {editingBook ? 'Update Book' : 'Add Book'}
          </button>
          
          {editingBook && (
            <button 
              type="button" 
              onClick={onCancelEdit} 
              className="btn" 
              style={{ background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-secondary)' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
